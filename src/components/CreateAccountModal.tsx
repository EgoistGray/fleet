import { api } from "@/utils/api";
import { Button, Modal, PasswordInput, TextInput } from "@mantine/core";
import { sha256 } from "js-sha256";
import { useSession } from "next-auth/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Select } from "react-hook-form-mantine";
import { toast } from "react-hot-toast";
import invariant from "tiny-invariant";
import { type CreateEmployeeAccount } from "../common/types";

export default function CreateFormModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateEmployeeAccount>();

  const utils = api.useContext();
  const createAccount = api.users.createAccount.useMutation({
    onSuccess: async () => {
      await utils.invalidate(); // we want to just refresh the users but aw well
      toast.success("Account created successfully");
      close();
    },
    onError: () => {
      toast.error("Username has been taken. Please use another one.");
    },
  });

  const onSubmit: SubmitHandler<CreateEmployeeAccount> = (data) => {
    invariant(session?.user.company);

    createAccount.mutate({
      ...data,
      password: sha256.hex(data.password),
      company: session.user.company,
    });
  };

  return (
    <Modal onClose={close} opened={opened} title="Create New Employee Account">
      <form
        autoComplete="off"
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          void handleSubmit(onSubmit)(e);
        }}
      >
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <TextInput
            label="First Name"
            placeholder="Robert"
            {...register("firstName", {
              required: "Please provide your first name",
            })}
            error={errors.firstName?.message}
          />
          <TextInput
            label="Last Name"
            placeholder="Manuski"
            {...register("lastName", {
              required: "Please provide your last name",
            })}
            error={errors.lastName?.message}
          />
        </div>
        <TextInput
          label="Username"
          placeholder="robert_manuski"
          {...register("username", {
            required: "Please provide a username",
          })}
          error={errors.username?.message}
        />
        <Select
          label="Role"
          placeholder="Delivery"
          name="role"
          control={control}
          data={[
            { value: "courier", label: "Courier" },
            { value: "cashier", label: "Cashier" },
          ]}
          defaultValue={"courier"}
        />
        <PasswordInput
          label="Password"
          placeholder="Please enter a password..."
          {...register("password", { required: "Please enter a password" })}
          error={errors.password?.message}
        />
        <div className="mt-3 grid w-full grid-cols-2 gap-4">
          <Button className="rounded-full " color="teal" type="submit">
            Create Account
          </Button>
          <Button className="rounded-full " color="red" onClick={close}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

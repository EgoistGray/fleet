import { api } from "@/utils/api";
import { Button, Modal, PasswordInput, TextInput } from "@mantine/core";
import { sha256 } from "js-sha256";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Select } from "react-hook-form-mantine";
import { toast } from "react-hot-toast";
import { type UpdateEmployeeAccount } from "../common/types";

/**
 *
 *  TODO:
 *  1. Finish this page with react-hook-form handler
 *  2. Finish the shipment assignment using similar mechanic as this one
 *  3. grid-cols-2 the first name and the last name to make it more professional
 *  4. fix the damn ui?
 *  5. make trpc procedure and other things
 *  6. Hook the front end and the back end
 *  7. Get NextAuth to work with the credentials (and yes there's also the trpc part)
 *
 */

export default function UpdateFormModal({
  currentProfile,
  opened,
  close,
}: {
  currentProfile: UpdateEmployeeAccount;
  opened: boolean;
  close: () => void;
}) {
  // NOT the greatest solution, but I don't have time
  // but here are some ideas how to make it better
  // 1. Make modal unmount and mount
  // integrate jotai directly
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateEmployeeAccount>({
    values: {
      ...currentProfile,
      password: "",
    },
  });

  const utils = api.useContext();
  const updateAccount = api.users.updateAccount.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
      toast.success("Account has been updated");
      close();
    },
    onError: () => {
      toast.error("Username has been taken, please try another one.");
    },
  });
  const onSubmit: SubmitHandler<UpdateEmployeeAccount> = (newInfo) => {
    updateAccount.mutate({
      ...newInfo,
      password: sha256.hex(newInfo.password),
    });
  };

  return (
    <Modal title="Update Account" onClose={close} opened={opened}>
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
              required: "Please provide a first name",
            })}
            error={errors.firstName?.message}
          />
          <TextInput
            label="Last Name"
            placeholder="Manuski"
            {...register("lastName", {
              required: "Please provide a last name",
            })}
            error={errors.lastName?.message}
          />
        </div>
        <TextInput
          label="Username"
          placeholder="robert_manuski"
          {...register("username", {
            required: "Please enter a user name",
          })}
          error={errors.username?.message}
        />
        <Select
          label="Role"
          name="role"
          control={control}
          placeholder="Delivery"
          data={[
            { value: "courier", label: "Courier" },
            { value: "cashier", label: "Cashier" },
          ]}
        />
        <PasswordInput
          label="Password"
          {...register("password", {
            required: "Please enter a new password",
          })}
          error={errors.password?.message}
        />
        <div className="mt-3 grid w-full grid-cols-2 gap-4">
          <Button className="rounded-full " color="teal" type="submit">
            Update Account
          </Button>
          <Button className="rounded-full " color="red">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

import { api } from "@/utils/api";
import { Button, Modal, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import invariant from "tiny-invariant";
import { type CreateShipment } from "../common/types";

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
    formState: { errors },
  } = useForm<CreateShipment>({});

  const utils = api.useContext();
  const createShipment = api.shipments.createShipment.useMutation({
    onSuccess: async () => {
      await utils.invalidate(); // we want to just refresh the users but aw well
      toast.success("Shipment created successfully");
      close();
    },
    onError: () => {
      toast.error("Something went wrong, try again later.");
    },
  });

  const onSubmit: SubmitHandler<CreateShipment> = (data) => {
    invariant(session?.user.company);

    createShipment.mutate({
      ...data,
      company: session.user.company,
    });
  };

  return (
    <Modal onClose={close} opened={opened} title="Create New Shipment">
      <form
        autoComplete="off"
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          void handleSubmit(onSubmit)(e);
        }}
      >
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <TextInput
            label="Name"
            placeholder="Parcel to Palembang"
            {...register("name", {
              required: "Please provide your first name",
            })}
            error={errors.name?.message}
          />
          <TextInput
            label="Weight (kg)"
            placeholder="10"
            type="number" // to persist the style
            {...register("weight", {
              required: "Please specify the weight",
              valueAsNumber: true,
              validate: {
                isNumber: (val) =>
                  !isNaN(val) ? true : "Please enter a valid weight",
              },
            })}
            error={errors.weight?.message}
          />
        </div>
        <TextInput
          label="Sender Name"
          placeholder="Robert Manuski"
          {...register("senderName", {
            required: "Please provide the sender's name",
          })}
          error={errors.senderName?.message}
        />
        <TextInput
          label="Sender Address"
          placeholder="Flowy Blowy Street 31, Lunar Town, Binstraks District"
          {...register("senderAddress", {
            required: "Please provide the sender's address",
          })}
          error={errors.senderAddress?.message}
        />
        <TextInput
          label="Recipient Name"
          placeholder="Skuwy Don"
          {...register("recipientName", {
            required: "Please provide the recipient's name",
          })}
          error={errors.recipientName?.message}
        />
        <TextInput
          label="Recipient Address"
          placeholder="Flowy Blowy Street 31, Lunar Town, Binstraks District"
          {...register("recipientAddress", {
            required: "Please provide the recipient's address",
          })}
          error={errors.recipientAddress?.message}
        />

        <div className="mt-3 grid w-full grid-cols-2 gap-4">
          <Button className="rounded-full " color="teal" type="submit">
            Create Shipment
          </Button>
          <Button className="rounded-full " color="red" onClick={close}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

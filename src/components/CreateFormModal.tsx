import { Button, Modal, PasswordInput, Select, TextInput } from "@mantine/core";

export default function CreateFormModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  return (
    <Modal onClose={close} opened={opened} title="Create New Employee Account">
      <form autoComplete="off" className="flex flex-col gap-5">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <TextInput label="First Name" placeholder="Robert" />
          <TextInput label="Last Name" placeholder="Manuski" />
        </div>
        <TextInput label="Last Name" placeholder="Manuski" />
        <Select
          label="Role"
          placeholder="Delivery"
          data={[
            { value: "courier", label: "Courier" },
            { value: "cashier", label: "Cashier" },
          ]}
          defaultValue={"courier"}
        />
        <PasswordInput label="Password" />
        <div className="mt-3 grid w-full grid-cols-2 gap-4">
          <Button className="rounded-full " color="teal">
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

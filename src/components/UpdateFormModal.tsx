import { type EmployeeInfo } from "@/common/types";
import { Button, Modal, PasswordInput, Select, TextInput } from "@mantine/core";
import { atom, useAtom } from "jotai";
import { useForm, type SubmitHandler } from "react-hook-form";

// For updating the modal globally
const updateFormAtom = atom<EmployeeInfo>({
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  role: "cashier",
});
export { updateFormAtom };

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
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const [employeeInfo, setInfo] = useAtom(updateFormAtom);
  const { register, watch, handleSubmit, formState } = useForm<EmployeeInfo>();

  const onSubmit: SubmitHandler<EmployeeInfo> = async (newInfo) => {
    await new Promise((resolve) => resolve(123));
    console.log("123");
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
          <TextInput label="First Name" placeholder="Robert" />
          <TextInput label="Last Name" placeholder="Manuski" />
        </div>
        <TextInput label="Username" placeholder="Robert Manuski" />
        <Select
          label="Role"
          placeholder="Delivery"
          data={[
            { value: "courier", label: "Courier" },
            { value: "cashier", label: "Cashier" },
          ]}
        />
        <PasswordInput label="Password" />
        <div className="mt-3 grid w-full grid-cols-2 gap-4">
          <Button className="rounded-full " color="teal">
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

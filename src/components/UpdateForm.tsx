import { Button, PasswordInput, Select, TextInput } from "@mantine/core";
import { useForm, type SubmitHandler } from "react-hook-form";

type EmployeeInfo = {
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  username: string;
};

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

export default function UpdateForm({
  employeeInfo,
}: {
  employeeInfo: EmployeeInfo;
}) {
  const { register, watch, handleSubmit, formState } = useForm<EmployeeInfo>();

  const onSubmit: SubmitHandler<EmployeeInfo> = async (newInfo) => {
    console.log(newInfo);
  };
  return (
    <form
      autoComplete="off"
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput label="Username" placeholder="Robert Manuski" />
      <TextInput label="First Name" placeholder="Robert" />
      <TextInput label="Last Name" placeholder="Manuski" />
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
  );
}

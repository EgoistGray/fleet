import { Button, PasswordInput, Select, TextInput } from "@mantine/core";
export default function CreateForm() {
  return (
    <form autoComplete="off" className="flex flex-col gap-5">
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
          Create Account
        </Button>
        <Button className="rounded-full " color="red">
          Cancel
        </Button>
      </div>
    </form>
  );
}

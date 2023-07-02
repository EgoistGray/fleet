import { Anchor, Button, PasswordInput, TextInput } from "@mantine/core";

export default function Register() {
  return (
    <div className="grid h-full min-h-screen w-full place-items-center">
      <div className="w-full max-w-lg rounded-3xl border border-white/25 px-14 py-20">
        <div className="mb-4 flex w-full flex-col items-center">
          <div className="mx-auto mb-3 text-4xl font-bold">
            Welcome to Fleet!
          </div>
          <div className="mx-auto mb-3 text-xl font-light">
            We&apos;re glad to have to onboard!
          </div>
        </div>
        <form className="flex flex-col gap-2">
          <TextInput placeholder="Username" label="Username" />
          <PasswordInput placeholder="Password" label="Password" />
          <PasswordInput
            placeholder="Reconfirm Password"
            label="Reconfirm Password"
          />
          <TextInput placeholder="Company Name" label="Company Name" />
          <div className="mt-10 grid grid-cols-2 items-center">
            <Anchor>Already have an account?</Anchor>
            <Button type="submit" className="rounded-full" color="cyan">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

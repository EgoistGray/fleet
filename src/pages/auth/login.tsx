import { Button, PasswordInput, TextInput } from "@mantine/core";
import { sha256 } from "js-sha256";
import { type GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { type LoginType } from "../../common/types";

// Redirect if the user is already logged in
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log("DashboardSession: ", session);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard/employee",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const router = useRouter();
  const session = useSession();

  const onSubmit: SubmitHandler<LoginType> = async (credentials) => {
    const status = await signIn("credentials", {
      ...credentials,
      password: sha256.hex(credentials.password),
      redirect: false,
    });

    // TODO: figure out why the session is not stored
    console.log(session);
    if (status?.ok) await router.replace("/dashboard/employee");
    if (status?.error) toast.error("Wrong username or password");
  };

  return (
    <div className="grid h-full min-h-screen w-full place-items-center">
      <div className="w-full max-w-lg rounded-3xl border border-white/25 px-14 py-20">
        <div className="mb-4 flex w-full flex-col items-center">
          <div className="mx-auto mb-3 text-4xl font-bold">
            Welcome to Fleet!
          </div>
          <div className="mx-auto mb-3 text-xl font-light">
            Please login to continue to dashboard
          </div>
        </div>
        <form
          className="flex flex-col gap-2"
          method="POST"
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <TextInput
            placeholder="Username"
            label="Username"
            {...register("username", { required: "Please enter username" })}
            error={errors.username?.message}
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            {...register("password", { required: "Please enter username" })}
            error={errors.password?.message}
          />
          <div className="mt-10 grid grid-cols-2 items-center">
            <Link
              href={"/register"}
              className="leading-3 text-[#1c7ed6] no-underline hover:underline"
            >
              Don&apos;t have an account?
            </Link>
            <Button type="submit" className="rounded-full" color="cyan">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

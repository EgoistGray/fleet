import { type RegisterType } from "@/common/types";
import { api } from "@/utils/api";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { sha256 } from "js-sha256";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { setTimeout } from "timers";

export default function Register() {
  const router = useRouter();
  const { mutate } = api.users.register.useMutation({
    onSuccess: () => {
      toast.success("Account Successfully Created");
      setTimeout(() => {
        void router.push("/login");
      }, 1000);
    },
    onError: () => {
      toast.error("Username has been taken");
    },
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType & { reconfirmPassword: string }>();
  const onSubmit: SubmitHandler<RegisterType> = (info) => {
    console.log({
      ...info,
      password: sha256.hex(info.password), //client-side hashing for secure transport
    });
    mutate({
      ...info,
      password: sha256.hex(info.password), //client-side hashing for secure transport
    });
  };

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
        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
          className="flex flex-col gap-2"
          autoComplete="off"
          method="POST"
        >
          <div className="grid w-full  grid-cols-1 gap-4 md:grid-cols-2">
            <TextInput
              placeholder="First Name"
              label="First Name"
              {...register("firstName", {
                required: "Please enter your first name",
              })}
              error={errors.firstName?.message}
            />
            <TextInput
              placeholder="Last Name"
              label="Last Name"
              {...register("lastName", {
                required: "Please enter your last name",
              })}
              error={errors.lastName?.message}
            />
          </div>
          <TextInput
            placeholder="Username"
            label="Username"
            {...register("username", {
              required: "Please enter a username",
            })}
            error={errors.username?.message}
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            {...register("password", {
              required: "Please enter a password",
            })}
            error={errors.password?.message}
          />
          <PasswordInput
            placeholder="Reconfirm Password"
            label="Reconfirm Password"
            color="red"
            {...register("reconfirmPassword", {
              validate: (val) => {
                if (watch("password") !== val) return "Password does not match";
              },
            })}
            error={errors.reconfirmPassword?.message}
          />
          <TextInput
            placeholder="Company Name"
            label="Company Name"
            {...register("company", {
              required: "Please enter your company name",
            })}
            error={errors.company?.message}
          />
          <div className="mt-10 grid grid-cols-2 items-center">
            <Link
              href={"/login"}
              className="leading-3 text-[#1c7ed6] no-underline hover:underline"
            >
              Already have an account?
            </Link>
            <Button type="submit" className="rounded-full" color="cyan">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

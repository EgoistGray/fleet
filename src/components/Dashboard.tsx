import { Avatar, Divider, Menu, Navbar, UnstyledButton } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { type PropsWithChildren, type ReactNode } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";

type NavbarButtonProps = {
  icon: ReactNode;
  title: string;
  to: string;
};
function NavbarButton({ icon, title, to }: NavbarButtonProps) {
  const { pathname } = useRouter();
  return (
    <Link href={to}>
      <UnstyledButton
        className={`h-14 w-full rounded-xl ${
          pathname === to ? "bg-teal-600 text-white" : ""
        }`}
      >
        <div className="flex items-center justify-center gap-4">
          {icon}
          <div>{title}</div>
        </div>
      </UnstyledButton>
    </Link>
  );
}

type DashboardProps = PropsWithChildren;

export default function Dashboard({ children }: DashboardProps) {
  // assume authenticated
  const { data: session } = useSession();

  return (
    <div className="grid h-full min-h-screen w-full grid-cols-[300px_1fr] bg-neutral-50/50">
      <div>
        <Navbar
          width={{ base: 300 }}
          className="h-full min-h-screen select-none px-6 py-10"
        >
          <Navbar.Section>
            <div className="mx-auto w-fit text-2xl font-bold">
              {session?.user.company}
            </div>
          </Navbar.Section>
          <Divider className="my-5" />
          <Navbar.Section>
            <NavbarButton
              title="Employee"
              icon={<BsPeopleFill size={25} />}
              to="/dashboard/employee"
            />
            <NavbarButton
              title="Shipment"
              icon={<MdLocalShipping size={25} />}
              to="/dashboard/shipment"
            />
          </Navbar.Section>
        </Navbar>
      </div>
      <div>
        <div className="mb-0 flex h-16 w-full items-center justify-end bg-white px-5">
          <Menu>
            <Menu.Target>
              <div className="flex w-fit cursor-pointer select-none items-center gap-5">
                <div className="tracking-loose text-lg font-medium">
                  {`${session?.user.firstName as string} ${
                    session?.user.lastName as string
                  }`}
                </div>
                <Avatar color="teal">RB</Avatar>
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Account Control</Menu.Label>
              <Menu.Item
                color="red"
                icon={<BiLogOut />}
                onClick={() => {
                  void signOut({
                    callbackUrl: "/",
                    redirect: true,
                  });
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        <div className="px-28 py-10">{children}</div>
      </div>
    </div>
  );
}

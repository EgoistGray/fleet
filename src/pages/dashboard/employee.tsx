import CreateForm from "@/components/CreateForm";
import UpdateForm from "@/components/UpdateForm";
import {
  ActionIcon,
  AppShell,
  Button,
  Divider,
  Menu,
  Navbar,
  Table,
  UnstyledButton,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsPeopleFill, BsThreeDotsVertical } from "react-icons/bs";
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

type EmployeeInfo = {
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  username: string;
};

export default function Employee() {
  const openCreateAccount = () =>
    modals.open({
      title: "Create New Account",
      children: <CreateForm />,
    });
  const openUpdateAccount = (employeeInfo: EmployeeInfo) => {
    modals.open({
      title: "Update Account",
      children: <UpdateForm employeeInfo={employeeInfo} />,
    });
  };

  const confirmDelete = () => {
    modals.openConfirmModal({
      title: "Are you sure you want to delete this account?",
      labels: { confirm: "I understand", cancel: "Cancel" },
      children: (
        <div>
          Deleting an account can have major consequences if not done with prior
          notice. Any account deleted may not be recovered.
        </div>
      ),
      onCancel: () => {
        console.log("cancel delete");
      },
      onConfirm: () => {
        console.log("imma delete u, ur fired");
      },
    });
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          width={{ base: 300 }}
          className="h-full min-h-screen px-6 py-10"
        >
          <Navbar.Section>
            <div className="mx-auto  w-fit text-2xl font-bold">
              Company Name
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
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}
      <div className="mb-4 flex w-full justify-between rounded-xl px-10 py-5">
        <div className="text-3xl font-light">Manage Employee</div>
        <Button onClick={openCreateAccount}>Create New Account</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sara_minsky</td>
            <td>Sara</td>
            <td>Minsky</td>
            <td>Cashier</td>
            <td>Password</td>
            <td>
              <Menu>
                <Menu.Target>
                  <ActionIcon>
                    <BsThreeDotsVertical />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<AiOutlineEdit size={14} />}
                    onClick={() =>
                      openUpdateAccount({
                        firstName: "Sara",
                        lastName: "MinSky",
                        role: "cashier",
                        password: "password",
                        username: "sara_minsky",
                      })
                    }
                  >
                    Edit Account
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    icon={<AiOutlineDelete size={14} />}
                    onClick={() => confirmDelete()}
                  >
                    Delete Account
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </td>
          </tr>
        </tbody>
      </Table>
    </AppShell>
  );
}

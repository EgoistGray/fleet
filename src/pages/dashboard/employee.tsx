import CreateFormModal from "@/components/CreateFormModal";
import Dashboard from "@/components/Dashboard";
import {
  Table,
  TableBody,
  TableColumn,
  TableContent,
  TableHead,
  TableRow,
} from "@/components/Table";
import UpdateFormModal from "@/components/UpdateFormModal";
import {
  ActionIcon,
  Button,
  Menu,
  Pagination,
  Portal,
  Select,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Employee() {
  const [isCreateFormOpened, { open: openCreateForm, close: closeCreateForm }] =
    useDisclosure(false);
  const [isUpdateFormOpened, { open: openUpdateForm, close: closeUpdateForm }] =
    useDisclosure(false);

  const confirmDelete = () => {
    modals.openConfirmModal({
      title: "Are you sure you want to delete TableColumnis account?",
      labels: { confirm: "I understand", cancel: "Cancel" },
      confirmProps: { color: "red" },
      children: (
        <div>
          Deleting an account can have major consequences if not done
          wiTableColumn prior notice. Any account deleted may not be recovered.
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
    <>
      <Portal>
        {/* We want it to be outside the dom */}
        <CreateFormModal close={closeCreateForm} opened={isCreateFormOpened} />
        <UpdateFormModal close={closeUpdateForm} opened={isUpdateFormOpened} />
      </Portal>
      <Dashboard>
        {/* Your application here */}
        <div className="mb-8 flex w-full justify-between rounded-xl ">
          <div className="text-3xl font-light">Manage Employee</div>
        </div>
        <div className="mx-auto flex w-full flex-col items-center gap-5">
          <div className="flex w-full items-end gap-4 rounded-xl bg-white px-6 py-4 shadow-sm shadow-neutral-900/10">
            <TextInput
              icon={<AiOutlineSearch />}
              className="w-full"
              placeholder="Type the first name youu're looking for..."
              color="gray"
              label="Search Employee"
            />
            <Select
              label="Sort By"
              defaultValue="firstName"
              data={[
                { label: "By ID", value: "id" },
                { label: "By First Name", value: "firstName" },
                { label: "By Last Name", value: "lastName" },
              ]}
            />

            <Button
              onClick={openCreateForm}
              className="rounded-full"
              color="teal"
              leftIcon={<AiOutlinePlus color="white" />}
            >
              Create Account
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableColumn>Username</TableColumn>
                <TableColumn>First Name</TableColumn>
                <TableColumn>Last Name</TableColumn>
                <TableColumn>Role</TableColumn>
                <TableColumn>Password</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableContent>sara_minsky</TableContent>
                <TableContent>Sara</TableContent>
                <TableContent>Minsky</TableContent>
                <TableContent>Cashier</TableContent>
                <TableContent>Password</TableContent>
                <TableContent>
                  <Menu>
                    <Menu.Target>
                      <ActionIcon>
                        <BsThreeDotsVertical />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        icon={<AiOutlineEdit size={14} />}
                        onClick={openUpdateForm}
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
                </TableContent>
              </TableRow>
            </TableBody>
          </Table>
          <Pagination
            total={10}
            styles={(theme) => ({
              control: {
                "&[data-active]": {
                  backgroundImage: theme.fn.gradient({
                    from: "teal", // Idk how to make it background  color
                    to: "teal",
                  }),
                  border: 0,
                },
              },
            })}
          />
        </div>
      </Dashboard>
    </>
  );
}

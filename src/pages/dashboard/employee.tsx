import CreateAccountModal from "@/components/CreateAccountModal";
import Dashboard from "@/components/Dashboard";
import {
  Table,
  TableBody,
  TableColumn,
  TableContent,
  TableHead,
  TableRow,
} from "@/components/Table";
import UpdateAccountModal from "@/components/UpdateAccountModal";
import useDebounce from "@/hooks/useDebounce";
import { api } from "@/utils/api";
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
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { type UpdateEmployeeAccount } from "../../common/types";

const ACCOUNTS_PER_PAGE = 6;
export default function Employee() {
  const [isCreateFormOpened, { open: openCreateForm, close: closeCreateForm }] =
    useDisclosure(false);
  const [isUpdateFormOpened, { open: openUpdateForm, close: closeUpdateForm }] =
    useDisclosure(false);

  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [sortBy, setSortCriteria] = useState("id");

  const [searchQuery, setQuery] = useState("");
  const delayedSearch = useDebounce(searchQuery, 300);

  const { data: users, status } = api.users.getAccountsOffset.useQuery(
    {
      company: session?.user.company ?? "",
      sortBy,
      offset: (page - 1) * ACCOUNTS_PER_PAGE,
      take: ACCOUNTS_PER_PAGE,
      query: delayedSearch ?? undefined, //make sure it is not sent if there isn't any query
    },
    {
      keepPreviousData: true,
    }
  );

  const utils = api.useContext();
  const deleteAccount = api.users.deleteAccount.useMutation({
    onError: () => {
      toast.error("Something went wrong, please try again");
    },
    onSuccess: async () => {
      await utils.invalidate();
      toast.success("Account deleted successfully");
    },
  });
  const confirmDelete = (id: string) => {
    modals.openConfirmModal({
      title: "Are you sure you want to delete this account?",
      labels: { confirm: "I understand", cancel: "Cancel" },
      confirmProps: { color: "red" },
      children: (
        <div>
          Deleting an account can have major consequences if not done with prior
          notice. Any account deleted may not be recovered.
        </div>
      ),
      onConfirm: () => {
        deleteAccount.mutate({ id });
      },
    });
  };

  const [selectedProfile, setSelectedProfile] = useState<UpdateEmployeeAccount>(
    {
      id: "",
      firstName: "",
      lastName: "",
      company: "",
      role: "",
      password: "",
      username: "",
    }
  );

  return (
    <>
      <Portal>
        {/* We want it to be outside the dom */}
        <CreateAccountModal
          close={closeCreateForm}
          opened={isCreateFormOpened}
        />
        <UpdateAccountModal
          close={closeUpdateForm}
          opened={isUpdateFormOpened}
          currentProfile={selectedProfile}
        />
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
              placeholder="Type the first name you're looking for..."
              color="gray"
              label="Search Employee"
              value={searchQuery}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Select
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortCriteria(e as string)}
              data={[
                { label: "ID", value: "id" },
                { label: "First Name", value: "firstName" },
                { label: "Last Name", value: "lastName" },
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
                <TableColumn>Hashed Password</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === "success" &&
                users.data.map(
                  ({ id, username, firstName, lastName, role, password }) => (
                    <TableRow key={id}>
                      <TableContent>{username}</TableContent>
                      <TableContent>{firstName}</TableContent>
                      <TableContent>{lastName}</TableContent>
                      <TableContent>{role}</TableContent>
                      <TableContent>
                        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap pr-10">
                          {password}
                        </div>
                      </TableContent>
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
                              onClick={() => {
                                // set jotai global state
                                setSelectedProfile({
                                  id,
                                  firstName,
                                  lastName,
                                  role,
                                  password,
                                  username,
                                  company: session?.user.company ?? "",
                                });
                                openUpdateForm();
                              }}
                            >
                              Edit Account
                            </Menu.Item>
                            <Menu.Item
                              color="red"
                              icon={<AiOutlineDelete size={14} />}
                              onClick={() => confirmDelete(id)}
                            >
                              Delete Account
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </TableContent>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
          <Pagination
            total={users?.pageTotal ?? 1}
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
            value={page}
            onChange={setPage}
          />
        </div>
      </Dashboard>
    </>
  );
}

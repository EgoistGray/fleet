import { type GetShipment, type UpdateShipment } from "@/common/types";
import CreateShipmentModal from "@/components/CreateShipmentModal";
import Dashboard from "@/components/Dashboard";
import ShippingBadge from "@/components/ShippingBadge";
import {
  Table,
  TableBody,
  TableColumn,
  TableContent,
  TableHead,
  TableRow,
} from "@/components/Table";
import UpdateShipmentModal from "@/components/UpdateShipmentModal";
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
import { useState, type ReactNode } from "react";
import { toast } from "react-hot-toast";
import {
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileDone,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const ACCOUNTS_PER_PAGE = 5;
export default function Employee() {
  const [isCreateFormOpened, { open: openCreateForm, close: closeCreateForm }] =
    useDisclosure(false);
  const [isUpdateFormOpened, { open: openUpdateForm, close: closeUpdateForm }] =
    useDisclosure(false);

  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [sortBy, setSortCriteria] = useState("name");

  const [searchQuery, setQuery] = useState("");
  const delayedSearch = useDebounce(searchQuery, 300);

  const { data: shipments, status } = api.shipments.getShipmentsOffset.useQuery(
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
  const deleteShipment = api.shipments.deleteShipment.useMutation({
    onError: () => {
      toast.error("Something went wrong, please try again");
    },
    onSuccess: async () => {
      await utils.invalidate();
      toast.success("Shipment deleted successfully");
    },
  });
  const confirmDelete = (shipmentId: string) => {
    modals.openConfirmModal({
      title: "Are you sure you want to delete this shipment?",
      labels: { confirm: "I understand", cancel: "Cancel" },
      confirmProps: { color: "red" },
      children: (
        <div>
          Deleting an account can have major consequences if not done with prior
          notice. Any account deleted may not be recovered.
        </div>
      ),
      onConfirm: () => {
        deleteShipment.mutate({ shipmentId });
      },
    });
  };

  const [selectedShipment, setSelectedShipment] = useState<UpdateShipment>({
    id: "",
    company: "",
    name: "",
    status: "",
    weight: 0,
    senderName: "",
    senderAddress: "",
    recipientName: "",
    recipientAddress: "",
  });

  const updateShipment = api.shipments.updateShipment.useMutation({
    onSuccess: async () => {
      await utils.invalidate(); // we want to just refresh the users but aw well
      toast.success("Marked as delivered!");
      close();
    },
    onError: () => {
      toast.error("Something went wrong, try again later.");
    },
  });

  const confirmDelivery = (shipmentInfo: Omit<UpdateShipment, "status">) => {
    modals.openConfirmModal({
      title: "Are you sure?",
      labels: { confirm: "I understand", cancel: "Cancel" },
      confirmProps: { color: "green" },
      children: (
        <div>
          We would like to remind you to double-check for anything you might
          have missed. Once you mark it as delivered, it&apos;ll be very
          difficult to reverse.
        </div>
      ),
      onConfirm: () => {
        updateShipment.mutate({ ...shipmentInfo, status: "delivered" });
      },
    });
  };
  return (
    <>
      <Portal>
        {/* We want it to be outside the dom */}
        <CreateShipmentModal
          close={closeCreateForm}
          opened={isCreateFormOpened}
        />
        <UpdateShipmentModal
          close={closeUpdateForm}
          opened={isUpdateFormOpened}
          selectedShipment={selectedShipment}
        />
      </Portal>
      <Dashboard>
        {/* Your application here */}
        <div className="mb-8 flex w-full justify-between rounded-xl ">
          <div className="text-3xl font-light">Manage Shipments</div>
        </div>
        <div className="mx-auto flex w-full flex-col items-center gap-5">
          <div className="flex w-full items-end gap-4 rounded-xl bg-white px-6 py-4 shadow-sm shadow-neutral-900/10">
            <TextInput
              icon={<AiOutlineSearch />}
              className="w-full"
              placeholder="Type the name you're looking for..."
              color="gray"
              label="Search Shipments"
              value={searchQuery}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Select
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortCriteria(e as string)}
              data={[
                { label: "Name", value: "name" },
                { label: "Weight", value: "weight" },
                { label: "Sender Name", value: "senderName" },
                { label: "Sender Address", value: "senderAddress" },
                { label: "Recipient Name", value: "recipientName" },
                { label: "Recipient Address", value: "recipientAddress" },
              ]}
            />

            <Button
              onClick={openCreateForm}
              className="rounded-full"
              color="teal"
              leftIcon={<AiOutlinePlus color="white" />}
            >
              Create Shipment
            </Button>
          </div>

          {status === "success" && shipments.count <= 0 && (
            <div className="mt-20 flex w-full flex-col items-center justify-center gap-5 text-neutral-400">
              <AiOutlineFileDone size={200} />
              <div className="text-4xl font-thin">There are no shipments</div>
            </div>
          )}
          {status === "success" &&
            shipments.count > 0 &&
            createTableFromShipment(shipments, (shipmentInfo) => (
              <>
                <Menu.Item
                  icon={<AiOutlineEdit size={14} />}
                  onClick={() => {
                    // set jotai global state
                    setSelectedShipment({
                      ...shipmentInfo,
                      company: session?.user.company ?? "",
                    });
                    openUpdateForm();
                  }}
                >
                  Edit Shipment
                </Menu.Item>
                <Menu.Item
                  color="green"
                  icon={<AiOutlineCheck size={14} />}
                  onClick={() =>
                    confirmDelivery({
                      ...shipmentInfo,
                      company: session?.user.company ?? "",
                    })
                  }
                >
                  Mark as Delivered
                </Menu.Item>
                <Menu.Item
                  color="red"
                  icon={<AiOutlineDelete size={14} />}
                  onClick={() => confirmDelete(shipmentInfo.id)}
                >
                  Delete Shipment
                </Menu.Item>
              </>
            ))}
          <Pagination
            total={shipments?.pageTotal ?? 1}
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

function createTableFromShipment(
  shipments: GetShipment,
  menuFunc: (shipmentInfo: Omit<UpdateShipment, "company">) => ReactNode
) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableColumn>Name</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Weight (kg)</TableColumn>
          <TableColumn>Sender Name</TableColumn>
          <TableColumn>Sender Addresss</TableColumn>
          <TableColumn>Recipient Name</TableColumn>
          <TableColumn>Recipient Address</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableRow>
      </TableHead>
      <TableBody>
        {shipments.data.map(
          ({
            id,
            name,
            status,
            weight,
            senderName,
            senderAddress,
            recipientName,
            recipientAddress,
          }) => (
            <TableRow key={id}>
              <TableContent>{name}</TableContent>
              <TableContent>
                <ShippingBadge
                  status={
                    status as
                      | "pending"
                      | "processing"
                      | "shipping"
                      | "delivered"
                  }
                />
              </TableContent>
              <TableContent>{weight}</TableContent>
              <TableContent>{senderName}</TableContent>
              <TableContent>{senderAddress}</TableContent>
              <TableContent>{recipientName}</TableContent>
              <TableContent>{recipientAddress}</TableContent>
              <TableContent>
                <Menu>
                  <Menu.Target>
                    <ActionIcon>
                      <BsThreeDotsVertical />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {menuFunc({
                      id,
                      name,
                      status,
                      weight,
                      senderName,
                      senderAddress,
                      recipientName,
                      recipientAddress,
                    })}
                  </Menu.Dropdown>
                </Menu>
              </TableContent>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}

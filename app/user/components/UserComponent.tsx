import { Button } from "@radix-ui/themes";
import UserTable from "./UserTable";

const UserComponent = () => {
  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden max-h-[calc(100vh-0px)] bg-white">
      <div className="flex justify-between items-center px-4! py-2! border-b border-[#e2e8f0]">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">Users</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {12} Records
          </p>
        </div>

        <Button className="rounded-full! cursor-pointer! bg-(--primary)">
          Add User
        </Button>
      </div>

      <UserTable rowsData={[]} />

      {/* <ComplainsTable rowsData={filteredData ?? []} /> */}
    </div>
  );
};

export default UserComponent;

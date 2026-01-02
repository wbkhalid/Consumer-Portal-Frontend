"use client";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import UserTable from "./UserTable";

const UserComponent = () => {
  const { data: usersData } = useGetAllUsers();
  return (
    <>
      <div className="flex items-center gap-1 mb-2.5!">
        <p className="text-[#111827] font-semibold">Users</p>
        <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
          {usersData?.length?.toLocaleString()} Records
        </p>
      </div>

      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <UserTable rowsData={usersData ?? []} />
      </div>
    </>
  );
};

export default UserComponent;

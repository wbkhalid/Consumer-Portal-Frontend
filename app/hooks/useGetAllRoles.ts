import useData from "./useData";

interface Props {
  refresh?: boolean;
}

export interface ManageRoleData {
  id: string;
  name: string;
  normalizedName: string;
  concurrencyStamp: string;
}

const useGetAllRoles = ({ refresh = false }: Props = {}) =>
  useData<ManageRoleData>({
    refresh,
    endpoint: `/api/Roles`,
  });

export default useGetAllRoles;

import useData from "./useData";

interface Props {
  refresh?: boolean;
}

export interface ManageDistrictData {
  id: number;
  divisionId: number;
  name: string;
  shortName: string;
}

const useGetAllDistricts = ({ refresh = false }: Props = {}) =>
  useData<ManageDistrictData>({
    refresh,
    endpoint: `/api/Districts`,
  });

export default useGetAllDistricts;

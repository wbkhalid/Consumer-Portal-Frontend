import useData from "./useData";

interface Props {
  refresh?: boolean;
}

export interface ManageTehsilData {
  id: number;
  districtId: number;
  name: string;
  shortName: string;
}

const useGetAllTehsil = ({ refresh = false }: Props = {}) =>
  useData<ManageTehsilData>({
    refresh,
    endpoint: `/api/Tehsils`,
  });

export default useGetAllTehsil;

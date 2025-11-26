import useData from "./useData";

interface Props {
  refresh?: boolean;
}

export interface ManageDivisionData {
  id: number;
  provinceId: number;
  name: string;
  shortName: string;
}

const useGetAllDivision = ({ refresh = false }: Props = {}) =>
  useData<ManageDivisionData>({
    refresh,
    endpoint: `/api/Divisions`,
  });

export default useGetAllDivision;

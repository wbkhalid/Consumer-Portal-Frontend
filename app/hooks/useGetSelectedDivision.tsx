import { LOOKUP_API } from "../APIs";
import useData from "./useData";

interface Props {
  id?: number;
  refresh?: boolean;
}

export interface ManageSelectedDivisionData {
  id: number;
  provinceId: number;
  name: string;
  shortName: string;
}

const useGetSelectedDivision = ({ refresh = false, id }: Props = {}) =>
  useData<ManageSelectedDivisionData>({
    refresh,
    endpoint: `${LOOKUP_API}/GetDivisionsByProvinceId/${id}`,
  });

export default useGetSelectedDivision;

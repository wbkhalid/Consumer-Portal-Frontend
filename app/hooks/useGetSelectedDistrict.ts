import { LOOKUP_API } from "../APIs";
import useData from "./useData";

interface Props {
  id?: number;
  refresh?: boolean;
}

export interface ManageSelectedDistrictData {
  id: number;
  divisionId: number;
  name: string;
  shortName: string;
}

const useGetSelectedDistrict = ({ refresh = false, id }: Props = {}) =>
  useData<ManageSelectedDistrictData>({
    refresh,
    endpoint: `${LOOKUP_API}/districts/${id}`,
  });

export default useGetSelectedDistrict;

import { LOOKUP_API } from "../APIs";
import useData from "./useData";

interface Props {
  id?: number;
  refresh?: boolean;
}

export interface ManageSelectedTehsilData {
  id: number;
  districtId: number;
  name: string;
  shortName: string;
}

const useGetSelectedTehsil = ({ refresh = false, id }: Props = {}) =>
  useData<ManageSelectedTehsilData>({
    refresh,
    endpoint: `${LOOKUP_API}/tehsils/${id}`,
  });

export default useGetSelectedTehsil;

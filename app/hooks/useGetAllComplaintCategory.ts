import { COMPLAINT_CATEGORY_API } from "../APIs";
import useData from "./useData";

interface Props {
  refresh?: boolean;
}

export interface ManageComplaintCategoryData {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

const useGetAllComplaintCategory = ({ refresh = false }: Props = {}) =>
  useData<ManageComplaintCategoryData>({
    refresh,
    endpoint: `${COMPLAINT_CATEGORY_API}`,
  });

export default useGetAllComplaintCategory;

import { SECTION_CATEGORY_API } from "../APIs";
import useData from "./useData";

interface Props {
  refresh?: boolean;
}

export interface ManageSectionCategoryData {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

const useGetSectionCategory = ({ refresh = false }: Props = {}) =>
  useData<ManageSectionCategoryData>({
    refresh,
    endpoint: `${SECTION_CATEGORY_API}`,
  });

export default useGetSectionCategory;

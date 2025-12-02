import { SECTION_API } from "../APIs";
import useData from "./useData";

interface Props {
  refresh?: boolean;
}

export interface ManageSectionsData {
  id: string;
  sectionCategoryId: string;
  name: string;
  description: string;
  descriptionUrdu: string;
  isActive: boolean;
}

const useGetAllSections = ({ refresh = false }: Props = {}) =>
  useData<ManageSectionsData>({
    refresh,
    endpoint: `${SECTION_API}`,
  });

export default useGetAllSections;

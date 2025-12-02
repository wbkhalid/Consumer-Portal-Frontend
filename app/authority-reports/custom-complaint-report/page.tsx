import {
  COMPLAINT_CATEGORY_API,
  LOOKUP_API,
  SECTION_CATEGORY_API,
} from "../../APIs";
import { OptionType } from "../../components/Form/CustomSelect";
import CustomComplaintComponent from "./components/CustomComplaintComponent";
interface DivisionLookup {
  id: number;
  provinceId: number;
  name: string;
  shortName: string;
}

interface DivisionLookupResponse {
  responseCode: number;
  responseMessage: string;
  data: DivisionLookup[];
}

interface SectionCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

interface Section {
  id: number;
  sectionCategoryId: number;
  name: string;
  description: string;
  descriptionUrdu: string;
  isActive: boolean;
}

interface ComplaintCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

const CustomComplaintPage = async () => {
  const res3 = await fetch(process.env.BACKEND_API + SECTION_CATEGORY_API, {
    cache: "no-store",
  });
  const sectionCategoryData: SectionCategory[] = await res3.json();

  const sectionCategoryOptions: OptionType[] = sectionCategoryData.map((d) => {
    return {
      value: String(d.id),
      label: d.name,
    };
  });

  const res4 = await fetch(process.env.BACKEND_API + SECTION_CATEGORY_API, {
    cache: "no-store",
  });
  const sectionData: Section[] = await res4.json();

  const sectionOptions: OptionType[] = sectionData.map((d) => {
    return {
      value: String(d.id),
      label: d.name + d.description + d.descriptionUrdu,
    };
  });

  const res5 = await fetch(process.env.BACKEND_API + COMPLAINT_CATEGORY_API, {
    cache: "no-store",
  });

  const complaintCategoryData: ComplaintCategory[] = await res5.json();

  const complaintCategoryOptions: OptionType[] = complaintCategoryData.map(
    (d) => {
      return {
        value: String(d.id),
        label: d.name,
      };
    }
  );

  return (
    <div>
      <CustomComplaintComponent
        sectionCategoryOptions={sectionCategoryOptions}
        sectionOptions={sectionOptions}
        complaintCategoryOptions={complaintCategoryOptions}
      />
    </div>
  );
};

export default CustomComplaintPage;

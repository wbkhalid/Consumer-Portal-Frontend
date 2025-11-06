// import { TIME_SLOT_API } from "@/app/APIs";
// import { TimeSlot } from "@/app/hooks/useTimeSolt";
import {
  COMPLAINT_CATEGORY_API,
  LOOKUP_API,
  SECTION_CATEGORY_API,
} from "../../../APIs";
import { OptionType } from "../../../components/Form/CustomSelect";
import Forms from "./Forms";

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

const CustomComplaintReportPage = async () => {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_API}${TIME_SLOT_API}`,
  //   { cache: "no-store" }
  // );
  // const response = await res.json();
  // const data: TimeSlot[] = await response.data;

  const res2 = await fetch(
    process.env.BACKEND_API + LOOKUP_API + "/divisions?countaryId=1",
    {
      cache: "no-store",
    }
  );
  const response2: DivisionLookupResponse = await res2.json();
  const divisionsData: DivisionLookup[] = response2.data;

  const divisionOptions: OptionType[] = divisionsData.map((division) => {
    return {
      value: String(division.id),
      label: division.name,
    };
  });

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
    <div className="container mx-auto py-6 px-4">
      {/* Table Header and Add Button */}
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Custom Complaint Reports
        </h2>
        <Forms
          divisionOptions={divisionOptions}
          sectionCategoryOptions={sectionCategoryOptions}
          sectionOptions={sectionOptions}
          complaintCategoryOptions={complaintCategoryOptions}
        />
      </div>

      {/* Table */}
      {/* <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">
                End Time
              </th>
              <th
                colSpan={2}
                className="px-6 py-3 text-center text-sm text-gray-600"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-600">{d.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {d.timeslotName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {d.timeslotStartTime}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {d.timeslotEndTime}
                </td>
                <td className="text-center px-6 py-4 ">
                  <Form api={TIME_SLOT_API} method={"PUT"} id={d.id} />
                </td>
                <td className="text-center px-6 py-4 ">
                  <DeleteButton id={d.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export const dynamic = "force-dynamic";

export default CustomComplaintReportPage;

import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { formatDate } from "../../utils/utils";

const ComplaintDetail = ({
  complaint,
}: {
  complaint: ManageComplainsData | null;
}) => {
  return (
    <div className="px-5!">
      <div className="flex justify-between items-center py-2!">
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Applicable Legal Sections</p>
          <p className="text-[15px]">
            {complaint?.sectionsDetails?.map((s) => s?.name).join(", ")}
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Category</p>
          <p className="text-[15px]">{complaint?.sectionCategoryName}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Date of Incident</p>
          <p className="text-sm">{formatDate(complaint?.createdAt)}</p>
        </div>
      </div>
      {/* <div className="bg-[rgba(29,28,29,0.13)] h-px w-full" /> */}
      <div className="bg-[rgba(29,28,29,0.13)] h-[0.5px] w-full" />
      <div className="py-2!">
        <p className="text-[#555555] text-sm">Detailed Description</p>
        <p className="text-sm">{complaint?.remarks}</p>
      </div>
    </div>
  );
};

export default ComplaintDetail;

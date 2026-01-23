import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import { formatDate, getUniqueSectionNumbers } from "../../utils/utils";

const ComplaintDetail = ({
  complaint,
}: {
  complaint: ManageComplainsData | ManageCustomComplainsData | null;
}) => {
  return (
    <div className="px-5!">
      <div className="flex justify-between items-center py-2!">
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Nature of Complaint</p>
          <p className="text-[15px]">{complaint?.sectionCategoryName}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Applicable Legal Sections</p>
          <p className="text-[15px]">
            {getUniqueSectionNumbers(complaint?.sectionsDetails)}
          </p>
        </div>
        <div className="flex flex-col gap-0.5 ">
          <p className="text-[#555555] text-sm">Category</p>
          <p className="text-sm">{complaint?.categoryName || "-"}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Date of Incident</p>
          <p className="text-sm">{formatDate(complaint?.createdAt)}</p>
        </div>
        {/* <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Fined Amount</p>
          <p className="text-[15px]">{complaint?.finedAmount ?? 0}</p>
        </div> */}
      </div>
      <div className="bg-[rgba(29,28,29,0.13)] h-[0.5px] w-full" />
      <div className="flex gap-5  py-2!">
        <div className="flex flex-col gap-0.5 flex-1">
          <p className="text-[#555555] text-sm">Section Description</p>
          <p className="text-sm">
            {complaint?.sectionsDetails?.map((s) => s?.description).join(",")}
          </p>
        </div>
      </div>

      <div className="bg-[rgba(29,28,29,0.13)] h-[0.5px] w-full" />
      <div className="py-2!">
        <p className="text-[#555555] text-sm">User Remarks</p>
        <p className="text-sm">{complaint?.remarks || "-"}</p>
      </div>
      {/* {complaint?.assigneeRemarks && (
        <div className="py-2!">
          <p className="text-[#555555] text-sm">Assignee Remarks</p>
          <p className="text-sm">{complaint?.assigneeRemarks}</p>
        </div>
      )} */}
    </div>
  );
};

export default ComplaintDetail;

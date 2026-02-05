import { ADMIN_DASHBOARD_API } from "../APIs";
import useData from "./useData";

interface Props {
  divisionId?: number | string;
  districtId?: number | string;
  tehsilId?: number | string;
  refresh?: boolean;
  year?: string;
  startDate?: string;
  endDate?: string;
  sectionIds?: string | string[];
  sectionCategory?: string;
  assignedTo?: string;
  minFineAmount?: number;
  maxFineAmount?: number;
}

export interface SectionsDetails {
  id: number;
  name: string;
  description: string;
}

export interface DecisionFilePaths {
  filePath: string;
  fileType: number;
}

export interface ComplainantDetails {
  fullName: string;
  phoneNumber: string;
  email: string | null;
  address: string;
}

export interface InterimDetails {
  id: number;
  interimRemarks: string;
  interimOrderFilesPath: [
    {
      filePath: string;
      fileType: number;
    },
  ];
  createdAt: string;
  lastUpdatedAt: string;
}

export interface AppealDecisionDetails {
  decisionDate: string;
  decisionRemarks: string;
  decisionFilePaths: [
    {
      filePath: string;
      fileType: number;
    },
  ];
}

export interface ManageCustomComplainsData {
  id: number;
  caseNo: string;
  shopName: string;
  phoneNumber: string;
  complaintType: string;
  categoryName: string;
  address: string;
  division: {
    id: number;
    name: string;
  };
  district: {
    id: number;
    name: string;
  };
  tehsil: {
    id: number;
    name: string;
  };
  latitude: number;
  longitude: number;
  finedAmount: number;
  fineCollectionDate: null | string;
  billBoardImage: string;
  sectionCategoryName: string;
  sectionsDetails: SectionsDetails[];
  entryType: number;
  status: number;
  remarks: string | null;
  hearingDate: string | null;
  closingRemarks: string | null;
  assigneeRemarks: string | null;
  listAudio: string[];
  listOfImage: string[];
  createdAt: string;
  closedDate: string;
  assignedTo: string | null;
  decisionFilePaths: DecisionFilePaths[];
  complainantDetails: ComplainantDetails;
  interimDetails: InterimDetails[];
  appealDecisionDetails: AppealDecisionDetails[];
}

const useGetCustomComplaints = ({
  refresh = false,
  divisionId,
  districtId,
  tehsilId,
  year,
  startDate,
  endDate,
  sectionIds,
  sectionCategory,
  assignedTo,
  minFineAmount,
  maxFineAmount,
}: Props = {}) => {
  const params = new URLSearchParams();

  if (divisionId !== undefined && divisionId !== "" && divisionId !== "0")
    params.append("divisionId", String(divisionId));
  if (districtId !== undefined && districtId !== "" && districtId !== "0")
    params.append("districtId", String(districtId));
  if (tehsilId !== undefined && tehsilId !== "" && tehsilId !== "0")
    params.append("tehsilId", String(tehsilId));
  if (year !== undefined && year !== "" && year !== "0")
    params.append("year", String(year));
  if (startDate !== undefined && startDate !== "" && startDate !== "0")
    params.append("startDate", String(startDate));
  if (endDate !== undefined && endDate !== "" && endDate !== "0")
    params.append("endDate", String(endDate));
  if (sectionIds) {
    if (Array.isArray(sectionIds)) {
      sectionIds.forEach((s) => {
        if (s && s !== "0") {
          params.append("sectionIds", s);
        }
      });
    } else {
      params.append("sectionIds", sectionIds);
    }
  }

  if (assignedTo !== undefined && assignedTo !== "" && assignedTo !== "0")
    params.append("assignedTo", String(assignedTo));
  if (minFineAmount !== undefined)
    params.append("minFineAmount", String(minFineAmount));

  if (maxFineAmount !== undefined)
    params.append("maxFineAmount", String(maxFineAmount));

  if (
    sectionCategory !== undefined &&
    sectionCategory !== "" &&
    sectionCategory !== "0"
  )
    params.append("sectionCategory", String(sectionCategory));

  const queryString = params.toString();

  console.log(queryString, "query");
  console.log(sectionIds, "..////..");

  return useData<ManageCustomComplainsData>({
    refresh,
    endpoint: `${ADMIN_DASHBOARD_API}/custom-complaints${
      queryString ? `?${queryString}` : ""
    }`,
  });
};

export default useGetCustomComplaints;

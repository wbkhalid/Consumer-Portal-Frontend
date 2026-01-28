import {
  Album02Icon,
  AssignmentsIcon,
  Calendar02Icon,
  CallIcon,
  Files01Icon,
  FileValidationIcon,
  SentIcon,
  Store01Icon,
  TickDouble01Icon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";

export const DETAIL_STEPS = [
  {
    id: 1,
    label: "Shop Info",
    iconImage: Store01Icon,
  },
  {
    id: 2,
    label: "Complaint Details",
    iconImage: Files01Icon,
  },
  {
    id: 3,
    label: "Evidence",
    iconImage: Album02Icon,
  },
  { id: 4, label: "Remarks and history", iconImage: UserMultipleIcon },
];

export const PENDING_STEPS = [
  ...DETAIL_STEPS,
  { id: 5, label: "Assign", iconImage: AssignmentsIcon },
  { id: 9, label: "Update Phone #", iconImage: CallIcon },
  { id: 10, label: "Send  Details", iconImage: SentIcon },
];
export const PROCEEDING_STEPS = [
  ...DETAIL_STEPS,
  { id: 6, label: "Hearing Process", iconImage: Calendar02Icon },
  { id: 7, label: "Order", iconImage: FileValidationIcon },
  { id: 9, label: "Update Phone #", iconImage: CallIcon },
  { id: 10, label: "Send  Details", iconImage: SentIcon },
];

export const RESOLVED_STEPS = [
  ...DETAIL_STEPS,
  { id: 8, label: "Resolved Details", iconImage: TickDouble01Icon },
];

export const APPEAL_STEPS = [
  ...DETAIL_STEPS,
  { id: 5, label: "Hearing Process", iconImage: Calendar02Icon },
  { id: 6, label: "Order", iconImage: FileValidationIcon },
  { id: 7, label: "Resolved Details", iconImage: TickDouble01Icon },
  { id: 8, label: "Send  Details", iconImage: SentIcon },
];

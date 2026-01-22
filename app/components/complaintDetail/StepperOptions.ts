import {
  Album02Icon,
  AssignmentsIcon,
  Calendar02Icon,
  Files01Icon,
  FileValidationIcon,
  Store01Icon,
  TickDouble01Icon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
  { id: 4, label: "Assign", iconImage: AssignmentsIcon },
];
export const PROCEEDING_STEPS = [
  ...DETAIL_STEPS,
  { id: 5, label: "Hearing Process", iconImage: Calendar02Icon },
  { id: 6, label: "Order", iconImage: FileValidationIcon },
];

export const RESOLVED_STEPS = [
  ...DETAIL_STEPS,
  // { id: 4, label: "Remarks and history", iconImage: UserMultipleIcon },
  { id: 5, label: "Resolved Details", iconImage: TickDouble01Icon },
];

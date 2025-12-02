"use client";
import { useState } from "react";
import { OptionType } from "../../../components/Form/CustomSelect";
import ComplaintForm from "./ComplaintForm";
import RegisterForm from "./RegisterForm";

interface Props {
  sectionCategoryOptions: OptionType[];
  sectionOptions: OptionType[];
  complaintCategoryOptions: OptionType[];
}

const Forms = ({
  sectionCategoryOptions,
  sectionOptions,
  complaintCategoryOptions,
}: Props) => {
  const [openComplaintForm, setOpenComplaintForm] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <>
      <RegisterForm
        setOpenComplaintForm={setOpenComplaintForm}
        setUserId={setUserId}
      />

      <ComplaintForm
        sectionCategoryOptions={sectionCategoryOptions}
        sectionOptions={sectionOptions}
        complaintCategoryOptions={complaintCategoryOptions}
        openComplaintForm={openComplaintForm}
      />
    </>
  );
};

export default Forms;

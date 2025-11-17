"use client";
import { useState } from "react";
import { OptionType } from "../../../components/Form/CustomSelect";
import ComplaintForm from "./ComplaintForm";
import RegisterForm from "./RegisterForm";

interface Props {
  divisionOptions: OptionType[];
  sectionCategoryOptions: OptionType[];
  sectionOptions: OptionType[];
  complaintCategoryOptions: OptionType[];
}

const Forms = ({
  divisionOptions,
  sectionCategoryOptions,
  sectionOptions,
  complaintCategoryOptions,
}: Props) => {
  const [openComplaintForm, setOpenComplaintForm] = useState(false);

  return (
    <>
      <RegisterForm
        divisionOptions={divisionOptions}
        setOpenComplaintForm={setOpenComplaintForm}
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

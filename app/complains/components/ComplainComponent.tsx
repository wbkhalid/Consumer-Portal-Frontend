"use client";

import useGetAllComplains from "../../hooks/useGetAllComplains";
import ComplainsTable from "./ComplainsTable";

const ComplainComponent = () => {
  const { data: complainData } = useGetAllComplains();
  console.log(complainData, "helll");

  // const data = [
  //   {
  //     shopName: "Asif Saleem General Store",
  //     phoneNumber: "03005285367",
  //     complaintType: "Extra Charge",
  //     categoryName: "MISCELLANEOUS STATIONARY",
  //     sectionCategoryName: "Faulty services",
  //     sectionsDetails: [
  //       {
  //         name: "SECTION 11",
  //         description: "Non-Disclosure of Ingredients",
  //       },
  //     ],
  //     entryType: 0,
  //     status: 0,
  //     remarks: null,
  //     listAudio: [],
  //     listOfImage: [],
  //   },
  //   {
  //     shopName: "32",
  //     phoneNumber: "03216805975",
  //     complaintType: "Extra Charge",
  //     categoryName: "SUBSTANDARD CAR/VAN",
  //     sectionCategoryName: "Faulty services",
  //     sectionsDetails: [
  //       {
  //         name: "SECTION 11",
  //         description: "Non-Disclosure of Ingredients",
  //       },
  //     ],
  //     entryType: 0,
  //     status: 0,
  //     remarks:
  //       "I  booked a car on uber at 12 pm but it didn't come at time and driver charged me more than the actual fair...the driver gave me faulty service and overcharged the fare..",
  //     listAudio: [],
  //     listOfImage: [],
  //   },
  //   {
  //     shopName: "Khawaja adeel Electronics Main bazar Chishtian",
  //     phoneNumber: "03006984425",
  //     complaintType: "Expire Date Not Mention",
  //     categoryName: "REFRIGERATOR/DEEP FREEZER/FRIDGE",
  //     sectionCategoryName: "Defective products ",
  //     sectionsDetails: [
  //       {
  //         name: "SECTION 16",
  //         description: "Non-Disclosure of Qualification ",
  //       },
  //     ],
  //     entryType: 0,
  //     status: 0,
  //     remarks:
  //       "خواجہ عدیل الیکٹرانکس چشتیاں نے مجھے ناقص اشیاء فروخت کر کے کنزیومر قانون کی خلاف ورزی کی ہے۔ان کے خلاف قانونی کارروائی کرتے ہوئے مجھے بغیر نقص کے فریزر دلوایا جائے۔",
  //     listAudio: [],
  //     listOfImage: [
  //       "/Upload/1338d0ed-b12c-42c9-b784-5ce89e324383_7f2ad7e1-4efb-4675-a0df-67231fd3462f1068092784643799019.jpg",
  //     ],
  //   },
  //   {
  //     shopName: "madina",
  //     phoneNumber: "03147309147",
  //     complaintType: "Expire Date Not Mention",
  //     categoryName: "N/A",
  //     sectionCategoryName: "Defective products ",
  //     sectionsDetails: [
  //       {
  //         name: "SECTION 11",
  //         description: "Manufacturing Date & Expiry ",
  //       },
  //     ],
  //     entryType: 0,
  //     status: 0,
  //     remarks: "good effort",
  //     listAudio: [],
  //     listOfImage: [
  //       "/Upload/a0af37ae-f793-4c5c-81c9-251559dc449c_ad995c6f-7cb4-468a-a868-9996ed06f2f72611391788860769394.jpg",
  //     ],
  //   },
  // ];

  return (
    <div className="border border-[#e2e8f0] rounded-lg py-1! overflow-hidden max-h-[calc(100vh-10px)]">
      <div className="flex justify-between items-center px-4! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-[#181D27] font-semibold">Complains</p>
          <p className="border border-main text-main font-semibold rounded-full px-1! py-0.5! text-xs">
            {complainData?.length?.toLocaleString()} Records
          </p>
        </div>
      </div>
      <ComplainsTable rowsData={complainData ?? []} />
    </div>
  );
};

export default ComplainComponent;

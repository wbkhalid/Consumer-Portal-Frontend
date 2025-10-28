import Image from "next/image";
import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";

const InprogressTable = () => {
  const rowsData = [
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Grans",
      sector: "Quality of Product",
      status: 2,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Fruit",
      sector: "Keeping Component Parts Confidential",
      status: 3,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Vegetable",
      sector: "Ingredient Comdentiality",
      status: 0,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Grans",
      sector: "Mfg Date & Expiry",
      status: 2,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Fruit",
      sector: "Quality of Product",
      status: 2,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Vegetable",
      sector: "Keeping Component Parts Confidential",
      status: 2,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Vegetable",
      sector: "Ingredient Comdentiality",
      status: 3,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
  ];

  return (
    <>
      <div className="relative">
        <div className="h-[calc(100vh-130px)] overflow-y-auto scrollbar-hide relative">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="font-semibold bg-white">
                {[
                  "Sr #",
                  "Shop Name",
                  "Phone #",
                  "Complaint Type",
                  "Product Type",
                  "Sectors",
                  "Remarks",
                  "Audio Attach",
                  "Files",
                ]?.map((header) => (
                  <TableHeaderCell key={header} label={header} />
                ))}
              </tr>
            </thead>

            <tbody>
              {rowsData?.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell className="whitespace-nowrap">
                    {index + 1}
                  </TableBodyCell>

                  <TableBodyCell className="whitespace-nowrap">
                    {item?.shopName}
                  </TableBodyCell>

                  <TableBodyCell className="whitespace-nowrap">
                    {item?.phoneNumber}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.complaintType}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.productType}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.sector}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.remarks}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.listAudio.length === 0 ? (
                      <div className="bg-[#efcdcd] rounded-full px-2! py-0.5! w-fit text-(--error)">
                        No
                      </div>
                    ) : (
                      <div className="bg-[#c8d3dd] rounded-full px-2! py-0.5! w-fit text-(--primary)">
                        Yes
                      </div>
                    )}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    <div className="flex gap-1">
                      <Image
                        src="/images/dummy-image1.png"
                        alt=""
                        width={25}
                        height={25}
                      />
                      <Image
                        src="/images/dummy-image2.png"
                        alt=""
                        width={25}
                        height={25}
                      />
                    </div>
                  </TableBodyCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InprogressTable;

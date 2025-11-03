"use client";
import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const CustomComplaintTable = () => {
  const rowsData = [
    {
      id: 1,
      complaintNo: "312/25",
      title: "A.D Legal V/S Bismillah Murgh Chany",
      institutionDate: "01-11-2025",
      status: "Warning",
      section: "(Section 16), (Section 19)",
      brand: "Bismillah Foods",
      mainCategory: "Miscellaneous",
      subCategory: "Miscellaneous",
      stage: "Further Proceeding",
      timeElapsed: "0 Days",
    },
    {
      id: 2,
      complaintNo: "315/25",
      title: "Consumer V/S ABC Electronics",
      institutionDate: "30-10-2025",
      status: "Resolved",
      section: "(Section 10), (Section 19)",
      brand: "ABC Electronics",
      mainCategory: "Electronics",
      subCategory: "TV & Appliances",
      stage: "Closed",
      timeElapsed: "3 Days",
    },
    {
      id: 3,
      complaintNo: "320/25",
      title: "John Traders V/S City Foods",
      institutionDate: "29-10-2025",
      status: "In Progress",
      section: "(Section 16)",
      brand: "City Foods",
      mainCategory: "Food",
      subCategory: "Packaged Items",
      stage: "Hearing Scheduled",
      timeElapsed: "5 Days",
    },
    {
      id: 4,
      complaintNo: "322/25",
      title: "Ali Sons V/S Fresh Mart",
      institutionDate: "28-10-2025",
      status: "Pending",
      section: "(Section 14)",
      brand: "Fresh Mart",
      mainCategory: "Retail",
      subCategory: "Groceries",
      stage: "Initial Review",
      timeElapsed: "6 Days",
    },
    {
      id: 5,
      complaintNo: "325/25",
      title: "XYZ Traders V/S Royal Bakers",
      institutionDate: "27-10-2025",
      status: "Warning",
      section: "(Section 18)",
      brand: "Royal Bakers",
      mainCategory: "Food",
      subCategory: "Bakery",
      stage: "Investigation Ongoing",
      timeElapsed: "7 Days",
    },
    {
      id: 6,
      complaintNo: "330/25",
      title: "Consumer V/S Allied Mobiles",
      institutionDate: "26-10-2025",
      status: "Resolved",
      section: "(Section 10)",
      brand: "Allied Mobiles",
      mainCategory: "Electronics",
      subCategory: "Mobile Phones",
      stage: "Closed",
      timeElapsed: "8 Days",
    },
    {
      id: 7,
      complaintNo: "335/25",
      title: "Legal Dept. V/S Spark Energy",
      institutionDate: "25-10-2025",
      status: "In Progress",
      section: "(Section 22)",
      brand: "Spark Energy",
      mainCategory: "Utilities",
      subCategory: "Electricity",
      stage: "Hearing Scheduled",
      timeElapsed: "9 Days",
    },
    {
      id: 8,
      complaintNo: "340/25",
      title: "ABC V/S City Pharmacy",
      institutionDate: "24-10-2025",
      status: "Warning",
      section: "(Section 15)",
      brand: "City Pharmacy",
      mainCategory: "Health",
      subCategory: "Medicine",
      stage: "Further Proceeding",
      timeElapsed: "10 Days",
    },
    {
      id: 9,
      complaintNo: "345/25",
      title: "Zeeshan Traders V/S Metro Foods",
      institutionDate: "23-10-2025",
      status: "Pending",
      section: "(Section 11)",
      brand: "Metro Foods",
      mainCategory: "Food",
      subCategory: "Wholesale",
      stage: "Document Verification",
      timeElapsed: "11 Days",
    },
    {
      id: 10,
      complaintNo: "350/25",
      title: "Qureshi Legal V/S Smart Electronics",
      institutionDate: "22-10-2025",
      status: "Resolved",
      section: "(Section 19)",
      brand: "Smart Electronics",
      mainCategory: "Electronics",
      subCategory: "Home Appliances",
      stage: "Closed",
      timeElapsed: "12 Days",
    },
    {
      id: 11,
      complaintNo: "355/25",
      title: "Malik Enterprises V/S Green Garden",
      institutionDate: "21-10-2025",
      status: "In Progress",
      section: "(Section 17)",
      brand: "Green Garden",
      mainCategory: "Agriculture",
      subCategory: "Fertilizers",
      stage: "Investigation Ongoing",
      timeElapsed: "13 Days",
    },
    {
      id: 12,
      complaintNo: "360/25",
      title: "A.D Legal V/S Sunrise Textiles",
      institutionDate: "20-10-2025",
      status: "Warning",
      section: "(Section 21)",
      brand: "Sunrise Textiles",
      mainCategory: "Textiles",
      subCategory: "Garments",
      stage: "Initial Review",
      timeElapsed: "14 Days",
    },
    {
      id: 13,
      complaintNo: "365/25",
      title: "Citizen V/S Quick Courier",
      institutionDate: "19-10-2025",
      status: "Pending",
      section: "(Section 13)",
      brand: "Quick Courier",
      mainCategory: "Services",
      subCategory: "Delivery",
      stage: "Awaiting Response",
      timeElapsed: "15 Days",
    },
    {
      id: 14,
      complaintNo: "370/25",
      title: "ABC Traders V/S Global Paints",
      institutionDate: "18-10-2025",
      status: "Resolved",
      section: "(Section 12)",
      brand: "Global Paints",
      mainCategory: "Industrial",
      subCategory: "Paints",
      stage: "Closed",
      timeElapsed: "16 Days",
    },
    {
      id: 15,
      complaintNo: "375/25",
      title: "Customer V/S Royal Furniture",
      institutionDate: "17-10-2025",
      status: "In Progress",
      section: "(Section 16)",
      brand: "Royal Furniture",
      mainCategory: "Home",
      subCategory: "Furniture",
      stage: "Hearing Scheduled",
      timeElapsed: "17 Days",
    },
  ];

  const headers = [
    "Sr #",
    "Complaint No",
    "Title",
    "Institution Date",
    "Status",
    "Section",
    "Brand",
    "Main Category",
    "Sub Category",
    "Stage",
    "Time Elapsed",
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {headers.map((header) => (
                <TableHeaderCell key={header} label={header} />
              ))}
            </tr>
          </thead>

          <tbody>
            {rowsData?.map((item, index) => (
              <tr
                key={item.id}
                className={`transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                } hover:bg-gray-100`}
              >
                <TableBodyCell>{index + 1}</TableBodyCell>
                <TableBodyCell>{item.complaintNo}</TableBodyCell>
                <TableBodyCell className="whitespace-nowrap">
                  {item.title}
                </TableBodyCell>
                <TableBodyCell>{item.institutionDate}</TableBodyCell>
                <TableBodyCell>{item.status}</TableBodyCell>
                <TableBodyCell>{item.section}</TableBodyCell>
                <TableBodyCell>{item.brand}</TableBodyCell>
                <TableBodyCell>{item.mainCategory}</TableBodyCell>
                <TableBodyCell>{item.subCategory}</TableBodyCell>
                <TableBodyCell>{item.stage}</TableBodyCell>
                <TableBodyCell>{item.timeElapsed}</TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomComplaintTable;

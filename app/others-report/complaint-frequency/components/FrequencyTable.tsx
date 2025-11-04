"use client";
import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const FrequencyTable = () => {
  const rowsData = [
    {
      name: "Ali Khan",
      email: "ali.khan@gmail.com",
      phoneNo: "03114541932",
      complaints: 40,
    },
    {
      name: "Sara Ahmed",
      email: "sara.ahmed@yahoo.com",
      phoneNo: "03214567890",
      complaints: 35,
    },
    {
      name: "Bilal Hussain",
      email: "bilal.hussain@hotmail.com",
      phoneNo: "03001234567",
      complaints: 28,
    },
    {
      name: "Ayesha Noor",
      email: "ayesha.noor@gmail.com",
      phoneNo: "03457891234",
      complaints: 25,
    },
    {
      name: "Usman Raza",
      email: "usman.raza@outlook.com",
      phoneNo: "03121239876",
      complaints: 22,
    },
    {
      name: "Hira Fatima",
      email: "hira.fatima@gmail.com",
      phoneNo: "03347895612",
      complaints: 20,
    },
    {
      name: "Zain Ali",
      email: "zain.ali@yahoo.com",
      phoneNo: "03067891245",
      complaints: 18,
    },
    {
      name: "Maria Khan",
      email: "maria.khan@gmail.com",
      phoneNo: "03217894560",
      complaints: 16,
    },
    {
      name: "Ahmed Iqbal",
      email: "ahmed.iqbal@gmail.com",
      phoneNo: "03451239870",
      complaints: 15,
    },
    {
      name: "Fatima Tariq",
      email: "fatima.tariq@hotmail.com",
      phoneNo: "03337894567",
      complaints: 13,
    },
    {
      name: "Hamza Saeed",
      email: "hamza.saeed@gmail.com",
      phoneNo: "03044567892",
      complaints: 12,
    },
    {
      name: "Noor Hassan",
      email: "noor.hassan@yahoo.com",
      phoneNo: "03114567893",
      complaints: 11,
    },
    {
      name: "Aiman Ali",
      email: "aiman.ali@gmail.com",
      phoneNo: "03221234567",
      complaints: 9,
    },
    {
      name: "Rehan Malik",
      email: "rehan.malik@gmail.com",
      phoneNo: "03458901234",
      complaints: 8,
    },
    {
      name: "Tariq Mehmood",
      email: "tariq.mehmood@gmail.com",
      phoneNo: "03357894561",
      complaints: 7,
    },
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {["Sr #", "Name", "Email", "Phone #", "Total Complaints"].map(
                (header) => (
                  <TableHeaderCell key={header} label={header} />
                )
              )}
            </tr>
          </thead>

          <tbody>
            {rowsData.map((item, index) => (
              <tr
                key={index}
                className={`transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                } hover:bg-gray-100`}
              >
                <TableBodyCell>{index + 1}</TableBodyCell>
                <TableBodyCell>{item.name}</TableBodyCell>
                <TableBodyCell>{item.email}</TableBodyCell>
                <TableBodyCell>{item.phoneNo}</TableBodyCell>
                <TableBodyCell>{item.complaints}</TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrequencyTable;

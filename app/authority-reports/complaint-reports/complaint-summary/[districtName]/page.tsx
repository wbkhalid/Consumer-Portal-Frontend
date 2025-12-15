// interface Props {
//   params: {
//     districtName: string;
//   };
// }

const DistrictComplaintPage = async () => {
  // const { districtName } = await params;

  // const res = await fetch(
  //   process.env.BACKEND_API + COMPLAINT_REPORT_API + "/complaint-summary",
  //   { cache: "no-store" }
  // );

  // const response = await res.json();

  // const districtData = response.data.find(
  //   (d: any) => d.districtName === districtName
  // );

  // if (!districtData) {
  //   return <p>No data found for {districtName}</p>;
  // }

  return (
    <>
      hello
      {/* <DistrictWiseComplaintTable
       districtName={districtName}
       complaints={districtData.complaints}
     /> */}
    </>
  );
};

export default DistrictComplaintPage;

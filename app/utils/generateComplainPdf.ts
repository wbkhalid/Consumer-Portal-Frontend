import { format } from "date-fns";
import { ManageComplainsData } from "../hooks/useGetAllComplains";
import { formatDate, toLocal } from "./utils";

export const generateComplaintPDF = (item: ManageComplainsData) => {
  const printWindow = window.open("", "_blank");

  printWindow!.document.write(`
    <html dir="rtl" lang="ur">
      <head>
        <title>Notice Print</title>

        <style>
          @import url("https://fonts.googleapis.com/earlyaccess/notonastaliqurdudraft.css");

          body {
            font-family: "Noto Nastaliq Urdu Draft", serif;
          }

          .main {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }

          .title {
            font-size: 22px;
            font-weight: bold;
            text-align: center;
          }

          .date {
            font-size: 14px;
          }

          .main-heading {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
          }

          .section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 10px;
          }

          .section span.line {
            flex: 1;
            border-bottom: 1px solid #000;
            margin-right: 10px;
            min-width: 0;
          }

          .line {
            border-bottom: 1px solid #000;
            min-width: 200px;
            display: inline-block;
          }

.signature-box {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
}




.no-line {
            min-width: 200px;
            display: inline-block;
}



        </style>
      </head>

      <body>

        <div class="main">
          <div></div>

          <div class="title">نوٹس</div>

          <div class="date">
            تاریخ: <span>${new Date().toDateString()}</span>
          </div>
        </div>

        <div class="main-heading">
          از دفتر اتھارٹی با تحت پنجاب کنزیومر پروٹیکشن ایکٹ 2005
        </div>

        <div class="section">
          <span>خلاف ورزی زیر دفعہ:</span>
          <span class="line"> Section
    ${
      item?.sectionsDetails
        ?.map((section) => section.name.replace("SECTION ", ""))
        .join(",") || ""
    }
  </span>

          <span>شکایت نمبر:</span>
          <span class="line">${item?.id || ""}</span>
        </div>

        <div class="section">
          <span>عنوان:</span>
          <span class="line">${item?.complaintType || ""}</span>

          <span>نام:</span>
          <span class="line">${item?.shopName || ""}</span>
        </div>

        <div>
          <p>
            درخواست / شکایت عنوان بالا میں آپ کو نوٹس ہذا جاری کیا جاتا ہے کہ آپ نے پنجاب کنزیومر پروٹیکشن ایکٹ
            2005 کی دفعہ/دفعات <span class="line">
    ${
      item?.sectionsDetails
        ?.map((section) => section.name.replace("SECTION ", ""))
        .join(",") || ""
    }</span> کی خلاف ورزی کی ہے۔ جس کی بابت آپ کے
            خلاف کارروائی عمل میں لائی جارہی ہے۔
          </p>
        </div>

        <div>
          <p>
             لہذا آپ کو اطلاع دی جارہی ہے کہ مورخہ
            <span class="line">${
              item?.hearingDate
                ? format(toLocal(item.hearingDate), "dd-MM-yyyy")
                : "--"
            }</span>
            بوقت
            <span class="line">${
              item?.hearingDate
                ? format(toLocal(item.hearingDate), "hh:mm a")
                : "--"
            }</span>
            بمقام ضلع تحفظ صارف کونسل <span class="line">  کنزیومر پروٹیکشن کونسل  </span>
            اصالتا یا وکالتا حاضر ہوں یا کنزیومر پروٹیکٹ (Consumer Protect) ایپ ڈاؤن لوڈ کر کے
            اپنے کوائف رجسٹر کر لیں اور کارروائی بذریعہ ایپ کی سہولت لیں۔ بصورت دیگر یک طرفہ کاروائی عمل
            میں لائی جاوے گی۔
          </p>
        </div>


        <br/>
        <br/>

  <div class="signature-box">
    <span>بذریعہ اسٹنٹ ڈائریکٹر (لیگل)</span>
    <span class="no-line"></span>
  </div>

 <div class="signature-box">
    <span>سیکرٹری ضلعی تحفظ صارف کونسل</span>
    <span class="line"></span>
  </div>

</div>


</div>


      </body>
    </html>
  `);

  printWindow!.document.close();
  printWindow!.print();
};

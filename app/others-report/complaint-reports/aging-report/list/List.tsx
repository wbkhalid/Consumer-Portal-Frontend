"use client";
import TableHeaderCell from "../../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { AgingReport } from "./page";
import { BaseQuery } from "../../../../utils/utils";
import CustomTableHeaderCell from "../../../../components/table/CustomTableHeaderCell";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { Fragment } from "react/jsx-runtime";

export type Query = BaseQuery<AgingReport>;

interface Props {
  data: AgingReport[];
  currentPage: number;
  pageSize: number;
  searchParams: Query;
}

const List = ({ data, currentPage, pageSize, searchParams }: Props) => {
  // Calculate totals dynamically
  const totalComplaints = data.reduce(
    (sum, item) => sum + (item.numberOfComplaints || 0),
    0
  );

  const columns: {
    label: string;
    value: keyof AgingReport;
    className?: string;
  }[] = [
    { label: "Day Range", value: "dayRange" },
    { label: "No. of Complaints", value: "numberOfComplaints" },
  ];

  return (
    <table className="min-w-full text-sm">
      <thead className="sticky top-0 z-10">
        <tr className="font-semibold bg-white text-center">
          <CustomTableHeaderCell label="Sr #" />

          {columns.map((column) => (
            <CustomTableHeaderCell
              key={column.value}
              columnValue={column.value}
              label={column.label}
              searchParams={searchParams}
            />
          ))}
        </tr>
      </thead>

      <tbody>
        {data?.map((d, index) => {
          const serial = (currentPage - 1) * pageSize + index + 1;

          return (
            <tr
              key={serial}
              className={`transition-colors duration-150 ${
                index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
              } hover:bg-gray-100`}
            >
              <TableBodyCell>{serial}</TableBodyCell>
              <TableBodyCell>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button size="1" variant="soft">
                      {d.dayRange}
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    {d.dailyBreakdown?.map((d, i) => (
                      <DropdownMenu.Sub key={i}>
                        <DropdownMenu.SubTrigger>
                          Day - {new Date(d.date).toDateString()}
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                          <DropdownMenu.Item>
                            {d.complaintCount} Complains
                          </DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </TableBodyCell>
              <TableBodyCell>{d.numberOfComplaints}</TableBodyCell>
            </tr>
          );
        })}

        {/* ✅ Total Row */}
        <tr className="font-semibold bg-[#f1f1f1] text-[#013769] sticky bottom-0">
          <TableBodyCell colSpan={2} className="text-center">
            Total
          </TableBodyCell>
          <TableBodyCell>{totalComplaints}</TableBodyCell>
        </tr>
      </tbody>
    </table>
  );
};

export default List;

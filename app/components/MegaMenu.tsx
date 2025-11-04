"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Popover,
  Dialog,
  Button,
} from "@radix-ui/themes";
import {
  FiFlag,
  FiBarChart2,
  FiPieChart,
  FiFileText,
  FiMoreHorizontal,
  FiDatabase,
  FiClock,
} from "react-icons/fi";

const MegaMenu = () => {
  const [open, setOpen] = useState(false);

  const categories = [
    {
      title: "Authority Reports",
      items: [
        {
          label: "Custom Complaint Report",
          description: "Manage custom complaints report",
          icon: <FiFileText className="text-white" size={22} />,
          route: "/authority-reports/custom-complaint-report",
        },
        {
          label: "Complaint Summary Report",
          description: "View summary of all complaints",
          icon: <FiBarChart2 className="text-white" size={22} />,
          route: "/authority-reports/complaint-summary",
        },
        {
          label: "Analytical Report",
          description: "Analyze complaint trends",
          icon: <FiPieChart className="text-white" size={22} />,
          route: "/authority-reports/analytical-report",
        },
        {
          label: "Appeals Report",
          description: "Manage submitted appeals data",
          icon: <FiFlag className="text-white" size={22} />,
          route: "/authority-reports/appeal-report",
        },
      ],
    },
  ];

  const otherReports = [
    {
      label: "Defective Product Report",
      description: "List of all pending complaints",
      icon: <FiClock className="text-white" size={22} />,
      route: "/others-report/defective-product-report",
    },
    {
      label: "Faulty service Report",
      description: "Export complaint data to Excel or PDF",
      icon: <FiDatabase className="text-white" size={22} />,
      route: "/others-report/faulty-service-report",
    },
    {
      label: "City Wise Faulty service Report",
      description: "Export complaint data to Excel or PDF",
      icon: <FiDatabase className="text-white" size={22} />,
      route: "/others-report/city-wise-faulty-service-report",
    },
    {
      label: "City Wise Defective Product Report",
      description: "Export complaint data to Excel or PDF",
      icon: <FiDatabase className="text-white" size={22} />,
      route: "/others-report/city-wise-defective-product-report",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-8 p-2">
        {categories.map((category, idx) => (
          <Box key={idx}>
            <Heading as="h4" size="3" className="text-(--primary) mb-4!">
              {category.title}
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {category.items.map((item) => (
                <Popover.Close key={item.label}>
                  <Link href={item.route}>
                    <div className="cursor-pointer transition-all duration-150 p-2! bg-white hover:bg-gray-50 rounded-lg">
                      <Flex gap="3" align="center">
                        <div className="flex items-center justify-center bg-(--primary) p-2! rounded-lg">
                          {item.icon}
                        </div>
                        <Box>
                          <Text
                            as="p"
                            weight="medium"
                            size="3"
                            className="text-(--primary)"
                          >
                            {item.label}
                          </Text>
                          <Text as="p" size="2" className="text-gray-500">
                            {item.description}
                          </Text>
                        </Box>
                      </Flex>
                    </div>
                  </Link>
                </Popover.Close>
              ))}

              {/* ➕ Other Reports Button */}
              <div
                onClick={() => setOpen(true)}
                className="cursor-pointer transition-all duration-150 p-2! bg-white hover:bg-gray-50 rounded-lg flex items-center"
              >
                <Flex gap="3" align="center">
                  <div className="flex items-center justify-center bg-(--primary) p-2! rounded-lg">
                    <FiMoreHorizontal className="text-white" size={22} />
                  </div>
                  <Box>
                    <Text
                      as="p"
                      weight="medium"
                      size="3"
                      className="text-(--primary)"
                    >
                      Other Reports
                    </Text>
                    <Text as="p" size="2" className="text-gray-500">
                      View more available reports
                    </Text>
                  </Box>
                </Flex>
              </div>
            </div>
          </Box>
        ))}
      </div>

      {/* 🪟 Dialog for Other Reports */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content className="min-w-[500px]! lg:min-w-[1000px]! p-1 rounded-xl shadow-xl bg-white">
          <p className="text-(--primary) mb-2! font-bold text-lg">
            Other Reports
          </p>
          <div className="grid grid-cols-1  md:grid-cols-3 gap-1">
            {otherReports.map((report) => (
              <Dialog.Close key={report.label}>
                <Link href={report.route}>
                  <div className="flex gap-3 items-center p-2! rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="flex items-center justify-center bg-(--primary) p-2! rounded-lg">
                      {report.icon}
                    </div>
                    <Box>
                      <Text
                        as="p"
                        weight="medium"
                        size="3"
                        className="text-(--primary)"
                      >
                        {report.label}
                      </Text>
                      <Text as="p" size="2" className="text-gray-500">
                        {report.description}
                      </Text>
                    </Box>
                  </div>
                </Link>
              </Dialog.Close>
            ))}
          </div>

          <Flex justify="end" mt="4">
            <Button
              onClick={() => setOpen(false)}
              className="bg-(--primary)! cursor-pointer!"
            >
              Close
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default MegaMenu;

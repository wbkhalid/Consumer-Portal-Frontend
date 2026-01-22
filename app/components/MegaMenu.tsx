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
  FiDatabase,
  FiClock,
  FiTrendingUp,
  FiCheckCircle,
  FiLayers,
} from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

const MegaMenu = () => {
  const categories = [
    {
      title: "Authority Reports",
      items: [
        {
          label: "Staff Management",
          description: "View and Manage staff data",
          icon: <FaUsers className="text-white" size={22} />,
          route: "/staff",
        },
        {
          label: "Custom Complaint Report",
          description: "Manage custom complaints report",
          icon: <FiFileText className="text-white" size={22} />,
          route: "/reports/custom-complaint-report",
        },
        {
          label: "Complaint Summary Report",
          description: "View summary of all complaints",
          icon: <FiBarChart2 className="text-white" size={22} />,
          route: "/reports/complaint-summary/list",
        },
        {
          label: "Analytical Report",
          description: "Analyze complaint trends",
          icon: <FiPieChart className="text-white" size={22} />,
          route: "/reports/analytical-reports/list",
        },
        {
          label: "Appeals Report",
          description: "Manage submitted appeals data",
          icon: <FiFlag className="text-white" size={22} />,
          route: "/reports/appeals-report/list",
        },

        {
          label: "Frequency Report",
          description:
            "Identify users or brands with frequent complaint occurrences.",
          icon: <FiPieChart className="text-white" size={22} />,
          route: "/reports/frequency-report/list",
        },

        {
          label: "Complaint Institution Report",
          description:
            "View complaint distribution by responsible institutions.",
          icon: <FiLayers className="text-white" size={22} />,
          route: "/reports/complaint-institution-report/list",
        },
        {
          label: "Decided Complaint Report",
          description:
            "See a list of complaints that have been resolved or closed.",
          icon: <FiCheckCircle className="text-white" size={22} />,
          route: "/reports/decided-complaint-report/list",
        },
        {
          label: "Aging Report",
          description:
            "Check pending complaints based on their age and duration.",
          icon: <FiClock className="text-white" size={22} />,
          route: "/reports/aging-report",
        },
        {
          label: "Fine Imposed Report",
          description:
            "Track fines imposed on businesses after complaint resolution.",
          icon: <FiTrendingUp className="text-white" size={22} />,
          route: "/reports/fine-imposed-report",
        },
        {
          label: "Section Report",
          description:
            "Break down complaints by legal or departmental sections.",
          icon: <FiDatabase className="text-white" size={22} />,
          route: "/reports/section-report/list",
        },
      ],
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
              {/* <div
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
                      size="2"
                      className="text-(--primary)"
                    >
                      Other Reports
                    </Text>
                    <Text as="p" size="1" className="text-gray-500">
                      View more available reports
                    </Text>
                  </Box>
                </Flex>
              </div> */}
            </div>
          </Box>
        ))}
      </div>

      {/* 🪟 Dialog for Other Reports */}
      {/* <Dialog.Root open={open} onOpenChange={setOpen}>
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
                        size="2"
                        className="text-(--primary)"
                      >
                        {report.label}
                      </Text>
                      <Text as="p" size="1" className="text-gray-500">
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
      </Dialog.Root> */}
    </>
  );
};

export default MegaMenu;

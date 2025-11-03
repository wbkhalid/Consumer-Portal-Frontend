"use client";
import Link from "next/link";
import { Box, Flex, Text, Heading, Popover } from "@radix-ui/themes";
import { FiFlag, FiBarChart2, FiPieChart, FiFileText } from "react-icons/fi";

const MegaMenu = () => {
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

  return (
    <>
      <div className="grid grid-cols-1  gap-8 p-2">
        {categories.map((category, idx) => (
          <Box key={idx}>
            <Heading as="h4" size="3" className="text-(--primary) mb-4!">
              {category.title}
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3">
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
            </div>
          </Box>
        ))}
      </div>
    </>
  );
};

export default MegaMenu;

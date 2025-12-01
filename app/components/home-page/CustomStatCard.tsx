import { Box, Flex, Text } from "@radix-ui/themes";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";

interface CustomStatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  iconBg: string;
  percentage?: number;
}

const CustomStatCard = ({
  title,
  value,
  icon,
  iconBg,
  percentage,
}: CustomStatCardProps) => {
  return (
    <div className="rounded-xl px-4! py-2! bg-white">
      <Flex justify="between" className="mb-3!">
        <Box>
          <p className="font-semibold text-[#202224]">{title}</p>
          <p className="font-bold text-2xl">{value}</p>
        </Box>
        <div
          className={`${iconBg}  w-8 h-8 rounded-md flex items-center justify-center`}
        >
          {icon}
        </div>
      </Flex>

      {percentage !== undefined && (
        <div className="flex items-center gap-1">
          {percentage >= 0 ? (
            <>
              <IoMdTrendingUp className="text-(--success)" size={24} />
              <Text as="p" className="font-semibold text-sm">
                <Text className="text-(--success)">
                  {percentage.toFixed(1)}
                </Text>{" "}
                Last Month
              </Text>
            </>
          ) : (
            <>
              <IoMdTrendingDown className="text-(--error)" size={24} />
              <Text as="p" className="font-semibold text-sm">
                <Text className="text-(--error)">{percentage.toFixed(1)}</Text>{" "}
                Last Month
              </Text>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomStatCard;

import { Text } from "@radix-ui/themes";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";

interface DashboardStatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  iconBg: string;
  percentage?: number;
}

const DashboardStatCard = ({
  title,
  value,
  icon,
  iconBg,
  percentage,
}: DashboardStatCardProps) => {
  return (
    <div className="bg-(--primary) border border-[#1BCEF5] p-2!">
      <div className="flex justify-between items-center mb-1!">
        <div className="flex gap-1 items-center text-white">
          <div className={`${iconBg} p-0.5!`}>{icon}</div>
          <p className="font-semibold">{title}</p>
        </div>
        <div>
          <p className="text-white font-bold">{value}</p>
        </div>
      </div>
      {percentage !== undefined && (
        <div className="flex items-center gap-1">
          {percentage >= 0 ? (
            <>
              <IoMdTrendingUp className="text-(--success)" size={24} />
              <Text as="p" className="font-semibold text-sm text-white">
                <Text className="text-(--success)">
                  {percentage.toFixed(1)}
                </Text>{" "}
                Last Month
              </Text>
            </>
          ) : (
            <>
              <IoMdTrendingDown className="text-(--error)" size={24} />
              <Text as="p" className="font-semibold text-sm text-white">
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

export default DashboardStatCard;

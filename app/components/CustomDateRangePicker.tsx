"use client";
import { Box, Dialog, Flex, IconButton, Text } from "@radix-ui/themes";
import { MdOutlineClose } from "react-icons/md";
import { LuCalendarRange } from "react-icons/lu";
import CustomDateRangeFilter from "./CustomDateRangeFilter";

const CustomDateRangePicker = () => {
  return (
    <div
      className={`text-sm! w-full! rounded-lg! py-1! px-2! text-(--primary) border border-[#D5D7DA]`}
    >
      <Dialog.Root>
        <Dialog.Trigger>
          <Flex
            className="w-full cursor-pointer"
            align="center"
            justify="between"
            gap="2"
          >
            <Box>
              <LuCalendarRange size={16} className="text-[#80889E]" />
            </Box>
            <Text as="p" className="font-semibold text-[#414651]">
              Pick Date
            </Text>
          </Flex>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="900px" className={`p-0! overflow-x-hidden!`}>
          <Dialog.Title className="text-end m-2!">
            <Dialog.Close>
              <IconButton
                variant="ghost"
                color="gray"
                className="!cursor-pointer! hover:scale-105 hover:bg-transparent"
              >
                <MdOutlineClose />
              </IconButton>
            </Dialog.Close>
          </Dialog.Title>
          <CustomDateRangeFilter />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default CustomDateRangePicker;

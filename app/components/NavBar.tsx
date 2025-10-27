"use client";
import {
  Avatar,
  Box,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Popover,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { GoChevronDown, GoChevronRight } from "react-icons/go";

const NavBar = () => {
  return (
    <nav className="bg-(--primary) px-4! py-1!">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[22px]">
          <Link href="/">
            <Image
              src="/images/logo-white.png"
              width={40}
              height={40}
              alt="logo"
              priority
            />
          </Link>

          <Flex align="center" className="gap-3!">
            <Heading size="5" className="text-white">
              PC & CMD
            </Heading>
            <Popover.Root>
              <Popover.Trigger>
                <IconButton
                  className="bg-[#1a4b78]! w-5! h-5! cursor-pointer!"
                  radius="full"
                >
                  <GoChevronRight className=" text-white" />
                </IconButton>
              </Popover.Trigger>

              <Popover.Content
                side="bottom"
                align="start"
                className="min-w-[500px]! lg:min-w-[1000px]! p-1 rounded-xl shadow-xl bg-white"
              >
                hello
              </Popover.Content>
            </Popover.Root>
          </Flex>
        </div>

        <div className="hidden md:block ">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Box className="bg-[#1a4b78]! rounded-full p-0.5! pr-3! cursor-pointer">
                <Flex align="center" gap="3" className="text-white">
                  <Avatar
                    src="/images/user.png"
                    fallback="?"
                    radius="full"
                    size="3"
                  />
                  <div>
                    <p className="font-semibold">DFC Food</p>
                    <Text as="p" className="text-[9px]">
                      admin@gmail.com
                    </Text>
                  </div>
                  <Box>
                    <GoChevronDown size={12} />
                  </Box>
                </Flex>
              </Box>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size="2">admin@gmail.com</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href="/settings">Settings</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <button>Log out</button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

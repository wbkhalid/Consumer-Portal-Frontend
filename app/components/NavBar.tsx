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
import MegaMenu from "./MegaMenu";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    const handleChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
      setIsFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.error("Error attempting to exit fullscreen:", err);
      });
      setIsFullScreen(false);
    }
  };

  return (
    <nav className="bg-(--primary) px-4! py-1!">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="logo"
              priority
              className="invert brightness-0 saturate-0"
            />
          </Link>

          <Flex align="center" className="gap-3!">
            <Heading size="5" className="text-white">
              CPC
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
                <MegaMenu />
              </Popover.Content>
            </Popover.Root>
          </Flex>
        </div>

        <div className="hidden md:flex items-center gap-2 ">
          <IconButton
            className="bg-transparent! text-white hover:bg-white/10! cursor-pointer!"
            onClick={toggleFullScreen}
            radius="full"
          >
            {isFullScreen ? (
              <AiOutlineFullscreenExit className="text-2xl" />
            ) : (
              <AiOutlineFullscreen className="text-2xl" />
            )}
          </IconButton>

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
                    <p className="font-semibold">Admin</p>
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
              <DropdownMenu.Item className="hover:bg-(--primary)!">
                <Link href="/settings">Settings</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="hover:bg-(--primary)!">
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

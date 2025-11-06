"use client";
import { Theme } from "@radix-ui/themes";
import { ReactNode } from "react";

interface ThemeSwitcherProps {
  children: ReactNode;
}

export default function ThemeSwitcher({ children }: ThemeSwitcherProps) {
  return (
    <Theme accentColor="blue" grayColor="gray">
      <div>{children}</div>
    </Theme>
  );
}

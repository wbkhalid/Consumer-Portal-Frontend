import { Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text color="red" as="p" className="pt-1" weight="medium">
      {children}
    </Text>
  );
};

export default ErrorMessage;

import { Text } from "@radix-ui/themes";
import { LabelHTMLAttributes, ReactNode } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  inputNode?: ReactNode;
}

const CustomLabel = ({ children, inputNode, ...rest }: Props) => {
  return (
    <label {...rest}>
      <Text
        as="div"
        className="text-xs! font-semibold! mb-1.5! text-[#2A2A2B]!"
      >
        {children}
      </Text>
      {inputNode}
    </label>
  );
};

// 💡 Add this line to resolve the lint error
CustomLabel.displayName = "CustomLabel";

export default CustomLabel;

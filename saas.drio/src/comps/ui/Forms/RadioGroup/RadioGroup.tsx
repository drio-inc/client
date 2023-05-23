import {
  RadioGroup as AriaRadioGroup,
  RadioGroupProps as AriaRadioGroupProps,
} from "react-aria-components";
import { Text } from "react-aria-components";

interface RadioGroupProps extends AriaRadioGroupProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  children?: React.ReactNode;
}

export default function MyRadioGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup {...props}>
      <span>{label}</span>
      <div className=" text-gray-500 text-sm font-medium flex">{children}</div>

      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </AriaRadioGroup>
  );
}

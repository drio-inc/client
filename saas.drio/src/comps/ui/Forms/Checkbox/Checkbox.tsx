import { HiCheck } from "react-icons/hi";
import { Checkbox as AriaCheckbox, CheckboxProps } from "react-aria-components";

export default function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox {...props}>
      {({ isIndeterminate }) => (
        <>
          <div className={`checkbox`}>
            <HiCheck className="text-white w-4 h-4 inline-block" />
          </div>
          {children}
        </>
      )}
    </AriaCheckbox>
  );
}

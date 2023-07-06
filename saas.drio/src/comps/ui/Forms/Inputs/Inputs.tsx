import Select, {
  MenuProps,
  components,
  OptionProps,
  ControlProps,
} from "react-select";

import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, useState, ComponentType } from "react";

import {
  HiEye,
  HiPlus,
  HiCheck,
  HiEyeOff,
  HiChevronDown,
  HiExclamationCircle,
} from "react-icons/hi";

import styles from "./Inputs.module.scss";

import { useRouter } from "next/router";
import { FieldError } from "@ui/Forms/Form";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { useFormContext, Controller, FieldValues } from "react-hook-form";

import { setAuthMode } from "@/state/slices/authSlice";

type SharedProps = {
  label: string;
  className?: string;
};

interface InputProps extends ComponentProps<"input">, SharedProps {}
interface SelectProps extends ComponentProps<"select">, SharedProps {
  registerName: string;
  redirect?: boolean;
  hasPlusIndicator?: boolean;
  options: {
    value: string;
    label: string;
  }[];
}

const textInputStyles = cva(`${styles[`ui-inputs`]}`, {
  variants: {},

  defaultVariants: {},
});

interface ITextInputProps
  extends InputProps,
    VariantProps<typeof textInputStyles> {}

export const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  function TextInput({ label, className, ...props }, ref) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const {
      clearErrors,
      formState: { errors },
    } = useFormContext();

    if (!props.name) return null;

    const error = errors[props.name];

    return (
      <div
        className={`${textInputStyles({})} relative flex flex-col ${className}
        `}
      >
        <label className="flex items-center">
          <span className="inline-block text-gray-700 text-sm font-medium">
            {label}
          </span>
        </label>
        <input
          ref={ref}
          {...props}
          onChange={() => clearErrors(props.name)}
          type={isPasswordVisible ? "text" : props.type}
          className={`transition-colors ease-in-out duration-200 border py-2 px-3 my-1 rounded-md focus:outline-none shadow-sm ${
            error
              ? `border-red-300 focus:border-red-300 text-red-900 placeholder-red-900`
              : `border-gray-300 focus:border-gray-700 text-gray-500`
          }`}
        />

        {error && (
          <HiExclamationCircle className="absolute right-3 top-9 text-red-500 w-5 h-5" />
        )}

        {!error && (
          <>
            {props.type === "password" && (
              <>
                <HiEyeOff
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className={`absolute right-3 top-9 text-gray-500 w-5 h-5 cursor-pointer ${
                    isPasswordVisible ? `block` : `hidden`
                  }`}
                />
                <HiEye
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className={`absolute right-3 top-9 text-gray-500 w-5 h-5 cursor-pointer ${
                    isPasswordVisible ? `hidden` : `block`
                  }`}
                />
              </>
            )}
          </>
        )}

        <FieldError name={props.name} />
      </div>
    );
  }
);

const { Option, Control, Menu } = components;

const CustomControl = ({
  registerName,
  ...props
}: ControlProps & { registerName: string }) => {
  const {
    formState: { errors },
  } = useFormContext<FieldValues>();

  const error = errors[registerName];

  return (
    <Control {...props}>
      <div
        className={`cursor-pointer flex justify-between w-full py-2 px-3 my-1 caret-transparent border rounded-md bg-white ${
          error
            ? `border-red-300 focus:border-red-300 text-red-900 placeholder-red-900`
            : `border-gray-300 focus:border-gray-700 text-gray-500`
        }`}
      >
        {props.children}
      </div>
    </Control>
  );
};

const CustomMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <div className="p-2 bg-white py-1 shadow-lg border border-gray-300 rounded-md ring-1 ring-black ring-opacity-5">
        {props.children}
      </div>
    </Menu>
  );
};

const CustomOption = (props: OptionProps) => {
  return (
    <Option {...props}>
      <div
        className={`cursor-pointer hover:bg-gray-50 flex justify-between items-center text-gray-900 p-2`}
      >
        <span className={`${props.isSelected && `font-medium`} text-sm`}>
          {props.label}
        </span>
        <HiCheck
          className={`${props.isSelected ? "visible" : "hidden"} text-drio-red`}
        />
      </div>
    </Option>
  );
};

export const SelectInput = ({
  label,
  options,
  redirect,
  className,
  registerName,
  hasPlusIndicator,
  ...props
}: SelectProps) => {
  const {
    formState: { errors },
  } = useFormContext<FieldValues>();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const error = errors[registerName];

  return (
    <div className={`${textInputStyles({})} relative flex flex-col`}>
      <label className="flex items-center">
        <span className="inline-block text-gray-700 text-sm font-medium">
          {label}
        </span>
      </label>

      <Controller
        name={registerName}
        render={({ field }) => (
          <Select
            unstyled
            {...field}
            options={options}
            onBlur={field.onBlur}
            placeholder={props.placeholder}
            value={options.find((c) => c.value === field.value)}
            onChange={(selectedOption: any) => {
              field.onChange(selectedOption?.value);

              if (redirect) {
                dispatch(setAuthMode(selectedOption?.value));
                router.push(selectedOption?.value);
              }
            }}
            components={{
              Menu: CustomMenu as ComponentType<MenuProps>,
              Option: CustomOption as ComponentType<OptionProps>,
              Control: (props: ControlProps) => (
                <CustomControl registerName={registerName} {...props} />
              ),

              IndicatorSeparator: () => null,
              DropdownIndicator: () =>
                hasPlusIndicator ? <HiPlus /> : <HiChevronDown />,
            }}
          />
        )}
      />

      {error && (
        <span className="text-xs md:text-sm text-gray-500">
          {error?.message as string}
        </span>
      )}
    </div>
  );
};

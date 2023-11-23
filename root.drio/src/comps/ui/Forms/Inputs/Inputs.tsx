import Select, {
  MenuProps,
  components,
  OptionProps,
  ControlProps,
  InputProps as SelectInputProps,
} from "react-select";

import { cva, VariantProps } from "class-variance-authority";

import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  ChangeEvent,
  KeyboardEvent,
  ComponentType,
  ComponentProps,
} from "react";

import {
  HiEye,
  HiPlus,
  HiCheck,
  HiEyeOff,
  HiChevronDown,
  HiExclamationCircle,
} from "react-icons/hi";

import styles from "./Inputs.module.scss";

import { FieldError } from "@ui/Forms/Form";
import { useFormContext, Controller, FieldValues } from "react-hook-form";

type SharedProps = {
  label: string;
  className?: string;
};

interface ITagInputProps extends ComponentProps<"input"> {
  label: string;
  tags?: string[];
  onTagsChange: (tags: string) => void;
}

interface InputProps extends ComponentProps<"input">, SharedProps {}

interface SelectProps extends ComponentProps<"select">, SharedProps {
  registerName: string;
  hasPlusIndicator?: boolean;
  onChangeCustomAction?: (selectedOption?: string) => void;

  defaultSelectedValue?: {
    value: string | number | boolean;
    label: string;
  };

  options: {
    value: string | number | boolean;
    label: string;
  }[];
}

const textInputStyles = cva(`${styles[`ui-inputs`]}`, {
  variants: {},
  defaultVariants: {},
});

interface ITextInputProps
  extends InputProps,
    VariantProps<typeof textInputStyles> {
  icon?: React.ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  function TextInput({ icon, label, className, ...props }, ref) {
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
          type={isPasswordVisible ? "text" : props.type}
          className={`transition-colors ease-in-out duration-200 border py-2 px-3 my-1 rounded-md focus:outline-none shadow-sm ${
            error
              ? `border-red-300 focus:border-red-300 text-red-900 placeholder-red-900`
              : `border-gray-300 focus:border-gray-700 text-gray-500`
          }`}
        />

        {icon && <>{icon}</>}

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

const { Option, Control, Menu, Input } = components;

export const CustomInput = (props: SelectInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FieldValues>();

  return (
    <Input
      {...props}
      {...register(props.name as string)}
      className={`${
        props.isDisabled
          ? `bg-gray-100 text-gray-500`
          : `bg-white text-gray-900`
      }`}
    />
  );
};

const CustomControl = ({
  registerName,
  ...props
}: ControlProps & { registerName?: string }) => {
  const {
    formState: { errors },
  } = useFormContext<FieldValues>();

  const error = errors[registerName || ""];

  return (
    <Control {...props}>
      <div
        className={`cursor-pointer flex justify-between w-full py-2 px-3 my-1 caret-transparent border rounded-md bg-white  ${
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
      <div className="p-2 bg-white py-1 shadow-lg border border-gray-300 rounded-md">
        {props.children}
      </div>
    </Menu>
  );
};

const CustomOption = (props: OptionProps) => {
  return (
    <Option {...props}>
      <div
        className={`cursor-pointer hover:bg-gray-50 flex justify-between items-center p-2 w-full capitalize ${
          props.label === "Add New"
            ? `text-drio-red border-t block`
            : `text-gray-900 `
        } `}
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
  className,
  registerName,
  hasPlusIndicator,
  defaultSelectedValue,
  onChangeCustomAction,
  ...props
}: SelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FieldValues>();

  const error = errors[registerName];

  return (
    <div className={`${textInputStyles({})} relative flex flex-col`}>
      <label className="flex items-center">
        <span className="inline-block text-gray-700 text-sm font-medium">
          {label}
        </span>
      </label>

      <Controller
        control={control}
        name={registerName}
        defaultValue={defaultSelectedValue?.value}
        render={({ field }) => {
          const selectedValue = options.find((c) => c.value === field.value);

          return (
            <Select
              unstyled
              {...field}
              options={options}
              value={selectedValue}
              onBlur={field.onBlur}
              placeholder={props.placeholder}
              onChange={(selectedOption: any) => {
                field.onChange(selectedOption?.value);
                onChangeCustomAction?.(selectedOption?.value);
              }}
              components={{
                Menu: CustomMenu as ComponentType<MenuProps>,
                Option: CustomOption as ComponentType<OptionProps>,
                // Input: CustomInput as ComponentType<SelectInputProps>,
                Control: (props: ControlProps) => (
                  <CustomControl registerName={registerName} {...props} />
                ),

                IndicatorSeparator: () => null,
                DropdownIndicator: () =>
                  hasPlusIndicator ? <HiPlus /> : <HiChevronDown />,
              }}
            />
          );
        }}
      />

      {error && (
        <span className="text-xs md:text-sm text-gray-500">
          {error?.message as string}
        </span>
      )}
    </div>
  );
};

const StatelessCustomControl = ({
  ...props
}: ControlProps & { registerName?: string }) => {
  return (
    <Control {...props}>
      <div
        className={`cursor-pointer flex justify-between w-full py-2 px-3 my-1 caret-transparent border rounded-md bg-white`}
      >
        {props.children}
      </div>
    </Control>
  );
};

export const StatelessSelectInput = ({
  label,
  options,
  className,
  ...props
}: SelectProps) => {
  return (
    <div className={`${textInputStyles({})} relative flex flex-col relative`}>
      <label className="flex items-center">
        <span className="inline-block text-gray-700 text-sm font-medium">
          {label}
        </span>
      </label>

      <Select
        unstyled
        options={options}
        placeholder={props.placeholder}
        onChange={(selectedOption: any) => {
          props.onChange?.(selectedOption?.value);
        }}
        components={{
          Menu: CustomMenu as ComponentType<MenuProps>,
          Option: CustomOption as ComponentType<OptionProps>,
          Control: (props: ControlProps) => (
            <StatelessCustomControl {...props} />
          ),

          IndicatorSeparator: () => null,
          DropdownIndicator: () => <HiChevronDown />,
        }}
      />
    </div>
  );
};

export const TagInput = forwardRef<HTMLInputElement, ITagInputProps>(
  function TagInput(
    { tags = [], onTagsChange, label, children, ...props },
    ref
  ) {
    const divRef = useRef<HTMLDivElement>(null);
    const [inputWidth, setInputWidth] = useState(0);

    useEffect(() => {
      setInputWidth(divRef.current?.offsetWidth || 0);
    }, [tags]);

    const handleChange = (
      event: KeyboardEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>
    ) => {
      if (event.currentTarget.value !== "") {
        if (event.currentTarget.value.includes(",")) {
          const tag = event.currentTarget.value.replace(",", "");
          onTagsChange(tag);
        } else {
          onTagsChange(event.currentTarget.value);
        }
        event.currentTarget.value = "";
      }
    };

    return (
      <div>
        <label className="flex items-center">
          <span className="inline-block text-gray-700 text-sm font-medium">
            {label}
          </span>
        </label>

        <div
          ref={divRef}
          className="flex flex-wrap justify-between px-1 my-1 border rounded-md shadow-sm"
        >
          {children}

          <input
            ref={ref}
            {...props}
            placeholder="Enter tags"
            className="flex-1 focus:outline-none py-2 px-3 rounded-md -mx-1"
            style={{
              width: `calc(${inputWidth}px - ${50}px)`,
              minWidth: `40%`,
            }}
            onKeyUp={(event) =>
              event.key === "," ||
              event.code === "Enter" ||
              event.code === "Space"
                ? handleChange(event)
                : null
            }
          />
        </div>
      </div>
    );
  }
);

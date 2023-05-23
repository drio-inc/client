import { cva, VariantProps } from "class-variance-authority";

import styles from "./Button.module.scss";
import React from "react";
import { RiLoader4Fill } from "react-icons/ri";

const buttonStyles = cva(`${styles[`ui-button`]}`, {
  variants: {
    intent: {
      google: `${styles[`google-button`]}`,
      primary: `${styles[`primary-button`]}`,
      secondary: `${styles[`secondary-button`]}`,
    },
  },

  defaultVariants: {
    intent: "primary",
  },
});

export interface IButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonStyles> {
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = ({
  intent,
  isLoading,
  className,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button className={`${buttonStyles({ intent })} ${className}`} {...props}>
      <div className="flex justify-center w-full">
        {children}
        {isLoading && (
          <RiLoader4Fill className="inline-flex animate-spin h-5 w-5 ml-2" />
        )}
      </div>
    </button>
  );
};

export default Button;

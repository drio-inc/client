import styles from "./Button.module.scss";
import { RiLoader4Fill } from "react-icons/ri";
import { cva, VariantProps } from "class-variance-authority";

const buttonStyles = cva(`${styles[`ui-button`]}`, {
  variants: {
    intent: {
      google: `${styles[`google-button`]}`,
      primary: `${styles[`primary-button`]}`,
      secondary: `${styles[`secondary-button`]}`,
      primaryOutline: `${styles[`primary-outline-button`]}`,
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
  icon?: React.ReactNode;
  children: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  icon,
  intent,
  children,
  isLoading,
  className,
  iconPosition = "left",
  ...props
}: IButtonProps) => {
  return (
    <button className={`${buttonStyles({ intent })} ${className}`} {...props}>
      <div className="flex justify-center w-full items-center gap-1">
        {!isLoading && icon && (
          <span
            className={`inline-flex ${
              iconPosition === "left" ? "order-first" : "order-last"
            }`}
          >
            {icon}
          </span>
        )}

        {children}

        {isLoading && (
          <RiLoader4Fill className="inline-flex animate-spin h-5 w-5 ml-2" />
        )}
      </div>
    </button>
  );
};

export default Button;

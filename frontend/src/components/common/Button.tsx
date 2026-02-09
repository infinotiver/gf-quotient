import type { ButtonHTMLAttributes } from "react";
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonClassName";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClassName(variant, size, className)} {...props} />
  );
}

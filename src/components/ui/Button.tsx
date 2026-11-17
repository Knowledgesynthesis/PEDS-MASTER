import React from 'react';
import { buttonClass, type ButtonVariant, type ButtonSize } from './buttonClass';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => (
    <button ref={ref} type={type} className={buttonClass(variant, size, className)} {...props} />
  )
);
Button.displayName = 'Button';

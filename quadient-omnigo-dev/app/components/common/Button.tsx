import { ReactNode, MouseEventHandler } from 'react';

// Type definitions
type ButtonVariant = 'primary' | 'outline' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    disabled?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    className = '',
    disabled
}: ButtonProps) {
    const baseStyles = "rounded-xl font-medium transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed border border-transparent";

    const variantStyles: Record<ButtonVariant, string> = {
        primary: "bg-primary text-white hover:bg-white hover:text-primary hover:border-primary",
        outline: "!border-primary text-primary hover:text-white hover:bg-primary",
        secondary: "bg-toxicLatte text-coolGreen hover:border-coolGreen",
        danger: "bg-roseMochi text-primary hover:border-primary",
        ghost: "text-[#949494]",
    };

    const sizeStyles: Record<ButtonSize, string> = {
        sm: 'px-3 py-2 text-sm',
        md: 'lg:px-6 px-4 py-2 lg:py-3 sm:text-lg text-base lg:text-xl',
    };

    const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} cursor-pointer transition-all duration-300 disabled:border-transparent disabled:!bg-[#949494] disabled:text-white`;

    return (
        <button
            onClick={onClick}
            className={buttonStyles}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
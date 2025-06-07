import React from 'react';

// Type definitions
interface SavingCardProps {
    bgColor: string;
    label: string;
    amount: string | number;
    unit: string;
}

const SavingCard: React.FC<SavingCardProps> = ({ bgColor, label, amount, unit }) => {
    return (
        <div className={`${bgColor} saving-card`}>
            <p className="font-medium text-gray leading-full letter-spacing-3 text-base md:text-xl lg:text-2xl xl:text-[28px]">
                {label}
            </p>
            <p className="saving-amount font-montserrat">
                {amount} <span className="text-lg sm:text-xl lg:text-2xl xl:text-[30px]">{unit}</span>
            </p>
        </div>
    );
};

export default SavingCard;
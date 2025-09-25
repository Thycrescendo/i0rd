import React, { MouseEvent } from 'react';

interface ButtonProps {
  className?: string;
  title: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  value?: string;
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  title,
  type = 'button',
  onClick = () => {},
  value,
}) => {
  return (
    <button
      className={`${className} hover:opacity-70 bordred rounded-2xl py-2 px-6 bg-red-600 text-lg text-white font-Montserrat font-bold`}
      onClick={onClick}
      type={type}
      value={value}
    >
      {title}
    </button>
  );
};
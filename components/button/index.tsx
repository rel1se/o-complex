import React from 'react';
import './button.scss';

type ButtonProps = {
    title: string;
    onClick?: () => void;
    disabled?: boolean;
    size?: 'full' | 'auto' | 'small';
};

export const Button: React.FC<ButtonProps> = ({
                                                  title,
                                                  onClick,
                                                  disabled = false,
                                                  size = 'full',
                                              }) => {
    return (
        <button
            className={`custom-button ${size}`}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    );
};

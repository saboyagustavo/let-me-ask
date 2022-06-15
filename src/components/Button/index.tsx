import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function Button({isOutlined, ...props}: ButtonProps) {
  return (
    <button
      {...props}
      className={
        `default-button 
        ${props?.className}
        ${isOutlined && 'outlined'}
      `}
    />
  );
}
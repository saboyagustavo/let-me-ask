import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> 

export function Button(props: ButtonProps) {
  return <button {...props} className={'default-button ' + props?.className} />;
}
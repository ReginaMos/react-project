import type { ButtonProps } from '../models/models';

export default function Button({
  onAction,
  class: className,
  text,
}: ButtonProps) {
  return (
    <button onClick={onAction} className={className}>
      {text}
    </button>
  );
}

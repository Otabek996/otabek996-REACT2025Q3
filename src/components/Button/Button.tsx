interface Props {
  buttonText: string;
  callback: () => void;
  className: string;
}

function Button({ buttonText, callback, className }: Props) {
  return (
    <button className={className} type="button" onClick={callback}>
      <span>{buttonText}</span>
    </button>
  );
}

export default Button;

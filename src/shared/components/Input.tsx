import { LegacyRef, forwardRef } from "react";

interface IInput {
  htmlFor?: string;
  type?: string;
  label?: string;
  classes?: string;
  placeholder: string;
  showLabel?: boolean;
}

function InputEL(
  {
    htmlFor,
    label,
    placeholder,
    type = "text",
    showLabel = true,
    classes,
    ...props
  }: IInput,
  ref: LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <div className="mb-5">
      {showLabel && (
        <label
          htmlFor={htmlFor}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={htmlFor}
        {...props}
        className={`bg-gray-50 border border-gray-300 outline-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classes}`}
        placeholder={placeholder}
      />
    </div>
  );
}
const Input = forwardRef(InputEL);
export default Input;

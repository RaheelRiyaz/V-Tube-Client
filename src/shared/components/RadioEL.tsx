import { LegacyRef, forwardRef } from "react";
interface IRadioEL {
  htmlFor: string;
  label?: string;
  nameOfKey: string;
  nameOfValue?: string;
  defaultValue?: string | number;
  checkedValue?: string|number;
  options: unknown[];
  showLabel?: boolean;
}

function RadioEL(
  {
    htmlFor,
    options,
    nameOfValue = "id",
    nameOfKey,
    label,
    showLabel,
    checkedValue,
    ...props
  }: IRadioEL,
  ref: LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <div>
      {showLabel && <label>{label}</label>}
      {options &&
        options.map((_, i) => {
          return (
            <div className="flex items-center mb-4" key={i}>
              <input
                id={htmlFor + i}
                type="radio"
                name="radio"
                value={_[nameOfValue]}
                ref={ref}
                {...props}
                checked={_[nameOfValue] === checkedValue}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={htmlFor + i}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {_[nameOfKey]}
              </label>
            </div>
          );
        })}
    </div>
  );
}
const Radio = forwardRef(RadioEL);
export default Radio;

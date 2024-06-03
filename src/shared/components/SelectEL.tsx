import { LegacyRef, forwardRef, useState } from "react";

interface ISelectEL {
  htmlFor: string;
  label: string;
  nameOfKey: string;
  nameOfValue?: string;
  defaultValue?: string | number;
  selectedValue: string;
  options: unknown[];
  showLabel?: boolean;
}
function SelectEL(
  {
    htmlFor,
    label,
    showLabel = true,
    selectedValue,
    nameOfValue = "id",
    nameOfKey,
    options,
    defaultValue = "",
    ...props
  }: ISelectEL,
  ref: LegacyRef<HTMLSelectElement> | undefined
) {
  const [selected, setSelected] = useState(defaultValue);
  return (
    <div className="max-w-sm mx-auto">
      {showLabel && (
        <label
          htmlFor={htmlFor}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        {...props}
        onChange={(e) => setSelected(e.target.value)}
        id={htmlFor}
        value={selected}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>
          {selectedValue}
        </option>
        {options.map((_, i) => {
          return (
            <option key={i} value={_[nameOfValue]}>
              {_[nameOfKey]}
            </option>
          );
        })}
      </select>
    </div>
  );
}
const Select = forwardRef(SelectEL);
export default Select;

import React, { HTMLProps, MutableRefObject } from "react";

const Checkbox = React.forwardRef(
  (props: HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div className="flex">
        <input {...props} type="checkbox" className="peer " />
        <label
          onClick={() => {}}
          htmlFor="choose-me"
          className="cursor-pointer select-none rounded-lg border-2 border-gray-200 
        py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:border-gray-200 peer-checked:bg-gray-200 peer-checked:text-gray-900 "
        >
          {props.name}
        </label>
      </div>
    );
  }
);

export default Checkbox;

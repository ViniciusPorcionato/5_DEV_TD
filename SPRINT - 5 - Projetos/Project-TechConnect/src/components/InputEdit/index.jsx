import React from "react";

export const InputEdit = (props) => {
    return (
        <div className="flex justify-between max-sm:flex-col items-center p-2 border border-[#C9C9C9] rounded ">
          <textarea
            onChange={props.onChangeText}
            value={props.valueText}
            rows={3}
            className="w-full bg-transparent border-none placeholder:text-primary  outline-none overflow-hidden resize-none pb-2"
            placeholder={props.placeholder}
          />
        </div>
      );
}
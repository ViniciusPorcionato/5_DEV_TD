"use client";
import { ImagePlus } from "lucide-react";
import React from "react";

const InputPublication = (props) => {
  return (
    <div className="flex h-full justify-between flex-col gap-2 items-center ">
      <textarea
        onChange={props.onChangeText}
        value={props.valueText}
        rows={3}
        className="w-full bg-transparent text-primary h-full p-2 rounded-md outline-none overflow-hidden border border-primary/50 resize-none pb-2 overflow-y-auto"
        placeholder={props.placeholder}
      />

      <div className="w-full">
        <input
          className="hidden"
          id="image-input"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={props.onChange}
          value={props.valueImage}
        />

        <label
          htmlFor="image-input"
          className="w-full flex justify-center border cursor-pointer border-primary py-2 rounded-md"
        >
          <ImagePlus className="text-primary " />
        </label>
      </div>
    </div>
  );
};

export default InputPublication;

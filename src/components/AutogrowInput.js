import React from "react";

const AutogrowInput = ({wrapperStyles= 'ml-4', className = 'text-lg', value, size = 1, ...props}) => (
  <div className={`inline-grid [place-items:center_start] border-b-2 border-zinc-800 border-dotted ${wrapperStyles}`}>
    <input className={`[grid-area:1/1/2/2] h-full bg-transparent appearance-none bg-none border-none min-w-[1rem] resize-none w-full ${className}`} size={size} value={value} {...props}/>
    <span className={`[visibility:hidden] [grid-area:1/1/2/2] ${className}`}>{value}</span>
  </div>
)

export default AutogrowInput;
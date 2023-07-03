import React, { useState } from "react";

const SimpleSelectInput = ({value, className, options, onChange}) =>  {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className={`cursor-pointer flex flex-col ${className} ${!showOptions && 'border-2 border-teal-900'}`}>
      <div className={`text-xl px-4 ${showOptions && 'opacity-0'}`} onClick={() => setShowOptions(true)}>
        {value}
      </div>
      { showOptions &&
        <div className={`absolute border-2 border-teal-900 bg-white`}>
          <div className={`cursor-pointer flex flex-col`}>
            <div className="text-xl px-4 w-full hover:bg-teal-300 [transition:background_1s_ease]" onClick={()=> setShowOptions(false)}>{value}</div>
            {options.filter(o => o !== value).map(option => (
              <div className="text-xl px-4 w-full hover:bg-teal-300 [transition:background_1s_ease]" onClick={()=> {onChange(option); setShowOptions(false)}}>{option}</div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default SimpleSelectInput;
import React from 'react'

function Dice(props) {
  return (
    <div className={`${props.isHold ? "bg-[#59E391]" : "bg-white"} h-[70px] w-[70px] col-span-1 shadow-lg rounded-md flex justify-center items-center`}
         onClick={(event) => props.handleClick(event.target, props.id)}
    >
        <h2 className='font-bold text-3xl'>{props.number}</h2>
    </div>
  )
}

export default Dice
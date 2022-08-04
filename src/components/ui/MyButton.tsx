import React, { FC } from "react";

interface MyButtonProps{
  children?:React.ReactNode
  onClick:()=>void
}

const MyButton:FC<MyButtonProps> = ({children,onClick}) => {
  return <button onClick={onClick} className="bg-violet-500 rounded-lg py-2 px-6 hover:bg-purple-700 hover:scale-110 transition-all ease-in-out duration-300">{children}</button>
};

export default MyButton;

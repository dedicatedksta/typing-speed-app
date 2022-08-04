import React, { FC } from "react";
import {VscError} from "react-icons/vsc"

interface InfoProps{
  timer:number;
  won:boolean;
  cpm:number;
  wpm:number;
  mistakes:number;
}

const Info:FC<InfoProps> = ({timer,won,cpm,wpm,mistakes}) => {
  return <div className="flex items-center gap-4">
    <span>Time left: {timer}</span>
    <span className="flex items-center gap-1"><VscError className=" text-red-500"/> <strong>{mistakes}</strong></span>
    {won&&<span>WPM: {wpm}</span>}
    {won&&<span>CPM: {cpm}</span>}
  </div>
};

export default Info;

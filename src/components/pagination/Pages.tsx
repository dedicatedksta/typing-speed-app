import React, { FC } from "react";
import { getTotalPages } from "../../utils/getTotalPages";

interface PagesProps{
  totalPages:number
  setPage:(page:number)=>void
  currentPage:number
}

const Pages:FC<PagesProps> = ({totalPages,setPage,currentPage}) => {

  const pagesArray=getTotalPages(totalPages)
  console.log(pagesArray)
  return <div className="text-2xl my-6 jusify-center">
    <div className="flex  mx-auto box-border gap-2" style={{width: "max-content"}}>
      {pagesArray.map(p=>
        <div className={`py-1 px-2 border-2 ${p===currentPage?"border-violet-400" : ""} cursor-pointer`} key={p} onClick={()=>setPage(p)}>{p}</div>
        )}
    </div>
  </div>;
};

export default Pages;

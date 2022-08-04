import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../api/jsonplaceholderService";
import { useFetching } from "../hooks/useFetching";
import { ICard } from "../types/types";
import Pages from "./pagination/Pages";
import Loader from "./ui/Loader";
import MyButton from "./ui/MyButton";

const Cards = () => {

  const [cards,setCards]=useState<ICard[]>([])
  const [page,setPage]=useState<number>(1)
  const limit=12
  const [totalPages,setTotalPages]=useState<number>(0)
  const lastEl=React.useRef<HTMLDivElement>(null)
  const navigate=useNavigate()

  const [fetch,isLoading,error]=useFetching(async()=>{
    const response=await PostService.getAll(page,limit)
    setTotalPages(Math.round(Number(response.headers['x-total-count'])/limit))
    setCards(response.data)
  })

  

  useEffect(()=>{
    fetch()
  },[page])

  const updatePage=(page:number)=>{
    setPage(page)
  }

  return <div >
    <h1 className="text-4xl font-bold text-center mb-4 my-8">Races</h1>
    {isLoading
      ?<Loader/>
      :<div className=" min-w-[640px]">
        {cards.map(card=>
          <div className="border p-4 text-lg flex justify-between" key={card.id}>
            <h3 className="max-w-lg">{card.title}</h3>
            <MyButton onClick={()=>navigate("/races/"+card.id)}>RACE</MyButton>
          </div>
          )}
          
      </div>
      
    }
    <div ref={lastEl}/>
    <Pages totalPages={totalPages} setPage={updatePage} currentPage={page}/>
  </div>;
};

export default Cards;

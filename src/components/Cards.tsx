import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../api/jsonplaceholderService";
import { useFetching } from "../hooks/useFetching";
import { ICard } from "../types/types";
import Loader from "./ui/Loader";
import MyButton from "./ui/MyButton";

const Cards = () => {

  const [cards,setCards]=useState<ICard[]>([])
  const [page,setPage]=useState<number>(1)
  const navigate=useNavigate()

  const [fetch,isLoading,error]=useFetching(async()=>{
    const response=await PostService.getAll(page)
    setCards(response.data)
  })

  useEffect(()=>{
    fetch()
  },[])

  return <div >
    <h1 className="text-4xl font-bold text-center mb-4">Races</h1>
    {isLoading
      ?<Loader/>
      :<div>
        {cards.map(card=>
          <div className="border p-4 text-lg flex justify-between" key={card.id}>
            <h3 className="max-w-lg">{card.title}</h3>
            <MyButton onClick={()=>navigate("/races/"+card.id)}>RACE</MyButton>
          </div>
          )}
      </div>
      
    }
  </div>;
};

export default Cards;

import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostService from "../api/jsonplaceholderService";
import { useFetching } from "../hooks/useFetching";
import { decrementIndexAction, incrementIndexAction } from "../store/indexReducer";
import { ICard } from "../types/types";
import Info from "./Info";
import Navbar from "./Navbar";
import Loader from "./ui/Loader";
import MyButton from "./ui/MyButton";




const Card:FC= () => {

  const {id}=useParams<any>()
  const dispatch=useDispatch()
  const [card,setCard]=useState<ICard>()
  const index=useSelector((state:{index:number})=>state.index)
  const [value,setValue]=useState<string>("")
  const [allChars,setAllChars]=useState<string[]>([])
  const [renderedText,setRenderedText]=useState<string>("")
  const inputRef=useRef<HTMLInputElement>(null)
  const divRef=useRef<HTMLDivElement>(null)
  const [won,setWon]=useState<boolean>(false)
  const [mistakes,setMistakes]=useState<number>(0)
  const [cpm,setCpm]=useState<number>(0)
  const [wpm,setWpm]=useState<number>(0)
  const [timer,setTimer]=useState<number>(60)
  
  const [fetch,isLoading,error]=useFetching(async ()=>{
    const data=await PostService.getPostById(id)
    setCard(data)
    data.body.split("").forEach(ch=>{
      setRenderedText(prev=>prev+`<span>${ch}</span>`)
    })
    const newArr=data.body.split("").map(x=>x=="\n"?" ":x)
    setAllChars(newArr)
  })

  useEffect(()=>{
    fetch()
  },[])

  useEffect(()=>{
    if (timer>0){
      setTimeout(()=>{
        setTimer(timer-1)
      },1000)
    }
  },[timer])

  
  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setValue(e.target.value)
    const typedChars=e.target.value.split("")
    
    if ((typedChars.length===allChars.length && mistakes===0) || timer<=0){
      setWon(true)
      setCpm(typedChars.length-mistakes)
      setWpm(Math.round((typedChars.length-mistakes)/5))
    }
    if (typedChars[index]===undefined){
      dispatch(decrementIndexAction(1))
      if (divRef.current?.children[index-1].classList.contains('incorrect'))setMistakes(mistakes-1)
      divRef.current?.children[index-1].classList.remove('correct','incorrect','space-incorrect','space-correct')
    }else{
      if (allChars[index]===typedChars[index]){
        if(allChars[index]===" " || allChars[index]=="\n")divRef.current?.children[index].classList.add('space-correct')
        divRef.current?.children[index].classList.add('correct')
        console.log("correct")
      }else{
        console.log('incorrect')
        if(allChars[index]==" "){divRef.current?.children[index].classList.add('space-incorrect')}
        divRef.current?.children[index].classList.add('incorrect')
        setMistakes(mistakes+1)
      }
      dispatch(incrementIndexAction(1))
    }

  }

  if (isLoading)return <Loader/>

  return <div className=" max-w-3xl mx-auto text-xl border p-4 rounded-xl tracking-wide   bg-slate-800">
    <Navbar/>
    <input ref={inputRef} className="opacity-0 absolute top-0" disabled={won}  autoFocus type="text" value={value} onChange={handleChange} />
    <main>
      <div ref={divRef} onClick={()=>{inputRef.current?.focus()}} dangerouslySetInnerHTML={{__html: renderedText}} />
    </main>
    <div className="text-base mt-3 flex justify-between">
      <Info timer={timer} won={won} cpm={cpm} wpm={wpm} mistakes={mistakes}/>
      <MyButton onClick={()=>window.location.reload()} >Try Again</MyButton>
    </div>
  </div>;
};

export default Card;

import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementIndexAction, incrementIndexAction } from "../store/indexReducer";
import Info from "./Info";
import MyButton from "./ui/MyButton";


interface CardProps{
  title:string
  text:string
}

const Card:FC<CardProps>= ({title,text}) => {

  const dispatch=useDispatch()
  const index=useSelector((state:{index:number})=>state.index)
  const [value,setValue]=useState<string>("")
  const allChars=text.split("")
  const [renderedText,setRenderedText]=useState<string>("")
  const inputRef=useRef<HTMLInputElement>(null)
  const divRef=useRef<HTMLDivElement>(null)
  const [won,setWon]=useState<boolean>(false)
  const [mistakes,setMistakes]=useState<number>(0)
  const [cpm,setCpm]=useState<number>(0)
  const [wpm,setWpm]=useState<number>(0)
  const [timer,setTimer]=useState<number>(60)
  
  useEffect(()=>{
    text.split("").forEach(ch=>{
      setRenderedText(prev=>prev+`<span>${ch}</span>`)
    })
  },[])

  useEffect(()=>{
    if (timer>0){
      setTimeout(()=>{
        setTimer(timer-1)
      },1000)
    }
  },[timer])


  function  logic(typedChars:string[]){
  
    if (typedChars[index]===undefined){
      dispatch(decrementIndexAction(1))
      if (divRef.current?.children[index-1].classList.contains('incorrect'))setMistakes(mistakes-1)
      divRef.current?.children[index-1].classList.remove('correct','incorrect','space')
    }else{
      if (allChars[index]===typedChars[index]){
        if(allChars[index]===" ")divRef.current?.children[index].classList.add('space')
        divRef.current?.children[index].classList.add('correct')
        console.log("correct")
      }else{
        console.log('incorrect')
        if(allChars[index]===" ")divRef.current?.children[index].classList.add('space')
        divRef.current?.children[index].classList.add('incorrect')
        setMistakes(mistakes+1)
      }
      dispatch(incrementIndexAction(1))
    }
  }
  
  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setValue(e.target.value)
    const typedChars=e.target.value.split("")
    if ((typedChars.length===allChars.length && mistakes===0) || timer<=0){
      setWon(true)
      setCpm(typedChars.length-mistakes)
      setWpm(Math.round((typedChars.length-mistakes)/5))
    }
    logic(typedChars)

  }

  return <div className=" max-w-3xl mx-auto text-xl border p-4 rounded-xl bg-slate-800">
    <input ref={inputRef} className="opacity-0 absolute" disabled={won}  autoFocus type="text" value={value} onChange={handleChange} />
    <main>
      <h2 className="font-bold text-2xl mb-2">{title}</h2>
      <div ref={divRef} onClick={()=>{inputRef.current?.focus()}} dangerouslySetInnerHTML={{__html: renderedText}} />
    </main>
    <div className="text-base mt-3 flex justify-between">
      <Info timer={timer} won={won} cpm={cpm} wpm={wpm} mistakes={mistakes}/>
      <MyButton onClick={()=>window.location.reload()} >Try Again</MyButton>
    </div>
  </div>;
};

export default Card;

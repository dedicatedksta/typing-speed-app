import axios from "axios";
import { useState } from "react";
import { ICard } from "../types/types";


export const useFetching=(callback:()=>Promise<void>):[()=>Promise<void>,boolean,string]=>{
  const [error,setError]=useState<string>("")
  const [isLoading,setIsLoading]=useState<boolean>(false)

  const fetch=async()=>{
    try {
      setIsLoading(true)
      await callback()
      
    } catch (e:any) {
      setError(e.message)
    }finally{
      setIsLoading(false)
    }
  }

  return [fetch,isLoading,error]
}
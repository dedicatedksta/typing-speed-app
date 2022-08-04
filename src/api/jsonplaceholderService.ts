import axios from "axios";
import { ICard } from "../types/types";

export default class PostService{

  static async getAll(page=1){
    
    const response=await axios.get<ICard[]>("https://jsonplaceholder.typicode.com/posts",{
      params:{
        _limit:10,
        _page:page
      }
    })
    return response
  }

  static async getPostById(id:string|undefined){
    
    const response=await axios.get<ICard>("https://jsonplaceholder.typicode.com/posts/"+id)
    return response.data
  }

}
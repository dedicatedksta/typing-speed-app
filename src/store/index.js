import { createStore } from "redux";
import { indexReducer } from "./indexReducer";



export const store=createStore(indexReducer)
const defaultState={
  index:0
}

const INCREMENT_INDEX="INCREMENT_INDEX"
const DECREMENT_INDEX="DECREMENT_INDEX"

export const indexReducer=(state=defaultState,action)=>{
  switch (action.type){

    case INCREMENT_INDEX:
      return {...state,index:state.index+action.payload}

    case DECREMENT_INDEX:
      return {...state,index:state.index-action.payload}

    default:
      return state

  }
}

export const incrementIndexAction=(payload)=>({type:INCREMENT_INDEX,payload})
export const decrementIndexAction=(payload)=>({type:DECREMENT_INDEX,payload})
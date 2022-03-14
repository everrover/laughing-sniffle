import React, {useReducer} from 'react'

const init = { // Initial state
  count: 0,
}
  
export const Context = React.createContext(init)
const {Provider, Consumer} = Context

export function ParentProvider(props) {
  const [state, dispatch] = useReducer((state, action)=>{
    const {count} = state
    switch(action.type){
      case 'INC_COUNT':
        return {...state, count: count+1}
      case 'DEC_COUNT':
        return {...state, count: count-1}
      default:
        return state
    }
  }, init)
  return (
    <Provider value={{state, dispatch}}>
      {props.children}
    </Provider>
  )
}

ParentProvider.propTypes = {}
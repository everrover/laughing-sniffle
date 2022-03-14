import React, { useCallback, useEffect, useRef, useState } from "react";

const useMutationObserverRef = (configs={
  childList: true, // 1
  attributes: true, // 2
  characterData: false, // 3, Atleast one of 1,2,3 should be true
  subtree: false,
  attributeFilter: ['one', 'two'],
  attributeOldValue: false,
  characterDataOldValue: false
}, action=(entry, idx)=>{
  console.log('Entry:', idx, entry)
}) => {
  const refs = useRef([])
  const [loaded, setLoaded] = useState(false)
  useEffect(()=>{
    if(loaded){
      const observer = new MutationObserver((entries, observer)=>{
        entries.forEach((entry, idx) => action(entry, idx))
      })
      if(refs && refs.current && refs.current.length>0){
        try{
          // const records = observer.takeRecords()
          // console.log(records)
          refs.current.forEach(ref=>observer.observe(ref, configs))
        }catch(err){
          console.error(err)
        }
      }
      console.log("[L]Loaded.")
      return () => {
        console.log("[L]Unloaded.")
        observer.disconnect()
      }
    }else{
      // console.log("Unloaded.")
      return () => {
        // console.log("Loaded.")
      }
    }
  }, [loaded, configs])

  
  const loadUp = useCallback(() => {
    if(!loaded){
      console.log("LoadUp")
      setLoaded(true)
    }
  }, [setLoaded, loaded])

  const loadDown = useCallback(() => {
    console.log("LoadDown")
    if(loaded){ setLoaded(false)}
  }, [setLoaded, loaded])

  const addRef = useCallback((newRef) => {
    // console.log("add ref:", newRef)
    if(newRef && !(refs.current.includes(newRef)))
      refs.current.push(newRef);
  }, [refs])
  return [addRef, loadUp, loadDown]
}

export default useMutationObserverRef
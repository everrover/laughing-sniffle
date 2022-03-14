import React, { useCallback, useEffect, useRef, useState } from "react";

const useResizeObserverRef = (imageSet=[], blockWidth=200, action=(a)=>{
  console.log(a)
}) => {
  const ref = useRef()
  const [loaded, setLoaded] = useState(false)
  const [images, setImages] = useState([imageSet[0]])
  useEffect(()=>{
    if(loaded){
      const observer = new ResizeObserver((entries, observer) => {
        entries.forEach((entry, idx) => {
          // console.log(entry)
          const width = entry.contentRect.width
          const imgCount = Math.floor(width/blockWidth)
          // console.log(idx+":"+imgCount)
          setImages(imageSet.slice(0, imgCount))
        })
      })
      if(ref && ref.current) observer.observe(ref.current)
      console.log("[L]Loaded.")
      return () => {
        console.log("[L]Unloaded.")
        observer.disconnect()
      }
    }else{
      console.log("Unloaded.")
      return () => {
        console.log("Loaded.")
      }   
    }
  }, [loaded, imageSet, blockWidth])

  
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
    if(newRef && !(ref.current===newRef))
      ref.current = newRef;
  }, [ref])
  return [addRef, loadUp, loadDown, images]
}

export default useResizeObserverRef
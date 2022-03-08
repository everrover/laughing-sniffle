import React, { useCallback, useEffect, useRef, useState } from "react";

const useIntersectionObserverRef = (imageSet=[], blockWidth=200) => {
  const ref = useRef()
  const [loaded, setLoaded] = useState(false)
  const [images, setImages] = useState([imageSet[0]])
  useEffect(()=>{
    if(loaded){
      const observer = new ResizeObserver((entries, observer) => {
        entries.forEach((entry, idx) => {
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

  const addRef = useCallback((r) => {
    if(r && !(ref.current===r))
      ref.current = r;
  }, [ref])
  return [addRef, loadUp, loadDown, images]
}

export default useIntersectionObserverRef
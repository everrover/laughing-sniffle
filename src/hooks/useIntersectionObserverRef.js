import React, { useCallback, useEffect, useRef, useState } from "react";

const useIntersectionObserverRef = (configs=null, removeAfterIntersect=false) => {
  const refs = useRef([])
  const [loaded, setLoaded] = useState(false)
  configs = configs || {
    root: null,
    rootMargin: '0px',
    threshold: [1.0]
  }
  useEffect(()=>{
    if(loaded){
      const observer = new IntersectionObserver((entries, observer) => {
        // let len = entries.filter(entry => !entry.isIntersecting).length
        // console.log(len)
        entries.forEach((entry, idx) => {
          if(entry.isIntersecting){
            // console.log(idx, len, entry.target.querySelector('h2').innerText)
            entry.target.classList.add('visible')
            if(removeAfterIntersect) observer.unobserve(entry.target)
          }else{
            if(!removeAfterIntersect) entry.target.classList.remove('visible')
          }
        })
      }, configs)
      refs.current.forEach(ref => {
        if(ref) observer.observe(ref)
      })
      return () => {
        observer.disconnect()
      }
    }else{
      return () => {}
    }
  }, [loaded, configs])

  
  const loadUp = useCallback(() => {
    if(!loaded){ setLoaded(true)}
  }, [setLoaded, loaded])

  const addRef = useCallback((ref) => {
    if(ref && !refs.current.includes(ref))
      refs.current.push(ref);
  }, [refs])
  return [addRef, loadUp]
}

export default useIntersectionObserverRef
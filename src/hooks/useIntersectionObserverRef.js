import React, { useCallback, useEffect, useRef, useState } from "react";

const useIntersectionObserverRef = (configs={
  root: null,
  rootMargin: '0px',
  threshold: [1.0]
}, removeAfterIntersect=false) => {
  const refs = useRef([])
  const visibleRefs = useRef(new Set())
  const [loaded, setLoaded] = useState(false)
  useEffect(()=>{
    if(loaded){
      const observer = new IntersectionObserver((entries, observer) => {
        // let len = entries.filter(entry => !entry.isIntersecting).length
        entries.forEach((entry, idx) => {
          if(entry.isIntersecting){
            // console.log(idx, len, entry.target.querySelector('h2').innerText)
            entry.target.classList.add('visible')
            if(removeAfterIntersect){ 
              observer.unobserve(entry.target)
              visibleRefs.current.add(entry.target)
              const index = refs.current.findIndex(ref => ref === entry.target)
              if (index > 5 && visibleRefs.current.has(refs.current[index-5])){
                visibleRefs.current.delete(refs.current[index-10]) 
                observer.observe(refs.current[index-10])
                refs.current[index-10].classList.remove('visible')
              }
              if (index < refs.current.length-6 && visibleRefs.current.has(refs.current[index+5])){
                visibleRefs.current.delete(refs.current[index+5]) 
                observer.observe(refs.current[index+5])
                refs.current[index+5].classList.remove('visible')
              }
            }
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
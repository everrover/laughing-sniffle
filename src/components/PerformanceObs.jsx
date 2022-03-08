import React, { useCallback, useEffect, useRef, useState } from 'react'
import service from '../service'
import useIntersectionObserverRef from '../hooks/useIntersectionObserverRef'

const Card = (props) => {
  return (
    <div className='card' ref={props.elRef}>
      <img src={props.url} alt={props.title}/>
      <h2>{props.title}</h2>
      <p>{props.subtitle}</p>
      <div className='tags'>
        <span>{props.tags}</span>
        <span>{props.tags}</span>
        <span>{props.tags}</span>
      </div>
    </div>
  )
}
  

function IntersectionObs(props) {
  const [data, setData] = useState([])

  const [addRef, loadUp] = useIntersectionObserverRef({
    root: null,
    rootMargin: '32px',
    threshold: [0.8]
  }, true)

  useEffect(() => {
    service([0, 100])
      .then(res=>{
        setData(res)
      })
    return () => {}
  }, [setData])
  return (
    <div className='intersection-observer-demo'>
      {
        data.map((item, idx)=>{
          if(idx===data.length-1) loadUp() // set to `loaded` only once
          {/*return <Card elRef={refs.current[idx]} key={item.title+"-"+idx} {...item}/>*/}
          return <div key={idx} className='card' ref={ref=>addRef(ref)}>
            <img src={item.url} alt={item.title}/>
            <h2>{idx+":"+item.title}</h2>
            <p>{item.subtitle}</p>
            <div className='tags'>
              <span>{item.tags}</span>
              <span>{item.tags}</span>
              <span>{item.tags}</span>
            </div>
          </div>
        })
      }
    </div>
  )
}

IntersectionObs.propTypes = {}

export default IntersectionObs;

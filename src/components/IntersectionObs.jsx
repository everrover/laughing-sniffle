import React, { createRef, useCallback, useEffect, useRef, useState } from 'react'
import service from '../service'

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
  const refs = useRef([])
  const [loaded, setLoaded] = useState(false)
  const { useCompObs = false } = props

  useEffect(()=>{
    if(loaded){
      const observer = new IntersectionObserver((entries, observer) => {
        let len = entries.filter(entry => entry.isIntersecting).length
        entries.forEach((entry, idx) => {
          // console.log(entry)
          if(entry.isIntersecting){
            console.log(idx, len, entry.target.querySelector('h2').innerText)
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      }, {
        root: null,
        rootMargin: '32px',
        threshold: [0.8]
      })
      refs.current.forEach(ref => {
        if(ref) observer.observe(ref)
      })
      return () => {
        observer.disconnect()
      }
    }else{
      return () => {}
    }
  }, [loaded, data])

  const loadUp = useCallback(() => {
    if(!loaded){ setLoaded(true)}
  }, [setLoaded, loaded])

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
          {/* const datumJSX = ( */}
          return <div key={idx} className='card' ref={ref=>{
            if(ref && !refs.current.includes(ref))
              refs.current.push(ref);
          }}>
              <img src={item.url} alt={item.title}/>
              <h2>{idx+":"+item.title}</h2>
              <p>{item.subtitle}</p>
              <div className='tags'>
                <span>{item.tags}</span>
                <span>{item.tags}</span>
                <span>{item.tags}</span>
              </div>
            </div>
          {/* ) */}
            {/* <Card elRef={refs.current[idx]} key={item.title+"-"+idx} {...item}/>
          )
          return datumJSX */}
        {/* }) */}
        })
      }
    </div>
  )
}

IntersectionObs.propTypes = {}

export default IntersectionObs;

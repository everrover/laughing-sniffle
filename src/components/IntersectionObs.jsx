import React, { createRef, useEffect, useRef, useState } from 'react'
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

  useEffect(()=>{
    // if(loaded){
      const observer = new IntersectionObserver((entries, observer) => {
        let len = entries.filter(entry => entry.isIntersecting).length
        entries.forEach((entry, idx) => {
          // console.log(entry)
          if(entry.isIntersecting){
            console.log(idx, len, entry.target.querySelector('h2').innerText)
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          } 
          // if (entry.isIntersecting) {
          //   const index = refs.current.findIndex(ref => ref.current === entry.target)
          //   if (index > -1) {
          //     refs.current[index].current.classList.add('visible')
          //   }
          // }
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
    // }else{
    //   return () => {}
    // }
  }, [loaded])

  useEffect(() => {
    service([0, 100])
      .then(res=>{
        // res.forEach(r=>refs.current.push(createRef()))
        setData(res)
        // return res
      })
    // const observer = new IntersectionObserver((entries, observer) => {
    //   entries.forEach(entry => {
    //     if(entry.isIntersecting){

    //     }
    //   })
    // }, {
    //   root: null,
    //   rootMargin: '-2rem',
    //   threshold: [0.75, 1]
    // })
    // document.querySelector('.card').forEach(ele=>{observer.observe(ele)})
    // return () => observer.disconnect()
    return () => {}
  }, [setData])
  console.log(data, refs)
  return (
    <div className='intersection-observer-demo'>
      {
        data.map((item, idx)=>{
          if(idx===data.length-1 && !loaded) setLoaded(true)
          {/* const datumJSX = ( */}
          return <div key={idx} className='card' ref={ref=>refs.current.push(ref)}>
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

import React, { useCallback, useEffect, useRef, useState } from 'react'
import service from '../service'
import useResizeObserverRef from '../hooks/useResizeObserverRef'  

function ResizeObserver(props) {
  const [data, setData] = useState([
    'https://images.unsplash.com/photo-1646641382244-af451d996c98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    'https://images.unsplash.com/photo-1646596549243-c83be64984c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1643040828329-466bb2e3d4b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1640622659613-26d7d08893e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    'https://images.unsplash.com/photo-1646649421173-7e24e66613de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=992&q=80',
    'https://images.unsplash.com/photo-1646639791235-2d5c2f0ea6d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1646640727785-1b3350f70b39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    'https://images.unsplash.com/photo-1646611186068-fb03fcb73027?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1285&q=80',
    'https://images.unsplash.com/photo-1646618178545-0cbba20f124c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
  ])
  const width = 300;
  const [addRef, loadUp, _, images] = useResizeObserverRef(data, width)

  return (<>
    <div className='resize-observer-demo' ref={ref=>{addRef(ref); loadUp();}}>
      {
        images.map((item, idx)=>{
          return <img key={idx} src={item} width={width+"px"} height='480px' style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}></img>
        })
      }
    </div>
    </>
  )
}

ResizeObserver.propTypes = {}

export default ResizeObserver;

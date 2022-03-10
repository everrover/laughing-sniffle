import React, { useEffect, useRef, useState } from 'react'
import useMutationObserverRef from '../hooks/useMutationObserverRef'  

function MutationObs(props) {
  const pRef = useRef()
  const [data, setData] = useState([
    "3CPO", "R2D2", "Grogu", "Mando", "Boba Fett", "Luke"
  ])
  const [subData, setSubData] = useState([
    "Leia", "Han", "Chewie", "Yoda"
  ])
  const [val, setVal] = useState("")
  const [selected, setSelected] = useState({
    childList: true,
    attributes: false,
    characterData: false,
    subtree: false,
    // attributeFilter: ['one', 'two'],
    attributeOldValue: false,
    characterDataOldValue: false
  })

  useEffect(()=>{
    
    pRef.current.removeAttribute("data-blue")
    pRef.current.removeAttribute("data-green")
    pRef.current.removeAttribute("data-red")
    if(pRef && pRef.current && selected.attributes && val){
      pRef.current.setAttribute("data-"+val, true)
    }
  }, [selected.attributes, val])

  const [addRef, loadUp] = useMutationObserverRef(selected)
  // const Item = useMemo((item, idx) => <div key={idx}>
  //     {item}
  //     <button onClick={e=>{
  //       e.preventDefault()
  //       setData(data.filter((_, i)=>i!==idx))
  //     }} style={{fontWeight: "800", color: "#3a3a3a"}}>X</button>
  //   </div>, []
  // )
  return (
    <div className='mutation-observer-demo'>
      <div className='mutation-obs-essentials'>
        <div style={{minWidth: '100%'}}>Atleast one of these is essential</div>
        <div className='formName'>
          <label>ChildList</label>
          <input type="radio" checked={selected.childList} onChange={e=>{}} onClick={e=>{
            setSelected({...selected, childList: !selected.childList})
          }}></input>
        </div>
        <div className='formName'>
          <label>Attributes</label>
          <input type="radio" checked={selected.attributes} onChange={e=>{}} onClick={e=>{
            setSelected({...selected, attributes: !selected.attributes})
          }}></input>
        </div>
        <div className='formName'>
          <label>CharacterData</label>
          <input type="radio" checked={selected.characterData} onChange={e=>{}} onClick={e=>{
            setSelected({...selected, characterData: !selected.characterData})
          }}></input>
        </div>
      </div>
      <div className='mutation-obs-else'>
        <div style={{minWidth: '100%'}}>These configs can be augmented to add some additional observations</div>
        <div className='formName'>
          <label>Subtree</label>
          <input type="radio" checked={selected.subtree} onChange={e=>{}} onClick={e=>{
            setSelected({...selected, subtree: !selected.subtree})
          }}></input>
        </div>
        <div className='formName'>
          <label>AttributeOldValue</label>
          <input type="radio" checked={selected.attributeOldValue} onChange={e=>{}} onClick={e=>{
            setSelected({...selected, attributeOldValue: !selected.attributeOldValue})
          }}></input>
        </div>
        <div className='formName'>
          <label>CharacterDataOldValue</label>
          <input type="radio" checked={selected.characterDataOldValue} onChange={e=>{}} onClick={e=>{
            setSelected({...selected, characterDataOldValue: !selected.characterDataOldValue})
          }}></input>
        </div>
        <div style={{minWidth: '50%', alignSelf: "center"}} className='formName' title="Use comma, separated values">
          <label>AttributeFilter</label>
          <input type="text" value={selected && selected.attributeFilter && selected.attributeFilter.join(", ")} onChange={e=>{
            setSelected({...selected, attributeFilter: e.target.value?e.target.value.split(', '):[]})
          }}></input>
        </div>
      </div>
      
      <div className='childlist-container'>
        <div style={{fontSize: '2rem', textTransform: 'uppercase'}}>
          Child list demo!!
        </div>
        <div>
          Mutation observer with childlist demo!!
        </div>
        <ul ref={ref=>{
          if(ref) addRef(ref)
          loadUp()
        }}>
          {data.slice(0, data.length-1).map((item, idx)=><li key={idx+item}>
            <p contentEditable={selected.characterData} onChange={e=>{
              e.preventDefault()
              setData(data.map((_, i)=>i===idx?e.target.value:_))
            }}>{item}</p>
          </li>)}
          <li>
            <p 
              ref={pRef}
              contentEditable={selected.characterData}
              onChange={e=>{
              e.preventDefault()
              setData(data.map((_, i)=>i===(data.length-1)?e.target.value:_))
            }}>{data[data.length-1]}</p>
            
            <ul>
              {subData.map((item, idx)=><li key={idx+item}>
                {item}
              </li>)}
            </ul>
          </li>

        </ul>
        <select value={val} onChange={e=>{
          setVal(e.target.value)
        }}>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>
        <button onClick={e=>{
          e.preventDefault()
          if(data.includes("Luke")) setData(data.filter(item=>item!=="Luke"))
          else setData([...data, "Luke"])
        }}>Add/Remove entry</button>
        <button onClick={e=>{
          e.preventDefault()
          if(subData.includes("Yoda")) setSubData(subData.filter(item=>item!=="Yoda"))
          else setSubData([...subData, "Yoda"])
        }}>Add/Remove child entry</button>  
        {/* <div>
          <input style={{margin:"1rem 1.5rem"}} type="text" value={val} onChange={e=>{
            e.preventDefault()
            setVal(e.target.value)
          }}></input>
          <button onClick={e=>{
            e.preventDefault()

            setData([...data, val])
            setVal("")
          }}>Add entry</button>
        </div>
        <div className='mutation-observer-demo-list' ref={ref=>{
          console.log("add ref src:", ref)
          if(ref) addRef(ref)
          loadUp()
        }}>
        {
          data.map((item, idx)=>{
            console.log(item)
            return <div key={idx} className="mut-obs-entry">
              {item}
              <span alpha="beta" onClick={e=>{
                e.preventDefault()
                setData(data.filter((_, i)=>i!==idx))
              }} style={{fontWeight: "800", color: "#3a3a3a", fontSize: "2rem"}}>X</span>
            </div>
          })
        }
        </div> */}
      </div>
    </div>
  )
}

MutationObs.propTypes = {}

export default MutationObs;

import './App.scss';
import React, { useState } from 'react';
import IntersectionObs from './components/IntersectionObs';

function App() {
  const [selected, setSelected] = useState("1");
  console.log(selected==="3")
  return (
    <div className="App">
      <div className='radios'>
        <label>IntersectionObserver</label>
        <input type="radio" value="1" checked={selected==="1"} name="IntersectionObserver" onChange={e=>{
          // e.preventDefault()
          setSelected(e.target.value)
        }}/>
        <label>MutationObserver</label>
        <input type="radio" value="2" checked={selected==="2"} name="MutationObserver" onChange={e=>{
          // e.preventDefault()
          setSelected(e.target.value)
        }}/>
        <label>ResizeObserver</label>
        <input type="radio" value="3" checked={selected==="3"} name="PerformanceObserver" onChange={e=>{
          // e.preventDefault()
          setSelected(e.target.value)
        }}/>
        <label>PerformanceObserver</label>
        <input type="radio" value="4" checked={selected==="4"} name="ResizeObserver" onChange={e=>{
          // e.preventDefault()
          setSelected(e.target.value)
        }}/>
      </div>
      {selected==="1" && <IntersectionObs/>}
    </div>
  );
}

export default App;

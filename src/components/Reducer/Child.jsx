import React from 'react'
import PropTypes from 'prop-types'
import SubChild from './SubChild.jsx'
import { Context } from './index.jsx'
function Child(props) {
  const {dispatch} = React.useContext(Context)
  console.log("Child rendered!")
  return (
    <div className='reducer-demo-child'>
      <h3>
        Child
      </h3>
      <button onClick={e=>{
        e.preventDefault()
        dispatch({type: 'INC_COUNT'})
      }}>Increment</button>
      <div>
        <SubChild/>
      </div>
    </div>
  )
}

Child.propTypes = {}

export default Child

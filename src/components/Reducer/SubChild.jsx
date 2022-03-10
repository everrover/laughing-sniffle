import React from 'react'
import PropTypes from 'prop-types'
import {Context} from './index.jsx'
function SubChild(props) {
  const {dispatch} = React.useContext(Context)
  console.log("Sub-child rendered!")
  return (
    <div className='reducer-demo-subchild'>
      <h3>
        SubChild
      </h3>
      <div>
        <button onClick={e=>{
          e.preventDefault()
          dispatch({type: 'DEC_COUNT'})
        }}>Decrement</button>
      </div>
    </div>
  )
}

SubChild.propTypes = {}

export default SubChild

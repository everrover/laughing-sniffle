import React from 'react'
import PropTypes from 'prop-types'
import Child from './Child.jsx'
import { Context } from './index.jsx'

function Parent(props) {
  const {state} = React.useContext(Context)
  console.log("Parent rendered!")
  return (
    <div className='reducer-demo-parent'>
      <h3>
        Parent
      </h3>
      <h1>
        Count: {state.count}
      </h1>
      <div>
        <Child/>
      </div>
    </div>
  )
}

Parent.propTypes = {}

export default Parent

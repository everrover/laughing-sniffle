import React from 'react'
import PropTypes from 'prop-types'
import {ParentProvider} from './index.jsx'
import Parent from './Parent.jsx'
function GrandParent(props) {
  console.log("Grand-parent rendered!")

  return (
    <ParentProvider>
      <div className='reducer-demo-gp'>
        <h1>
          Alpha
        </h1>
        <div>
          <Parent/>
        </div>
      </div>
    </ParentProvider>
  )
}

GrandParent.propTypes = {}

export default GrandParent

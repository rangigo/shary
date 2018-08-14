import React from 'react'

import './Loader.css'

const Loader = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default Loader

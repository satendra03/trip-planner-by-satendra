import React from 'react'
import Placescard from './Placescard'

function Places() {
  return (
    <>
      <h2 className="mt-10 sm:mt-20 text-3xl sm:text-4xl font-extrabold text-center sm:text-left">
        Places
      </h2>
      <div className="main-info mt-2 md:mt-4">
        <Placescard/>
      </div>
    </>
  )
}

export default Places
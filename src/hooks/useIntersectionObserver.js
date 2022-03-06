import React, { useState, useEffect } from 'react'

const useIO = () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      console.log(entry)
      // if (entry.isIntersecting) {
      //   const index = refs.current.findIndex(ref => ref.current === entry.target)
      //   if (index > -1) {
      //     refs.current[index].current.classList.add('visible')
      //   }
      // }
    })
  }, {
    root: null,
    rootMargin: '-48px',
    threshold: [0.75, 1]
  })
  return observer
}

export default useIO
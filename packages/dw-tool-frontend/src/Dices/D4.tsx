import React from 'react'
import s from './D4.module.css'

export const D4 = () => {
  return (
    <div className={s.dice}>
      <div className={`${s.side} ${s.side_1}`}>1</div>
      <div className={`${s.side} ${s.side_2}`}>2</div>
      <div className={`${s.side} ${s.side_3}`}>3</div>
      <div className={`${s.side} ${s.side_4}`}>4</div>
    </div>
  )
}

import React from 'react'
import s from './D8.module.css'

export const D8 = () => {
  return (
    <div className={s.dice}>
      <div className={`${s.side} ${s.side_1}`}>1</div>
      <div className={`${s.side} ${s.side_2}`}>2</div>
      <div className={`${s.side} ${s.side_3}`}>3</div>
      <div className={`${s.side} ${s.side_4}`}>4</div>
      <div className={`${s.side} ${s.side_5}`}>5</div>
      <div className={`${s.side} ${s.side_6}`}>6</div>
      <div className={`${s.side} ${s.side_7}`}>7</div>
      <div className={`${s.side} ${s.side_8}`}>8</div>
    </div>
  )
}

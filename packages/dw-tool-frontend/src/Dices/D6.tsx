import React from 'react'
import s from './D6.module.css'

const getRandom = () => Math.random() * 720 - 360

export const D6 = () => {
  const [rotate, setRotate] = React.useState({ x: getRandom(), y: getRandom() })

  const roll = () => {
    setRotate({ x: getRandom(), y: getRandom() })
  }
  return (
    <div>
      <div onClick={roll}>
        <button>roll</button>
      </div>
      <div
        style={{
          ['--rotate-x' as string]: `${rotate.x}deg`,
          ['--rotate-y' as string]: `${rotate.y}deg`,
        }}
        className={s.dice}
      >
        <div className={`${s.side} ${s.side_1}`}>1</div>
        <div className={`${s.side} ${s.side_2}`}>2</div>
        <div className={`${s.side} ${s.side_3}`}>3</div>
        <div className={`${s.side} ${s.side_4}`}>4</div>
        <div className={`${s.side} ${s.side_5}`}>5</div>
        <div className={`${s.side} ${s.side_6}`}>6</div>
      </div>
    </div>
  )
}

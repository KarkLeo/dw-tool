import React from 'react'
import s from './D10.module.css'

const getRandom = () => Math.random() * 720 - 360

export const D10 = () => {
  const [rotate, setRotate] = React.useState({
    x: getRandom(),
    y: getRandom(),
    z: getRandom(),
  })

  const [active, setActive] = React.useState(false)

  const roll = () => {
    setActive(true)
    setTimeout(() => {
      setRotate({ x: getRandom(), y: getRandom(), z: getRandom() })
    }, 300)
    setTimeout(() => setActive(false), 900)
  }

  return (
    <div>
      <div onClick={roll}>
        <button>roll</button>
      </div>
      <div
        className={`${s.dice} ${active ? s.active : ''}`}
        style={{
          ['--rotate-x' as string]: `${rotate.x}deg`,
          ['--rotate-y' as string]: `${rotate.y}deg`,
          ['--rotate-z' as string]: `${rotate.z}deg`,
        }}
      >
        <div className={`${s.number} ${s.number_1}`}>1</div>
        <div className={`${s.number} ${s.number_2}`}>2</div>
        <div className={`${s.number} ${s.number_3}`}>3</div>
        <div className={`${s.number} ${s.number_4}`}>4</div>
        <div className={`${s.number} ${s.number_5}`}>5</div>
        <div className={`${s.number} ${s.number_6}`}>6</div>
        <div className={`${s.number} ${s.number_7}`}>7</div>
        <div className={`${s.number} ${s.number_8}`}>8</div>
        <div className={`${s.number} ${s.number_9}`}>9</div>
        <div className={`${s.number} ${s.number_10}`}>10</div>
        <div className={`${s.side} ${s.side_1}`}>
          <div>1</div>
        </div>
        <div className={`${s.side} ${s.side_2}`}>
          <div>2</div>
        </div>
        <div className={`${s.side} ${s.side_3}`}>
          <div>3</div>
        </div>
        <div className={`${s.side} ${s.side_4}`}>
          <div>4</div>
        </div>
        <div className={`${s.side} ${s.side_5}`}>
          <div>5</div>
        </div>
        <div className={`${s.side} ${s.side_6}`}>
          <div>6</div>
        </div>
        <div className={`${s.side} ${s.side_7}`}>
          <div>7</div>
        </div>
        <div className={`${s.side} ${s.side_8}`}>
          <div>8</div>
        </div>
        <div className={`${s.side} ${s.side_9}`}>
          <div>9</div>
        </div>
        <div className={`${s.side} ${s.side_10}`}>
          <div>10</div>
        </div>
      </div>
    </div>
  )
}

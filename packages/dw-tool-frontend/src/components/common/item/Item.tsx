import { FC } from 'react'

export const Item: FC<{
  name: string
  lastname: string
  price: number
  onClick: () => void
}> = ({ name, lastname, price, onClick }) => {
  return (
    <button onClick={onClick}>
      <h1>{name}</h1>
      <h2>{lastname}</h2>
      <p>{price}</p>
    </button>
  )
}

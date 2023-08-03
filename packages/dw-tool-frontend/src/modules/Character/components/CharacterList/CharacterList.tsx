import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { listOfCharactersListSelector } from 'src/store/listOfCharacters/selectors'
import { fetchListOfCharactersThunk } from 'src/store/listOfCharacters/actions/fetchListOfCharacters'
import { useAppDispatch } from 'src/store/root'
import { Link } from 'react-router-dom'

export const CharacterList: FC = () => {
  const dispatch = useAppDispatch()

  const list = useSelector(listOfCharactersListSelector)

  useEffect(() => {
    dispatch(fetchListOfCharactersThunk())
  }, [dispatch])

  return list ? (
    <ul>
      {list.map((i) => (
        <li key={i.id}>
          <Link to={`/character/${i.id}`}>
            {i.name} | {i.race} | {i.class}
          </Link>
        </li>
      ))}
    </ul>
  ) : null
}

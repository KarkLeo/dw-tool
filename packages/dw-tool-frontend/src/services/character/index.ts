import instance from '../instance'
import {
  ICharacterData,
  ICharacterFullData,
  ICharacterListData,
} from 'dw-tool-meta'

export const characterServices = {
  create: (data: ICharacterData) =>
    instance.post<any>('characters/create/', data),
  getList: () => instance.get<ICharacterListData[]>('characters/'),
  get: (id: string | number) =>
    instance.get<ICharacterFullData>(`characters/${id}/`),
}

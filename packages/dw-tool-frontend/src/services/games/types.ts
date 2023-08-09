export interface ICreateGameRequest {
  name: string
  description: string
  users: {
    id: number
  }[]
}

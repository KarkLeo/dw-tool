export interface INotificationResponse {
  id: number
  type: string
  createdAt: string
  data: any
  read: boolean
  from: {
    id: number
    name: string
    email: string
  }
}

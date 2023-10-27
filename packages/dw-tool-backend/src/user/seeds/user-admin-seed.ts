import { DataSource } from 'typeorm'
import { UserEntity } from '../user.entity'

export const userAdminSeed = async (dataSource: DataSource): Promise<void> => {
  const manager = dataSource.manager
  const adminUser = new UserEntity()
  adminUser.email = 'admin@example.com'
  adminUser.name = 'Admin'
  adminUser.password = '123321'

  await manager.save(UserEntity, adminUser)
}

export const user1Seed = async (dataSource: DataSource): Promise<void> => {
  const manager = dataSource.manager
  const user1 = new UserEntity()
  user1.email = 'user.1@example.com'
  user1.name = 'User 1'
  user1.password = '123321'

  await manager.save(UserEntity, user1)
}

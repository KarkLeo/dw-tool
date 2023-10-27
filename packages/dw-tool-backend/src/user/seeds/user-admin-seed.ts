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

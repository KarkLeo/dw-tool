import dataSourceTest from '../ormconfig-test'
import { DataSource } from 'typeorm'

export const createDatabase = async (
  ...seeds: ((ds: DataSource) => Promise<void>)[]
): Promise<DataSource> => {
  await dataSourceTest.initialize()
  await dataSourceTest.runMigrations()

  await Promise.all(seeds.map((i) => i(dataSourceTest)))

  return dataSourceTest
}

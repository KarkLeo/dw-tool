import { DataSourceOptions } from 'typeorm'
import 'dotenv/config'

// todo create environment for auto test in deploy
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dw_tool',
  password: 'dw_tool',
  database: 'dw_tool_test',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
}

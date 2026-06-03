import 'dotenv/config';           
import { defineConfig, env } from '@prisma/config';

const user=env('PgSql_User');
const pword=env('PgSql_Password');
const db=env('PgSql_Database');

const EPword = encodeURIComponent(pword);

export default defineConfig({
  schema: 'prisma/schema.prisma',   
  datasource: {
    url: `postgresql://${user}:${EPword}@${env('DB_HOST')}:${env('DB_PORT')}/${db}?schema=public`,
  },
});
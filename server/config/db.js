import dotenv from 'dotenv'
dotenv.config()

export const DBUSER = process.env.DB_USER
export const DBPASS = process.env.DB_PASS
export const DBHOST = process.env.DB_HOST

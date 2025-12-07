import dotenv from 'dotenv'
import Path from 'path'
dotenv.config({path: Path.join(process.cwd(),'.env.local')})

const config={
    connection_str:process.env.CONNECTION_STR,
    port:process.env.PORT || 5001,
    jwtSecret:process.env.JWT_SECRET

}
export default config
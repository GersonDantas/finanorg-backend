import { config } from 'dotenv'
import { app } from './config/app'

config()

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server running at http://localhost:${port}`); }) 

import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

function main() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET is required.')
    process.exit(1)
  }

  const token = jwt.sign({ user: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' })
  console.log(token)
}

main()

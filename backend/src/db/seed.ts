import bcrypt from 'bcrypt'
import { db } from './index'

const seed = async () => {
  const adminPassword = await bcrypt.hash('Admin123!Change', 10)
  const viewerPassword = await bcrypt.hash('Viewer123!Change', 10)

  await db.query(
    `INSERT INTO users(email,password,role)
     VALUES($1,$2,$3)
     ON CONFLICT(email) DO NOTHING`,
    ['hadiafyouni9@gmail.com', adminPassword, 'admin']
  )

  await db.query(
    `INSERT INTO users(email,password,role)
     VALUES($1,$2,$3)
     ON CONFLICT(email) DO NOTHING`,
    ['gigeishak@gmail.com', viewerPassword, 'viewer']
  )

  await db.query(`
    INSERT INTO students
    (first_name,last_name,student_email,major,enrollment_year,gpa)
    VALUES
    ('John','Smith','john@uni.com','Computer Science',2023,3.70),
    ('Sara','Johnson','sara@uni.com','Engineering',2022,3.90),
    ('Ali','Khaled','ali@uni.com','Business',2021,3.50)
  `)

  console.log('Database seeded')
  process.exit(0)
}

seed()
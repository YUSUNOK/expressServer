import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors';



const app = express()
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

const port = 3000

const prisma = new PrismaClient()

async function main() {
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(usersWithPosts, { depth: null })
  app.get('/aaa', (req, res) => {
    res.json(usersWithPosts);
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

app.post('/', (req,res) => {
    res.send("Got a post request")
})

app.put('/user', (req, res) =>{
    res.send("Got a put request at /user")
})

app.delete('/user', (req,res) => {
    res.send("got a delete request at /user");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
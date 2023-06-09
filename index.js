import { Configuration, OpenAIApi } from 'openai'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 8000
app.use(bodyParser.json())
app.use(cors())

const configuration = new Configuration({
  organization: 'org-YK2I0G3cNrvfiIgadsIBtsax',
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)

app.post('/', async (request, response) => {
  const { chats } = request.body
  const result = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: '你现在是 EbereGPT。 你可以帮助完成图形设计任务',
      },
      ...chats,
    ],
  })
  response.json({
    output: result.data.choices[0].message,
  })
})

app.get('/', (req, res) => {
  res.send('访问成功')
})

app.listen(port, () => {
  console.log(`正在监听端口 ${port} ...`)
})

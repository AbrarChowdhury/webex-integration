const express = require("express")
const port = 8080
const app = express()
const { requestUrl, redirect } = require("./webexOAuthHelper")
const { createMeeting } = require("./webexMeetingsHelper")
const bodyParse = require("body-parser")
app.use(
  bodyParse.urlencoded({
    extended: true,
  })
)

app.use(bodyParse.json())

app.get("/", async (req, res) => {
  return res.json({ message: "API is running" })
})

app.get("/api/webex/authorize", async (req, res) => {
  console.log('requestUrl');
  return res.redirect(requestUrl)
})

app.get("/api/webex/redirect", async (req, res) => {
  return res.json(await redirect(req.query.code))
})

app.post('/api/webex/meetings', async (req,res)=>{
    let meeting = await createMeeting(req.body);
    return res.json(meeting)
})
app.listen(port, () => {
  console.log("masti is running", port)
})

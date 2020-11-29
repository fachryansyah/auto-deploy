const express = require('express')
const app = express()
const port = 3000

// webhook
app.post('/', (req, res) => {
  const projectName = req.project.name;
  shellExec(`./deploy_${projectName}`).then(console.log).catch(console.log)
})

app.listen(port, () => {
  console.log(`Auto deploy listening at http://localhost:${port}`)
})
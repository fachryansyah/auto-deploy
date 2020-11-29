require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 6969;

// webhook
app.get('/', (req, res) => {
  return res.json({
    message: 'Im a auto deploy'
  })
})
app.post('/', async (req, res) => {
  const projectName = req.project.name;
  await shellExec(`./deploy_${projectName}`).then(console.log).catch(console.log);
  return res.json({
    message: 'Running update'
  })
})

app.listen(port, () => {
  console.log(`Auto deploy listening at http://localhost:${port}`)
})
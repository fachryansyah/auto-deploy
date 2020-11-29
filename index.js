require('dotenv').config();
const shellExec = require('shell-exec');
const express = require('express');
const app = express();
const port = process.env.PORT || 6969;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// webhook
app.get('/', (req, res) => {
  return res.json({
    message: 'Im a auto deploy'
  })
})
app.post('/', async (req, res) => {
  try {
    const projectName = req.body.project.name;
    console.log(req.body);
    console.log(projectName);
    await shellExec(`./deploy_${projectName}.sh`).then(console.log).catch(console.log);
    return res.json({
      message: 'Running update'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'something-went-wrong'
    })
  }
})

app.listen(port, () => {
  console.log(`Auto deploy listening at http://localhost:${port}`)
})
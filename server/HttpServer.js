const express = require('express')
class httpServer {
  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use('/app', express.static('./client'))
  }
  register(method, url, callback) {
    this.app[method](url, async (req, res) => {
      const output = await callback(req.params, req.body)
      res.json(output)
    })
  }
  listen(port) {
    this.app.listen(port, () => {
      console.log('Servidor Rodando na porta ' + port)
    })
  }
}

module.exports = httpServer

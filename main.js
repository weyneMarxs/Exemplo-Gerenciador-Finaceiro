const Connection = require('./server/Connection')
const LancamentoController = require('./server/LancamentoController')
const LancamentoData = require('./server/LancamentoData')
const HttpServer = require('./server/HttpServer')

const connection = new Connection()
const lancamentoData = new LancamentoData(connection)
const httpServer = new HttpServer()

new LancamentoController(httpServer, lancamentoData)
httpServer.listen(3000)
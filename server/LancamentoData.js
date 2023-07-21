const Lancamento = require('./Lancamento')

class LancamentoData {
  constructor(connection) {
    this.connection = connection
  }

  async getLancamentos() {
    const lancamentosData = await this.connection.query(
      'select * from financas_pessoais.lancamento'
    )
    const lancamentos = []
    for (const lancamentoData of lancamentosData) {
      lancamentos.push(
        new Lancamento(
          lancamentoData.id,
          lancamentoData.mes,
          lancamentoData.categoria,
          lancamentoData.tipo,
          parseFloat(lancamentoData.valor)
        )
      )
    }
    return lancamentos
  }
  async saveLancamento(lancamento) {
    await this.connection.query(
      'insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values($1, $2, $3, $4)',
      [lancamento.mes, lancamento.categoria, lancamento.tipo, lancamento.valor]
    )
  }
  async deleteLancamento(id) {
    await this.connection.query(
      'delete from financas_pessoais.lancamento where id = $1',
      [id]
    )
  }
}
module.exports = LancamentoData

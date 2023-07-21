class Lancamento {
  constructor(id, mes, categoria, tipo, valor) {
    this.id = id
    this.mes = mes
    if (tipo !== 'receita' && tipo !== 'despesa') {
      throw new Error('Lançamento inválido: Tipo deve ser receita ou despesa')
    }
    if (valor <= 0 && valor === '') {
      throw new Error('Lançamento inválido: Valor deve ser maior que zero')
    }
    if (categoria === '') {
      throw new Error('Lançamento inválido: A categoria é obrigatória ')
    }
    this.categoria = categoria
    this.tipo = tipo
    this.valor = valor
  }
}
module.exports = Lancamento

class Lancamento {
  constructor(categoria, tipo, valor, id) {
    if (tipo !== 'receita' && tipo !== 'despesa') {
      throw new Error('Lançamento inválido: Tipo deve ser receita ou despesa')
    }
    if (valor <= 0) {
      throw new Error('Lançamento inválid0: Valor deve ser maior que zero')
    }
    if (categoria === '') {
      throw new Error('Lançamento inválido: A categoria é obrigatória ')
    }
    this.categoria = categoria
    this.tipo = tipo
    this.valor = valor
    this.id = id
  }
  getValorString() {
    return this.tipo === 'despesa' ? this.valor * -1 : this.valor
  }
}

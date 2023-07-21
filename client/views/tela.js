class Tela {
  constructor(lancamentoService) {
    this.lancamentoService = lancamentoService
    this.init()
  }
  async init() {
    const lancamentos = await this.lancamentoService.getLancamentos()
    this.ano = new Ano()
    for (const lancamento of lancamentos) {
      this.ano.adicionarLancamento(
        lancamento.mes,
        new Lancamento(
          lancamento.categoria,
          lancamento.tipo,
          lancamento.valor,
          lancamento.id
        )
      )
    }
    this.ano.calcularSaldo()
    this.renderizar()
  }
  formatarDinheiro(valor) {
    return new Intl.NumberFormat('pt-br', {
      currency: 'BRL',
      style: 'currency'
    }).format(valor)
  }
  adicionarLancamento() {
    const mes = this.mesSelect.getValue()
    const tipo = this.tipoSelect.getValue()
    const categoria = this.categoriaInputText.getValue()
    const valor = this.valorInputNumber.getValue()
    if (isNaN(valor)) {
      throw new Error('Valor deve ser preenchido !')
    }
    this.ano.adicionarLancamento(mes, new Lancamento(categoria, tipo, valor))
    const lancamento = {
      mes,
      categoria: categoria,
      tipo: tipo,
      valor: valor
    }
    this.lancamentoService.saveLancamento(lancamento)
    this.ano.calcularSaldo()
    this.renderizar()
  }
  deletarLancamento(mes, lancamento) {
    this.lancamentoService.deleteLancamento(lancamento.id)
    this.ano.deletarLancamento(mes, lancamento)
    this.ano.calcularSaldo()
    this.renderizar()
  }
  renderizar() {
    document.getElementById('app').remove()
    const app = new Div('app')
    const titulo = new H4('Finanças Pessoais')
    app.adicionarElementoFilho(titulo.element)
    const form = this.criarForm()
    app.adicionarElementoFilho(form.element)
    const grafico = this.criarGrafico()
    app.adicionarElementoFilho(grafico.element)
    for (const mes of this.ano.meses) {
      const nomeDoMes = new H4(mes.nome)
      app.adicionarElementoFilho(nomeDoMes.element)
      const tabelaLancamentos = this.criarTabelaLancamentos(mes)
      app.adicionarElementoFilho(tabelaLancamentos.element)
    }
    const [body] = document.getElementsByTagName('body')
    body.appendChild(app.element)
  }

  criarForm() {
    const form = new Div('form-lancamento')
    const tituloLancamento = new H4('Adicionar lançamento')
    this.mesSelect = new Select('mes')
    for (const mes of this.ano.meses) {
      this.mesSelect.addOption(mes.nome)
    }
    this.tipoSelect = new Select('tipo')
    this.tipoSelect.addOption('receita')
    this.tipoSelect.addOption('despesa')
    this.categoriaInputText = new Input('categoria', 'text', 'Categoria')
    this.valorInputNumber = new Input('valor', 'number', 'Valor', 'required')
    const adicionarButton = new Button('botao', 'Adicionar')
    adicionarButton.addListener(() => {
      this.adicionarLancamento()
    })
    form.adicionarElementoFilho(tituloLancamento.element)
    form.adicionarElementoFilho(this.mesSelect.element)
    form.adicionarElementoFilho(this.tipoSelect.element)
    form.adicionarElementoFilho(this.categoriaInputText.element)
    form.adicionarElementoFilho(this.valorInputNumber.element)
    form.adicionarElementoFilho(adicionarButton.element)
    return form
  }
  criarGrafico() {
    const grafico = new Grafico()
    for (const mes of this.ano.meses) {
      grafico.adicionarColuna(mes.totalizador.saldo, mes.nome)
    }
    return grafico
  }

  criarTabelaLancamentos(mes) {
    const tabelaLancamentos = new Tabela('tabela-lancamentos')
    tabelaLancamentos.addRow('th', ['Categoria', 'Valor', 'Ação'])
    for (const lancamento of mes.lancamentos) {
      const button = new Button('delete-lancamento', 'delete')
      button.addListener(() => {
        this.deletarLancamento(mes, lancamento)
      })

      tabelaLancamentos.addRow(
        'td',
        [
          lancamento.categoria,
          this.formatarDinheiro(lancamento.getValorString())
        ],
        [button]
      )
    }
    tabelaLancamentos.addRow('th', [
      'Juros',
      this.formatarDinheiro(mes.totalizador.juros)
    ])
    tabelaLancamentos.addRow('th', [
      'Rendimento',
      this.formatarDinheiro(mes.totalizador.rendimentos)
    ])
    tabelaLancamentos.addRow('th', [
      'Total',
      this.formatarDinheiro(mes.totalizador.saldo)
    ])
    return tabelaLancamentos
  }
}

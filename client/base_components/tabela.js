class Tabela {
  constructor(className) {
    this.element = document.createElement('table')
    this.element.className = className
  }
  addRow(type, values, buttons, attribute) {
    const tr = document.createElement('tr')
    for (const value of values) {
      const td = document.createElement(type)
      td.innerText = value
      tr.appendChild(td)

      console.log()
    }
    if (buttons) {
      for (const button of buttons) {
        const td = document.createElement(type)
        td.append(button.element)
        tr.appendChild(td)
      }
    }
    this.element.appendChild(tr)
  }
}

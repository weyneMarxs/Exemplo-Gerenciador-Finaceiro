const pgp = require('pg-promise')

class Connection {
  constructor() {
    this.connection = pgp()('postgres://postgres:admin@localhost:5492/app')
  }

  query(statement, params) {
    return this.connection.query(statement, params)
  }
}
module.exports = Connection

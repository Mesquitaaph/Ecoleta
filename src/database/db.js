// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()


//criar o objeto que irá fazer operações no banco de dadods
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// Utilizar o objeto de banco de dados, para nossas operações
db.serialize( () => {

  // Com comandos SQL eu vou:

  // 1-Criar uma tabela
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS places (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT,
  //     image TEXT,
  //     adress TEXT,
  //     adress2 TEXT,
  //     state TEXT,
  //     city TEXT,
  //     itens TEXT
  //   );
  // `)  


  // // 2-Inserir dados na tabela
  // const query = `
  //   INSERT INTO places (
  //     name,
  //     image,
  //     adress,
  //     adress2,
  //     state,
  //     city,
  //     itens
  //   ) VALUES (?,?,?,?,?,?,?);
  // `
  // const values = [
  //   "Papersider",
  //   "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  //   "Guilerme Gemballa, Jardim América",
  //   "260",
  //   "Santa Catarina",
  //   "Rio do Sul",
  //   "Resíduos Eletrônicos, Lâmpadas"
  // ]
  
  // function afterInsertData(err) {
  //   if(err) {
  //     return console.log(err)
  //   }

  //   console.log("Cadastrado com sucesso")
  //   console.log(this)
  // }

  // db.run(query, values, afterInsertData)


  // 3-Consultar os dados da tabela
  
  // db.all(`SELECT name FROM places`, function(err, rows) {
  //   if(err) {
  //     return console.log(err)
  //   }

  //   console.log("Aqui estão seus registros")
  //   console.log(rows)
  // })


  // 4-Deletar um dado da tabela

  // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
  //   if(err) {
  //     return console.log(err)
  //   }

  //   console.log("Registro deletado com sucesso!")
  // })

  
})
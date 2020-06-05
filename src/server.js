const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")

// configurar pasta pública
server.use(express.static("public"))

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))


// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})




// configurar caminhos na minha aplicação

// Página inicial
server.get("/", (req, res) => {
  return res.render("index.html")
})

server.get("/create-point", (req, res) => {

  const query = req.query

  return res.render("create-point.html")
})


server.post("/save-point", (req, res) => {

  const body = req.body

  const query = `
    INSERT INTO places (
      name,
      image,
      adress,
      adress2,
      state,
      city,
      itens
    ) VALUES (?,?,?,?,?,?,?);
  `

  const values = [
    body.name,
    body.image,
    body.adress,
    body.adress2,
    body.state,
    body.city,
    body.itens
  ]

  db.run(query, values, function(err) {
    if(err){
      console.log(err)
      return res.send("Erro no cadastro!")
    }

    console.log("Dados cadastrados com sucesso")

    return res.render("create-point.html", { saved: true })
  })
})


server.get("/search", (req, res) => {

  const search = req.query.search

  if(search == ""){
    // Pesquisa vazia
    return res.render("search-results.html", { total: 0 })
  }

  if(search == "all"){
    db.all(`SELECT * FROM places`, function(err, rows) {
      if(err){
        return console.log("ERRO" + err)
      }
      
      const total = rows.length
  
      // Mostrar a página html com os dados do banco de dados
      return res.render("search-results.html", { places: rows, total })
    })
  } else {
    // Pegar os dados no banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
      if(err){
        return console.log(err)
      }
      
      const total = rows.length

      // Mostrar a página html com os dados do banco de dados
      return res.render("search-results.html", { places: rows, total })
    }) 
  }

   
})

// ligar o servidor
server.listen(3000)
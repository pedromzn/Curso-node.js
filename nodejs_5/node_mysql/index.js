const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.render('home')
  }),

  //inserir dados no banco
app.post('/books/insertbook', (req,res) =>{

    const tiltle = req.body.tiltle
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (??,??) VALUES(?, ?)`
    const data = ['tiltle', 'pageqty', tiltle, pageqty]

    pool.query(sql, function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

//buscar os dados no banco
app.get('/books', (req,res)=>{
    const sql = "SELECT * FROM books"

    pool.query(sql, function (err,data){
        if(err){
            console.log(err)
            return
        }
        const books = data

        console.log(books)

        res.render('books', {books})
    })
})

app.get('/books/edit/:id', (req,res) =>{
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    pool.query(sql, function(err, data) {
        if(err){
            console.log(err)
            return
        }
        const book = data[0]

        res.render('editbook', {book})
    })
})
app.get('/books/:id', (req,res) =>{
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    pool.query(sql, function (err, data){
        if(err){
            console.log(err)
            return
        }
        const book = data[0]

        res.render('book', {book})
    })
})

app.post('/books/updatebook', (req,res) =>{
    const id = req.body.id
    const tiltle = req.body.tiltle
    const pageqty = req.body.pageqty

    const sql = `UPDATE books SET tiltle = '${tiltle}', pageqty = '${pageqty}' WHERE id = ${id}`

    pool.query(sql , function(err){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.post('/book/remove/:id', (req,res) =>{
    const id = req.params.id

    const sql = `DELETE FROM books WHERE id = ${id}`

    pool.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

app.listen(3000)


require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()

app.use(cors())
app.use(express.json())


app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email } = req.body

    if (!nome || !email) {
      return res.status(400).json({ erro: 'nome e email sao obrigatorios' })
    }

    const [resultado] = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    )

    res.status(201).json({ id: resultado.insertId, nome, email })
  } catch (erro) {
    res.status(500).json({ erro: 'erro ao cadastrar usuario' })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
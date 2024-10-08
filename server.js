const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const cors = require('cors');
app.use(cors());

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost:27017/pwaapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Definindo schema para armazenar imagens
const ImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String
});
const Image = mongoose.model('Image', ImageSchema);

// Configurando multer para receber arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota para receber a imagem
app.post('/upload', upload.single('image'), (req, res) => {
  const newImage = new Image({
    data: req.file.buffer,
    contentType: req.file.mimetype
  });
  newImage.save()
    .then(() => res.status(200).send('Imagem salva com sucesso!'))
    .catch(err => res.status(500).send('Erro ao salvar imagem!'));
});

// Servir arquivos estáticos do frontend
app.use(express.static('public'));

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

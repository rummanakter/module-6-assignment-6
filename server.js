const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let books = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/books', (req, res) => {
  res.json(books);
});


app.post('/books', (req, res) => {
  
  const { title, author, publishedDate } = req.body;  
  const id = Date.now().toString();  
  books.push({ id, title, author, publishedDate });  
  res.json({ id, title, author, publishedDate });

});


app.delete('/books/:id', (req, res) => {

  const id = req.params.id;  
  const index = books.findIndex(book => book.id === id);
  
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: 'Book deleted successfully' });
  } 

  else {
    res.status(404).json({ message: 'Book not found' });
  }

});


const port = 3000;
app.listen(port, () => {
  console.log(`Server run siccess on port ${port}`);
});


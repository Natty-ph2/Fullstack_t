const express = require('express');
const morgan = require('morgan');

const app = express();

const cors = require('cors');

app.use(cors());



app.use(express.json())

let pBook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


morgan.token('body', (req) => JSON.stringify(req.body));

// app.use(morgan('dev'));
app.use(morgan(':method :url :status :response-time ms :body'))


// const requestLogger = (req, res, next) => {
//     console.log('Method:', req.method)
//     console.log('Path:  ', req.path)
//     console.log('Body:  ', req.body)
//     console.log('---')
//     next()
//   }
//   app.use(requestLogger)
  


// const unknownEndpoint = (req, res) => {
//     res.status(404).send({ error: 'unknown endpoint' })
//   } 
  

  



const currentTime = new Date();
app.get('/', (req, res) => {
    res.send('<h1>well-done keep going and be patient</h1>')
})

app.get('/info', (req, res) => {
    res.send(`Phone book has info for ${pBook.length} people  <br/> <br/> <br/> ${currentTime}` );
    
    
})
app.get('/api/persons', (req, res) => {
    res.json(pBook);
    
})

app.get('/api/persons/:id', (req, res) => {
    const phoneId = req.params.id;
   
    const phone = pBook.find(p => p.id === phoneId);
    if(phone){
        res.json(phone);
    } else {
        
        res.status(404).json('Phonebook entry not found' );
    }
   
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const del = pBook.filter(p => p.id !== id);

    if(del.length === pBook.length){
        return res.status(404).json({error: "person not found"})
    }
    
    res.json(del);
    pBook = del;

 
})

const genId = () => {
    return String(Math.floor(Math.random() * 10000));
    
}
app.post('/api/persons/', (req, res) => {
   const body = req.body

   if(!body.name || !body.number){
    return res.status(400).json({
        error: 'name or number is  missing'
    })
   }
   
   
   const nameU = pBook.map(n => n.name );
   const dupName = nameU.find(name => name === body.name);

   if(dupName) {
    return res.status(400).json({
        error: 'name must be unique'
    })
   }
   const book = {
    id: genId(),
    name: body.name,
    number: body.number
   }

   pBook = pBook.concat(book);

   res.json(book);
    
})

// app.use(unknownEndpoint)

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port${port}`);
  });


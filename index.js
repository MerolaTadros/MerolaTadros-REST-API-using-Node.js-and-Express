const express = require ('express');
const app = express();
const Joi = require ('@hapi/joi'); //for data validation
app.use(express.json()); //middleware a function that receives the resquest nad the response objects
//creating an array of objects
const fruits = [
  {name: 'Apples', id: 1},
  {name: 'Bananas', id: 2},
  {name: 'Cherries', id: 3},
  {name: 'Dates', id: 4},
  {name: 'Grapes', id: 5},
  {name: 'Lemons', id: 6},
  {name: 'Melons', id: 7}
]
//creating READ request handlers: functions that handles the client requests
app.get('/', (req,res) => {
  res.send('Join our mailing list for course coupons');
}); // req is the request object contains the information about the http request that raised the 1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm

app.get('/api/fruits', (req,res) => {
  res.send(fruits);
});
app.get('/api/fruits/:id', (req,res) => {
  const fruit = fruits.find(c => c.id === parseInt(req.params.id));
  if (!fruits)res.status(404).send('fruits not found');
  res.send(fruit);
})
const port = process.env.PORT || 8080;
 app.listen(port, () => console.log(`listening on port ${port}...`));

function validateFruit(fruit){
  const schema = Joi.object({name: Joi.string() .min(3) . required()});
  const validation = schema.validate(fruit);
  return validation;
}

app.post('/api/fruits', (req, res) => {
  const {error} = validateFruit(req.body);
  if (error){
    res.status(400).send(error.details[0].message)
    return;
  }
  const fruit = {
    id: fruits.length + 1,
    name: req.body.name
  };
  fruits.push(fruit);
  res.send(fruit);
});

//update request handeler
app.put('/api/fruits/:id',(req,res) =>{
  const fruit = fruits.find(c=> c.id === parseInt(req.params.id));
  if (!fruit) res.status(404).send('Fruit Not Found');
  const {error} = validateFruit(req.body);
  if (error){
    res.status(400).send(error.details[0].message);
    return;
  }
  fruit.fruit = req.body.fruit;
  res.send(fruit);
});

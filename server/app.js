const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const dbService = require('./dbService');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// CREATE

app.post('/insert', (req, res) => {
  const { name } = req.body;
  const db = dbService.getDbServiceInstance();

  const result = db.insertNewName(name);

  result
    .then((data) => {
      // console.log(data);
      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

// READ

app.get('/getAll', (req, res) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllData();

  result
  .then((data) => {
    // console.log(data);
    res.json({data: data})
  })
  .catch((err) => console.log(err));
});

// UPDATE

app.patch('/update', (req, res) => {
  const { id, name } = req.body;
  const db = dbService.getDbServiceInstance();

  const result = db.updateNameById(id, name);

  result
    .then(data => {
      console.log(data);
      res.json({ success: data });
    })
    .catch(err => console.log(err));
})

// DELETE

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteRowById(id);

  result
    .then(data => {
      // console.log(data);
      res.json({ success: data });
    })
    .catch(err => console.log(err));
});

// SEARCH

app.get('/search/:name', (req, res) => {
  const {name} = req.params;
  const db = dbService.getDbServiceInstance();

  const result = db.searchByName(name);

  result
    .then(data => {
      // console.log(data);
      res.json({ data: data });
    })
    .catch(err => console.log(err));
})


app.listen(PORT, () => console.log(`server is running on port ${PORT}`));


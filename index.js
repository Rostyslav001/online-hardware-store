const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'internet-shop'
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");  
app.use(express.static('public'));
app.use(express.static('imag'));
app.use(express.static('script'));


app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  const sqlProducts = 'SELECT * FROM products';
  const sqlStatuses = 'SELECT * FROM status'; 

  
  db.query(sqlProducts, (errProducts, resultsProducts) => {
    if (errProducts) {
      console.error('Error fetching products data from the database:', errProducts);
      res.status(500).send('Error fetching products data from the database');
    } else {

      db.query(sqlStatuses, (errStatuses, resultsStatuses) => {
        if (errStatuses) {
          console.error('Error fetching statuses data from the database:', errStatuses);
          res.status(500).send('Error fetching statuses data from the database');
        } else {
          // Assuming 'id_status' is the common field between products and status tables
          const statuses = resultsStatuses.reduce((acc, status) => {
            acc[status.id_status] = status;
            return acc;
          }, {});

          res.render('catalog', { products: resultsProducts, statuses: statuses });
        }
      });
    }
  });
});


app.get('/public/css/sign_up.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'css', 'sign_up.css'), { type: 'text/css' });
});

app.get('/login', (req,res) =>{
  const successMessage = req.query.message || ''; 
  res.render('sign_up', { message: successMessage });
  
});

app.get('/data', (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.render('data', { users: results });
    }
  });
});

app.get('/update', (req, res) =>{

  res.render('update');

});

// Надсилання даних користувача до бази даних 
app.post('/submit-form', (req, res) => {
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let email = req.body.email;
  let birthday = req.body.data;
  let user_password = req.body.password;

  const sql = 'INSERT INTO users (first_name, last_name, email, birthday, user_password,registration_date) VALUES (?, ?, ?, ?, ?, CURRENT_DATE)';

  db.query(sql, [firstName, lastName, email, birthday, user_password], (err, result) => {
    if (err) {
      console.error('Error inserting into the database:', err);
      res.render('sign_up', { message: 'Error inserting into the database' });
    } else {
      console.log('Received data:');
      res.redirect('/?message=Data received successfully!');
    }
  });
  


});



app.post('/update-form', (req, res) => {
  let productName = req.body.productName;
  let productCategory = req.body.productCategory;
  let productStatus = req.body.productStatus;
  let productDescription = req.body.productDescription;
  let productPrice = req.body.productPrice;
  let fileInput = req.body.fileInput;


  const sql = 'INSERT INTO products (name, description, price, category_id, image_url, url_status) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(sql, [productName, productDescription, productPrice, productCategory,fileInput, productStatus], (err, result) => {

    if (err) {
      console.error('Error inserting into the database:', err);
      res.status(500).send(`Error adding product. ${err.message}`);
    } else {
      console.log('Inserted into database with ID: ' + result.insertId);
      res.redirect('/');
    }
  });
});




const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

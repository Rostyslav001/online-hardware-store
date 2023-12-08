const express = require('express')
const app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'internet-shop'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL as id ' + connection.threadId);

  var query = 'SELECT * FROM products';

  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      return;
    }

    // Перевірка, чи є результати запиту
    if (rows.length === 0) {
      console.log('No products found in the database.');
      // Закриття з'єднання, оскільки немає даних для виведення
      connection.end(function(err) {
        if (err) {
          console.error('Error ending connection: ' + err.stack);
        } else {
          console.log('Connection closed');
        }
      });
      return;
    }

    // Перебір отриманих рядків і створення HTML-розмітки
    rows.forEach(function(product) {
      var productHTML = '<li class="product" id="product" data-category="' + product.category + '">\n' +
        '  <div class="product-details">\n' +
        '    <div class="product-status">\n' +
        '      <img src="D:\\site_shop\\Desing\\imag\\Group 132.svg" alt="' + product.status + '">\n' +
        '      <p>' + product.status + '</p>\n' +
        '    </div>\n' +
        '    <div class="product-image">\n' +
        '      <img src="' + product.image_url + '" alt="Product Image">\n' +
        '    </div>\n' +
        '    <div class="product-ratings-and-reviews">\n' +
        '      <div class="product-rating">\n';

      // Додавання зірочок для рейтингу
      for (var i = 0; i < product.rating; i++) {
        productHTML += '        <img src="D:\\site_shop\\Desing\\imag\\Star 8.svg" alt="Star">\n';
      }

      productHTML +=
        '      </div>\n' +
        '      <div class="product-reviews">\n' +
        '        <p>Reviews (' + product.reviews + ')</p>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '    <div class="product-title">\n' +
        '      <p>' + product.title + '</p>\n' +
        '    </div>\n' +
        '    <div class="product-prices">\n' +
        '      <p class="discount-price">$' + product.discount_price + '</p>\n' +
        '      <p class="original-price">$' + product.original_price + '</p>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</li>\n';

      console.log(productHTML);
    });

    // Закриття з'єднання
    connection.end(function(err) {
      if (err) {
        console.error('Error ending connection: ' + err.stack);
      } else {
        console.log('Connection closed');
      }
    });
  });
});

const port = 3000;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function getProductsWithText(searchTerm) {
  knexInstance
    .select('name')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then((result) => {
      console.log(result);
    });
}

// getProductsWithText('To');

function paginateProducts(pageNumber) {
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber - 1);
  knexInstance
    .select('name', 'price', 'category', 'checked', 'date_added')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then((result) => {
      console.log(result);
    });
}

// paginateProducts(3)

function productsAddedDaysAgo(daysAgo) {
  knexInstance
    .select('name', 'price', 'category', 'checked', 'date_added')
    .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .from('shopping_list')
    .then((result) => {
      console.log(result);
    });
}

// productsAddedDaysAgo(30)

function totalCost() {
  knexInstance
    .select('category')
    .from('shopping_list')
    .groupBy('category')
    .sum('price AS total')
    .then((result) => {
      console.log(result);
    });
}

totalCost()
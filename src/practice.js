require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
	client: 'pg',
	connection: process.env.DB_URL
});

// knexInstance.from('amazong_products').select('*').then((result) => {
// 	console.log(result);
// });

// const qry = knexInstance
// 	.select('product_id', 'name', 'price', 'category')
// 	.from('amazong_products')
// 	.where({ name: 'Point of view gun' })
// 	.first()
// 	.toQuery();
// // .then((result) => {
// // 	console.log(result);
// // });

// console.log(qry);

function searchByProduceName(searchTerm) {
	knexInstance
		.select('product_id', 'name', 'price', 'category')
		.from('amazong_products')
		.where('name', 'ILIKE', `%${searchTerm}%`)
		.then((result) => {
			console.log(result);
		});
}

// searchByProduceName('holo');

function paginateProducts(page) {
	const productsPerPage = 10;
	const offset = productsPerPage * (page - 1);
	knexInstance
		.select('product_id', 'name', 'price', 'category')
		.from('amazong_products')
		.limit(productsPerPage)
		.offset(offset)
		.then((result) => {
			console.log(result);
		});
}

paginateProducts(2);

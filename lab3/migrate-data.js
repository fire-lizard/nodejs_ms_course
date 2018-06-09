const mongodb = require('mongodb')
const path = require('path')
const customers = require(path.join(__dirname, 'm3-customer-data.json'))
const addresses = require(path.join(__dirname, 'm3-customer-address-data.json'))

const MongoClient = mongodb.MongoClient

for (let index = 0; index < customers.length; index++) {
	customers[index] = Object.assign(customers[index], addresses[index])
}

MongoClient.connect('mongodb://localhost:27017', (err, dbase) => {
	if (err) {
		console.log('Connection error')
		return process.exit(1)
	}

	const db = dbase.db('lab3');
	const collection = db.collection('customers')
	const starttime = Date.now()

	for (let index = 0; index < customers.length; index++) 
	{
		collection.insert(customers[index], (error, result) => {
			if (error)
			{
				console.log('Error during document insertion')
				return process.exit(1)
			}
		})
	}

	const duration = Date.now() - starttime
	console.log("items have been successfully saved to MongoDB database in " + duration + " ms")
	dbase.close()
})

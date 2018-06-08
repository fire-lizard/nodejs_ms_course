const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

csv().fromFile(path.join(__dirname, 'customer-data.csv')).then((jsonArr)=>{
	fs.writeFile (path.join(__dirname, 'customer-data.json'), JSON.stringify(jsonArr, null, 2), function(error) {if (error) throw error;});
})

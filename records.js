const fs = require('fs');

function generateRandomId(){
    return Math.floor(Math.random() * 10000);
}

function save(data){
    return new Promise((resolve, reject) => {
        fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

/*
*Gets all quotes
*@param None
*/
function getQuotes(){
    return new Promise((resolve, reject) => {
        fs.readFile('data.json', 'utf8', (err, data) => {
            if(err) {
                reject(err)
            } else {
                const json = JSON.parse(data)
                resolve(json);
            }
        })
    })
}

/** 
 * Get a specific quote by ID
 * @param {number} id - Accepts the id of the specific quote.
 */

 async function getQuote(id){
     const quotes = await getQuotes();
     return quotes.records.find(record => record.id == id);
 }

 /**
  * Gets a random quote
  * @params None
  */

  
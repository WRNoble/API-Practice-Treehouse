const express =require('express');
const app = express();



//Send a Get request to /quotes to READ a list of quotes
app.get('/quotes', (req, res)=> {
    res.json(data)
});
//Send a GET request to /quotes/:id to READ a quote
app.get('/quotes/:id', (req, res)=> {
    const quote = data.quotes.find(quote => quote.id == req.params.id);
    res.json(quote)
});
//Send a POST request to /quotes to CREATE a new quote
//Send a PUT request to /quotes/:id to UPDATE a quote
//Send a DELETE request to /quotes/:id to DELETE a quote
//Send a GET request to /quotes/quote/random to READ a random quote

app.listen(3000, ()=> console.log("listening"));
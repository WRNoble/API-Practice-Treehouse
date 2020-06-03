const express =require('express');
const app = express();
const records = require('./records');

app.use(express.json()); //middleware

function asyncHandler(cb) {
    return async (req, res, next) => {
        try{
            await cb(req, res, next);
        } catch(err){
            next(err)
        }
    }
}

//Send a Get request to /quotes to READ a list of quotes
app.get('/quotes', asyncHandler( async (req, res)=> {
        const quotes = await records.getQuotes();
        res.json(quotes);
}));
//Send a GET request to /quotes/:id to READ a quote
app.get('/quotes/:id', asyncHandler (async (req, res)=> {
        const quote = await records.getQuote(req.params.id);
        if(quote){
            res.json(quote);
        } else {
            res.status(404).json({message: "Quote not found"})
        }
}));
//Send a POST request to /quotes to CREATE a new quote
app.post('/quotes', asyncHandler( async (req, res)=>{
    if(req.body.author && req.body.quote) {
        const quote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author
        })
        res.status(201).json(quote)
    } else {
        res.status(400).json({message: "Quote and author required."})
    }
}))
//Send a PUT request to /quotes/:id to UPDATE a quote
app.put('/quotes/:id', asyncHandler( async (req, res) => {
    const quote = await records.getQuote(req.params.id)
    if(quote){
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        await records.update(quote);
        res.status(204).end();
    } else {
        res.status(404).json({message:"Quote not found"})
    }
}))
//Send a DELETE request to /quotes/:id to DELETE a quote
app.delete('/quotes/:id', asyncHandler (async(req, res) => {
    const quote = await records.getQuote(req.param.id);
    await records.deleteQuote(quote);
    res.status(204).end();
}))
//Send a GET request to /quotes/quote/random to READ a random quote

app.use((req, res, next) => {
    const err = new Error("Not Found")
    err.status = 404;
    next(err);
});
 
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})

app.listen(3000, ()=> console.log("listening"));


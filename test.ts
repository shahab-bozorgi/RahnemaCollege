import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/static', (req, res) => {
  res.send('Hello World');
});

app.get('/staticJSON', (req, res) => {

    res.json({ text: 'Hello World' });
  
  });


app.get('/echo', (req, res)=>{
    const text = req.query.text;
    if (text){
        res.send(text)
    }
    else{
        res.status(404).send("not found")
    }


})
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
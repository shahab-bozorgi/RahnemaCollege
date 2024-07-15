import http from "http";
import express from "express";


const app = express();

app.use(express.json())
app.use((req, res, next)=> {
    console.log(req.method, req.url);
    next();
})



app.listen(3000, ()=>{
    console.log("server is listening on port 3000")

});

app.get("/maraz", (req, res)=>{
    const name = req.query.name;
    res.send({name: "hello" + (name || " shahab")});
})


app.post("/maraz", (req, res) => {
    const name = req.body.name;
    res.send({ name: "hello " + (name || "world") });
  });
  



app.get("/zahremar/:name", (req, res)=>{
    const name = req.params.name;
    res.send({name: "hello " + (name || "fati") });

})









// const server = http.createServer((req, res ) =>{
//     console.log(req.method, req.url);

//     if (req.url === "/maraz"){
//         res.end("zahremar");
//         return;
//     }
        
//     res.end("hello world");
// });



import express from 'express';
import cors from 'cors';
import {readdirSync} from 'fs';
import mongoose from 'mongoose';
const morgan = require("morgan");
require("dotenv").config();

//criando aplicação do express
const app = express();

// db
mongoose.connect(process.env.DATABASE, {})
.then(() =>{
    console.log("conexão estabelecida o banco de dados ")
})
.catch(err =>{
    console.log(err);
})


//criando middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
readdirSync("./routes").map(r => 
    app.use("/api", require(`./routes/${r}`))
);

app.get("/", (req, res) => {
    res.send("dev aplication")
})

//port
const port = process.env.PORT;

app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`);
});
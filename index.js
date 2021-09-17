const express = require('express')
bodyParser = require("body-parser")
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(express.json)

app.get('/sum', (req, res) => {
    console.log(`req ${parseInt(req.query.param) + parseInt(req.query.param1)}`);
    res.send(`get, ${parseInt(req.query.param) + parseInt(req.query.param1)}`)
});

app.get('/reverseArray', (req, res) => {
    console.log(req.body.array);
    let arr = [];
    for (var i = req.body.array.length - 1; i > -1; i--){
        arr[req.body.array.length - i - 1] = (req.body.array[i]);
    }
    res.status(200).json({arr})
});

app.get('/reverseCase', (req, res) => {
    let a = req.query.param;
    let b = "";
    for (var i = 0; i < a.length; i++) {
        if (a.charAt(i) == a.charAt(i).toUpperCase()){
            b += a.charAt(i).toLowerCase();
        }
        else{
            b += a.charAt(i).toUpperCase();
        }
    }
    res.send(b);
    console.log(b);
});

app.get('/get', (req, res) => {
console.log(req.query);
console.log(req.params);
console.log(req.body);
res.send(`get`);
});

app.post('/post', (req, res) => {
console.log(req.query);
console.log(req.params);
console.log(req.body);
res.send(`post`);
})

app.put('/put', (req, res) => {
console.log(req.query);
console.log(req.params);
console.log(req.body);
res.send('put')
})

app.patch('/patch', (req, res) => {
console.log(req.query);
console.log(req.params);
console.log(req.body);
res.send('patch')
})

app.delete('/delete', (req, res) => {
console.log(req.query);
console.log(req.params);
console.log(req.body);
res.send('delete')
})

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 4000;
const path = require("path");
const fs = require('fs')

app.use("/public",express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("home.ejs")
})

// app.post("/upload", (req, res) => {
//     console.log(req.body);
//     const data = req.body;
//     const imageData = data.image64.replace(/^data:image\/\w+;base64,/, '');
//      const buffer = Buffer.from(imageData, 'base64');
//     fs.writeFile(`./uploads/${Date.now()}.png`, buffer, err => {
//           if (err) {  res.status(500).send({ error: 'Error saving image' })} 
//           else {  
//             fs.writeFile(`./public/uploads/img.png`, buffer, err => {
//                 if (err) {  res.status(500).send({ error: 'Error saving image' })} 
//                 else {  res.send({ message: 'Image uploaded' })  }
//             });
//             }
//     });
// })

io.on("connection",(socket)=>{
    console.log('user connected');
    socket.on('save' , (e) => {
        const imageData = e.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(imageData, 'base64');
        fs.writeFile(`./upload/${Date.now()}.png`, buffer, err => {
        if (err) {  res.status(500).send({ error: 'Error saving image' })} 
        else {  
            console.log('image saved');
            io.emit('goto') }
        });
    })
})

server.listen(PORT,()=>{
    console.log(`server started on ${PORT}`)
})
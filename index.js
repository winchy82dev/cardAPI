const express = require('express')
  const axios = require('axios')
   const PORT = 8000;
    const app = express();
// Render Static Files
app.use(express.static('public'));
// axios api fetch
app.get('/results', (req,res) => {
  // IIFE fonction that call itself when declared
  (async function() {
    try {
      const response = await axios.get('https://randomuser.me/api/')
      res.json(response.data.results[0])
    } catch(err) {
      console.error(err);
      throw new Error("Something went wrong !")
    }
  })()
})
// handle home page  
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html')
})
// handling 404 page
app.get('*', (req, res) => {
  res.status(404).send('what???');
});
// process.env.PORT is for hosting on heroku 
app.listen(process.env.PORT || PORT,() => {
  console.log(`The server is running on port ${PORT}`)
})
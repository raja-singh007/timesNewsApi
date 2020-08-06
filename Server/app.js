const express = require('express');
const app = express();
const axios = require('axios')
const router = express.Router();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//api to get news
process.env.KEY = 'zv0I3ARi142qB4tlNMMAwNNr3LGEdrYk'
router.get('/getTimesStories',async(req,res)=>{
  try{
    let news = []
    let url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.KEY}`
    let result = await axios({
      method : 'get',
      'url' : url,
      headers:{
        'Content-Type': 'application/json'
      }
    })
    let data = result.data.results;
    for(let i=0 ; i<5 ; i++){
      news.push({
        "title":data[i].title,
        "link": data[i].url
      })
    }
    console.log(news)
    res.send({status:'PASS',data:news})
  }catch(err){
    console.log("failed")
    res.send({
      status: 'FAIL',
      message: err
    })
  }
})


app.use('/', router);

app.listen(3002);

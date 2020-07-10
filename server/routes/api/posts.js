const express =require("express");
const mongodb = require("mongodb")
const router = express.Router();

router.get('/',async(req,res)=>{
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
});


router.post('/',async(req,res)=>{
  const posts = await loadPostCollection();
  await posts.insertOne({
    text:req.body.text,
    createdAt:new Date(),
  });
  res.sendStatus(201);
})


router.delete("/:id",async(req,res)=>{
  const posts = await loadPostCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
})



async function loadPostCollection(){
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://a465391854:quzhiwei@cluster0.npnoj.mongodb.net/Cluster0?retryWrites=true&w=majority",{
      useNewUrlParser:true, useUnifiedTopology:true,
    }
  )
  return client.db("Cluster0").collection("posts")
}

module.exports = router;
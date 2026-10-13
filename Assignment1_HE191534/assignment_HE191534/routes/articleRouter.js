const express=require("express");
const data=require("../data");
const articles=data.articles;
const articleRouter=express.Router();
articleRouter.use(express.json());
articleRouter.use(express.urlencoded({extended:true}));

articleRouter.route('/')
.get(async(req,res)=>{
    try{
        res.status(200).json(articles);
    }catch(err){
        res.status(404).json({message: err.message})
    }
})

;

articleRouter.route("/:id").get(async(req,res)=>{
    try{
        const article=articles.find(a=>a.id===parseInt(req.params.id));
        res.status(200).json(article);
    }catch(err){
        res.status(404).json({message: err.message})
    }
})
.delete(async(req,res)=>{
    try{
        const articleIndex=articles.findIndex(a=>a.id===parseInt(req.params.id));
        if(articleIndex===-1){
            return res.status(404).json({message: "Article not found"});
        }
        articles.splice(articleIndex,1);
        res.status(200).json({message: "Article deleted"});
    }catch(err){
        res.status(400).json({message: err.message})
    }
});

module.exports = articleRouter;



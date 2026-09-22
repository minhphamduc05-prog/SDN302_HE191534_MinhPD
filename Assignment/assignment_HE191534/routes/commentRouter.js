const express=require("express");
const data=require("../data");
const comments=data.comments;
const commentRouter=express.Router();
commentRouter.use(express.json());
commentRouter.use(express.urlencoded({extended:true}));
commentRouter.route("/comment");

commentRouter.route('/')
.get(async(req,res)=>{
    try{
        res.status(200).json(comments);
    }catch(err){
        res.status(404).json({message: '404 Not Found'})
    }
})

;

commentRouter.route("/:id").get(async(req,res)=>{
    try{
        const comment=comments.find(a=>a.id===parseInt(req.params.id));
        res.status(200).json(comment);
    }catch(err){
        res.status(404).json({message: '404 Not Found'})
    }
})
.delete(async(req,res)=>{
    try{
        const commentIndex=comments.findIndex(a=>a.id===parseInt(req.params.id));
        if(commentIndex===-1){
            return res.status(404).json({message: "404 Not Found"});
        }
        articles.splice(articleIndex,1);
        res.status(200).json({message: "200 OK"});
    }catch(err){
        res.status(400).json({message: "404 Not Found"})
    }
});

module.exports = commentRouter;



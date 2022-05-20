import express from 'express';
const app=express();
const port=3000;

//parse json using express
app.use(express.json())
app.use(express.urlencoded({extended:false}))

let movies=[
    {
        id:"1",
        title:"Inception",
        director:"John Doe",
        release_date:"2022-03-04"
    },
    {
        id:"2",
        title:"The Irish Man",
        director:"Martin Jack",
        release_date:"2022-06-04"
    }
]

//get the movie list in form of json
app.get('/movies',(req,res)=>{
    res.json(movies);
})

//add movies to the list
app.post('/movies',(req,res)=>{
    const m=req.body;
    console.log(m);
    movies.push(m);
    res.send('Movie added to the list')
})

//search for a movie in the list
app.get('/movies/:id',(req,res)=>{
    const id=req.params.id;

    for(let i of movies)
    {
        if(i.id===id)
        {
            res.json(i)
            return
        }
    }
    res.status(404).send('Movie not found')
})

//remove the data
app.delete('/movies/:id',(req,res)=>{
    const id=req.params.id;
    movies=movies.filter(i =>{
        if(i.id!==id)
        {
            return true;
        }
        return false;
    })
    res.send('Movie deleted')
})


//set the server to listen 
app.listen(port,()=>console.log(`Server listening at port http://localhost:${port}`));
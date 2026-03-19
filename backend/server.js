const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Student = require('./models/Student')


app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));


// addStudent Route
app.post('/addStudent', async(req,res)=>{
    try{
        const existing = await Student.findOne({usn : req.body.usn})

        if (existing){
            return res.status(400).json({msg : "USN Already Exists"})
        }

        if(req.body.cgpa < 6){
            return res.status(400).json({msg : "Not Eligible"})
        }

        const student = new Student(req.body)

        await student.save();
        res.json(student);
    }
    catch(err){
        if(err){
            res.status(500).json(err)
        }
    }
    
});


//Fetching Data from Students Page API
app.get('/students', async (req,res)=>{
    const data = await Student.find();
    res.json(data);
});

//Searching Data
app.get('/search',async (req, res)=>{
    const key = req.query.key;
    const data = await Student.find({
        name : { $regex : key, $options : "i"}
    })

    res.json(data);
})

//Update API
app.put('/update/:id', async(req,res)=>{
    await Student.findByIDAndUpdate(req.params.id, req.body);
    res.json({msg : "Updated"});
})


//Delete API
app.delete('/delete/:id',async(req,res)=>{
    await Student.findByIdAndDelete(req.params.id);
    res.json({msg : "Deleted"})
})


app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});





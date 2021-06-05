var Userdb=require('../Model/model');

//create and save new user

exports.create=(req,res)=>{
// validate request

if (!req.body) {res.status(400).send({message:"content can not be empty!"});
return;


}
    
const user=new Userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
})

// save user in the database
user
.save(user)
.then(data=>{
//    res.send(data)
res.redirect('/add-user')
})

.catch(err=>{

    res.status(500).send({
        message:err.message|| "some error orccured while creating a create operation"
    });
});


}

//retrieve and return all users/retrieve and return a single user
exports.find=(req,res)=>{
    if (req.query.id) {
        const id=req.query.id;


        Userdb.findById(id)

        .then(data=>{
           if (!data) {
               res.status(404).send({message:"Not found user with id"+id})
           }

           else{
               res.send(data)
           }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving user information"+id})
        })

    }
    else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Error Occured while retrieving user Infromations"})
        })
    }

   
}

// Update a new identified user by user id

exports.update=(req,res)=>{
    if (!req.body) {
        return res
        .status(400)
        .send({message:"data to update cannot be empty"})
    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body, {useFindAndModify:false})
    .then(data=>{
        if (!data) {
            res.status(400).send({message:'Cannot Update user with ${id}. Maybe user not found!'})
        }
        else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update user information"})
    })
}

//Delete a user with specific user id in the request

exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(400).send({message:"Cannot Delete with ${id}.Maybe id is wrong"})
        }
        else{
            res.send({
                message:"user was deleted successfully!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete User With id="+id
        })
    })
}


const User = require('../model/user')
const express = require('express')
const router = express.Router()

//home
router.get('/',(req,res)=>{
    res.send('hello')
})

//API to see all influencers
router.get('/all_users',async(req,res)=>{
    const foundUser = await User.find()
    res.json(foundUser)
 })


//API to add a new influencer
router.post('/users', async (req, res) => {
    try {
        let date = new Date().toUTCString().slice(5, 16);
        const { firstname,lastname,handle,followers } = req.body
        console.log(firstname,lastname)
        if (!firstname || !lastname || !handle || !followers) {
            return res.status(422).json({ error: "please enter all the fields" })
        }
        const newUser = new User({firstname, lastname, handle, followers})
        await newUser.save()

        res.json(newUser)
    }
    catch(e){
        res.json({error:e.message})
    }
})

//API to see a particular influencer  
router.get('/users/:id',async(req,res)=>{
    const foundUser = await User.findById(req.params.id)
    res.json({foundUser})
 })


//API to update a influencer
router.put('/users/:id/edit',async(req,res)=>{
    const {id} = req.params
    const {firstname,lastname,handle,followers} = req.body
    try{
        const foundUser = await User.findByIdAndUpdate(id,{firstname,lastname,handle,followers},{new:true})
        res.json(foundUser)
    }
    catch(e){
        console.log(e)
        res.status(422).json({'error' : e})
    }
})

//API to delete a influencer
router.delete('/users/:UserId',async(req,res)=>{
    try {
        const foundUser = await User.findById(req.params.UserId)
        if (!foundUser) {
            return res.status(422).json({ error: 'User not found' });
        }
        
            const deletedUser =  await User.deleteOne({ _id: req.params.UserId });
            // console.log(foundUser)
            res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the User' });
    }

})

module.exports = router
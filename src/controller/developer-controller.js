
const developerService = require('../services/developerService');


exports.addDeveloper = async(req,res)=>{
    try {
        
        const {name} = req.body;
        const developer = await developerService.addDeveloper(name);
        console.log('USer created sucessfullu !',name);
        
        res.status(201).json({
            success : true,
            message : 'Developer created sucessfully'
        })

    } catch (error) {
        console.log('Error creating developer',error);
        
        res.status(401).json({
            success : false,
            message : 'Error creating new developer'
        })
    }
}
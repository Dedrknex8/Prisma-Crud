

const { Prisma } = require('@prisma/client');
const { get } = require('../routes/developer-routes');
const gameService = require('../services/gameSerevice');

exports.addGame = async(req,res)=>{
    try{
    const {title,publishDate,developerId} = req.body;

    const games = await gameService.addGame(
        title,
        new Date(publishDate),
        developerId
    );

    res.status(201).json({
        success : true,
        message : 'Game added sucessfully'
    })
    }catch(error){
            console.log('Error creating Game',error);
            
           return  res.status(401).json({
                success : false,
                message : 'Error creating new Games'
            })
    }
}

exports.getallgame = async(req,res)=>{
    try {
        const getGames = await gameService.getAllGame();

        console.log("game found");
        
        return res.status(200).json({
            success: true,
            message: 'game fecthed ',
            getGames
        })
    } catch (error) {
        console.log('Error while fetching games',error);
        
        res.status(400).json({
            success: false
        })
    }
}

exports.findGameById = async(req,res)=>{

    try {
        const findGame = await gameService.getGameById(parseInt(req.params.id));

    if (!findGame) {
        return res.status(400).json({
            success: false,
            message: `Cann't find game with id:  ${req.params.id}`
        })
    } 
    console.log("game Fetched sucessfully");
    
    return res.status(200).json({
        success: true,
        message: `game fetched with ${req.params.id}`,
        findGame
    })

    } catch (error) {
        console.log(`Error fecthing game ${error} `);
        return res.status(200).json({
            success: false,
            message: `Can't fetch  deleted with ${req.params.id}`
        });
        
    }
}

//update game
exports.updateGame = async(req,res)=>{
    try {
        const title = req.body.title;
        const game = await gameService.updateGame(parseInt(req.params.id),title);

        console.log("game title update  sucessfully");
    
    return res.status(200).json({
        success: true,
        message: `game updated sucessfully with ${req.params.id} ${title}`,
        game
    })

    } catch (error) {
        console.log(`Error fecthing game ${error} `);
        throw error;
        return res.status(500).json({
            success: false,
            message: `Can't update with ${req.params.id}`
        });
        
    }
}
exports.deleteGame = async(req,res)=>{
    try {


        const deleteGame = await gameService.deletegame(parseInt(req.params.id));

        if (!deleteGame) {
            return res.status(400).json({
                success: false,
                message: `Cann't find game with id:  ${req.params.id}`
            })
        } 
        console.log("game Deleted");
        
        return res.status(200).json({
            success: true,
            message: `game deleted with ${req.params.id}`
        })


    } catch (error) {
        console.log('Error while deleting Game',error);
        
        res.status(400).json({
            success: false
        });
    }
}
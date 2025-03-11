

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

        console.log("game found",getGames);
        
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
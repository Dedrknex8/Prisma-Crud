// create and store new record

const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function addGame(title,publishDate,developerId){
    try {
        const newnlyCreatdGame = await prisma.games.create({
            data : {
                title,
                publishDate,
                developer:{
                    connect : {id : developerId}
                }
            },include : {developer : true},
        });

        return newnlyCreatdGame;
    } catch (error) {
        console.error(error);
        
    }
}

async function getAllGame() {
    const games = await prisma.games.findMany({
        include: {developer : true},
    });
    return games;
}

async function getGameById(id){
    
    try {
        const game = await prisma.games.findUnique({
            where : {id},
            include: {developer:true}
        });
        return game;
    } catch (error) {
        console.log(`Error findin game by Id ${error}`);
        
    }
}

async function updateGame(id,newTitle){
    try {
        // const game = await prisma.games.findUnique({
        //     where : { id },
        //     include  : { developer:true }
        // });
        
        // const updatedGame = await prisma.games.update({
        //     where : {id},
        //     data:{title : newTitle},
        //     include:{developer:true}
        // });

        

        // return updatedGame;

        //USING TRANSACTION

        const updatedGame = await prisma.$transaction(async (prisma)=>{
            const game = await prisma.games.findUnique({
                where : {id}
            });

            if(!game){
                throw new Error(`Game with id ${id} not found`);
            }

            return prisma.games.update({
                where : {id},
                data : {title: newTitle},
                include: {developer:true}
            })
        })


    } catch (error) {
        console.log('error while updating',error);
        throw error;
        
    }
}

async function deletegame(id){
    try {
        const deleteGame = await prisma.games.delete({
            where: { id },
            include: { developer: true },
        });

        return deleteGame;


    } catch (error) {
        console.log('Error while deleting Game',error);
        
    }
}

module.exports = { addGame,getAllGame,deletegame,getGameById,updateGame };
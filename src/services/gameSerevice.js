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

module.exports = { addGame,getAllGame,deletegame };
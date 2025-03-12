


const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function addDeveloper(name) {
    try {
        
        const newlyCreatedDeveloper = prisma.developer.create({
            data : {
                name
            }
        });

        return newlyCreatedDeveloper;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function deleteDeveloper(id){
    const developer = prisma.developer.delete({
        where : {id}
    });

    if(!developer){
        throw Error(`Canot find developer with ${id}`)
    }

    return developer;
}

module.exports = { addDeveloper,deleteDeveloper };
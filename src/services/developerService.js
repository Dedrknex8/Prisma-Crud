


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

module.exports = { addDeveloper };
const fs = require('fs');

let notes = require('../../src/data/notes.json');

exports.handler = async function (event, context) {

    try {

        const dataPath = `${process.cwd()}/src/data/notes.json`;

        if (event.httpMethod === 'GET') {
            return {
                statusCode:200,
                body: JSON.stringify({ notes }),
            };
        }

        if (event.httpMethod === 'POST'){
            const requestBody = JSON.parse(event.body);
            const newNote = {
                id: Date.now(),
                userId: requestBody.userId,
                title: requestBody.title,
                body: requestBody.body,
                tags: requestBody.tags,
            };

            notes.push(newNote);

            fs.writeFileSync(dataPath, JSON.stringify(notes, null, 2), 'utf8');

            
            return {
            statusCode: 201,
            body: JSON.stringify({
                message: `Note created`, 
                data: newNote})
            };
        }
        
    } catch (error) {
        console.error('Error creating note:', error);
        return {
            statusCode:500,
            body: JSON.stringify({error: 'Internal Server Error'}),
        };
    };
};

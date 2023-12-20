let notes = require('../../src/data/notes.json');

exports.handler = async function (event, context) {

    try {
        if (event.httpMethod !== 'POST') {
            return {
                statusCode:200,
                body: JSON.stringify({ notes }),
            };
        }
        const requestBody = JSON.parse(event.body);

        // const newNote = {
        //     id: Date.now(),
        //     content: requestBody.content,
        // };
        console.log(requestBody);
        // console.log(newNote);

        // notes.push(newNote);

        return {
            statusCode: 201,
            body: JSON.stringify({message: 'Note created successfully'})
        };
    } catch (error) {
        console.error('Error creating note:', error);
        return {
            statusCode:500,
            body: JSON.stringify({error: 'Internal Server Error'}),
        };
    }
};
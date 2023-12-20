const notes = require('../../src/data/notes.json');

exports.handler = async({ event, context }) => {
    try {
        const { id } = event.queryStringParameters;
        
        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'ID parameter required'}),
            };
        }

        const note = notes.find((n)=> n.id === parseInt(id, 10));

        if (!note) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Note note found" }),
            };
        }
    return {
        statusCode: 200,
        body: JSON.stringify({ note }),
    };
    } catch (error) {
        console.error("Error fetching note by ID:", error);
        return {
            statusCode:500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
   }
};
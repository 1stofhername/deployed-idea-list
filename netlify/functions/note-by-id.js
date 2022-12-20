const notes = require('../../src/data/notes.json');

exports.handler = async({ queryStringParameters }) => {
    const { id } = queryStringParameters;
    const note = notes.find((n) => n.id === id);

    if (!note) {
        return {
            statusCode:404,
            body: 'Not Found'
        }
    }

    else {

    return {
        statusCode: 200,
        body: JSON.stringify(note),
    }}
}
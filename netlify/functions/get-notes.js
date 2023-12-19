const notes = require('../../src/data/notes.json');

exports.handler = async function (event, context) {

    return {
        statusCode:200,
        body: JSON.stringify({ notes }),
    };
};
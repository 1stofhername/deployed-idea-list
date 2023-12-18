const notes = require('../../src/data/notes.json');

exports.handler = async function (event, context) {

    if (notes){
    return {
        statusCode:200,
        body: JSON.stringify({ notes }),
    };} else {
        return {
            statusCode:404,
            body: `Server error. Please contact site admin.`
        }
    }
};
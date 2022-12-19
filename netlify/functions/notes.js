import data from '../../src/data/notes.json' assert {type: 'json'};


exports.handler = async function (event, context) {

    return {
        statusCode:200,
        body: JSON.stringify({ data }),
    };
};
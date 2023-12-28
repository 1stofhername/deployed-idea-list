const fs = require('fs');

let notes = require('../../src/data/notes.json');

// Example array of disallowed words
const disallowedWords = ['word1', 'word2', 'word3'];

exports.handler = async function (event, context) {
  try {
    const dataPath = `${process.cwd()}/src/data/notes.json`;

    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        body: JSON.stringify({ notes }),
      };
    }

    if (event.httpMethod === 'POST') {
      const requestBody = JSON.parse(event.body);

      // Data validation
      
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
          note: newNote,
        }),
      };
    }
    if (event.httpMethod === 'PATCH') {
        const requestBody = JSON.parse(event.body);
        console.log('patch request', requestBody)
        
        // return {
        //     statusCode:200,
        //     body: JSON.stringify({ data: 'I\'m a fetch request.' })}
        
    }
  } catch (error) {
    console.error('Error creating note:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

// Function for data validation
function validateFormData(data) {
  if (!data.title && !data.body) {
    throw new Error('Error: The note is empty.');
  }

  // Check if data.title contains disallowed words
  if (data.title) {
    const containsDisallowedWord = disallowedWords.some((word) => data.title.includes(word));
    if (containsDisallowedWord) {
      throw new Error('Error: The note title contains a disallowed word.');
    }
  }

}
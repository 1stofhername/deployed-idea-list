const fs = require('fs');

let notes = require('../../src/data/notes.json');

let disallowedWords = require('../../src/data/flagged_words.js');

exports.handler = async function (event) {
  try {
    const dataPath = `${process.cwd()}/src/data/notes.json`;
    
    // Function to read data
    const readData = () => {
        return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      };
  
      // Function to write data
      const writeData = (data) => {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
      };

      // GET request
    if (event.httpMethod === 'GET') {
      
      return {
        statusCode: 200,
        body: JSON.stringify({ notes }),
      };
      
    }

    // POST request 

    if (event.httpMethod === 'POST') {
      
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
          note: newNote,
        }),
      };
    }

    // PATCH request

    if (event.httpMethod === 'PATCH') {
        const requestBody = JSON.parse(event.body);

        // Data validation for PATCH
        validateContent(requestBody);
        checkDisallowedWords(requestBody);

        const patchedNote = {
            id: requestBody.id,
            userId: requestBody.userId,
            title: requestBody.title,
            body: requestBody.body,
            tags: requestBody.tags,
          };
          
          updateNotesArrayById(patchedNote);

          writeData(notes);

          return {
            statusCode: 201,
            body: JSON.stringify({
              message: `Note edited`,
              note: patchedNote,
            }),
          };
        
    }

    if(event.httpMethod === "DELETE"){
      let queryParams = event.queryStringParameters;
    }
  } catch (error) {
    console.error('Error creating note:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

function checkDisallowedWords(data) {
    if (data.title && containsDisallowedWord(data.title)) {
      console.error("Error: The note body contains a disallowed word");
      throw new Error('Error: The note title contains a disallowed word.');
    }
  
    if (data.body && containsDisallowedWord(data.body)) {
      throw new Error('Error: The note body contains a disallowed word.');  
    }
  }

  function validateContent (data){
        if (!isNotEmpty(data.title) && !isNotEmpty(data.body)){
            return data;
        } 
  }
  
  // Function to check if a string contains disallowed words

  function containsDisallowedWord(value) {
    return disallowedWords.some((word) => value.includes(word));
  }
  
  // Function to check if a string is not empty

  function isNotEmpty(value) {
    return value && value.trim() !== '';
  }

  //Function to find and update note by id

  function updateNotesArrayById (updatedNote) {
    const indexToUpdate = notes.findIndex(note => note.id === updatedNote.id );
    

    if (indexToUpdate) {
      notes[indexToUpdate] = updatedNote;
    }
  }
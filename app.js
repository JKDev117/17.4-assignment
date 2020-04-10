//17.4 Assignmnet

const express = require('express');
const morgan = require('morgan');
const apps = require('./playstore.js');

const app = express();
app.use(morgan('dev'));


//http://localhost:8000/apps?sort=&genres=
//sort: 'rating' or 'app'
//genres: 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'
app.get('/apps', (req, res) => {

    let results = apps;
    const sort = req.query.sort;
    const genres = req.query.genres;

    //validation
    if(sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of Rating or App (case sensitive)');
        }
    }

    if(genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card (case sensitive)');
        }
    }


    //process request
    if (sort) {
        results.sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }

    if(genres) {
        let filteredResults = results.filter(app => 
            app.Genres.includes(genres)
        )
        res.send(filteredResults);
    }

    //send response
    res.send(results);
})

module.exports = app; //exporting the Express app object (17.5, p. 22)




/*
When testing, we don't need the server listening on the port the way it does when we run 
the application normally. So we can separate the application code from the server controller 
code. The server controller code is the part that starts the server listening on the given port. 
The application code is everything else. (17.5, p. 22)

//moved to server.js
app.listen(8000, ()=> {
    console.log('Express is listening on port 8000!');
})
*/


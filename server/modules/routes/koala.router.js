const express = require('express');
const koalaRouter = express.Router();
const pool = require( '../pool' );

// DB CONNECTION


// GET
koalaRouter.get('/', ( req, res )=> {
    let queryText = `SELECT * FROM "koalas" ORDER BY "id";`;
    pool.query( queryText).then(result => {
        res.send( result.rows );
    }).catch(error => {
        console.log( 'error getting books', error );
        res.sendStatus(500);
    });
});

// POST
koalaRouter.post('/', (req, res) => {
  console.log(req.body);
  
  const newKoala = req.body;

  const queryText = `
    INSERT INTO "koalas" ("name", "age", "gender", "ready_for_transfer", "notes") 
    VALUES ($1, $2, $3, $4, $5);
  `;

    pool.query(queryText, [
        newKoala.name, 
        newKoala.age, 
        newKoala.gender, 
        newKoala.ready_for_transfer, 
        newKoala.notes
        
    ]).then((result) => {
        console.log(result);

        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);

        res.sendStatus(500);
    })
  
})// end POST

// PUT
koalaRouter.put('/:id', (req, res) => {
    let queryText = `UPDATE "koalas" SET "ready_for_transfer"=TRUE WHERE "id"=$1`;
    pool.query(queryText, [req.params.id]).then((results)=>{
        console.log(results);
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})//end PUT

// DELETE

module.exports = koalaRouter;
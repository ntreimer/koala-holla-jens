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
        newKoala.readyForTransfer, 
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
    console.log('PUT isReady?:', req.body.status);
    let queryText; 
    let transferStatus = req.body.status;
    console.log('transferstatus:', transferStatus);
    if (transferStatus === 'true'){
        queryText = `UPDATE "koalas" SET "ready_for_transfer"=false WHERE "id"=$1`;
    }
    
    if (transferStatus === 'false'){
        queryText = `UPDATE "koalas" SET "ready_for_transfer"=true WHERE "id"=$1`;
    }
    console.log(queryText);
    pool.query(queryText, [req.params.id]).then((results)=>{
        console.log(results);
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})//end PUT

// DELETE
koalaRouter.delete( '/:id', ( req, res )=>{
    console.log( 'koala deleted:', req.params );
    let queryString = `DELETE FROM "koalas" WHERE "id"=$1`;
    pool.query( queryString, [ req.params.id ] ).then( ( results ) =>{
        res.sendStatus( 200 );
    }).catch( ( error )=>{
        console.log( 'not today amigo', error );
        res.sendStatus( 500 );
    })
})

module.exports = koalaRouter;
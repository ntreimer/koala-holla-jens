const pg = require( 'pg' );

const config = {
    database: 'koala_holla',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 20000
};

const pool = new pg.Pool( config );

pool.on( "connect", () => {
    console.log( "connected to postgres" );
});

pool.on( "error", ( error )=> {
    console.log( "error connecting to postgres", error );
});

module.exports = pool;
const pg = require( 'pg' );

const config = {
    database: 'koala_holla',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 20000
};

const pool = new pg.Pool( config );

pool.on( "connect")
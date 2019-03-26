const pool = require('./pool');



getToken = async () => {
    const client = await pool.connect();
    try {
        
        const result = await client.query(`SELECT "access_token" FROM "spotify_token"`)
        const access_token = result.rows[0].access_token;
        return access_token;
    } catch (error) {
        console.log('error getting current access token from database', error);
    } finally {
        client.release()
    }
}


let access_token = getToken();


module.exports = access_token
require('dotenv').config({ path: '.env' }); 

module.exports = {
    port: process.env.SERVER_PORT
}
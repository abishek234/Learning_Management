const { createClient } = require('redis');

const client = createClient({
    socket: {
        host: '127.0.0.1', // Change this if Redis is hosted elsewhere
        port: 6379
    }
});

client.on('error', (err) => console.error('❌ Redis Client Error:', err));

(async () => {
    await client.connect();
    console.log('✅ Connected to Redis');
})();

module.exports = client;

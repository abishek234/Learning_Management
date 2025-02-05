const client = require('../utils/redisClient');

const cacheMiddleware = async (req, res, next) => {
    const key = req.originalUrl;

    try {
        const cachedData = await client.get(key);
        if (cachedData) {
            console.log('📌 Cache Hit');
            return res.json(JSON.parse(cachedData));
        }

        console.log('🔄 Cache Miss');
        next();
    } catch (err) {
        console.error('❌ Redis Error:', err);
        next();
    }
};

module.exports = cacheMiddleware;

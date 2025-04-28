const redis = require('redis');

// Create Redis client
const client = redis.createClient({
    url: 'redis://localhost:6379' // default port
});

// Handle connection events
client.on('connect', () => console.log('Connected to Redis'));
client.on('error', (err) => console.log('Redis Client Error', err));

async function testRedisOperations() {
    try {
        // Connect to Redis
        await client.connect();

        // 1. Test SET and GET (insertion and retrieval)
        await client.set('test_key', 'Hello Redis!');
        const value = await client.get('test_key');
        console.log('Retrieved value:', value);

        // 2. Test caching with expiration
        await client.set('temp_data', 'This will expire', {
            EX: 10 // expires in 10 seconds
        });
        console.log('Set temporary data with expiration');

        // 3. Test existence check
        const exists = await client.exists('test_key');
        console.log('Key exists:', exists === 1);

        // 4. Test deletion
        await client.del('test_key');
        const afterDelete = await client.get('test_key');
        console.log('After deletion:', afterDelete);

        // 5. Test hash operations
        await client.hSet('user:1', {
            name: 'John Doe',
            email: 'john@example.com'
        });
        const user = await client.hGetAll('user:1');
        console.log('User data:', user);

        // 6. Test list operations
        await client.lPush('tasks', 'task1', 'task2');
        const tasks = await client.lRange('tasks', 0, -1);
        console.log('Tasks:', tasks);

        // 7. Print all data in cache
        console.log('All data in cache:');
        let cursor = '0';
        do {
            const result = await client.scan(cursor, { MATCH: '*', COUNT: 100 });
            cursor = result.cursor;
            const keys = result.keys;
            for (const key of keys) {
                const value = await client.get(key);
                console.log(`${key}: ${value}`);
            }
        } while (cursor !== '0');

    } catch (err) {
        console.error('Redis error:', err);
    } finally {
        // Close the connection
        await client.quit();
    }
}

testRedisOperations();


// const { createClient } = require('redis');

// async function testRedisData() {
//   const client = createClient({
//     socket: {
//       host: process.env.REDIS_HOST || 'localhost',
//       port: process.env.REDIS_PORT || 6379
//     }
//   });

//   client.on('error', (err) => console.error('Redis Client Error', err));

//   await client.connect();

//   try {
//     let cursor = '0';

//     do {
//       const [newCursor, keys] = await redis.scan(cursor, 'MATCH', 'content:cache:*', 'COUNT', 100);
    
//       cursor = newCursor;
    
//       for (const key of keys) {
//         const value = await redis.get(key);
//         console.log("Key:", key);
//         console.log("Value:", value);
//       }
    
//     } while (cursor !== '0');
    

//     console.log('\n✅ Finished reading Redis cache.');
//   } catch (error) {
//     console.error('Error while reading Redis:', error);
//   } finally {
//     await client.quit();
//   }
// }

// testRedisData();

const crypto = require('crypto');

// Generate a secure random string
const generateSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

// Generate both JWT and refresh secrets
const jwtSecret = generateSecret();
const refreshSecret = generateSecret();

console.log('=== Generated Secrets ===');
console.log('JWT_SECRET_KEY:', jwtSecret);
console.log('JWT_REFRESH_SECRET:', refreshSecret);
console.log('\nAdd these to your .env file'); 
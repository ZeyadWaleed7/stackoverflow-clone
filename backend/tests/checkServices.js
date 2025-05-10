const axios = require('axios');
const { config } = require('./testHelpers');

async function checkService(url, serviceName) {
    try {
        const response = await axios.get(url);
        console.log(`✅ ${serviceName} is running (${response.status})`);
        return true;
    } catch (error) {
        console.error(`❌ ${serviceName} is not running: ${error.message}`);
        return false;
    }
}

async function checkAllServices() {
    console.log('Checking all services...\n');

    const services = [
        { url: `${config.userService}/health`, name: 'User Service' },
        { url: `${config.authService}/health`, name: 'Auth Service' },
        { url: `${config.qaService}/health`, name: 'Q&A Service' },
        { url: `${config.votingService}/health`, name: 'Voting Service' },
        { url: `${config.searchService}/health`, name: 'Search Service' },
        { url: `${config.notificationService}/health`, name: 'Notification Service' },
        { url: `${config.apiGateway}/health`, name: 'API Gateway' }
    ];

    const results = await Promise.all(
        services.map(service => checkService(service.url, service.name))
    );

    const allRunning = results.every(result => result);

    console.log('\nSummary:');
    if (allRunning) {
        console.log('✅ All services are running!');
    } else {
        console.log('❌ Some services are not running. Please start all services before running tests.');
    }
}

checkAllServices(); 
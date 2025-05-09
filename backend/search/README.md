Search Service
This is the search service for the StackOverflow clone, using Elasticsearch for full-text search with real-time updates via RabbitMQ.

Prerequisites

Node.js 18+
Elasticsearch running on http://localhost:9200 (or configure via ELASTICSEARCH_URL)
Q/A service running on http://localhost:5000 (or configure via QA_SERVICE_URL)
RabbitMQ running on amqp://localhost (or configure via RABBITMQ_URL)

Setup

Clone the repository.
Install dependencies:npm install


Set up environment variables in a .env file:PORT=5001
ELASTICSEARCH_URL=http://localhost:9200
QA_SERVICE_URL=http://localhost:5000
RABBITMQ_URL=amqp://localhost


Start the service:npm start



API Endpoints

POST /api/search/index: Indexes questions from the Q/A service into Elasticsearch (optional with real-time updates).
GET /api/search/search?query=<text>&tags=<tag1,tag2>: Searches for questions by query and/or tags.

Real-Time Updates
The service listens for events from the Q/A service via RabbitMQ on the question_events queue. It automatically updates the Elasticsearch index when questions are created, updated, or deleted.
Docker
To run with Docker:

Build the image:docker build -t search-service .


Run the container:docker run -p 5001:5001 --env-file .env search-service




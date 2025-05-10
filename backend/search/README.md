# Search Service

This is the **Search Service** for the StackOverflow-style platform. It uses **Elasticsearch** for full-text search and integrates with **RabbitMQ** for real-time updates from the Q/A service.

__________

## Prerequisites

- **Node.js** 18+
- **Elasticsearch** running at `http://localhost:9200`  
  *(or configure via `ELASTICSEARCH_URL`)*
- **Q/A Service** running 
- **RabbitMQ** running at `amqp://localhost`  
  *(or configure via `RABBITMQ_URL`)*

___________

## Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-repo/search-service.git
   cd search-service
2. **Install dependencies**  
   ```bash
   npm install
3. **Create .env file**  
   ```bash
   PORT=5002
   ELASTICSEARCH_URL=http://localhost:9200
   RABBITMQ_URL=amqp://localhost
4. **Start the service**  
   ```bash
   npm start

___________

## API Endpoints
- **POST /api/search/index:** Indexes questions from the Q/A service into Elasticsearch (optional with real-time updates).
- **GET /api/search/search?query=<text>&tags=<tag1,tag2>:** Searches for questions by query and/or tags.

___________

## Real-Time Updates
The service listens for events from the Q/A service via **RabbitMQ** on the question_events queue. It automatically updates the **Elasticsearch** index when questions are created, updated, or deleted.

## Docker
## To run with Docker:

 1. **Build the image:**
```bash
docker build -t search-service 
```
2. **Run the container:**
```bash
docker run -p 5001:5001 --env-file .env search-service




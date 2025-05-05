## ⚙️ Technologies Used

- **Node.js / Express.js** – Backend API
- **MongoDB / Mongoose** – Data persistence
- **Redis** – Message queue for votes
- **Worker Process** – Background job processor
- **Postman** – API testing

---

## 🛠️ Setup Instructions


### 1. **Install Dependencies**

```bash
npm install
```

### 2. **Start Redis Server**

Make sure you have Redis installed. Start the Redis server:

```bash
redis-server
```


### 3. **Start MongoDB**

You can use a local MongoDB instance 

```bash
mongod
```


### 4. **Run the Application**

Start the Express app:

```bash
node app.js
```

In a separate terminal, start the worker to process votes:

```bash
node worker.js
```

---

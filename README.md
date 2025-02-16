# **Quick Polling App**

A full-stack polling application where users can create polls, vote on them, and view real-time results. Built with **React.js** (frontend), **Node.js + Express.js** (backend), and **MongoDB** (database).

- Deployed Backend - https://quick-polling-app-tawny.vercel.app/
- Deployed Frontend - https://quick-polling-app-psf2.vercel.app/

---

## **Features**
1. **Create Polls**: Users can create a poll with a question and multiple options.
2. **Vote on Polls**: Users can vote on any poll.
3. **Real-Time Results**: Poll results are updated in real-time (auto-refreshes every 5 seconds).
4. **Single Vote Restriction**: Users can only vote once per poll (tracked using local storage).
5. **Shareable Polls**: Each poll has a unique URL that can be shared with others.
6. **View All Polls**: Users can view a list of all polls and navigate to individual poll pages.

---

## **Tech Stack**
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Vercel (frontend / backend), MongoDB Atlas (database)

---

## Installation
Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/quick-polling-app.git
cd quick-polling-app
```

### 2. Set Up the Backend
 - Navigate to the backend folder: `cd backend`
 - Install dependencies: `npm install`
 - Create a .env file and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/polling-app?retryWrites=true&w=majority
   ```
 - Start the backend server: `node server.js`

### 3. Set Up the Frontend
  - Navigate to the frontend folder: `cd ../frontend`
  - install dependencies: `npm install`
  - Start the development server: `npm run dev`

## API Endpoints
### Polls
- Create a Poll: `POST /api/polls`

```
{
  "question": "What's your favorite programming language?",
  "options": ["JavaScript", "Python", "Java", "C++"]
}
```
- Vote on a Poll: `POST /api/polls/:pollId/vote`

```
{
  "optionIndex": 0
}
```
- Get Poll Results: GET `/api/polls/:pollId`

- Get All Polls: `GET /api/polls`

## Database Schema
### Poll Collection
```
{
  "_id": "ObjectId",
  "question": "String",
  "options": [
    {
      "text": "String",
      "votes": "Number"
    }
  ],
  "voters": ["String"], // List of user IDs who have voted
  "createdAt": "Date"
}
```

## License
 - This project is licensed under the ISC License.



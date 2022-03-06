# Donate

### Requirements

- node >= v16.13.1
- npm >= 8.1.2

MONGO_URI can be change in env file for [backend](./server/.env)
BASE_URL can be change in env file for [client](./client/.env)

### Start app

Mongo and mongo client can be started in docker with:

```sh
docker-compose up -d
```

```sh
npm run up   // install dependencies
npm run app  // run backend and frontend
```
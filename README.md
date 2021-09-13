## Bitcoin-Fiat Sell

A simple cryptocurrency system that allows users to purchase bitcoin using their linked plaid account

---

## Install

    $ Clone the repository
    $ cd Michael-Sanni
    $ npm install

## Configure app

create a `.env` file then add the following values.

```
PORT=9000
PG_HOST=localhost
PG_PORT=5432
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=exodus_db

POSTGRES_TEST_DB=exodus_test_db

JWT_SECRET=
JWT_EXPIRATION=5h

PLAID_CLIENT_ID=
PLAID_SECRET=

RPC_USERNAME=tom
RPC_PASSWORD=tom
RPC_PORT=8332

TEST_PORT=9001
```

## RPC Docker Container 
    docker run -v bitcoind-data:/bitcoin/.bitcoin --name=bitcoind-node -d \
        -p 8333:8333 \
        -p 127.0.0.1:8332:8332 \
        -e DISABLEWALLET=0 \
        -e PRINTTOCONSOLE=1 \
        -e RPCUSER=tom \
        -e RPCPASSWORD=tom \
        -e REGTEST=1 \
        kylemanna/bitcoind

## Database Setup
  To run migrations

    $ npm run migration:run:dev

  To run seeds

    $ npm run seeds:run:dev

  To create migations

    $ npm run migration:create

## Running the project - development

    $ npm run dev 

## Running the project - production

    $ npm run start 
     
## Running Tests

Run the tests
    
    $ npm test 
## Documentation

-   [Postman Collection](https://documenter.getpostman.com/view/3064040/U16ks5oQ)




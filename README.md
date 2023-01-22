# Monsters trading microservices system

Microservices system with the aim of practicing and exploring technologies and architectures such as React, Typescript, Nodejs, Nestjs, Docker, Kubernetes, Apache Kafka, Github actions etc.

## System Description
This microservice system allows multiple users to trade monsters. It has the following functionalities:
- User creation
- User authentication via JWT
- Users can buy monster eggs of different levels which correspond to various ranks of monsters
- Eggs hatch approximately one minute after they are purchased
- Users have 200 credits initially and every hour they receive 10 credits
- Users can view their hatched monsters and their transactions

## System architecture

### Monster Service

- Written in nodejs using the Nestjs framework
- Service in charge of managing monsters and eggs
- Fill the database with monsters with available images obtained through the API http://www.dnd5eapi.co/
- Create a catalog of eggs based on the available levels of monsters
- Due to the fact that most of the fields only want to be saved without any specific structure, MongoDB was chosen as the database since it is of the document type
- It has a cache layer for reading endpoints (monster queries, egg catalog)

### User Service
- Written in nodejs using the Nestjs framework
- Service in charge of managing users and transactions
- Creation and authentication of users via JWT
- Create and complete transactions asynchronously
- Listen for Kafka's topics:
- finalize-transaction: complete a pending transaction
- inject-credits: Inject credits defined in the kafka message to all users
- Because in this service it is desired to handle ACID transactions by the algorithm of completing a credit transaction, PostgresDB was chosen as the database

### Cron Service
- Cron job written in nodejs
- It has two main processes
- Process pending transactions: requests the Users Service for pending transactions with more than 1 minute of creation and publishes messages to the finalize-transaction topic. This process runs every 30 seconds
- Inject credits: Publish the amount of 10 credits to the kafka topic inject-credits. This process runs every hour

### Monsters UI
- User interface written in React with typescript'
- Signup / Signin
- Authentication handling with JWT
- Dashboard to navigate between the different sections
- Monsters: See the monsters hatched
- Eggs: See the catalog of eggs and buy them
- Transactions: View transaction history

### High level diagram
<img src="assets/high-level-diagram.png" width="400" height="300">

## Instructions for running locally

Clone the repo: 
`git clone https://github.com/davidcdorbecker/dnd-monsters.git`

Use Docker Compose to start the microservies application:
`docker compose up --build`

A web page is now available:
`http://127.0.0.1:3000`

## Demo

User sing up

<img src="assets/sin-up.png" width="400" height="200">

The user starts with 200 credits and no monsters

<img src="assets/initial-page.png" width="400" height="150">

The user can consult the egg catalog in the eggs section and buy some

<img src="assets/eggs.png" width="400" height="150">

For example, when trying to buy a level 2 egg that corresponds to a monster in the range of levels 8 to 12, a confirmation dialog appears.

<img src="assets/dialog.png" width="400" height="150">

By accepting the dialogue the credits decrease to 168 since the level 2 egg cost 32

<img src="assets/money-decrease.png" width="400" height="150">

In the transactions section the user can see the pending transaction

<img src="assets/transaction.png" width="400" height="150">

In the container logs we can see the asynchronous communication of cron with kafka and kafka with the user microservice

<img src="assets/container-logs.png" width="400" height="150">

After a minute the user can see the transaction finished

<img src="assets/transaction-finished.png" width="400" height="150">

and the monster born

<img src="assets/got monster.png" width="400" height="150">

## Next steps

- Mount the application on Kubernetes
- Write more unit tests
- Improve CI / CD
- Write the documentation of the APIs with swagger

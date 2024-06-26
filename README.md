# SIM Cloud Computing Project
# RESTful API for managing persons built using Docker. This API allows you to create, fetch, delete, and update persons.

## How to run
To run the project, follow these steps:
1. Pull the Docker image from Docker Hub using the following command:
```code
docker pull mohamedbekhit/sim-docker-api:latest
```
2. Run the Docker container using the following command:
```code
docker run -p 8080:8080 mohamedbekhit/sim-docker-api:latest
```

## API endpoints
To test the API in Visual Studio Code, you can use the ***REST Client*** extension. To do this, follow these steps:

1. Install the REST Client extension in Visual Studio Code.
2. Create a new file in your project called "client.rest".
3. In the "client.rest" file, write the commands to test the API using the ***REST Client*** syntax.
4. Save the "client.rest" file.
5. Run the commands in the "client.rest" file using the REST Client extension.

Note: Replace {person-id} with the actual ID of the person you want to delete or update.

### Get All Persons
```client.REST
GET http://localhost:8080/persons
```
### Get Person
```client.REST
GET http://localhost:8080/persons/{person-id}
```
### Delete Person

```client.REST
DELETE http://localhost:8080/persons/{person-id}
```
### Create New Person
```client.REST
POST http://localhost:8080/persons
content-type: application/json

{
"name": "Mourad",
"age": 35,
"gender": "male",
"email": "mourad@outlook.com"
}
```
### Update Person
```client.REST
PUT http://localhost:8080/persons/{person-id}
content-type: application/json

{
   "email": "example@gmail.com"
}
```
## Credits
This project was created by Mohamed Saeed Mohamed.

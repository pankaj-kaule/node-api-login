# node-api-login

Add Mongodb Connection String in .env file at MONGODB_CONNECTION_STRING. Refer to .env.example file.

Insert some user data in users collection in MongoDB.

You can use Create User API call as well for this.
Following curl call will also help for adding new user data:

curl --location 'localhost:4000/user' \
--header 'Content-Type: application/json' \
--data '{
    "name" : "admin user",
    "username" : "admin",
    "password" : "admin"
}'


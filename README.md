
# Project Support
### Introduction
Build an API for the students management system with the following details. You need to build these APIs with proper validation and follow the MVC pattern.

### Describe 7 User Scenarios
* In this step, you will identify 3 scenarios that REST Api's will support. Each scenario should correspond to a separate endpoint your REST Api offers.

### Installation Guide
* Clone this repository [here](https://github.com/MdAmir-99/Student_Managment_System.git).
* The develop branch is the most stable branch at any given time, ensure you're working from it.
* Run npm install to install all dependencies.
* You can either work with the default mongodb atlas cloud database or use your locally installed MongoDB. Do configure to your choice in the application entry file inside city folder.
* Create an .env file in your project root folder and add your variables. See .env.sample for assistance.
### Usage
* Run (npm start) / (npm run dev) to start the Nodejs application on Port 8080.
* Connect to the API using Postman on port 8080.

### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/register | Register a Student with his/her ProfileImage |
| POST | /api/login | Login Student and Generate JWT Token |
| POST | /api/upload | Teacher will Upload Assignment for the Students with Assingment file Validation |

### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.

### Author
* [Md Amir](https://github.com/MdAmir-99)


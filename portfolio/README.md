# 	Portfolio

*Portfolio* is a project created with nodeJS technology, MongoDB and several external APIs, all built with JavaScript.
This web-app *Portfolio* may work not only as a Currculumn Vitae but also as a free space for his owner to upload and 
display their own content, integrating severals social networks.

#   Dependencies

This project has been built and uses technologies and third party npm libraries such as
1. EJS
1. Express
1. FS (built-in nodeJS)
1. MongoDB
1. Mongoose  

Besides npm and nodeJS, APIs such as:
1. Instagram through Instafeed
1. Facebook
1. ~~LastFM~~

To install all dependecies, it is mandatory to run the following command inside portfolio folder containing *package.json*

```
$ npm install 
```

#   Considerations Before Running
1. This project has a self signed SSL certificate until 18th of June 2019 therefore, to access this webapp,
it is mandatory to type the following address (https://localhost:3000) after running the server.

1. MongoDB has been published on Cloud. It might be required using VPN or you can simply switch to local server
by commenting line 11 and uncommenting line 12 of server.js file



#   Running
This nodeJS app can be ran through the following commands, depending on its purpose:
* Start App:  
```   
$ node app
```   
* Dev Mode:  
```
$ npm run dev
```

By running in Dev Mode, the server will refresh itself every time changes in code are saved  

Since this project has a self signed SSL certificate, to access this website, 
it is MANDATORY type the following address https://localhost:3000

#   Accessing Dashboard
For CRUD operations, Dashboard can be accessed by entering navigating to https://localhost:3000 with the following credentials
* Username: miguelsolans
* Password: NotTellingYou  
  
User permissions will be created, eventually

#   To Do List
Some features to be implemented in the future  
  
| ID | Feature                              | Priority       | Status             |
| -- | ------------------------------------ | -------------- | ------------------ |
| 1  | Dashboard Notifications              | Medium         | To Develop         |
| 2  | Allow users to create own portfolios | High           | To Develop         |
| 3  | Portfolio Themes                     | Medium         | To Develop after 2 |
| 4* | Export to Curriculumn Vitae          | Low            | To Develop         |
  
  * More fields need to be created on database
  
#   License
Copyright (c) 2019, Miguel Solans

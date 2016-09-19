# JSON2Tab
Visualize RESTful JSON APIs in the form of a table. Debug data inconsistencies in the API like a boss.

### Development
Run development server (Webpack Development Server):<br>
```npm run start-dev```<br>
Create a development build:<br>
```npm run build-dev```<br>
Create a production build:<br>
```npm run build-prod```<br>

##### Using Docker for development
Once you have created a build. Create a docker build using the Dockerfile included in the repo:<br>
```docker build . -t=mydockerimage```<br>
Run the container:
```docker run -t -i -p 8080:8080 -v=`pwd`:/json2tab -w=/json2tab mydockerimage```

application is now running at port 8080

### Deployment
`npm run build`
`npm start`

#### Using docker for deployment
```docker run -t -i -p 8080:8080 -v=`pwd`:/json2tab -w=/json2tab mydockerimage```

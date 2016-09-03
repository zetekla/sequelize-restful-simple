////////// Node.JS INITIALIZATION //////////////

var express   = require('express')
  , bodyParser = require('body-parser')
  , Sequelize = require('sequelize')
  , http      = require('http')
  , restful   = require('sequelize-restful')
  , sequelize = new Sequelize('test', 'root', 'KTMEi', {
  	host: "127.0.0.1",
  	logging: console.log,
	define: {
	  timestamps: false
	}
})
  , app       = express();

var port = process.env.PORT || 3000;
app.use(bodyParser.json({
  type: 'application/*',
}));
////////////////////////////////////////////////

/////////// MODELS DEFINITIONS /////////////////

// User model definition
var User = sequelize.define('users', {
    name: Sequelize.STRING,
    password: Sequelize.STRING
  }
);

// Project model definition
var Project = sequelize.define('projects', {
    name: Sequelize.STRING
  }
);

// Relationship definition
User.hasMany(Project, {foreignKey: 'user_id' });
///////////////////////////////////////////////

sequelize.sync({
        // force: true, // drop table
        logging: console.log
    }).then(function(){
    	console.log('db sync successful');
    });

/////////// MAGICAL PIECE OF CODE /////////////
app.use(restful(sequelize));
///////////////////////////////////////////////

/////////// LAUNCH THE SERVER /////////////////
app.listen(port);
console.log('Magic happens on port ' + port);
////////////////////////////////////////////////

/*
And that’s all! If you follow the steps, at this point you have a fully functional API RESTful. You can test the following paths:

http://[your IP address]:3000/api/users/
http://[your IP address]:3000/api/users/1
http://[your IP address]:3000/api/projects/
http://[your IP address]:3000/api/projects/1
Or even a more complex path to show the projects of a single user:

http://[your IP address]:3000/api/users/1/projects/
From pabloanaya.com
*/
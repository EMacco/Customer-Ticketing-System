# Customer Ticketing System
[![Build Status](https://travis-ci.org/EMacco/Customer-Ticketing-System.svg?branch=develop)](https://travis-ci.org/EMacco/Customer-Ticketing-System) [![Maintainability](https://api.codeclimate.com/v1/badges/ce239eaf015d82a548d2/maintainability)](https://codeclimate.com/github/EMacco/Customer-Ticketing-System/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/ce239eaf015d82a548d2/test_coverage)](https://codeclimate.com/github/EMacco/Customer-Ticketing-System/test_coverage)


This system allows customers to be able to place support requests to agents who will be able to  process these requests, and interact with the customer through comments. This application is built using `Ruby on Rails` for the backend and `React & Redux` for the frontend 

# Project Management
This application was managed using [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2399352)

# Current Features

  - Authentication
  - User can log a complaint
  - Agents can respond to these complaints through comments
  - Tickets are properly categorized as `open` or `close`
  - Tickets that have been resolved can be closed
  - Admin can change the role of other users


### Technologies Used

* [Ruby on Rails](http://rubyonrails.org/) - A web-application framework that includes everything needed to create database-backed web applications according to the Model-View-Controller
* [ReactJS](https://reactjs.org/) - is a tool for building UI components
* [Redux](https://redux.js.org/) - a predictable state container for JS apps
* [RSpec](https://rspec.info/) - a testing tool wrritten in Ruby to test Ruby


### Installation

The system requires [Ruby v2.5.6](https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-2.5.6-1/rubyinstaller-devkit-2.5.6-1-x64.exe) and  [MySQL](https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-web-community-8.0.17.0.msi) to run.

Clone the repository
```sh
$ git clone https://github.com/EMacco/Customer-Ticketing-System.git
```

Install the application dependencies and devdependencies.

```sh
$ cd Customer-Ticketing-System
$ bundle install
$ yarn install
```

Create the databases and run migrations
```sh
$ rake db:setup
$ rake db:migrate
```

Create the initial Admin
```sh
$ rake db:seed
```

Start the rails server 
```sh
$ rails server
```

Start the webpack dev server in a different terminal
```sh
$ ruby ./bin/webpack-dev-server
```

or start both servers at once
```sh
$ foreman start
```

Verify the deployment by navigating to your server address in your preferred browser.
[http://localhost:3000/](http://localhost:3000/)

# Note
If you need to login as an Admin use the credentials Email: `admin@csv.com`, Password: `password`

# Future Features

  - Real-time notification and resonses
  - More detailed and properly analyzed data/reports showing the efficiency of each agent
  - Store accounts of friends to easily transfer money
  - Show analysis of how fast customers are attended to, how quickly their problems are resolved.
  - Implement a means for customers to give feedback


License
----

MIT

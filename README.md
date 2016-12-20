Eyeota FrontEnd coding project
====

## The challenge

The objective is to build a reusable AngularJS *analog clock* component similar to the following one:

![clock.png](https://bitbucket.org/repo/5MzL47/images/2897370627-clock.png)

that can be used in the following way:

```html
<clock background-color="white" seconds-tick-enabled="true" offset="2"></clock>
```

where

* `background-color` defines the color of the clock face
* `seconds-tick-enabled` (*true|false*) specifies whether the seconds tick is visible
* `offset` given in hours - e.g. `offset="2"` means the current time + 2 hours, `offset="-3.5"` means current time - 3.5 hours

### Requirements

* it has to be an AngularJS component
* possibility to have more than one clock component on the page (with different options passed)
* you should use SVG to achieve the desired result (you may want to use a library like [D3.js](http://d3js.org/), [Raphaël](http://raphaeljs.com/) or [Snap.svg](http://snapsvg.io/))
* the code should be tested and *jslint* errors and warnings free
* you can add any dependencies as you want
* you should use the provided scaffold

## Scaffold

### Dependencies

* [node.js](http://nodejs.org/download/)
* `$ npm install bower -g` - [bower](http://bower.io/) to download frontend dependencies
* `$ npm install grunt-cli -g` [grunt](http://gruntjs.com/) to build the project

### Install & run

`$ git clone https://bitbucket.org/eyerecuitment/eyeota-frontend-coding-project.git`  
`$ cd eyeota-frontend-coding-project`  
`$ npm install`  
`$ bower install`  
`$ node server` or `$ npm start`  

and go to `http://localhost:3000` using your browser.

### Tests / build

Run grunt:
```
$ grunt
```
to run the tests and check your JS syntax.

There's a sample unit test located in `test/controllers` folder.

## Project structure

The scaffold is built using node.js and express framework. You don't have to worry about them.

The important files are described below:

```
├── bower.json                # bower.json file
├── jshint.json
├── Gruntfile.js              # Gruntfile.js
├── package.json              # package.json file
├── server.js                 # node.js server
├── public
│   ├── js
│   │   ├── app.js            # defines angular app
│   │   ├── main.js           # main requirejs file
│   │   ├── controllers
│   │   │   └── AppCtrl.js
│   │   ├── directives
│   │   ├── routes
│   │   │   └── routes.js
│   │   └── services
│   └── stylesheets           # css files go here (if any)
│       └── base.css
├── routes
│   └── index.js              # node.js routes
├── test
│   ├── karma.conf.js         # karma config file
│   ├── test-main.js          # karma-requirejs config file
│   ├── controllers
│   │   └── AppCtrlSpec.js    # sample unit test
└── views
    ├── index.html            # main view
    └── partials              # partials
        └── example.html
```

# Result

You should send the result in a *.zip* file or *tarball* (created with command `tar -czvf`) file and **should not** push it to the public repo.

# License

Copying, sharing or publishig is not allowed.

Copyright 2014 Eyeota
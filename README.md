# SoNet Starter Kit

This project is an application skeleton for an [AngularJS](http://angularjs.org/) web app, realized for the Social Networking course at Politecnico di Torino.

The Starter Kit contains a sample AngularJS application (the one reported in the official [angular-seed](https://github.com/angular/angular-seed). AngularJS (version 1.6.4) is included in the `lib` folder, together with the [Bootstrap](https://getbootstrap.com/) framework (version 3.3.7).

Moreover, the Starter Kit is preconfigured to install a bunch of development tools for easing the development of a project:

- [`browser-sync`](https://www.browsersync.io/), a time-saving synchronized browser testing tool
- [`jshint`](http://jshint.com/), for JS linting, preconfigured for AngularJS
- [`firebase-tools`](https://www.firebase.com/), for deploying the webapp to the Firebase Hosting service.

The included app doesn't do much, just shows how to wire two controllers and views together.

## Prerequisites

You need git to clone the repository. You can get git from [http://git-scm.com/](http://git-scm.com/).

You must have node.js and its package manager (npm) installed for used the included development tools.  You can get them from [http://nodejs.org/](http://nodejs.org/).

## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  components/           --> all app specific modules
    version/              --> version related components
      version.js                 --> version module declaration and basic "version" value service
      version-directive.js       --> custom directive that returns the current app version
      interpolate-filter.js      --> custom interpolation filter
  view1/                --> the view1 view template and logic
    view1.html            --> the partial template
    view1.js              --> the controller logic
  view2/                --> the view2 view template and logic
    view2.html            --> the partial template
    view2.js              --> the controller logic
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
images/                 --> (optional) images needed to the application
lib/                    --> libraries (AngularJS and Bootstrap, namely)
  angular/              --> AngularJS version 1.6.4
  bootstrap/            --> Bootstrap version 3.3.7
    css/                --> Boostrap CSS classes (all)
    fonts/              --> fonts provided by Bootstrap
    ui-boostrap-tpls-2.5.0-min.js   --> Angular directives for Bootstrap (UI Bootstrap)
.gitignore              --> files and folders to ignore under Git
.jshintrc               --> configuration file for JSHint
bs-config.js            --> configuration file for browser-sync
package.json            --> metadata, dependencies and npm scripts
README.md               --> this document
```

### Note
This project was created for teaching purpose. AngularJS and Bootstrap should be installed with `npm` or `bower` instead of being downloaded in a `lib` folder. Due to some limitations on the lab computers, this was not possible.

For the students enrolled in the course: please, notice that all the development tools provided by npm (and present in the `package.json` file) *do not* work on the lab desktop computers.

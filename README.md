# Cordova Brunch

## Description

Base [Brunch](http://brunch.io/) skeleton that includes [Apache Cordova](https://incubator.apache.org/cordova/) for building native applications. (currently supports Android and iOS) Regular web apps can still be developed as well. Brunch does not have to be installed or used directly to get started with this skeleton. Testing is also provided through [Mocha](http://visionmedia.github.com/mocha/) with [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/) (using [Sinon-Chai](http://github.com/domenic/sinon-chai)).


## Installation Instructions

* Install [Node](http://nodejs.org/) if you have not done so already.
* Download the skeleton and run `npm install` from within the skeleton folder.
* Optional - Install [CoffeeScript](http://coffeescript.org/) to use `cake`: `npm install -g coffee-script`


## Tasks

* `npm` - You can run tasks using `npm run-script [task]`. Run `npm start` to see all available tasks.
* `cake` - If you have CoffeeScript installed you can run tasks using `cake [task]`. Run `cake` to see all available tasks.


## Apps

Items are categorized as follows:
* `base` - Shared across all app types
* `web` - Used in the regular web app
* `android` - Used in the Cordova Android app
* `ios` - Used in the Cordova iOS app

This categorization applies in the following places:
* `vendor`
* `test`
* `config`
* `build`


### Web

* A regular web project is generated under `build/web`.
* To assemble code with Brunch run the task `build:web:<stage>` or `watch:web:<stage>`, where `<stage>` is `dev` (no CSS/JS minification) or `prod` (CSS/JS minification).
* To run a simple HTTP server run the task `server:<stage>`.


### Cordova

* To create a Cordova app run the task `cordova:<os>`, where `<os>` is the type of app to build.
* A Cordova Android project is generated under `build/android`. The project can then be imported into Eclipse or updated with the `android` tool.
* A Cordova iOS project is generated under `build/ios`. The project can then be opened with XCode.
* Creating an app using the method above is not enough, as it does not contain HTML/CSS/JS. To add Brunch assembled code run the task `build:<os>:<stage>` or `watch:<os>:<stage>`, where `<stage>` is `dev` (no CSS/JS minification) or `prod` (CSS/JS minification).


## FAQ

Why `npm` and `cake`?
* By specifying Brunch in `package.json` you can keep things consistent when working with others on a project in case of upgrades and changes.
* It is easier for one to get someone started on an existing project if they are unfamiliar with some of these tools. For me I can get them to install Node.js, download the project, install dependencies and use `npm run-script` or `cake`.
* Cakefile is used to write advanced tasks in the future and can be used cross-platform.
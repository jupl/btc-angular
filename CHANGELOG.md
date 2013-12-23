# Changelog

#### WIP
- Fix watch in `test:code`

#### 0.6.1 (December 20, 2013)
- Update Mocha
- Update WebDriverJS

### 0.6.0 (December 14, 2013)
- Allow multiple names to be specified per scaffold
- Move default Jake task to Jakefile
- Include server to customize and add services
- Update packages

#### 0.5.8 (December 12, 2013)
- Fix Windows support

#### 0.5.7 (December 12, 2013)
- Internal fix to bring back spawn options

#### 0.5.6 (December 12, 2013)
- Add specific WebStorm and IntelliJ files to gitignore
- Stop worrying about absolute paths
- Mark execute promises as cancellable
- Move auto-reload-brunch to devDependencies
- Allow project's bower to be run if root (or root-like)
- Update selenium-webdriver

#### 0.5.5 (December 4, 2013)
- Update dependencies
- Added `bower:clean` task
- Changed behavior of `gen`/`del` tasks

#### 0.5.4 (November 14, 2013)
- Add ability to run server in `test:code`
- For manual testing, set up Mocha and Chai before loading app-related code
- Add option in `test:code` to explicitly state browsers to run

#### 0.5.3 (November 9, 2013)
- Make sure `vendor` file is loaded first when testing in Karma

#### 0.5.2 (November 9, 2013)
- Fix issue with `addIgnored`

#### 0.5.1 (November 9, 2013)
- Ignore Bower files related to testing internally

### 0.5.0 (November 9, 2013)
- Fix potential issues in test tasks
- Add `normalize.css` to available modules to add
- Fix bug in `addIgnored`
- Replace Mocha PhantomJS with Karma
- Remove `test/vendor` files
- Add autorun support in site testing using nodemon

#### 0.4.1 (November 5, 2013)
- Update EditorConfig
- Scaffolt generators are automatically made into generators (requires a name) or modules. (do not require a name) This is done by checking the `isModule` property of a `generator.json` file.
- Test modules for code testing are more specific

### 0.4.0 (November 4, 2013)
- Convert custom Cake tasks into standard Jake tasks
- Remove any prompts in favor of Jake arguments
- Remove `npm run-script` tasks. Use `jake`.
- Auto generate Jake tasks for Scaffolt generators
- Add code testing and site testing support
- Add PhantomJS for testing
- Add `auto-reload-brunch` by default
- Add test file generator
- Remove Modernizr
- Use default `public` path for default builds

#### 0.3.2 (September 27, 2013)
- Add ability to edit `bower.json` in bower task
- Wrap promptly into a promise
- Bugfixes

#### 0.3.1 (September 26, 2013)
- Bugfix with scaffold command and tasks iterator

### 0.3.0 (September 26, 2013)
- Update Brunch
  - Change config to use `overrides` for different environments instead of multiple config files
- Changed tasks structure/iteration
- Update packages and test
- Update test-related vendor files
- Change a lot of the toolchain code from CS to JS

#### 0.2.1 (August 6, 2013)
- Update test system

### 0.2.0 (August 5, 2013)
- Update Brunch
  - Update plugins
  - Modify `config`s for optimize and source map options
  - Leverage Bower
    - `test/vendor` still has files included manually
- Update Scaffolt
  - Add `helpers.js` file for adding helpers
- Update test-related vendor files
- Set `cake` and `configs` directories hidden

#### 0.1.4 (May 19, 2013)
- Use bin-based Scaffolt instead of API as a temporary fix.
- Update Brunch and Scaffolt.
- Update Mocha, Chai, and Sinon. (Sinon-Chai was already updated.)

#### 0.1.3 (April 15, 2013)
- Update Brunch and Scaffolt.
- Update Mocha

#### 0.1.2 (April 2, 2013)
- Updated Brunch and Brunch plugins.
- Minor enhancement to Module.

#### 0.1.1 (March 29, 2013)
- Bugfixes and enhancements.
- Switched out underscore.string for Sugar.

### 0.1.0 (March 28, 2013)
- Initial release.

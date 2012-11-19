fs = require 'fs'
wrench = require 'wrench'
commander = require 'commander'
_s = require 'underscore.string'

module.exports = class Cordova
  minApiLevel: 7
  maxApiLevel: 17
  templatesPath: './cake/templates'
  buildPath: './build'

  android: =>
    packageName = null
    activity = null
    appName = null
    apiLevel = null

    packageNamePrompt = (callback) ->
      commander.prompt 'Package: ', (name) ->
        name = _s.clean name
        name = "#{name.charAt(0).toLowerCase()}#{name.slice(1)}"
        packageName = _s.dasherize(name).replace /-/g, '.'
        activityPrompt callback

    activityPrompt = (callback) ->
      commander.prompt 'Activity: ', (name) ->
        activity = _s.capitalize _s.camelize name
        if activity.length isnt 0
          appNamePrompt callback
        else
          activityPrompt callback

    appNamePrompt = (callback) ->
      commander.prompt 'App name: ', (name) ->
        appName = _s.titleize _s.clean name
        if activity.length isnt 0
          apiLevelPrompt callback
        else
          appNamePrompt callback

    apiLevelPrompt = (callback) =>
      commander.prompt 'Target API Level: ', (name) =>
        apiLevel = parseInt name
        if @minApiLevel <= apiLevel <= @maxApiLevel
          do callback
        else
          apiLevelPrompt callback

    packageNamePrompt =>
      @_createAndroid {packageName, activity, appName, apiLevel}
      do process.exit

  ios: =>
    packageName = null
    projectName = null

    packageNamePrompt = (callback) ->
      commander.prompt 'Package: ', (name) ->
        name = _s.clean name
        name = "#{name.charAt(0).toLowerCase()}#{name.slice(1)}"
        packageName = _s.dasherize(name).replace /-/g, '.'
        projectNamePrompt callback

    projectNamePrompt = (callback) ->
      commander.prompt 'Project name: ', (name) ->
        projectName = _s.capitalize _s.camelize name
        if projectName.length isnt 0
          do callback
        else
          projectNamePrompt callback

    packageNamePrompt =>
      @_createIOS {packageName, projectName}
      do process.exit

  _createAndroid: ({packageName, activity, appName, apiLevel}) =>
    templatePath = "#{@templatesPath}/android"
    buildPath = "#{@buildPath}/android"
    packagePath = "#{buildPath}/src/#{packageName.replace(/\./g, '/')}"
    activityPath = "#{packagePath}/#{activity}.java"
    manifestPath = "#{buildPath}/AndroidManifest.xml"

    # Copy template to project build
    wrench.copyDirSyncRecursive templatePath, buildPath

    # Rename folders/files
    wrench.mkdirSyncRecursive packagePath
    fs.renameSync "#{buildPath}/Activity.java", activityPath

    # Replace text in the project
    @_replace activityPath, '__ACTIVITY__', activity
    @_replace activityPath, '__ID__', packageName
    @_replace manifestPath, '__ACTIVITY__', activity
    @_replace manifestPath, '__PACKAGE__', packageName
    @_replace manifestPath, '__APILEVEL__', apiLevel
    @_replace "#{buildPath}/res/values/strings.xml", '__APPNAME__', appName
    @_replace "#{buildPath}/.project", '__APPNAME__', appName
    @_replace "#{buildPath}/project.properties", '__APILEVEL__', apiLevel

  _createIOS: ({packageName, projectName}) =>
    templatePath = "#{@templatesPath}/ios"
    buildPath = "#{@buildPath}/ios"
    root = "#{buildPath}/#{projectName}"
    testingReplacementFileNames = [
      "#{root}.xcodeproj/project.pbxproj"
      "#{root}/Classes/AppDelegate.h"
      "#{root}/Classes/AppDelegate.m"
      "#{root}/Classes/MainViewController.h"
      "#{root}/Classes/MainViewController.m"
      "#{root}/main.m"
      "#{root}/#{projectName}-Info.plist"
      "#{root}/#{projectName}-Prefix.pch"
    ]

    # Copy template to project build
    wrench.copyDirSyncRecursive templatePath, buildPath

    # Rename folders/files
    fs.renameSync \
      "#{buildPath}/__TESTING__",
      "#{root}"
    fs.renameSync \
      "#{buildPath}/__TESTING__.xcodeproj",
      "#{root}.xcodeproj"
    fs.renameSync \
      "#{root}/__TESTING__-Info.plist",
      "#{root}/#{projectName}-Info.plist"
    fs.renameSync \
      "#{root}/__TESTING__-Prefix.pch",
      "#{root}/#{projectName}-Prefix.pch"

    # Replace text in the project
    @_replace "#{root}/#{projectName}-Info.plist", '--ID--', packageName
    @_replace "#{root}.xcodeproj/project.pbxproj", 'CORDOVALIB', '"<group>"'
    @_replace "#{root}.xcodeproj/project.pbxproj",
      'path = CordovaLib.xcodeproj;',
      'name = CordovaLib.xcodeproj; path = CordovaLib/CordovaLib.xcodeproj;'
    for fileName in testingReplacementFileNames
      @_replace fileName, '__TESTING__', projectName

  _replace: (fileName, searchKeyword, replaceKeyword) ->
    bufferString = fs.readFileSync fileName, 'utf8'
    regEx = new RegExp searchKeyword, 'g'
    bufferString = bufferString.replace regEx, replaceKeyword
    fs.writeFileSync fileName, bufferString, 'utf8'
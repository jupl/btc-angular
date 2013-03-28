require 'sugar'
{basename} = require 'path'

# Add a number of tests to the ignored. Tests can be any of the following:
#   Function: Return true to ignore
#   RegExp:   Match to ignore
#   String:   Equal to ignore
exports.addIgnored = (config, tests...) ->
  config.conventions ?= {}
  {ignored} = config.conventions
  config.conventions.ignored = (file) ->
    for test in tests when test?(file) or test.test?(file) or test is file
      return true
    if Object.isFunction(ignored)
      ignored file
    else if Object.isRegExp(ignored)
      ignored.test file
    else
      basename(file).startsWith('_')
{basename} = require 'path'
typeof$ = (obj) -> ({}).toString.call(obj).slice(8, -1)

# Add a number of tests to the ignored. Tests can be any of the following:
#   Function: Return true to ignore
#   RegExp:   Match to ignore
#   String:   Equal to ignore
exports.addIgnored = (config, tests...) ->
  config.conventions ?= {}
  {ignored} = config.conventions
  config.conventions.ignored = (file) ->
    for test in tests
      switch typeof$ test
        when 'Function' then return true if test file
        when 'RegExp' then return true if test.test file
        when 'String' then return true if test is file
    switch typeof$ ignored
      when 'Function' then ignored file
      when 'RegExp' then ignored.test file
      else basename(file).indexOf('_') is 0
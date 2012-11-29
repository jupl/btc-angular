typeof$ = (obj) -> ({}).toString.call(obj).slice(8, -1)

module.exports =
  runTest: (test, file) ->
    switch typeof$ test
      when 'RegExp' then test.test file
      when 'Function' then test file
      when 'String' then test is file
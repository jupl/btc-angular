// Load all modules.
var modules = window.require.list();

for(var index = 0; index < modules.length; index++) {
  if(/-test$/.test(modules[index])) {
    require(modules[index]);
  }
}
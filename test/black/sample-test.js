this.title('Sample test');
this.base('http://localhost:3333');

this.open('/', function() {
  this.describe('Check page is valid', function() {
    this.assert.equal(this.$('title').textContent, 'Brunch Toolchain');
    this.success();
  });
});
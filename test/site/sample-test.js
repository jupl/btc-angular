describe('Sample', function() {
  var driver;

  it('Has a proper title', function(done) {
    return driver.get('http://localhost:3333').then(function() {
      return driver.getTitle();
    })
    .then(function(title) {
      expect(title).to.equal('Brunch Toolchain');
    });
  });

  before(function() {
    driver = getDriver();
  });

  after(function() {
    driver.quit();
  })
});
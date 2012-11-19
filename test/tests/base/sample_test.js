describe('An array', function() {
  var array = null;

  describe('that is empty', function() {
    before(function() {
      array = [];
    });

    it('should exist', function() {
      should.exist(array);
    });

    it('should not be null', function() {
      array.should.not.be["null"];
    });

    it('should have a length of 0', function() {
      array.length.should.equal(0);
    });
    
    it('should return -1 when looking for index of an item in array', function() {
      array.indexOf(-1).should.equal(-1);
      array.indexOf(0).should.equal(-1);
      array.indexOf(1).should.equal(-1);
    });
  });
});
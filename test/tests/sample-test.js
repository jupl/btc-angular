describe('An array', function() {
  var array = null;

  describe('that is empty', function() {
    before(function() {
      array = [];
    });

    it('should exist', function() {
      expect(array).to.exist;
    });

    it('should not be null', function() {
      expect(array).to.not.be.null;
    });

    it('should have a length of 0', function() {
      expect(array).to.have.length(0);
    });
  });
});
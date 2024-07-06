describe('fights', function() {
    describe('add()', function() {
        it('should return 5 when adding 2 and 3', function() {
            const result = add(2, 3);
            expect(result).to.equal(5);
        });

        it('should return -1 when adding -2 and 1', function() {
            const result = add(-2, 1);
            expect(result).to.equal(-1);
        });

        it('should return 0 when adding 0 and 0', function() {
            const result = add(0, 0);
            expect(result).to.equal(0);
        });
    });
});
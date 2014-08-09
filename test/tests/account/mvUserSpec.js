/**
 * Created by HenryGau on 8/7/2014.
 */

describe('mvUser', function(){
    beforeEach(module('app'));

    describe('isAdmin', function(){
        it('should return false if the roles array does not have an admin entry',
        inject (function(mvUser) {
            var user = new mvUser();
            user.roles = ['not admin'];
            expect(user.isAdmin()).to.be.falsey;
        }))

        it('should return true if admin',
        inject (function(mvUser) {
            var user = new mvUser();
            user.roles = ['admin'];
            expect(user.isAdmin()).to.be.true;
        }))

    })
})
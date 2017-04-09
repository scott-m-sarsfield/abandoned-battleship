/* eslint-env node, mocha */
var expect = require('chai').expect;

var _test = "tester";

describe('This',function(){
    describe("that",function(){
        it("sings Halleluja",function(){
            return true;
        });
        it("has matching test export",function(){
            expect(_test).to.equal("tester");
        });
    });
});

/* eslint-env node, mocha */
var expect = require('chai').expect;

import CPUGameFacilitator from '../CPUGameFacilitator';

describe('CPUGameFacilitator',function(){

    it("can construct an object",function(){
        expect(new CPUGameFacilitator()).to.not.equal(null);
    });
});

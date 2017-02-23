import { objectArraySort } from './lib';

require("should");

var name = "test";
const data=[{id:'a'},{id:'2c'},{id:'1'}]
console.log(objectArraySort(data,'id'))
describe("test", function () {
    it("test", function () {
        name.should.eql("test");
    });
});

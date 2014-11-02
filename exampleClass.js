// JavaScript Document
function exampleClass() {
	this.property1 = 5;
	this.property2 = "World";
	this.method1 = function method1 (arg1) {
		return arg1 + " " + this.property2;
	}
}
---
title: js中的继承
date: 2017-12-26 09:23:18
tags:
---
js中的继承也是很重要的。来回顾一下js中的继承方式。
<!--more-->
# 1.原型继承
```javascript
function Animal(){
	this.name = 'animal';
}
Animal.prototype.sayName = function(){
	console.log(`i am ${this.name}`)
}
function Dog(){
	
}
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;//需要将原型的constructor属性重新指向Dog
var dog = new Dog();
console.log(dog.sayName());//i am animal


缺点：1. 需要将子类原型的constructor属性重新指向子类构造函数；
2. 若属性为引用类型，则会被所有实例共享,比如：


function Animal(){
	this.name = ['adam','allen'];
}
function Dog(){
	
}
Dog.prototype = new Animal();
var dog1 = new Dog();
var dog2 = new Dog();
dog1.name.push('jas');
console.log(dog1.name);//["adam", "allen", "jas"]
console.log(dog2.name);//["adam", "allen", "jas"]
```
# 2.借用构造函数
```javscript
function Parent(name){
	this.name = name;
	this.friends = ['carl','king'];
}
Parent.prototype.sayName = function(){
	console.log(`my name is ${this.name}`);
}
function Child(parentName){
	Parent.call(this,parentName);
};
var child1 = new Child('li');
var child2 = new Child('simon');
child1.friends.push('sheery');
console.log(child1.name);//li
console.log(child1.friends);//['carl','king','sheery'];
console.log(child2.friends);//['carl','king'];
child1.sayName();//Uncaught TypeError: child1.sayName is not a function
```
优点：**1、避免了引用类型的属性被实例共享;**
**2、在子类中可以向父类中传参数；**
缺点：**1、无法继承原型；**
**2、每次创建实例时都会调用一次方法**

# 3.组合继承
组合继承就是将原型方法和构造函数方法结合在一起的方法。
```javascript
function Parent(name){
	this.name = name;
	this.age = 10;
}
Parent.prototype.sayName = function(){
	console.log(`parent name is ${this.name}`);
}
Parent.prototype.doSomthing = function(){
	console.log('parent is doing something')
}
function Child(name){
	Parent.call(this,name)
}
Child.prototype = new Parent('father');
Child.prototype.constructor = Child;
Child.prototype.sayName = function(){
	console.log(`child's name is ${this.name}`);
}
var child = new Child('child')
child.sayName();//child's name is child
child.doSomthing();//parent is doing something
```

缺点：**组合继承是JS最常用的继承模式，但是在组合继承中，父类会被调用两次，一次在子类构造函数内，一次在子类原型继承父类实例.**

# 4.原型式继承
```javascript
var ob = {name:'xiaobao',friends:['jie','bao']};
function Parent(obj){
	function F(){};
	F.prototype = obj;
	return new F();
}
var child1 = new Parent(ob);
var child2 = new Parent(ob);
child1.name = 'dazhi';
console.log(child1.name);//dazhi
console.log(child2.name);//xioabao
child1.friends.push('qing');
console.log(child1.friends);//['jie','bao','qing']
console.log(child2.friends);//['jie','bao','qing']
```
缺点：**实例会共享引用类型的变量**

# 5.寄生式继承
创建一个仅用于封装过程的函数，在函数内部以某种方式增强对象。
```javascript
var ob = {
	name:'xiaobao',
	friends:['xiaojie','xiaowen']
}
function createObj(obj){
	var newObj = Object.create(obj);
	newObj.sayName = function(){
		console.log(this.name);
	}
	return newObj;
}
var obj = new createObj(ob);
obj.sayName();//'xiaobao'
```

# 6.寄生组合式继承
```javascript
function inhertPrototype(Parent,Child){
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype.constructor = Child;
}
function Parent(name){
	this.name = name;
	this.friends = ['xiaobao','xiaojie'];
}
Parent.prototype.sayName = function(){
	console.log(`parent's name is ${this.name}`)
}
function Child(name,parentName){
	Parent.call(this,parentName);
	this.name = name;
}
Child.prototype.sayName = function(){
	console.log(`child's name is ${this.name}`);
}
inhertPrototype(Parent,Child);
var parent = new Parent('father');
parent.sayName();//parent's name is father
var child1 = new Parent('son1','father');
child1.friends.push('abei');
console.log(child1.friends);//['xioabao','xiaojie','abei']
child1.sayName();//child's name is son1
var child2 = new Child('son2','father');
console.log(child2.friends);//['xioabao','xiaojie']
child2.sayName();//child's name is son2;
```

# 7.ES6的继承

1、ES6提供了更接近传统语言“类”的写法，引入了Class（类）这个概念，中作为对象的模板；
2、通过Class关键字，可以定义类。Class可以看做只是一个语法糖，它的绝大部分功能，ES5都可以做到。

```javascript
class Parent{
	constructor(name){
		this.name = name;
	}
	doSomthing(){
		console.log('parent do something');
	}
	sayName(){
		console.log(`parent's name is ${this.name}`);
	}
}
class Child extends Parent{
	constructor(name,parentName){
		super(parentName);
		this.name = name;
	}
	
	sayName(){
		console.log(`chlid'name is ${this.name}`);
	}
}
const child = new Child('son','father');
child.sayName();//child's name is son
child.doSomthing();//parent do somthing
const parent = new Parent('father');
parent.sayName();//parent's name is father
```

**能用ES继承就推荐使用ES6的class继承方式**


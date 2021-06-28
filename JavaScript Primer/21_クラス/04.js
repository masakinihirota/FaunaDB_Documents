"use strict";

const person ={
    fullName: "Brendan Eli",
    sayName: function(){
        // `this`は呼び出し元によって異なる
        return this.fullName
    }
}

// `sayName`メソッドは`person`オブジェクトに所属する
// `this`は`person`オブジェクトとなる
console.log(person.sayName()); // => "Brendan Eli"
// `person.sayName`を`say`変数に代入する
const say = person.sayName;

// 代入したメソッドを関数として呼ぶ
// この`say`関数はどのオブジェクトにも所属していない
// `this`はundefinedとなるため例外を投げる

// 例外になる
// say(); // => TypeError: Cannot read property 'fullName' of undefined



"use strict";
// const say = person.sayName; は次のようなイメージ
const say = function() {
    return this.fullName;
};
// `this`は`undefined`となるため例外を投げる
// say(); // => TypeError: Cannot read property 'fullName' of undefined

// メソッドはオブジェクトに所属している関数

// メソッドをわざわざただの関数として呼ばない



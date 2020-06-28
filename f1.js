var a = 10;

function f2() {
    console.log('f1');
    var a = 20;
    f1();
}

function f1() {
    console.log('f2');
    console.log(a);
}

// Global scope and local scope
f2();


// Closures - enclose one function inside another - gives access to outer function vars though it has finished executing

function outer() {
    var b = 20;

    function inner() {
        console.log(a + b);
    }
    return inner;
}

var i = outer();
i();

console.dir(i);
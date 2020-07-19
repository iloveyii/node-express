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

function nRandomItems(items, random_count) {
    // Get random_count random items from items
    const random10 = [...Array(random_count).keys()];
    const random_items = random10.map(() => {
        const num = items[Math.floor(Math.random() * items.length)];
        items = items.filter(item => item !== num);
        return num;
    });
    return random_items.sort((a, b) => Number(a) - Number(b))
}

const random100 = [...Array(100).keys()];
const r = nRandomItems(random100, 10);
console.log(r);

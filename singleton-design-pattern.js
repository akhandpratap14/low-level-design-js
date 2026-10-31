// The instance is created as soon as the class or module loads, whether or not it’s ever used.

// Pros: simple, with no checks needed at access time.
// Cons: the instance is created even if never used, which is wasteful when it’s expensive to build, such as a DB connection.
class EagerSingleton {
    static #token = Symbol('singleton')
    static #instance = new EagerSingleton(EagerSingleton.#token);
    constructor(token){
        if(token !== EagerSingleton.#token){
            throw new Error("Use getInstance() instead");
        }
    }
    static getInstance(){
        return this.#instance;
    }
}

const obj1 = EagerSingleton.getInstance();
const obj2 = EagerSingleton.getInstance();

class LazySingleton {
    static #token = Symbol('singleton');
    static #instance = null;

    constructor(token) {
        if (token !== LazySingleton.#token) {
            throw new Error("Use getInstance() instead");
        }
    }

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new LazySingleton(this.#token);
        }

        return this.#instance;
    }
}

const obj3 = LazySingleton.getInstance();
const obj4 = LazySingleton.getInstance();

console.log(obj1 === obj2); // true
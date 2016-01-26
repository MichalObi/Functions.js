// ENCAPSULATION SAMPLE
	/* 
		Standard obj - possible to change semi-private val.

		person._age = 42
		//=> 42

		person.getAge()
		//=> 42
	*/

	var testObj = {
		// simulated default, semi-private val
	    _firstName: "John",
	    _lastName: "Smith",
	    _age: 23,

	    //Getter
	    getName: function() {
	        return this._firstName + " " + this._lastName;
	    },
	    getAge: function() {
	        return this._age;
	    },

	    //Setter - use default val, if invoke without parameter
	    setName: function(firstName, lastName) {
	        this._firstName = firstName || this._firstName;
	        this._lastName = lastName || this._lastName;
	    },
	    setAge: function(age) {
	        this._age = (age > 0) ? age : this._age;
	    }
	};

	/* 
		Encapsulated obj - can't change semi-private val.

		person._age = 42
		//=> 42

		person.getAge()
		//=> 32
	*/

	// Asigned IIFE ( closure ) to var, and use var insted of object properties for semi-private data.
	var testObj = (function() {
		// use var
	    var _firstName = "Jan",
	        _lastName = "Kowalski",
	        _age = 32;
	    // return methods
	    return {
	        getName: function() {
	            return _firstName + " " + _lastName;
	        },
	        getAge: function() {
	            return _age;
	        },
	        setName: function(firstName, lastName) {
	            _firstName = firstName || _firstName;
	            _lastName = lastName || _lastName;
	        },
	        setAge: function(age) {
	            _age = (age > 0) ? age : _age;
	        }
	    };
	})();

// FUNCTION DECORATOR 01 - ES6

	// Map arr elem on function 
	[1, null, 3, 4, null, 6, 7].map((x => x * x));

	//=> [1,0,9,16,0,36,49]

	// function decorator - will be used map to filter null

	const mapFunction = (fn) =>
	// ...arg -> all function's argument
	  (...args) => {
	    for (let arg of args) {
	      if (arg == null) return arg;
	    }
	    return fn(...args);
	  }

	[1, null, 3, 4, null, 6, 7].map(mapFunction(x => x * x));

	//=> [1, null, 9, 16, null, 36, 49]

// FUNCTION DECORATOR 02 - ES6

/* 

Let  invoke class method  ONLY ONCE

*/

class testObj {
  setName (first, last) {
    this.firstName = first;
    this.lastName = last;
    return this;
  }
  fullName () {
    return this.firstName + " " + this.lastName;
  }
};

const invokeOnce = (fn) => {
// if no reference to var - Garbage collect it !
  let invocations = new WeakSet();
  
  return function (...args) {
    if (invocations.has(this)) return;
    invocations.add(this);
    // run fn with cureent context
    return fn.apply(this, args);
  }
}

// before save setName propert for testObj check if it was saved before
Object.defineProperty(testObj.prototype, 'setName', { value: invokeOnce(testObj.prototype.setName) });

const test = new testObj()
                   .setName('First', 'Name');

test.setName('Another', 'test');

console.log(test.fullName());

//=> First Name
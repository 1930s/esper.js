"use strict";

let Value;

class CompletionRecord {
	constructor(type, value, target) {
		if ( value === undefined ) {
			value = type;
			type = CompletionRecord.NORMAL;
		}

		this.type = type;
		this.value = value;
		this.target = target;
	}

	get abrupt() { return this.type !== CompletionRecord.NORMAL; }

	static makeTypeError(realm, msg) {
		let Value = require('./Value');
		let err;
		if ( msg instanceof Error ) err = realm.TypeError.makeFrom(msg);
		else err = realm.TypeError.make(msg);
		return new CompletionRecord(CompletionRecord.THROW, err);
	}

	static makeReferenceError(realm, msg) {
		let Value = require('./Value');
		let err;
		if ( msg instanceof Error ) err = realm.ReferenceError.makeFrom(msg);
		else err = realm.ReferenceError.make(msg);
		return new CompletionRecord(CompletionRecord.THROW, err);
	}

}
module.exports = CompletionRecord;



CompletionRecord.NORMAL = 0;
CompletionRecord.BREAK = 1;
CompletionRecord.CONTINUE = 2;
CompletionRecord.RETURN = 3;
CompletionRecord.THROW = 4;



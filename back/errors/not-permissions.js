'use strict';

const { code } = require('./symbols');

class NotHavePermissions extends Error {
	constructor(message = 'No posee permisos.', ...args) {
		super(message, ...args);

		this[code] = 403;
	}
}

module.exports = NotHavePermissions;
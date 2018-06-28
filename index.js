'use strict';
const { shell } = require('execa');

// Regex
const RE = /^(feature|hotfix|bugfix|release|custom)|((?!([A-Z0-9]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)/g;

// Command
const COMMAND = 'git rev-parse --abbrev-ref HEAD';

(() => {
	shell(COMMAND).then(({ stdout, stderr }) => {
		if (stderr) {
			console.log(stderr);
			return;
		}

		const [type, ticket] = stdout.match(RE);
		console.log(type, ticket);
		return {
			type,
			ticket
		};
	});
})();

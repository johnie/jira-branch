import test from 'ava';
import jiraBranch from '.';

const branch = 'feature/XXX-1337-this-is-a-very-important-task';
const other = 'develop';

const mockBranch = {
	branch,
	type: 'feature',
	ticket: 'XXX-1337'
};

test('Should match regex', t => {
	t.regex(branch, jiraBranch.JIRA_REGEX);
});

test('Should not match regex', t => {
	t.notRegex(other, jiraBranch.JIRA_REGEX);
});

test('Should extract branch info', t => {
	t.deepEqual(jiraBranch.extract(branch), mockBranch);
});

test('Should extract branch if no regex', t => {
	t.deepEqual(jiraBranch.extract(other), {
		branch: 'develop',
		type: '',
		ticket: ''
	});
});

test('Should match every type', t => {
	['feature', 'hotfix', 'bugfix', 'release', 'custom'].forEach(type => {
		t.deepEqual(
			jiraBranch.extract(
				`${type}/XXX-1337-this-is-a-very-important-task`
			),
			{
				branch: `${type}/XXX-1337-this-is-a-very-important-task`,
				type,
				ticket: 'XXX-1337'
			}
		);
	});
});

test('Should not match type', t => {
	['develop', 'patch', 'fix', 'bug'].forEach(type => {
		t.notDeepEqual(
			jiraBranch.extract(
				`${type}/XXX-1337-this-is-a-very-important-task`
			),
			{
				branch: `${type}/XXX-1337-this-is-a-very-important-task`,
				type,
				ticket: 'XXX-1337'
			}
		);
	});
});

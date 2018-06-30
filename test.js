import test from 'ava';
import jiraGit from '.';

const branch = 'feature/XXX-1337-this-is-a-very-important-task';
const fake = 'develop';

const mockBranch = {
	branch,
	type: 'feature',
	ticket: 'XXX-1337'
};

test('Should match regex', t => {
	t.regex(branch, jiraGit.JIRA_REGEX);
});

test('Should not match regex', t => {
	t.notRegex(fake, jiraGit.JIRA_REGEX);
});

test('Should extract branch info', t => {
	t.deepEqual(jiraGit.extract(branch), mockBranch);
});

test('Should match every type', t => {
	['feature', 'hotfix', 'bugfix', 'release', 'custom'].forEach(type => {
		t.deepEqual(
			jiraGit.extract(`${type}/XXX-1337-this-is-a-very-important-task`),
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
			jiraGit.extract(`${type}/XXX-1337-this-is-a-very-important-task`),
			{
				branch: `${type}/XXX-1337-this-is-a-very-important-task`,
				type,
				ticket: 'XXX-1337'
			}
		);
	});
});

import test from 'ava';
import jiraGit from '.';

test('title', t => {
	const err = t.throws(() => {
		jiraGit(123);
	}, TypeError);
	t.is(err.message, 'Expected a string, got number');

	t.is(jiraGit('unicorns'), 'unicorns & rainbows');
});

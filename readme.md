# jira-branch [![Build Status](https://travis-ci.org/johnie/jira-branch.svg?branch=master)](https://travis-ci.org/johnie/jira-branch)

> Retrieve JIRA information from current branch

## Install

```
$ npm install jira-branch
```

## API

### Jira Regex

`JIRA_REGEX` matches 5 different types of branches `feature|hotfix|bugfix|release|custom` and a jira ticket, i.e. `XXXX-00000`

### Extract

`extract()` extracts the information from a string

### Run

`run()` execute a promise that extracts info from current git repo

## Usage

```js
const jiraBranch = require('jira-branch');

const branch = 'feature/XXX-1337-this-is-a-very-important-task';

jiraBranch.extract(branch);
// => {
//   branch: 'feature/XXX-1337-this-is-a-very-important-task',
//   type: 'feature',
//   ticket: 'XXX-1337'
// }

jiraBranch.run().then(data => console.log(data));
// => {
//   branch: 'feature/XXX-1337-this-is-a-very-important-task',
//   type: 'feature',
//   ticket: 'XXX-1337'
// }
```

## License

MIT © [Johnie Hjelm](https://jh.je)

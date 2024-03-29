import { execa } from 'execa';

// Regex
const JIRA_REGEX =
  /^(feature|hotfix|bugfix|release|custom)|((?!([A-Z0-9]{1,10})-?$)[A-Z]{1}[A-Z0-9]+-\d+)/g;

// Command
const COMMAND = 'git rev-parse --abbrev-ref HEAD';

/**
 * Extract JIRA data from branch name
 * @param {String} branch git branch
 * @returns {Object} branch info
 */
const extract = (branch) => {
  if (JIRA_REGEX.test(branch)) {
    const [type, ticket] = branch.match(JIRA_REGEX);

    return {
      branch,
      type,
      ticket,
    };
  }

  return {
    branch,
    type: '',
    ticket: '',
  };
};

/**
 * Get info from current repository
 * @returns {Promise} extract branch info
 */
const run = async () => {
  try {
    const { stdout } = await execa(COMMAND, { shell: true });
    return extract(stdout);
  } catch (error) {
    return error;
  }
};

export { JIRA_REGEX, extract, run };

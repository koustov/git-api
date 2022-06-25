# GIT-REPO-API

## Description
    npm package to get your github tekemetry.
## Installation
    `npm i git-repo-api`

    or
    `yarn add git-repo-api`


## Usage

### Importing
    ```
    import { GitAPI } from 'git-repo-api';
    ```
### Initialize
    ```
    const api = new GitAPI('your-personal-access-token', 'user-name', 'repo-name')
    ```
    or
    ```
    const api = new GitAPI('your-personal-access-token', 'user-name', 'repo-name')
    api.accessToken = 'your-personal-access-token;
    api.user = 'user-name;
    api.repo = 'repo-name';
    ```
    
    **Note: `personal-access-token` is optional for many of the APIs

### Read Data
    ```
    api.get('key_name')
    ```

    or use below table to call specific methiod
    example
    ```
    api.get_all_branches()
    ```

### Options
| Keys                 | Description                                       | Method Name                 |
| -------------------- | ------------------------------------------------- | --------------------------- |
| all_branches         | List all branch details for the given repo        | `get_all_branches()`        |
| all_collaborators    | List all collaborators details for the given repo | `get_all_collaborators()`   |
| all_invitations      | List all invitation details for the given repo    | `get_all_invitations()`     |
| all_commits          | List all commit details for the given repo        | `get_all_commits()`         |
| all_issues           | List all issue details for the given repo         | `get_all_issues()`          |
| all_assignees        | List all assignee details for the given repo      | `get_all_assignees()`       |
| all_labels           | List all label details for the given repo         | `get_all_labels()`          |
| weekly_commits       | Gets weekly commit trend                          | `get_weekly_commit()`       |
| weekly_commits_count | Gets weekly commit count                          | `get_weekly_commit_count()` |
| hourly_commits       | Gets hourly commit trend                          | `get_hourly_commits()`      |
| last_year_commits    | Gets last year commit trend grouped by weeks      | `get_last_year_commits()`   |
| all_pulls_open       | List all open pull request details                | `get_all_pulls_open()`      |
| all_pulls_closed     | List all closed pull request details              | `get_all_pulls_closed()`    |
| star_gazers          | List star gazers details                          | `get_all_star_gazers()`     |
| all_collaborators    | List collaborator  details                        | `get_all_collaborators()`   |
| all_milestones       | List milestone details                            | `get_all_milestones()`      |
| all_forks            | List fork details                                 | `get_all_forks()`           |
| create_repo| Creates new repo | `create_repo()`


**Note: Refer `https://docs.github.com/en/rest/` for full list of APIs
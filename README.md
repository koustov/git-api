# GIT-REPO-API

## Description
    npm package to get your github tekemetry.
## Installation
    `npm i git-repo-api`

    or
    `yarn add git-repo-api`


    ```
    import GitAPI from 'git-repo-api';
    const api = new GitAPI('your-personal-access-token', 'user-name', 'repo-name')

    api.get_last_year_commit('user-name', 'repo-name')
    api.get('all_forks')

    ```
### Options
| Keys                 | Description                                       |
| -------------------- | ------------------------------------------------- |
| all_branches         | List all branch details for the given repo        |
| all_collaborators    | List all collaborators details for the given repo |
| all_invitations      | List all invitation details for the given repo    |
| all_commits          | List all commit details for the given repo        |
| all_issues           | List all issue details for the given repo         |
| all_assignees        | List all assignee details for the given repo      |
| all_labels           | List all label details for the given repo         |
| weekly_commits       | Gets weekly commit trend                          |
| weekly_commits_count | Gets weekly commit count                          |
| hourly_commits       | Gets hourly commit trend                          |
| last_year_commits    | Gets last year commit trend grouped by weeks      |
| all_pulls_open       | List all open pull request details                |
| all_pulls_closed     | List all closed pull request details              |
| star_gazers          | List star gazers details                          |
| all_collaborators    | List collaborator  details                        |
| all_milestones       | List milestone details                            |
| all_forks            | List fork details                                 |


**Note: Refer `https://docs.github.com/en/rest/` for full list of APIs
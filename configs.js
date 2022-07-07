import { unixToDate } from "./utils.js";

export const Configs = {
  // Branches
  all_branches: {
    url: "repos/{owner}/{repo}/branches",
  },

  //   Collaborators
  all_collaborators: {
    url: "repos/{owner}/{repo}/collaborators",
    all_pages: true,
  },

  // Inivitations
  all_invitations: {
    url: "repos/{owner}/{repo}/invitations",
    all_pages: true,
  },

  // Commits
  all_commits: {
    url: "/repos/{owner}/{repo}/commits",
    all_pages: true,
  },

  // Issues
  all_issues: { url: "repos/{owner}/{repo}/issues", all_pages: true },

  // Assignees
  all_assignees: { url: "repos/{owner}/{repo}/assignees", all_pages: true },

  // Labels
  all_labels: { url: "repos/{owner}/{repo}/labels", all_pages: true },

  // Activities
  weekly_commits: {
    url: "repos/{owner}/{repo}/stats/code_frequency",
    formatter: (data) => {
      // console.log(data);
      const res = [];
      if (data && Array.isArray(data)) {
        data.forEach((r) =>
          res.push({
            name: unixToDate(r["0"]),
            Added: r["1"],
            Removed: r["2"],
          })
        );
      }
      return res;
    },
  },
  weekly_commits_count: {
    url: "repos/{owner}/{repo}/stats/participation",
    formatter: (data) => {
      const res = [];
      if (data && data.all && Array.isArray(data.all)) {
        data.all.forEach((r, i) =>
          res.push({
            name: `Week ${i}`,
            Commits: r,
          })
        );
      }
      return res;
    },
  },

  hourly_commits: {
    url: "repos/{owner}/{repo}/stats/punch_card",
    formatter: (data) => {
      const res = [];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      if (data && data.length) {
        data.forEach((r, i) =>
          res.push({
            name: days[r[0]],
            Hour: r[1],
            Hour_display: `${r[1] > 12 ? `${r[1] - 12} PM` : `${r[1]} AM`}`,
            Commits: r[2],
          })
        );
      }
      return res;
    },
  },

  last_year_commits: {
    url: "repos/{owner}/{repo}/stats/commit_activity",
    formatter: (data) => {
      const res = [];
      if (data && Array.isArray(data)) {
        data.forEach((r) =>
          res.push({
            name: unixToDate(r.week),
            Commits: r.total,
            Days: r.days,
          })
        );
      }
      return res;
    },
  },

  // Pull Requests
  all_pulls_open: {
    url: "repos/{owner}/{repo}/pulls?state=open",
    all_pages: true,
  },
  all_pulls_closed: {
    url: "repos/{owner}/{repo}/pulls?state=closed",
    all_pages: true,
  },

  // Star Gazers
  star_gazers: { url: "repos/{owner}/{repo}/stargazers", all_pages: true },

  // Collaborators
  all_collaborators: {
    url: "repos/{owner}/{repo}/collaborators",
    all_pages: true,
  },

  // Milestones
  all_milestones: { url: "repos/{owner}/{repo}/milestones", all_pages: true },

  // Forks
  all_forks: { url: "repos/{owner}/{repo}/forks", all_pages: true },

  // Contributors
  all_contributors: { url: "repos/{owner}/{repo}/stats/contributors" },
};

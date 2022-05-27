import { GitAPI } from "../index.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// const api = new GitAPI();
// api.accessToken = process.env.PERSONAL_ACCESS_TOKEN;
// api.user = process.env.USER;
// api.repo = process.env.REPO;

// OR

const api = new GitAPI(
  process.env.PERSONAL_ACCESS_TOKEN,
  process.env.USER,
  process.env.REPO
);

api.get_all_branches().then((res) => {
  console.log(`Branch count: ${res.length}`);
});

api.get_all_collaborators().then((res) => {
  console.log(`Collaborator count: ${res.length}`);
});

api.get_all_invitations().then((res) => {
  console.log(`Invitation count: ${res.length}`);
});

api.get_all_commits().then((res) => {
  console.log(`Commit count: ${res.length}`);
});

api.get_all_issues().then((res) => {
  console.log(`Issue count: ${res.length}`);
});

api.get("all_assignees").then((res) => {
  console.log(`Assignee count: ${res.length}`);
});

api.get("all_labels").then((res) => {
  console.log(`Labels count: ${res.length}`);
});

api.get("weekly_commits").then((res) => {
  console.log(`Weekly commit: ${res.length}`);
});

api.get("weekly_commits_count").then((res) => {
  console.log(`Weekly commits count: ${res.length}`);
});
api.get("hourly_commits").then((res) => {
  console.log(`Hourley commits count: ${res.length}`);
});

api.get("last_year_commits").then((res) => {
  console.log(`Last year commits: ${res.length}`);
});

api.get("all_pulls_closed").then((res) => {
  console.log(`Pull request count - Closed: ${res.length}`);
});

api.get("all_pulls_open").then((res) => {
  console.log(`Pull request count - Opened: ${res.length}`);
});

api.get("star_gazers").then((res) => {
  console.log(`Star gazers count: ${res.length}`);
});

api.get("all_collaborators").then((res) => {
  console.log(`Colaborators count: ${res.length}`);
});

api.get("all_milestones").then((res) => {
  console.log(`Milestone count: ${res.length}`);
});

api.get("all_forks").then((res) => {
  console.log(`Forks count: ${res.length}`);
});

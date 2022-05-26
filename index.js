import { Configs } from "./configs.js";
import fetch from "node-fetch";

export const API = class GitAPI {
  #_accessToken = "";
  #_user = "";
  #_repo = "";
  constructor(accessToken, user, repo) {
    this.#_accessToken = accessToken;
    this.#_user = user;
    this.#_repo = repo;
  }

  request(config, page_number, user, repo, accessToken) {
    // console.log("xxxxxxxxxxxxxx");
    // console.log(user, repo, accessToken);
    const options = {
      method: "GET",
      // 'username': data.login,
      headers: {
        Accept: "application/vnd.github.v3+json",
        // "user-agent": `${user || this.#_user}`,
        "User-Agent": "request",
        authorization: `token ${accessToken || this.#_accessToken}`,
      },
    };

    let final_url = config.url
      .replace("{owner}", user || this.#_user)
      .replace("{repo}", repo || this.#_repo);

    if (page_number) {
      final_url = `${final_url}?per_page=30&page=${page_number}`;
    }

    // console.log(`Requested URL: ${final_url}`);

    return fetch(`https://api.github.com/${final_url}`, options).then((res) => {
      return res.json().then((r) => {
        const d = config.node ? r[config.node] : r;
        if (config.formatter) {
          return config.formatter(d);
        } else {
          return d;
        }
      });
    });
  }

  get_all_pages = (config) => {
    const req_method = this.request;
    const req_access_token = this.#_accessToken;
    const req_user = this.#_user;
    const req_repo = this.#_repo;
    return new Promise(async function (resolve, reject) {
      let go_for_next_page = true;
      let current_page_number = 1;
      const final_res = [];
      while (go_for_next_page) {
        // console.log(`Retrieving result for page number ${current_page_number}`);
        const res = await req_method(
          config,
          current_page_number,
          req_user,
          req_repo,
          req_access_token
        );
        const found_result = res.length > 0;
        // console.log(res.length);
        if (found_result) {
          // console.log("yyyyyyyyyyyyyyyyy");
          // console.log(res.length);
          // console.log(current_page_number);
          Array.prototype.push.apply(final_res, res);
          current_page_number = current_page_number + 1;
        } else {
          // console.log("done");
          go_for_next_page = false;
          resolve(final_res);
        }
      }
    });
  };

  get_data = async (config) => {
    if (config.all_pages) {
      return this.get_all_pages(config, this.request);
    } else {
      return this.request(config);
    }
  };

  request_proxy(config) {
    return this.get_data(config);
  }

  get(type) {
    return this.request_proxy(Configs[type]);
  }

  // Branch
  get_all_branches() {
    return this.request_proxy(Configs.all_branches);
  }

  // Collaborators
  get_all_collaborators() {
    return this.request_proxy(Configs.all_collaborators);
  }

  // Invitations
  get_all_invitations() {
    return this.request_proxy(Configs.all_invitations);
  }

  // Commits
  get_all_commits() {
    return this.request_proxy(Configs.all_commits);
  }

  // Issues
  get_all_issues() {
    return this.request_proxy(Configs.all_issues);
  }
};

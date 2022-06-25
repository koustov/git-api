import { Configs } from "./configs.js";
import axios from "axios";
import create_base from "./api_base.js";

export const GitAPI = class API {
  #_accessToken = "";
  #_user = "";
  #_repo = "";

  constructor(accessToken, user, repo) {
    this.#_accessToken = accessToken;
    this.#_user = user;
    this.#_repo = repo;
  }

  set accessToken(value) {
    this.#_accessToken = value;
  }

  set user(value) {
    this.#_user = value;
  }

  set repo(value) {
    this.#_repo = value;
  }

  request(config, page_number, user, repo, accessToken) {
    const options = {
      method: 'GET',
      // 'username': data.login,
      headers: {
        Accept: "application/vnd.github.v3+json",
        // "user-agent": `${user || this.#_user}`,
        // "User-Agent": "request",
        // authorization: `token ${accessToken || this.#_accessToken}`,
      },
    };

    if (accessToken) {
      options.headers["authorization"] = `token ${accessToken || this.#_accessToken
        }`;
    }

    let final_url = config.url
      .replace("{owner}", user || this.#_user)
      .replace("{repo}", repo || this.#_repo);

    if (page_number) {
      final_url = `${final_url}?per_page=30&page=${page_number}`;
    }

    // console.log(`Requested URL: ${final_url}`);

    return axios
      .get(`https://api.github.com/${final_url}`, options)
      .then((response) => {
        const res = response.data;

        const d = config.node ? res[config.node] : res;
        if (config.formatter) {
          return config.formatter(d);
        } else {
          return d;
        }
      })
      .catch((err) => {
        console.error(err);
        return 0;
      });
  }


  post_req(name,accessToken,user) {
    const config = {
      method: 'post',
      url: 'https://api.github.com/user/repos',
      data: {
        "name": name,
        "private": false
      }
    };
    const req = create_base({
      accessToken: accessToken || this.#_accessToken,
      username: user || this.#_user
    })
    return req(config);

  }

  //create branch
  create_repo = (config) => {
     
    const req_method = this.post_req;
    return new Promise(async function (resolve, reject) {
      try {
        const result = await req_method(config.repo_name,config.accessToken,config.user);
        resolve(result);
      } catch (e) {
        reject(e);
      }
     
    })
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
          req_access_token,

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

  // Generic get
  get = (type) => {
    return this.request_proxy(Configs[type]);
  };

  // Branch
  get_all_branches = () => {
    return this.request_proxy(Configs.all_branches);
  };

  // Collaborators
  get_all_collaborators = () => {
    return this.request_proxy(Configs.all_collaborators);
  };

  // Invitations
  get_all_invitations = () => {
    return this.request_proxy(Configs.all_invitations);
  };

  // Commits
  get_all_commits = () => {
    return this.request_proxy(Configs.all_commits);
  };

  get_last_year_commits = () => {
    return this.request_proxy(Configs.last_year_commits);
  };

  // Issues
  get_all_issues = () => {
    return this.request_proxy(Configs.all_issues);
  };

  // Assignees
  get_all_assignees = () => {
    return this.request_proxy(Configs.all_assignees);
  };

  // Labels
  get_all_labels = () => {
    return this.request_proxy(Configs.all_labels);
  };

  // Activities
  get_weekly_commit = () => {
    return this.request_proxy(Configs.weekly_commits);
  };

  get_weekly_commit_count = () => {
    return this.request_proxy(Configs.weekly_commits_count);
  };

  get_hourly_commits = () => {
    return this.request_proxy(Configs.hourly_commits);
  };

  // Pulls
  get_all_pulls_open = () => {
    return this.request_proxy(Configs.all_pulls_open);
  };

  get_all_pulls_closed = () => {
    return this.request_proxy(Configs.all_pulls_closed);
  };

  // Star Gazers
  get_all_star_gazers = () => {
    return this.request_proxy(Configs.star_gazers);
  };

  // Collaborators
  get_all_collaborators = () => {
    return this.request_proxy(Configs.all_collaborators);
  };

  // Milestones
  get_all_milestones = () => {
    return this.request_proxy(Configs.all_milestones);
  };

  // Forks
  get_all_forks = () => {
    return this.request_proxy(Configs.all_forks);
  };
};

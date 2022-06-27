import axios from "axios";

function create_base(config){
  const api_base = axios.create({

   headers: { 
    'Authorization': `Token ${config.accessToken}`,
    'auth':{
    'username':config.username,
    'password':config.accessToken,
    } ,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});
return api_base;
}

const request_handler = (url,method,accessToken,user,data) =>{
   const req = create_base({
      accessToken: accessToken,
      username: user
    })
   const config = data ?{
      method: method,
      url: url,
      data:data,
    }: {
      method: method,
      url: url,
    };  
  return req(config);
}

const api_url = {
  base:'https://api.github.com',
  create_repo: `/user/repos`,
  fork_repo: `/repos/`
}

export {create_base,api_url,request_handler};
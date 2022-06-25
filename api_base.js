import axios from "axios";

function create_base(config){
  const api_base = axios.create({

   headers: { 
    'Authorization': `Token ${
        config.accessToken 
      }`,
    'auth':{
      'username':config.username,
    'password':config.accessToken,
    } ,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});
return api_base;
}

export default create_base;
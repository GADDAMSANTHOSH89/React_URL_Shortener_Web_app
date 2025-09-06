// scripts/auth.js
const axios = require('axios');
async function auth() {
  const body = {
    "email": "jhonsanthosh.gaddam878@gmail.com",
    "name": "santhosh gaddam",
    "rollNo": "22701a3240",
    "accessCode": "yzZvgG",
    "clientID": "2f9a9003-2d87-4b8b-9ef2-4bc56b65236e",
    "clientSecret": "qqZjuKUvnVvsAvnD"
};
  try {
    const r = await axios.post("http://20.244.56.144/evaluation-service/auth", body);
    console.log("token:", r.data.access_token);
  } catch(e) {
    console.error(e.response?.data || e.message);
  }
}
auth();

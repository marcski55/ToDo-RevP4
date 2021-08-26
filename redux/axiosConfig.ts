import axios from 'axios';

export default axios.create({
  baseURL: 'https://e75kclfbme.execute-api.us-east-1.amazonaws.com/dev/todos'
});

import axios from 'axios';
function HttpClient() {
  return {
    get: axios.get,
    post: axios.post,
    patch: axios.patch,
    put: axios.put,
    delete: axios.delete
  };
}
export default HttpClient();
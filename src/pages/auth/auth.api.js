import { postRequest } from '../../utils/http.util';

const path = 'auth';

export const loginApi = (payload) => postRequest(`${path}/login`, payload);

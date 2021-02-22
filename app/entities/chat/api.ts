import { SERVER_URL, END_POINTS } from '../../config';
import { API } from '../../helpers';

export function login(params) {
  return API.fetch({
    method: 'POST',
    url: `${SERVER_URL}${END_POINTS.login}`,
    data: params,
  }).then((response) => response.data);
}

export function register(params) {
  return API.fetch({
    method: 'POST',
    url: `${SERVER_URL}${END_POINTS.register}`,
    data: params,
  }).then((response) => response.data);
}

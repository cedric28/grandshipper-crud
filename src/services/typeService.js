import http from "./http";

const apiUrl = '/types';

export function getTypes() {
  return http.get(apiUrl);
}

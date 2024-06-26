import http from "./http";

const apiUrl = "/blogs";

function blogUrl(id) {
  return `${apiUrl}/${id}`;
}

export function getBlogs() {
  return http.get(apiUrl);
}

export function getBlog(id) {
  return http.get(blogUrl(id));
}

export function saveBlog(blog) {
  if (blog._id) {
    const body = { ...blog };
    delete body._id;
    return http.put(blogUrl(blog._id), body);
  }
  return http.post(apiUrl, blog);
}

export function deleteBlog(id) {
  return http.delete(blogUrl(id));
}

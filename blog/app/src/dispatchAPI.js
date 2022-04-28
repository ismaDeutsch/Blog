import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
});

const fetchAPI = async (
  url,
  method = "GET",
  body = null,
  responseType = "json"
) => {
  try {
    const result = await axiosInstance({
      url,
      method,
      responseType,
      data: body,
    });
    return result;
  } catch (e) {
    return e;
  }
};

export default (type, options) => {
  switch (type) {
    case "GET":
      return fetchAPI(
        options.url,
        "GET",
        null,
        options.responseType,
        options.cancelToken
      );
    case "DELETE":
      return fetchAPI(options.url, "DELETE");
    case "POST":
    case "PUT":
      return fetchAPI(options.url, type, options.body);
    default:
      throw new Error("Unknown dispatchAPI type!");
  }
};

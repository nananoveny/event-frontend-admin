import axios from "axios";
const BASE_URL = "https://events-api-nhatan.herokuapp.com/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ0MGIyNGZmN2VlYWE2MjQ4YmM2MGUiLCJmaXJzdE5hbWUiOiJBbiIsImxhc3ROYW1lIjoiTmjhuq10IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDg3NDA5Nzl9.NkDMzAYeHBZ1eIbGn5zzJOUFGbiyLvRUQ7OJ_aSidDs";
const config = {
  headers: { Authorization: `Nguyen ${TOKEN}` },
};
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const adminRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
  // config,
});

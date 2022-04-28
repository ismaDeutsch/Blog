import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    alias: "/articles",
    name: "articles",
    component: () => import("./components/ArticleList"),
  },
  {
    path: "/articles/:id",
    name: "article-details",
    component: () => import("./components/Article"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddArticle"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

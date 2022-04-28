import {
  deleteArticle,
  getArticle,
  getArticles,
  postArticle,
  updateArticle,
} from "../controllers/article.js";

export default (router) => {
  router.route("/").post(postArticle);
  router.route("/").get(getArticles);
  router.route("/:id").get(getArticle);
  router.route("/:id").put(updateArticle);
  router.route("/:id").delete(deleteArticle);
};

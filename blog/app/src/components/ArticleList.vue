<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Recharcher un titre"
          v-model="search"
        />
      </div>
    </div>
    <div class="col-md-6">
      <h4>Liste d'articles</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(article, index) in filteredList"
          :key="index"
          @click="setActiveArticle(article, index)"
        >
          {{ article.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentArticle">
        <h4>Articles</h4>
        <div>
          <label><strong>Titre:</strong></label> {{ currentArticle.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentArticle.description }}
        </div>
        <div>
          <label><strong>Statut:</strong></label>
          {{ currentArticle.published ? "Publier" : "En Attente" }}
        </div>
        <router-link
          :to="'/articles/' + currentArticle.id"
          class="badge badge-warning"
          >Modifier</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Veuillez choisir un article...</p>
      </div>
    </div>
  </div>
</template>

<script>
import dispatchAPI from "../dispatchAPI";

export default {
  name: "ArticleList",
  data() {
    return {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      search: "",
    };
  },
  methods: {
    async retrieveArticles() {
      try {
        const { data } = await dispatchAPI("GET", { url: "/articles" });
        if (data) this.articles = data;
      } catch (error) {
        console.log(error);
      }
    },
    async refreshList() {
      await this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;
    },
    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = article ? index : -1;
    },
  },
  computed: {
    filteredList() {
      return this.articles.filter((article) => {
        return article.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.retrieveArticles();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 800px;
  margin: auto;
}
</style>

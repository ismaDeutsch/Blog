<template>
  <div v-if="currentArticle" class="edit-form">
    <h4>Article</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentArticle.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentArticle.description"
        />
      </div>
      <div class="form-group">
        <label><strong>Statut:</strong></label>
        {{ currentArticle.published ? "Publier" : "Non publier" }}
      </div>
    </form>
    <button
      class="badge badge-primary mr-2"
      v-if="currentArticle.published"
      @click="updateArticle(false)"
    >
      Dépublier
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updateArticle(true)"
    >
      Publier
    </button>
    <button class="badge badge-danger mr-2" @click="deleteArticle">
      Supprimer
    </button>
    <button type="submit" class="badge badge-success" @click="updateArticle()">
      Mettre à jour
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Veuuillez choisir un article...</p>
  </div>
</template>
<script>
import dispatchAPI from "../dispatchAPI";

export default {
  name: "Article",
  data() {
    return {
      currentArticle: null,
      message: "",
    };
  },
  methods: {
    async getArticle(id) {
      try {
        const { data } = await dispatchAPI("GET", { url: `/articles/${id}` });
        this.currentArticle = data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateArticle(status = null) {
      const article = {
        id: this.currentArticle.id,
        title: this.currentArticle.title,
        description: this.currentArticle.description,
        published: status !== null ? status : this.currentArticle.status,
      };

      try {
        const { data } = await dispatchAPI("PUT", {
          url: `/articles/${this.currentArticle.id}`,
          body: { ...article },
        });
        if (data.message) {
          status !== null && (this.currentArticle.published = status);
          status !== null
            ? (this.message = "Le status a bien était mis à jour!")
            : (this.message = "L'article mis à jour!");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteArticle() {
      try {
        const res = await dispatchAPI("DELETE", {
          url: `/articles/${this.currentArticle.id}`,
        });
        if (res.status === 204) this.$router.push({ name: "articles" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.message = "";
    this.getArticle(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Titre</label>
        <input
          class="form-control"
          required
          v-model="article.title"
          name="title"
        />
      </div>
      <div class="form-group" style="resize: none">
        <label for="description">Description</label>
        <textarea
          class="form-control area"
          required
          v-model="article.description"
          name="description"
          rows="4"
        />
      </div>
      <button @click="addArticle" class="btn btn-success">Ajouter</button>
    </div>
    <div v-else>
      <h4>Article bien ajouter!</h4>
      <button class="btn btn-success" @click="newArticle">
        Ajouter un autre article
      </button>
    </div>
  </div>
</template>

<script>
import dispatchAPI from "../dispatchAPI";

export default {
  name: "AddArticle",
  data() {
    return {
      article: {
        title: "",
        description: "",
        published: true,
      },
      submitted: false,
    };
  },
  methods: {
    async addArticle() {
      const article = {
        title: this.article.title,
        description: this.article.description,
      };
      try {
        const data = await dispatchAPI("POST", {
          url: "/articles",
          body: article,
        });
        console.log(data);
        this.submitted = true;
      } catch (error) {
        console.log(error);
      }
    },
    newArticle() {
      this.submitted = false;
      this.article = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.area {
resize: none
}
 </style>

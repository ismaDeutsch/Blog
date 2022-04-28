<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">APP</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/articles" class="nav-link">Articles</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Ajouter un article</router-link>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

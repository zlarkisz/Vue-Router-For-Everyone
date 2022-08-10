<template>
  <div class="login">
    <h1>Login</h1>
    <form class="form" @submit.prevent="login">
      <label for="username">Username</label>
      <input v-model="username" type="text" name="username" class="input" />
      <label for="password">Password</label>
      <input v-model="password" type="password" class="input" />
      <button type="submit" class="btn">Login</button>
    </form>
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "LoginView",

  data() {
    return {
      username: null,
      password: null,
    };
  },

  methods: {
    login() {
      store.user = this.username;
      const redirectPath = this.$route.query.redirect || "/";
      this.$router.push(redirectPath);
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
</style>

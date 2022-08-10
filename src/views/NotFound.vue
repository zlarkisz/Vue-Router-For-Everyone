<template>
  <section>
    <h1>Not Found</h1>
    <p>
      Oops we couldn't find that page. Try going
      <router-link :to="{ name: 'home' }">home</router-link>
    </p>
  </section>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped></style>

<template>
  <span class="bo-back">
    <button @click="goBack">go back</button>
  </span>
</template>

<script>
export default {
  name: "GoBack",

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.go-back {
  display: flex;
  cursor: pointer;
}
button {
  border: 0;
}
</style>

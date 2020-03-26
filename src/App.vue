<template>
  <v-app>
    <AppBar />
    <router-view></router-view>
  </v-app>
</template>

<script>
// import AllDrinks from "./components/AllDrinks";
import AppBar from "./components/AppBar.vue";
export default {
  name: "App",

  components: { AppBar },

  data: () => ({
    //
  })
};
</script>

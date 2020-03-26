<template>
  <v-container>
    <v-row>
      <h2>Add a new drink recipe</h2>
    </v-row>
    <v-row></v-row>
    <v-row align="center">
      <v-form ref="form" id="addForm">
        <v-text-field
          v-model="title"
          label="Title"
          required
          @keyup="checkTitle"
        ></v-text-field>
        <div v-if="titleReply">
          <p style="color:red">{{ titleReply }}</p>
        </div>
        <div v-for="(ingredient, i) in ingredients" :key="i">
          <v-text-field v-model="ingredients[i]"></v-text-field>
        </div>
        <v-text-field
          v-model="oneMoreIng"
          label="Ingredient"
          required
          @keydown.tab.prevent="AddRow"
        ></v-text-field>
        <div v-if="ingredientReply">
          <p style="color:red">{{ ingredientReply }}</p>
        </div>

        <v-btn color="cyan darken-4 white--text" class="mr-4" @click="AddDrink"
          >Add</v-btn
        >
      </v-form>
      {{ this.ingredients }}
    </v-row>
  </v-container>
</template>

<script>
import db from "../firebase";
import slugify from "slugify";
export default {
  name: "AddDrink",
  data() {
    return {
      title: "",
      ingredients: [],
      oneMoreIng: "",
      ingredientReply: "",
      titleReply: "",
      slug: ""
    };
  },
  methods: {
    AddDrink() {
      this.slug = slugify(this.title, {
        replacement: "-",
        remove: /[$*+~.()'"!:@]/g,
        lower: true
      });
      db.collection("drinks")
        .add({
          title: this.title,
          slug: this.slug,
          ingredients: this.ingredients
        })
        .then(() => {
          console.log("Document successfully written!");
          this.$router.push("/");
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    },
    checkTitle() {
      !this.title
        ? (this.titleReply = "You must name the recipe")
        : (this.titleReply = "");
    },
    AddRow() {
      if (this.oneMoreIng) {
        this.ingredients.push(this.oneMoreIng);
      } else {
        this.ingredientReply = "You must enter an ingredient.";
      }
    }
  }
};
</script>
<style scoped>
h2,
#addForm {
  margin: 0 auto;
}
* {
  color: #006064;
}
</style>

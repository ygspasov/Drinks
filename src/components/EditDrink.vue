<template>
  <v-container v-if="drink" id="editIngredients">
    <v-row>
      <h2>Edit {{drink.title}}</h2>
    </v-row>
    <v-row align="center">
      <v-form ref="form" id="editForm">
        <v-text-field v-model="drink.title" label="Title" required @keyup="checkTitle"></v-text-field>
        <div v-if="titleReply">
          <p style="color:red">{{ titleReply }}</p>
        </div>
        <div class="ingredient" v-for="(ingredient, i) in drink.ingredients" :key="i">
          <v-text-field v-model="drink.ingredients[i]"></v-text-field>

          <span class="material-icons delete" @click="delDrink(ingredient)">delete_forever</span>
        </div>
        <div class="last-ingredient">
          <v-text-field v-model="oneMoreIng" label="Ingredient" required></v-text-field>
          <span @click="addIngredient" class="material-icons add">add_box</span>
        </div>

        <div v-if="ingredientReply">
          <p style="color:red">{{ ingredientReply }}</p>
        </div>

        <v-btn color="cyan darken-4 white--text" class="mr-4" @click="editDrink">Edit Drink</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import db from "../firebase";
import slugify from "slugify";
export default {
  name: "editIngredient",
  data() {
    return {
      drink: {},
      id: null,
      newIngredient: null,
      ingredientReply: null,
      titleReply: null,
      oneMoreIng: null
    };
  },
  created() {
    db.collection("drinks")
      .where("slug", "==", this.$route.params.slug)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.drink = doc.data();
          this.id = doc.id;
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  },
  methods: {
    checkTitle() {
      !this.drink.title
        ? (this.titleReply = "You must name the recipe")
        : (this.titleReply = "");
    },
    delDrink(ing) {
      this.drink.ingredients = this.drink.ingredients.filter(ingredient => {
        return ing != ingredient;
      });
    },
    addIngredient() {
      if (this.oneMoreIng) {
        this.drink.ingredients.push(this.oneMoreIng);
        this.oneMoreIng = "";
      } else {
        this.ingredientReply = "You must enter an ingredient.";
      }
    },
    editDrink() {
      if (this.drink.title) {
        this.drink.slug = slugify(this.drink.title, {
          replacement: "-",
          remove: /[$*+~.()'"!:@]/g,
          lower: true
        });
        db.collection("drinks")
          .doc(this.id)
          .update({
            title: this.drink.title,
            slug: this.drink.slug,
            ingredients: this.drink.ingredients
          })
          .then(() => {
            console.log("Document successfully written!");
            this.$router.push("/");
          })
          .catch(error => {
            console.error("Error writing document: ", error);
          });
      } else {
        this.checkTitle();
      }
    }
  }
};
</script>

<style scoped>
h2,
#editForm {
  margin: 0 auto;
  width: 100%;
  max-width: 350px;
}
* {
  color: #006064;
}
#editIngredients .ingredient,
#editIngredients .last-ingredient {
  position: relative;
}
#editIngredients .delete,
#editIngredients .add {
  position: absolute;
  top: 15px;
  right: -35px;
  font-size: 200%;
  cursor: pointer;
  color: #006064;
}
</style>
<template>
  <div id="AllDrinks">
    <v-container>
      <v-row>
        <v-card v-for="(drink, i) in drinks" :key="i" class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <span class="material-icons delete" @click="delDrink(drink.id)">delete_forever</span>
              <v-list-item-title class="headline mb-1">
                {{
                drink.title
                }}
              </v-list-item-title>

              <ul>
                <li v-for="(ingredient, i) in drink.ingredients" :key="i">{{ ingredient }}</li>
              </ul>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import db from "../firebase";
export default {
  name: "AllDrinks",
  data() {
    return {
      drinks: []
    };
  },
  methods: {
    delDrink(id) {
      db.collection("drinks")
        .doc(id)
        .delete()
        .then(() => {
          this.drinks = this.drinks.filter(drink => {
            return drink.id != id;
          });
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  },
  created() {
    db.collection("drinks")
      .get()
      .then(data => {
        data.forEach(el => {
          let drink = {};
          drink.title = el.data().title;
          drink.slug = el.data().slug;
          drink.ingredients = el.data().ingredients;
          drink.id = el.id;
          this.drinks.push(drink);
        });
      })
      .catch(function(error) {
        console.log("Error getting cached document:", error);
      });
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
#index .delete {
  position: absolute;
  top: 15px;
  right: 5px;
  font-size: 200%;
  cursor: pointer;
  color: #aaa;
}
</style>

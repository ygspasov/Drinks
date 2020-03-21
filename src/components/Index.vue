<template>
  <div id="index">
    <router-view></router-view>
    <v-container>
      <v-row>
        <v-card v-for="(drink,i) in drinks" :key="i" class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <span class="material-icons delete" @click="delDrink(i)">delete_forever</span>
              <v-list-item-title class="headline mb-1">{{drink.title}}</v-list-item-title>

              <ul>
                <li v-for="(ingredient,i) in drink.ingredients" :key="i">{{ingredient}}</li>
              </ul>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      drinks: [
        {
          title: "Mojito",
          slug: "mojito",
          ingredients: [
            "juice of 1 lime",
            "1 tsp granulated sugar",
            "small handful mint leaves",
            "60ml white rum",
            "soda water"
          ],
          id: 1
        },
        {
          title: "Rhubarb gin",
          slug: "rhubarb-gin",
          ingredients: [
            "1kg pink rhubarb stalks",
            "400g caster sugar",
            "800ml gin"
          ],
          id: 2
        }
      ]
    };
  },
  methods: {
    delDrink: function(i) {
      console.log(i);
      this.drinks.splice(i, 1);
    }
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
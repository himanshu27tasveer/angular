import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../../shared/ingredient.model";
import { shoppingListService } from "../../shopping-list/services/shoppingList.service";
import { Recipe } from "../recipe.model";


@Injectable()
export class recipeService {
  
  recipeChanges = new Subject<Recipe[]>();

  // recipes = [
  //     {
  //       name: 'Pastaa',
  //       description: 'Italian Dish',
  //       imagePath: 'https://i0.wp.com/lmld.org/wp-content/uploads/2013/02/fussili.jpg?resize=640%2C428&ssl=1',
  //       ingredients: [{name: 'Pasta in kg', amount: 1}, {name: 'Capscicum in kg', amount: 5}, {name: 'Mozarella Cheese in pkts.', amount: 2}]
  //     },
  //     {
  //       name: 'Idli',
  //       description: 'South Indain Dish can be serve with coconut chutney',
  //       imagePath: 'https://thumbs.dreamstime.com/b/south-indian-breakfast-idli-chutney-48378225.jpg',
  //       ingredients: [{name: 'Rice in kg', amount: 2}, {name: 'Dal in kg', amount: 4}, {name: 'Chilli pepper in gm', amount: 200}, {name: 'Vigna mongo', amount: 2}]
  //     },
  //     {
  //       name: 'Chesse Burger',
  //       description: 'A cheeseburger is a hamburger topped with cheese. ',
  //       imagePath: 'https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg',
  //       ingredients: [{name: 'Buns in pkt', amount: 4}, {name: 'Capscicum in kg', amount: 1}, {name: 'Mozarella Cheese in pkts.', amount: 2}, {name: 'Sauce', amount: 1}, {name: 'Butter in pkt', amount: 2}]
  //     }
  //   ];

    private recipes: Recipe[] = [];

    constructor( private ShoppingListService: shoppingListService ){}

    setRecipes(rec: Recipe[]){
      this.recipes = rec;
      this.recipeChanges.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient []){
      this.ShoppingListService.addIngredientsToList(ingredients);
    }

    getRecipeFromId(id: number){
      return this.recipes.slice()[id];
    }

    getSize(){
      return this.recipes.length;
    }

    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipeChanges.next(this.recipes.slice());
    }
    updateRecipe(id: number, recipe: Recipe){
      this.recipes[id] = recipe;
      this.recipeChanges.next(this.recipes.slice());
    }
    deleteRecipeById(id: number){
      this.recipes.splice(id, 1);
      this.recipeChanges.next(this.recipes.slice());
    }
}
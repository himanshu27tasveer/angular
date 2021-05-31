import { Subject } from "rxjs";
import { Ingredient } from "../../shared/ingredient.model";


export class shoppingListService {

    nortifyIngredientsChange = new Subject<Ingredient []>();
    startedEditing = new Subject<number>();

    ingredients = [
        {
          name: "Tomatoes",
          amount: 5
        },
        {
          name: "Potatoes",
          amount: 18
        },
        {
          name: "Cucumber",
          amount: 4
        },
        {
          name: "Pumpkins",
          amount: 3
        }
      ];

    getIngredientsList(){
        return this.ingredients.slice();
    }

    getIngredientById(id: number){
      return this.ingredients[id];
    }

    addIngredient(newIngredient: Ingredient){
        this.ingredients.push(newIngredient);
        this.nortifyIngredientsChange.next(this.ingredients.slice());
    }

    addIngredientsToList(ingredients: Ingredient []){
      this.ingredients.push(...ingredients);
      this.nortifyIngredientsChange.next(this.ingredients.slice());
    }

    updateIngredient(id: number, ingred: Ingredient){
      this.ingredients[id] = ingred;
      this.nortifyIngredientsChange.next(this.ingredients.slice());
    }

    deleteIngredientById(id: number){
      this.ingredients.splice(id, 1);
      this.nortifyIngredientsChange.next(this.ingredients.slice());
    }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { recipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;
  constructor( private RecipeService: recipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = parseInt(params['id']);
        if (this.RecipeService.getSize() >= this.id){
          this.recipe = this.RecipeService.getRecipeFromId(this.id);
        }
        else {
           this.router.navigate(['/recipes']);
        }
      }
    );
  }

  addToShoppingList(){
    this.RecipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onDeleteRecipe(){
    this.RecipeService.deleteRecipeById(this.id);
    this.router.navigate(['/recipes']);
  }
}

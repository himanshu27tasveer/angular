import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import {recipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipeSub!: Subscription;

  constructor(private recipeService: recipeService) {}

  ngOnInit(){
    this.recipeSub = this.recipeService.recipeChanges.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(){
    this.recipeSub.unsubscribe();
  }
}
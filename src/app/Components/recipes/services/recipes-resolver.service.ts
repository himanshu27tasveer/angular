import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../../shared/data-storage.service";
import { Recipe } from "../recipe.model";
import { recipeService } from "./recipe.service";


@Injectable({providedIn: 'root'})
export class ReciperesolverService implements Resolve<Recipe[]>{
    constructor( private dataStorageService: DataStorageService, private recipeService: recipeService ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        }
        else {
            return recipes;
        }
    }
}
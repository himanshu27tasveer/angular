import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingListService } from './services/shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[]  =[];

  private shopListSub!: Subscription;

  constructor( private ShoppingListService: shoppingListService ) { 
  }

  ngOnInit(): void {
    this.ingredients = this.ShoppingListService.getIngredientsList();
    this.shopListSub = this.ShoppingListService.nortifyIngredientsChange.subscribe(
      (updatedIngredientsList: Ingredient []) => {
        this.ingredients = updatedIngredientsList;
      }
    );
  }

  startEditing(id: number){
    this.ShoppingListService.startedEditing.next(id);
  }

  ngOnDestroy(){
    this.shopListSub.unsubscribe();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { shoppingListService } from '../services/shoppingList.service';
import { Ingredient } from '../../shared/ingredient.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  shoppingEditForm!: FormGroup;
  editedItem!: Ingredient;

  constructor( private ShoppingListService: shoppingListService ) { }

  ngOnInit(): void {
    this.shoppingEditForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required])
    })
    this.subscription = this.ShoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.ShoppingListService.getIngredientById(index);
        this.shoppingEditForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        })
      }
    );
  }

  onModifyOrAdd(){
    const name = this.shoppingEditForm.get('name')!.value;
    const amount = parseInt(this.shoppingEditForm.get('amount')!.value);
  
    if (name && amount){
      if (this.editMode){
        this.ShoppingListService.updateIngredient(this.editedItemIndex, {name: name, amount: amount});
        this.shoppingEditForm.reset();
      }
      else {
        this.ShoppingListService.addIngredient({name: name, amount: amount});
        this.shoppingEditForm.reset();
      }
      this.editMode = false;
    }
  }

  onClear(){
    this.shoppingEditForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.ShoppingListService.deleteIngredientById(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

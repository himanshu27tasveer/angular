import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub!: Subscription;
  isAuthenticated = false;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { 
  }

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true: false;
    });
  }

  onLogout(){
    this.authService.logout();
    this.isAuthenticated = false;
  }

  onFetch(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onSave(){
    this.dataStorageService.saveRecipes();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
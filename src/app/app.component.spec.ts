import { Component } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";


describe('Component: App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent]
        })
    })
});

it('should create the app', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
});

it('should have title', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Recipe Book');
});
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.componenets";
import { CardHoverDirective } from "./Directives/card-hover.directive";
import { DropdownDirectiveDirective } from "./Directives/toggle-open-class.directive";
import { UnlessDirectiveDirective } from "./Directives/unless-directive.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";



@NgModule({
    declarations: [
        CardHoverDirective,
        UnlessDirectiveDirective,
        DropdownDirectiveDirective,
        AlertComponent,
        LoadingSpinnerComponent
    ],
    imports: [CommonModule],
    exports: [
        CardHoverDirective,
        UnlessDirectiveDirective,
        DropdownDirectiveDirective,
        AlertComponent,
        CommonModule,
        LoadingSpinnerComponent
    ]
})
export class SharedModule {

}
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-alert-component',
    templateUrl: './alert.template.html',
    styleUrls: ['./alert.style.css']
})
export class AlertComponent {
    @Input() message!: string;
    @Output() close = new EventEmitter<void>();

    onClose(){
        this.close.emit();
    }
}
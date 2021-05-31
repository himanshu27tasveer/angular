import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardHover]'
})
export class CardHoverDirective implements OnInit {
  @Input('appCardHover') defaultHoverColor: string = '#e6e6e6';
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultHoverColor;
  @HostBinding('style.cursor') cursor: string = 'default';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'grey');
  }

  @HostListener('mouseenter') mouseover(event: Event){
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#e6e6e6');
    // this.renderer.setStyle(this.elRef.nativeElement, 'cursor', 'pointer');
    this.backgroundColor = this.defaultHoverColor;
    this.cursor = 'pointer'
  } 
  @HostListener('mouseleave') mouseleave(event: Event){
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    // this.renderer.setStyle(this.elRef.nativeElement, 'cursor', 'default');
    this.backgroundColor = 'transparent';
    this.cursor = 'default'
  }
}

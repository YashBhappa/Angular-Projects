import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[fullscreen]'
})
export class ElevationDirective {
  @Input('fullscreen') clicked;
  constructor(private element: ElementRef, private renderer: Renderer2) { }

  addFullScreen() {
    this.renderer.addClass(this.element.nativeElement, 'fullscreen');
  }

  removeFullScreen() {
    this.renderer.removeClass(this.element.nativeElement, 'fullscreen');
  }

  @HostListener('click')
  onClick() {
    if (this.clicked === true) {
      this.addFullScreen();
    }
    else {
      this.removeFullScreen();
    }
  }
}

import { Directive, HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Directive({
  selector: '[stopPropagation]'
})
export class StopPropagationDirectiveService {
  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
  }
}

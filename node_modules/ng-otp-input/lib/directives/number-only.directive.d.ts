import { ElementRef, Renderer2 } from '@angular/core';
export declare class NumberOnlyDirective {
    private _elRef;
    private _renderer;
    disabledNumberOnly: boolean;
    constructor(_elRef: ElementRef, _renderer: Renderer2);
    ngOnInit(): void;
}

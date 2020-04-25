import {Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Directive({
  selector: '[appInputDebounce]'
})
export class InputDebounceDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 500;
  @Output() debounceInput = new EventEmitter();
  private clicks = new Subject();
  private subscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.subscription = this.clicks
      .pipe(debounceTime(this.debounceTime))
      .subscribe(e => this.debounceInput.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('keyup', ['$event'])
  keyEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

}

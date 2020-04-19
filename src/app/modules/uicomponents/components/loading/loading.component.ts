import {Component, OnInit} from '@angular/core';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading',
  template: '<fa-icon [icon]="faCircleNotch" size="2x" spin="true" class="text-primary"></fa-icon>',
})
export class LoadingComponent implements OnInit {
  faCircleNotch = faCircleNotch;

  constructor() {
  }

  ngOnInit(): void {
  }

}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss']
})
export class ProfileIconComponent {
  @Input() name: string;
  @Input() image: string;
}

import {Component, Input, OnInit} from '@angular/core';
import {ContactInterface} from '../../../../../interfaces/contact.interface';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-tile',
  templateUrl: './contact-tile.component.html',
  styleUrls: ['./contact-tile.component.scss']
})
export class ContactTileComponent implements OnInit {
  @Input() customer: ContactInterface;
  faEllipsisV = faEllipsisV;

  constructor() {
  }

  ngOnInit(): void {
  }

}

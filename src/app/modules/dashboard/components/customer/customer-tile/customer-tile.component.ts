import {Component, Input, OnInit} from '@angular/core';
import {CustomerInterface} from '../../../../../interfaces/customer.interface';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-tile',
  templateUrl: './customer-tile.component.html',
  styleUrls: ['./customer-tile.component.scss']
})
export class CustomerTileComponent implements OnInit {
  @Input() customer: CustomerInterface;
  faEllipsisV = faEllipsisV;

  constructor() {
  }

  ngOnInit(): void {
  }

}

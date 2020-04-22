import {Component, Input, OnInit} from '@angular/core';
import {CustomerInterface} from '../../../../../interfaces/customer.interface';

@Component({
  selector: 'app-customer-tile',
  templateUrl: './customer-tile.component.html',
  styleUrls: ['./customer-tile.component.scss']
})
export class CustomerTileComponent implements OnInit {
  @Input() customer: CustomerInterface;

  constructor() {
  }

  ngOnInit(): void {
  }

}

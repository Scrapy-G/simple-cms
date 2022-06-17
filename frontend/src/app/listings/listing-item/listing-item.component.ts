import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
})
export class ListingItemComponent {
  @Input() id: number | null = null;
  @Input() title = '';
  @Input() date: Date | null = null;
  @Output() onDelete = new EventEmitter();
  @Output() onEdit = new EventEmitter();

  constructor() {}
}

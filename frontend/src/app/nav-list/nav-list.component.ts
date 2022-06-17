import { Component, OnInit } from '@angular/core';

type NavItem = {
  title: string;
  path: string;
};

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css'],
})
export class NavListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  navItems: NavItem[] = [
    {
      title: 'Home',
      path: 'home',
    },
    {
      title: 'About',
      path: 'about',
    },
    {
      title: 'Listings',
      path: 'listings',
    },
  ];

  selectedItem: NavItem = this.navItems[0];

  handleClick(navItem: NavItem) {
    this.selectedItem = navItem;
  }
}

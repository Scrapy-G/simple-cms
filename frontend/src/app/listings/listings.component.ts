import { Component, OnInit } from '@angular/core';
import { ListingsService } from './listings.service';
import Listing from 'src/types/types';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
})
export class ListingsComponent implements OnInit {
  listings: Listing[] = [];
  showListingForm = false;
  listingForEdit: Listing | null = null;
  errors: string[] = [];

  constructor(private listingsStore: ListingsService) {}

  ngOnInit(): void {
    this.listingsStore.getListings().subscribe((result) => {
      this.listings = result as Listing[];
      console.log(result);
    });
  }

  deleteListing(id: number) {
    this.listingsStore.removeListing(id).subscribe({
      next: (result) => {
        this.listings = this.listings.filter((listing) => listing.id !== id);
      },
      error: (e) => alert(JSON.stringify(e.message)),
    });
  }

  onEditListing(listing: Listing) {
    this.listingForEdit = listing;
    this.showListingForm = true;
  }

  onNewListing() {
    this.listingForEdit = null;
    this.showListingForm = true;
  }

  onFormClose() {
    this.listingForEdit = null;
    this.showListingForm = false;
  }

  handleAddListing(formData: FormData) {
    this.listingsStore.addListing(formData).subscribe({
      next: (result) => {
        this.listings = [...this.listings, result as Listing];
        this.showListingForm = false;
        this.errors = [];
      },
      error: (e) => this.handleError(e.errors),
    });
  }

  handleUpdateListing(id: number, formData: FormData) {
    this.listingsStore.updateListing(id, formData).subscribe({
      next: (result) => {
        const newListings = [...this.listings];
        const updateIndex = newListings.findIndex(
          (listing) => listing.id === id
        );
        newListings[updateIndex] = result as Listing;
        this.listings = newListings;

        this.listingForEdit = null;
        this.showListingForm = false;
        this.errors = [];
      },
      error: (e) => this.handleError({ message: ['Fields cannot be empty'] }),
    });
  }

  handleError(errors: any) {
    const errorList: string[] = [];
    for (let e in errors) {
      const error = errors[e];
      errorList.push(error[0]);
    }

    // console.log(errorList);
    this.errors = errorList;
  }
}

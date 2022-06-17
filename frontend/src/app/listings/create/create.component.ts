import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { baseUrl } from 'src/api/client';
import Listing from 'src/types/types';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Output() onSubmit = new EventEmitter<FormData>();
  @Input() listing: Listing | null = null;
  @Input() errors: any;

  imageUrl: string | ArrayBuffer | null = this.listing
    ? this.listing.image
    : null;
  image: Blob | undefined;

  addListingForm = this.formBuilder.group(
    this.listing
      ? this.listing
      : {
          title: '',
          address: '',
          description: '',
          price: 0,
        }
  );

  handleFileChange(event: any) {
    const files = event.target.files;
    if (files.length === 0) return;

    this.image = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    };
  }

  handleSubmit() {
    const formData = new FormData();
    const values: any = this.addListingForm.value;

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    if (this.image) formData.append('image', this.image);

    this.onSubmit.emit(formData);
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // console.log(this.addListingForm.value);
    if (this.listing) {
      this.imageUrl = baseUrl + this.listing.image;
      this.addListingForm.patchValue(this.listing);
    }
  }
}

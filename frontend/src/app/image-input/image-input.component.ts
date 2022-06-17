import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
})
export class ImageInputComponent implements OnInit {
  @Output() onChange = new EventEmitter();

  async onFileChange(event: any) {
    const files = event.target.files;
    if (files.length === 0) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      const image = {
        file: files[0],
        url: reader.result,
      };

      this.onChange.emit(image);
    };
  }

  constructor() {}

  ngOnInit(): void {}
}

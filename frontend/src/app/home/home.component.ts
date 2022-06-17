import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { baseUrl } from 'src/api/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  image: Blob | undefined;
  imageUrl: string | undefined;
  content: string = '';
  alerts: any[] = [];

  handleSubmit() {
    const data: any = {
      title: 'home',
      content: this.content,
    };

    if (this.image) data['image'] = this.image;
    this.pagesStore.savePage(data).subscribe({
      next: () => {
        this.alerts.push({ message: 'Page updated successfully' });
      },
      error: (error) => this.handleError(error),
    });
  }

  handleFileChange(image: any) {
    this.image = image.file;
    this.imageUrl = image.url;
  }

  handleError(error: any) {
    this.alerts.push({ error: true, message: error.message });
  }

  constructor(private pagesStore: PagesService) {}

  ngOnInit(): void {
    this.pagesStore.getPage('home').subscribe((result: any) => {
      console.log(result.image);
      this.content = result.content;
      this.imageUrl = baseUrl + result.image;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { Page } from 'src/types/types';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  content: string = '';
  alerts: any[] = [];
  errorMessage: string = '';

  handleSubmit() {
    const data: any = {
      title: 'about',
      content: this.content,
    };

    this.pagesStore.savePage(data).subscribe({
      next: () => {
        this.alerts.push({ message: 'Page updated successfully' });
      },
      error: (error) => this.handleError(error),
    });
  }

  handleError(error: any) {
    this.alerts.push({ error: true, message: error.message });
  }

  constructor(private pagesStore: PagesService) {}

  ngOnInit(): void {
    this.pagesStore.getPage('about').subscribe({
      next: (result: Page): void => {
        console.log(result);
        this.content = result.content;
      },
      error: this.handleError,
    });
  }
}

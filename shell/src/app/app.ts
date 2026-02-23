import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  isOpen = false;
  datasetExists = false;
  loading = true;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkDataset();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.checkDataset();
    });
  }

  checkDataset() {
    this.http.get<any>('http://localhost:8000/dataset-info').subscribe({
      next: (res) => {
        console.log('Dataset response:', res);
        this.datasetExists = res.exists;
        console.log('datasetExists =', this.datasetExists);
        this.loading = false;
      },
      error: (err) => {
        this.datasetExists = false;
        this.loading = false;
      },
    });
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  handleNav(event: Event) {
    if (!this.datasetExists) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.closeSidebar();
  }

  closeSidebar() {
    this.isOpen = false;
  }
}

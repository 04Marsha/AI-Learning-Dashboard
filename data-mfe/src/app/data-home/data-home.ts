import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-data-home',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './data-home.html',
  styleUrls: ['data-home.css'],
})
export class DataHomeComponent {
  selectedFile: File | null = null;
  response: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8000/upload-dataset', formData).subscribe({
      next: (res) => {
        this.http.get('http://localhost:8000/dataset-info').subscribe((info) => {
          this.response = info;
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  goToVisualization() {
    this.router.navigate(['/visualization']);
  }
}

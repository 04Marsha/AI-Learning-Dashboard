import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-training-home',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './training-home.html',
  styleUrls: ['./training-home.css'],
})
export class TrainingHomeComponent implements OnInit {
  datasetInfo: any = null;
  selectedAlgorithm = 'linear_regression';
  metrics: any = null;
  training = false;
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8000/dataset-info').subscribe({
      next: (res: any) => {
        this.datasetInfo = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  selectAlgorithm(algo: string) {
    this.selectedAlgorithm = algo;
  }

  getPerformanceColor(score: number) {
    if (score < 0.5) return 'low';
    if (score < 0.75) return 'medium';
    return 'high';
  }

  train() {
    if (!this.selectAlgorithm) return;

    this.http
      .post('http://localhost:8000/train', {
        algorithm: this.selectedAlgorithm,
      })
      .subscribe({
        next: (res) => {
          this.metrics = res;
          this.training = false;
        },
        error: (err) => {
          console.error(err);
          this.training = false;
        },
      });
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prediction-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './prediction-home.html',
  styleUrls: ['./prediction-home.css'],
})
export class PredictionHomeComponent implements OnInit {
  loading = true;
  datasetExists = false;
  modelTrained = false;

  features: string[] = [];
  inputs: Record<string, number> = {};
  prediction: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.checkStatus();
  }

  checkStatus() {
    this.http.get<any>('http://localhost:8000/dataset-info').subscribe((info) => {
      if (!info.exists) {
        this.loading = false;
        return;
      }

      this.datasetExists = true;

      this.http.get<any>('http://localhost:8000/model-status').subscribe((status) => {
        this.modelTrained = status.trained;

        if (status.trained) {
          this.features = status.features;

          this.features.forEach((f) => (this.inputs[f] = 0));
        }
        this.loading = false;
      });
    });
  }

  predict() {
    this.http
      .post<any>('http://localhost:8000/predict', {
        inputs: this.inputs,
      })
      .subscribe((res) => {
        this.prediction = res.prediction;
      });
  }
}

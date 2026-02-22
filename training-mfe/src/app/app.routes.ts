import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-training-home',
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <h2>Training Module 🚀</h2>

    <select [(ngModel)]="selectedAlgorithm">
      <option value="linear_regression">Linear Regression</option>
      <option value="logistic_regression">Logistic Regression</option>
      <option value="decision_tree">Decision Tree</option>
    </select>

    <button (click)="train()">Train</button>

    <div *ngIf="result">
      <h3>Result:</h3>
      <pre>{{ result | json }}</pre>
    </div>
  `,
})
export class TrainingHomeComponent {
  selectedAlgorithm = 'linear_regression';
  result: any = null;

  constructor(private http: HttpClient) {}

  train() {
    this.http.post('http://localhost:8000/train', {
      algorithm: this.selectedAlgorithm,
    }).subscribe({
      next: (res) => {
        this.result = res;
      },
      error: (err) => {
        console.error(err);
        this.result = err.error;
      }
    })
  }
}

export const routes: Routes = [
  {
    path: '',
    component: TrainingHomeComponent,
  },
];

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface DatasetInfo {
  exists: boolean;
  rows: number;
  columns: number;
  problem_type: string;
}

interface NumericStats {
  mean: number;
  min: number;
  max: number;
  std: number;
}

interface PreviewResponse {
  exists: boolean;
  preview: Record<string, any>[];
  numeric_summary: Record<string, NumericStats>;
}

@Component({
  selector: 'app-visualization-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './visualization-home.html',
  styleUrls: ['./visualization-home.css'],
})
export class VisualizationHomeComponent implements OnInit {
  datasetInfo: DatasetInfo | null = null;
  previewData: Record<string, any>[] = [];
  numericSummary: Record<string, NumericStats> = {};
  loading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http.get<DatasetInfo>('http://localhost:8000/dataset-info').subscribe((info) => {
      if (!info.exists) {
        this.datasetInfo = info;
        this.loading = false;
        return;
      }

      this.datasetInfo = info;
      this.http
        .get<PreviewResponse>('http://localhost:8000/dataset-preview')
        .subscribe((preview) => {
          ((this.previewData = preview.preview), (this.numericSummary = preview.numeric_summary));
          this.loading = false;
        });
    });
  }

  goToTraining() {
    this.router.navigate(['/training']);
  }
}

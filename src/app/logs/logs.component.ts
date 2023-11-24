import { Component, OnInit } from '@angular/core';
import {LogsService} from "../servicios/logs.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: any[] = [];

  constructor(private yourService: LogsService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.yourService.getLogs().subscribe(
      (data: any) => {
        this.logs = data;
      },
      (error: any) => {
        console.error('Error al obtener los logs:', error);
      }
    );
  }

  downloadLogs(): void {
    // Lógica para descargar los logs como archivo aquí
    const content = JSON.stringify(this.logs, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logs.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}

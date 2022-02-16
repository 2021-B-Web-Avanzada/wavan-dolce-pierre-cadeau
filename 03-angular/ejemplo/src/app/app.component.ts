import { Component, OnInit } from '@angular/core';
import { WebsocketsService } from './servicios/websockets/websockets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ejemplo';

  ngOnInit(): void {
    this.websocketService.escucharEventoHola().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    }
    );
  }

  constructor(private readonly websocketService: WebsocketsService) {

  }

  eventoHola() {
    this.websocketService.ejecutarEventoHola();
  }
}

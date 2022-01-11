import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.scss']
})
export class LogrosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  img_badge = 'https://s3.amazonaws.com/coursera_assets/growth_account_profile/honors_assignment.svg'

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ws-spinner',
  templateUrl: './ws-spinner.component.html',
  styleUrls: ['./ws-spinner.component.css'],
})
export class WsSpinnerComponent implements OnInit {

  @Input() textAlign = 'center';

  constructor() { }

  ngOnInit(): void {
  }

}

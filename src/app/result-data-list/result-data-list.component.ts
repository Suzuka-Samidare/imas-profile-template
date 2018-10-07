import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-data-list',
  templateUrl: './result-data-list.component.html',
  styleUrls: ['./result-data-list.component.css']
})
export class ResultDataListComponent implements OnInit {
  @Input() arrivalDate: string;
  @Input() birthDay: number;
  @Input() birthMonth: number;
  @Input() type: string;
  @Input() voiceActor: string;
  @Input() familyName: string;
  @Input() familyNameRuby: string;
  @Input() firstName: string;
  @Input() firstNameRuby: string;
  @Input() gender: string;
  @Input() id: number;
  @Input() foreignerName: boolean;
  @Input() isIdol: boolean;
  @Input() originMedia: string;
  @Input() className: string;

  constructor() { }

  ngOnInit() {
  }

}

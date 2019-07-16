import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-data-list',
  templateUrl: './result-data-list.component.html',
  styleUrls: ['./result-data-list.component.css']
})
export class ResultDataListComponent implements OnInit {
  // idol profile
  @Input() birthMonth: string;
  @Input() birthDay: string;
  @Input() birthPlace: string;
  @Input() familyName: string;
  @Input() givenName: string;
  @Input() familyNameKana: string;
  @Input() givenNameKana: string;
  @Input() age: string;
  @Input() gender: string;
  @Input() height: string;
  @Input() weight: string;
  @Input() bloodType: string;
  @Input() bust: string;
  @Input() waist: string;
  @Input() hip: string;
  @Input() talent: string;
  @Input() division: string;
  @Input() constellation: string;
  @Input() title: string;
  @Input() cv: string;
  @Input() favorite: string;
  @Input() hobby: string;

  // idol illustration
  @Input() illustrationUrl: string;

  constructor() { }

  ngOnInit() {
  }

}

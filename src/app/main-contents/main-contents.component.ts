import { Component, OnInit } from '@angular/core';
import { IdolService } from '../idol.service';

@Component({
  selector: 'app-main-contents',
  templateUrl: './main-contents.component.html',
  styleUrls: ['./main-contents.component.css']
})
export class MainContentsComponent implements OnInit {
  public searchWord: string;
  public resultList;
  public resultColorList;

  public arrivalDate: string;
  public birthDay: number;
  public birthMonth: number;
  public type: string;
  public voiceActor: string;
  public familyName: string;
  public familyNameRuby: string;
  public firstName: string;
  public firstNameRuby: string;
  public gender: string;
  public id: number;
  public foreignerName: boolean;
  public isIdol: boolean;
  public originMedia: string;
  public className: string;
  public colorCode: string;

  constructor(
    private idolService: IdolService,
  ) { }

  ngOnInit() {
  }

  fetchIdol() {
    this.idolService.fetchAllIdols(this.searchWord)
      .then(res => {
        this.resultList = res.data.character_list[0];
        this.arrivalDate = this.resultList.arrival_date;
        this.birthDay = this.resultList.birth_day;
        this.birthMonth = this.resultList.birth_month;
        switch (this.resultList.character_type) {
          case 1:
            this.type = 'Princess / Cute';
            break;
          case 2:
            this.type = 'Fairy / Cool';
            break;
          case 3:
            this.type = 'Angel / Passion';
            break;
        }
        this.voiceActor = this.resultList.cv;
        this.familyName = this.resultList.family_name;
        this.familyNameRuby = this.resultList.family_name_ruby;
        this.firstName = this.resultList.first_name;
        this.firstNameRuby = this.resultList.first_name_ruby;
        switch (this.resultList.gender) {
          case 1:
            this.gender = '男';
            break;
          case 2:
            this.gender = '女';
            break;
        }
        this.id = this.resultList.id;
        this.foreignerName = this.resultList.is_foreigner_name;
        this.isIdol = this.resultList.is_idol;
        this.originMedia = this.resultList.origin_media;
        this.className = this.resultList.class_name;
        this.fetchIdolColor();
      })
      .catch(err => {
        alert('エラーですよ');
      });
  }

  fetchIdolColor() {
    console.log(this.className);
    this.idolService.fetchAllIdolColor()
      .then(res => {
        this.resultColorList = res.data.color_code_list.filter(element => {
          return element.class_name === this.className;
        });
        this.colorCode = this.resultColorList[0].color_code;
        console.log(this.colorCode);
      })
      .catch(err => {
        alert('カラーコード取れず。。。');
      });
  }


}

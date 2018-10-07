import { Component, OnInit, Input } from '@angular/core';
import { IdolService } from '../idol.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public className: string;
  public resultColorList;
  @Input() colorCode: string;

  constructor(
    private idolService: IdolService,
  ) { }

  ngOnInit() {
  }

  fetchIdolColor() {
    console.log(this.className);
    this.idolService.fetchAllIdolColor()
      .then(res => {
        this.resultColorList = res.data.color_code_list.filter(element => {
          return element.class_name === this.className;
        });
        this.colorCode = this.resultColorList[0].color_code;
      })
      .catch(err => {
        alert('カラーコード取れず。。。');
      });
  }

}

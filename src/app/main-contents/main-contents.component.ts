import { Component, OnInit } from '@angular/core';
import { IdolService } from '../idol.service';

@Component({
  selector: 'app-main-contents',
  templateUrl: './main-contents.component.html',
  styleUrls: ['./main-contents.component.css']
})
export class MainContentsComponent implements OnInit {
  public searchWord: string;

  public birthMonth: string;
  public birthDay: string;
  public birthPlace: string;
  public familyName: string;
  public givenName: string;
  public familyNameKana: string;
  public givenNameKana: string;
  public age: string;
  public gender: string;
  public height: string;
  public weight: string;
  public bloodType: string;
  public bust: string;
  public waist: string;
  public hip: string;
  public colorCode: string;
  public talent: string;
  public division: string;
  public constellation: string;
  public title: string;
  public cv: string;
  public favorite: string;
  public hobby: string;

  public illustrationUrl: string;

  constructor(
    private idolService: IdolService,
  ) { }

  ngOnInit() {
    this.illustrationUrl = '../../assets/angular.png';
  }

  fetchIdol() {
    this.idolService.fetchAllIdols(this.searchWord)
      .then(res => {
        const result = res.results.bindings[0];
        this.birthMonth = result.birthDate.value.slice(2, 4);
        this.birthDay = result.birthDate.value.slice(-2);
        this.birthPlace = result.birthPlace.value;
        this.familyName = result.familyName.value;
        this.givenName = result.givenName.value;
        this.familyNameKana = result.familyNameKana.value;
        this.givenNameKana = result.givenNameKana.value;
        this.age = result.age.value;
        this.gender = result.gender.value;
        this.height = result.height.value;
        this.weight = result.weight.value;
        this.bloodType = result.bloodType.value;
        this.bust = result.bust.value;
        this.waist = result.waist.value;
        this.hip = result.hip.value;
        this.colorCode = `#${result.color.value}`;
        this.talent = result.talent.value;
        this.division = result.division.value;
        this.constellation = result.constellation.value;
        this.title = result.title.value;
        this.cv = result.cv.value;
        this.favorite = result.favorite.value;
        this.hobby = result.hobby.value;

        this.convRomaji(this.givenNameKana + ' ' + this.familyNameKana);
      })
      .catch(err => {
        alert('エラーだゾ');
      });
  }

  convRomaji(nameRuby) {
    const splitName = nameRuby.split('');
    for (let i = 0; i < splitName.length; i++) {
      switch (splitName[i]) {
        case 'あ':
          splitName[i] = 'a';
          break;
        case 'い':
          splitName[i] = 'i';
          break;
        case 'う':
          splitName[i] = 'u';
          break;
        case 'え':
          splitName[i] = 'e';
          break;
        case 'お':
          splitName[i] = 'o';
          break;
        case 'か':
          splitName[i] = 'ka';
          break;
        case 'き':
          splitName[i] = 'ki';
          break;
        case 'く':
          splitName[i] = 'ku';
          break;
        case 'け':
          splitName[i] = 'ke';
          break;
        case 'こ':
          splitName[i] = 'ko';
          break;
        case 'さ':
          splitName[i] = 'sa';
          break;
        case 'し':
          splitName[i] = 'shi';
          break;
        case 'す':
          splitName[i] = 'su';
          break;
        case 'せ':
          splitName[i] = 'se';
          break;
        case 'そ':
          splitName[i] = 'so';
          break;
        case 'た':
          splitName[i] = 'ta';
          break;
        case 'ち':
          splitName[i] = 'chi';
          break;
        case 'つ':
          splitName[i] = 'tsu';
          break;
        case 'て':
          splitName[i] = 'te';
          break;
        case 'と':
          splitName[i] = 'to';
          break;
        case 'な':
          splitName[i] = 'na';
          break;
        case 'に':
          splitName[i] = 'ni';
          break;
        case 'ぬ':
          splitName[i] = 'nu';
          break;
        case 'ね':
          splitName[i] = 'ne';
          break;
        case 'の':
          splitName[i] = 'no';
          break;
        case 'は':
          splitName[i] = 'ha';
          break;
        case 'ひ':
          splitName[i] = 'hi';
          break;
        case 'ふ':
          splitName[i] = 'hu';
          break;
        case 'へ':
          splitName[i] = 'he';
          break;
        case 'ほ':
          splitName[i] = 'ho';
          break;
        case 'ま':
          splitName[i] = 'ma';
          break;
        case 'み':
          splitName[i] = 'mi';
          break;
        case 'む':
          splitName[i] = 'mu';
          break;
        case 'め':
          splitName[i] = 'me';
          break;
        case 'も':
          splitName[i] = 'mo';
          break;
        case 'や':
          splitName[i] = 'ya';
          break;
        case 'ゆ':
          splitName[i] = 'yu';
          break;
        case 'よ':
          splitName[i] = 'yo';
          break;
        case 'ら':
          splitName[i] = 'ra';
          break;
        case 'り':
          splitName[i] = 'ri';
          break;
        case 'る':
          splitName[i] = 'ru';
          break;
        case 'れ':
          splitName[i] = 're';
          break;
        case 'ろ':
          splitName[i] = 'ro';
          break;
        case 'わ':
          splitName[i] = 'wa';
          break;
        case 'を':
          splitName[i] = 'wo';
          break;
        case 'ん':
          splitName[i] = 'n';
          break;
        case 'が':
          splitName[i] = 'ga';
          break;
        case 'ぎ':
          splitName[i] = 'gi';
          break;
        case 'ぐ':
          splitName[i] = 'gu';
          break;
        case 'げ':
          splitName[i] = 'ge';
          break;
        case 'ご':
          splitName[i] = 'go';
          break;
        case 'ざ':
          splitName[i] = 'za';
          break;
        case 'じ':
          splitName[i] = 'zi';
          break;
        case 'ず':
          splitName[i] = 'zu';
          break;
        case 'ぜ':
          splitName[i] = 'ze';
          break;
        case 'ぞ':
          splitName[i] = 'zo';
          break;
        case 'だ':
          splitName[i] = 'da';
          break;
        case 'ぢ':
          splitName[i] = 'di';
          break;
        case 'づ':
          splitName[i] = 'du';
          break;
        case 'で':
          splitName[i] = 'de';
          break;
        case 'ど':
          splitName[i] = 'do';
          break;
        case 'ば':
          splitName[i] = 'ba';
          break;
        case 'び':
          splitName[i] = 'bi';
          break;
        case 'ぶ':
          splitName[i] = 'bu';
          break;
        case 'べ':
          splitName[i] = 'be';
          break;
        case 'ぼ':
          splitName[i] = 'bo';
          break;
        case 'ぱ':
          splitName[i] = 'pa';
          break;
        case 'ぴ':
          splitName[i] = 'pi';
          break;
        case 'ぷ':
          splitName[i] = 'pu';
          break;
        case 'ぺ':
          splitName[i] = 'pe';
          break;
        case 'ぽ':
          splitName[i] = 'po';
          break;
        case 'ゃ':
          splitName[i] = 'xya';
          break;
        case 'ゅ':
          splitName[i] = 'xyu';
          break;
        case 'ょ':
          splitName[i] = 'xyo';
          break;
        case 'っ':
          splitName[i] = 'xtu';
          break;
        case ' ':
          splitName[i] = '_';
          break;
      }
    }
    this.illustrationUrl = splitName[0];
    for (let len = 1; len < splitName.length; len++) {
      this.illustrationUrl = this.illustrationUrl + splitName[len];
    }
    this.illustrationUrl = '../../assets/' + this.illustrationUrl + '.jpg';
    console.log(this.illustrationUrl);
  }
}

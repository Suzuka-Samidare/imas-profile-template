import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class IdolService {

  constructor() { }

  public fetchAllIdols(name): Promise<any> {
    return axios.get(`http://api.imas-db.jp/character/lookup?name=${name}`);
  }

  public fetchAllIdolColor(): Promise<any> {
    return axios.get(`http://api.imas-db.jp/character/color_code?format=list`);
  }

}

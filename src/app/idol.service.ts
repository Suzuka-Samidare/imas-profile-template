import { Injectable } from '@angular/core';
import axios from 'axios';

import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class IdolService {

  constructor() { }

  public async fetchIdolProfile(name): Promise<Profile> {
    const query = `PREFIX schema: <http://schema.org/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
    PREFIX imasrdf: <https://sparql.crssnky.xyz/imasrdf/RDFs/detail/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX math: <http://www.w3.org/2005/xpath-functions/math#>
    PREFIX xsd: <https://www.w3.org/TR/xmlschema11-2/#>
    PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

    SELECT
    ?birthDate ?birthPlace ?familyName ?gender ?givenName ?height ?weight ?age ?bloodType ?color ?constellation ?handedness
    ?title ?cv ?familyNameKana ?givenNameKana ?bust ?waist ?hip ?talent ?attribute ?division ?description ?type ?category ?shoeSize
    (GROUP_CONCAT(distinct ?Favorite;separator=",") as ?favorite)
    (GROUP_CONCAT(distinct ?Hobby;separator=",") as ?hobby)
    WHERE {
      imasrdf:${name} rdf:type ?Object;
      schema:birthDate ?birthDate;
      schema:birthPlace ?birthPlace;
      schema:familyName ?familyName;
      schema:gender ?gender;
      schema:givenName ?givenName;
      schema:height ?height;
      schema:weight ?weight;
      foaf:age ?age;
      imas:BloodType ?bloodType;
      imas:Color ?color;
      imas:Constellation ?constellation;
      imas:Handedness ?handedness;
      imas:Hobby ?Hobby;
      imas:Title ?title;
      imas:cv ?cv;
      imas:familyNameKana ?familyNameKana;
      imas:givenNameKana ?givenNameKana;
      OPTIONAL { imasrdf:${name} imas:Bust ?bust }.
      OPTIONAL { imasrdf:${name} imas:Waist ?waist }.
      OPTIONAL { imasrdf:${name} imas:Hip ?hip }.
      OPTIONAL { imasrdf:${name} imas:Talent ?talent }.
      OPTIONAL { imasrdf:${name} imas:Attribute ?attribute }.
      OPTIONAL { imasrdf:${name} imas:Division ?division }.
      OPTIONAL { imasrdf:${name} imas:Favorite ?Favorite }.
      OPTIONAL { imasrdf:${name} schema:description ?description }.
      OPTIONAL { imasrdf:${name} imas:Type ?type }.
      OPTIONAL { imasrdf:${name} imas:Category ?category }.
      OPTIONAL { imasrdf:${name} imas:ShoeSize ?shoeSize }.
      FILTER(LANG(?familyName) = 'ja')
      FILTER(LANG(?givenName) = 'ja')
      FILTER(LANG(?cv) = 'ja')
    }
    GROUP BY
    ?birthDate ?birthPlace ?familyName ?gender ?givenName ?height ?weight ?age ?bloodType ?color ?constellation ?handedness
    ?title ?cv ?familyNameKana ?givenNameKana ?bust ?waist ?hip ?talent ?attribute ?division ?description ?type ?category ?shoeSize`;
    const endPoint = 'https://sparql.crssnky.xyz/spql/imas/query';
    const response = await fetch(`${endPoint}?query=${encodeURIComponent(query)}`);
    const resJson = await response.json();
    const results = await resJson.results.bindings[0];
    const profile = {
      birthMonth: results.birthDate.value.slice(2, 4),
      birthDay: results.birthDate.value.slice(-2),
      birthPlace: results.birthPlace.value,
      familyName: results.familyName.value,
      gender: results.gender.value === 'female' ? '女性' : '男性',
      givenName: results.givenName.value,
      height: results.height.value,
      weight: results.weight.value,
      age: Number(results.age.value),
      bloodType: results.bloodType.value,
      color: results.color.value,
      constellation: results.constellation.value,
      handedness: results.handedness.value === 'right' ? '右' : '左',
      hobby: results.hobby.value,
      title: results.title.value,
      cv: results.cv.value,
      familyNameKana: results.familyNameKana.value,
      givenNameKana: results.givenNameKana.value,
      bust: results.bust !== undefined ? Number(results.bust.value) : null,
      waist: results.waist !== undefined ? Number(results.waist.value) : null,
      hip: results.hip !== undefined ? Number(results.hip.value) : null,
      talent: results.talent !== undefined ? results.talent.value : null,
      attribute: results.attribute !== undefined ? results.attribute.value : null,
      division: results.division !== undefined ? results.division.value : null,
      favorite: results.favorite !== undefined ? results.favorite.value : null,
      description: results.description !== undefined ? results.description.value : null,
      type: results.type !== undefined ? results.type.value : null,
      category: results.category !== undefined ? results.category.value : null,
      shoeSize: results.shoeSize !== undefined ? results.shoeSize.value : null
    };
    console.log(profile);
    return profile;
  }

  public fetchAllIdolColor(): Promise<any> {
    return axios.get(`http://api.imas-db.jp/character/color_code?format=list`);
  }
}

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class IdolService {

  constructor() { }

  public async fetchAllIdols(name): Promise<any> {
    console.log(name);
    const query = `PREFIX schema: <http://schema.org/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
    PREFIX imasrdf: <https://sparql.crssnky.xyz/imasrdf/RDFs/detail/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX math: <http://www.w3.org/2005/xpath-functions/math#>
    PREFIX xsd: <https://www.w3.org/TR/xmlschema11-2/#>
    PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

    SELECT
    ?birthDate ?birthPlace ?familyName ?givenName ?familyNameKana ?givenNameKana ?age ?gender
    ?height ?weight ?bloodType ?bust ?waist ?hip ?color ?talent ?division ?constellation ?title ?cv
    (GROUP_CONCAT(distinct ?Favorite;separator=",") as ?favorite)
    (GROUP_CONCAT(distinct ?Hobby;separator=",") as ?hobby)
    WHERE {
       imasrdf:${name} rdf:type ?Object;
       schema:birthDate ?birthDate;
       schema:birthPlace ?birthPlace;
       schema:familyName ?familyName;
       schema:givenName ?givenName;
       imas:familyNameKana ?familyNameKana;
       imas:givenNameKana ?givenNameKana;
       foaf:age ?age;
       schema:gender ?gender;
       schema:height ?height;
       schema:weight ?weight;
       imas:BloodType ?bloodType;
       imas:Bust ?bust;
       imas:Waist ?waist;
       imas:Hip ?hip;
       imas:Color ?color;
       imas:Favorite ?Favorite;
       imas:Hobby ?Hobby;
       imas:Talent ?talent;
       imas:Division ?division;
       imas:Constellation ?constellation;
       imas:Title ?title;
       imas:cv ?cv;
       FILTER(LANG(?familyName) = 'ja')
       FILTER(LANG(?givenName) = 'ja')
       FILTER(LANG(?cv) = 'ja')
    }
    GROUP BY
    ?birthDate ?birthPlace ?familyName ?givenName ?familyNameKana ?givenNameKana ?age ?gender
    ?height ?weight ?bloodType ?bust ?waist ?hip ?color ?talent ?division ?constellation ?title ?cv`;
    const endPoint = 'https://sparql.crssnky.xyz/spql/imas/query';
    const response = await fetch(`${endPoint}?query=${encodeURIComponent(query)}`);
    const resJson = await response.json();
    return resJson;
  }

  public fetchAllIdolColor(): Promise<any> {
    return axios.get(`http://api.imas-db.jp/character/color_code?format=list`);
  }
}

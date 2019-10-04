import { Injectable } from '@angular/core';
import axios from 'axios';

import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class IdolService {

  constructor() { }

  public async fetchIdolProfile(name): Promise<Profile> {
    // SPARQL access
    const endPoint = 'https://sparql.crssnky.xyz/spql/imas/query';
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
    ?title ?cv ?familyNameKana ?givenNameKana ?bust ?waist ?hip ?attribute ?division ?description ?type ?category ?shoeSize
    (GROUP_CONCAT(distinct ?Favorite;separator=",") as ?favorite)
    (GROUP_CONCAT(distinct ?Hobby;separator=",") as ?hobby)
    (GROUP_CONCAT(distinct ?Talent;separator=",") as ?talent)
    WHERE {
      ?S1 schema:name ?O1 .
      FILTER(regex(str(?O1), '^${name}$'))
      ?S1 rdf:type ?O2;
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
      OPTIONAL { ?S1 imas:Bust ?bust }.
      OPTIONAL { ?S1 imas:Waist ?waist }.
      OPTIONAL { ?S1 imas:Hip ?hip }.
      OPTIONAL { ?S1 imas:Talent ?Talent }.
      OPTIONAL { ?S1 imas:Attribute ?attribute }.
      OPTIONAL { ?S1 imas:Division ?division }.
      OPTIONAL { ?S1 imas:Favorite ?Favorite }.
      OPTIONAL { ?S1 schema:description ?description }.
      OPTIONAL { ?S1 imas:Type ?type }.
      OPTIONAL { ?S1 imas:Category ?category }.
      OPTIONAL { ?S1 imas:ShoeSize ?shoeSize }.
      FILTER(LANG(?familyName) = 'ja')
      FILTER(LANG(?givenName) = 'ja')
      FILTER(LANG(?cv) = 'ja')
    }
    GROUP BY
    ?birthDate ?birthPlace ?familyName ?gender ?givenName ?height ?weight ?age ?bloodType ?color ?constellation ?handedness
    ?title ?cv ?familyNameKana ?givenNameKana ?bust ?waist ?hip ?attribute ?division ?description ?type ?category ?shoeSize`;

    let profile: Profile;
    await axios.get(`${endPoint}?query=${encodeURIComponent(query)}`)
      .then((res) => {
        const results = res.data.results.bindings[0];
        console.log(results);
        const obj: Profile = {
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
        profile = obj;
      })
      .catch((err) => {
        console.log(err);
      });

    return profile;
  }

  public fetchIdolImage(name): Promise<any> {
    return axios.get(`http://localhost:8888/765?idol_name=${name}`);
  }
}

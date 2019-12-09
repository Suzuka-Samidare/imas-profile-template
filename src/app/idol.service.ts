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
    ?birthDate ?birthPlace ?gender ?height ?weight ?age ?bloodType ?color ?constellation ?handedness
    ?title ?cv ?familyName ?givenName ?alternateName ?familyNameKana ?givenNameKana ?alternateNameKana
    ?bust ?waist ?hip ?attribute ?division ?description ?type ?category ?shoeSize
    (GROUP_CONCAT(distinct ?Favorite;separator=",") as ?favorite)
    (GROUP_CONCAT(distinct ?Hobby;separator=",") as ?hobby)
    (GROUP_CONCAT(distinct ?Talent;separator=",") as ?talent)
    WHERE {
      ?data rdfs:label ?label;
      schema:birthDate ?birthDate;
      schema:gender ?gender;
      schema:height ?height;
      schema:weight ?weight;
      foaf:age ?age;
      imas:BloodType ?bloodType;
      imas:Constellation ?constellation;
      imas:Hobby ?Hobby;
      imas:Title ?title;
      imas:cv ?cv;
      OPTIONAL { ?data schema:birthPlace ?birthPlace }
      OPTIONAL { ?data imas:Color ?color }
      OPTIONAL { ?data imas:Handedness ?handedness }
      OPTIONAL { ?data schema:familyName ?familyName . FILTER(LANG(?familyName) = 'ja') }
      OPTIONAL { ?data schema:givenName ?givenName . FILTER(LANG(?givenName) = 'ja') }
      OPTIONAL { ?data schema:alternateName ?alternateName . FILTER(LANG(?alternateName) = 'ja') }
      OPTIONAL { ?data imas:familyNameKana ?familyNameKana }
      OPTIONAL { ?data imas:givenNameKana ?givenNameKana }
      OPTIONAL { ?data imas:alternateNameKana ?alternateNameKana }
      OPTIONAL { ?data imas:Bust ?bust }
      OPTIONAL { ?data imas:Waist ?waist }
      OPTIONAL { ?data imas:Hip ?hip }
      OPTIONAL { ?data imas:Talent ?Talent }
      OPTIONAL { ?data imas:Attribute ?attribute }
      OPTIONAL { ?data imas:Division ?division }
      OPTIONAL { ?data imas:Favorite ?Favorite }
      OPTIONAL { ?data schema:description ?description }
      OPTIONAL { ?data imas:Type ?type }
      OPTIONAL { ?data imas:Category ?category }
      OPTIONAL { ?data imas:ShoeSize ?shoeSize }
      FILTER(regex(str(?label), '^${name}$'))
      FILTER(LANG(?cv) = 'ja')
    }
    GROUP BY
    ?birthDate ?birthPlace ?gender ?height ?weight ?age ?bloodType ?color ?constellation ?handedness
    ?title ?cv ?familyName ?givenName ?alternateName ?familyNameKana ?givenNameKana ?alternateNameKana
    ?bust ?waist ?hip ?attribute ?division ?description ?type ?category ?shoeSize`;

    let profile: Profile;
    await axios.get(`${endPoint}?query=${encodeURIComponent(query)}`)
      .then((res) => {
        const results = res.data.results.bindings[0];
        const obj: Profile = {
          birthMonth: results.birthDate.value.slice(2, 4),
          birthDay: results.birthDate.value.slice(-2),
          gender: results.gender.value === 'female' ? '女性' : '男性',
          height: results.height.value,
          weight: results.weight.value,
          age: Number(results.age.value),
          bloodType: results.bloodType.value,
          constellation: results.constellation.value,
          hobby: results.hobby.value,
          title: results.title.value,
          cv: results.cv.value,
          birthPlace: results.birthPlace !== undefined ? results.birthPlace.value : null,
          color: results.color !== undefined ? results.color.value : null,
          handedness: results.handedness !== undefined ? (results.handedness.value === 'right' ? '右' : '左') : null,
          familyName: results.familyName !== undefined ? results.familyName.value : null,
          givenName: results.givenName !== undefined ? results.givenName.value : null,
          alternateName: results.alternateName !== undefined ? results.alternateName.value : null,
          familyNameKana: results.familyNameKana !== undefined ? results.familyNameKana.value : null,
          givenNameKana: results.givenNameKana !== undefined ? results.givenNameKana.value : null,
          alternateNameKana: results.alternateNameKana !== undefined ? results.alternateNameKana.value : null,
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

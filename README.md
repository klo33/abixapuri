# AbixApuri

**AbixApuri** (ent. AbittiApuri) on ilmainen ja avoin käyttöliittymälaajennus Ylioppilastutkintolautakunnan 
[oma.abitti.fi]-koepalveluun. **AbixApuri** toimii Firefox- ja Chrome-selaimissa erillisen ladattavan laajennoksen ([TamperMonkey Firefoxille][6]/[TamperMonkey Chromelle][2]) avulla. 

**AbixApuria** voi myös käyttää natiivin selainlaajennuksen avulla, josta tietoa alempana.

## [HUOM!! GreaseMonkey v4 ei toistaiseksi toimi AbixApurin kanssa][7]
**Päivitetty 16.11.2017**

Firefoxin päivityksessä versioon 57 on [GreaseMonkey][1]-lisäosa muuttunut ja ei toistaiseksi ole yhteensopiva AbixApurin kanssa. Lataa Firefoxille [TamperMonkey][6]-lisäosa ja [asenna skripti uudelleen][3], jolloin saat AbixApurin toimimaan
**[Tarkemmat ohjeet >>][7]**

## Ominaisuudet

1. Tehtävätekstien muokkaus laajennetulla editorilla (WYSIWYG)
   * mahdollistaa tekstin muotoilun sekä muotoillun tekstin ja kuvien liittämisen suoraan tehtävänantokenttiin esim. Wordistä.
   * Chromessa kuvien liittäminen suoraan leikepöydältä ei toimi, mutta kuvia ja mediaa voi lisätä Lisää kuva -napilla
2. Vanhojen tehtävien uudelleenkäyttö kopioimalla tehtävä vanhasta kokeesta
3. Tehtävien järjestely kokeen sisällä intuitiivisesti raahaamalla.
4. Kopion ottaminen vanhasta kokeesta uudelleenkäytettäväksi
5. Arviontitaulukon voi ladata mm. taulukkolaskentaohjelmaa
6. Sanalaskuri tekstivastauksiin
7. Koelistauksesta voi hakea helposti suodattavalla haulla esim. kurssikoodilla
(Vinkki kurssikoodi kannattaa olla kokeen nimessä, jolloin haku sen löytää)

## Asentaminen

1. Firefox-selaimessa lataa [TamperMonkey Firefoxille][6]-lisäosa. Chrome-selaimessa lataa [TamperMonkey Chromelle][2]-lisäosa.
2. Lataa [AbixApuri][3] menemällä osoitteeseen [klo33.github.io/abixapuri/src/AbiApuri-skripti.user.js][3]. Jos 1-kohdan lisäosa on asennettu selaimeen oikein sen pitäisi ehdottaa asennusta. Hyväksy asennus.
3. Mene osoitteeseen [oma.abitti.fi] normaalisti. Tarvittaessa varmista GreaseMonkeys apina-kuvakkeesta tai TamperMonkeyn "ruutu"-kuvakkeesta, että AbixApuri on päällä.

Jos et halua asentaa ym. laajennoksia voit vaihtoehtoisesti asentaa oman selainlaajennoksen [Chromeen][5] tai [Firefoxiin][4], mutta tämä prosessi on monimutkaisempi. Tästä tietoa alempana.

Huomaa, että AbixApurin toimintaa haittaa, mikäli Bittiniilo on aktiivisena selaimessa. Suosittelemme sen poistamista käytöstä, ohjeet tähän alempana.

### Muutokset
#### v0.2.9 (17.11.2017)
- Varoitus <-merkkien käytöstä, joka voi rikkoa tehtäviä
- Lisätty huomatus Firefox-selaimien käyttäjille, jotta siirtyisivät TamperMonkey-lisäosan käyttäjiksi

#### v0.2.6 (22.9.2017)
- Lisätty varoitus Apuriin, jos tehtävänannossa on linkki verkkoon

#### v0.2.5 (19.9.2017)
- Virheenkorjauksia
    * Ongelma ääkkösten entiteeteissä, joita Abitti-palvelu ei pura kaikissa paikoissa (monivalinnan arvostelutehtävänannossa) luontevasti on korjattu Apurin puolelta

#### v0.2.4 (7.9.2017)
- Toteutettu hakutoiminto koelistauksesta

#### v0.2.3 (4.9.2017)
- Virheenkorjauksia
  * koe ei aikaisemmin tallentunut jos muutettiin vain kokeen yleisohjetta tietyissä tilanteissa

#### v0.2.2 (23.8.2017)
- Virheenkorjauksia
  * korjattu tehtävän tuontiin liittyvä ongelma

#### v0.2.1 (22.8.2017)
- Arviointitaulukon voi ladata taulukkolaskentaohjelmaan CSV-muodossa
- Arvioinnissa näytetään sanalaskuri tekstimuotoisen vastauksen pituudesta
- Ruotsinkielinen käännös

#### v0.1.2 (8.8.2017)
- Virheenkorjauksia
  * korjattu kokeen tuontiin liittyvä ongelma
  * lisäkorjauksena v0.1.1 tullut ongelma korjattu
- Lisätty huomautus, jos Bittiniiloa käytetään yhtäaikaa

#### v0.1.0 (28.5.2017)
- Chrome-tuki
- CKEditor päivitetty versioon v4.7 ja lisätty lisäosia
- Tuki tehtävän kopioinnille
- Päivitetty ulkoasua ja korjattu bugeja mm. järjestelytoiminnossa

#### v0.0.3 (22.5.2017)
- Lisätty järjestystoiminnallisuus
  * Ei toimi vielä alatehtävissä
- Lisätty viivästetty tallennus, jos kuvia liittää suuria määriä
- Eroteltu YTL:n toivomuksesta selkeämmin lisätyt elementit ja YTL:n elementit sekä tieto, että lisäosa on latautunut

### Selainlaajennokset
- [Firefoxille][4]
Tallenna laajennus koneellesi ja sen jälkeen raahaa ladattu XPI-tiedosto Firefoxin ikkunaan. 
- [Chromelle][5]
Chromessa ilmeisesti asennus onnistuu ainoastaan kehittäjätilassa (chrome://extensions -> kehittäjätila)

#### Miksi haluaisin käyttää erillisiä selainlaajennoksia?
Tietooni on tullut, että AbixAjurin juridisesta asemasta on heitetty epäilyksiä, viitaten siihen, että GreaseMonkey ja TamperMonkey eivät olisi luotettavia. Molemmat lisäosat ovat vakiintuneita ja hyvämaineisia, erityisesti viimeaikoina kun niiden skriptien asetuksia on pystynyt rajaamaan tarkemmin.

Erillisen laajennuksen käyttö poistaa kuitenkin nämä epäilyt.

#### Miksi selainlaajennokset eivät ole selaimien laajennoksien omissa kaupoissa?

Laajennoksen lataavat YTL:n ulkopuolista koodia (CKEditor ja jäsennyksen käyttöliittymäkoodi sekä erikoisfontin renderöintikoodi), joka ei ole selainlaajennoksissa sallittua. Kaikki muu toiminnallisuus olisi erittäin helppo ja nopeaa saada toimimaan myös laajennoksen sisällä, mutta CKEditor vaatisi jonkin verran työtä, jotta sen pystyisi toiminnallisesti saamaan siihen asuun joka ei lataa mitään ohjelmakoodia YTL:n verkkosivujen ulkopuolelta.

Juuri nyt tähän en itse ryhtymässä, joten laajennoksia ei tule selainkauppoihin ihan lähiaikoina.

### Tuki ja ongelmatilanteet
Uusista huomatuista virheistä ja ongelmista kannattaa raportoida ensisijaisesti [GitHubin projektin virheseurantaan](https://github.com/klo33/abixapuri/issues).

AbixApuri on avointa ohjelmistoa, jossa ei ole varsinaista käyttötukea, mutta toki autan parhaani mukaan, jos tarve on suuri.
Apuja voi kysellä minun sähköpostini (ks. sivun alalaita) lisäksi [Tietokoneet YO-kirjoituksissa Facebook-ryhmästä](https://www.facebook.com/groups/339542799419574/).

### Ohjeet AbixAburin tai Bittiniilon poisasentamiseksi
AbixApurin toiminnallisuutta haittaa Bittiniilon aktiivisena olo. Mikäli et ole ostanut maksullista Bittiniilon lisenssiä, ei se auta kokeenlaadinnassa, jolloin se kannattaa poistaa käytöstä.

#### Bittiniilon kytkeminen pois käytöstä
- Chromessa sivuvalikosta (...-ikoni) *Lisää työkaluja* -> *Laajennukset*
Ota ruksi pois Bittiniilon *Käytössä* sarakkeesta. Jos haluat poistaa Bittiniilon kokonaan, voit valita myös roskakorin.
Mikäli vain poistit laajennukset käytöstä, on se helppo palauttaa käyttöön valitsemalla *Ota käyttöön*.

- Firefoxissa valikossa (kolme vaakaviivaa) valitse *Lisäosat* ja tarvittaessa sivuvalikosta *Laajennukset*. Bittiniilon kohdalla paina *Poista käytöstä* napista.
#### AbixApurin kytkeminen pois käytöstä
- Chromessa kun olet oma.abitti.fi-osoitteessa valitse TamperMonkey-laajennuksen kuvake (pyöreäreunainen neliö, jossa kaksi aukkoa) ja AbixApurin kohdalta käännä on->off. Tarvittaessa päälle kytkentä samoin.
- Firefoxissa oma.abitti.fi-osoitteessa GreaseMonkey-laajennuksen kuvakkeesta (apinakuvake) alasnuoli -> ota valinta pois AbixApurin kohdalta. Tarvittaessa kytke uudelleen päälle ja päivitä verkkosivu.

### Tunnetut ongelmat
+ GreaseMonkey v4 kanssa suuria yhteensopivuusongelmia. GreaseMonkey v4 tulee vakiona käyttöön Firefox-selaimen 57 Quantum päivityksen yhteydessä. Koska skriptin päivitys ei toimi lainkaan uudessa GreaseMonkeyssa, niin suositellaan toistaiseksi siirtymään TamperMonkey-lisäosan käyttöön myös Firefoxissa
+ Chrome-selaimessa TamperMonkey'ssa kuvien liittämisessä leikepöydältä on vielä ongelmia. Firefox-GreaseMonkey-yhdistelmällä toimii.
+ Viivästetyn tallennuksen ollessa aktiivinen, koetehtävien järjestelytoiminto kyllä pyrkii tallentamaan kokeen, mutta potentiaalisesti voi joutua tilanteeseen, että viimeisimmät muutokset menetetään.
+ Suurten kokeiden kohdalla koetehtävien järjestelytoiminto ei toimi, mikäli siirtelee tehtäviä nopeasti. Kiertokeino: Pidä taukoa vähintään viisi sekuntia tehtävien siirtojen välillä.

### Lisenssi ja vastuuvapaus

Lisäosan kehittäjällä ei ole yhteyksissä Ylioppilastutkintolautakuntaan, eikä lisäosa ole YTL:n kehittämä. Tarkoituksellisesti lisäosa ei tee mitään pahantahtoista YTL:n tai kolmannen osapuolen palvelulle. Käyttö kuitenkin omalla vastuulla.

Lisäosa ei siirrä mitään informaatiota YTL:n [oma.abitti.fi]-palvelun ulkopuolella, mutta lähettää YTL:n Abitti-palveluun rajapintakutsuja kyseisen sivun "päälle liimattuna osana" sekä lataa skriptitiedostoja internetistä (toiminnallisuuksiin liittyvät laajennuksia). Sinänsä toiminnallisuuksien ei pitäisi rikkoa yhtään mitään YTL:n eikä käyttäjän tiedoista, mutta skripti tekee muutoksia avoinna olevan kokeen tietoihin, mikä onkin sen käyttötarkoitus. Muihin kokeisiin laajennus ei tee muutoksia.

AbixApuri (ent. AbittiApuri) on julkaistu [GPLv3]-lisenssillä. Lyhyesti, laajennusskripti on ilmainen käyttää, sen lähdekoodi on julkinen ja sitä saa muokata. Muokkauksissa ja käytössä pitää lähde ja alkuperäinen lisenssi mainita sekä julkaista koodi myös GPL:n alaisuudessa. AbixApuri-skriptiä käytetään omalla vastuulla, eivätkä kehittäjät vastaa mistään skriptin aiheuttamasta vahingosta.

    AbixApuri - Lisäosa oma.abitti.fi-palveluun
    Copyright (C) 2017 Joni Lehtola

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see [http://www.gnu.org/licenses/]

### Yhteystiedot
Lisätiedot ja palaute Joni Lehtola, etunimi.sukunimi@kauniaistenlukio.fi

[1]:https://addons.mozilla.org/fi/firefox/addon/greasemonkey/
[2]:https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
[3]:https://klo33.github.io/abixapuri/src/AbiApuri-skripti.user.js
[4]:https://github.com/klo33/abixapuri/blob/master/dist/abixapuri-0.1.2-an+fx.xpi?raw=true
[5]:https://github.com/klo33/abixapuri/blob/master/dist/AbixApuri-loader-0.1.2.crx?raw=true
[6]:https://addons.mozilla.org/fi/firefox/addon/tampermonkey/
[7]:https://github.com/klo33/abixapuri/wiki/Miten-AbixApuri-toimii-uudessa-Firefoxissa
[GPLv3]:https://www.gnu.org/licenses/gpl-3.0.en.html
[oma.abitti.fi]:https://oma.abitti.fi

# AbixApuri

**AbixApuri** (ent. AbittiApuri) on ilmainen käyttöliittymälaajennus Ylioppilastutkintolautakunnan 
[oma.abitti.fi]-koepalveluun. **AbixApuri** toimii [Firefox][4]- ja [Chrome][8]-selaimissa erillisen ladattavalla lisäosalla.

## Asennusohjeet
### Firefoxille
1. Tallenna [Firefox-laajennus (.XPI-tiedosto)][4] koneellesi ja 
2. raahaa se Firefoxin ikkunaan.
3. Hyväksy asennus.

### Chromelle
1. Mene [Chrome-selaimen kauppaan ja etsi AbixApuri][8]
2. Valitse Lisää Chromeen -nappi ja hyväksy asennus

### Lisäosan päivittäminen
Lisäosan päivittämisen voi pakottaa selaimen lisäosavalikosta tai asentamalla lisäosa uudelleen.

## Ominaisuudet


1. Arviontitaulukon voi ladata mm. taulukkolaskentaohjelmaa. Lisäksi arvosanat voi tuoda taulukkolaskennasta takaisin Abittiin.
2. Koelistauksesta voi hakea helposti suodattavalla haulla esim. kurssikoodilla
(Vinkki kurssikoodi kannattaa olla kokeen nimessä, jolloin haku sen löytää)
3. Arviontimerkintöjen helpottaminen: Ehdotetaan vanhoja merkintöjä automaattisesti merkittäväksi.
4. Arvosanataulukko sisällytetty Abittiin, jolloin Apuri ehdottaa suoraan arvosanaa.
5. Tehtävien osapisteytys ja osapisteiden laskenta.

## Asentaminen selaimen lisäosana
### Firefoxille
1. Tallenna [Firefox-laajennus (.XPI-tiedosto)][4] koneellesi ja 
2. raahaa se Firefoxin ikkunaan.
3. Hyväksy asennus.

### Chromelle
1. Mene [Chrome-selaimen kauppaan ja etsi AbixApuri][8]
2. Valitse Lisää Chromeen -nappi ja hyväksy asennus


Huomaa, että AbixApurin toimintaa haittaa, mikäli Bittiniilo on aktiivisena selaimessa. Suosittelemme sen poistamista käytöstä, ohjeet tähän alempana.

### Muutokset

#### v1.3.0.1 (23.5.2025)
- Vanhoja ominaisuuksia poistettu
- Tuki uudelle YTL:n arvioinnille
- Mallivastauksien laadinta
- Oppilaiden nimien piiloitus
- Keskitetty arvionti - koekäyttö

Huom! Tämä versio ei ole vielä Chromen kaupassa

#### v0.9.3 (25.11.2022)
- Korjaus tapaan miten pisteenlaskenta korjauksessa lähettää pyyntöjä oma.abitti.fi-rajapintaan

#### v0.9.2 (3.12.2021)
- Osaa konvertoida vanhan kokeen suoraan Bertta-muotoon, jos koe on konvertoitavissa.
- Teknisiä muutoksia lisäosaan (siirrytty käyttämään uudenmaan manifest v3 -formaattia)

#### v0.9.0 (24.11.2021)
- Tukea Bertta-kokeiden tekijöille:
  - MEX-kokeen kopiointituki
  - Kokeen MEX-koodin näyttö, jos mahdollista (kokeeen siirtoa ja tehtävien kopioimista auttamaan)
HUOM! MEX/Bertta-kokeet ovat toistaiseksi tarkoitettu niille, joilla on kiinnostusta tutkia kokeen koodia tarkemmin. Koodin rakenteen kanssa opastamisessa en tule auttamaan.

#### v0.8.3 (13.5.2021)
- Arvosanataulukon korjauksia
  * Arvosanataulukko ja pisteytyksien sisäinen vienti .cvs-muotoon toimivat myös aidoissa .mex-kokeissa.

#### v0.8.2 (12.5.2021)
- Abitin koekielen tuki 
  * korjattu ongelmat kopioinnissa ja järjestelyssä, jotka aiheutuivat rajapintamuutoksista
- Osapisteytyksen parannuksia
  * Korjattu ongelmat laskennassa kaavojen ja kuvien kohdalla
  * Useampi pisteytys samassa kommentissa toimii nyt
  * Korjauskommentit toimivat myös aitojen .mex-kokeiden korjauksissa

#### v0.8.0 (20.11.2020)
- Tuki osapisteytyksille arvostelussa
- Aikaisemmassa versiopäivityksessä (rinnakkaisessa haarasta joka yhdistetty versioon): 
  * Tuki base64-liitteiden konversiolle kokeen kopioinnissa ja 
  * base64-liitteiden etsiminen.
  * Uuden koeformaatin kokeissa CSV-taulukon latauksen tuki

#### v0.6.2 (11.12.2018)
- Korjauksia johtuen oma.abitti.fi:n muutoksista
- TamperMonkey-usersriptiä ei toistaiseksi päivitetä. Päivitä selainlaajennukseen.

#### v0.6.1 (30.11.2018)
- Korjauksia kommentointiin oma.abitti.fi:n muutoksien vuoksi ja huomautuksiin monivalinnoissa

#### v0.6.0 (16.10.2018)
- Tuki YTL:n kaksiosaiselle kokeelle (A- ja B-osa)
- Monivalintakokeen uudelleenjärjestämisen tuki

#### v0.5.4 (6.2.2018)
- Korjauksia CSV-tiedostoon

#### v0.5.3 (30.1.2018)
- Lisätty varmistus arvosanatyökaluun

#### v0.5.2 (28.1.2018)
- Ruotsinkäännöstäydennyksiä

#### v0.5.1 (25.1.2018)
- Pieniä korjauksia
- Tuki selainlaajannuksille parantunut, jolloin ei lataa mitään skriptejä netin yli

#### v0.5.0 (18.1.2018)
- Arvosteluavustin kokeen palautusnäkymässä
    * Näyttää joko arvosanaehdotuksen tai suhteellisen arvosanan
    * Mahdollisuus käyttää ehdotusta suoraan
    * Kokeen arvosanajakauman näyttö sekä pisterajojen näyttö
- CSV-taulukon tuonti arviointinäkymään, joka osaa tuoda arvosanat Abittiin
- CSV-taulukkolaskentaan mukaan vastausID-numero, joka 

#### v0.4.3 (18.1.2018)
- Kokeen arvostelun maksimipisteet mukaan taulukkolaskentaan.
- Maksimipisteet summamerkintään

#### v0.4.2 (2.1.2018)
- Pikkuparannuksia näppäimistön käyttöön arviointimerkintöjä tehdessä:
  * voi käyttää nuolinäppäimiä, Esc peruuttaa valinnan, Enter tekee valinnan
  * Vinkataan pikanäppäimistä (Alt+nro)
  * Pieniä tyylimuokkauksia

#### v0.4.1 (30.12.2017)
- Näppäimistöoikotiet arviontimerkintöjen tekemiseen Windowsilla ja Linuxilla (Alt + merkinnän sijainti [1-6])
- Korjauksia
  * Laajennettu liitetiedoston linkin tunnistusta kattamaan ./-tilanteet
  * YTL:n API muutoksia

#### v0.4.0 (17.12.2017)
- Arviointimerkinnän laajennus: Merkintöjen lisääminen kokeen sisältä helpompaa, kun voi käyttää suoraan vanhoja kommentteja
- Koetehtävää kopioitaessa toisesta kokeesta, kopioidaan myös kaikki liitteet johon tehtävässä viitataan
- Liitetyökalun korjauksia (ääniliitteet toimivat paremmin)

#### v0.3.2 (28.11.2017)
- Lisätty editoriin työkalu, jolla liitteet saa helposti käyttöön kokeessa
- Tyylikorjauksia

#### v0.3.1 (27.11.2017)
- Parannettu tukea liitetiedostoille: 
  * Näyttää liitetiedostolinkit kuvissa ja videoissa oikein jo muokkauksen aikana

#### v0.3.0 (26.11.2017)
- Kopioidaan liitteet otettaessa kopio kokeesta

#### v0.2.9 (17.11.2017)
- Varoitus <-merkkien käytöstä, joka voi rikkoa tehtäviä
- Lisätty huomatus Firefox-selaimien käyttäjille, jotta siirtyisivät TamperMonkey-lisäosan käyttäjiksi
- Poistettu kokeen vastauksien merkkimäärän laskuri, koska ominaisuus on nyt toteutettu Abitissa natiivina 

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

#### Miksi selainlaajennos ei ole Firefoxin kaupassa?

Laajennos käyttää CKEditoria, joka on Firefoxin selainkaupan kooditarkistuksen mielestä osin heikkolaatuista. En ole heti parantelemassa sen ongelmia.

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
- Chrome: Valikko (kolme pistettä) > Lisää työkaluja > Laajennokset, jossa laajennus joko poistetaan tai kytketään pois käytöstä.
- Firefox: Valikko (kolme vaakaviivaa) > Add-ons, jossa laajennos joko poistetaan tai kytketään pois käytöstä.


### Lisenssi ja vastuuvapaus

Lisäosa ei ole YTL:n kehittämä tai YTL:n tarkistama. Tarkoituksellisesti lisäosa ei tee mitään pahantahtoista YTL:n tai kolmannen osapuolen palvelulle. Käyttö kuitenkin omalla vastuulla.

Lisäosa ei siirrä mitään informaatiota YTL:n [oma.abitti.fi]-palvelun ulkopuolella, mutta lähettää YTL:n Abitti-palveluun rajapintakutsuja kyseisen sivun "päälle liimattuna osana" sekä lataa skriptitiedostoja internetistä (toiminnallisuuksiin liittyvät laajennuksia). Sinänsä toiminnallisuuksien ei pitäisi rikkoa yhtään mitään YTL:n eikä käyttäjän tiedoista, mutta skripti tekee muutoksia avoinna olevan kokeen tietoihin, mikä onkin sen käyttötarkoitus. Muihin kokeisiin laajennus ei tee muutoksia. Skripti voi myös luoda uuden kokeen, kun sitä nimenomaisesti pyydetään ottamaan kopio. V0.5.0 alkaen skripti voi myös tallentaa YTL:n APIin kokeen arvosanatietoja kokeen pistemäärän perusteella käyttäjän nimenomaisesti niin pyytäessä (Arvosanalaskurin nappi "Toimeenpane" tai Arvosanojen tuonti toiminnon "Tallenna"). AbixApuri tekee tallennuksia selaimen muistiin, jotka ovat riippuvaisia koneen käyttäjästä ja käytetystä selaimesta. Tietoja ei lähetetä YTL:n Abitti-palvelun ulkopuolelle.

#### V1.3 alkaen

V.1.3 lähtien lisäosa annetaan ilmaiseksi kaikille lukio-opettajille ja koulutuksen järjestäjille käyttöön. Lähdekoodia ei julkaista kokonaisuudessaan julkisesti, mutta sitä voi pyytää. Jos lähdekoodin saa käyttöönsä, pitää lähde ja alkuperäinen lisenssi mainita. AbixApuria käytetään omalla vastuulla, ilman takuuta, eivätkä kehittäjät vastaa ohjelmistovirheiden aiheuttamista tahattomista vahingoista tiedoille. 

    AbixApuri - Lisäosa oma.abitti.fi-palveluun
    Copyright (C) 2017-2025 Joni Lehtola

#### V1.0 asti

AbixApuri (ent. AbittiApuri) on julkaistu [GPLv3]-lisenssillä v1.0 asti. Lyhyesti, laajennusskripti on ilmainen käyttää, sen lähdekoodi on julkinen ja sitä saa muokata. Muokkauksissa ja käytössä pitää lähde ja alkuperäinen lisenssi mainita sekä julkaista koodi myös GPL:n alaisuudessa. AbixApuri-skriptiä käytetään omalla vastuulla, eivätkä kehittäjät vastaa mistään skriptin aiheuttamasta vahingosta.


    AbixApuri - Lisäosa oma.abitti.fi-palveluun
    Copyright (C) 2017-2022 Joni Lehtola

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
Lisätiedot ja palaute Joni Lehtola, etunimi.sukunimi@graniedu.fi

[1]:https://addons.mozilla.org/fi/firefox/addon/greasemonkey/
[2]:https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
[3]:https://klo33.github.io/abixapuri/src/AbiApuri-skripti.user.js
[4]:https://github.com/klo33/abixapuri/blob/master/dist/abixapuri-1.3.0.3.xpi?raw=true
[5]:https://github.com/klo33/abixapuri/blob/master/dist/abixapurichrome-0.5.0.0.crx?raw=true
[6]:https://addons.mozilla.org/fi/firefox/addon/tampermonkey/
[7]:https://github.com/klo33/abixapuri/wiki/Miten-AbixApuri-toimii-uudessa-Firefoxissa
[8]:https://chrome.google.com/webstore/detail/abixapuri/jjeikocnggeifbldpibadabeidjaphom
[GPLv3]:https://www.gnu.org/licenses/gpl-3.0.en.html
[oma.abitti.fi]:https://oma.abitti.fi

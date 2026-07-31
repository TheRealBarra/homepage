# Bautagebuch – Redaktionszentrale

> **Diese Datei ist das Nachschlagewerk, nicht der Blog.** Wenn du einen Text
> ändern oder ergänzen willst, schaust du **hier** nach – nicht kreuz und quer
> in den Einträgen. Alles, was doppelt gepflegt werden müsste, steht genau an
> einer Stelle:
>
> | Was | Wo |
> |---|---|
> | **Alle Termine** | [`src/data/timeline.ts`](src/data/timeline.ts) – einzige Datumsquelle |
> | **Alle Texte** | [`src/content/altbau/*.md`](src/content/altbau/) – ein Eintrag pro Monat/Thema |
> | **Raumzustände, Zahlen, offene Fragen** | diese Datei |
>
> Ablauf: Termin oder Korrektur per Chat durchgeben → wird in `timeline.ts`
> gepflegt und im passenden Monatseintrag ergänzt → Register hier unten
> aktualisieren.
>
> **Für jede zukünftige Bearbeitung verbindlich:** Dieses Muster (Regeln unten,
> ein Termin an einer Stelle, Nachtrag-Blöcke statt Umschreiben, Register
> pflegen) ist keine Empfehlung mehr, sondern gilt ab sofort immer – sonst war
> die Aufräumarbeit vom Juli 2026 umsonst.

---

## 1. Regeln, damit nichts auseinanderläuft

1. **Ein Datum lebt in `timeline.ts`.** Ein Datum, das in einem Blogtext steht,
   muss auch dort stehen. Kein Datum irgendwo sonst.
2. **Ein Monat = ein Eintrag.** Ausnahme: Themen, die groß genug für einen
   eigenen Strang sind (Dach, Schlacke, Statik, Heizungs-Saga, Wasserleitung,
   Kinderzimmer). Kleinkram kommt als Abschnitt in den Monatseintrag, nicht als
   eigener Post.
3. **Slug = Monat der `pubDate`.** `YYYY-MM-thema`. Wenn sich das Datum ändert,
   ändert sich der Dateiname mit.
4. **Ein Eintrag erzählt seinen eigenen Zeitpunkt.** Spätere Erkenntnisse kommen
   ans Ende in einen ausgewiesenen Block:
   `**Nachtrag (Stand Monat Jahr):** …`
   Damit muss man beim Ergänzen nie einen bestehenden Absatz umschreiben.
5. **Nichts erfinden.** Was nicht belegt ist, kommt in Abschnitt 6/7 als offene
   Frage – nicht als Prosa in den Blog.
6. **Raumnamen sind fest** (Abschnitt 3). „Hauptbad", „Bad oben", „Klo" nicht
   gemischt verwenden. „Bad im EG" = Gäste-WC EG, es gibt nur das eine Bad im
   Erdgeschoss.

---

## 2. Eintrags-Register

| Datei | pubDate | Deckt ab | Status |
|---|---|---|---|
| `2025-06-hauskauf` | 26.06.2025 | Übergabe, Ausgangszustand, undichte Gaube | abgeschlossen |
| `2025-07-rueckblick` | 27.07.2025 | Rückbau OG + EG, Tapeten, Küchenfliesen, **plus** Wohn-/Esszimmer EG (gestrichen, Boden, Stromkasten, Ikea-Küche, Möbelaufbau) | abgeschlossen |
| `2025-08-dachsanierung` | 04.08.2025 | Dach 04.–22.08., Gaubenschaden außen | abgeschlossen |
| `2025-08-schlacke-raus` | 18.08.2025 | Schüttungsentdeckung 01.08., Gutachten, Statiker-Vorabcheck, Entsorgung 18./19.08. | abgeschlossen |
| `2025-08-bodenaufbau-og-entscheidung` | 25.08.2025 | Statik-Vorgabe, Materialentscheidung + **restlicher August** (Küche, Gäste-WC, Flur-Boden) | abgeschlossen |
| `2025-09-boeden-bad-gaube` | 28.09.2025 | Böden Arbeits-/Schlafzimmer, Rohrbruch Bad OG, Gaube innen, Kleinkram | abgeschlossen |
| `2025-10-rueckblick` | 19.10.2025 | Schlafzimmer OG gestrichen, Schlafzimmerboden, Kleiderschrank, Gäste-WC fertig, Keller geöffnet | abgeschlossen |
| `2025-12-heizungs-saga` | 15.12.2025 | 29.09. → 07.10. → 06.11. Ventiltausch → Anfang Dez. Schaden entdeckt → 15.12. Rohrtausch → 16.12. Wohnzimmer wieder normal, deckt **Nov + Dez** ab | abgeschlossen |
| `2026-01-rueckblick` | 31.01.2026 | Kinderzimmerboden, Schlafzimmer fertig, Fliesenspiegel, Küchenbeleuchtung | abgeschlossen |
| `2026-02-rueckblick` | 28.02.2026 | Küchentür (streichen + montieren), Kinderzimmer probeweise Clickvinyl, Hecke, Terrasse | abgeschlossen |
| `2026-03-rueckblick` | 15.03.2026 | Kirschlorbeer-Rückschnitt (2×), Hängelampe Esszimmer – Friatec-Bruch lebt separat in `2026-06-wasserleitung-aussenwand` | abgeschlossen |
| `2026-04-rueckblick` | 16.04.2026 | Garteninfrastruktur (Graben, Beet, Terrassensockel, Kirschbaum), Clickvinyl Flur EG | abgeschlossen |
| `2026-05-rueckblick` | 05.05.2026 | Keller-LED-Tausch – Kinderzimmer-Fakten (Tapete, Verputz-Beginn) stehen im Kinderzimmer-Strang | abgeschlossen |
| `2026-06-wasserleitung-aussenwand` | 29.06.2026 | Friatec-Bruch März + Adapter Juni, deckt den **Leitungs-Strang** ab (Kleinkram aus März 2026 steht separat in `2026-03-rueckblick`) | abgeschlossen |
| `2026-07-kinderzimmer-fertig` | 18.07.2026 | Gaube-Strang komplett: Bodenaufbau (Jan), Testverlegung Clickvinyl (Feb), Tapete + Verputz-Beginn (Mai), Wasserschaden (Juni), Fertigstellung (Juli) | abgeschlossen |
| `2026-07-keller-und-waermepumpe` | 30.07.2026 | Keller trocknet, Abdichtungsangebot, Wärmepumpen-Rechnung | **in-arbeit** |

**Nicht mehr vorhanden** (bewusst entfernt/umbenannt, in git nachvollziehbar):
`2025-09-entkernung` und `2025-09-der-boden-muss-weg` waren reine Platzhalter mit
falscher Chronologie – der Rückbau lief im Juli, nicht im September. `2025-07-ist-stand`
wurde zu `2025-07-rueckblick` (deckt jetzt den ganzen Monat ab, nicht nur den Rückbau).
`2025-10-kleiderschrank`, `2025-10-zimmer-gaeste-wc`, `2026-07-keller-abdichtung-angebot`
und `2026-07-waermepumpe-frage` wurden in die jeweiligen Monatseinträge zusammengeführt.

---

## 3. Raum-Register (Stand Juli 2026)

Feste Namen links. „Wo dokumentiert" = wo du ansetzen musst, wenn sich am Raum
etwas ändert.

### Obergeschoss

| Raum | Boden | Wände/Decke | Offen | Wo dokumentiert |
|---|---|---|---|---|
| **Flur OG** | Aufbau 29./30.08.25, Clickvinyl 15.09.25 | ❓ unbekannt | Rohrschaden Nov/Dez. 2025 lag hier (siehe Wasserereignis-Register #3) – am Flur selbst nichts mehr offen, Folgeschaden traf das Wohnzimmer | `2025-08-bodenaufbau…`, `2025-09-…`, `2025-12-heizungs-saga` |
| **Arbeitszimmer** | Aufbau 06./07.09.25, Clickvinyl 20.09.25 | ❓ unbekannt | gestrichen? möbliert? | `2025-09-boeden-bad-gaube` |
| **Schlafzimmer** | Aufbau 26./27.09.25, Clickvinyl 02.–15.10.25 | gestrichen 12.10.25, fertig dekoriert 05.01.26 | ❗ Gaube-Ecke war 08.09. befallen – Reparatur nie dokumentiert | `2025-09-…`, `2025-10-rueckblick`, `2026-01-rueckblick` |
| **Kinderzimmer** | Aufbau 03.01.26 (inkl. OSB), probeweise Clickvinyl 21.02.26, tw. neu nach Wasserschaden 06/26 | Tapete entfernt 10.05.26, Feinverputz ab 28.05.26 (zieht sich in den Juni), gestrichen 07/26 | ✅ fertig 18.07.26 | `2026-01-rueckblick`, `2026-02-rueckblick`, `2026-07-kinderzimmer-fertig` |
| **Bad OG** | ❓ | neue Fliesen im WC-Bereich 05./06.09.25 | Dusche/Wanne/Waschbecken/Boden nie erwähnt | `2025-09-boeden-bad-gaube` |

### Erdgeschoss

| Raum | Stand | Offen | Wo dokumentiert |
|---|---|---|---|
| **Küche** | Fliesen ab 07/25, Boden+Wände 11.08.25, Möbelaufbau ab 11.08. (Ikea-Küche vom 20.07., zieht sich bis 15.08.), Hängeschränke 13.09.25, Arbeitsplatte verstärkt 02.09.25, Fliesenspiegel 26.01.26, Unterschrankbeleuchtung 31.01.26, Tür gestrichen 02.02.26 + montiert 12.02.26 | ✅ gilt als fertig | `2025-07-…`, `2025-08-bodenaufbau…`, `2025-09-…`, `2026-01-rueckblick`, `2026-02-rueckblick` |
| **Wohn-/Esszimmer** | gestrichen 01.07.25, Boden 07.–16.07.25, erste Möbel 27.07.25 – **aufgehackt 15.12.25** für Rohrtausch (Leitung der Flurheizung führt hier durch), neu verputzt 16.12.25, seitdem wieder normal genutzt | ✅ | `2025-07-rueckblick`, `2025-12-heizungs-saga` |
| **Gäste-WC** | WC 08.08.25, Fliesenfarbe 11.08.25, Lampe 05.10.25 | ✅ durch | `2025-08-bodenaufbau…`, `2025-10-rueckblick` |
| **Flur EG** | Clickvinyl 16.04.26 | Wände/Stand davor nie dokumentiert – Stromkasten hier (18.07.25) ist der einzige frühere Bezug | `2025-07-rueckblick`, `2026-04-rueckblick` |

### Keller / Außen

| Bereich | Stand | Offen | Wo dokumentiert |
|---|---|---|---|
| **Keller** | Abfluss verlängert 31.08.25, Holzwände raus 14.10.25, trocknet seitdem offen; Rohrtausch der Flurheizung reicht bis in den Keller (15.12.25); LED-Röhren statt Leuchtstoffröhren 05.05.26 | Abdichtungsangebot muss nachgemessen werden | `2025-09-…`, `2025-10-rueckblick`, `2025-12-heizungs-saga`, `2026-05-rueckblick`, `2026-07-keller-und-waermepumpe` |
| **Dach/Gaube** | neu gedeckt 04.–22.08.25, GEG-Dämmung | ✅ | `2025-08-dachsanierung` |
| **Elektrik Flur** | Stromkasten (FI + Sicherungen) komplett erneuert 18.07.25 | Rest des Hauses offen, siehe Lücke L2 | `2025-07-rueckblick` |
| **Wasserleitung Außenwand** | Friatec geplatzt 03/26 → HDPE flexibel → 29.06.26 starre Segmente | ✅ | `2026-06-wasserleitung-aussenwand` |
| **Garten** | Kirschlorbeer-Rückbau ab 30.11.25, weiter 02./08./15.03.26, Hecke gestutzt 21.02.26, Terrasse gereinigt 28.02.26, Kabelgraben 08.04.26, Beet 09.04.26, Terrassensockel saniert 10.04.26, Kirschbaum gepflanzt 14.04.26 | eigener Strang, verteilt über mehrere Monatseinträge statt einem eigenen | `2025-12-heizungs-saga`, `2026-02-rueckblick`, `2026-03-rueckblick`, `2026-04-rueckblick` |
| **Dachboden** | unangetastet | beim Kauf als Ausbaupotenzial genannt, nie wieder erwähnt | – |

---

## 4. Wasserereignis-Register

Vier verschiedene Wasserschäden. Damit sie in Texten nie verwechselt werden:

| # | Wann | Wo | Ursache | Status |
|---|---|---|---|---|
| 1 | ab Übergabe 06/25, dicht ab 22.08.25 | Gaube Kinderzimmer + Ecke Schlafzimmer | undichte Gaubenverkleidung | behoben, Innenausbau bis 07/26 |
| 2 | 04.09.25 | Bad OG | Leitung bricht beim Ausbau des Grohe-Gestells | behoben 05./06.09. |
| 3 | vermutlich 06.11.25, entdeckt Anfang Dez. 25 | Flurheizung (Rohr), betroffen: Flur OG + angrenzendes Wohnzimmer EG | vermutlich Ventiltausch durch Sanitärfirma; vier Wochen unbemerkt, als Elementarschaden gemeldet | Rohrtausch 15.12., Wohnzimmer neu verputzt 16.12., seitdem normal genutzt |
| 4 | ~15.06.26 | Kinderzimmer | ❗ **unbekannt** | Boden tw. neu aufgebaut |

---

## 5. Fakten-Register (Zahlen & Materialien mit Quelle)

Wenn eine Zahl in einem Text auftaucht, kommt sie von hier.

> Für jedes Datum, das der Nutzer seit dem 31.07.2026 nachgeliefert hat
> (Januar–März 2026, Verputz-Korrektur Dezember 2025), existiert mindestens
> ein Foto als Beleg. Die Fotos selbst sind noch nicht veröffentlicht – siehe
> Lücke L10 (Fotos).

| Fakt | Wert | Quelle / Sicherheit |
|---|---|---|
| Baujahr | 1956 | sicher |
| Beheizte Wohnfläche | 84 m² | aus Wärmepumpen-Analyse – ⚠️ prüfen, wirkt klein für 2 Etagen (siehe W4) |
| Schlackefläche OG | ~40 m² | Schlacke-Eintrag |
| Schlacke-Entsorgung | **6.902 € inkl. MwSt.** | vom Nutzer bestätigt |
| Labore | TÜV Rheinland, CRB | sicher |
| Gutachtenergebnis | kein Asbest; **PAK nachgewiesen, aber nicht meldepflichtige Menge**; Schwermetalle knapp über Schwelle; Entsorgung dennoch nach **TRGS 551** | vom Nutzer bestätigt |
| Materialbegriff Schüttung OG | „Schlacke" und „Koksschüttung" werden synonym verwendet – der exakte technische Begriff aus dem Gutachten ist auch dem Nutzer nicht bekannt | vom Nutzer bestätigt als bewusst offen, kein Widerspruch mehr |
| Betondecke EG/OG | Stahlbeton 12–14 cm | Statiker |
| Traglast gesamt | max. 250 kg/m² | Statiker |
| davon Bodenaufbau | max. 50 kg/m² | Statiker |
| Spezial-Estrich-Angebot OG | ~10.000 € | abgelehnt |
| Gewählter Aufbau | Konstruktionsholz + **Hanfdämmstreifen** + Steinwolle + OSB | vom Nutzer bestätigt (nicht Kokos) |
| Bodenbelag OG | Clickvinyl | sicher |
| Gasverbrauch | 11.464 kWh/a ≙ 136 kWh/m²a | sicher |
| Heizung | Brötje-Gaskessel, Ende 90er/Anfang 2000er, 7 Heizkörper | sicher |
| Warmwasser | separate elektrische Durchlauferhitzung | sicher |
| Vorlauftemperatur | ~60 °C | sicher |
| Strom Standard / WP-Tarif | 34 ct / 21,4 ct pro kWh | sicher |
| Gaspreis | 9,87 bzw. 8,93 ct/kWh + 19,90 €/Monat | sicher |
| Wasserleitung außen | Friatec 16 mm → HDPE-Rollrohr → starre HDPE-Segmente | sicher |
| Vorwandelement Bad OG | Grohe (verrostet) → Geberit | sicher |
| Stromkasten Flur | FI-Schutzschalter + Sicherungen komplett erneuert, 18.07.25 | vom Nutzer bestätigt |

---

## 6. Offene Widersprüche – Entscheidung nötig

Diese Punkte stehen aktuell so im Blog, wie in der Tabelle „aktuell" vermerkt.
Solange sie nicht geklärt sind, bleiben sie so.

| # | Widerspruch | Aktuell im Blog | Braucht |
|---|---|---|---|
| W1 | **Entsorgungsdatum** 18./19.08. vs. Rohnotiz „Ende August" | 18./19.08. | bestätigen |
| W2 | **„Elektrik muss komplett raus"** als Kaufpriorität. Teilweise erledigt: Stromkasten Flur am 18.07.25 erneuert. Rest des Hauses unklar | im Hauskauf-Eintrag als Ausgangszustand genannt | ist die übrige Elektrik gemacht, geplant oder verschoben? |
| W3 | **Einfachverglasung** beim Kauf genannt, nie wieder | einmalige Erwähnung | Fenstertausch Thema oder nicht? |
| W4 | **84 m² beheizte Fläche** vs. Haus mit 2 Etagen + 4 Räumen OG + Küche + 2 Bädern | 84 m² | Zahl prüfen – sie trägt die ganze Wärmepumpen-Rechnung |
| W5 | **Übergabe = Einzug?** Texte benutzen beides für den 26.06. | einheitlich „Übergabe" | wann seid ihr wirklich eingezogen? |

**Aufgelöst am 31.07.2026** (nicht mehr in dieser Liste, siehe Fakten-Register §5):
Hanf- vs. Kokosdämmstreifen (Hanf korrekt) · Schlackekosten 6.500 € vs. 6.902 €
(6.902 € korrekt) · „kein PAK" vs. TRGS 551 (beides gleichzeitig wahr: PAK in
nicht meldepflichtiger Menge, trotzdem nach TRGS 551 entsorgt) · Schlacke vs.
Koksschüttung (bewusst offene Synonymie, kein Zielkonflikt mehr).

---

## 7. Lücken – hier fehlt Kontext

Stichpunkte reichen, ich formuliere aus. Sortiert nach Wirkung auf den Blog.

### Hoch – reißt sichtbare Löcher in die Chronologie

- **L1 · Ursache des Wasserschadens im Kinderzimmer (Juni 2026).** Aktuell steht
  dort nur, dass er passiert ist. Leitung? Regen? Zusammenhang mit der
  Außenwandleitung, die zwei Wochen später platzte?

### Mittel – macht bestehende Einträge belastbarer

- **L2 · Gaube-Ecke im Schlafzimmer.** Am 08.09. befallen und geöffnet, am
  05.01. war das Zimmer „fertig dekoriert". Wann und wie wurde die Ecke saniert?
- **L3 · Bad OG komplett.** Dokumentiert ist nur WC + Fliesen. Was ist mit
  Dusche/Wanne, Waschbecken, Boden – Bestand oder auch erneuert?
- **L4 · Wände und Decken im Obergeschoss, Rest.** Schlafzimmer und Kinderzimmer
  sind jetzt geklärt. Flur und Arbeitszimmer OG: wann verputzt/gestrichen?
- **L5 · Rückbau-Details Juli 2025.** Für den Juli-Eintrag fehlen die konkreten
  Zahlen: wie viele Container, was hat die Entsorgung gekostet, wie lange hat
  der Rückbau gedauert, mit welchem Werkzeug.
- **L6 · Keller-Befund.** Warum ist der Keller feucht – was kam hinter den
  Holzwänden zum Vorschein? Das ist der Aufhänger für die ganze Abdichtung.
- **L7 · Flur EG, Zustand vor dem 16.04.26.** Der Clickvinyl-Boden ist dokumentiert,
  aber Wände/Vorzustand nie – der Raum taucht sonst nur über den Stromkasten auf.

### Niedrig – eigene Geschichten, die noch keine sind

- **L8 · Dachboden.** Beim Kauf als Ausbaupotenzial genannt. Aktueller Plan?
- **L9 · Fotos.** Nur 6 Bilder sind eingebunden (`public/altbau/`), unter
  `Hausprojekt/` liegen rund 60 unbenutzte Aufnahmen und 2 Videos. Für die
  Einträge ab September gibt es aktuell null Bilder – obwohl seit dem
  31.07.2026 für jedes neu genannte Datum mindestens ein Foto existiert.
- **L10 · Rohrtausch-Kosten Heizungs-Saga.** War es eine reine Versicherungssache
  (Elementarschaden) oder gab es einen Eigenanteil? Wie lange war die Heizung
  zwischen 07.10. und 15.12. tatsächlich beeinträchtigt?

**Aufgelöst am 31.07.2026:** Wohnzimmer nach dem 15.12.2025 (jetzt vollständig
erzählt: Elementarschaden, Rohrtausch, 16.12. neu verputzt, seitdem normal
genutzt) · Welche „zwei Zimmer im EG" wurden am 12.10. gestrichen (Auflösung:
das war ein Datierungsfehler – tatsächlich wurde am 12.10. das Schlafzimmer OG
gestrichen; Wohn- und Esszimmer EG waren bereits am 01.07. gestrichen) ·
**Februar bis Mai 2026 komplett leer** (Auflösung: alle vier Monate sind jetzt
durch `2026-02-rueckblick`, `2026-03-rueckblick`, `2026-04-rueckblick` und
`2026-05-rueckblick` gefüllt – damit hat jeder Monat von der Übergabe bis
heute mindestens einen Eintrag).

---

## 8. Wenn du etwas änderst

- **Neuer Termin:** in `timeline.ts` einsortieren → Abschnitt im passenden
  Monatseintrag ergänzen → Raum-Register hier aktualisieren.
- **Korrektur an einem Fakt:** Abschnitt 5 ändern, dann per Suche über
  `src/content/altbau/` prüfen, wo der Wert sonst noch steht.
- **Neue Erkenntnis zu einem alten Eintrag:** nicht den Fließtext umschreiben,
  sondern unten `**Nachtrag (Stand …):**` anhängen.
- **Lücke geschlossen:** Punkt in Abschnitt 6/7 streichen, damit die Liste
  ehrlich bleibt.

> Fotos: Rohmaterial unter `Hausprojekt/` (IMG-/UUID-Dateien), veröffentlicht
> unter `public/altbau/`. Bild-Platzhalter sind in `timeline.ts` mit `note`
> markiert.

// ALLEINIGE QUELLE DER WAHRHEIT für die Sanierungs-Timeline.
// Treibt den interaktiven Zeitstrahl auf /altbau und wird beim Build typgeprüft.
// Neue Termine NUR hier ergänzen (chronologisch einsortiert).
//
// `entry`  -> id eines ausführlichen Eintrags unter src/content/altbau/.
//             MUSS einem existierenden Dateinamen (ohne .md) entsprechen.
// `note`   -> interne Planungsnotiz (z. B. "Bild-Platzhalter").
//
// REGELN (siehe BAUTAGEBUCH.md für die ausführliche Fassung):
//  1. Ein Termin steht genau EINMAL hier. Kein Datum in den Blogtexten, das
//     nicht auch hier steht.
//  2. Jeder Monat mit Terminen hat genau einen Eintrag, AUSSER ein Thema ist
//     groß genug für einen eigenen (Dach, Schlacke, Statik, Heizungs-Saga,
//     Wasserleitung, Kinderzimmer).
//  3. Slug-Schema: YYYY-MM-thema, wobei YYYY-MM == Monat der pubDate.
//  4. Termine ohne `entry` sind noch nicht erzählt -> Lücke, siehe BAUTAGEBUCH.
//
// OFFEN / UNBELEGT (Details fehlen, siehe BAUTAGEBUCH.md „Offene Fragen"):
//  - Elektrik: beim Kauf als Priorität genannt. Teilweise beantwortet durch
//    den Stromkasten-Tausch im Flur (18.07.25) - ob und wann die übrige
//    Elektrik im Haus angegangen wird, ist weiter offen.
//  - Fenster/Einfachverglasung: nie wieder erwähnt.
//  - Ursache des Wasserschadens im Kinderzimmer (Juni 2026) ist unbekannt.
//
// Datierte Fakten ab dem Nachtrag vom 31.07.2026 hat der Nutzer jeweils mit
// mindestens einem Foto belegt (Rohmaterial unter Hausprojekt/, noch nicht
// alle veröffentlicht) - siehe BAUTAGEBUCH.md §5.

export type TimelineCategory =
  | 'meilenstein'
  | 'dach'
  | 'schadstoff'
  | 'boden'
  | 'kueche'
  | 'bad'
  | 'heizung'
  | 'sanitaer'
  | 'garten'
  | 'allgemein';

export interface Milestone {
  /** ISO-Startdatum YYYY-MM-DD */
  date: string;
  /** ISO-Enddatum bei Zeiträumen */
  endDate?: string;
  /** Überschreibt die Datumsanzeige (für unscharfe Angaben) */
  dateLabel?: string;
  title: string;
  category: TimelineCategory;
  /** id eines Eintrags unter src/content/altbau/ (ohne Endung) */
  entry?: string;
  /** interne Planungsnotiz, z. B. "Bild-Platzhalter" */
  note?: string;
}

export const categories: Record<TimelineCategory, { label: string; color: string }> = {
  meilenstein: { label: 'Meilenstein',   color: '#fbbf24' },
  dach:        { label: 'Dach & Gaube',  color: '#f97316' },
  schadstoff:  { label: 'Schadstoffe',   color: '#ef4444' },
  boden:       { label: 'Böden',         color: '#3b82f6' },
  kueche:      { label: 'Küche',         color: '#22c55e' },
  bad:         { label: 'Bad',           color: '#14b8a6' },
  heizung:     { label: 'Heizung',       color: '#f43f5e' },
  sanitaer:    { label: 'Sanitär & Wasser', color: '#0ea5e9' },
  garten:      { label: 'Garten & Leben', color: '#84cc16' },
  allgemein:   { label: 'Sonstiges',     color: '#94a3b8' },
};

export const milestones: Milestone[] = [
  // ── 2025 ────────────────────────────────────────────────────────────────
  { date: '2025-06-26', title: 'Schlüsselübergabe', category: 'meilenstein', entry: '2025-06-hauskauf' },
  { date: '2025-07-01', title: 'Wohn- und Esszimmer EG gestrichen', category: 'allgemein', entry: '2025-07-rueckblick' },
  { date: '2025-07-05', dateLabel: 'ab Juli 2025', title: 'Rückbau & Bestandsaufnahme: Teppich, Dielen, Tapeten, Putz raus', category: 'allgemein', entry: '2025-07-rueckblick' },
  { date: '2025-07-07', endDate: '2025-07-16', title: 'Neuer Boden in Wohn- und Esszimmer EG', category: 'boden', entry: '2025-07-rueckblick' },
  { date: '2025-07-18', title: 'Stromkasten im Flur erneuert: neue FI-Schutzschalter und Sicherungen', category: 'allgemein', entry: '2025-07-rueckblick' },
  { date: '2025-07-20', title: 'Ikea-Küche mit dem Sprinter abgeholt', category: 'kueche', entry: '2025-07-rueckblick' },
  { date: '2025-07-27', title: 'Erster Möbelaufbau im Wohnzimmer EG – Auszug aus der alten Wohnung rückt näher', category: 'allgemein', entry: '2025-07-rueckblick' },
  { date: '2025-08-01', title: 'Schüttung unter den OG-Dielen bestätigt sich als Schlacke', category: 'schadstoff', entry: '2025-08-schlacke-raus' },
  { date: '2025-08-04', endDate: '2025-08-22', title: 'Dacheindeckung durch die Dachfirma', category: 'dach', entry: '2025-08-dachsanierung' },
  { date: '2025-08-05', dateLabel: 'August 2025', title: 'Schlacke-Proben entnommen, Gutachten bei TÜV Rheinland und CRB beauftragt', category: 'schadstoff', entry: '2025-08-schlacke-raus', note: 'Genaues Datum unbelegt – laut Eintrag „während der Dacharbeiten" (04.–22.08.)' },
  { date: '2025-08-08', dateLabel: 'August 2025', title: 'Gäste-WC EG: neues WC eingebaut', category: 'bad', entry: '2025-08-bodenaufbau-og-entscheidung' },
  { date: '2025-08-11', title: 'Küche: Bodenbelag & Wandfarbe fertig, Aufbau der ersten Küchenmöbel beginnt', category: 'kueche', entry: '2025-08-bodenaufbau-og-entscheidung', note: 'Bild-Platzhalter' },
  { date: '2025-08-11', title: 'Gäste-WC EG: alte Fliesen mit Fliesenfarbe überstrichen', category: 'bad', entry: '2025-08-bodenaufbau-og-entscheidung' },
  { date: '2025-08-15', title: 'Küchenaufbau geht weiter – Möbel der Ikea-Küche werden zusammengebaut', category: 'kueche', entry: '2025-08-bodenaufbau-og-entscheidung' },
  { date: '2025-08-18', endDate: '2025-08-19', title: 'Schlacke entsorgt (Schleuse, 6.902 € inkl. MwSt. / ~40 m²)', category: 'schadstoff', entry: '2025-08-schlacke-raus' },
  { date: '2025-08-20', title: 'Tür im EG gekürzt, damit sie über den neuen Clickvinyl-Boden schließt', category: 'kueche', entry: '2025-08-bodenaufbau-og-entscheidung' },
  { date: '2025-08-21', title: 'Massiver Kleiderschrank in der alten Wohnung abgebaut, mit bebilderter Anleitung', category: 'allgemein', entry: '2025-10-rueckblick' },
  { date: '2025-08-25', title: 'Statiker gibt Bodenaufbau OG frei: Holzkonstruktion statt Estrich', category: 'boden', entry: '2025-08-bodenaufbau-og-entscheidung' },
  { date: '2025-08-27', title: 'Planung der Beseitigung des „Horror-Klos" im Bad OG', category: 'bad', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-08-28', title: 'Materialbeschaffung für Bodenaufbau: Steinwolle, Hanfdämmstreifen und mehr', category: 'boden', entry: '2025-08-bodenaufbau-og-entscheidung' },
  { date: '2025-08-29', title: 'Erste Fuhre Konstruktionsholz bei OBI gekauft', category: 'boden', entry: '2025-08-bodenaufbau-og-entscheidung' },
  { date: '2025-08-29', endDate: '2025-08-30', title: 'Erster Bodenaufbau im Flur OG, Lampe montiert', category: 'boden', entry: '2025-08-bodenaufbau-og-entscheidung', note: 'Bild-Platzhalter' },
  { date: '2025-08-31', title: 'Kellerwaschbecken: Abfluss verlängert gegen Rückstau beim Abpumpen', category: 'allgemein', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-09-02', title: 'Küche EG: Arbeitsplatte am Waschbecken verstärkt (Sollbruchstelle zu schwach)', category: 'kueche', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-09-04', title: 'Rohrbruch beim Ausbau des verrosteten Grohe-Gestells im Bad OG', category: 'bad', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-09-05', endDate: '2025-09-06', title: 'Bad OG saniert: neues Geberit-Vorwandelement, neue Fliesen', category: 'bad', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-09-06', title: 'Große Materialfuhre per Anhänger: Konstruktionsholz, OSB, Steinwolle', category: 'boden', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-09-06', endDate: '2025-09-07', title: 'Bodenaufbau Arbeitszimmer OG', category: 'boden', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-09-08', title: 'Gaube im Kinderzimmer freigelegt (Krautplatte raus), Schlafzimmer-Ecke ebenfalls betroffen, Trocknungsgerät rein', category: 'dach', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-09-13', title: 'Hängeschränke in der Küche montiert', category: 'kueche', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-09-15', title: 'Clickvinyl im Flur OG', category: 'boden', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-09-20', title: 'Clickvinyl im Arbeitszimmer OG', category: 'boden', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-09-26', endDate: '2025-09-27', title: 'Bodenaufbau Schlafzimmer OG', category: 'boden', entry: '2025-09-boeden-bad-gaube' },
  { date: '2025-09-29', title: 'Es wird kalt – Heizventilstifte fahren nicht raus', category: 'heizung', entry: '2025-12-heizungs-saga' },
  { date: '2025-10-02', title: 'Hundegarderobe gebaut', category: 'allgemein', entry: '2025-10-rueckblick' },
  { date: '2025-10-02', endDate: '2025-10-15', title: 'Clickvinyl im Schlafzimmer OG', category: 'boden', entry: '2025-10-rueckblick' },
  { date: '2025-10-04', title: 'Treppen-Rutschmatten abgerissen, Kleber gelöst', category: 'allgemein', entry: '2025-10-rueckblick' },
  { date: '2025-10-05', dateLabel: 'Oktober 2025', title: 'Gäste-WC: neue Lampe – Raum damit durch', category: 'bad', entry: '2025-10-rueckblick' },
  { date: '2025-10-07', title: 'Es wird kälter – die Heizung springt nicht an', category: 'heizung', entry: '2025-12-heizungs-saga' },
  { date: '2025-10-12', title: 'Schlafzimmer OG gestrichen', category: 'allgemein', entry: '2025-10-rueckblick' },
  { date: '2025-10-14', title: 'Feuchter Kellerraum von allen Holzwänden befreit – Keller bleibt offen zum Trocknen', category: 'allgemein', entry: '2025-10-rueckblick' },
  { date: '2025-10-18', title: 'Die Verzweiflung beim Aufbau des alten Kleiderschranks', category: 'allgemein', entry: '2025-10-rueckblick' },
  { date: '2025-10-19', title: 'Erster Schweinebraten im Ninja Woodfire im neuen Garten', category: 'garten', entry: '2025-10-rueckblick' },
  { date: '2025-11-06', title: 'Ventiltausch durch Sanitärfirma – vermutlich Ursprung des späteren Rohrschadens', category: 'heizung', entry: '2025-12-heizungs-saga' },
  { date: '2025-11-28', title: 'Erste Pizza im Ninja Woodfire', category: 'garten', entry: '2025-12-heizungs-saga' },
  { date: '2025-11-30', title: 'Die ersten Kirschlorbeere verlassen den Garten', category: 'garten', entry: '2025-12-heizungs-saga' },
  { date: '2025-12-04', dateLabel: 'Anfang Dezember 2025', title: 'Rohrschaden in der Flurheizung entdeckt – vier Wochen nach dem Ventiltausch, als Elementarschaden gemeldet', category: 'heizung', entry: '2025-12-heizungs-saga' },
  { date: '2025-12-15', title: 'Rohrtausch Flurheizung bis in den Keller – Wohnzimmer wird aufgehackt', category: 'heizung', entry: '2025-12-heizungs-saga' },
  { date: '2025-12-16', title: 'Wohnzimmer neu verputzt, wieder in normalem Gebrauch', category: 'heizung', entry: '2025-12-heizungs-saga' },

  // ── 2026 ────────────────────────────────────────────────────────────────
  { date: '2026-01-03', title: 'Bodenaufbau im Kinderzimmer – letzter Raum im OG', category: 'boden', entry: '2026-01-rueckblick' },
  { date: '2026-01-05', title: 'Schlafzimmer ist fertig dekoriert – erster komplett fertiger Raum', category: 'meilenstein', entry: '2026-01-rueckblick' },
  { date: '2026-01-26', title: 'Küche bekommt einen Fliesenspiegel aus Fliesenriemchen', category: 'kueche', entry: '2026-01-rueckblick' },
  { date: '2026-01-31', title: 'Küchenbeleuchtung unter den Hängeschränken montiert', category: 'kueche', entry: '2026-01-rueckblick' },
  { date: '2026-02-02', title: 'Küchentür: Beginn Streichen in Weiß', category: 'kueche', entry: '2026-02-rueckblick' },
  { date: '2026-02-12', title: 'Weiß gestrichene Küchentür montiert, mit schwarzen Klinken', category: 'kueche', entry: '2026-02-rueckblick' },
  { date: '2026-02-21', title: 'Erstes Mal probeweise Clickvinyl im zukünftigen Kinderzimmer verlegt', category: 'boden', entry: '2026-07-kinderzimmer-fertig' },
  { date: '2026-02-21', title: 'Hecke mit der Heckenschere gestutzt', category: 'garten', entry: '2026-02-rueckblick' },
  { date: '2026-02-28', title: 'Kärcher ausprobiert, Terrassenwegplatten gereinigt', category: 'garten', entry: '2026-02-rueckblick' },
  { date: '2026-03-02', title: 'Ein weiterer Kirschlorbeer ausgegraben', category: 'garten', entry: '2026-03-rueckblick' },
  { date: '2026-03-08', title: 'Noch ein Kirschlorbeer ausgegraben', category: 'garten', entry: '2026-03-rueckblick' },
  { date: '2026-03-12', dateLabel: 'März 2026', title: 'Wasserleitung Außenwand undicht – Friatec-Rohr geplatzt, Ersatz durch flexibles HDPE', category: 'sanitaer', entry: '2026-06-wasserleitung-aussenwand' },
  { date: '2026-03-13', title: 'Neue Hängelampe im Esszimmer EG', category: 'allgemein', entry: '2026-03-rueckblick' },
  { date: '2026-03-15', title: 'Linke Seite des Gartens: Kirschlorbeer gekürzt', category: 'garten', entry: '2026-03-rueckblick' },
  { date: '2026-04-08', title: 'Graben (~1m tief) für Strom-, Wasser- und Netzwerkkabel von rechter auf linke Gartenseite', category: 'garten', entry: '2026-04-rueckblick' },
  { date: '2026-04-09', title: 'Neues Beet angelegt, Beetkante aus beigen Trapezsteinelementen', category: 'garten', entry: '2026-04-rueckblick' },
  { date: '2026-04-10', title: 'Terrassensockel abgehauen, neu verputzt und gestrichen', category: 'garten', entry: '2026-04-rueckblick' },
  { date: '2026-04-14', title: 'Kirschbaum im Garten gepflanzt', category: 'garten', entry: '2026-04-rueckblick' },
  { date: '2026-04-16', title: 'Clickvinyl-Boden im Flur EG verlegt', category: 'boden', entry: '2026-04-rueckblick' },
  { date: '2026-05-05', title: 'Alte Leuchtstoffröhren im Keller durch LED-Röhren ersetzt', category: 'allgemein', entry: '2026-05-rueckblick' },
  { date: '2026-05-10', title: 'Alte Tapete im Kinderzimmer entfernt', category: 'dach', entry: '2026-07-kinderzimmer-fertig' },
  { date: '2026-05-28', title: 'Kinderzimmer: Beginn Feinverputz in mehreren Schichten', category: 'dach', entry: '2026-07-kinderzimmer-fertig' },
  { date: '2026-06-15', dateLabel: 'Juni 2026', title: 'Kinderzimmer verputzt – kurz darauf Wasserschaden am frischen Bodenaufbau', category: 'boden', entry: '2026-07-kinderzimmer-fertig' },
  { date: '2026-06-29', title: 'Ersatzleitung geplatzt – Umstieg auf starre HDPE-Segmente', category: 'sanitaer', entry: '2026-06-wasserleitung-aussenwand' },
  { date: '2026-07-15', dateLabel: 'Juli 2026', title: 'Wärmepumpen-Analyse: Verbrauch, Tarife, offene Fragen', category: 'heizung', entry: '2026-07-keller-und-waermepumpe' },
  { date: '2026-07-18', title: 'Kinderzimmer fertig – Obergeschoss komplett', category: 'meilenstein', entry: '2026-07-kinderzimmer-fertig' },
  { date: '2026-07-28', title: 'Erstes Angebot zur Kellerabdichtung – Nachmessen nötig', category: 'allgemein', entry: '2026-07-keller-und-waermepumpe' },
];

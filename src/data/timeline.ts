// ALLEINIGE QUELLE DER WAHRHEIT für die Sanierungs-Timeline.
// Treibt den interaktiven Zeitstrahl auf /altbau und wird beim Build typgeprüft.
// Neue Termine NUR hier ergänzen (chronologisch einsortiert). BAUTAGEBUCH.md
// enthält nur noch Planungsnotizen, keine Datumsliste mehr.
//
// `entry`  -> id eines ausführlichen Eintrags unter src/content/altbau/.
// `note`   -> interne Planungsnotiz (z. B. "Bild-Platzhalter").
//
// Offene Erzählstränge / Blog-Ideen (noch ohne ausführlichen Eintrag):
//  - Küche: 11.08. Boden/Wände, 13.09. Hängeschränke, 26.01. Fliesenspiegel
//    (Arbeitsplatten-Reparatur vom 02.09. ist im September-Rückblick erfasst).
//  - Heizungs-Saga (Rohrbruch): 29.09. Ventilstifte -> 07.10. Heizung tot ->
//    06.11. Wasserschaden durch Ventiltausch -> 15.12. Rohrtausch (Wohnzimmer
//    aufgehackt). Eigenes Thema, getrennt von der Wärmepumpen-Frage (Juli 2026).
//
// Erledigt: Gaube-Strang (Dach 22.08.2025 -> Gaube innen 08.09.2025 ->
// Kinderzimmer fertig 18.07.2026), Neuer-Boden-OG-Strang (Statiker-Entscheidung
// 25.08.2025 -> September-Rückblick -> Kinderzimmer fertig) und Horror-Klo
// Hauptbad (Planung 27.08. -> Sanierung 04.-06.09., eigener Eintrag) haben
// jetzt jeweils einen abschließenden Eintrag.

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
  { date: '2025-06-26', title: 'Schlüsselübergabe', category: 'meilenstein', entry: '2025-07-hauskauf' },
  { date: '2025-07-15', dateLabel: 'ab Juli 2025', title: 'Bestandsaufnahme & Schadstoffgutachten beauftragt', category: 'schadstoff', entry: '2025-08-ist-stand' },
  { date: '2025-08-04', endDate: '2025-08-22', title: 'Dacheindeckung durch die Dachfirma', category: 'dach', entry: '2025-08-dachsanierung' },
  { date: '2025-08-08', dateLabel: 'August 2025', title: 'Gäste-WC: neues WC eingebaut', category: 'bad' },
  { date: '2025-08-11', title: 'Küche: Boden & Wände fertig, erste Möbel stehen', category: 'kueche', note: 'Bild-Platzhalter' },
  { date: '2025-08-18', endDate: '2025-08-19', title: 'Schlacke entsorgt (Schleuse, 6.500 € / ~40 m²)', category: 'schadstoff', entry: '2025-08-schlacke-raus' },
  { date: '2025-08-25', title: 'Statiker gibt Bodenaufbau OG frei: Holzkonstruktion statt Estrich', category: 'boden', entry: '2025-08-bodenaufbau-og-entscheidung' },
  { date: '2025-08-27', title: 'Planung der Beseitigung des „Horror-Klos“ im Hauptbad', category: 'bad' },
  { date: '2025-08-29', endDate: '2025-08-30', title: 'Erster Bodenaufbau im Flur OG, Lampe montiert', category: 'boden', entry: '2025-09-weiteres', note: 'Bild-Platzhalter' },
  { date: '2025-08-31', title: 'Kellerwaschbecken: Abfluss verlängert gegen Rückstau beim Abpumpen', category: 'allgemein', entry: '2025-09-weiteres' },
  { date: '2025-09-02', title: 'Küche EG: Arbeitsplatte am Waschbecken verstärkt (Sollbruchstelle zu schwach)', category: 'kueche', entry: '2025-09-weiteres' },
  { date: '2025-09-04', title: 'Rohrbruch beim Ausbau des verrosteten Grohe-Gestells im Bad OG', category: 'bad', entry: '2025-09-hauptbad-klo' },
  { date: '2025-09-05', endDate: '2025-09-06', title: 'Bad-Toilette OG saniert: neuer Geberit-Stand, neue Fliesen', category: 'bad', entry: '2025-09-hauptbad-klo' },
  { date: '2025-09-06', endDate: '2025-09-07', title: 'Bodenaufbau Arbeitszimmer', category: 'boden', entry: '2025-09-weiteres' },
  { date: '2025-09-08', title: 'Gaube im Kinderzimmer freigelegt (alte Krautplatte raus), Wandbereich dort und in der Schlafzimmer-Ecke geöffnet, Trocknungsgerät rein', category: 'dach', entry: '2025-09-gaube-innen' },
  { date: '2025-09-13', title: 'Hängeschränke in der Küche montiert', category: 'kueche' },
  { date: '2025-09-15', title: 'Clickvinyl im Flur OG', category: 'boden', entry: '2025-09-weiteres' },
  { date: '2025-09-20', title: 'Clickvinyl im Arbeitszimmer OG', category: 'boden', entry: '2025-09-weiteres' },
  { date: '2025-09-22', dateLabel: 'September 2025', title: 'Gäste-WC: alte Fliesen mit Fliesenfarbe überstrichen', category: 'bad' },
  { date: '2025-09-26', endDate: '2025-09-27', title: 'Bodenaufbau Schlafzimmer OG', category: 'boden', entry: '2025-09-weiteres' },
  { date: '2025-09-29', title: 'Es wird kalt – Heizventilstifte fahren nicht raus', category: 'heizung' },
  { date: '2025-10-02', title: 'Hundegarderobe gebaut', category: 'allgemein' },
  { date: '2025-10-02', endDate: '2025-10-15', title: 'Clickvinyl im Schlafzimmer OG', category: 'boden', entry: '2025-09-weiteres' },
  { date: '2025-10-04', title: 'Treppen-Rutschmatten abgerissen, Kleber gelöst', category: 'allgemein' },
  { date: '2025-10-05', dateLabel: 'Oktober 2025', title: 'Gäste-WC: neue Lampe', category: 'bad' },
  { date: '2025-10-07', title: 'Es wird kälter – die Heizung springt nicht an', category: 'heizung' },
  { date: '2025-10-12', title: 'Zwei Zimmer im EG fertig gestrichen (~35 m²)', category: 'meilenstein', entry: '2025-10-zimmer-gaeste-wc' },
  { date: '2025-10-14', title: 'Feuchter Kellerraum von allen Holzwänden befreit', category: 'allgemein' },
  { date: '2025-10-18', title: 'Die Verzweiflung beim Aufbau des alten Kleiderschranks', category: 'allgemein' },
  { date: '2025-10-19', title: 'Erster Schweinebraten im Ninja Woodfire im neuen Garten', category: 'garten' },
  { date: '2025-11-06', title: 'Ventiltausch erwischt das Heizrohr im Flur – Wasserschaden', category: 'heizung' },
  { date: '2025-11-28', title: 'Erste Pizza im Ninja Woodfire', category: 'garten' },
  { date: '2025-11-30', title: 'Die ersten Kirschlorbeere verlassen den Garten', category: 'garten' },
  { date: '2025-12-15', title: 'Rohrtausch durchgeführt – Wohnzimmer wird aufgehackt', category: 'heizung' },
  { date: '2026-01-03', title: 'Bodenaufbau im Kinderzimmer', category: 'boden', entry: '2026-07-kinderzimmer-fertig' },
  { date: '2026-01-05', title: 'Schlafzimmer ist fertig dekoriert', category: 'meilenstein' },
  { date: '2026-01-26', title: 'Küche bekommt einen Fliesenspiegel', category: 'kueche' },
  { date: '2026-03-12', dateLabel: 'März 2026', title: 'Wasserleitung Außenwand undicht – Friatec-Rohr geplatzt', category: 'sanitaer' },
  { date: '2026-06-15', dateLabel: 'Juni 2026', title: 'Kinderzimmer verputzt – dann Wasserschaden am frischen Boden', category: 'boden' },
  { date: '2026-06-29', title: 'Ersatzleitung geplatzt – Umstieg auf starre HDPE-Segmente', category: 'sanitaer', entry: '2026-06-wasserleitung-aussenwand' },
  { date: '2026-07-15', dateLabel: 'Juli 2026', title: 'Wärmepumpen-Analyse: Verbrauch, Tarife, offene Fragen', category: 'heizung', entry: '2026-07-waermepumpe-frage' },
  { date: '2026-07-18', title: 'Kinderzimmer fertig – letzter Raum im OG', category: 'meilenstein', entry: '2026-07-kinderzimmer-fertig' },
  { date: '2026-07-28', title: 'Erstes Angebot zur Kellerabdichtung – Nachmessen nötig', category: 'allgemein', entry: '2026-07-keller-abdichtung-angebot' },
];

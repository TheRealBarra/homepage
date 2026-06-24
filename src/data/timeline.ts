// ALLEINIGE QUELLE DER WAHRHEIT für die Sanierungs-Timeline.
// Treibt den interaktiven Zeitstrahl auf /altbau und wird beim Build typgeprüft.
// Neue Termine NUR hier ergänzen (chronologisch einsortiert). BAUTAGEBUCH.md
// enthält nur noch Planungsnotizen, keine Datumsliste mehr.
//
// `entry`  -> id eines ausführlichen Eintrags unter src/content/altbau/.
// `note`   -> interne Planungsnotiz (z. B. "Bild-Platzhalter").
//
// Offene Erzählstränge / Blog-Ideen:
//  - Gaube: Wasserschaden seit Übergabe; außen mit dem Dach (bis 22.08.) erledigt,
//    innen erst 08.09. raus + Trocknung. Eigener Eintrag oder Teil eines Gaube-Strangs.
//  - Neuer Boden OG: Flur 29.08., Arbeitszimmer 06.09., Schlafzimmer 26.09.,
//    Kinderzimmer 03.01. – möglicher Sammeleintrag mit Statik/Gewicht als rotem Faden.
//  - Horror-Klo Hauptbad: Planung 27.08. -> Umsetzung 06.–09.09.
//  - Küche: 11.08. Boden/Wände, 13.09. Hängeschränke, 26.01. Fliesenspiegel.
//  - Heizungs-Saga: 29.09. Ventilstifte -> 07.10. Heizung tot -> 06.11. Wasserschaden
//    durch Ventiltausch -> 15.12. Rohrtausch (Wohnzimmer aufgehackt).

export type TimelineCategory =
  | 'meilenstein'
  | 'dach'
  | 'schadstoff'
  | 'boden'
  | 'kueche'
  | 'bad'
  | 'heizung'
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
  garten:      { label: 'Garten & Leben', color: '#84cc16' },
  allgemein:   { label: 'Sonstiges',     color: '#94a3b8' },
};

export const milestones: Milestone[] = [
  { date: '2025-06-26', title: 'Schlüsselübergabe', category: 'meilenstein', entry: '2025-07-hauskauf' },
  { date: '2025-07-15', dateLabel: 'ab Juli 2025', title: 'Bestandsaufnahme & Schadstoffgutachten beauftragt', category: 'schadstoff', entry: '2025-08-ist-stand' },
  { date: '2025-08-04', endDate: '2025-08-22', title: 'Dacheindeckung durch die Dachfirma', category: 'dach', entry: '2025-08-dachsanierung' },
  { date: '2025-08-11', title: 'Küche: Boden & Wände fertig, erste Möbel stehen', category: 'kueche', note: 'Bild-Platzhalter' },
  { date: '2025-08-18', endDate: '2025-08-19', title: 'Schlacke entsorgt (Schleuse, 6.500 € / ~40 m²)', category: 'schadstoff', entry: '2025-08-schlacke-raus' },
  { date: '2025-08-27', title: 'Planung der Beseitigung des „Horror-Klos“ im Hauptbad', category: 'bad' },
  { date: '2025-08-29', title: 'Erster Bodenaufbau im Flur OG', category: 'boden', note: 'Bild-Platzhalter' },
  { date: '2025-09-06', title: 'Bodenaufbau Arbeitszimmer', category: 'boden' },
  { date: '2025-09-06', endDate: '2025-09-09', title: 'Renovierung des Hauptbad-Klos', category: 'bad' },
  { date: '2025-09-08', title: 'Alte nasse Gaube innen raus, Trocknungsgerät rein', category: 'dach' },
  { date: '2025-09-13', title: 'Hängeschränke in der Küche montiert', category: 'kueche' },
  { date: '2025-09-15', title: 'Clickvinyl im Flur OG', category: 'boden' },
  { date: '2025-09-20', title: 'Clickvinyl im Arbeitszimmer OG', category: 'boden' },
  { date: '2025-09-26', title: 'Bodenaufbau Schlafzimmer OG', category: 'boden' },
  { date: '2025-09-29', title: 'Es wird kalt – Heizventilstifte fahren nicht raus', category: 'heizung' },
  { date: '2025-10-02', title: 'Clickvinyl im Schlafzimmer OG & Hundegarderobe gebaut', category: 'boden' },
  { date: '2025-10-04', title: 'Treppen-Rutschmatten abgerissen, Kleber gelöst', category: 'allgemein' },
  { date: '2025-10-07', title: 'Es wird kälter – die Heizung springt nicht an', category: 'heizung' },
  { date: '2025-10-14', title: 'Feuchter Kellerraum von allen Holzwänden befreit', category: 'allgemein' },
  { date: '2025-10-18', title: 'Die Verzweiflung beim Aufbau des alten Kleiderschranks', category: 'allgemein' },
  { date: '2025-10-19', title: 'Erster Schweinebraten im Ninja Woodfire im neuen Garten', category: 'garten' },
  { date: '2025-11-06', title: 'Ventiltausch erwischt das Heizrohr im Flur – Wasserschaden', category: 'heizung' },
  { date: '2025-11-28', title: 'Erste Pizza im Ninja Woodfire', category: 'garten' },
  { date: '2025-11-30', title: 'Die ersten Kirschlorbeere verlassen den Garten', category: 'garten' },
  { date: '2025-12-15', title: 'Rohrtausch durchgeführt – Wohnzimmer wird aufgehackt', category: 'heizung' },
  { date: '2026-01-03', title: 'Bodenaufbau im Kinderzimmer', category: 'boden' },
  { date: '2026-01-05', title: 'Schlafzimmer ist fertig dekoriert', category: 'meilenstein' },
  { date: '2026-01-26', title: 'Küche bekommt einen Fliesenspiegel', category: 'kueche' },
];

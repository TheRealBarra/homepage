/**
 * Zentrale Stammdaten der Website.
 *
 * Impressum, Datenschutzerklärung und die Meta-Tags im Layout lesen alle aus
 * dieser Datei. Die Seite ist bewusst als rein privates, nicht-gewerbliches
 * Angebot aufgesetzt (siehe impressum.astro) – dadurch entfällt die Pflicht
 * zur Angabe einer ladungsfähigen Anschrift nach § 5 DDG.
 */

/** Platzhalter-Marker. Solange ein Wert damit anfängt, gilt er als nicht gepflegt. */
const TODO = '[TODO]';

export const site = {
  url: 'https://www.fragapitz.de',
  name: 'Michael Apitz',
  title: 'Michael Apitz – IT-Leiter & Tech Insights',
  description:
    'IT-Strategie, Digitalisierung und Praxiswissen aus dem Alltag eines IT-Leiters.',
  locale: 'de_DE',

  /** Bild für Social-Media-Vorschau (relativ zu /public), 1200x630. */
  ogImage: '/og-default.jpg',

  /** Muss eine tatsächlich erreichbare Adresse sein – einzige Pflichtangabe für eine private Seite. */
  email: 'kontakt@fragapitz.de',

  /** Berufsbezeichnung. Arbeitgeber wird bewusst nicht genannt. */
  occupation: 'IT-Leiter / IT-Consultant',
} as const;

/** True, sobald die Pflichtangabe gepflegt ist. Steuert die Warnbanner. */
export const impressumIstVollstaendig = !site.email.includes(TODO);

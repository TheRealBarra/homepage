---
title: "Wann sich der Mensch wieder rechnet – und wann man nur falsch konfiguriert hat"
description: "55 % der Arbeitgeber bereuen KI-bedingte Entlassungen, ein Drittel der Rückholer zahlte mehr als es je gespart hat. Die Zahlen stimmen. Die Schlussfolgerung, die daraus gezogen wird, meistens nicht."
pubDate: 2026-08-01
tags: ["KI", "Kosten", "Automatisierung", "Personal", "Architektur", "Betrieb"]
draft: false
---

Es gibt gerade eine Erzählung, die sich schnell verbreitet: Unternehmen haben zu früh auf KI gesetzt, die Kosten sind explodiert, und jetzt lohnt sich der Mensch wieder.

Die Zahlen dahinter sind echt. Der Forrester Future-of-Work-Report 2026 kommt darauf, dass **55 % der Arbeitgeber KI-bedingte Entlassungen bereuen**. Eine Februar-Umfrage sagt, dass zwei von drei Unternehmen mit KI-bedingtem Stellenabbau bereits wieder einstellen. Ford hat über drei Jahre 350 erfahrene Ingenieure zurückgeholt, weil automatisierte Prüfsysteme Qualitätsprobleme nicht gefunden haben. Ubers CTO hatte sein KI-Budget für 2026 im April aufgebraucht.

Und dann die Zahl, an der ich hängengeblieben bin: **Rund ein Drittel derjenigen, die Stellen wieder besetzt haben, gab dafür mehr aus, als die Entlassungen ursprünglich eingespart hatten.**

Das ist der interessante Teil. Nicht dass Unternehmen zurückrudern – sondern dass ein erheblicher Teil dabei erneut draufzahlt. Wer zweimal hintereinander die teurere Option wählt, hat vermutlich beide Male nicht gerechnet.

## Es kippt nur in einem von zwei Fällen

„KI ist teurer als der Mensch" ist keine Aussage, die man pauschal prüfen kann. Es gibt zwei völlig verschiedene Szenarien, und sie verhalten sich gegensätzlich.

**Fall A – die KI unterstützt jemanden.** Ein Entwickler mit Copilot, ein Support-Mitarbeiter mit Assistenz, eine Sachbearbeiterin mit Textvorschlägen.

Rechnen wir das durch. Ein Vielnutzer mit kräftigem Verbrauch landet nach der [Umstellung auf Tokenabrechnung](/blog/ki-workflows-kosten-optimieren) bei vielleicht 200 $ im Monat. Ein Entwickler kostet in Deutschland als Arbeitgeberbrutto grob 8.000 € monatlich.

```
KI-Werkzeug:     ~185 € / Monat
Arbeitgeberbrutto: ~8.000 € / Monat
─────────────────────────────────
Anteil:            ~2 %
```

Damit sich hier „der Mensch wieder mehr lohnt", müsste das Werkzeug um den Faktor 15 bis 20 teurer werden – oder der Produktivitätsgewinn bei praktisch null liegen. Beides ist nicht der Fall. **In diesem Szenario kippt gar nichts**, und wer hier über Einsparungen redet, optimiert an der zweiten Nachkommastelle.

**Fall B – die KI ersetzt einen Prozess.** Automatisierte Vorgangsbearbeitung, Dokumentenprüfung, Code-Review im Volumen. Kein Mensch daneben, sondern ein Agent, der den Ablauf komplett übernimmt.

Hier sieht es völlig anders aus. Ein Agentenlauf über 30 Schritte kommt schnell auf **eine Million Input-Token** – weil bei jedem Schleifendurchlauf die komplette bisherige Konversation erneut mitgeschickt und erneut bezahlt wird. Auf einem Spitzenmodell sind das rund 6 bis 8 € pro Lauf, Wiederholungen nach Fehlern eingerechnet.

```
200 Läufe pro Arbeitstag × 22 Tage = 4.400 Läufe
4.400 × 7 €                        = ~30.800 € / Monat
                                   = ~370.000 € / Jahr
```

Das entspricht knapp vier voll gerechneten Stellen. **Hier kippt es sofort und deutlich.**

Die entscheidende Größe ist also nicht „KI oder Mensch". Es ist **Volumen mal Kontextlänge**. Genau die Unterscheidung, die in der Berichterstattung untergeht – und weil sie untergeht, ziehen Unternehmen aus Fall B Schlüsse, die sie auf Fall A anwenden. Oder umgekehrt.

## Die Rechnung, die vorher hätte passieren müssen

Jetzt der Teil, der die Rückhol-Welle in ein anderes Licht rückt. Nehmen wir denselben Workflow aus Fall B und ändern nichts am Prozess – nur an der Konfiguration:

- kleineres Modell, wo die Aufgabe es hergibt (Faktor 5 bis 10)
- Prompt Caching für den unveränderlichen Teil des Kontexts (Lesen kostet rund ein Zehntel)
- nicht jede Teilaufgabe agentisch lösen, die auch ein einzelner Aufruf erledigt

```
vorher:  ~7,00 € pro Lauf  →  ~30.800 € / Monat
nachher: ~0,30 € pro Lauf  →   ~1.320 € / Monat
```

Größenordnung Faktor zwanzig. Ohne dass irgendjemand wieder eingestellt werden muss, ohne Prozessänderung, ohne Qualitätsverlust an den Stellen, an denen Qualität zählt.

Das ist der Punkt: **Der Workflow war fast nie unwirtschaftlich. Die Konfiguration war es.** Wer aus einer 30.000-€-Rechnung schließt, dass KI sich nicht lohnt, hat dieselbe Rechnung gemacht wie jemand, der aus einer hohen Stromrechnung schließt, dass Licht sich nicht lohnt – ohne nachzusehen, ob irgendwo noch Glühbirnen hängen.

Und es erklärt das Drittel, das beim Zurückholen draufgezahlt hat. Zwischen „unsere KI-Kosten sind zu hoch" und „wir stellen wieder ein" fehlt ein Schritt. Der Schritt heißt nachrechnen, und er dauert einen Nachmittag.

## Warum die Schnellen ihn am schwersten gehen können

Hier wird es unangenehm, denn es trifft ausgerechnet die, die alles richtig gemacht zu haben schienen.

Wer 2024 und 2025 schnell war, hat auf dem stärksten verfügbaren Modell gebaut. Das war zu dem Zeitpunkt die vernünftige Entscheidung – man wollte nicht gegen Modellqualität debuggen, während man ohnehin gegen alles andere debuggt hat. Nur hat danach nie jemand zurückgedreht.

Dazu kommt, was in dieser Phase alles nicht entstanden ist:

- **Keine Kostenzuordnung pro Workflow.** Es gibt eine Monatsrechnung. Welcher der vierzig Abläufe sie treibt, weiß niemand.
- **Keine Dokumentation des Prozesses**, den die KI übernommen hat. Es gab ja keinen Grund mehr dafür.
- **Keine Menschen mehr**, die den manuellen Ablauf kannten. Die sind versetzt oder weg.

Das ist die eigentliche Abhängigkeit – und sie besteht nicht gegenüber dem Modellanbieter, sondern gegenüber der eigenen Undokumentiertheit. Der Modellwechsel selbst ist ein Konfigurationswert. Die Validierung dahinter ist die Arbeit: Man muss wissen, was der Workflow eigentlich leisten soll, um zu prüfen, ob das kleinere Modell es noch leistet. Genau dieses Wissen ist im Tempo verloren gegangen.

Und wer nicht validieren kann, dem bleibt tatsächlich nur die grobe Kelle: zurück auf Menschen. Nicht weil es rechnerisch stimmt, sondern weil es die einzige Option ist, die man ohne dieses Wissen noch bewerten kann.

## Die letzten sechs Prozent

Es gibt noch einen zweiten Grund für die Rückkehr, und der hat mit Kosten gar nichts zu tun.

Bei IBM hat ein KI-System im Personalbereich **94 % der Anfragen** bearbeitet. Klingt hervorragend. Die verbleibenden 6 % waren der Grund, die Einstellungen für Einsteiger 2026 zu verdreifachen.

Das ist keine Kostengeschichte, das ist eine Abdeckungsgeschichte. Die letzten Prozent eines Prozesses sind die teuersten – für das Modell in Tokens, weil es sich an schwierigen Fällen festbeißt, und für das Unternehmen in Risiko, weil genau dort die Fälle liegen, bei denen ein Fehler wehtut.

Fords 350 Ingenieure fallen in dieselbe Kategorie. Nicht: Automatisierung war zu teuer. Sondern: Automatisierung hat Qualitätsprobleme nicht gefunden, und Qualitätsprobleme im Fahrzeugbau haben eine andere Fehlerkostenklasse als ein falsch kategorisiertes Ticket.

Das ist der Punkt, an dem ein Agent eine schlechte Wahl ist – unabhängig vom Preis. Wenn Fehler nicht zuverlässig erkannt und zurückgedreht werden können, ist die Aufgabe kein Automatisierungsfall. Auch dann nicht, wenn die Tokens umsonst wären.

## Was ich daraus mitnehme

Die These „der Mensch lohnt sich wieder" ist in ihrer pauschalen Form falsch und in einer engen Form richtig. Sie stimmt dort, wo ein Prozess in hohem Volumen agentisch läuft **und** niemand die Konfiguration je angefasst hat. Sie stimmt nicht dort, wo KI einen Menschen unterstützt – da ist sie arithmetisch nicht darstellbar.

Bevor jemand über Personalentscheidungen nachdenkt, wären das die drei Fragen:

1. **Was kostet welcher Workflow?** Nicht insgesamt. Einzeln.
2. **Läuft das auf dem Modell, das es braucht** – oder auf dem, das beim Bauen am bequemsten war?
3. **Ist das überhaupt ein Automatisierungsfall?** Also: Werden Fehler erkannt, und lassen sie sich zurückdrehen?

Frage 3 hätte man vorher stellen sollen. Fragen 1 und 2 kann man heute Nachmittag beantworten.

Was mich an der ganzen Debatte am meisten stört, ist die Symmetrie der Fehler. Erst wurde KI eingeführt, weil alle KI einführten. Jetzt wird zurückgerudert, weil alle zurückrudern. In beiden Fällen ohne Rechnung. Und in beiden Fällen zahlt jemand die Differenz – beim zweiten Mal nachweislich ein Drittel der Beteiligten sogar mehr als beim ersten.

Man muss halt einmal nachrechnen. Ich weiß, ich wiederhole mich.

---

*Zahlen und Berichte: [CNBC](https://www.cnbc.com/2026/07/01/employers-who-laid-off-workers-for-ai-are-reversing-their-decisions.html), [Fast Company](https://www.fastcompany.com/91571824/the-great-ai-layoff-is-turning-into-the-great-ai-rehire), [Forbes](https://www.forbes.com/sites/terdawn-deboe/2026/05/21/companies-fired-workers-for-ai-now-they-want-them-back/), [Computer Weekly](https://www.computerweekly.com/de/feature/Ist-KI-wirklich-kostenguenstiger-als-menschliche-Arbeitskraft) und [it-daily](https://www.it-daily.net/it-management/ki/ki-kostet-mehr). Die Kostenrechnungen oben sind eigene Überschlagsrechnungen mit offengelegten Annahmen – keine gemessenen Werte aus einem konkreten Projekt.*

*Wenn jemand belastbare Zahlen aus einer echten Umstellung hat – in die eine oder andere Richtung – würde ich die gerne hören.*

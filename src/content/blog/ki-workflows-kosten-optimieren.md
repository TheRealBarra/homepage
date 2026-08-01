---
title: "Der teuerste Agent für die simpelste Aufgabe"
description: "Seit dem 1. Juni 2026 rechnet GitHub Copilot pro Token zu API-Listenpreisen ab. Damit ist jede Ineffizienz im Workflow zum ersten Mal direkt auf der Rechnung sichtbar – und die Ende August auslaufende Übergangsfrist zeigt, wie viel vorher subventioniert wurde."
pubDate: 2026-08-01
tags: ["KI", "Kosten", "GitHub Copilot", "Automatisierung", "Architektur", "Betrieb"]
draft: false
---

Seit dem 1. Juni 2026 rechnet GitHub Copilot nicht mehr in Premium Request Units ab, sondern in **GitHub AI Credits** – und die werden nach tatsächlichem Tokenverbrauch abgezogen, zu den veröffentlichten API-Preisen des jeweiligen Modells. Input, Output und gecachte Tokens zählen alle mit.

Die Grundpreise sind dabei unverändert geblieben: Pro 10 $, Pro+ 39 $, Business 19 $ pro Nutzer, Enterprise 39 $ pro Nutzer. Was sich geändert hat, ist das, was man dafür bekommt.

Und hier wird es interessant. Das monatliche Credit-Kontingent entspricht **exakt dem Grundpreis**: Wer 19 $ zahlt, bekommt 19 $ an Tokens. Wer 39 $ zahlt, bekommt 39 $. Das ist keine Preiserhöhung im klassischen Sinn – es ist das Ende der Quersubventionierung. Vorher hat eine Pauschale die Vielnutzer mitgetragen. Jetzt zahlt jeder seinen eigenen Verbrauch zum Einkaufspreis.

Wie groß diese Subvention war, verrät GitHub selbst über die Übergangsregelung: Für Juni, Juli und August 2026 gibt es erhöhte Kontingente – Business bekommt 30 $ statt 19 $, Enterprise 70 $ statt 39 $. Danach fällt beides auf Parität zurück.

**Diese Promo läuft Ende dieses Monats aus.** Wer im August mit seinem Kontingent gerade so hinkommt, hat im September rund 40 Prozent weniger zur Verfügung. Das ist der eigentliche Termin, auf den man schauen sollte.

Die Berichte aus den ersten Wochen waren entsprechend: Nutzer, die 60 Prozent ihres Monatsbudgets in zwei Stunden verbraucht haben. Ein Fünftel des Kontingents für die Analyse einer einzelnen Datei – ohne eine Zeile Code zu ändern. Geteilte Team-Pools, die abrupt leer waren, weil einer eine rechenintensive Abfrage gestartet hat.

Ich finde die Aufregung trotzdem an der falschen Stelle. Die Umstellung ist nicht die Ursache. Sie ist der Moment, in dem sichtbar wird, was vorher schon schiefstand: Die meisten KI-Workflows sind nie darauf ausgelegt worden, dass irgendwann jemand nachrechnet.

Solange die Pauschale das abgefangen hat, hat es niemanden gestört. Jetzt stört es.

## Der Faktor zehn steht in der Preisliste

Und das ist der Punkt, der die Umstellung von einer Nachricht zu einer Handlungsanweisung macht: Wenn nach API-Listenpreisen abgerechnet wird, dann ist die Modellwahl keine Qualitätsfrage mehr allein – sie steht direkt auf der Rechnung.

Die Modelle einer einzigen Familie unterscheiden sich im Preis um eine Größenordnung. Anthropic, Stand Sommer 2026, pro Million Token:

| Modell | Input | Output |
|---|---:|---:|
| Haiku 4.5 | 1 $ | 5 $ |
| Sonnet 5 | 3 $ | 15 $ |
| Opus 5 | 5 $ | 25 $ |
| Fable 5 | 10 $ | 50 $ |

Bei den anderen Anbietern sieht die Spreizung ähnlich aus. Zwischen dem kleinsten und dem größten Modell liegt **Faktor zehn** – bei Input wie bei Output.

Und jetzt die unbequeme Frage: Wie viele der Workflows, die gerade auf dem größten Modell laufen, brauchen das große Modell wirklich?

Nach meiner Erfahrung: erschreckend wenige. Was tatsächlich passiert, ist meistens das hier – man hat einmal das beste Modell genommen, weil man beim Bauen nicht gegen Modellqualität debuggen wollte. Völlig richtig in dem Moment. Nur hat danach nie jemand zurückgedreht.

Eine Ticket-Klassifikation in drei Kategorien läuft auf einem kleinen Modell genauso zuverlässig wie auf einem großen. Sie kostet dort ein Zehntel. Das ist kein Optimierungsprojekt, das ist ein geänderter String in einer Konfiguration.

## Die eigentliche Frage kommt vorher

Die Modellwahl ist aber nur der zweite Schritt. Der erste, den fast alle überspringen: **Muss das überhaupt ein Agent sein?**

Es gibt drei Stufen, und sie unterscheiden sich massiv im Preis:

1. **Ein einzelner Aufruf.** Klassifikation, Zusammenfassung, Extraktion, Übersetzung. Eine Anfrage, eine Antwort, fertig.
2. **Ein Workflow.** Mehrere Schritte, aber die Reihenfolge steht fest. Der Code kontrolliert den Ablauf, das Modell erledigt einzelne definierte Teilaufgaben.
3. **Ein Agent.** Das Modell entscheidet selbst, welche Werkzeuge es in welcher Reihenfolge benutzt, und arbeitet in einer Schleife bis es fertig ist.

Stufe 3 ist die mit Abstand teuerste – und sie ist auch die, die gerade reflexartig gewählt wird, weil "Agent" das Wort ist, das alle benutzen.

Dabei ist die Entscheidung eigentlich gut eingrenzbar. Ein Agent lohnt sich, wenn alle vier Punkte zutreffen:

- **Komplexität:** Die Aufgabe ist mehrstufig und lässt sich vorab nicht vollständig beschreiben.
- **Wert:** Das Ergebnis rechtfertigt höhere Kosten und höhere Laufzeit.
- **Machbarkeit:** Das Modell kann diese Art Aufgabe überhaupt zuverlässig.
- **Fehlerkosten:** Fehler werden erkannt und lassen sich zurückdrehen – durch Tests, Review, Rollback.

Ist einer der vier Punkte ein Nein, gehört die Aufgabe eine Stufe tiefer. "Extrahiere den Rechnungsbetrag aus diesem PDF" ist kein Agentenproblem. Das ist ein Aufruf.

## Warum Agenten überproportional teuer werden

Der Grund, warum Stufe 3 so viel teurer ist als Stufe 1, ist nicht offensichtlich – und er ist der Punkt, den ich am häufigsten erklären muss.

Ein Agent arbeitet in einer Schleife. Und bei **jedem** Durchlauf wird die gesamte bisherige Konversation erneut mitgeschickt: alle vorherigen Schritte, alle Werkzeugergebnisse, alles. Das Modell hat kein Gedächtnis zwischen den Aufrufen. Der Kontext ist das Gedächtnis, und er wird jedes Mal komplett neu bezahlt.

Eine Beispielrechnung. Ein Agent läuft 30 Schritte, startet bei 5.000 Token Kontext, und jeder Schritt legt etwa 2.000 Token drauf:

```
Schritt  1:   5.000 Token
Schritt  2:   7.000 Token
Schritt  3:   9.000 Token
...
Schritt 30:  63.000 Token
──────────────────────────
Summe:    ~1.020.000 Token Input – für einen einzigen Lauf
```

Über eine Million Input-Token. Für **eine** Aufgabe.

Auf Opus 5 sind das rund 5 € pro Lauf, nur Input. Auf Haiku etwa 1 €. Wenn dieser Agent hundertmal am Tag läuft, reden wir über den Unterschied zwischen 500 € und 100 € – täglich.

Und jetzt kommt der Teil, der wirklich weh tut: Bei einer schlecht geschnittenen Aufgabe wächst der Kontext schneller, der Agent braucht mehr Schritte, und beides multipliziert sich. Ein Agent, der 60 statt 30 Schritte braucht, kostet nicht doppelt so viel. Er kostet ungefähr das Vierfache.

## Prompt Caching ist der unterschätzteste Hebel

Wenn man sich diese Rechnung anschaut, fällt etwas auf: Der größte Teil des Kontexts ist bei jedem Durchlauf **identisch**. Der Systemprompt, die Werkzeugdefinitionen, die ersten zwanzig Schritte – all das ändert sich nicht mehr.

Genau dafür gibt es Prompt Caching. Der unveränderte Anfang des Prompts wird zwischengespeichert und kostet beim erneuten Lesen nur noch etwa **ein Zehntel** des normalen Input-Preises. Das Schreiben in den Cache kostet einmalig etwas mehr – ab dem zweiten Aufruf ist man im Plus.

Für eine Agenten-Schleife ist das kein Nice-to-have. Das ist der Unterschied zwischen wirtschaftlich und nicht wirtschaftlich, und es kostet ein paar Zeilen Konfiguration.

Der Haken – und deshalb funktioniert es bei vielen nicht: Caching ist ein Präfix-Abgleich. Ein einziges verändertes Byte am Anfang des Prompts, und alles dahinter ist ungültig. Ein `{{ $now }}` im Systemprompt, eine Request-ID, ein Zeitstempel, eine nicht sortierte JSON-Serialisierung – und der Cache greift nie. Ohne Fehlermeldung. Man zahlt einfach weiter den vollen Preis.

Wer Caching aktiviert hat, sollte einmal nachsehen, ob die Cache-Trefferquote in der Antwort tatsächlich über null liegt. Bei mir war sie es beim ersten Versuch nicht.

## Was sonst noch auf dem Tisch liegt

Drei Dinge, die schnell umgesetzt sind:

**Batch-Verarbeitung.** Alles was nicht sofort fertig sein muss – nächtliche Auswertungen, Massenklassifikation, Backfills – läuft über die Batch-Schnittstelle zum halben Preis. Die Latenz liegt bei bis zu 24 Stunden. Für einen Cronjob um drei Uhr nachts ist das vollkommen egal.

**Denktiefe steuern.** Die aktuellen Modelle haben einen Parameter dafür, wie gründlich sie nachdenken. Auf der höchsten Stufe wird deutlich mehr Rechenzeit verbraucht – und entsprechend mehr bezahlt. Für Routineaufgaben ist die niedrigste Stufe oft genauso gut. Auch das ist ein Konfigurationswert, kein Projekt.

**Modelle mischen.** Ein Workflow muss nicht durchgängig auf einem Modell laufen. Vorfilterung und Routing auf dem kleinen Modell, nur die tatsächlich schwierigen Fälle auf dem großen. Wenn 80 % der Anfragen trivial sind – und das sind sie meistens – halbiert das die Rechnung, ohne dass die Qualität dort leidet, wo sie zählt.

## Der Punkt, an dem es unangenehm wird

Alles bisher Genannte setzt eines voraus: dass man weiß, was die einzelnen Workflows kosten.

Und genau da hört es bei den meisten auf. Es gibt eine Monatsrechnung. Die ist gestiegen. Welcher der vierzig Workflows dafür verantwortlich ist, weiß niemand.

Ohne diese Zuordnung ist jede Optimierung Raten. Man dreht am Modell für den Workflow, den man zufällig im Kopf hat – während der eigentliche Kostentreiber der nächtliche Job ist, den vor acht Monaten jemand gebaut hat, der längst das Unternehmen verlassen hat.

Bei mir läuft deshalb jeder KI-Aufruf über [n8n als Kontrollschicht](/blog/n8n-als-ki-gateway). Der ursprüngliche Grund war Datenschutz – ich wollte kontrollieren, was rausgeht. Der Nebeneffekt ist, dass an derselben Stelle mitgeschrieben wird, was jeder Aufruf gekostet hat. Workflow, Modell, Token rein, Token raus, Zeitstempel.

Das war kein Geniestreich, das ist ein Nebenprodukt. Aber es ist der Unterschied zwischen "unsere KI-Kosten sind gestiegen" und "Workflow 12 verursacht 60 % der Kosten und läuft auf dem falschen Modell".

## Die Umstellung ist nicht das Problem

Wenn eine Abrechnungsumstellung ein Setup wirtschaftlich kippt, dann war der Abstand zur Wirtschaftlichkeit vorher schon dünn – er wurde nur von einer Pauschale verdeckt. Dass GitHub für drei Monate erhöhte Kontingente draufgelegt hat, ist insofern ehrlicher als jede Ankündigung: Es beziffert genau, wie groß der Puffer war, den es jetzt nicht mehr gibt.

Die gute Nachricht: In den meisten Setups liegen die Faktoren offen herum. Ein Modellwechsel dort wo er nichts kostet. Caching aktivieren und einmal prüfen ob es greift. Nachtjobs in die Batch-Verarbeitung. Und vorher die Frage, ob die Aufgabe überhaupt einen Agenten braucht.

Zusammengenommen ist das selten eine Einsparung von zehn oder zwanzig Prozent. Es ist meistens ein Faktor.

Wer das im September nicht als Überraschung erleben will, hat dafür noch genau diesen Monat. Man muss halt einmal nachrechnen. Das ist der unangenehme Teil – nicht das Ergebnis.

---

*Quellen zur Umstellung: [GitHub Blog zur Umstellung auf Usage-Based Billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/), Erfahrungsberichte der ersten Wochen u. a. bei [Borncity](https://borncity.com/blog/2026/06/03/github-drama-2-kostenexplosion-bei-copilot-seit-1-juni-2026/) und [Golem](https://www.golem.de/news/kuenstliche-intelligenz-github-copilot-stellt-preise-auf-token-basis-um-2606-209496.html).*

*Wenn jemand Zahlen aus der eigenen Praxis hat – gerade zu Caching-Trefferquoten in produktiven Agenten-Workflows – wäre ich sehr interessiert.*

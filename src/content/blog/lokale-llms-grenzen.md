---
title: "Warum lokale LLMs nicht immer die Antwort sind"
description: "Lokale Modelle sind für vieles die richtige Wahl – aber sobald mehrere Agenten parallel arbeiten, läuft man in eine harte physikalische Grenze. Eine Rechnung, die man einmal gemacht haben sollte, bevor man alles auf die eigene Hardware plant."
pubDate: 2026-07-21
tags: ["KI", "LLM", "Ollama", "Infrastruktur", "Betrieb", "Kosten"]
draft: false
---

Ich habe [an anderer Stelle](/blog/n8n-als-ki-gateway) geschrieben, dass bei mir alles was interne Daten berührt über lokal betriebene Modelle läuft. Das gilt weiterhin. Ollama läuft, es tut was es soll, und die Daten bleiben wo sie hingehören.

Trotzdem muss ich die Aussage präzisieren. Denn es gibt eine Klasse von Aufgaben, bei der lokale Modelle nicht "etwas schlechter" sind – sondern schlicht nicht funktionieren. Und das hat nichts mit Modellqualität zu tun, sondern mit Arithmetik.

## Ein Modell ist nicht ein Server

Der Denkfehler passiert früh und er ist verständlich. Man denkt sich einen LLM-Dienst wie einen Webserver: einmal aufgesetzt, dann bedient er halt Requests. Mehr Last? Etwas mehr Auslastung, vielleicht wird's langsamer, aber es läuft.

So funktioniert das nicht.

Bei einem LLM belegt nicht nur das Modell selbst Speicher, sondern **jede laufende Anfrage zusätzlich**. Der sogenannte KV-Cache hält den Zustand einer Konversation im VRAM – und der wächst mit jedem einzelnen Token im Kontext. Nicht mit der Anzahl der Requests. Mit der Länge jedes einzelnen.

Das ist der Punkt an dem parallele Agenten-Workflows kippen.

## Die Rechnung, die man einmal machen sollte

Nehmen wir ein Modell der 70B-Klasse, quantisiert auf 4 Bit. Die Gewichte allein belegen grob 40 GB. Auf einer 48-GB-Karte bleiben also rund 8 GB übrig.

Jetzt der KV-Cache. Bei einer typischen Architektur dieser Größenordnung – rund 80 Layer, Grouped-Query-Attention mit 8 KV-Heads, 128 Dimensionen pro Head, fp16 – landet man bei etwa **320 KB pro Token**. Pro Sequenz.

Rechnet man das hoch:

```
  10.000 Token Kontext  →  ca.  3,2 GB
  50.000 Token Kontext  →  ca.   16 GB
 100.000 Token Kontext  →  ca.   32 GB
```

Und zwar **pro gleichzeitig laufender Anfrage**.

Die 8 GB Restspeicher auf der 48-GB-Karte reichen damit für ungefähr 25.000 Token KV-Cache. Insgesamt. Über alle parallelen Requests hinweg. Das ist ein Agent mit mittellangem Kontext – oder vier Agenten mit sehr kurzem.

Die genauen Zahlen variieren je nach Architektur und Quantisierung, und mit fp8-KV-Cache halbiert man sie nochmal. Aber die Größenordnung stimmt, und die Größenordnung ist das Problem.

## Agenten-Workflows sind der Worst Case

Jetzt kommt der Teil, der es richtig unangenehm macht: Agentische Workflows sind exakt das Lastprofil, das diese Rechnung sprengt.

Ein Agent arbeitet in einer Schleife. Anfrage, Tool-Aufruf, Ergebnis, nächste Anfrage. Und bei **jedem** Durchlauf geht die komplette bisherige Konversation wieder mit rein – inklusive aller Tool-Ergebnisse, die sich angesammelt haben. Der Kontext wächst monoton über die Laufzeit des Agenten.

Ein Agent der 30 Schritte braucht, startet vielleicht bei 5.000 Token und liegt am Ende bei 80.000. Das ist kein Ausreißer, das ist der Normalfall bei echter Arbeit.

Fünf davon parallel, und man redet über Speicheranforderungen, die auf einer einzelnen Karte nicht darstellbar sind. Nicht "langsam". Nicht darstellbar.

Was dann passiert, hängt vom Serving-Stack ab. Ollama serialisiert – die Anfragen stehen halt Schlange, aus parallel wird sequenziell. vLLM mit Continuous Batching macht es besser, aber auch nur bis zum VRAM-Limit; danach wird evictet und neu berechnet, was Zeit kostet. In beiden Fällen bekommt man nicht das, was man wollte.

## Der zweite Grund: Werkzeugtreue

Der Speicher ist die harte Grenze. Es gibt noch eine weichere, die in der Praxis genauso weh tut.

Agentische Arbeit steht und fällt mit zuverlässigem Tool-Calling. Das Modell muss über viele Schritte hinweg korrekt strukturierte Aufrufe produzieren, Fehler aus Tool-Antworten verarbeiten und dabei den roten Faden behalten. Ein Modell, das in 95 % der Fälle ein sauberes JSON-Schema trifft, klingt gut – bis man es in eine Schleife mit 30 Schritten steckt. Dann liegt die Wahrscheinlichkeit, dass alles glattgeht, bei knapp 21 %.

Genau hier ist der Abstand zwischen lokal betreibbaren Modellen und den großen Cloud-Modellen am größten – deutlich größer als bei einer einzelnen Zusammenfassung, wo man kaum einen Unterschied sieht. Kleine Fehlerraten multiplizieren sich über die Schrittzahl. Das ist keine Meinung, das ist eine Potenzfunktion.

## Wo lokal richtig ist – und das ist viel

Damit das nicht als Absage missverstanden wird: Für das, was bei mir tatsächlich über n8n läuft, sind lokale Modelle nach wie vor die richtige Wahl.

Kategorisierung von Tickets. Strukturierte Extraktion aus Logs. Zusammenfassungen aus internen Wikis. Klassifikation, Übersetzung, Umformatierung.

Alle diese Aufgaben haben dieselben drei Eigenschaften: **ein Aufruf, kurzer Kontext, keine Schleife**. Der KV-Cache bleibt klein, die Anfrage ist nach Sekunden durch, der Speicher wird sofort wieder frei. Und wenn eine von hundert Klassifikationen danebengeht, ist das ärgerlich, aber nicht strukturell. Es gibt keine 30 Folgeschritte, die darauf aufbauen.

Dazu kommt: Genau diese Aufgaben laufen oft in hohem Volumen. Da rechnet sich die eigene Hardware, und der Datenschutzvorteil kommt gratis obendrauf.

## Die Trennlinie

Wenn ich es auf eine Faustregel eindampfen müsste:

- **Ein Aufruf, begrenzter Kontext, Ergebnis wird geprüft oder ist unkritisch** → lokal. Ohne Diskussion.
- **Schleife über mehrere Schritte, wachsender Kontext, mehrere davon gleichzeitig** → Cloud. Ebenfalls ohne Diskussion.

Der Fehler den ich zunehmend sehe, ist das Übertragen der ersten Erfahrung auf den zweiten Fall. Die Klassifikation lief lokal wunderbar, also plant man den Agenten auch lokal. Dann kauft man Hardware, stellt fest dass drei parallele Agenten sie in die Knie zwingen, und kauft mehr Hardware. Und irgendwann rechnet man aus, was die Karten inklusive Strom über drei Jahre kosten, und vergleicht das mit dem, was dieselbe Last per API gekostet hätte.

Diese Rechnung geht selten zugunsten der eigenen Hardware aus – jedenfalls nicht bei burstigen, langen Agenten-Läufen. Bei kontinuierlicher Grundlast in hohem Volumen sieht sie ganz anders aus. Auch hier gilt: nicht Ideologie, Arithmetik.

## Souveränität ist kein Alles-oder-Nichts

Der Punkt, an dem es unbequem wird: Wenn interne Daten in einem agentischen Workflow verarbeitet werden müssen, kollidieren die beiden Anforderungen frontal. Lokal geht nicht wegen der Physik. Cloud geht nicht wegen der Daten.

Dafür gibt es keine elegante Lösung, nur Handarbeit. Was bei mir funktioniert, ist die Trennung innerhalb des Workflows: Die Schritte, die tatsächlich Rohdaten sehen, laufen lokal und einzeln. Die Orchestrierung – Planung, Entscheidung über den nächsten Schritt, Zusammenführung – läuft in der Cloud, aber ausschließlich auf abstrahierten Zwischenergebnissen. Keine Rohdaten, keine Personenbezüge.

Das ist mehr Arbeit als "wir nehmen einfach Modell X". Es ist aber genau der Grund, warum bei mir überhaupt eine Kontrollschicht dazwischensitzt. Wenn n8n ohnehin entscheidet, was rausgeht, dann kann es auch entscheiden, *welches Modell* welchen Teil sieht.

## Was ich mir gewünscht hätte

Dass mir jemand die KV-Cache-Rechnung vorgerechnet hätte, bevor ich angefangen habe, über Hardware nachzudenken. Es ist eine Multiplikation mit fünf Faktoren. Man kann sie auf einer Serviette machen. Und sie beantwortet die Frage "reicht meine Karte für das was ich vorhabe?" verlässlicher als jeder Benchmark.

Der Rest ist dann die übliche Betriebsarbeit: messen, nachjustieren, feststellen dass die Realität sich nicht ans Datenblatt hält.

---

*Falls jemand parallele Agenten-Last stabil auf lokaler Hardware fährt: Ich würde ernsthaft gerne wissen, mit welchem Setup. Nicht rhetorisch gefragt.*

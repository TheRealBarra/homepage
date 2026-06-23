---
title: "Patchen oder nicht patchen – die Gretchenfrage im Enterprise-Betrieb"
description: "CVEs wollen gepatcht werden. Kompatibilitätsmatrizen sagen etwas anderes. Und irgendwo dazwischen sitzt man und liest zum dritten Mal denselben Known-Issues-Artikel."
pubDate: 2026-06-23
tags: ["Betrieb", "Citrix", "Sicherheit", "Virtualisierung", "Praxis"]
draft: false
---

Es gibt zwei Arten von IT-Verantwortlichen. Die einen patchen alles sofort. Die anderen patchen gar nichts. Beide Varianten enden im Desaster – nur zeitversetzt und aus unterschiedlichen Gründen.

Die Wahrheit liegt natürlich irgendwo dazwischen. Aber der Weg dorthin ist deutlich mühsamer als jede Patchday-Policy es suggeriert.

## Das Problem mit komplexen Stacks

Eine Citrix-Umgebung besteht nicht aus einer Komponente. Da ist der Delivery Controller, die VDAs, StoreFront, NetScaler, Provisioning Services, WEM, der Hypervisor darunter – und das alles läuft in irgendeiner Kombination zusammen, die irgendwann mal funktioniert hat und seitdem möglichst nicht angefasst wurde.

Das Problem: Jede dieser Komponenten hat eine eigene Versionslinie. Und nicht jede Kombination ist supported.

Citrix pflegt Kompatibilitätsmatrizen. Die sind gut gemeint und prinzipiell hilfreich. Aber sie beantworten nur die Frage "funktioniert das zusammen?" – nicht "funktioniert das zusammen *ohne bekannte Probleme*?" Das ist ein Unterschied.

## Der CVE-Druck

Ein neuer CVE mit CVSS Score 9.x taucht auf. NetScaler ist betroffen. Das Firmware-Update ist verfügbar. Der Sicherheitsverantwortliche will es bis Ende der Woche eingespielt haben.

Klingt vernünftig. Ist es auch.

Außer dass die neue Firmware eine veränderte TLS-Handshake-Implementierung mitbringt, die mit einer älteren StoreFront-Version unter bestimmten Bedingungen zu Session-Drops führt. Steht im Known-Issues-Artikel. Seite 4. Abschnitt 7. Den findet man meistens erst nachdem es passiert ist.

Und jetzt?

Firmware zurückrollen geht. CVE bleibt offen. StoreFront updaten geht – aber die neue StoreFront-Version läuft nur mit einem neueren Delivery Controller. Der Delivery Controller-Update braucht neue VDA-Versionen auf den Maschinen. Die neuen VDAs haben einen anderen Grafiktreiber der mit der aktuellen GPU-Passthrough-Konfiguration auf dem Hypervisor nicht zuverlässig funktioniert.

Willkommen im Dependency Hell. Population: jeder der eine Citrix-Umgebung betreibt.

## Known Issues: die ehrlichsten Dokumente der IT-Welt

Release Notes lese ich mittlerweile von hinten. Zuerst Known Issues, dann Fixed Issues, dann erst Features. Das sagt vielleicht etwas über meinen Optimismus aus.

Der Abschnitt "Known Issues" ist das ehrlichste was ein Softwarehersteller produziert. Dort steht implizit: "Wir wissen davon, wir haben es noch nicht gefixt, und wir liefern trotzdem aus." Manchmal mit Workaround, manchmal mit "wird in einer zukünftigen Version behoben", manchmal einfach: ja, das ist so.

Was mich dabei am meisten beschäftigt ist nicht der Inhalt – sondern was *nicht* drinsteht. Known Issues sind die Probleme die der Hersteller kennt und dokumentiert hat. Was ist mit den Problemen die noch niemand gemeldet hat?

## Das Erklärungs-Dilemma

Das eigentliche Problem kommt danach: die Kommunikation.

Ein Update wird eingespielt. Irgendwas funktioniert danach anders als vorher. Nicht kaputt – anders. Langsamer. Oder ein bestimmter Button ist woanders. Oder eine spezifische Kombination aus Anwendung X und Druckereinstellung Y verhält sich neu.

Und dann kommt die Frage: *"Was habt ihr da eigentlich gemacht?"*

Die technisch korrekte Antwort – "wir haben eine Sicherheitslücke mit CVSS 9.1 gepatcht, dabei hat sich das Verhalten der TLS-Renegotiation geändert, was in Kombination mit dem Legacy-Druckertreiber von 2019 zu einem veränderten Spool-Verhalten führt" – ist die richtige Antwort. Sie ist nur in etwa 0% der Fälle die Antwort die jemand hören will.

Was man wirklich hört ist: *"Früher hat das funktioniert."* Ja. Hat es.

## Was ich daraus gemacht habe

Kein Patching ohne Testumgebung. Das klingt selbstverständlich – ist es aber nicht, weil eine Testumgebung die die Produktionsumgebung wirklich abbildet Geld und Pflege kostet und beides nicht selbstverständlich zur Verfügung gestellt wird.

Zweites Prinzip: staged Rollouts. Erst eine kleine Gruppe, Ergebnisse beobachten, dann weiter. Bei 500 VDA-Nodes ist das der einzige Weg ohne Kaffeepause in der Produktion.

Drittes Prinzip: Release Notes lesen bevor jemand fragt. Nicht als Pflichtübung – sondern weil es die einzige Chance ist, das Gespräch über das was passiert ist zu führen bevor es passiert.

Das hilft nicht immer. Aber es hilft meistens mehr als gar nichts.

---

*Falls jemand eine elegantere Lösung für das Kompatibilitäts-Dilemma kennt: ich höre zu. Ernsthaft.*

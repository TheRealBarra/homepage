---
title: "Warum Zero Trust die richtige Strategie für moderne Unternehmen ist"
description: "Zero Trust ist kein Produkt, das man kaufen kann – es ist eine Denkweise. Warum dieser Paradigmenwechsel unausweichlich ist und wie eine pragmatische Einführung aussieht."
pubDate: 2024-11-15
tags: ["Security", "Zero Trust", "Strategie"]
---

In meiner Laufbahn als IT-Leiter habe ich genug Sicherheitskonzepte kommen und gehen sehen, um bei Buzzwords erstmal reflexartig die Augenbrauen hochzuziehen. Bei Zero Trust habe ich das auch getan – und mich geirrt. Es ist kein Trend, der nach drei Jahren wieder verschwindet, sondern die logische Konsequenz daraus, dass der klassische Netzwerkperimeter längst nicht mehr existiert.

## Die Burg hat keinen Burggraben mehr

Jahrelang galt: innen ist sicher, außen ist gefährlich. Diese Annahme war immer schon eine Vereinfachung. Heute ist sie einfach falsch.

Mitarbeiter arbeiten von zu Hause, vom Flughafen, vom Café. Anwendungen laufen in der Cloud. Dienstleister haben direkten Zugriff auf interne Systeme. Wer in dieser Welt noch glaubt, das Firmen-LAN sei eine vertrauenswürdige Zone, der hat die letzten zehn Jahre verschlafen.

Das Prinzip von Zero Trust passt auf einen Bierdeckel: **Never trust, always verify.** Kein Benutzer, kein Gerät, kein Dienst bekommt automatisch Vertrauen – egal von wo er kommt. Auch nicht der Geschäftsführer aus dem Eckbüro.

## Wie das in der Praxis aussieht

Die Theorie ist schnell erzählt: identitätsbasierter Zugriff statt netzwerkbasiert, jede Anfrage wird geprüft, minimale Rechte, Verschlüsselung überall. Klingt sauber. Die Umsetzung war es nicht.

Wir haben mit Identity angefangen, und das aus gutem Grund: Solange die Identitätsinfrastruktur nicht sauber ist, ist alles andere Kosmetik. Conditional Access in Entra ID, MFA für *alle* – und ja, das schließt die Geschäftsführung ein. Die Diskussion darüber war anstrengender als die technische Umsetzung. Genau dieser eine Schritt hat die Angriffsfläche mehr reduziert als alles, was danach kam.

Der zweite Schritt war Sichtbarkeit. Man kann nicht schützen, was man nicht sieht – und vorher haben wir schlicht nicht gesehen, was in der Umgebung wirklich passiert. Defender for Endpoint und Defender for Cloud Apps haben uns einen Überblick gegeben, der ernüchternd und hilfreich zugleich war.

Erst danach kamen Segmentierung und granulare Zugriffskontrolle. Schrittweise, mit zeitlich begrenzten Ausnahmen, weil eine Ausnahme die man nicht terminiert keine Ausnahme ist, sondern die neue Regel.

## Woran es wirklich hängt

Die technischen Hürden waren nicht das Problem. Das Problem war wie immer der Mensch.

Mitarbeiter verstehen Einschränkungen nicht, solange ihnen niemand das Warum erklärt. „Warum funktioniert mein altes Passwort nicht mehr?" ist keine Sabotage, sondern eine berechtigte Frage – die man besser beantwortet, bevor sie gestellt wird. Und dann sind da die Legacy-Anwendungen, die von modernen Authentifizierungsprotokollen so viel halten wie ich von Faxgeräten. Für die braucht es Kompromisse, und Kompromisse vertragen sich schlecht mit einem Prinzip, das „always verify" heißt.

Wer Zero Trust als reines Technikprojekt aufzieht, scheitert. Nicht vielleicht – sicher. Es ist ein organisatorischer Wandel, der zufällig viel Technik braucht. Und es ist nichts, das man abschließt: Es gibt kein Datum, an dem man „fertig mit Zero Trust" ist. Das ist unbequem für jeden, der gerne Projekte abhakt. Mich eingeschlossen.

---

*Hast du Fragen zu deiner eigenen Zero Trust Implementierung? Schreib mir gerne.*

## Quellen & weiterführende Links

- Microsoft: [Zero Trust Security Model](https://www.microsoft.com/en-us/security/business/zero-trust) – Übersicht des Microsoft Zero Trust-Frameworks
- NIST SP 800-207: [Zero Trust Architecture](https://csrc.nist.gov/publications/detail/sp/800/207/final) – Offizielle NIST-Publikation
- Microsoft Learn: [Zero Trust deployment guide](https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview)
- Forrester Research: *"Never Trust, Always Verify"* – Ursprüngliche Prägung des Begriffs durch John Kindervag (2010)

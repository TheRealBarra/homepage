---
title: "Cloud-Migration: Die 5 Lektionen, die ich gelernt habe"
description: "Aus der Praxis einer vollständigen Migration zu Microsoft 365 und Azure. Was ich beim nächsten Mal anders machen würde – und was definitiv funktioniert hat."
pubDate: 2024-09-03
tags: ["Cloud", "Azure", "Microsoft 365", "Migration"]
---

Cloud-Migration ist wie ein Umzug: Man unterschätzt immer den Aufwand, findet Dinge, von denen man nicht wusste, dass man sie hat – und am Ende bereut man nichts, aber man würde einiges anders machen.

Nach der x-ten vollständigen Migration einer Infrastruktur zu Microsoft 365 und Azure habe ich folgende Lektionen mitgenommen:

## Lektion 1: Das Inventar ist immer größer als gedacht

Bevor wir mit der eigentlichen Migration begannen, dachten wir, wir hätten wirklich an jedes Detail gedacht, jede noch so kleine Gruppe, GPO, und Abhängigkeit entdeckt. Aber dem war leider nicht so.

Shared Mailboxen, die niemand zuordnen konnte, aber scheinbar doch essentielle Workflows abbilden. Legacy-Anwendungen, die nur ein Mitarbeiter nutzte. Verteiler, die seit 2014 niemand mehr aktualisiert hatte. Und da steht ja noch der PC XYZ, den darf niemand anfassen, da läuft eine Geschichte drauf, den Hersteller gibts nicht mehr, die Lizenz funktioniert nur auf diesem Gerät, und das ist unabdingbar für 1x im Jahr wenn wir unseren Abschluss machen. Sonst sind wir ruiniert. 

**Mein Rat**: Beginne mindestens drei Monate vor der Migration mit einer vollständigen Bestandsaufnahme. Tools wie Microsoft Assessment and Planning (MAP) und Azure Migrate helfen enorm – aber sie ersetzen nicht die Gespräche mit den Fachbereichen, und auch bzw. grade denen, die sich nie beschweren, die einfach nur Arbeiten von morgens bis abends. Die Werkstatt oder Lagermitarbeiter, die einfach nur jeden Tag dasselbe machen, bis dasselbe nicht mehr existiert, weil irgendein IT-Futzi es wegmigriert hat.

## Lektion 2: Identitätssynchronisation frühzeitig einrichten

Aber zurück zur eigentlichen Azure Thematik. 

Azure AD Connect war unser erster und wichtigster Schritt. Kein anderer Schritt der Migration hing so sehr von einem reibungslosen Identitätsmanagement ab.

Was wir gelernt haben:

- **UPN-Suffixe** müssen bereits vor der Synchronisation korrekt sein
- **Dubletten** und verwaiste Objekte im Active Directory unbedingt vorher bereinigen
- **Pilotgruppe** von mindestens 20–30 Benutzern für 4 Wochen vor der Gesamtmigration testen

Der Aufwand für die Vorbereitung ist höher als für die eigentliche Synchronisation.

## Lektion 3: Change Management ist mindestens so wichtig wie Technik

Wir hatten die technisch sauberste Migration geplant. Was wir unterschätzt haben: (mal wieder) den menschlichen Faktor. 

Mitarbeiter, die seit 15 Jahren Outlook auf eine bestimmte Weise nutzen, wollen nicht „das neue Outlook" lernen. SharePoint statt Fileserver bedeutet: neue Zugriffskonzepte, neue Denkweise, neues Arbeiten.

Was geholfen hat:

- **Champions** in jedem Fachbereich identifizieren, die die Migration positiv begleiten
- **Schulungen** nicht als Pflichtveranstaltung, sondern als echte Hilfestellung
- **Quick Wins** sichtbar machen: „Mit der neuen Lösung können wir endlich…"

## Lektion 4: Hybrid – Phase oder Dauerzustand?

Die klassische Aussage lautet: „Hybrid ist eine Phase, kein Ziel." Das stimmt – aber nur für einen Teil der Unternehmen.

Unser Ziel war Cloud-First, nicht Cloud-Only. Alles, was sinnvoll migrierbar ist, geht in die Cloud. Legacy-Systeme, die nicht migrierbar sind, bekommen klare Ausstiegsdaten.

Aber: Das ist nicht für jedes Unternehmen der richtige Ansatz. Laut Flexera State of the Cloud Report betreiben rund 80 % der Unternehmen dauerhaft eine hybride Infrastruktur – und das bewusst. Wer CNC-Maschinen im Einsatz hat, proprietäre Herstelleranbindungen für Fertigungsanlagen im sechs- oder siebenstelligen Bereich, oder industrielle Steuerungssysteme mit herstellerspezifischen Protokollen, der wird und soll nicht alles in die Cloud verschieben. Hier ist Hybrid keine Übergangslösung, sondern die richtige Architekturentscheidung.

Der Unterschied liegt im **Warum**: Hybrid als bewusste, dokumentierte Strategie – mit klaren Zuständigkeiten, Security-Konzepten für beide Welten und definierter Governance – ist legitim und oft die einzig sinnvolle Option. Hybrid als Ergebnis von Aufschieberitis und fehlender Planung hingegen erzeugt dauerhaft Komplexität ohne Mehrwert.

> „Nicht Cloud-Only ist das Ziel, sondern die richtige Lösung für den jeweiligen Anwendungsfall – manchmal ist das die Cloud, manchmal On-Premise, meistens beides."

## Lektion 5: Security von Anfang an mitdenken

Wir haben Security nicht nachgelagert, sondern als integralen Bestandteil der Migration betrachtet. Das bedeutete:

- **Conditional Access Policies** bereits in der Pilotphase aktiviert
- **MFA** für alle Benutzer vor dem Go-Live verpflichtend
- **DLP-Policies** bereits während der Datenmigration konfiguriert
- **Microsoft Secure Score** als Steuerungsinstrument genutzt

Das hat initialen Mehraufwand bedeutet, uns aber viele Nacharbeiten erspart.

## Gesamtfazit

Cloud-Migration ist kein IT-Projekt – es ist ein Unternehmensprojekt. Wer sie allein in der IT-Abteilung verantwortet, hat schon verloren. Wer früh das Management einbindet, die Fachbereiche abholt und Security als Enabler positioniert, wird erfolgreich sein.

Die Cloud ist nicht das Ziel. Agilität, Skalierbarkeit und Sicherheit sind das Ziel – die Cloud ist das Werkzeug.

---

*Du stehst vor einer ähnlichen Migration? Ich teile gerne detailliertere Erfahrungen.*

## Quellen & weiterführende Links

- Microsoft Learn: [Cloud Adoption Framework – Migrate](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/)
- Microsoft Learn: [Microsoft Assessment and Planning Toolkit](https://learn.microsoft.com/en-us/previous-versions/bb977556(v=technet.10))
- Microsoft Learn: [Azure Migrate](https://learn.microsoft.com/en-us/azure/migrate/migrate-services-overview)
- Microsoft: [Microsoft 365 Migration Guide](https://learn.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-overview)
- Microsoft: [Microsoft Secure Score](https://learn.microsoft.com/en-us/microsoft-365/security/defender/microsoft-secure-score)

---
title: "Cloud-Migration: Die 5 Lektionen, die ich gelernt habe"
description: "Aus der Praxis einer vollständigen Migration zu Microsoft 365 und Azure. Was ich beim nächsten Mal anders machen würde – und was definitiv funktioniert hat."
pubDate: 2024-09-03
tags: ["Cloud", "Azure", "Microsoft 365", "Migration"]
---

Cloud-Migration ist wie ein Umzug: Man unterschätzt immer den Aufwand, findet Dinge, von denen man nicht wusste, dass man sie hat – und am Ende bereut man nichts, aber man würde einiges anders machen.

Nach der vollständigen Migration unserer Infrastruktur zu Microsoft 365 und Azure habe ich folgende Lektionen mitgenommen:

## Lektion 1: Das Inventar ist immer größer als gedacht

Bevor wir mit der eigentlichen Migration begannen, dachten wir, wir hätten einen guten Überblick über unsere IT-Landschaft. Wir hatten ihn nicht.

Shared Mailboxen, die niemand kannte. Legacy-Anwendungen, die nur ein Mitarbeiter nutzte. Verteiler, die seit 2014 niemand mehr aktualisiert hatte.

**Mein Rat**: Beginne mindestens drei Monate vor der Migration mit einer vollständigen Bestandsaufnahme. Tools wie Microsoft Assessment and Planning (MAP) und Azure Migrate helfen enorm – aber sie ersetzen nicht die Gespräche mit den Fachbereichen.

## Lektion 2: Identitätssynchronisation frühzeitig einrichten

Azure AD Connect war unser erster und wichtigster Schritt. Kein anderer Schritt der Migration hing so sehr von einem reibungslosen Identitätsmanagement ab.

Was wir gelernt haben:

- **UPN-Suffixe** müssen bereits vor der Synchronisation korrekt sein
- **Dubletten** und verwaiste Objekte im Active Directory unbedingt vorher bereinigen
- **Pilotgruppe** von mindestens 20–30 Benutzern für 4 Wochen vor der Gesamtmigration testen

Der Aufwand für die Vorbereitung ist höher als für die eigentliche Synchronisation.

## Lektion 3: Change Management ist mindestens so wichtig wie Technik

Wir hatten die technisch sauberste Migration geplant. Was wir unterschätzt haben: den menschlichen Faktor.

Mitarbeiter, die seit 15 Jahren Outlook auf eine bestimmte Weise nutzen, wollen nicht „das neue Outlook" lernen. SharePoint statt Fileserver bedeutet: neue Zugriffskonzepte, neue Denkweise, neues Arbeiten.

Was geholfen hat:

- **Champions** in jedem Fachbereich identifizieren, die die Migration positiv begleiten
- **Schulungen** nicht als Pflichtveranstaltung, sondern als echte Hilfestellung
- **Quick Wins** sichtbar machen: „Mit der neuen Lösung können wir endlich…"

## Lektion 4: Hybrid ist eine Phase, kein Ziel

Viele Unternehmen bleiben dauerhaft in einem hybriden Zustand – halb On-Premise, halb Cloud. Das erhöht Komplexität und Betriebsaufwand dauerhaft.

Unser Ziel war von Anfang an: Cloud-First, nicht Cloud-Only. Alles, was sinnvoll migrierbar ist, geht in die Cloud. Legacy-Systeme, die nicht migrierbar sind, werden mit klaren Ausstiegsdaten versehen.

> „Ein guter Migrationsplan hat Endpunkte – kein dauerhaftes ‚Irgendwie beides'."

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

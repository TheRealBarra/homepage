---
title: "SSO in Citrix ohne FAS-Server: Was Citrix & Microsoft hier gerade verändern"
description: "Der Federated Authentication Service war jahrelang die einzige saubere Lösung für SSO in Citrix-Umgebungen mit modernen Identity Providern. Das ändert sich – und wie."
pubDate: 2026-01-26
tags: ["Citrix", "SSO", "Security", "Microsoft Entra", "UniconOS"]
---

Wer eine Citrix-Umgebung betreibt, die mit einem modernen Identity Provider wie Microsoft Entra ID (ehemals Azure AD) zusammenspielt, kennt das Thema FAS. Der Federated Authentication Service ist seit Jahren die Standardantwort auf eine unbefriedigende Frage: Wie bekommt ein Benutzer, der sich per SAML oder OIDC an einem IdP authentifiziert hat, trotzdem nahtlos ein Kerberos-Ticket für seinen Windows-Desktop in Citrix?

Die Antwort war immer: FAS-Server aufbauen, CA konfigurieren, Zertifikate ausstellen, Hochverfügbarkeit sicherstellen. Aufwand hoch, Fehlerquellen viele, Betriebskomplexität erheblich.

Das Modell ändert sich gerade grundlegend.

## Warum FAS überhaupt existiert

Um das Neue zu verstehen, muss man das Alte kennen. Das klassische Problem:

1. Benutzer authentifiziert sich per SAML/OIDC gegen Entra ID → Token
2. Citrix StoreFront oder Workspace nimmt das Token entgegen
3. Der VDA (Windows-Desktop/App-Server) erwartet aber Kerberos
4. Diese Protokolllücke schließt FAS: Er stellt im Hintergrund kurzlebige Benutzerzertifikate aus, die für die Windows-Anmeldung verwendet werden

Das funktioniert – aber es ist eine aufwändige Infrastruktur, die administriert, überwacht und hochverfügbar betrieben werden muss. In komplexen Umgebungen ist FAS-Ausfall gleichbedeutend mit Citrix-Ausfall.

## Der neue Ansatz: Continuous Identity am Endpoint

Was Citrix zusammen mit der UNICON-Integration jetzt vorantreibt, dreht das Konzept um. Statt die Protokolllücke im Backend zu schließen, wird sie am Endpoint bereits vermieden.

**UniconOS** (ehemals eLux) authentifiziert den Benutzer direkt am Gerät per SAML oder OpenID Connect gegen den Identity Provider – in vielen Umgebungen Microsoft Entra ID. Die Identität ist damit am Endpoint bereits etabliert. Wenn das Gerät dann Citrix DaaS startet, wird diese bereits validierte Identität weitergereicht – ohne weitere Authentifizierungsschritte, ohne FAS-Zertifikatsinfrastruktur.

Das Ergebnis: **Sign in once, get more done.** Der Benutzer meldet sich einmal an – am Gerät. Alles Weitere – Workspace, SaaS-Apps, Browser-Sessions – läuft unter dieser einen Identität weiter.

## Was das in der Praxis bedeutet

Ich habe das Modell in einer Pilotumgebung getestet und die Unterschiede sind spürbar:

**Für den Benutzer**: Kein doppelter Login mehr. Das war immer eine der häufigsten Frustrationquellen – erst Windows (oder eLux), dann nochmal Citrix Workspace-Credentials. Das entfällt.

**Für den Administrator**: Kein FAS-Server mehr, kein internes PKI-Setup für Citrix-Zertifikate, keine Hochverfügbarkeitsplanung für einen weiteren Service. Die Identity Policy liegt komplett beim IdP – zentral, auditierbar, bekannt.

**Für die Security**: Die Authentifizierung läuft über MFA und Conditional Access des IdP. Kein Ausweichpfad, keine lokale Policy, die vergessen werden könnte. Compliance-seitig ist das sauberer als jedes FAS-Setup.

## Einschränkungen und Realität

Ehrlichkeit ist wichtig: Das neue Modell funktioniert nicht in allen Szenarien ohne Weiteres.

- **On-Premise CVAD mit klassischem StoreFront**: Hier bleibt FAS weiterhin relevant. Die FAS-Alternative greift primär in Cloud/DaaS-Szenarien mit UniconOS-Endpoints.
- **Shared Workstations**: Geräte, die sich mehrere Benutzer teilen (Kliniken, Produktion), brauchen zusätzliche Lösungen wie Imprivata-Badge-Authentifizierung – UniconOS unterstützt das.
- **Gemischte Endpoint-Landschaften**: Wer neben UniconOS auch Windows-Endpoints betreibt, braucht für letztere weiterhin eine FAS-Lösung oder setzt auf Workspace-basierte Authentifizierung.

## Meine Einschätzung

FAS wird nicht über Nacht verschwinden – dafür gibt es zu viele On-Premise-Umgebungen, die davon abhängen. Aber die Richtung ist klar: Citrix und Microsoft bauen gemeinsam an einem Modell, das Identität am Endpoint beginnt und durchgehend trägt, ohne Protokollbrücken im Backend.

Für Unternehmen, die Citrix DaaS mit Microsoft Entra ID betreiben und UniconOS-Endpoints einsetzen oder einsetzen wollen, ist das heute schon praktisch umsetzbar. Der Aufwand für FAS-Infrastruktur entfällt – und das ist keine Kleinigkeit.

> „Die beste Infrastruktur ist die, die man nicht mehr betreiben muss."

---

*Du betreibst FAS in deiner Umgebung und überlegst, ob der Wechsel Sinn macht? Schreib mir – ich teile gerne konkrete Erfahrungen aus der Praxis.*

## Quellen & weiterführende Links

- Citrix Blog (Januar 2026): [Sign in once, get more done: Why continuous identity is a strategic advantage](https://www.citrix.com/blogs/2026/01/26/sign-in-once-get-more-done-why-continuous-identity-is-a-strategic-advantage/)
- Citrix Docs: [Federated Authentication Service (FAS)](https://docs.citrix.com/en-us/federated-authentication-service)
- Citrix Tech Zone: [Secure Authentication with Citrix UniconOS](https://community.citrix.com/techzone-blogs/citrix-unicon/sign-in-once-get-more-done-secure-authentication-with-citrix-unicon-os/)
- Microsoft Learn: [Was ist Microsoft Entra ID?](https://learn.microsoft.com/de-de/entra/fundamentals/whatis)
- Microsoft Learn: [Conditional Access](https://learn.microsoft.com/de-de/entra/identity/conditional-access/overview)

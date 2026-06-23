---
title: "SSO in Citrix ohne FAS-Server: Nah dran, aber noch nicht da"
description: "Der FAS-Server war jahrelang die einzige Antwort auf SSO in Citrix mit Entra ID. Das soll sich ändern – und es wird sich ändern. Nur wann genau ist eine andere Frage."
pubDate: 2026-01-26
tags: ["Citrix", "SSO", "Security", "Microsoft Entra", "UniconOS"]
---

Wer schon mal einen FAS-Server aufgebaut hat, weiß: Es funktioniert. Es ist nur unnötig komplex für das was es tut. Eine interne CA, kurzlebige Benutzerzertifikate, Hochverfügbarkeit für einen Service den eigentlich niemand sehen soll – alles damit ein Benutzer nicht zweimal sein Passwort eingeben muss.

Die gute Nachricht: Die Richtung stimmt. Citrix und Microsoft arbeiten an etwas Besserem.

Die ehrliche Nachricht: Wir sind noch nicht da.

## Warum FAS überhaupt existiert

Das klassische Problem in zwei Sätzen: Benutzer authentifiziert sich per SAML/OIDC gegen Entra ID. Der Windows-Desktop dahinter will aber Kerberos. Das sind zwei verschiedene Welten und FAS ist die Brücke dazwischen – funktioniert, aber es ist eben eine Brücke die man bauen, warten und hochverfügbar halten muss.

FAS-Ausfall ist in vielen Umgebungen gleichbedeutend mit Citrix-Ausfall. Das ist kein gutes Verhältnis für eine Komponente die eigentlich nur Protokolllücken überbrücken soll.

## Der Ansatz mit UniconOS – und warum er nicht für alle reicht

Was Citrix zusammen mit UniconOS (ehemals eLux) vorantreibt: Authentifizierung direkt am Endpoint, via SAML oder OIDC gegen Entra ID – und diese Identität wird dann weitergereicht ohne weitere Credentials. Sign in once, get more done.

In der Theorie: elegant. In der Praxis: es hängt sehr davon ab was man betreibt.

Die Voraussetzungen für einen wirklich nahtlosen SSO-Betrieb sind nicht trivial:

- **RDS 2025** als Plattform – wer noch auf älteren Windows-Server-Versionen sitzt, hat ein Problem
- **Azure AD Joined bzw. Hybrid Joined** – reine On-Premise-Domain-Joined-Maschinen spielen da nicht sauber mit
- **Citrix Workspace App** als Client – nicht StoreFront-nativer Browser-Zugang

Und hier wird's für viele bestehende Umgebungen unangenehm: **StoreFront-Integration für SSO gibt es nicht.** Die klassische StoreFront-basierte Delivery, auf die viele seit Jahren aufgebaut haben, wird in diesem neuen Modell nicht seamless unterstützt. Kein natives SSO in StoreFront gegen Entra ID ohne FAS.

Das ist kein kleines Detail. Das ist für einen Großteil der On-Premise-CVAD-Betreiber der Showstopper.

## Die unbequeme Wahrheit

Ich warte seit Jahren auf eine saubere Lösung die mir erlaubt, Benutzer in non-persistente VDIs zu bringen die über M365 und Entra ID authentifiziert sind – seamless, ohne FAS-Infrastruktur, ohne doppelten Login, ohne Workarounds.

Wir sind näher dran als vor zwei Jahren. Aber "näher dran" ist kein produktionsreifer Zustand.

Was in der Praxis heute geht: UniconOS-Endpoints in DaaS-Umgebungen mit vollständig Cloud-basierter Identity. Was in der Praxis für viele Unternehmen noch nicht geht: Das gleiche für On-Premise CVAD, gemischte Endpoint-Landschaften oder StoreFront-basierte Deployments.

Der Weg von "FAS läuft und tut seinen Job" zu "kein FAS mehr nötig" ist länger als die Blogposts der Hersteller suggerieren.

## Was ich trotzdem mitnehme

Für Neuumgebungen oder DaaS-Rollouts mit UniconOS-Endpoints: Heute schon sinnvoll evaluieren. Die Einsparung an Infrastruktur und Betriebsaufwand durch wegfallende FAS-Server ist real.

Für bestehende On-Premise-Umgebungen mit StoreFront und gemischten Clients: FAS bleibt vorerst. Wer jetzt umbaut, baut zu früh.

Und die StoreFront-SSO-Integration die eigentlich kommen sollte? Die steht auf meiner persönlichen "Show me it's real"-Liste. Bis dahin lese ich die Release Notes.

> „Die beste Infrastruktur ist die, die man nicht mehr betreiben muss. Wir arbeiten dran."

---

*Betreibst du FAS in deiner Umgebung und überlegst ob der Wechsel Sinn macht? Schreib mir – ich teile gerne was ich bisher gesehen habe.*

## Quellen & weiterführende Links

- Citrix Blog (Januar 2026): [Sign in once, get more done: Why continuous identity is a strategic advantage](https://www.citrix.com/blogs/2026/01/26/sign-in-once-get-more-done-why-continuous-identity-is-a-strategic-advantage/)
- Citrix Docs: [Federated Authentication Service (FAS)](https://docs.citrix.com/en-us/federated-authentication-service)
- Citrix Tech Zone: [Secure Authentication with Citrix UniconOS](https://community.citrix.com/techzone-blogs/citrix-unicon/sign-in-once-get-more-done-secure-authentication-with-citrix-unicon-os/)
- Microsoft Learn: [Was ist Microsoft Entra ID?](https://learn.microsoft.com/de-de/entra/fundamentals/whatis)
- Microsoft Learn: [Conditional Access](https://learn.microsoft.com/de-de/entra/identity/conditional-access/overview)


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

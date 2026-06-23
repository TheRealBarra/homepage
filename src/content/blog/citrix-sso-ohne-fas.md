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


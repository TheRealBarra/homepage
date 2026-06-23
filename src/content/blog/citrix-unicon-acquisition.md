---
title: "Citrix kauft UNICON: Was das für eLux- und Scout-Nutzer bedeutet"
description: "Citrix hat UNICON übernommen – eLux heißt jetzt UniconOS, Scout heißt UniconOS Management. Was sich ändert, was bleibt und warum das strategisch mehr als eine Umbenennung ist."
pubDate: 2025-11-20
tags: ["Citrix", "UniconOS", "Endpoint Management", "DaaS"]
---

Wer in Citrix-Umgebungen mit Thin Clients oder repurposed Hardware arbeitet, kennt UNICON. Das deutsche Unternehmen hat mit eLux und Scout seit Jahren eine der ausgereiftesten Lösungen für Endpoint-OS-Management im Citrix-Umfeld gebaut. Seit Ende 2025 gehört UNICON offiziell zu Citrix – und das ändert einiges.

## Was ist passiert?

Citrix (heute Teil der Cloud Software Group) hat UNICON akquiriert und die Produktlinie direkt in das eigene Portfolio integriert:

- **eLux** → jetzt **UniconOS**: Ein schlankes, gehärtetes Linux-Betriebssystem, das direkt in Citrix DaaS bootet
- **Scout** → jetzt **UniconOS Management**: Die zentrale Management-Konsole, jetzt auch als Cloud-Variante verfügbar

Die Produkte selbst haben sich nicht grundlegend verändert – aber die Integration in das Citrix-Ökosystem ist jetzt nahtlos, und das hat praktische Konsequenzen.

## Warum macht das strategisch Sinn?

Ich beobachte das Thema seit Jahren, und die Übernahme war eigentlich nur eine Frage der Zeit. Citrix wollte schon lange ein eigenes, kontrolliertes Endpoint-OS – keinen Drittanbieter, der unabhängig agiert. Mit UNICON bekommt Citrix:

1. **Vertikale Integration**: Vom Endpoint-OS bis zur App-Delivery alles aus einer Hand
2. **Windows 10 EOL als Timing-Argument**: Windows 10 ist im Oktober 2025 End of Support gegangen – UniconOS ist die günstigste Antwort auf das Hardware-Refresh-Problem
3. **IGEL-Marktanteil**: IGEL OS 11 ist seit Dezember 2025 End-of-Maintenance. Citrix positioniert UniconOS direkt als Alternative

## Was UniconOS konkret leistet

Ich habe UniconOS (damals noch eLux) in mehreren Projekten eingesetzt und kenne die Stärken:

**Sicherheit by Design**: Das OS ist write-protected, bootet von einem read-only Image, unterstützt Full Disk Encryption und TPM 2.0. Silent Updates halten die Endgeräte always-compliant, ohne dass ein Benutzer eingreifen muss.

**Hardware-Lebensdauer verlängern**: Alte PCs und Laptops werden zu vollwertigen Thin Clients repurposed. Die versprochene Kostenersparnis von über 35% im Vergleich zu Hardware-Refresh ist in der Praxis realistisch – ich habe Geräte mit 8 Jahren Alter noch problemlos in Betrieb.

**Boot-to-DaaS**: Das Gerät bootet direkt in den Citrix Workspace, ohne lokales Windows. Für Szenarien mit hohem Sicherheitsbedarf oder reguliertem Umfeld (Healthcare, Finance) ist das ideal.

**UniconOS Management Cloud**: Seit Juni 2026 gibt es den Management-Server auch als Citrix-managed Cloud-Service. Wer keine eigene Scout-Infrastruktur betreiben will, kann das Management komplett auslagern.

## Was das für bestehende eLux/Scout-Umgebungen bedeutet

Die Migrationspfade sind klar kommuniziert:

- Bestehende eLux-Lizenzen bleiben gültig, Migration auf UniconOS-Branding ist ein Update-Vorgang
- Scout-Instanzen können weiter lokal betrieben werden (Local Mode) oder in den Cloud Mode migriert werden
- UniconOS ist in vielen Citrix Enterprise-Entitlements bereits enthalten – Lizenzkosten prüfen, eventuell zahlt man doppelt

**Mein Fazit**: Die Übernahme ist für UNICON-Nutzer eine gute Nachricht. Das Produkt bekommt mehr Ressourcen, bessere DaaS-Integration und einen direkten Draht zur Citrix-Roadmap. Die Umbenennung ist Kosmetik – die Substanz ist geblieben.

---

*Du betreibst noch eLux/Scout im klassischen Setup? Gerne tausche ich mich über Migrationserfahrungen aus.*

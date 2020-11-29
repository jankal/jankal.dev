# Technisches SEO: Die wichtigsten Rankingfaktoren Teil 2

Weitere Beiträge dieser Serie:

* [Technisches SEO: Die wichtigsten Rankingfaktoren Teil 1](https://zeraton.de/blog/technisches-seo-die-wichtigsten-rankingfaktoren-teil-1)
* [Modernes SEO: Ranking nach Keyword-Clustern](https://zeraton.de/blog/modernes-seo-ranking-nach-keyword-clustern)

Durch Suchmaschinenoptimierung, auch SEO genannt, optimieren Sie die Sichtbarkeit Ihrer Website in den Suchergebnisseiten (auch SERPs genannt). Eine sehr große Rolle spielen dabei natürlich die Inhalte auf Ihrer Seite. Allerdings hilft aller Inhalt nichts, wenn Google mit der Seite an sich nicht viel anfangen kann.

## robots.txt und Meta-Robots

Die `robots.txt`-Datei kann genutzt werden, um festzulegen, welche Seiten von Suchmaschinen-Bots betreten werden dürfen, oder eben nicht. Die Datei muss zwingend im Wurzelverzeichnis der (Sub-)Domain Ihrer Website abgelegt werden. Heißt Ihre Seite `rasenmaeher.de`, so muss die robots.txt über `https://rasenmaeher.de/robots.txt` erreichbar sein. In Ihr werden Regeln für die Crawling-Bots wie folgt festgelegt:

```
Sitemap: https://zeraton.de/sitemap.xml
User-Agent: *
Disallow: /privat/
Allow: /privat/123.html
```

* **Sitemap**: Eine Sitemap listet alle einzelnen Seiten einer Website auf. Sie kann hier referenziert werden, oder aber auch über die Search-Console eingereicht werden
* **User-Agent** legt fest, für welche Bots die folgenden Anweisungen gelten. Hier: alle Bots.
* **Disallow** verbietet das betreten des Verzeichnisses `/privat/` der Website durch einen Bot
* **Allow** legt nun fest, dass die Seite `/privat/123.html` explizit von Bots aufgerufen werden darf, obwohl das Verzeichnis `/privat/` eigentlich gesperrt ist

Innerhalb einer `robots.txt` lassen sich auch Einstellungen für verschiedene Suchmaschinen treffen, wobei zuerst die `User-Agent: *`-Einstellungen festgelegt werden sollten. Hier ein Beispiel:

```
User-Agent: *
Allow: *
User-Agent: google
Disallow: /google-verboten/
User-Agent: google-news
Disallow: /google-news-verboten/
```

Bei `Disallow`- oder `Allow`-Anweisungen können auch so genannte "Wildcards" innerhalb des Arguments eingesetzt werden. Zum Beispiel so:

```
User-Agent: *
Disallow: /fsk18/*.mp4
```

Das Sternchen steht hier für alle möglichen Dateinamen vor der Endung `.mp4`.

## Duplicate Content

Es reicht aus, dass eine Seite unter mehreren URLs (also Internetadressen) erreichbar ist. Sobald Google auf zwei verschiedene Seiten mit anderweitig gleichem Inhalt stößt, ist erstmal nicht klar, welche URL nun in den Suchergebnissen für relevante Keywords ranken soll. Dies kann schnell dazu führen, dass beide URLs indexiert werden und sich dann einen Ranking-Kampf liefern. Die andere Option wäre, dass keine von beiden Seiten indexiert wird. Egal wie: Ihre Seite wird nicht wirklich sichtbar in den Suchergebnissen. Das Selbe passiert übrigens auch, wenn Inhalte von anderen Seiten (auch intern) kopiert und wiederverwendet werden.

Um zumindest das Problem on mehreren URLs für eine Seite aus SEO-Sicht anzugehen, empfiehlt sich das Setzen eines Canonical-Tags im Format

```html
<link rel="canonical" href="https://zeraton.de/die-seite-fuer-google" />
```

Dieser Tag weist Google nun an, die genannte Seite zu indexieren und so nur eine der beiden Seiten in den Index aufzunehmen.

## URL-Parameter

URL-Parameter knüpfen direkt an das oben beschriebene Problem des Duplicate Content an. In Online-Shops zum Beispiel bestehen häufig Filtermöglichkeiten, um nur bestimmte Produkte anzuzeigen oder die Produktliste nach einem bestimmten Schema zu sortieren. Allerdings passiert bei der Indexierung durch Google häufig folgendes: Google folgt allen Links und somit allen erdenklichen Filtermöglichkeiten. Dies führt gerne mal zu massig vielen URLs für ein und dieselbe Produktliste. Dies lässt sich einerseits durch den oben genannten Canoical-Tag beheben, andererseits kann man Google auch über die Search Console mitteilen, welche Parameter wie zu verstehen sind. Eine weitere Möglichkeit, von der wir allerdings abraten, wäre das aufführen der Filter-Seiten in der `robots.txt`.

## Paginierung

Paginierung bezeichnet das verteilen von Seiteninhalt (beispielsweise einer Produktliste) auf mehrere Seiten, um die Ladezeit zu steigern bzw. nicht zu viele Ergebnisse auf ein Mal laden zu müssen. Dabei gibt es am Ende der Seite meist einen Link zur nächsten Seite, auf welcher es weiter geht. Früher war das noch problematischer, doch heute reicht es aus, `rel="prev"`- und `rel="next"`-Links im Head der Seiten anzugeben. Noch nicht mal das ist unbedingt notwendig, da Google inzwischen in vielen Fällen sogar von alleine auf die Beziehungen unter den Seiten kommt. Trotzdem würden wir das Setzen der Tags im Format

```html
<link rel="next" href="https://zeraton.de/blog?s=2" />
```

durchaus empfehlen. 

## Ranking von mehrsprachigen Websites

Beim Ranking von mehrsprachigen Websites sollte man den Suchmaschinen Sicherheitshalber Hinweise geben, wo andere Versionen der Seite zu finden sind, sodass die richtigen URLs in den richtigen Suchmaschinen gelistet werden. Sonst kann es passieren (allerdings sehr selten), dass Kunden in Google.ch auf Ihre deutschsprachige Seite kommen, obwohl es extra eine Seite für die Schweiz gibt.

Um die Sprache einer Seite mitzuteilen sowie andere Sprachen der aktuellen Seite zu definieren, können verschiedene Methoden genutzt werden.

### Alternate-Tags

Mit einem Alternate-Tag, bei welchem über das `hreflang`-Attribut die Sprache der verknüpften Seite festgelegt wird, kann ein Bezug zwischen gleichen Seiten in verschiedenen Sprach hergestellt werden. Wir zeigen dies hier am Beispiel eines internationalen Online-Shops:

Wenn es den Onlineshop `hundefutter.com` in verschiedenen Sprachen gibt, wäre eine URL-Struktur nach dem Schema `https://hundefutter.com/[sprache]/` möglich. Wenn wir uns also auf der Seite `https://hundefutter.com/de/kleine-hunde` befinden, wäre folgender Alternate-Tag möglich:

```html 
<link rel="alternate" hreflang="en-US" href="https://hundefutter.com/en/small-dogs" />
```

Das `hreflang`-Attribut hat folgendes Format: `ll-RR` wobei `ll` der Sprachcode (`locale`) wie zum Beispiel `en` für Englisch ist und `RR` die Region, in welcher die Sprache gesprochen wird auszeichnet. `en-US` meint also eine Englischsprachige Seite für den amerikanischen Markt.

Es ist wichtig, dass die Seite `https://hundefutter.com/en/small-dogs` nun auch wieder einen Alternate-Tag zur deutschen Seite enthält. Ist dieser nicht vorhanden, kann Google die Beziehung zwischen den beiden Seiten nicht herstellen.

### Alternate-Pages im HTTP-Header

Wenn zum Beispiel PDF-Dokumente in mehreren Sprachen vorliegen, können die anderen verfügbaren Versionen mittels eines `Link`-Headers definiert werden. Dieser hat die selbe Funktion und Einschränkungen wie ein Alternate-Tag. Er ist wie folgt aufgebaut:

```
Link: <https://hundefutter.com/en/small-dogs>; rel="alternate"; hreflang="en-US"
```

Der Link-Header muss auch beim gelinkten Dokument vorhanden sein (wie oben beim Alternate-Tag).

### Alternate-Pages innerhalb der Sitemap auszeichnen

Ein weiterer Weg, um Google auf anderssprachige Versionen der aktuellen Seite hinzuweisen ist, die oben genannten Alternate-Links in der Sitemap, welche man idealerweise via `robots.txt` oder der Search Console angezeigt hat, aufzuführen. Die Parameter in der Sitemap sind effektiv die Selben wie beim Alternate-Tag im Head-Teil der Seite / des Dokuments. Hier ein Beispiel:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://hundefutter.com/en/small-dogs</loc>
    <xhtml:link 
               rel="alternate"
               hreflang="de-DE"
               href="https://hundefutter.com/de/kleine-hunde"/>
  </url>
  <url>
    <loc>https://hundefutter.com/de/kleine-hunde</loc>
    <xhtml:link 
               rel="alternate"
               hreflang="en-US"
               href="https://hundefutter.com/en/small-dogs"/>
    </url>
</urlset>
```

Auch hier gelten wieder die gleichen Regeln:

* Verlinkte Seiten müssen sich auf derselben Domain befinden
* Links müssen bidirektional, also in beiden Richtungen vorhanden sein

## Fazit

Suchmaschinen geben den Betreibern von Seiten sowie Online-Marketern viele Möglichkeiten, um der Suchmaschine zu "sagen", wie ihre Seiten zu verstehen sind. Als Webmaster kann man Missverständnisse oder Ranking-Kriege zwischen eigenen Seiten effektiv verhindern, wenn man die dafür gedachten Techniken richtig einsetzt.
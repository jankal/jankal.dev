# Technisches SEO: Sitemaps & RSS-Feeds für Suchmaschinen

Weitere Beiträge dieser Serie:

- [Technisches SEO: Die wichtigsten Rankingfaktoren Teil 1](https://zeraton.de/blog/technisches-seo-die-wichtigsten-rankingfaktoren-teil-1)
- [Modernes SEO: Ranking nach Keyword-Clustern](https://zeraton.de/blog/modernes-seo-ranking-nach-keyword-clustern)

Bei der Optimierung einer Website ist auch zu beachten, dass Suchmaschinen erst einmal überhaupt auf die Seite kommen müssen, bevor sie diese indexieren können. Wenn genügend Backlinks für bzw. auf die Seite vorhanden sind, welche gecrawlt werden, wird Google den Weg zu Ihrer Seite **eventuell irgendwann** finden. Allerdings kann das durchaus seine Zeit dauern, bis es soweit ist. Bei neuen Projekten, welche noch keine Backlinks vorzuweisen haben, ist dieser Weg generell ausgeschlossen.

## XML-Sitemaps zeigen existierende Seiten

Eine Sitemap ist eine XML-Datei (die üblicherweise auch `sitemap.xml` heißt), welche alle Unterseiten Ihrer Website auflistet. Sie liegt meist im folgenden Format vor:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://zeraton.de/blog</loc>
  </url>
  <url>
    <loc>https://zeraton.de/leistungen/apps</loc>
   </url>
</urlset>
```

Diese Information wird von Google verarbeitet und resultiert darin, dass der Google Bot (oder ein anderer Crawler) die angegebenen URLs besuchen wird. Allerdings hat sie noch zwei weitere Funktionen:

* Die Änderungsfrequenz einer Seite angeben, was dazu führen **kann**, dass der Crawler diese häufiger oder seltener besucht
* Angaben über das Datum der letzten Änderung machen
* Die Priorität der Seite festlegen

Dies kann dann in etwa so aussehen:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
   <url>
       <loc>https://zeraton.de/</loc>
       <lastmod>2018-02-15</lastmod>
       <changefreq>monthly</changefreq>
       <priority>1</priority>
   </url>
   <url>
       <loc>https://zeraton.de/blog//</loc>
   		<lastmod>2018-02-25</lastmod>
   		<changefreq>daily</changefreq>
   		<priority>0.6</priority>
   </url>
</urlset>
```

Um einer Suchmaschine mitzuteilen, dass eine Sitemap vorhanden ist und wo diese zu finden ist, kann man ihren Pfad einerseits in der [`robots.txt`-Datei](https://zeraton.de/blog/technisches-seo-die-wichtigsten-rankingfaktoren-teil-2) angeben, oder die Sitemap via der Search Console einreichen. Das Einreichen empfiehlt sich besonders bei neuen Projekten, da Google nun die Sitemap zum Anlass nimmt um alle darin enthaltenen Links zu besuchen und zu indexieren.

Wenn neue URLs oder Seiten hinzukommen, aktualisiert man die Sitemap (meist geschieht dies automatisch) und informiert Google über die Änderung via einem so genannten Ping. Dazu kann man `https://google.com/ping?sitemap=*sitemap*` einfach mit dem Browser aufrufen. Wobei man für `*sitemap*` die Adresse der eigenen Sitemap in die URL einfügen muss. Bei uns sieht das wie folgt aus:

```
https://google.com/ping?sitemap=https://zeraton.de/sitemap.xml
```

Man kann sich den manuellen Aufruf der Ping-Adresse im Browser sparen, wenn ein Plugin des genutzten CMS-Systems dies automatisch erledigt.

## RSS-Feeds geben Meta-Informationen

Eine weitere Möglichkeit, um Google mit Informationen zu versorgen, stellen RSS-Feeds dar. RSS steht für **R**eal **S**imple **S**yndication und versteht sich eigentlich als Protokoll, um Inhalte im Internet verbreiten sowie an einer zentralen Stelle lesen zu können. Man merkt: eigentlich scheinen RSS-Feeds gar nicht unbedingt für die Suchmaschinenoptimierung gedacht. Doch können auch sie in der Search-Console bei Google eingereicht werden. Sie werden im Grunde ähnlich wie eine Sitemap genutzt. Alle im Feed enthaltenen URLs werden vom Crawler besucht. Auch hier werden die gegebenen Metadaten der gebotenen Inhalte ausgewertet und beispielsweise zur Bestimmung des Crawling-Rhythmus genutzt. Wir gehen auch davon aus, dass bestimmte Informationen, wie auch strukturierte Daten, zur Generierung von so genannten Rich-Snippets und Rich-Cards genutzt werden. Da wäre beispielsweise das Änderungsdatum eines Blogposts, welches genutzt werden kann, um in den Suchergebnissen anzuzeigen, wann ein Beitrag verändert wurde. Diese Information wird allerdings auch beim Ranking relevant, da wir feststellen, dass neuere Inhalte meist einen Rankingvorteil gegenüber älteren Inhalten haben. Außerdem enthalten RSS-Feeds häufig weitere Metadaten, welche im Kontext der Inhaltsstruktur relevant sein können. Hier ist zum Beispiel die Angabe des Autors möglich. Wie solche Metadaten letzten Endes genau ausgewertet und genutzt werden, können wir derzeit nicht sagen.

## Fazit

Es ist bei den meisten Websites zwar nicht notwendig Sitemap und RSS-Feeds einzusetzen, da Google schon viele Dinge von selbst erkennt und seine Schlüsse zieht. Allerdings ist es natürlich positiv, wenn man es der Suchmaschine möglichst einfach machen möchte, die Inhalte an die richtige Zielgruppe zu verteilen.
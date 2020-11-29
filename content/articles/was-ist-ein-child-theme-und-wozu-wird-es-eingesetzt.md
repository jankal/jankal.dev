# Was ist ein Child-Theme und wozu wird es eingesetzt?

Es gibt dort draußen zweifellos sehr viele, schöne WordPress-Themes. Dennoch ist die Suche nach einem Theme, dass alle Wünsche abdeckt, langwierig und schwer. Immer wieder wird man auf Kleinigkeiten stoßen, die man sich vom „look & feel“ anders wünschen würde. Und genau hier kommt das Child-Theme ins Spiel: 

Ein Child-Theme kann eingesetzt werden um Änderungen an einer Webseite vornehmen zu können, ohne den Code des Haupt-Themes anfassen zu müssen. Das können kleinere Änderungen sein, wie die Anpassung von Farben und Schriftgrößen mittels CSS aber auch umfassendere Anpassungen wie das Hinzufügen von Funktionen, Post-Types und Templates.

## Wie funktioniert ein Child-Theme?

Das Child-Theme befindet sich in einem separaten Ordner, neben dem Haupt-Theme. Sobald das Child-Theme aktiviert wurde, checkt WordPress nun zuerst das Child-Theme, um zu sehen ob eine spezifische Funktion besteht. Sollte dies nicht der Fall sein, greift WordPress auf das Haupt-Theme zurück. Das Child-Theme sollte immer eine `functions.php`- sowie eine `style.css`-Datei enthalten, um die Funktionalität des Child-Themes zu gewährleisten. Es können zudem weitere angepasste Dateien hinzugefügt werden. 

## Was bei Updates passiert

Ohne ein Child-Theme bestehen generell nur zwei Möglichkeiten:
Entweder du verzichtest zukünftig auf Updates deines Haupt-Themes oder, die am Theme gemachten Änderungen gehen verloren und die Arbeit war sprichwörtlich "für die Katz".

Auf Updates zu verzichten sollte allerdings nie eine Option sein. Veraltete Versionen sind der Hauptgrund für Sicherheitslücken. Dies Gilt für Themes, Plugins und auch für die Wordpress Version selbst.

## Fazit!

Child-Themes bieten eine wunderbare Möglichkeit, ein bereits bestehendes Theme voll und ganz an die eigenen Wünsche anzupassen. Die Erstellung eines Child-Themes ist einfacher als Mancher denken mag. Somit steht kleiner oder großen Änderungen am Haupt-Theme nichts im Weg.
Eine detaillierte Anleitung zur Erstellung eines Child-Themes gibt es im [WordPress Theme Developer Handbook](https://developer.wordpress.org/themes/advanced-topics/child-themes/).
# Vue & Vuex: Unser Weg bei der Datenverwaltung

Grob gesagt ist Vuex ein zentraler Zustandsspeicher im Browser, auf welchen wir innerhalb unserer Applikation via Mutationen und Gettern zugreifen können. Mutationen dienen dazu, Änderungen im Zustand möglichst konsistent zu halten sowie diese später gut nachverfolgen zu können. Diese Nachverfolgbarkeit von Änderungen ist vor allem im Entwicklungsprozess wichtig.

## Wie alles begann

Ende des Jahres 2016 habe ich begonnen, mich mit Vue als Frontend-Framework zu beschäftigen. Zu Beginn war ich sehr skeptisch, was die damals aufkommenden Technologien anbelangte. Bei Vue hatte ich vor allem Angst, es würde Applikationen schnell groß, langsam und schwerfällig lassen. Doch trotzdem konnte mich die Syntax gekoppelt mit einfacher Einrichtung / Nutzung damals vom Framework überzeugen. Damals schienen die [Lifecycle-Hooks](https://michaelnthiessen.com/call-method-on-page-load/) wie `created` und `mounted` noch wichtig. In meinen ersten Gehversuchen (damals innerhalb von Laravel), lud ich meine Daten im `mounted`-Hook vom Server. Heute würde man das im `created`-Hook machen (und solange keine Daten da sind einen Spinner anzeigen), oder den Vue-Router mittels `beforeRouteEnter` oder `beforeRouteUpdate` bemühen, die Daten noch vor dem Rendern zu laden. So viel  mal zu Vue ohne irgendwelche Aufputschmittel.

## Websites mit Vue

Im Jahr 2017 begann ich, auch mal wirkliche Websites (ohne Laravel) für Kunden mit Vue.js umzusetzen. Dabei musste ich mich damals vielen Herausforderungen bezüglich Webpack, Data-Fetching und Abhängigkeiten annehmen. Ich suchte teils aus Verzweiflung und Teils aus Zeitgründen nach einer Alternative, um nicht immer gegen die gleichen Bäume zu rennen und nie fertig zu werden.

In Form von [Nuxt.js](https://nuxtjs.org/) fand ich eine solche Alternative. so konnte ich mich erstmals wirklich auf das Vorankommen der Websites fokussieren, anstatt Experte im Bereich der Build-Chain mit Webpack werden zu müssen. Außerdem sind Konventionen, wie sie Nuxt.js (natürlich *[opinionated](https://medium.com/@stueccles/the-rise-of-opinionated-software-ca1ba0140d5b)*) aufgestellt hat, bei der Arbeit durchaus von Vorteil. Wenn es nur einen, von der Dokumentation vorgegebenen Weg gibt, etwas zu machen, braucht man sich nicht mit anderen Möglichkeiten auseinandersetzen, welche womöglich schlechter funktionieren würden. Und vor allem: Man hat durch Nuxt.js ganz andere Möglichkeiten, bestimmte Funktionen sauber umzusetzen, welche man vorher nur mühsam bauen konnte, da man eben nicht die Feinheiten von Vue-Router und Webpack-Chunks kennt. Für jeden der jetzt sagt, ich würde hier den Ansatz für Faule vorstellen: Ja, das tue ich auch. Ich will mich doch bei der Arbeit auf mein Produkt konzentrieren und dem Kunden in möglichst wenig Zeit möglichst viel Ergebnis abliefern. Zu einer Zeit, zu der WordPress noch ein Thema bei uns war, schrieb uns ein Kunde einmal:

> Priorität #1: Ich will kein WordPress-Experte werden müssen, wenn ich mit euch zusammenarbeite.

Und so ist es auch bei mir: Ich muss kein Webpack und Vue-Router-Experte werden bzw. die Internals kennen, wenn ich "nur" eine Website mache.

Eine meiner liebsten Features und Konventionen war immer, die Art und Weise des Data-Fetchings. Zum einen kann der Vuex-Store von sich aus via [`nuxtServerInit`]() asynchron Daten laden (bei [SSR](https://ssr.vuejs.org/)). Damit aber nicht genug: Die im Ordner `pages` befindlichen Single-File-Components werden von Nuxt.js als Ziele des Vue-Routers in die Router-Konfiguration aufgenommen. Sobald der User sich nun zu einer Page begibt, werden zuerst verschiedene Dinge ausgeführt: [`asyncData()`](https://nuxtjs.org/guide/async-data) im Ziel-Component bekommt den sog. [`Context`](https://nuxtjs.org/api/context) als Argument und kann so verschiedenste Daten Laden. Der Rückgabewert von `asyncData` landet später im `data`-Feld des Page-Components (`asyncData` und das traditionelle `data` werden hier via [Shallow-Merge](https://stackoverflow.com/questions/42731453/deep-and-shallow-merge-in-javascript) zusammengeführt). Gibt man im `asyncData` ein Promise zurück, wartet Nuxt.js dessen Auflösung ab und verwendet den Rückgabewert des Promise bzw. der Promise-Kette.

Häufig wurde das bei uns dann so genutzt:

```vue
<template>
  <!-- Template -->
</template>
<script>
export default {
    asyncData({app}) {
        return new Promise(function(resolve, reject) {
            app.$axios.get('/page').then(function(response) {
                resolve(response.data)
            }).catch(reject)
        })
    }
}
</script>
```

Zumindest solange `async/await` noch nicht funktioniert hat, und `Àrrow-Functions` zwar hip, aber noch nicht in Node.js enthalten waren. Modern schaut das dann so aus:

```vue
<template>
  <!-- Template -->
</template>
<script>
export default {
    async asnycData({app}) {
        return (await app.$axios.get('/page')).data
    }
}
</script>
```

Auch heute wird das noch so genutzt (wenn auch mit mehr Error-Handling), wenn spezifische Daten nur für diese eine Seite geladen werden sollen. Grundsätzlich ist das nämlich eine gute Funktion. Doch: Sie sorgt in einer größeren Applikation schnell für Datenchaos. Vor allem, wenn bestimmte Daten auf verschiedenen Seiten oder von verschiedenen Komponenten gebraucht werden. Es sollte nicht die Verantwortung der Pages sein, ihren Child-Komponenten Daten durchzureichen.

## Vuex als "globale kurzlebige Client-Datenbank"

Um alle möglichen Components mit Daten zu füttern, gleichzeitig aber auch das Laden und Verarbeiten bestimmter Entitäten zu zentralisieren (heißt, nur einmal programmieren zu müssen), kann man den Vuex-Store gut nutzen. Doch: Wie kommen die Daten dort hin?

Wenn man SSR nutzt, kann die oben schon angesprochene Methode des `nuxtServerInit` genutzt werden. Dabei geht man aber schnell in den Bereich der Übertreibung über. Denn: Man weiß ja in `nuxtServerInit` noch gar nicht, welche Daten von den Komponenten der aktuellen Seite gebraucht werden. Und das ist auch gut so. So haben wir also gelernt: Mit `nuxtServerInit` sollten generell nur Daten geladen werden, die in der gesamten Applikation benötigt werden. Beispielsweise die Berechtigungen des aktuellen Benutzers oder ide Farbe der global überall genutzten Navbar.

Sollte man im [`SPA`-Modus](https://nuxtjs.org/api/configuration-mode/) arbeiten, kann man sich zum Laden der globale Infos nicht wie oben beschrieben der Methode `nuxtServerInit` bedienen. Man hat hier genau zwei Möglichkeiten:

1. Globale Daten via einer [Action](https://vuex.vuejs.org/guide/actions.html) laden, welche beim  `created` des [Layouts](https://nuxtjs.org/examples/layouts/) aufgerufen wird
2. Sich eine Art [`nuxtClientInit`](https://github.com/nuxt/nuxt.js/issues/240#issuecomment-326893386) bauen
3. Das [nuxt-client-init Plugin](https://github.com/potato4d/nuxt-client-init-module) nutzen

Eine andere Möglichkeit wäre, dass datenbedürftige Components im [`fetch`-Hook](https://nuxtjs.org/api/pages-fetch/) eine Action auslösen, welcher die entsprechenden Daten lädt und im Vuex-Store bereitstellt. Dabei kann man Vuex einerseits als Datenbank behandeln und Daten nur dann verändern / neu Laden, wenn diese noch nie geladen wurden, oder man lädt einfach für jeden Component die entsprechend benötigten Daten neu.

Aktuell sehen Vuex-Stores bei uns in etwa so aus:

```javascript
import * as types from '~/src/mutationTypes'
import * as requestTypes from '~/src/requestTypes'

// initial state
export const state = () => ({
  users: {},
  requestTypeState: null,
})

// getters
export const getters = {
  userIds: state => Object.values(state.users).map(user => user.id),
  usersRequestTypeState: state => state.requestTypeState,
  findAllUsers: state => Object.values(state.users),
  findOneUserById: state => id => state.users[id]
}

// actions
export const actions = {
  async fetchUsers({ commit }) {
    commit(types.SET_USERS_REQUEST_TYPE_STATE, requestTypes.GET_ALL)
    try {
      let response = await this.$axios.get('/api/users')
      let normalized = normalize(response.data, [schema.user])

      commit(types.SET_USER_DATA, normalized.entities.users)
    } catch (e) {
      //
    } finally {
      commit(types.SET_USERS_REQUEST_TYPE_STATE, null)
    }
  },
  async fetchOneUserById({ commit }, id) {
    commit(types.SET_USERS_REQUEST_TYPE_STATE, requestTypes.GET)

    try {
      let response = await this.$axios.get('/api/users/' + id)
      commit(types.SET_USER_DATA, [response.data])
    } catch(e) {
      //
    } finally {
      commit(types.SET_USERS_REQUEST_TYPE_STATE, null)
    }
  },
  async deleteUser({commit}, id) {
    commit(types.SET_USERS_REQUEST_TYPE_STATE, requestTypes.DELETE)
    try {
      let response = await this.$axios.delete('/api/users/' + id)
      commit(types.REMOVE_USER, id)
    } catch(e) {
      //
    } finally {
      commit(types.SET_USERS_REQUEST_TYPE_STATE, null)
    }
  },
  async createUser({ commit }, item) {
    commit(types.SET_USERS_REQUEST_TYPE_STATE, requestTypes.POST)
    try {
      let response = await this.$axios.post('/api/users', item)

      commit(types.SET_USER_DATA, [response.data])
    } catch (e) {
      //
    } finally {
      commit(types.SET_USERS_REQUEST_TYPE_STATE, null)
    }
  },
  async updateUser({ commit }, entry) {
    commit(types.SET_USERS_REQUEST_TYPE_STATE, requestTypes.PUT)

    try {
      let response = await this.$axios.put('/api/users/' + entry.id, entry)
      commit(types.SET_USER_DATA, [response.data])
    } catch (e) {
      //
    } finally {
      commit(types.SET_USERS_REQUEST_TYPE_STATE, null)
    }
  }
}

// mutations
export const mutations = {
  [types.SET_USER_DATA](state, payload) {
    state.users = {...state.users, ...payload}
  },
  [types.SET_USERS_REQUEST_TYPE_STATE](state, value) {
    state.requestTypeState = value
  },
  [types.REMOVE_USER](state, id) {
    // Remove the entry.
    let users = {...state.users}

    delete users[id]

    // Reset the complete object to let the event listeners trigger for changes.
    state.users = users
  }
}
```

In den Actions, welche hier Daten laden, bietet es sich an, entsprechende Daten direkt in das applikationsweite Format zu bringen (heißt, sie zu formatieren) sowie Daten zu normalisieren, sollten bei einer Request mehrere Entitäten von der API geliefert werden. Hierzu empfiehlt sich das Paket [normalizr](https://github.com/paularmstrong/normalizr).

Zum Schluss bleibt noch zu schreiben:
Vuex ist keine Datenbank und sollte auch nicht wie eine solche genutzt werden. Wir laden Daten so oft wie möglich neu bzw. nutzen hin und wieder auch Websockets, um immer auf dem aktuellsten Stand zu sein. Bei der Entwicklung mit Vue.js wünscht man sich am allerwenigsten Probleme mit der Datenkonsistenz.

Wer Konventionen gerne hat, findet [hier](https://gist.github.com/brianboyko/91fdfb492071e743e389d84eee002342) noch den ein oder anderen Tipp, um effizienter mit Vue.js zu arbeiten.
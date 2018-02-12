# deck-royale docs

> Documentação do deck-royale!, com resumo de endpoints da API front end

## Arquitetura

O app foi escrito com a ajuda do [Vue](https://vuejs.org). Todas as views estão escritas na forma de componentes Vue, o que permite modularidade no aplicativo ao mesmo tempo que mantém código relacionado em arquivos coesos.

## Componentes

O aplicativo é atualmente composto na seguinte hierarquia:

    - App
    |
    | - LoadingScreen
    |
    \ - MainUI
      |
      \ - Card

Cada componente representa uma parte da interface de usuário. Existe a intenção de separar o componente `MainUI` num componente que executa as principais funções da interface e um componente que cuida da renderização dos grids (que provavelmente será chamado `Deck`).

### App.vue

O ponto de entrada do aplicativo Vue. De início, faz uma requisição com Axios para a raiz da API que contém a informação sobre os cards.

> Axios foi usado porque utiliza XMLHttpRequest, uma tecnologia suportada em todos os browsers, e possui polyfills para atender ao IE7-8 (será que alguém ainda usa?)
> Além disso, futuramente o app pode ser estendido para abranger mais funções disponíveis nesta e até outras APIs, e depender do suporte nativo a `fetch` ou escrever as XHRs do zero é contraprodutivo.

#### Dependências

- `axios`
- `bootstrap`
- `LoadingScreen.vue` (local)
- `MainUI.vue` (local)

#### Propriedades

- `loaded`: **Booleana.** Informa se os cards já foram recebidos da Clash API.
- `cards`: **Array de objetos.** Os objetos recebidos da Clash API.

#### Métodos
Nenhum.

### LoadingScreen.vue

#### Dependências
Nenhuma.

#### Propriedades
Nenhuma.

#### Métodos
Nenhum.

### MainUI.vue
O módulo principal do app. Representa a interface de usuário e engloba componentes menores. Também é o módulo que maneja a URI dos decks (isso deve ser alterado no futuro!)

#### Dependências

- `base-64`
- `vue-popperjs`
- `Card.vue` (local)

#### Propriedades

- `shuffleCards`: **Array de objetos.** Os cards usados na animação de embaralhamento.
- `shuffleCurrent`: **Array de números.** Os índices de shuffleCards usados em cada espaço a ser preenchido por cards do resultado final.
- `suggestedDeck`: **Array de objetos.** Os cards escolhidos por `MainUI.shuffle()`.
- `shuffling`: **Booleana.** Indicador externo de que a animação de embaralhamento está em andamento.
- `listMode`: **String = 'full' || 'list'.** O modo de exibição da lista.
- `deckUrl`: a localização atual (corresponde a `window.location` na maior parte do tempo).

#### Métodos

- `copyDeckUrl()`: Copia para a área de transferência do sistema a URL do deck exibido.
- `toggleListMode()`: Alterna entre os modos de exibição.
- `loadDeckCode(b64str)`: Traduz o hash em base64 para um array de objetos e atualiza a view com os cards correspondentes.
- `shuffle()`: Executa a animação de embaralhamento e atualiza a view com oito cards aleatórios. Equivalente a chamar `animateShuffling` e `getNewDeck` em sequência.
- `getNewDeck()`: Atualiza a view com oito cards aleatórios.
- `setDeck(deck)`: Elimina as informações anteriores de cards para a view e adiciona a nova lista de objetos no lugar.
- `setHash()`: Atualiza a URL com o código do deck.
- `animateShuffling()`: Para chamamento interno. Apenas exibe a animação, sem alterar nenhuma variável.
- `getRandomCards(cardAmt)`: Para chamamento interno. Retorna um array com `cardAmt` objetos representando cards aleatórios entre os disponíveis.
- `randomizeShuffleImages()`: Para chamamento interno. Seleciona dez cards aleatórios e atualiza a propriedade `shuffleCards` (estes são os cards usados na animação de embaralhamento).

### Card.vue
Componente usado para renderizar cada card em um dos modos de exibição.

#### Dependências
Nenhuma.

#### Propriedades
- `card` (externa): Objeto representando o card a ser renderizado.
- `mode` (externa): O modo de exibição (atualmente suporta `'list'` ou `'full'`.
- `source` (somente-leitura): A URL da imagem do card referenciado em `card`.

#### Métodos
- `moreInfo()`: Se no modo de exibição `'list'`, faz as alterações necessárias para exibir a informação completa do card.

# deck-royale

> Criador de decks aleatórios de Clash Royale

Deck Royale é um web app que consome a [clash-royale-api](https://github.com/martincarrera/clash-royale-api) para gerar decks aleatórios de Clash Royale.

**Devido a problemas de certificado no host atual da API \([www.clashapi.xyz](http://www.clashapi.xyz)), o app só deve ser servido por HTTP ou apresentará problemas de carregamento!**

## Veja funcionando

deck-royale está disponível online [neste link](http://deck-royale.000webhostapp.com). Abaixo estão as instruções de uso.

## Geração de decks aleatórios

O app gera um deck aleatório quando solicitado. Isso pode ser quando o app é acessado, se este não tiver um código de deck válido na URI, ou sempre que o botão *Shuffle* for pressionado (o método `MainUI.shuffle()`, que é invocado internamente).

## URI fixa dos decks

Cada deck gerado tem uma URI única que consiste numa string base64 gerada automaticamente representando a sequência de oito cartas. O app verifica a hash-location (porção da URI após o hash [`#`]) inserida e gera o deck relacionado, se a string for um identificador de deck válido.

Ao criar um novo deck aleatório via `MainUI.shuffle()`, a *hash location* é atualizada, assim como o campo `MainUI.deckCode`. Portanto, para carregar um deck criado previamente, basta copiar a URL gerada pelo app e acessá-la mais tarde.

## Alternar visualização

Atualmente há dois modos de visualização disponíveis: **grade** (padrão) e **lista**. Eles podem ser alterados chamando o método `MainUI.toggleListMode()`, para o qual existe um botão dinâmico no menu principal da interface.

## Performance de rede

Como a API possui apenas a informação sobre 81 cards e os entrega num único pedido, não é necessário fazer muitos pedidos de rede. A maior parte do consumo de dados se dá pelo download das imagens dos cards. Destas, no mínimo 10 e no máximo 18 são baixadas logo na inicialização do app (10 delas são baixadas para a animação de embaralhamento, e outras 8 podem ser solicitadas dependendo do resultado do embaralhamento. No melhor cenário para o desempenho, os 8 cards aleatórios estão entre os 10 que foram baixados para a animação).

## To do

* Modularizar o componente `MainUI` (principalmente separar a responsabilidade de dispor o deck num novo componente)
* Passar a usar roteamento de URI no lugar de fragmentos (eliminar a necessidade do `#` na URL e permitir que os decks sejam compartilhados com as APIs das redes sociais)
* Detalhar melhor a documentação e separá-la em arquivos (usar um preprocessador de documentação?)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

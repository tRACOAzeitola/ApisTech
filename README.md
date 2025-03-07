# Inventario - Aplicação de Gestão de Inventário para Apicultores

Uma aplicação móvel moderna desenvolvida com React Native para ajudar apicultores a gerir o seu inventário de forma eficiente.

![Inventario App](https://via.placeholder.com/800x400.png?text=Inventario+App)

## 📱 Sobre o Projeto

Inventario é uma aplicação de gestão de inventário específica para apicultores, permitindo o controlo completo de produtos, equipamentos e materiais relacionados com a apicultura. Com uma interface intuitiva e funcionalidades avançadas, a aplicação ajuda a otimizar a gestão de stocks, rastrear movimentações e alertar sobre níveis baixos de produtos essenciais.

### Principais Funcionalidades

- 🏠 **Ecrã inicial intuitivo** com acesso rápido a Inventário e Apiários
- 🐝 **Gestão de apiários** para controlo de equipamentos por local
- 📊 **Painel interativo redesenhado** com resumo de stock e gráficos por categoria
- 🔍 **Pesquisa avançada** para encontrar produtos rapidamente
- 📋 **Categorização inteligente** de produtos relacionados com a apicultura
- 📉 **Alertas de stock reduzido** para evitar falta de itens essenciais
- 📝 **Histórico de movimentações** para rastreamento completo
- 📄 **Geração de relatórios em PDF** para inventário, mel e produtos em baixo estoque
- ➕ **Interface melhorada para adição de produtos** com organização por seções
- 🔄 **Sincronização com Firebase** para backup e acesso em múltiplos dispositivos
- 🌓 **Tema claro/escuro** com deteção automática das preferências do sistema
- 🧭 **Navegação melhorada** com botões de retorno à página inicial

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento móvel multiplataforma
- **TypeScript**: Linguagem de programação com tipagem estática
- **Firebase**: Backend as a Service para armazenamento e sincronização de dados
- **React Navigation**: Sistema de navegação entre ecrãs
- **Vector Icons**: Biblioteca de ícones para a interface
- **AsyncStorage**: Armazenamento local persistente
- **Linear Gradient**: Efeitos de gradiente para a interface
- **Safe Area Context**: Gestão de áreas seguras em diferentes dispositivos
- **React Native HTML to PDF**: Geração de relatórios em PDF
- **React Native Print**: Visualização de arquivos PDF gerados
- **React Native FS**: Operações de arquivo para salvar relatórios

## 📂 Estrutura do Projeto

```
inventario/
├── android/                   # Configurações nativas do Android
├── ios/                       # Configurações nativas do iOS
├── src/                       # Código fonte principal
│   ├── @types/                # Tipos personalizados para bibliotecas
│   ├── components/            # Componentes reutilizáveis
│   │   ├── AnimatedCard.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── Menu.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ScreenLayout.tsx
│   │   ├── SearchBar.tsx
│   │   └── ThemeToggle.tsx
│   ├── constants/             # Constantes da aplicação
│   │   ├── categories.ts
│   │   ├── index.ts
│   │   └── menu.ts
│   ├── context/               # Contextos React
│   │   └── ThemeContext.tsx
│   ├── data/                  # Dados mockados para desenvolvimento
│   │   └── mockData.ts
│   ├── navigation/            # Configuração de navegação
│   │   └── AppNavigator.tsx
│   ├── screens/               # Ecrãs da aplicação
│   │   ├── AddProductScreen.tsx
│   │   ├── ApiariesScreen.tsx
│   │   ├── CategoryProductsScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LowStockScreen.tsx
│   │   └── MainScreen.tsx
│   ├── styles/                # Estilos globais
│   │   ├── index.ts
│   │   └── theme.ts
│   ├── types/                 # Definições de tipos TypeScript
│   │   ├── global.d.ts
│   │   ├── index.ts
│   │   ├── navigation.types.ts
│   │   ├── models/
│   │   │   ├── product.types.ts
│   │   │   └── category.types.ts
│   │   └── ui.types.ts
│   └── utils/                 # Utilitários
│       └── responsive.ts
├── App.tsx                    # Componente principal da app
├── index.js                   # Ponto de entrada da aplicação
├── package.json               # Dependências e scripts
└── tsconfig.json              # Configuração do TypeScript
```


## 🚀 Configuração e Execução

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- React Native CLI
- Cocoapods (para iOS)
- Android Studio ou Xcode
- JDK 11+

### Instalação

1. Clona o repositório:
```
git clone https://github.com/teu-utilizador/inventario.git
cd inventario
```


2. Instala as dependências:
```
npm install
# ou
yarn install
```


3. Para iOS, instala os pods:
```
cd ios && pod install && cd ..
```


### Execução

- **Android:**
```
npm run android
# ou
yarn android
```


- **iOS:**
```
npm run ios
# ou
yarn ios
```


## 📱 Ecrãs Principais

### Ecrã Principal
Menu principal que dá acesso às duas áreas principais da aplicação: Inventário e Apiários. Layout intuitivo com duas colunas de opções.

### Inventário
Ecrã de gestão com categorias de produtos e acesso rápido às funcionalidades de stock.

### Apiários
Ecrã dedicado à gestão de apiários, permitindo controlar equipamento por local.

### Painel (Redesenhado)
Visão geral com gráficos de barras por categoria, alertas de estoque baixo e opções para gerar diferentes tipos de relatórios em PDF.

### Produtos por Categoria
Lista de produtos de uma categoria específica com opções de gestão.

### Adicionar Produto (Redesenhado)
Interface melhorada organizada em seções (Informações Básicas, Estado e Localização, Quantidade, Informações Adicionais) para uma experiência mais intuitiva.

### Histórico
Histórico de movimentações com filtros por tipo (entrada/saída).

### Stock Reduzido
Alerta de produtos com stock abaixo do limite estabelecido.

## 📊 Relatórios em PDF

A nova versão inclui a capacidade de gerar relatórios detalhados em PDF:

- **Relatório Completo**: Inventário detalhado com todos os produtos e estatísticas
- **Relatório de Mel**: Focado no estoque de mel com análises específicas
- **Relatório de Baixo Estoque**: Lista de produtos com níveis críticos de estoque

Os relatórios podem ser salvos no dispositivo ou visualizados diretamente na aplicação.

## 🧭 Navegação Melhorada

A aplicação agora inclui navegação aprimorada com:

- **Ecrã Principal**: Menu central que dá acesso às principais áreas da aplicação
- **Botão Início**: Adicionado em todos os ecrãs para retorno rápido ao menu principal
- **Botão Voltar**: Navegação para o ecrã anterior

Esta melhoria permite uma transição mais fluida entre diferentes seções da aplicação, especialmente entre as áreas de Inventário e Apiários.

## 🎨 Tema e Personalização

A aplicação suporta temas claro e escuro, com deteção automática das preferências do sistema. O utilizador também pode alternar manualmente entre os temas através do menu de configurações.

## 🔒 Armazenamento de Dados

Os dados são armazenados localmente utilizando AsyncStorage e sincronizados com o Firebase Realtime Database quando há ligação disponível.


## 👨‍💻 Autor

Desenvolvido por [David Oliveira](linkedin.com/in/david-oliveira-8899412b).

## 🤝 Contribuição

Contribuições são bem-vindas! Sente-te à vontade para abrir issues ou enviar pull requests.

1. Faz um fork do projeto
2. Cria a tua branch de funcionalidade (`git checkout -b funcionalidade/funcionalidade-incrivel`)
3. Faz commit das tuas alterações (`git commit -m 'Adicionar: funcionalidade incrível'`)
4. Faz push para a branch (`git push origin funcionalidade/funcionalidade-incrivel`)
5. Abre um Pull Request

## 📝 Changelog

### Versão 1.2.0 (Atual)
- Redesenho completo do Dashboard com visualização de gráficos por categoria
- Interface de Adicionar Produto remodelada e organizada em seções
- Adicionada funcionalidade de geração de relatórios em PDF
- Novo relatório de inventário completo com estatísticas
- Novo relatório específico para estoque de mel
- Novo relatório de produtos com baixo estoque
- Melhorias de performance e correções de bugs

### Versão 1.1.0
- Adicionado novo ecrã principal com acesso às áreas de Inventário e Apiários
- Criada área inicial para gestão de Apiários
- Melhorada a navegação com botões de retorno ao ecrã principal em todas as telas
- Otimização na visualização das categorias de produtos
- Corrigidos problemas de layout em alguns componentes

### Versão 1.0.0
- Lançamento inicial com funcionalidades básicas de gestão de inventário
- Sistema de categorias para organização de produtos
- Histórico de movimentações
- Alertas de stock reduzido
- Suporte a tema claro/escuro

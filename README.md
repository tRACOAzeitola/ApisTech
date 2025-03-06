# Inventario - Aplicação de Gestão de Inventário para Apicultores

Uma aplicação móvel moderna desenvolvida com React Native para ajudar apicultores a gerir o seu inventário de forma eficiente.

![Inventario App](https://via.placeholder.com/800x400.png?text=Inventario+App)

## 📱 Sobre o Projeto

Inventario é uma aplicação de gestão de inventário específica para apicultores, permitindo o controlo completo de produtos, equipamentos e materiais relacionados com a apicultura. Com uma interface intuitiva e funcionalidades avançadas, a aplicação ajuda a otimizar a gestão de stocks, rastrear movimentações e alertar sobre níveis baixos de produtos essenciais.

### Principais Funcionalidades

- 📊 **Painel interativo** com visualização de métricas importantes
- 🔍 **Pesquisa avançada** para encontrar produtos rapidamente
- 📋 **Categorização inteligente** de produtos relacionados com a apicultura
- 📉 **Alertas de stock reduzido** para evitar falta de itens essenciais
- 📝 **Histórico de movimentações** para rastreamento completo
- 🔄 **Sincronização com Firebase** para backup e acesso em múltiplos dispositivos
- 🌓 **Tema claro/escuro** com deteção automática das preferências do sistema

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento móvel multiplataforma
- **TypeScript**: Linguagem de programação com tipagem estática
- **Firebase**: Backend as a Service para armazenamento e sincronização de dados
- **React Navigation**: Sistema de navegação entre ecrãs
- **Vector Icons**: Biblioteca de ícones para a interface
- **AsyncStorage**: Armazenamento local persistente
- **Linear Gradient**: Efeitos de gradiente para a interface
- **Safe Area Context**: Gestão de áreas seguras em diferentes dispositivos

## 📂 Estrutura do Projeto

\`\`\`
inventario/
├── android/                   # Configurações nativas do Android
├── ios/                       # Configurações nativas do iOS
├── src/                       # Código fonte principal
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
│   │   ├── CategoryProductsScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── LowStockScreen.tsx
│   ├── styles/                # Estilos globais
│   │   ├── index.ts
│   │   └── theme.ts
│   ├── types/                 # Definições de tipos TypeScript
│   │   ├── global.d.ts
│   │   ├── index.ts
│   │   ├── navigation.types.ts
│   │   ├── product.types.ts
│   │   └── ui.types.ts
│   └── utils/                 # Utilitários
│       └── responsive.ts
├── App.tsx                    # Componente principal da app
├── index.js                   # Ponto de entrada da aplicação
├── package.json               # Dependências e scripts
└── tsconfig.json              # Configuração do TypeScript
\`\`\`


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
\`\`\`
git clone https://github.com/teu-utilizador/inventario.git
cd inventario
\`\`\`


2. Instala as dependências:
\`\`\`
npm install
# ou
yarn install
\`\`\`


3. Para iOS, instala os pods:
\`\`\`
cd ios && pod install && cd ..
\`\`\`


### Execução

- **Android:**
\`\`\`
npm run android
# ou
yarn android
\`\`\`


- **iOS:**
\`\`\`
npm run ios
# ou
yarn ios
\`\`\`


## 📱 Ecrãs Principais

### Início
Ecrã principal com categorias de produtos e acesso rápido às funcionalidades.

### Painel
Visão geral com métricas e informações sobre o inventário.

### Produtos por Categoria
Lista de produtos de uma categoria específica com opções de gestão.

### Adicionar Produto
Formulário para adicionar novos produtos ao inventário.

### Histórico
Histórico de movimentações com filtros por tipo (entrada/saída).

### Stock Reduzido
Alerta de produtos com stock abaixo do limite estabelecido.

## 🎨 Tema e Personalização

A aplicação suporta temas claro e escuro, com deteção automática das preferências do sistema. O utilizador também pode alternar manualmente entre os temas através do menu de configurações.

## 🔒 Armazenamento de Dados

Os dados são armazenados localmente utilizando AsyncStorage e sincronizados com o Firebase Realtime Database quando há ligação disponível.

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## 👨‍💻 Autor

Desenvolvido por [O Teu Nome](https://github.com/teu-utilizador).

## 🤝 Contribuição

Contribuições são bem-vindas! Sente-te à vontade para abrir issues ou enviar pull requests.

1. Faz um fork do projeto
2. Cria a tua branch de funcionalidade (\`git checkout -b funcionalidade/funcionalidade-incrivel\`)
3. Faz commit das tuas alterações (\`git commit -m 'Adicionar: funcionalidade incrível'\`)
4. Faz push para a branch (\`git push origin funcionalidade/funcionalidade-incrivel\`)
5. Abre um Pull Request

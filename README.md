# Inventario

[![React Native](https://img.shields.io/badge/React%20Native-0.78.0-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.4-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Private-red.svg)]()

Um aplicativo móvel de gerenciamento de inventário desenvolvido com React Native, que permite rastrear, gerenciar e organizar itens de estoque de forma eficiente.

## 📱 Funcionalidades

- Cadastro e gerenciamento de produtos
- Categorização de itens
- Rastreamento de estoque
- Interface intuitiva e responsiva
- Navegação fluida entre telas

## 🚀 Tecnologias

Este projeto utiliza as seguintes tecnologias:

- [React Native](https://reactnative.dev/) - Framework para desenvolvimento móvel
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
- [React Navigation](https://reactnavigation.org/) - Navegação entre telas
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Animações fluidas
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) - Pacote de ícones

## 🛠️ Requisitos

- Node.js 18 ou superior
- React Native CLI
- Xcode (para iOS)
- Android Studio (para Android)
- CocoaPods (para iOS)

## ⚙️ Como Executar

### Preparando o ambiente

Certifique-se de ter configurado seu ambiente seguindo o [Guia de Configuração do React Native](https://reactnative.dev/docs/environment-setup).

### Instalando dependências

```bash
# Instalar dependências do Node.js
npm install

# Para iOS, instalar dependências do CocoaPods
cd ios && pod install && cd ..
```

### Executando o projeto

```bash
# Iniciar o Metro Bundler
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios
```

## 📂 Estrutura do Projeto

```
src/
├── assets/                # Recursos estáticos (imagens, ícones, fontes)
│   ├── images/           # Imagens utilizadas na aplicação
│   ├── icons/            # Ícones personalizados
│   └── fonts/            # Fontes customizadas
├── components/           # Componentes reutilizáveis
│   ├── ui/               # Componentes de UI básicos
│   ├── layout/           # Componentes de layout
│   └── forms/            # Componentes relacionados a formulários
├── config/               # Configurações da aplicação
├── constants/            # Constantes e valores fixos
├── context/              # Contextos do React para estado global
├── data/                 # Dados mockados ou lógica de dados
├── hooks/                # Custom hooks reutilizáveis
├── navigation/           # Configuração de navegação e rotas
├── screens/              # Componentes de tela/página
├── services/             # Serviços para interação com APIs
├── styles/               # Estilos globais e temas
├── types/                # Definições de tipos TypeScript
└── utils/                # Funções utilitárias
```

## 📋 Convenções de Código

### Nomenclatura

- **Componentes**: PascalCase (ex: `CategoryCard.tsx`)
- **Hooks**: camelCase com prefixo "use" (ex: `useProductData.ts`)
- **Utilitários**: camelCase (ex: `dateFormatter.ts`)
- **Constantes**: UPPER_SNAKE_CASE para constantes, camelCase para objetos

### Estrutura de Componentes

```
Button/
├── index.tsx          # Componente principal para facilitar importação
├── Button.tsx         # Implementação do componente
├── Button.styles.ts   # Estilos do componente
└── Button.types.ts    # Tipos específicos do componente
```

### Padrões de Importação

Organização recomendada:
1. Bibliotecas externas
2. Componentes e hooks internos
3. Utilitários, constantes e tipos
4. Estilos

```typescript
// 1. Bibliotecas externas
import React, { useState } from 'react';
import { View, Text } from 'react-native';

// 2. Componentes e hooks internos
import { Button } from '../components/ui';
import { useProducts } from '../hooks';

// 3. Utilitários, constantes e tipos
import { formatDate } from '../utils';
import { COLORS } from '../constants';
import type { Product } from '../types';

// 4. Estilos
import styles from './styles';
```

## 🤝 Contribuição

Para contribuir com este projeto:

1. Crie uma branch a partir da `main`
2. Implemente suas alterações
3. Certifique-se de que o código segue os padrões estabelecidos
4. Envie um pull request

## 📄 Licença

Este projeto é propriedade privada e não está licenciado para uso externo sem autorização expressa.

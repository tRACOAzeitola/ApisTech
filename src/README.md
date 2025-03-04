# Estrutura do Projeto

Este projeto segue uma arquitetura de pasta organizada para facilitar o desenvolvimento e a manutenção. Abaixo está a descrição de cada diretório e sua finalidade:

## Estrutura de Diretórios

```
src/
├── assets/                # Recursos estáticos como imagens, ícones e fontes
│   ├── images/           # Imagens utilizadas na aplicação
│   ├── icons/            # Ícones personalizados
│   └── fonts/            # Fontes customizadas
├── components/           # Componentes reutilizáveis da aplicação
│   ├── ui/               # Componentes de UI básicos (botões, inputs, cards, etc)
│   ├── layout/           # Componentes de layout (headers, footers, etc)
│   └── forms/            # Componentes relacionados a formulários
├── config/               # Configurações da aplicação
├── constants/            # Constantes e valores fixos utilizados na aplicação
├── context/              # Contextos do React para gerenciamento de estado global
├── data/                 # Dados mockados ou lógica relacionada aos dados
├── hooks/                # Custom hooks reutilizáveis
├── navigation/           # Lógica de navegação e rotas
├── screens/              # Componentes de tela/página
├── services/             # Serviços para interação com APIs externas
├── styles/               # Estilos globais, temas e configurações de estilo
├── types/                # Definições de tipos TypeScript
└── utils/                # Funções utilitárias
```

## Convenções de Nomenclatura

- **Componentes**: PascalCase (e.g., `CategoryCard.tsx`)
- **Hooks**: camelCase com prefixo "use" (e.g., `useProductData.ts`)
- **Utilitários**: camelCase (e.g., `dateFormatter.ts`)
- **Constantes**: UPPER_SNAKE_CASE para constantes, camelCase para objetos (e.g., `API_ENDPOINTS.ts`, `themeColors.ts`)

## Estrutura de Componentes

Cada componente deve ter sua própria pasta quando necessitar de arquivos adicionais:

```
Button/
├── index.tsx          # Componente principal para facilitar importação
├── Button.tsx         # Implementação do componente
├── Button.styles.ts   # Estilos do componente
└── Button.types.ts    # Tipos específicos do componente (se necessário)
```

## Padrões de Importação

Organize as importações na seguinte ordem:
1. Bibliotecas externas (React, React Native, etc.)
2. Componentes e hooks internos
3. Utilitários, constantes e tipos
4. Estilos

Exemplo:
```typescript
// 1. Bibliotecas externas
import React, { useState, useEffect } from 'react';
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

# Features

Esta pasta contém a organização da aplicação por domínio/funcionalidade seguindo o padrão **Feature-Sliced Design**.

## Estrutura

Cada feature é organizada da seguinte forma:

```
features/
  [feature-name]/
    components/       # Componentes React específicos da feature
    actions/          # Server Actions (Next.js)
    hooks/           # Custom hooks
    schemas/         # Schemas de validação (Zod)
    types/           # TypeScript types
    utils/           # Utilitários específicos da feature
```

## Features atuais

### Transactions
Gerenciamento de transações financeiras (entradas e saídas).

**Componentes:**
- `SaveTransactionDialog` - Dialog para criar/editar transações
- `TransactionsList` - Lista de transações
- `transaction-form-fields` - Campos de formulário reutilizáveis

**Hooks:**
- `useTransactionForm` - Lógica do formulário de transações

**Actions:**
- `registerTransaction` - Criar nova transação
- `updateTransaction` - Atualizar transação existente
- `deleteTransaction` - Deletar transação
- `getTransactions` - Buscar transações do usuário

### Categories
Gerenciamento de categorias de transações.

**Actions:**
- `getUserCategories` - Buscar categorias do usuário
- `createDefaultCategories` - Criar categorias padrão para novo usuário

## Benefícios desta estrutura

1. **Separação de Responsabilidades**: Cada feature contém apenas o código relacionado a ela
2. **Fácil Localização**: Ao trabalhar em uma funcionalidade, todo código relacionado está no mesmo lugar
3. **Manutenibilidade**: Código organizado facilita manutenção e evolução
4. **Escalabilidade**: Fácil adicionar novas features sem impactar as existentes
5. **Reutilização**: Componentes e hooks podem ser facilmente compartilhados entre features

## Como adicionar uma nova feature

1. Crie uma pasta com o nome da feature em `src/features/[feature-name]`
2. Adicione as subpastas necessárias (components, actions, hooks, etc.)
3. Crie um arquivo `index.ts` em cada subpasta para exportar os módulos
4. Documente a feature neste README

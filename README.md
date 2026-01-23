# Zenit Finance

App para organização de finanças pessoais

## 🗺️ Roadmap

⏱️ **Estimativa total:** **8 a 10 semanas**  
🎯 **Objetivo:** Lançar um MVP funcional, simples e validável com usuários reais.

---

## 🧠 FASE 0 — Alinhamento e Visão do Produto  
**Duração:** 2 a 3 dias

### Objetivos
- Alinhar visão entre todos do time
- Evitar retrabalho durante o desenvolvimento

### Tarefas
- [ ] Definir persona principal
- [ ] Definir problema central resolvido pelo produto
- [ ] Definir proposta de valor do MVP
- [ ] Definir escopo fechado do MVP (o que entra e o que fica fora)
- [ ] Criar backlog inicial de funcionalidades
- [ ] Definir métricas básicas de sucesso
  - [ ] Usuário criou conta
  - [ ] Usuário cadastrou movimentações
  - [ ] Usuário retornou ao app

---

## 🎨 FASE 1 — UX / UI e Fluxos da Aplicação  
**Duração:** 4 a 5 dias

### Objetivos
- Pensar nos fluxos antes de codar
- Reduzir mudanças estruturais futuras

### Tarefas
- [ ] Definir fluxo do usuário (cadastro → login → dashboard → movimentação)
- [ ] Criar wireframes de baixa fidelidade:
  - [ ] Login / Cadastro
  - [ ] Dashboard
  - [ ] Lista de movimentações
  - [ ] Formulário de movimentação
  - [ ] Configurações básicas
- [ ] Definir padrões visuais:
  - [ ] Cores principais
  - [ ] Tipografia
  - [ ] Layout base
- [ ] Mapear componentes principais (Shadcn UI)

---

## 🧱 FASE 2 — Setup do Projeto e Infraestrutura  
**Duração:** 3 a 4 dias

### Objetivos
- Criar base sólida e organizada
- Garantir consistência desde o início

### Tarefas
- [ ] Criar repositório do projeto
- [ ] Inicializar projeto Next.js (App Router)
- [ ] Configurar TypeScript
- [ ] Configurar ESLint e Prettier
- [ ] Configurar TailwindCSS
- [ ] Instalar e configurar Shadcn UI
- [ ] Configurar variáveis de ambiente
- [ ] Criar projeto no Supabase
- [ ] Configurar Prisma:
  - [ ] Conexão com banco
  - [ ] Estrutura inicial
  - [ ] Migrations iniciais
- [ ] Configurar deploy inicial na Vercel

---

## 🗄️ FASE 3 — Modelagem de Dados e Regras de Negócio  
**Duração:** 3 a 4 dias

### Objetivos
- Garantir integridade dos dados
- Preparar base para o backend

### Tarefas
- [ ] Modelar entidade User
- [ ] Modelar entidade Transaction
- [ ] Modelar entidade Category
- [ ] Modelar entidade Subscription / Plan (básico)
- [ ] Definir relacionamentos entre tabelas
- [ ] Criar migrations no Prisma
- [ ] Definir regras de negócio:
  - [ ] Entrada vs saída
  - [ ] Cálculo de saldo
  - [ ] Categorias padrão
- [ ] Criar seeds iniciais no banco

---

## 🔐 FASE 4 — Autenticação e Autorização  
**Duração:** 3 a 4 dias

### Objetivos
- Garantir acesso seguro
- Isolar dados por usuário

### Tarefas
- [ ] Configurar autenticação (Supabase Auth ou Clerk)
- [ ] Implementar cadastro de usuário
- [ ] Implementar login
- [ ] Implementar logout
- [ ] Proteger rotas privadas
- [ ] Criar contexto global de autenticação
- [ ] Testar fluxo completo de autenticação

---

## 📡 FASE 5 — Backend (API e Regras de Negócio)  
**Duração:** 7 a 9 dias

### Objetivos
- Implementar o core da aplicação

### Tarefas
- [ ] Criar estrutura base da API
- [ ] Criar módulo de transactions
- [ ] Criar módulo de categories
- [ ] Implementar repositories
- [ ] Implementar services
- [ ] Criar endpoint para criar movimentação
- [ ] Criar endpoint para listar movimentações por mês
- [ ] Criar endpoint para editar movimentação
- [ ] Criar endpoint para excluir movimentação
- [ ] Implementar validações com Zod
- [ ] Garantir isolamento de dados por usuário
- [ ] Testar manualmente todas as rotas

---

## 🖥️ FASE 6 — Frontend (Funcionalidades Principais)  
**Duração:** 7 a 10 dias

### Objetivos
- Entregar valor real ao usuário

### Tarefas
- [ ] Implementar layout base da aplicação
- [ ] Implementar Dashboard
  - [ ] Saldo do mês
  - [ ] Total de entradas
  - [ ] Total de saídas
- [ ] Implementar gráficos:
  - [ ] Entradas vs saídas
  - [ ] Gastos por categoria
- [ ] Criar tela de listagem de movimentações
- [ ] Criar formulário de criação de movimentação
- [ ] Criar formulário de edição de movimentação
- [ ] Implementar filtro por mês
- [ ] Integrar frontend com API (React Query)
- [ ] Tratar estados de loading e erro

---

## 🎮 FASE 7 — Gamificação Básica  
**Duração:** 2 a 3 dias

### Objetivos
- Incentivar uso contínuo
- Criar sensação de progresso

### Tarefas
- [ ] Implementar contador de dias ativos
- [ ] Criar mensagem de “mês organizado”
- [ ] Implementar indicador de progresso mensal
- [ ] Adicionar feedback visual positivo

---

## 🧪 FASE 8 — Testes, Ajustes e Refinamento  
**Duração:** 4 a 5 dias

### Objetivos
- Garantir estabilidade e boa UX

### Tarefas
- [ ] Realizar testes manuais completos
- [ ] Corrigir bugs encontrados
- [ ] Ajustar UI/UX com base nos testes
- [ ] Melhorar performance básica
- [ ] Revisar segurança básica
- [ ] Revisar textos e mensagens da aplicação

---

## 🚀 FASE 9 — Preparação para Lançamento  
**Duração:** 2 a 3 dias

### Objetivos
- Colocar o MVP no ar com confiança

### Tarefas
- [ ] Revisar variáveis de ambiente em produção
- [ ] Configurar domínio (se aplicável)
- [ ] Criar landing page simples
- [ ] Configurar período de trial (7 ou 14 dias)
- [ ] Testar fluxo completo como usuário final
- [ ] Definir canal de feedback inicial

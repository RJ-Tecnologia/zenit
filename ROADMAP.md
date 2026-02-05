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
- [X] Definir persona principal
- [X] Definir problema central resolvido pelo produto
- [X] Definir proposta de valor do MVP
- [X] Definir escopo fechado do MVP (o que entra e o que fica fora)
- [X] Criar backlog inicial de funcionalidades
- [X] Definir métricas básicas de sucesso
  - [X] Usuário criou conta
  - [X] Usuário cadastrou movimentações
  - [X] Usuário retornou ao app

---

## 🎨 FASE 1 — UX / UI e Fluxos da Aplicação  
**Duração:** 4 a 5 dias

### Objetivos
- Pensar nos fluxos antes de codar
- Reduzir mudanças estruturais futuras

### Tarefas
- [X] Definir padrões visuais:
  - [X] Cores principais
  - [X] Tipografia
  - [X] Layout base

---

## 🧱 FASE 2 — Setup do Projeto e Infraestrutura  
**Duração:** 3 a 4 dias

### Objetivos
- Criar base sólida e organizada
- Garantir consistência desde o início

### Tarefas
- [X] Criar repositório do projeto
- [X] Inicializar projeto Next.js (App Router)
- [X] Configurar TypeScript
- [X] Configurar Biome
- [X] Configurar TailwindCSS
- [X] Instalar e configurar Shadcn UI
- [X] Configurar variáveis de ambiente
- [X] Criar projeto no Supabase
- [X] Configurar Prisma:
  - [X] Conexão com banco
  - [X] Estrutura inicial
  - [X] Migrations iniciais
- [X] Configurar deploy inicial na Vercel

---

## 🗄️ FASE 3 — Modelagem de Dados e Regras de Negócio  
**Duração:** 3 a 4 dias

### Objetivos
- Garantir integridade dos dados
- Preparar base para o backend

### Tarefas
- [X] Modelar entidade User
- [X] Modelar entidade Transaction
- [X] Modelar entidade Category
- [X] Definir relacionamentos entre tabelas
- [X] Criar migrations no Prisma

---

## 🔐 FASE 4 — Autenticação e Autorização  
**Duração:** 3 a 4 dias

### Objetivos
- Garantir acesso seguro
- Isolar dados por usuário

### Tarefas
- [X] Configurar autenticação (Supabase Auth ou Clerk)
- [X] Implementar cadastro de usuário
- [X] Implementar login
- [X] Implementar logout
- [X] Proteger rotas privadas

---

## 📡 FASE 5 — Backend (API e Regras de Negócio)  
**Duração:** 7 a 9 dias

### Objetivos
- Implementar o core da aplicação

### Tarefas
- [ ] Criar módulo de transactions
- [ ] Criar módulo de categories
- [ ] Implementar repositories
- [ ] Implementar services
- [ ] Criar server action para criar movimentação
- [ ] Criar server action para listar movimentações por mês
- [ ] Criar server action para editar movimentação
- [ ] Criar server action para excluir movimentação
- [ ] Implementar validações com Zod
- [ ] Garantir isolamento de dados por usuário

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
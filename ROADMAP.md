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
- [X] Configurar deploy inicial na Netlify

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
- [X] Configurar autenticação (Clerk)
- [X] Implementar cadastro de usuário
- [X] Implementar login
- [X] Implementar logout
- [X] Proteger rotas privadas

---

## 📡 FASE 5 — Backend (Actions e Regras de Negócio)  
**Duração:** 7 a 9 dias

### Objetivos
- Implementar o core da aplicação

### Tarefas
- [X] Criar server action para criar movimentação
- [X] Criar server action para listar movimentações por mês
- [X] Criar server action para editar movimentação
- [X] Criar server action para excluir movimentação
- [X] Implementar validações com Zod
- [X] Garantir isolamento de dados por usuário

---

## 🖥️ FASE 6 — Frontend (Funcionalidades Principais)
**Duração:** 7 a 10 dias

### Objetivos
- Entregar valor real ao usuário

### Tarefas
- [X] Implementar layout base da aplicação
- [X] Implementar Dashboard
  - [X] Saldo do mês
  - [X] Total de entradas
  - [X] Total de saídas
- [X] Criar tela de listagem de movimentações
- [X] Criar formulário de criação de movimentação
- [X] Criar formulário de edição de movimentação
- [X] Implementar filtro por mês
- [ ] Implementar gráficos:
  - [ ] Entradas vs saídas
  - [ ] Gastos por categoria

---

## 🚀 FASE 7 — Preparação para o Lançamento  
**Duração:** 2 a 3 dias

### Objetivos
- Colocar o MVP no ar com confiança

### Tarefas
- [X] Configurar domínio (se aplicável)
- [ ] Definir os planos que a aplicação terá
- [ ] Criar landing page simples

---

## 🛠️ FASE 8 — Revisão da stack e ferramentas utilizadas
**Duração:** Indeterminado

### Objetivos
- Analisar a stack e ferramentas utilizadas e ver se faz sentido o uso ao longo prazo

### Tarefas
- [ ] Analisar o uso do Clerk (vai ter um custo ao longo prazo e possui um vendor lock-in grande)
  - [ ] Verificar se vale mais a pena utilizar outra forma de autenticação ou implementar do zero.
- [ ] Analisar o uso do Next.js (não tem grande impacto na aplicação, visto que é necessário fazer login para usá-la)
  - [ ] Verificar se vale a pena trocar para a stack React + Node.js, o que pode melhorar a escalabilidade do back-end
  - [ ] Se optarmos por trocar a stack, apenas a Landing Page seria feita com o Next.js (ou Astro) pois precisaria de um bom SEO
- [ ] Fazer as mudanças que forem necessárias

---

## 💸 FASE 9 — Implementar meios de pagamentos
**Duração:** 3 a 6 dias

### Objetivos
- Integrar com algum gateway de pagamentos

### Tarefas
- [ ] Integrar com o Stripe (ou outro gateway de pagamentos)
- [ ] Configurar período de trial (7 ou 14 dias)

---

## 🎨 FASE 10 — Melhorar UI/UX
**Duração:** Indeterminado

### Objetivos
- Realizar mudanças na interface do projeto e na usabilidade

### Tarefas
- [ ] Alterar a paleta de cores para ter uma identidade visual própria
  - [ ] Buscar inspirações no Dribbble, Figma, Pinterest ou outro local
- [ ] Alterar a interface da aplicação deixando-a com um visual mais moderno utilizando a nova paleta de cores
- [ ] Testar a usabilidade do projeto e melhorar conforme for encontrando pontos de melhoria

---

## 🐞 FASE 11 — Testes automatizados
**Duração:** 2 a 5 dias

### Objetivos
- Criar testes automatizados para garantir o funcionamento adequado da aplicação

### Tarefas
- [ ] Implementar testes unitários com o Vitest (ou outra ferramenta)
- [ ] Implementar testes E2E com o Playwright (ou Cypress)

---

## 📉 FASE 12 — Divulgação, marketing orgânico e campanhas
**Duração:** Indeterminado

### Objetivos
- Divulgar a aplicação e, possivelmente, conseguir os primeiros clientes

### Tarefas
- [ ] Definir canal de feedback inicial
- [ ] Criar redes sociais para o produto
- [ ] Criar campanhas no Meta Ads ou Google Ads (opcional)

---

## 💭 FASE 13 — Planejar próximos passos
**Duração:** Indeterminado

### Objetivos
- Divulgar a aplicação e, possivelmente, conseguir os primeiros clientes

### Tarefas
- [ ] Analisar os feedbacks recebidos (caso tenha)
- [ ] Planejar os próximos passos da aplicação de acordo com os feedbacks (ou a falta deles)
- [ ] Atualizar o Roadmap

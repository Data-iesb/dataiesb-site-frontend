# Portal DATA IESB

Nova versão pública do portal DATA IESB, construída com Next.js 16, React 19 e TypeScript. O projeto preserva o conteúdo e as integrações do portal anterior em um shell responsivo inspirado na arquitetura de navegação do BigData FUNASA, com identidade visual própria do DATA IESB.

## Desenvolvimento local

Requer Node.js 20 (veja `.nvmrc`).

```bash
npm ci
npm run dev
```

Validação completa:

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

`npm run build` gera um site estático em `out/`. Esse diretório, e não a raiz do repositório, é a origem que deve ser sincronizada com S3/CloudFront. A sincronização não usa exclusão automática porque o bucket também contém imagens de relatórios gerenciadas fora deste repositório.

Como a distribuição atual não resolve automaticamente `rota/index.html`, os workflows publicam cada arquivo `out/**/index.html` também como um objeto cuja chave termina em `/`. Essa etapa mantém as URLs limpas (`/noticias/`, `/ia-iesb/` etc.) sem modificar a infraestrutura CloudFront.

## Configuração pública

Copie `.env.example` para `.env.local` apenas quando precisar substituir uma URL. Todas as variáveis `NEXT_PUBLIC_*` são incorporadas ao bundle e jamais devem conter credenciais, chaves privadas ou segredos AWS.

O portal consome as APIs públicas de notícias, aplicações e equipe, mantém a Aurya como destino externo e envia o formulário de contato para a API Gateway existente. As respostas são validadas antes de entrarem na interface, com timeout, estados de erro/vazio e nova tentativa.

## Painéis incorporados

Somente URLs HTTPS de `app.dataiesb.com` e `funasa.dataiesb.com` podem ser abertas em iframe. Os painéis preservados são:

- SUS — Autorizações de Internação Hospitalar (AIH)
- SUS — Produção Ambulatorial
- SUS — SINAN: Doenças e Agravos

O recorte do iframe remove o shell duplicado dos portais de origem. A visualização sempre oferece estado de carregamento, timeout, repetição e abertura externa como contingência.

## Compatibilidade

O export inclui aliases para `quem-somos.html`, `parceiros.html`, `contato.html` e `ia-iesb/`. As âncoras `#projects` e `#contact` continuam disponíveis na página inicial.

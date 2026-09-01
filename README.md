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

O portal consome as APIs públicas de notícias, aplicações e equipe, mantém a Aurya como destino externo e oferece também uma visualização incorporada da Aurya. O formulário de contato continua usando a API Gateway existente. As respostas são validadas antes de entrarem na interface, com timeout, estados de erro/vazio e nova tentativa. A página inicial preserva os diferenciais, serviços, resultados, publicações e créditos institucionais exibidos no portal oficial anterior e apresenta um panorama nacional com fontes públicas do IBGE, INEP e DATASUS.

## Painéis incorporados

Somente URLs HTTPS de `app.dataiesb.com` e `funasa.dataiesb.com` podem ser abertas em iframe. As experiências incorporadas são:

- Aurya
- SUS — Autorizações de Internação Hospitalar (AIH)
- SUS — Produção Ambulatorial
- SUS — SINAN: Doenças e Agravos
- Saúde Ambiental nas Escolas
- PIB dos Municípios
- Setores Censitários 2022
- Painel das Prefeituras
- Análise de Clusters LISA

O recorte do iframe remove o shell duplicado dos portais de origem e segue a largura real do conteúdo para funcionar também em tablets. Como o portal não pode inspecionar o estado interno de uma origem diferente, o evento de abertura do documento inicia um período adicional de preparação, mas não garante que todas as consultas do dashboard tenham terminado. Por isso, “Recarregar painel” e “Abrir painel” permanecem sempre visíveis.

O iframe sai da sequência de foco do portal: usuários de teclado acessam a versão completa por “Abrir painel”, onde todos os controles do dashboard ficam disponíveis sem o recorte visual.

## Compatibilidade

O export inclui aliases para `quem-somos.html`, `parceiros.html`, `contato.html` e `ia-iesb/`. As âncoras `#projects` e `#contact` continuam disponíveis na página inicial.

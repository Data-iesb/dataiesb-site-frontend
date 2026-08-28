import { expect, test } from '@playwright/test'

const newsPayload = {
  posts: [
    { title: 'Dados que melhoram decisões', slug: 'dados-decisoes', excerpt: 'Uma publicação de teste.', published_at: '2026-08-20T12:00:00.000Z', feature_image: 'https://images.example.org/news-1.png' },
    { title: 'Pesquisa aplicada', slug: 'pesquisa-aplicada', excerpt: 'Resultados do projeto.', published_at: '2026-08-19T12:00:00.000Z' },
    { title: 'Formação acadêmica', slug: 'formacao-academica', excerpt: 'Aprendizado aplicado.', published_at: '2026-08-18T12:00:00.000Z' },
    { title: 'Inteligência artificial', slug: 'inteligencia-artificial', excerpt: 'IA com dados públicos.', published_at: '2026-08-17T12:00:00.000Z' },
  ],
}

const reportsPayload = {
  1: { id_s3: 1, titulo: 'Mercado de trabalho', autor: 'DATA IESB', descricao: 'Indicadores de trabalho.', image_url: 'https://images.example.org/report-1.png' },
  32: { id_s3: 32, titulo: 'AIH Nacional', autor: 'DATA IESB / FUNASA', descricao: 'Internações hospitalares.' },
}

const teamPayload = {
  success: true,
  data: [{ id: '1', name: 'Sérgio Côrtes', role: 'Coordenador Geral', category: 'Coordenação', active: true }],
}

test.beforeEach(async ({ page }) => {
  await page.route('**/ghost/api/content/posts/**', (route) => route.fulfill({ json: newsPayload }))
  await page.route('**/dataiesb-auth/public-reports', (route) => route.fulfill({ json: reportsPayload }))
  await page.route('**/prod/team', (route) => route.fulfill({ json: teamPayload }))
  await page.route('https://images.example.org/**', (route) => route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" />' }))
  await page.route('https://aurya.dataiesb.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<main><h1>Aurya</h1></main>' }))
  await page.route('https://app.dataiesb.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<main><h1>Painel DATA IESB</h1></main>' }))
  await page.route('https://funasa.dataiesb.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<main><h1>Painel SUS</h1></main>' }))
})

test('all public routes render from the static export', async ({ page }) => {
  const routes = [
    '/', '/noticias/', '/aplicacoes/', '/aplicacoes/visualizar/?id=1',
    '/quem-somos/', '/parceiros/', '/contato/',
  ]
  for (const route of routes) {
    const response = await page.goto(route)
    expect(response?.ok(), route).toBeTruthy()
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
  }

  for (const route of ['/paineis/sus-aih/', '/paineis/producao-ambulatorial/', '/paineis/sinan-doencas-agravos/']) {
    await page.goto(route)
    await expect(page.locator('iframe')).toBeVisible()
  }
})

test('each SUS dashboard exposes a descriptive browser title', async ({ page }) => {
  const dashboards = [
    ['/paineis/sus-aih/', 'Internações hospitalares (AIH) — DATA IESB'],
    ['/paineis/producao-ambulatorial/', 'Produção ambulatorial — DATA IESB'],
    ['/paineis/sinan-doencas-agravos/', 'SINAN — Doenças e Agravos — DATA IESB'],
  ] as const

  for (const [route, title] of dashboards) {
    await page.goto(route)
    await expect(page).toHaveTitle(title)
  }
})

test('keyboard navigation and theme preference remain available', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()

  await page.getByRole('button', { name: 'Ativar tema claro' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('home preserves the institutional, service and recent-publication content', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: '5 cursos integrados' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'O que entregamos' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Análise de Dados' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Publicações recentes' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Resultados que comprovam capacidade' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'O Projeto Big Data — IESB' })).toBeVisible()
  await expect(page.getByRole('img', { name: 'Equipe DataIESB em sessão de trabalho colaborativo' })).toHaveAttribute('src', '/img/meeting.png')
  const results = page.getByLabel('Resultados do DATA IESB')
  await expect(results).toContainText('12Projetos entregues')
  await expect(results).toContainText('25Membros ativos')
  await expect(page.locator('.service-card-media')).toHaveCount(3)
  await expect(page.getByRole('img', { name: 'Capa de Mercado de trabalho' })).toBeVisible()
  await expect(page.getByText(/Desenvolvido por/)).toBeVisible()
})

test('legacy aliases and section anchors remain compatible', async ({ page }) => {
  for (const [legacy, current] of [['/quem-somos.html', '/quem-somos/'], ['/parceiros.html', '/parceiros/'], ['/contato.html', '/contato/']]) {
    await page.goto(legacy)
    await expect(page).toHaveURL(new RegExp(`${current.replace(/\/$/, '')}/?$`))
  }
  await page.goto('/#projects')
  await expect(page.locator('#projects')).toBeVisible()
  await page.goto('/#contact')
  await expect(page.locator('#contact')).toBeVisible()

  await page.goto('/ia-iesb/')
  await expect(page).toHaveURL(/^https:\/\/aurya\.dataiesb\.com\/?$/)
  await expect(page.getByRole('heading', { name: 'Aurya' })).toBeVisible()
})

test('mobile drawer and shortcuts are usable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Fluxo exclusivo da navegação móvel')
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  const dialog = page.getByRole('dialog', { name: 'Menu móvel' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Fechar menu' })).toBeFocused()
  await expect(page.getByRole('button', { name: 'Fechar menu', exact: true })).toHaveCount(1)
  await expect(page.locator('.portal-header .mobile-menu-button')).toBeHidden()
  await dialog.getByRole('button', { name: 'Fechar menu' }).click()
  await expect(dialog).toBeHidden()
  const shortcuts = page.getByRole('navigation', { name: 'Atalhos móveis' })
  await expect(shortcuts).toBeVisible()
  await expect(shortcuts.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'page')
})

test('partner logos remain contained inside their visual frames', async ({ page }) => {
  await page.goto('/parceiros/')

  await page.getByRole('button', { name: 'Ativar tema claro' }).click()
  await expect(page.locator('.partner-logo.is-iesb')).toHaveCSS('background-color', 'rgb(46, 46, 46)')

  const logos = page.locator('.partner-logo')
  await expect(logos).toHaveCount(4)
  for (let index = 0; index < await logos.count(); index += 1) {
    const frameBox = await logos.nth(index).boundingBox()
    const imageBox = await logos.nth(index).locator('img').boundingBox()
    expect(frameBox).not.toBeNull()
    expect(imageBox).not.toBeNull()
    expect(imageBox!.x).toBeGreaterThanOrEqual(frameBox!.x)
    expect(imageBox!.y).toBeGreaterThanOrEqual(frameBox!.y)
    expect(imageBox!.x + imageBox!.width).toBeLessThanOrEqual(frameBox!.x + frameBox!.width)
    expect(imageBox!.y + imageBox!.height).toBeLessThanOrEqual(frameBox!.y + frameBox!.height)
  }
})

test('dashboard crop follows the iframe width at tablet size', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Uma execução desktop controla a largura intermediária')
  await page.setViewportSize({ width: 900, height: 900 })
  await page.goto('/paineis/producao-ambulatorial/')

  const canvasBox = await page.getByTestId('dashboard-canvas').boundingBox()
  const frameBox = await page.locator('iframe').boundingBox()
  expect(canvasBox).not.toBeNull()
  expect(frameBox).not.toBeNull()
  expect(Math.round(frameBox!.x)).toBe(Math.round(canvasBox!.x))
  expect(Math.round(frameBox!.width)).toBe(Math.round(canvasBox!.width))
  expect(Math.round(frameBox!.height - canvasBox!.height)).toBe(128)
})

test('contact flow is validated without sending a real message', async ({ page }) => {
  let submitted = false
  await page.route('**/default/dataiesb-contato', async (route) => {
    submitted = true
    await route.fulfill({ json: { ok: true } })
  })
  await page.goto('/contato/')
  await page.getByRole('button', { name: 'Enviar mensagem' }).click()
  await expect(page.locator('.form-error')).toContainText('Preencha nome')
  await expect(page.getByLabel('Nome')).toBeFocused()
  await page.getByLabel('Nome').fill('Pessoa Teste')
  await page.getByLabel('Cidade').fill('Brasília')
  await page.getByLabel('E-mail').fill('teste@example.com')
  await page.getByLabel('Mensagem').fill('Mensagem de validação local.')
  await page.getByRole('button', { name: 'Enviar mensagem' }).click()
  await expect(page.getByRole('status')).toContainText('Mensagem enviada')
  expect(submitted).toBe(true)
})

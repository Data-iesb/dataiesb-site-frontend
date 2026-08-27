import { expect, test } from '@playwright/test'

const newsPayload = {
  posts: [
    { title: 'Dados que melhoram decisões', slug: 'dados-decisoes', excerpt: 'Uma publicação de teste.', published_at: '2026-08-20T12:00:00.000Z' },
    { title: 'Pesquisa aplicada', slug: 'pesquisa-aplicada', excerpt: 'Resultados do projeto.', published_at: '2026-08-19T12:00:00.000Z' },
  ],
}

const reportsPayload = {
  1: { id_s3: 1, titulo: 'Mercado de trabalho', autor: 'DATA IESB', descricao: 'Indicadores de trabalho.' },
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

test('legacy aliases and section anchors remain compatible', async ({ page }) => {
  for (const [legacy, current] of [['/quem-somos.html', '/quem-somos/'], ['/parceiros.html', '/parceiros/'], ['/contato.html', '/contato/']]) {
    await page.goto(legacy)
    await expect(page).toHaveURL(new RegExp(`${current.replace(/\/$/, '')}/?$`))
  }
  await page.goto('/#projects')
  await expect(page.locator('#projects')).toBeVisible()
  await page.goto('/#contact')
  await expect(page.locator('#contact')).toBeVisible()
})

test('mobile drawer and shortcuts are usable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Fluxo exclusivo da navegação móvel')
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  await expect(page.getByRole('complementary', { name: 'Menu móvel' })).toBeVisible()
  await page.getByRole('button', { name: 'Fechar menu', exact: true }).click()
  await expect(page.getByRole('complementary', { name: 'Menu móvel' })).toBeHidden()
  await expect(page.getByRole('navigation', { name: 'Atalhos móveis' })).toBeVisible()
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
  await page.getByLabel('Nome').fill('Pessoa Teste')
  await page.getByLabel('Cidade').fill('Brasília')
  await page.getByLabel('E-mail').fill('teste@example.com')
  await page.getByLabel('Mensagem').fill('Mensagem de validação local.')
  await page.getByRole('button', { name: 'Enviar mensagem' }).click()
  await expect(page.getByRole('status')).toContainText('Mensagem enviada')
  expect(submitted).toBe(true)
})

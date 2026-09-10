import { siteConfig } from '@/config/site'

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData()
  formData.append('file', audioBlob, 'audio.webm')

  const response = await fetch(`${siteConfig.auryaApiUrl}/transcribe/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Não foi possível transcrever o áudio. Tente novamente.')
  }

  const data = await response.json() as { sucesso?: boolean; texto?: string; erro?: string }

  if (!data.sucesso) {
    throw new Error(data.erro || 'Não foi possível transcrever o áudio. Tente novamente.')
  }

  return data.texto ?? ''
}

export async function synthesizeSpeech(text: string): Promise<string> {
  const response = await fetch(`${siteConfig.auryaApiUrl}/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })

  if (!response.ok) {
    throw new Error('Não foi possível gerar o áudio da resposta.')
  }

  const data = await response.json() as { url?: string }

  if (!data.url) {
    throw new Error('Não foi possível gerar o áudio da resposta.')
  }

  return data.url
}
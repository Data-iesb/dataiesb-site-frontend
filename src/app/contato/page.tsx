import { Building2, Mail, MapPin } from 'lucide-react'
import type { Metadata } from 'next'

import { ContactForm } from '@/components/contact-form'
import { PageIntro } from '@/components/content-ui'

export const metadata: Metadata = { title: 'Contato' }

export default function Page() {
  return (
    <div className="page-content">
      <PageIntro eyebrow="Institucional" title="Vamos conversar" description="Envie sua dúvida, proposta de colaboração ou desafio de dados para a equipe do DATA IESB." />
      <div className="contact-layout">
        <section className="contact-panel"><ContactForm /></section>
        <aside className="contact-details">
          <div><Building2 /><span><strong>Centro Universitário IESB</strong>Projeto Big Data — IESB</span></div>
          <div><MapPin /><span><strong>Brasília, Distrito Federal</strong>Campus Sul — Asa Sul</span></div>
          <div><Mail /><span><strong>Contato digital</strong>Use o formulário para falar com a equipe.</span></div>
        </aside>
      </div>
    </div>
  )
}

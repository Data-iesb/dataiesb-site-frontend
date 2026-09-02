'use client'

import { ExternalLink } from 'lucide-react'

import { PageIntro, ResourceState } from '@/components/content-ui'
import { mergeTeamMembers } from '@/config/team'
import { useRemoteResource } from '@/hooks/use-remote-resource'
import { loadTeam } from '@/lib/content-api'

export function TeamPage() {
  const team = useRemoteResource(loadTeam)
  const visibleTeam = mergeTeamMembers(team.data)
  const categories = [...new Set(visibleTeam.map((member) => member.category))]

  return (
    <div className="page-content">
      <PageIntro eyebrow="Institucional" title="Conheça o Projeto Big Data IESB" description="Ciência de dados, inteligência artificial e formação acadêmica aplicadas a desafios públicos e organizacionais." />
      <section className="story-grid">
        <div><span className="eyebrow">Nossa atuação</span><h2>Conhecimento que conecta universidade e sociedade</h2></div>
        <div>
          <p>O Projeto Big Data IESB é uma iniciativa estratégica voltada à criação e manutenção de uma base estruturada de informações públicas e, quando aplicável, dados de organizações parceiras.</p>
          <p>Seu objetivo é apoiar a compreensão das conjunturas estadual, distrital e municipal, contribuindo para decisões mais qualificadas, políticas baseadas em evidências e melhores serviços à população.</p>
          <p>O projeto também funciona como ambiente de aprendizagem aplicada para estudantes do IESB, que trabalham com ferramentas e metodologias de Ciência de Dados e Inteligência Artificial em projetos reais.</p>
        </div>
      </section>
      <section className="wide-image"><img src="/img/quem-somos/iesb-labs.jpeg" alt="Laboratório de computadores do IESB" /></section>
      <section className="page-section" aria-labelledby="equipe-heading">
        <div className="section-heading"><div><span className="eyebrow">Pessoas</span><h2 id="equipe-heading">Equipe técnica</h2></div></div>
        <ResourceState status={team.status} error={team.error} retry={team.retry} emptyMessage="A equipe será publicada em breve." />
        {categories.map((category) => (
          <div className="team-category" key={category}><h3>{category}</h3><div className="team-grid">{visibleTeam.filter((member) => member.category === category).map((member) => (
            <article className="team-card" key={member.id}><span className="member-mark">{member.name.split(' ').slice(0, 2).map((part) => part[0]).join('')}</span><div><h4>{member.name}</h4><p>{member.role}</p><div className="member-links">{member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ExternalLink size={13} /></a>}{member.escavador && <a href={member.escavador} target="_blank" rel="noopener noreferrer">Escavador <ExternalLink size={13} /></a>}</div></div></article>
          ))}</div></div>
        ))}
      </section>
    </div>
  )
}

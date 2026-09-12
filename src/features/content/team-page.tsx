'use client'

import { ExternalLink } from 'lucide-react'

import { PageIntro } from '@/components/content-ui'
import { portalTeamMembers } from '@/config/team'

export function TeamPage() {
  const visibleTeam = portalTeamMembers
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
        {categories.map((category) => (
          <div className="team-category" key={category}><h3>{category}</h3><div className="team-grid">{visibleTeam.filter((member) => member.category === category).map((member) => (
            <article className="team-card" key={member.id}>{member.photoUrl ? <img className="member-photo" src={member.photoUrl} alt={`Foto de ${member.name}`} /> : <span className="member-mark" aria-label={`Iniciais de ${member.name}`}>{member.name.split(' ').slice(0, 2).map((part) => part[0]).join('')}</span>}<div><h4>{member.name}</h4><p>{member.role}</p><div className="member-links">{member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ExternalLink size={13} /></a>}{member.lattes && <a href={member.lattes} target="_blank" rel="noopener noreferrer">Lattes <ExternalLink size={13} /></a>}{member.github && <a href={member.github} target="_blank" rel="noopener noreferrer">GitHub <ExternalLink size={13} /></a>}{member.escavador && <a href={member.escavador} target="_blank" rel="noopener noreferrer">Escavador <ExternalLink size={13} /></a>}</div></div></article>
          ))}</div></div>
        ))}
      </section>
    </div>
  )
}

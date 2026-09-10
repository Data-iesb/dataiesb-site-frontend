import { ArrowRight } from 'lucide-react'

import { PageIntro } from '@/components/content-ui'
import { assistants } from '@/config/assistants'

export function AssistantsHub() {
  return (
    <div className="page-content">
      <img className="atena-hub-logo" src="/img/atena.png" alt="Atena — Deusa do Conhecimento" width={112} height={112} />
      <PageIntro
        eyebrow="Inteligência Artificial"
        title="Atena"
        description="Escolha a assistente de inteligência artificial do DATA IESB. Cada Atena é especialista em um conjunto de dados públicos."
      />
      <section className="page-section" aria-labelledby="assistentes-heading">
        <div className="section-heading">
          <div><span className="eyebrow">Assistentes disponíveis</span><h2 id="assistentes-heading">Escolha uma Atena</h2></div>
        </div>
        <div className="card-grid">
          {assistants.map((assistant) => (
            <article className="content-card application-card" key={assistant.id}>
              <div className="application-card-body">
                <span className="card-eyebrow">{assistant.eyebrow}</span>
                <h3>{assistant.title}</h3>
                <p>{assistant.description}</p>
                <footer>
                  <span>DATA IESB</span>
                  <a href={`/assistentes/${assistant.id}/`}>
                    Conversar <ArrowRight size={15} />
                  </a>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

import { PageIntro } from '@/components/content-ui'
import { tccStudents } from '@/config/tcc-students'

export function TccPage() {
  return (
    <div className="page-content">
      <PageIntro
        eyebrow="Trabalhos Acadêmicos"
        title="Trabalhos de Conclusão de Curso (TCC)"
        description="Projetos de conclusão de curso cadastrados pelos alunos do Projeto Big Data IESB."
      />
      <section className="page-section" aria-label="Alunos de TCC">
        <p className="tcc-section-note">Alunos cadastrados para o semestre 2026.2.</p>
        <div className="tcc-student-grid">
          {tccStudents.map((student) => (
            <article className={`tcc-student-card${student.photoUrl ? ' has-photo' : ''}`} key={student.id}>
              {student.photoUrl && <img className="tcc-student-photo" src={student.photoUrl} alt={`Foto de ${student.name}`} />}
              <div className="tcc-student-copy">
                <p className="tcc-student-role">Aluno de TCC</p>
                <h2>{student.name}</h2>
                {student.provisionalTitle && <p className="tcc-student-title">{student.provisionalTitle}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

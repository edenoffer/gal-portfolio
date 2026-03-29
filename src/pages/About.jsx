import styles from './About.module.css';

const tools = [
  {
    category: '3D & Animation',
    items: ['Blender', 'Maya', 'ZBrush', 'Substance Painter', 'Spine 2D'],
  },
  {
    category: 'Game Engine',
    items: ['Unity', 'Animator State Machine', 'Timeline', 'Particle System', 'Prefabs'],
  },
  {
    category: 'Design & VFX',
    items: ['After Effects', 'Photoshop', 'Illustrator'],
  },
  {
    category: 'Core Skills',
    items: ['Character Animation', 'Rigging & Skinning', 'Asset Integration', 'UV Mapping', 'Stylized Texturing'],
  },
];

const education = [
  {
    degree: 'BFA in Animation — Screen-Based Arts',
    school: 'Bezalel Academy of Art and Design',
    location: 'Jerusalem',
    year: '2017–2021',
  },
  {
    degree: 'Exchange — Traditional Animation',
    school: 'École nationale supérieure des Arts Décoratifs (ENSAD)',
    location: 'Paris',
    year: '2019',
  },
  {
    degree: 'Intensive Maya Animation Workshop',
    school: 'Animation Collaborative',
    location: 'Emeryville, CA',
    year: '2016',
  },
];

export default function About() {
  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        {/* Left column */}
        <div className={styles.left}>
          <div className={styles.photoplaceholder}>
            <span className={styles.photoHint}>Add photo here</span>
          </div>
        </div>

        {/* Right column */}
        <div className={styles.right}>
          <header className={styles.header}>
            <span className="mono">About</span>
            <h1 className={styles.name}>Gal Michalevicz</h1>
            <p className={styles.role}>3D Animator · Amsterdam, NL · EU citizen</p>
          </header>

          <hr className={styles.rule} />

          <section className={styles.bio}>
            <p>
              I animate. I also build the rigs, write the shaders, and manage the pipeline.
            </p>
            <p>
              I graduated from Bezalel Academy of Art and Design in Jerusalem in 2021 — with a semester at ENSAD Paris and a workshop at Animation Collaborative in California along the way. From 2021 to 2025, I was at Sneaky Panda, a mobile games studio, where I went from animator to the person who kept the entire visual pipeline running.
            </p>
            <p>
              I work across Blender, Spine 2D, and Unity. I care about characters that feel real when they move — and about the technical side that makes them perform cleanly on a mobile build.
            </p>
            <p>
              Outside of work: horror literature, cats, and miso soup. Not simultaneously.
            </p>
          </section>

          <hr className={styles.rule} />

          <section className={styles.tools}>
            <div className={styles.toolsHeader}>
              <span className="mono">Tools & Skills</span>
            </div>
            <div className={styles.toolsGrid}>
              {tools.map((group) => (
                <div key={group.category} className={styles.toolGroup}>
                  <p className={styles.toolCategory}>{group.category}</p>
                  <ul className={styles.toolList}>
                    {group.items.map((item) => (
                      <li key={item} className={styles.toolItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <hr className={styles.rule} />

          <section className={styles.education}>
            <div className={styles.educationHeader}>
              <span className="mono">Education</span>
            </div>
            {education.map((entry) => (
              <div key={entry.school} className={styles.eduItem}>
                <div className={styles.eduMain}>
                  <span className={styles.eduDegree}>{entry.degree}</span>
                  <span className={styles.eduSchool}>{entry.school}</span>
                </div>
                <span className={styles.eduYear}>{entry.location} · {entry.year}</span>
              </div>
            ))}
          </section>

          <hr className={styles.rule} />

          <section className={styles.languages}>
            <span className="mono">Languages</span>
            <div className={styles.langList}>
              <span className={styles.langItem}>English — Fluent</span>
              <span className={styles.langItem}>Hebrew — Fluent</span>
              <span className={styles.langItem}>French — Intermediate</span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

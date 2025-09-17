import './App.css';
import React, { useState, useEffect, useRef } from 'react';
// ShipOnTimeline component must be defined at the top level, outside App

const lightTheme = {
  '--bg-color': '#e0f7fa', // light ocean blue
  '--accent1': '#ffe0b2', // sandy beige
  '--accent2': '#ffb6b9', // coral pink
  '--accent3': '#fffde4', // sunlit gradient
  '--text-color': '#00334e', // deep blue
  '--nav-bg': '#b2ebf2',
};
const darkTheme = {
  '--bg-color': '#0a192f', // deep navy
  '--accent1': '#04364a', // teal
  '--accent2': '#00bcd4', // bioluminescent blue
  '--accent3': '#0ef6cc', // glowing accent
  '--text-color': '#e0f7fa', // light blue
  '--nav-bg': '#112240',
};

// ShipOnTimeline component must be defined at the top level, outside App
function ShipOnTimeline() {
  const shipRef = useRef(null);
  useEffect(() => {
    function moveShip() {
      const path = document.getElementById('timeline-path');
      if (!path) return;
      const totalLength = path.getTotalLength();
      const section = document.getElementById('hackathons');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = 1 - Math.max(0, Math.min(1, (rect.bottom - 100) / (windowHeight + rect.height - 100)));
      progress = Math.max(0, Math.min(1, progress));
      const point = path.getPointAtLength(progress * totalLength);
      if (shipRef.current) {
        shipRef.current.style.left = `${point.x - 24}px`;
        shipRef.current.style.top = `${point.y - 40}px`;
      }
    }
    window.addEventListener('scroll', moveShip);
    moveShip();
    return () => window.removeEventListener('scroll', moveShip);
  }, []);
  return (
    <div ref={shipRef} style={{position: 'absolute', width: 48, height: 48, zIndex: 2, transition: 'left 0.2s, top 0.2s'}}>
      <svg width="48" height="48" viewBox="0 0 48 48">
        <g>
          <rect x="18" y="28" width="12" height="8" rx="3" fill="#04364a" stroke="#00bcd4" strokeWidth="2"/>
          <polygon points="24,8 28,28 20,28" fill="#ffe0b2" stroke="#04364a" strokeWidth="2"/>
          <rect x="22" y="16" width="4" height="12" fill="#00bcd4"/>
        </g>
      </svg>
    </div>
  );
}

function applyTheme(theme) {
  for (const key in theme) {
    document.documentElement.style.setProperty(key, theme[key]);
  }
}

function App() {
  // Ship animation along the zig-zag path
  const [lineDims, setLineDims] = useState({ top: 0, height: 0 });
  const shipRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    function moveShip() {
      const path = document.getElementById('curvy-timeline-path');
      if (!path) return;
      const totalLength = path.getTotalLength();
      const section = document.getElementById('hackathons');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = 1 - Math.max(0, Math.min(1, (rect.bottom - 100) / (windowHeight + rect.height - 100)));
      progress = Math.max(0, Math.min(1, progress));
      const point = path.getPointAtLength(progress * totalLength);
      // Position ship relative to the timeline container, not the viewport
      const timeline = document.querySelector('.alt-timeline-container');
      const svg = path.ownerSVGElement;
      if (shipRef.current && timeline && svg) {
        // Center horizontally: SVG is centered in timeline, so offset by half timeline width minus half SVG width
        const timelineRect = timeline.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();
        const timelineWidth = timelineRect.width;
        const svgWidth = svgRect.width;
        // The SVG is centered, so its left = timeline left + (timelineWidth - svgWidth)/2
        const svgLeft = (timelineWidth - svgWidth) / 2;
        shipRef.current.style.left = `${svgLeft + point.x - 24}px`;
        shipRef.current.style.top = `${point.y - 40}px`;
        shipRef.current.style.transform = `translateY(${lineDims.top}px)`;
      }
    }
    window.addEventListener('scroll', moveShip);
    moveShip();
    return () => window.removeEventListener('scroll', moveShip);
  }, [lineDims.height]);

  useEffect(() => {
    // Calculate the vertical line's position and height between first and last card
    const container = document.querySelector('.alt-timeline-container');
    const cards = container ? container.querySelectorAll('.alt-timeline-card') : [];
    if (cards.length >= 2) {
      const first = cards[0].getBoundingClientRect();
      const last = cards[cards.length - 1].getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setLineDims({
        top: (first.top - containerRect.top) + first.height / 2,
        height: (last.top - first.top) + (last.height - first.height) / 2
      });
    }
  }, []);

  // Set theme on mount and when darkMode changes
  useEffect(() => {
    applyTheme(darkMode ? darkTheme : lightTheme);
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Me</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#hackathons">Hackathons & Major Projects</a></li>
          <li><a href="#other-projects">Other Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="theme-toggle" onClick={handleToggle}>
          {darkMode ? '🌙 Dark Sea' : '🌞 Light Sea'}
        </button>
      </nav>

      {/* ...existing code for sections... */}
      <section id="home" className="section home-section home-flex">
        <div className="profile-pic-container">
          <img src="https://avatars.githubusercontent.com/u/99100971?v=4" alt="Naveen Kumar G" className="profile-pic large" />
        </div>
        <div className="intro-text">
          <h1 className="intro-title">Naveen Kumar G</h1>
          <h2 className="intro-subtitle">AI & Web Developer</h2>
          <p className="intro-desc">Dedicated to technology, innovation, and solving real-world problems through teamwork, rapid prototyping, and automation.</p>
          <div className="intro-links">
            <a href="https://www.linkedin.com/in/naveenkumarg-ai" className="intro-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
            </a>
            <a href="https://github.com/zoro1324" className="intro-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.587 8.2-6.086 8.2-11.385 0-6.63-5.373-12-12-12z"/></svg>
            </a>
            <a href="mailto:naveenkumar.g@example.com" className="intro-link" aria-label="Email">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-11.99-7.065v14c0 1.104.896 2 2 2h19.98c1.104 0 2-.896 2-2v-14l-11.99 7.065zm11.99-9.065c0-1.104-.896-2-2-2h-19.98c-1.104 0-2 .896-2 2v.217l12 7.078 11.99-7.078v-.217z"/></svg>
            </a>
          </div>
        </div>
      </section>


      <section id="about" className="section about-section">
        <div className="about-card">
          <h2>About Me</h2>
          <p className="about-bio">
            Hi, I'm Naveen Kumar G, a B.Tech student in Artificial Intelligence & Data Science at KGISL University. I am passionate about technology, innovation, and solving real-world problems through teamwork, rapid prototyping, and automation. I enjoy building scalable web apps, experimenting with AI/ML, and automating tasks to make life easier.
          </p>
          <div className="about-languages">
            <h3>Programming Languages</h3>
            <div className="languages-grid">
              <div className="lang-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                <div>
                  <strong>Python</strong>
                  <p>My go-to for AI, ML, and automation. Clean, powerful, and versatile.</p>
                </div>
              </div>
              <div className="lang-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
                <div>
                  <strong>JavaScript</strong>
                  <p>Essential for interactive web apps and modern frontend development.</p>
                </div>
              </div>
              <div className="lang-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" />
                <div>
                  <strong>Java</strong>
                  <p>Solid OOP foundation, used for academic projects and Android basics.</p>
                </div>
              </div>
              <div className="lang-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
                <div>
                  <strong>HTML5</strong>
                  <p>Semantic, accessible markup for robust and modern web pages.</p>
                </div>
              </div>
              <div className="lang-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
                <div>
                  <strong>CSS3</strong>
                  <p>Styling and layout for beautiful, responsive user interfaces.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="section education-section">
        <h2>Education</h2>
        <ul>
          <li><strong>KGISL University</strong> — B.Tech in Artificial Intelligence & Data Science</li>
        </ul>
      </section>

      <section id="skills" className="section skills-section">
  <h2>Skills</h2>
  <div className="section-divider"></div>
        <div className="skills-card-grid">
          <div className="skill-card">
            <div className="skill-icon" title="Django">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django" />
            </div>
            <div className="skill-info">
              <h3>Django</h3>
              <p>Robust backend web framework for rapid development and clean design.</p>
            </div>
          </div>
          <div className="skill-card">
            <div className="skill-icon" title="React">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
            </div>
            <div className="skill-info">
              <h3>React</h3>
              <p>Modern JavaScript library for building fast, interactive UIs.</p>
            </div>
          </div>
          <div className="skill-card">
            <div className="skill-icon" title="TensorFlow">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" />
            </div>
            <div className="skill-info">
              <h3>TensorFlow</h3>
              <p>Open-source platform for machine learning and deep learning projects.</p>
            </div>
          </div>
          <div className="skill-card">
            <div className="skill-icon" title="UI Path">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/uipath/uipath-original.svg" alt="UI Path" />
            </div>
            <div className="skill-info">
              <h3>UI Path</h3>
              <p>Automation tool for streamlining repetitive business processes.</p>
            </div>
          </div>
          <div className="skill-card">
            <div className="skill-icon" title="GitHub">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
            </div>
            <div className="skill-info">
              <h3>Git & GitHub</h3>
              <p>Version control and collaboration for code and projects.</p>
            </div>
          </div>
          <div className="skill-card">
            <div className="skill-icon" title="Teamwork">
              <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-6 8v-1c0-1.1 3.58-2 6-2s6 .9 6 2v1H6zm-2-1c0-1.1 2.9-2 6-2s6 .9 6 2v1H4v-1z"/></svg>
            </div>
            <div className="skill-info">
              <h3>Teamwork</h3>
              <p>Collaboration, leadership, and communication in tech projects.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="hackathons" className="section hackathons-section">
        <h2>Hackathons & Major Projects</h2>
  <div className="alt-timeline-container" style={{position: 'relative', display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: '0', alignItems: 'center'}} ref={timelineRef}>
          {/* Curvy zig-zag line from first to last card only */}
          {lineDims.height > 0 && (
            <>
              <svg
                width="32"
                height={lineDims.height}
                viewBox={`0 0 32 ${lineDims.height}`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: lineDims.top,
                  transform: 'translateX(-50%)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
                aria-hidden="true"
              >
                <path
                  id="curvy-timeline-path"
                  d={(() => {
                    // Generate a zig-zag path from top to bottom (first to last card)
                    const amplitude = 14;
                    const period = 80;
                    const width = 32;
                    const centerX = width / 2;
                    let d = `M${centerX},0`;
                    let y = 0;
                    let dir = 1;
                    while (y < lineDims.height) {
                      const nextY = Math.min(y + period, lineDims.height);
                      d += ` Q${centerX + amplitude * dir},${y + period / 2} ${centerX},${nextY}`;
                      y = nextY;
                      dir *= -1;
                    }
                    return d;
                  })()}
                  stroke="#00bcd4"
                  strokeWidth="5"
                  fill="none"
                  opacity="0.8"
                  style={{filter: 'drop-shadow(0 0 6px #0ef6cc)'}}
                />
              </svg>
              {/* Ship SVG absolutely positioned and animated along the path */}
              <div ref={shipRef} style={{position: 'absolute', width: 48, height: 48, zIndex: 2, transition: 'left 0.2s, top 0.2s', pointerEvents: 'none'}}>
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <g>
                    <rect x="18" y="28" width="12" height="8" rx="3" fill="#04364a" stroke="#00bcd4" strokeWidth="2"/>
                    <polygon points="24,8 28,28 20,28" fill="#ffe0b2" stroke="#04364a" strokeWidth="2"/>
                    <rect x="22" y="16" width="4" height="12" fill="#00bcd4"/>
                  </g>
                </svg>
              </div>
            </>
          )}
          {/* Timeline cards in zig-zag grid */}
          {[
            {
              title: 'PyExpo 2025',
              side: 'left',
              role: 'Team Lead',
              tech: ['Django', 'Python'],
              description: 'Built a marketplace web app for farmers to sell produce directly to consumers.',
              outcome: '1st Place, Best Social Impact',
            },
            {
              title: 'Hack BIT 2025',
              side: 'right',
              role: 'AI/ML Developer',
              tech: ['Python', 'OpenCV'],
              description: 'Created a facial recognition attendance system for classrooms.',
              outcome: 'Winners, AI/ML Track',
            },
            {
              title: 'KPR Hackathon',
              side: 'left',
              role: 'Participant',
              tech: ['React', 'Node.js'],
              description: 'Developed an AI-powered virtual patient chatbot for psychology students.',
              outcome: 'Finalist',
            },
            {
              title: 'IteliFlow',
              side: 'right',
              role: 'Automation Engineer',
              tech: ['UiPath', 'Python'],
              description: 'Automated candidate selection for a hackathon using bots.',
              outcome: 'Improved selection speed by 80%',
            },
            {
              title: 'IEEE Hackathon',
              side: 'left',
              role: 'Hardware Developer',
              tech: ['Arduino', 'Python'],
              description: 'Built a portable milk analyzer device for dairy supply chains.',
              outcome: 'Prototype tested, Top 5',
            },
          ].map((event) => (
            <React.Fragment key={event.title}>
              {event.side === 'left' ? (
                <div className="alt-timeline-card left" style={{gridColumn: '1 / 2', justifySelf: 'end', marginRight: '32px'}}>
                  <div className="alt-timeline-card-inner">
                    <div className="alt-timeline-card-header" style={{display: 'flex', alignItems: 'center', gap: '0.5em'}}>
                      <h3 style={{margin: 0}}>{event.title}</h3>
                      <span className="alt-timeline-role" style={{fontWeight: 500, fontSize: '1em', color: '#00bcd4'}}>{event.role}</span>
                    </div>
                    <div className="alt-timeline-card-body">
                      <p className="alt-timeline-desc">{event.description}</p>
                      <div className="alt-timeline-tech">
                        {event.tech.map(t => <span key={t} className="alt-timeline-tech-chip">{t}</span>)}
                      </div>
                      <div className="alt-timeline-outcome" style={{marginTop: '0.5em', fontWeight: 600, color: '#0ef6cc'}}>{event.outcome}</div>
                    </div>
                  </div>
                </div>
              ) : <div />}
              {/* Spacer for the timeline line */}
              <div style={{gridColumn: '2 / 3'}} />
              {event.side === 'right' ? (
                <div className="alt-timeline-card right" style={{gridColumn: '3 / 4', justifySelf: 'start', marginLeft: '32px'}}>
                  <div className="alt-timeline-card-inner">
                    <div className="alt-timeline-card-header" style={{display: 'flex', alignItems: 'center', gap: '0.5em'}}>
                      <h3 style={{margin: 0}}>{event.title}</h3>
                      <span className="alt-timeline-role" style={{fontWeight: 500, fontSize: '1em', color: '#00bcd4'}}>{event.role}</span>
                    </div>
                    <div className="alt-timeline-card-body">
                      <p className="alt-timeline-desc">{event.description}</p>
                      <div className="alt-timeline-tech">
                        {event.tech.map(t => <span key={t} className="alt-timeline-tech-chip">{t}</span>)}
                      </div>
                      <div className="alt-timeline-outcome" style={{marginTop: '0.5em', fontWeight: 600, color: '#0ef6cc'}}>{event.outcome}</div>
                    </div>
                  </div>
                </div>
              ) : <div />}
            </React.Fragment>
          ))}
        </div>
      </section>


      <section id="contact" className="section contact-section">
        <h2>Contact</h2>
        <ul>
          <li><strong>GitHub:</strong> <a href="https://github.com/zoro1324" target="_blank" rel="noopener noreferrer">zoro1324</a></li>
          <li><strong>Email:</strong> naveenkumar.g@example.com</li>
        </ul>
      </section>
    </div>
  );
}

export default App;

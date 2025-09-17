import './App.css';
import React, { useState, useEffect, useRef } from 'react';
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

function applyTheme(theme) {
  for (const key in theme) {
    document.documentElement.style.setProperty(key, theme[key]);
  }
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

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
        <div className="timeline-container" style={{position: 'relative', margin: '2rem 0'}}>
          {/* SVG Timeline Path */}
          <svg width="100%" height="120" viewBox="0 0 800 120" style={{position: 'absolute', left: 0, top: 0, zIndex: 0}}>
            <path id="timeline-path" d="M 40 100 Q 200 20 400 100 T 760 100" stroke="#00bcd4" strokeWidth="6" fill="none"/>
          </svg>
          {/* Animated Ship */}
          <ShipOnTimeline />
          {/* Timeline Events */}
          <div className="timeline-events" style={{position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', marginTop: '60px'}}>
            <div className="timeline-event"><span>PyExpo 2025</span></div>
            <div className="timeline-event"><span>Hack BIT 2025</span></div>
            <div className="timeline-event"><span>KPR Hackathon</span></div>
            <div className="timeline-event"><span>IteliFlow</span></div>
            <div className="timeline-event"><span>IEEE Hackathon</span></div>
          </div>
        </div>
        <ul>
          <li><strong>PyExpo 2025</strong> (Team Lead): Built a local marketplace for farmers using Django. [Repo: T043_CODECRAFTERS]</li>
          <li><strong>Hack BIT 2025</strong> (Team Member, Winners in AI/ML): Facial attendance system with AI/ML. [Repo: BIT-25]</li>
          <li><strong>KPR Hackathon</strong> (Participant): AI-powered virtual patient chat for psychology students. [Repo: KPR-Hackathon]</li>
          <li><strong>IteliFlow</strong> (Participant): Automated hackathon candidate selection with UI Path. [Repo: Selection_Automation]</li>
          <li><strong>IEEE Hackathon</strong> (Participant): Portable milk analyzer device for dairy supply chains. [Repo: Portable-Milk-Analyzer]</li>
        </ul>
      </section>


      <section id="other-projects" className="section other-projects-section">
        <h2>Other Projects</h2>
        <p>More details coming soon...</p>
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

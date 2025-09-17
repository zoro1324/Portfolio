
import './App.css';

function App() {
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
      </nav>

      <section id="home" className="section home-section">
        <h1>Welcome to Naveen Kumar G's Portfolio</h1>
        <p>Sea-inspired portfolio for an AI & Web Developer</p>
      </section>

      <section id="about" className="section about-section">
        <h2>About Me</h2>
        <p>Hi, I'm Naveen Kumar G, a B.Tech student in Artificial Intelligence & Data Science at KGISL University. I am passionate about technology, innovation, and solving real-world problems through teamwork, rapid prototyping, and automation.</p>
      </section>

      <section id="education" className="section education-section">
        <h2>Education</h2>
        <ul>
          <li><strong>KGISL University</strong> — B.Tech in Artificial Intelligence & Data Science</li>
        </ul>
      </section>

      <section id="skills" className="section skills-section">
        <h2>Skills</h2>
        <ul>
          <li>Backend: Django, Django REST Framework</li>
          <li>Frontend: HTML, CSS, JavaScript, React</li>
          <li>Machine Learning & AI: TensorFlow, PyTorch</li>
          <li>Automation: UI Path</li>
          <li>Version Control: Git, GitHub</li>
          <li>Other: Team Leadership, Rapid Prototyping, Problem Solving, Communication & Documentation</li>
        </ul>
      </section>

      <section id="hackathons" className="section hackathons-section">
        <h2>Hackathons & Major Projects</h2>
        {/* Timeline and animated ship will be implemented here */}
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

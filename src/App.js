import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaLayerGroup,
  FaMoon,
  FaSun,
  FaTools,
  FaGraduationCap,
  FaLinkedin,
} from 'react-icons/fa';
import './App.css';

const portfolioData = {
  name: 'Mohamed Salem Ouissi',
  role: 'Developpeur Full Stack',
  tagline:
    'I craft scalable, elegant web experiences with clean architecture and a product mindset.',
  about:
    'Full-stack developer focused on performant and secure web products. Experienced in modern JavaScript stacks and passionate about transforming complex workflows into intuitive digital tools.',
  traits: ['Problem Solver', 'Team Player', 'Detail-Oriented', 'Curious Builder', 'Fast Learner'],
};

const skills = [
  {
    label: 'Languages',
    icon: FaCode,
    items: ['JavaScript', 'HTML', 'CSS', 'PHP', 'SQL'],
  },
  {
    label: 'Frameworks',
    icon: FaLayerGroup,
    items: ['React', 'Node.js', 'Express', 'Bootstrap'],
  },
  {
    label: 'Tools',
    icon: FaTools,
    items: ['MongoDB', 'Git / GitHub', 'Visual Studio Code', 'REST APIs'],
  },
];

const experience = [
  {
    company: 'OFPPT',
    role: "Developpeur Full Stack - Projet de fin d'annee",
    date: 'Mar 2025 - Jun 2025',
    bullets: [
      'Designed and built a platform connecting clients with mechanics and spare-parts shops.',
      'Implemented secure account flows and role-based interfaces for users and providers.',
      'Stack: React, Node.js, Express, MongoDB, HTML, CSS, JavaScript.',
    ],
  },
  {
    company: 'Prefecture de la Province de Tan-Tan',
    role: 'Developpeur Full Stack - Projet de stage',
    date: 'Apr 2025 - May 2025',
    bullets: [
      'Built stock management web application for office materials and inventory tracking.',
      'Developed modules for recording entries, exits, and stock operations with clean UX.',
      'Stack: React, Node.js, Express, MongoDB, HTML, CSS, JavaScript.',
    ],
  },
  {
    company: 'OFPPT',
    role: 'Developpeur Frontend - Projet personnel',
    date: 'Jan 2025 - Feb 2025',
    bullets: [
      'Created intervention-management dashboard for clients, orders, and field operations.',
      'Improved organization, visualization, and security of business data.',
      'Stack: React, HTML, CSS, JavaScript.',
    ],
  },
  {
    company: 'LeadManager',
    role: 'Developpeur Full Stack',
    date: 'Nov 2025 - Feb 2026',
    bullets: [
      'Developed sales management web application with client, appointment, and report modules.',
      'Delivered analytics dashboards and team productivity tooling with scalable APIs.',
      'Stack: React, Node.js, Express, MongoDB, JavaScript.',
    ],
  },
];



const education = [
  {
    school: 'OFPPT - Institut Specialise de Technologie Appliquee Al Oulbour',
    degree: 'Technicien Specialise en Developpement Digital - Option Web Full Stack',
    date: '2022 - 2025',
  },
  {
    school: 'Lycee Ibn Battouta',
    degree: 'Baccalaureat en Sciences Physiques',
    date: '2022',
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }
  return 'dark';
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [isNavSmall, setIsNavSmall] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [scrollProgress, setScrollProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const fullTitle = portfolioData.role;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('seen_loader');
    if (!hasVisited) {
      setLoaderVisible(true);
      const timer = setTimeout(() => {
        setLoaderVisible(false);
        sessionStorage.setItem('seen_loader', 'true');
      }, 1700);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]');
    const visibleRatios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId = 'home';
        let bestRatio = 0;
        visibleRatios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        setActiveSection(bestId);
      },
      {
        threshold: [0.1, 0.2, 0.3, 0.45, 0.6],
        rootMargin: '-12% 0px -55% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTypedText(fullTitle);
      return undefined;
    }

    let index = 0;
    const typer = setInterval(() => {
      index += 1;
      setTypedText(fullTitle.slice(0, index));
      if (index >= fullTitle.length) {
        clearInterval(typer);
      }
    }, 80);
    return () => clearInterval(typer);
  }, [fullTitle]);

  useEffect(() => {
    const onScroll = () => {
      setIsNavSmall(window.scrollY > 24);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer:fine)').matches;
    if (!isDesktop) {
      return undefined;
    }
    const trackCursor = (event) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', trackCursor);
    return () => window.removeEventListener('mousemove', trackCursor);
  }, []);



  const navItems = useMemo(
    () => ['home', 'about', 'skills', 'experience', 'education'],
    []
  );

  const onMagnetMove = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    element.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`;
  };

  const onMagnetLeave = (event) => {
    event.currentTarget.style.transform = 'translate(0, 0)';
  };



  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="cursor-glow" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true" />

      {loaderVisible && (
        <div className="page-loader" aria-hidden="true">
          <div className="loader-card">
            <div className="loader-brand-mark">MSO</div>
            <p className="loader-title">Loading experience</p>
            <p className="loader-subtitle">Preparing a smooth modern portfolio journey.</p>
            <div className="loader-track">
              <span className="loader-fill" />
            </div>
          </div>
        </div>
      )}

      <header className={`top-nav ${isNavSmall ? 'small' : ''}`}>
        <a href="#home" className="brand">
          MSO
        </a>
        <nav aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`nav-link ${activeSection === item ? 'active' : ''}`}
              onClick={() => setActiveSection(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>
        <button
          className="theme-toggle"
          aria-label="Toggle dark/light mode"
          aria-pressed={theme === 'light'}
          onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </header>

      <main>
        <section id="home" className="section hero">
          <div className="grid-bg" aria-hidden="true" />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-intro"
          >
            Hello, my name is
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {portfolioData.name}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            {typedText}
            <span className="typing-caret" aria-hidden="true">
              |
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="hero-tagline"
          >
            {portfolioData.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7 }}
            className="hero-meta"
          >
            <span className="hero-chip">Open to opportunities</span>
            <span className="hero-chip">React / Node.js / MongoDB</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="hero-links"
          >

            <a href="#experience">See Experience</a>
          </motion.div>
          <a href="#about" className="scroll-indicator" aria-label="Scroll to about section">
            <span>Scroll Down</span>
            <span className="scroll-mouse" aria-hidden="true">
              <span className="scroll-wheel" />
            </span>
          </a>
        </section>

        <motion.section
          id="about"
          className="section"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
        >
          <h3>About</h3>
          <div className="about-grid glass-card">
            <div className="avatar-box" aria-hidden="true">
              <span>MSO</span>
            </div>
            <div>
              <p>{portfolioData.about}</p>
              <div className="tag-wrap">
                {portfolioData.traits.map((trait, index) => (
                  <motion.span
                    className="trait-tag"
                    key={trait}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index }}
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="section"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
        >
          <h3>Skills</h3>
          <div className="skills-groups">
            {skills.map((group, index) => {
              const Icon = group.icon;
              return (
                <article
                  className="skill-group-card"
                  key={group.label}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="skill-card-icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <p className="skill-card-label">{group.label}</p>
                  <div className="skill-pill-wrap">
                    {group.items.map((skill) => (
                      <span className="skill-pill" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="experience"
          className="section"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h3>Experience</h3>
          <div className="timeline">
            {experience.map((item, index) => (
              <motion.article
                key={`${item.company}-${item.date}`}
                className="timeline-item glass-card"
                initial={{ opacity: 0, x: -36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                <p className="timeline-date">{item.date}</p>
                <h4>{item.role}</h4>
                <p className="timeline-company">{item.company}</p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.section>



        <motion.section
          id="education"
          className="section"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h3>Education</h3>
          <div className="education-grid">
            {education.map((item, index) => (
              <motion.article
                key={item.school}
                className="education-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="education-icon-box">
                  <FaGraduationCap />
                </div>
                <div className="education-details">
                  <span className="education-date">{item.date}</span>
                  <h4>{item.school}</h4>
                  <p className="education-degree">{item.degree}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">MSO</div>
            <p className="footer-tagline">{portfolioData.role}</p>
          </div>
          
          <nav className="footer-nav" aria-label="Footer navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item}`} className="footer-link">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>

          <div className="footer-socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

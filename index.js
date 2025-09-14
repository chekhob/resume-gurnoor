#!/usr/bin/env node

const chalk = require('chalk');
const boxen = require ('boxen');

// Color scheme
const colors = {
  primary: chalk.cyan,
  secondary: chalk.magenta,
  accent: chalk.yellow,
  text: chalk.white,
  dim: chalk.gray
};

// Resume data - customize this with your information
const resumeData = {
  name: "Gurnoor Singh Kalsi",
  title: "Full Stack Developer",
  contact: {
    email: "gurnoorskalsi@gmail.com",
    phone: "+91 8238817195",
    location: "Bengaluru, KA",
    // website: "https://yourwebsite.com",
    linkedin: "linkedin.com/in/gurnoor-kalsi-644525307",
    github: "github.com/chekhob"
  },
  summary: "Passionate full-stack developer with 4+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies.",
  experience: [
    {
      company: "NextTrial AI",
      position: "Senior Software Engineer",
      period: "March 2025 - Present",
      achievements: [
        "Reduced application load time by 40% through optimization",
      ]
    },
    {
      company: "Getsetyo Technologies",
      position: "Sofware Developmment Enginner 1",
      period: "Jan 2024 - March 2025",
      achievements: [
        "Implemented integration with various 3rd party apis",
        "Collaborated with design team on user experience improvements"
      ]
    }
  ],
  skills: {
    "Languages": ["JavaScript", "TypeScript", "Python", "Java"],
    "Frontend": ["React", "Vue.js", "HTML5", "CSS3", "Tailwind"],
    "Backend": ["Node.js", "Express", "Spring Boot"],
    "Database": ["PostgreSQL", "MongoDB", "Redis"],
    "Cloud": ["AWS", "Docker"]
  },
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University Name",
      year: "2020"
    }
  ]
};

// Helper functions
function createSection(title, content) {
  const header = colors.primary.bold(`\n${title.toUpperCase()}\n${'─'.repeat(title.length + 5)}`);
  return `${header}\n${content}`;
}

function formatContact(contact) {
  return [
    colors.dim('📧 ') + colors.text(contact.email),
    colors.dim('📱 ') + colors.text(contact.phone),
    colors.dim('📍 ') + colors.text(contact.location),
    // colors.dim('🌐 ') + colors.accent(contact.website),
    colors.dim('💼 ') + colors.accent(contact.linkedin),
    colors.dim('🔗 ') + colors.accent(contact.github)
  ].join('\n');
}

function formatExperience(experience) {
  return experience.map(job => {
    const header = `${colors.secondary.bold(job.position)} at ${colors.accent.bold(job.company)}`;
    const period = colors.dim(job.period);
    const achievements = job.achievements.map(achievement => 
      `  ${colors.dim('•')} ${colors.text(achievement)}`
    ).join('\n');
    return `${header} ${period}\n${achievements}`;
  }).join('\n\n');
}

function formatSkills(skills) {
  return Object.entries(skills).map(([category, skillList]) => {
    const categoryName = colors.secondary.bold(category + ':');
    const skillsText = skillList.map(skill => colors.accent(skill)).join(colors.dim(' • '));
    return `${categoryName} ${skillsText}`;
  }).join('\n');
}

function formatEducation(education) {
  return education.map(edu => {
    return `${colors.secondary.bold(edu.degree)}\n${colors.text(edu.school)} ${colors.dim('(' + edu.year + ')')}`;
  }).join('\n');
}

// Main resume display function
function displayResume() {
  console.clear();
  
  // Header with name and title
  const header = boxen(
    `${colors.primary.bold.underline(resumeData.name)}\n${colors.secondary(resumeData.title)}`,
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan'
    }
  );

  // Build resume sections
  const sections = [
    header,
    createSection('Contact', formatContact(resumeData.contact)),
    createSection('Summary', colors.text(resumeData.summary)),
    createSection('Experience', formatExperience(resumeData.experience)),
    createSection('Skills', formatSkills(resumeData.skills)),
  ];

  // Footer
  const footer = boxen(
    colors.dim('Thank you for viewing my resume!\n') +
    colors.accent('Run ') + colors.primary.bold('npx your-package-name') + colors.accent(' anytime to view this resume.'),
    {
      padding: 1,
      margin: { top: 1 },
      borderStyle: 'single',
      borderColor: 'gray',
      textAlignment: 'center'
    }
  );

  // Display everything
  console.log(sections.join('\n'));
  console.log(footer);
}

// Interactive features
function showHelp() {
  console.log(`
${colors.primary.bold('NPX Resume Package')}

${colors.secondary('Available commands:')}
  ${colors.accent('--help, -h')}     Show this help message
  ${colors.accent('--contact')}      Show contact information only
  ${colors.accent('--skills')}       Show skills only
  ${colors.accent('--save')}         Save resume as text file

${colors.dim('Run without arguments to see full resume.')}
  `);
}

function showContactOnly() {
  console.log(boxen(
    `${colors.primary.bold(resumeData.name)}\n${formatContact(resumeData.contact)}`,
    { padding: 1, borderStyle: 'round', borderColor: 'cyan' }
  ));
}

function showSkillsOnly() {
  console.log(boxen(
    `${colors.primary.bold('Skills')}\n\n${formatSkills(resumeData.skills)}`,
    { padding: 1, borderStyle: 'round', borderColor: 'magenta' }
  ));
}

function saveResume() {
  const fs = require('fs');
  const stripAnsi = require('strip-ansi');
  
  // Create plain text version
  const plainText = `
${resumeData.name}
${resumeData.title}
${'='.repeat(50)}

CONTACT
${resumeData.contact.email}
${resumeData.contact.phone}
${resumeData.contact.location}

SUMMARY
${resumeData.summary}

EXPERIENCE
${resumeData.experience.map(job => 
  `${job.position} at ${job.company} (${job.period})\n${job.achievements.map(a => `• ${a}`).join('\n')}`
).join('\n\n')}

SKILLS
${Object.entries(resumeData.skills).map(([cat, skills]) => `${cat}: ${skills.join(', ')}`).join('\n')}

EDUCATION
${resumeData.education.map(edu => `${edu.degree}\n${edu.school} (${edu.year})`).join('\n')}
  `.trim();

  fs.writeFileSync('resume.txt', plainText);
  console.log(colors.accent('✅ Resume saved as resume.txt'));
}

// Command line argument handling
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  showHelp();
} else if (args.includes('--contact')) {
  showContactOnly();
} else if (args.includes('--skills')) {
  showSkillsOnly();
} else if (args.includes('--save')) {
  saveResume();
} else {
  displayResume();
}

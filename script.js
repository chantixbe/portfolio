const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const modal = document.querySelector('.project-modal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.querySelector('.modal-title');
const modalBody = document.querySelector('.modal-body');
const modalTags = document.querySelector('.modal-tags');

const projects = {
  photos: {
    title: 'Photos',
    body: 'Portraits, editorial photography and visual fragments. Use this section for studio shoots, identity projects, lookbooks and personal photographic series.',
    tags: ['portrait', 'editorial', 'visual stories']
  },
  content: {
    title: 'Content Creation',
    body: 'Social media visuals, reels, captions and brand content. Use this category for Instagram, TikTok, LinkedIn content and always-on brand communication.',
    tags: ['reels', 'social media', 'brand tone']
  },
  audiovisual: {
    title: 'Audiovisual',
    body: 'Video projects, editing, short films, event content and moving image. Add case studies that show concept, production and final edit.',
    tags: ['video', 'editing', 'moving image']
  },
  marketing: {
    title: 'Marketing / Creative Strategy',
    body: 'Campaign concepts, content strategy and digital communication. Show how creative ideas become structured brand messages.',
    tags: ['campaign', 'strategy', 'copy']
  },
  other: {
    title: 'Other Projects',
    body: 'Experiments, visual research, editorial layouts, moodboards and personal explorations. A flexible space for creative growth.',
    tags: ['research', 'experiments', 'editorial']
  }
};

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

function openProject(key) {
  const project = projects[key];
  if (!project) return;
  modalTitle.textContent = project.title;
  modalBody.textContent = project.body;
  modalTags.innerHTML = project.tags.map(tag => `<span>(${tag})</span>`).join('');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeProject() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.project));
});
modalClose?.addEventListener('click', closeProject);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeProject();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeProject();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

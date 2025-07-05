// 全局变量
let currentLanguage = 'en';
let currentPage = 'home';

// DOM 元素
const navLinks = document.querySelectorAll('.nav-link');
const pageSection = document.querySelectorAll('.page-section');
const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

// 语言数据
const translations = {
  zh: {
    'page-title': '张三 - 博士生个人主页'
  },
  en: {
    'page-title': 'John Zhang - PhD Student Personal Homepage'
  }
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeLanguageToggle();
  initializeThemeToggle();
  initializeMobileMenu();
  initializeScrollEffects();
  
  // 默认语言设置为中文
  updateLanguage();
  
  // 默认显示主页
  showPage('home');
});

// 导航功能
function initializeNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetPage = this.getAttribute('data-page');
      navLinks.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      showPage(targetPage);
      closeMobileMenu();
    });
  });
}

// 页面切换
function showPage(pageId) {
  pageSection.forEach(section => {
    section.classList.remove('active');
  });
  const targetSection = document.getElementById(pageId);
  if (targetSection) {
    targetSection.classList.add('active');
    currentPage = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 语言切换功能
function initializeLanguageToggle() {
  langToggle.addEventListener('click', function() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    updateLanguage();
    this.querySelector('.lang-text').textContent = currentLanguage === 'zh' ? '中 / EN' : 'EN / 中';
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
  });
}

// 主题切换功能
function initializeThemeToggle() {
    const themeIcon = themeToggle.querySelector('i');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // 检查本地存储或系统偏好来设置初始主题
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
}


// 更新页面所有文本的语言
function updateLanguage() {
  const elements = document.querySelectorAll('[data-zh][data-en]');
  
  elements.forEach(element => {
    const text = element.getAttribute(`data-${currentLanguage}`);
    // 使用innerHTML以支持<strong>等标签
    if (element.innerHTML.includes('<') && element.innerHTML.includes('>')) {
         element.innerHTML = text;
    } else {
        element.textContent = text;
    }
  });
  
  // 更新页面标题
  document.title = translations[currentLanguage]['page-title'];
  
  // 更新HTML lang属性，这对于CSS的:lang选择器生效至关重要
  document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
}

// 移动端菜单
function initializeMobileMenu() {
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

// 关闭移动端菜单
function closeMobileMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = '';
}

// 滚动效果
function initializeScrollEffects() {
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    navbar.style.transform = (scrollTop > lastScrollTop && scrollTop > 100) ? 'translateY(-100%)' : 'translateY(0)';
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.section-block, .education-section, .hero-content > div').forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(30px)';
    block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(block);
  });
}

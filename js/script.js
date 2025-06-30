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
    // 页面标题
    'page-title': '张三 - 博士生个人主页'
  },
  
  en: {
    // 页面标题
    'page-title': 'John Zhang - PhD Student Personal Homepage'
  }
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeLanguageToggle();
  initializeThemeToggle(); // 新增：初始化主题切换
  initializeMobileMenu();
  initializeScrollEffects();
  
  // 设置默认语言
  updateLanguage();
  
  // 设置默认页面
  showPage('home');
});

// 导航功能
function initializeNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetPage = this.getAttribute('data-page');
      
      // 更新导航状态
      navLinks.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      
      // 显示目标页面
      showPage(targetPage);
      
      // 关闭移动端菜单
      closeMobileMenu();
    });
  });
}

// 页面切换
function showPage(pageId) {
  // 隐藏所有页面
  pageSection.forEach(section => {
    section.classList.remove('active');
  });
  
  // 显示目标页面
  const targetSection = document.getElementById(pageId);
  if (targetSection) {
    targetSection.classList.add('active');
    currentPage = pageId;
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 语言切换功能
function initializeLanguageToggle() {
  langToggle.addEventListener('click', function() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    updateLanguage();
    
    // 更新按钮文本
    this.querySelector('.lang-text').textContent = currentLanguage === 'zh' ? '中 / EN' : 'EN / 中';
    
    // 添加切换动画
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
  });
}

// 新增：主题切换功能
function initializeThemeToggle() {
    const themeIcon = themeToggle.querySelector('i');

    // 设置初始主题
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }


    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', theme); // 保存用户选择
    });
}

// 更新语言
function updateLanguage() {
  const elements = document.querySelectorAll('[data-zh][data-en]');
  
  elements.forEach(element => {
    const zhText = element.getAttribute('data-zh');
    const enText = element.getAttribute('data-en');
    
    if (currentLanguage === 'zh') {
      if (element.innerHTML.includes('<strong>')) {
        element.innerHTML = zhText;
      } else {
        element.textContent = zhText;
      }
    } else {
      if (element.innerHTML.includes('<strong>')) {
        element.innerHTML = enText;
      } else {
        element.textContent = enText;
      }
    }
  });
  
  // 更新页面标题
  document.title = currentLanguage === 'zh' ? 
    translations.zh['page-title'] : 
    translations.en['page-title'];
  
  // 更新HTML lang属性
  document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
}

// 移动端菜单
function initializeMobileMenu() {
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // 防止背景滚动
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // 点击菜单外部关闭
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
  // 导航栏滚动效果
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // 向下滚动，隐藏导航栏
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // 向上滚动，显示导航栏
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // 元素进入视口动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // 观察所有section-block元素
  const sectionBlocks = document.querySelectorAll('.section-block');
  sectionBlocks.forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(30px)';
    block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(block);
  });
}

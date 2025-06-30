// 全局变量
let currentLanguage = 'en';
let currentPage = 'home';

// DOM 元素
const navLinks = document.querySelectorAll('.nav-link');
const pageSection = document.querySelectorAll('.page-section');
const langToggle = document.getElementById('langToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

// 语言数据
const translations = {
  zh: {
    // 导航栏
    'nav-home': '首页',
    'nav-research': '研究',
    'nav-about': '更多关于我',
    
    // 首页
    'hero-name': '张三',
    'hero-subtitle': '计算机科学博士生',
    'hero-description': '我是一名专注于人工智能和机器学习的博士生，致力于推动计算机视觉和自然语言处理领域的前沿研究。我的研究兴趣包括深度学习、神经网络架构设计以及AI在实际应用中的落地实践。',
    
    // 教育背景
    'education-title': '教育背景',
    'education-phd': '计算机科学博士',
    'education-phd-school': '清华大学，北京',
    'education-phd-advisor': '导师：李教授',
    'education-bachelor': '计算机科学学士',
    'education-bachelor-school': '北京大学，北京',
    'education-bachelor-gpa': 'GPA: 3.9/4.0，优秀毕业生',
    
    // 最新动态
    'news-title': '最新动态',
    'news-1': '论文《深度学习在计算机视觉中的应用》被CVPR 2024接收',
    'news-2': '获得国家奖学金',
    'news-3': '在AAAI 2024会议上进行口头报告',
    'news-4': '开始在Google Research实习',
    'news-5': '论文《神经网络架构优化》被NeurIPS 2023接收',
    
    // 研究页面
    'research-interests-title': '研究兴趣',
    'interest-1': '深度学习',
    'interest-2': '计算机视觉',
    'interest-3': '自然语言处理',
    'interest-4': '神经网络架构',
    'interest-5': '机器学习',
    'interest-6': '强化学习',
    'interest-7': '多模态学习',
    'interest-8': 'AI安全',
    
    'publications-title': '出版物',
    'pub-1-title': '深度学习在计算机视觉中的创新应用研究',
    'pub-1-authors': '<strong>张三</strong>，李四，王五',
    'pub-1-venue': 'IEEE计算机视觉与模式识别会议 (CVPR), 2024',
    'pub-2-title': '基于注意力机制的神经网络架构优化',
    'pub-2-authors': '李四，<strong>张三</strong>，赵六',
    'pub-2-venue': '神经信息处理系统大会 (NeurIPS), 2023',
    'pub-3-title': '多模态学习中的跨域知识迁移方法',
    'pub-3-authors': '<strong>张三</strong>，王五，陈七',
    'pub-3-venue': '人工智能促进协会会议 (AAAI), 2023',
    'pub-4-title': '强化学习在自动驾驶中的应用与挑战',
    'pub-4-authors': '王五，<strong>张三</strong>，李四，孙八',
    'pub-4-venue': '国际机器学习会议 (ICML), 2022',
    'pub-5-title': '自然语言处理中的预训练模型优化策略',
    'pub-5-authors': '<strong>张三</strong>，陈七，李四',
    'pub-5-venue': '计算语言学协会年会 (ACL), 2022',
    
    // 更多关于我
    'philosophy-title': '学术理念',
    'philosophy-p1': '我坚信人工智能技术应该服务于人类社会的进步与发展。在我的研究中，我始终秉持着严谨的科学态度，追求理论创新与实际应用的完美结合。我认为优秀的研究不仅要在学术上有所突破，更要能够解决现实世界中的实际问题。',
    'philosophy-p2': '作为一名年轻的研究者，我深知合作的重要性。我积极参与跨学科的研究项目，与来自不同背景的学者进行交流合作。我相信，通过开放的学术交流和多元化的思维碰撞，我们能够推动人工智能领域向更加广阔的方向发展。',
    
    'hobbies-title': '兴趣爱好',
    'hobby-1-title': '摄影',
    'hobby-1-desc': '热爱用镜头记录生活中的美好瞬间，特别喜欢风景和街头摄影。',
    'hobby-2-title': '阅读',
    'hobby-2-desc': '广泛阅读科技、哲学和文学作品，保持对世界的好奇心和思考力。',
    'hobby-3-title': '跑步',
    'hobby-3-desc': '坚持长跑锻炼，已完成多次马拉松比赛，享受挑战自我的过程。',
    'hobby-4-title': '音乐',
    'hobby-4-desc': '喜欢古典音乐和爵士乐，偶尔弹奏钢琴来放松心情。',
    'hobby-5-title': '旅行',
    'hobby-5-desc': '热爱探索不同的文化和风景，已游历过20多个国家和地区。',
    'hobby-6-title': '开源项目',
    'hobby-6-desc': '积极参与开源社区，维护多个机器学习相关的开源项目。',
    
    'cv-title': '简历下载',
    'cv-desc': '如需了解更多详细信息，请下载我的完整简历。',
    'cv-chinese': '下载中文简历',
    'cv-english': '下载英文简历',
    
    // 页脚
    'footer-text': '© 2024 张三. 保留所有权利.',
    
    // 页面标题
    'page-title': '张三 - 博士生个人主页'
  },
  
  en: {
    // 导航栏
    'nav-home': 'Home',
    'nav-research': 'Research',
    'nav-about': 'More About Me',
    
    // 首页
    'hero-name': 'John Zhang',
    'hero-subtitle': 'PhD Student in Computer Science',
    'hero-description': 'I am a PhD student specializing in artificial intelligence and machine learning, dedicated to advancing cutting-edge research in computer vision and natural language processing. My research interests include deep learning, neural network architecture design, and practical applications of AI.',
    
    // 教育背景
    'education-title': 'Education',
    'education-phd': 'PhD in Computer Science',
    'education-phd-school': 'Tsinghua University, Beijing',
    'education-phd-advisor': 'Advisor: Prof. Li',
    'education-bachelor': 'Bachelor of Computer Science',
    'education-bachelor-school': 'Peking University, Beijing',
    'education-bachelor-gpa': 'GPA: 3.9/4.0, Summa Cum Laude',
    
    // 最新动态
    'news-title': 'News',
    'news-1': 'Paper \'Applications of Deep Learning in Computer Vision\' accepted by CVPR 2024',
    'news-2': 'Awarded National Scholarship',
    'news-3': 'Oral presentation at AAAI 2024 conference',
    'news-4': 'Started internship at Google Research',
    'news-5': 'Paper \'Neural Network Architecture Optimization\' accepted by NeurIPS 2023',
    
    // 研究页面
    'research-interests-title': 'Research Interests',
    'interest-1': 'Deep Learning',
    'interest-2': 'Computer Vision',
    'interest-3': 'Natural Language Processing',
    'interest-4': 'Neural Architecture',
    'interest-5': 'Machine Learning',
    'interest-6': 'Reinforcement Learning',
    'interest-7': 'Multimodal Learning',
    'interest-8': 'AI Safety',
    
    'publications-title': 'Publications',
    'pub-1-title': 'Innovative Applications of Deep Learning in Computer Vision',
    'pub-1-authors': '<strong>John Zhang</strong>, Li Si, Wang Wu',
    'pub-1-venue': 'IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2024',
    'pub-2-title': 'Attention-Based Neural Network Architecture Optimization',
    'pub-2-authors': 'Li Si, <strong>John Zhang</strong>, Zhao Liu',
    'pub-2-venue': 'Conference on Neural Information Processing Systems (NeurIPS), 2023',
    'pub-3-title': 'Cross-Domain Knowledge Transfer Methods in Multimodal Learning',
    'pub-3-authors': '<strong>John Zhang</strong>, Wang Wu, Chen Qi',
    'pub-3-venue': 'AAAI Conference on Artificial Intelligence (AAAI), 2023',
    'pub-4-title': 'Applications and Challenges of Reinforcement Learning in Autonomous Driving',
    'pub-4-authors': 'Wang Wu, <strong>John Zhang</strong>, Li Si, Sun Ba',
    'pub-4-venue': 'International Conference on Machine Learning (ICML), 2022',
    'pub-5-title': 'Optimization Strategies for Pre-trained Models in Natural Language Processing',
    'pub-5-authors': '<strong>John Zhang</strong>, Chen Qi, Li Si',
    'pub-5-venue': 'Annual Meeting of the Association for Computational Linguistics (ACL), 2022',
    
    // 更多关于我
    'philosophy-title': 'Academic Philosophy',
    'philosophy-p1': 'I firmly believe that artificial intelligence technology should serve the progress and development of human society. In my research, I always maintain a rigorous scientific attitude, pursuing the perfect combination of theoretical innovation and practical application. I believe that excellent research should not only achieve academic breakthroughs but also solve real-world problems.',
    'philosophy-p2': 'As a young researcher, I deeply understand the importance of collaboration. I actively participate in interdisciplinary research projects and collaborate with scholars from different backgrounds. I believe that through open academic exchange and diverse thinking collisions, we can push the field of artificial intelligence towards broader development.',
    
    'hobbies-title': 'Hobbies & Interests',
    'hobby-1-title': 'Photography',
    'hobby-1-desc': 'Love capturing beautiful moments in life through the lens, especially landscape and street photography.',
    'hobby-2-title': 'Reading',
    'hobby-2-desc': 'Extensively reading technology, philosophy, and literature works to maintain curiosity and critical thinking about the world.',
    'hobby-3-title': 'Running',
    'hobby-3-desc': 'Persist in long-distance running, completed multiple marathons, enjoying the process of challenging myself.',
    'hobby-4-title': 'Music',
    'hobby-4-desc': 'Love classical music and jazz, occasionally play piano to relax.',
    'hobby-5-title': 'Travel',
    'hobby-5-desc': 'Love exploring different cultures and landscapes, have traveled to over 20 countries and regions.',
    'hobby-6-title': 'Open Source',
    'hobby-6-desc': 'Actively participate in open source community, maintaining several machine learning related open source projects.',
    
    'cv-title': 'CV Download',
    'cv-desc': 'For more detailed information, please download my complete CV.',
    'cv-chinese': 'Download Chinese CV',
    'cv-english': 'Download English CV',
    
    // 页脚
    'footer-text': '© 2024 John Zhang. All rights reserved.',
    
    // 页面标题
    'page-title': 'John Zhang - PhD Student Personal Homepage'
  }
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeLanguageToggle();
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
    '张三 - 博士生个人主页' : 
    'John Zhang - PhD Student Personal Homepage';
  
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

// 平滑滚动到顶部
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 复制邮箱地址
function copyEmail() {
  const email = 'john.zhang@university.edu';
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(function() {
      showNotification(currentLanguage === 'zh' ? '邮箱地址已复制' : 'Email address copied');
    });
  } else {
    // 兼容旧浏览器
    const textArea = document.createElement('textarea');
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification(currentLanguage === 'zh' ? '邮箱地址已复制' : 'Email address copied');
  }
}

// 显示通知
function showNotification(message) {
  // 创建通知元素
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: var(--shadow-medium);
    z-index: 10000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // 显示动画
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // 自动隐藏
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// 键盘导航支持
document.addEventListener('keydown', function(e) {
  // ESC键关闭移动端菜单
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
  
  // 数字键快速导航
  if (e.key >= '1' && e.key <= '3') {
    const pages = ['home', 'research', 'about'];
    const pageIndex = parseInt(e.key) - 1;
    
    if (pages[pageIndex]) {
      // 更新导航状态
      navLinks.forEach(nav => nav.classList.remove('active'));
      const targetNav = document.querySelector(`[data-page="${pages[pageIndex]}"]`);
      if (targetNav) {
        targetNav.classList.add('active');
      }
      
      // 显示页面
      showPage(pages[pageIndex]);
    }
  }
  
  // L键切换语言
  if (e.key === 'l' || e.key === 'L') {
    langToggle.click();
  }
});

// 图片懒加载
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// 性能优化：防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 窗口大小改变时的处理
window.addEventListener('resize', debounce(function() {
  // 关闭移动端菜单
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
}, 250));

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // 页面隐藏时暂停动画
    document.body.style.animationPlayState = 'paused';
  } else {
    // 页面显示时恢复动画
    document.body.style.animationPlayState = 'running';
  }
});

// 错误处理
window.addEventListener('error', function(e) {
  console.error('页面错误:', e.error);
});

// 导出函数供外部使用
window.academicHomepage = {
  showPage,
  updateLanguage,
  scrollToTop,
  copyEmail
};


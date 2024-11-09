import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import './styles.css';

class CodeHighlighter {
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector);
    this.options = {
      theme: 'light',
      lineNumbers: true,
      highlightColor: 'rgba(0, 122, 255, 0.1)',
      fileName: this.container.dataset.filename || 'Example.swift',
      layout: 'horizontal',
      explanationPosition: 'left',
      ...options
    };
    
    this.steps = [];
    this.currentStep = 0;
    this.observer = null;
    this.language = this.container.dataset.language || 'javascript';
  }

  init() {
    this.parseCode();
    this.createTutorialLayout();
    this.setupScrollObserver();
    
    setTimeout(() => {
      this.highlightStep(1);
      const firstStep = document.querySelector('.step-content[data-step="1"]');
      if (firstStep) {
        firstStep.classList.add('active');
      }
    }, 100);
  }

  parseCode() {
    const codeLines = this.container.textContent.split('\n');
    this.steps = codeLines.map((line, index) => {
      const stepMatch = line.match(/\/\/\s*\[(\d+)\]\s*(.*)/);
      const cleanCode = line.replace(/\/\/\s*\[\d+\].*$/, '').trimEnd();
      
      return {
        code: cleanCode,
        lineNumber: index + 1,
        step: stepMatch ? parseInt(stepMatch[1]) : null,
        explanation: stepMatch ? stepMatch[2].trim() : null
      };
    }).filter(step => step.code || step.step);
  }

  createTutorialLayout() {
    const tutorialSection = document.createElement('div');
    tutorialSection.className = 'tutorial-section';
    
    if (this.options.layout === 'vertical') {
      tutorialSection.classList.add('vertical');
    }
    
    if (this.options.explanationPosition === 'right' || this.options.explanationPosition === 'bottom') {
      tutorialSection.classList.add('reverse');
    }

    const explanationPanel = document.createElement('div');
    explanationPanel.className = 'explanation-panel';

    const codePanel = document.createElement('div');
    codePanel.className = 'code-panel';

    const fileHeader = document.createElement('div');
    fileHeader.className = 'file-header';
    fileHeader.textContent = this.options.fileName;

    const codeContainer = document.createElement('div');
    codeContainer.className = 'code-container';

    codePanel.appendChild(fileHeader);
    codePanel.appendChild(codeContainer);
    
    tutorialSection.appendChild(explanationPanel);
    tutorialSection.appendChild(codePanel);
    
    this.container.parentNode.replaceChild(tutorialSection, this.container);

    this.renderCode(codeContainer);
    this.createExplanationContent(explanationPanel);
  }

  createExplanationContent(container) {
    const uniqueSteps = [...new Set(this.steps.filter(s => s.step).map(s => s.step))];
    
    uniqueSteps.forEach(stepNum => {
      const stepContent = document.createElement('div');
      stepContent.className = 'step-content';
      stepContent.dataset.step = stepNum;
      
      const stepExplanation = this.steps.find(s => s.step === stepNum)?.explanation;
      stepContent.innerHTML = `
        <div class="step-number">Step ${stepNum}</div>
        <div class="step-explanation">${stepExplanation}</div>
      `;
      
      container.appendChild(stepContent);
    });

    const spacer = document.createElement('div');
    spacer.className = 'explanation-spacer';
    container.appendChild(spacer);
  }

  renderCode(container) {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.className = `language-${this.language}`;
    
    this.steps.forEach(step => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'code-line';
      
      if (step.step) {
        lineDiv.dataset.step = step.step;
      }

      if (this.options.lineNumbers) {
        const lineNumber = document.createElement('span');
        lineNumber.className = 'line-number';
        lineNumber.textContent = step.lineNumber;
        lineDiv.appendChild(lineNumber);
      }

      const content = document.createElement('span');
      content.className = 'line-content';
      content.innerHTML = Prism.highlight(
        step.code,
        Prism.languages[this.language],
        this.language
      );
      lineDiv.appendChild(content);

      code.appendChild(lineDiv);
    });

    pre.appendChild(code);
    container.appendChild(pre);
  }

  setupScrollObserver() {
    const explanationPanel = document.querySelector('.explanation-panel');
    let isScrolling = false;
    let lastKnownStep = 1;
    let scrollTimeout;

    explanationPanel.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const steps = document.querySelectorAll('.step-content');
          const panelHeight = explanationPanel.clientHeight;
          const scrollPosition = explanationPanel.scrollTop;

          steps.forEach(step => {
            const stepTop = step.offsetTop;
            const stepHeight = step.offsetHeight;
            const stepNumber = parseInt(step.dataset.step);
            const stepCenter = stepTop + (stepHeight / 2);
            const viewportCenter = scrollPosition + (panelHeight / 2);
            
            // 뷰포트 중앙과의 거리 계산
            const distanceFromCenter = Math.abs(stepCenter - viewportCenter);
            const maxDistance = panelHeight / 2;
            

            if (stepTop <= scrollPosition + (panelHeight / 2) &&
                stepTop + stepHeight > scrollPosition + (panelHeight / 2)) {
              
              if (lastKnownStep !== stepNumber) {
                lastKnownStep = stepNumber;
                
                isScrolling = true;
                step.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center'
                });

                this.highlightStep(stepNumber);
                document.querySelectorAll('.step-content').forEach(el => {
                  el.classList.toggle('active', el === step);
                });

                setTimeout(() => {
                  isScrolling = false;
                }, 500);
              }
            }
          });
        });
      }
    }, { passive: true });

    setTimeout(() => {
      this.highlightStep(1);
      const firstStep = document.querySelector('.step-content[data-step="1"]');
      if (firstStep) {
        firstStep.classList.add('active');
      }
    }, 100);
  }

  highlightStep(step) {
    document.querySelectorAll('.code-line.active').forEach(el => {
      el.classList.remove('active');
    });

    const stepLine = document.querySelector(`.code-line[data-step="${step}"]`);
    if (stepLine) {
      stepLine.classList.add('active');
      stepLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

if (typeof window !== 'undefined') {
  window.CodeHighlighter = CodeHighlighter;
}

export default CodeHighlighter;
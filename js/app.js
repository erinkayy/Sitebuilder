// Enhanced AI Site Builder with Advanced Simulation and Block System Integration
class AIBuilder {
    constructor() {
        this.state = {
            currentStep: 0,
            projectData: {
                goals: null,
                brand: null,
                content: null,
                design: null
            },
            aiContext: {},
            suggestions: []
        };
        
        this.steps = [
            {
                id: 'goals',
                title: 'Project Goals',
                prompt: 'What kind of website are you looking to create? Describe your goals and target audience.',
                aiContext: 'You are analyzing website project requirements'
            },
            {
                id: 'brand',
                title: 'Brand Identity',
                prompt: 'Tell me about your brand. What feelings or emotions should your website convey?',
                aiContext: 'You are a brand identity expert'
            },
            {
                id: 'content',
                title: 'Content Strategy',
                prompt: 'What type of content will your website feature? Think about main sections and key messages.',
                aiContext: 'You are a content strategist'
            },
            {
                id: 'design',
                title: 'Design Preferences',
                prompt: 'Describe your preferred visual style. Any specific colors, fonts, or design elements in mind?',
                aiContext: 'You are a UI/UX designer'
            }
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedState();
        this.initializeAI();
        this.initializeBlockSystem();
    }

    initializeBlockSystem() {
        // Initialize preview area
        const previewContent = document.querySelector('.preview-content');
        if (previewContent) {
            previewContent.innerHTML = '<div class="preview-placeholder">Your site preview will appear here</div>';
        }

        // Setup preview controls
        const previewControls = document.querySelectorAll('.preview-controls-left .button');
        previewControls.forEach(control => {
            control.addEventListener('click', (e) => {
                const mode = e.target.textContent.toLowerCase();
                this.updatePreviewMode(mode);
            });
        });
    }

    updatePreviewMode(mode) {
        const previewArea = document.querySelector('.preview-area');
        if (!previewArea) return;

        // Remove existing mode classes
        previewArea.classList.remove('preview-desktop', 'preview-tablet', 'preview-mobile');
        
        // Add new mode class
        previewArea.classList.add(`preview-${mode}`);

        // Update buttons
        const buttons = document.querySelectorAll('.preview-controls-left .button');
        buttons.forEach(button => {
            button.classList.remove('active');
            if (button.textContent.toLowerCase() === mode) {
                button.classList.add('active');
            }
        });
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = document.querySelector(e.target.getAttribute('href'));
                section.scrollIntoView({ behavior: 'smooth' });
                
                // Update active state
                document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Guided Experience
        const nextButton = document.querySelector('.step .button');
        if (nextButton) {
            nextButton.addEventListener('click', () => this.handleNextStep());
        }

        // Block Library
        document.querySelectorAll('.block .button').forEach(button => {
            button.addEventListener('click', (e) => {
                const blockType = e.target.parentElement.querySelector('h3').textContent;
                this.addBlock(blockType);
            });
        });
    }

    async handleNextStep() {
        const textarea = document.querySelector('.step textarea');
        const input = textarea.value.trim();
        
        if (input) {
            await this.processUserInput(input);
        }
    }

    async processUserInput(input) {
        const step = this.steps[this.state.currentStep];
        
        // Show AI thinking animation
        this.showAIThinking();
        
        // Process input with simulated AI
        const response = await this.generateAIResponse(input, step);
        
        // Update state with processed data
        this.updateStateWithAIResponse(response);
        
        // Update UI with response
        this.updateUIWithAIResponse(response);
        
        // Generate and show suggestions
        await this.generateSuggestions(response);
        
        // Move to next step if available
        this.moveToNextStep();
    }

    showAIThinking() {
        const aiResponse = document.querySelector('.ai-response');
        if (aiResponse) {
            aiResponse.innerHTML = `
                <div class="ai-thinking">
                    <span>AI is analyzing your input</span>
                    <div class="dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            `;
        }
    }

    async generateAIResponse(input, step) {
        // Simulate AI processing with different personalities based on step
        return new Promise(resolve => {
            setTimeout(() => {
                const responses = {
                    goals: this.analyzeProjectGoals(input),
                    brand: this.analyzeBrandIdentity(input),
                    content: this.analyzeContentStrategy(input),
                    design: this.analyzeDesignPreferences(input)
                };

                resolve(responses[step.id]);
            }, 2000);
        });
    }

    analyzeProjectGoals(input) {
        const keywords = this.extractKeywords(input);
        const audience = this.identifyTargetAudience(input);
        const type = this.determineWebsiteType(input);

        return {
            type: 'goals',
            analysis: {
                keywords,
                audience,
                websiteType: type
            },
            suggestions: this.generateGoalBasedSuggestions(keywords, audience, type)
        };
    }

    analyzeBrandIdentity(input) {
        const emotions = this.extractEmotions(input);
        const values = this.identifyBrandValues(input);
        const personality = this.determineBrandPersonality(input);

        return {
            type: 'brand',
            analysis: {
                emotions,
                values,
                personality
            },
            suggestions: this.generateBrandBasedSuggestions(emotions, values, personality)
        };
    }

    analyzeContentStrategy(input) {
        const sections = this.identifyContentSections(input);
        const tone = this.determineContentTone(input);
        const structure = this.suggestContentStructure(input);

        return {
            type: 'content',
            analysis: {
                sections,
                tone,
                structure
            },
            suggestions: this.generateContentSuggestions(sections, tone)
        };
    }

    analyzeDesignPreferences(input) {
        const colors = this.extractColorPreferences(input);
        const style = this.determineDesignStyle(input);
        const elements = this.identifyDesignElements(input);

        return {
            type: 'design',
            analysis: {
                colors,
                style,
                elements
            },
            suggestions: this.generateDesignSuggestions(colors, style, elements)
        };
    }

    // Helper methods for analysis
    extractKeywords(input) {
        const commonKeywords = ['business', 'portfolio', 'shop', 'blog', 'personal'];
        return commonKeywords.filter(keyword => input.toLowerCase().includes(keyword));
    }

    identifyTargetAudience(input) {
        const audiences = {
            business: input.match(/business|professional|corporate|company/gi),
            consumer: input.match(/customer|consumer|user|buyer/gi),
            creative: input.match(/artist|designer|creative|portfolio/gi)
        };
        
        return Object.entries(audiences)
            .filter(([, matches]) => matches)
            .map(([type]) => type);
    }

    determineWebsiteType(input) {
        const types = {
            ecommerce: input.match(/shop|store|product|sell/gi),
            portfolio: input.match(/portfolio|showcase|gallery/gi),
            business: input.match(/business|company|corporate/gi),
            blog: input.match(/blog|article|content/gi)
        };
        
        return Object.entries(types)
            .filter(([, matches]) => matches)
            .map(([type]) => type)[0] || 'general';
    }

    extractEmotions(input) {
        const emotionKeywords = {
            professional: /professional|formal|serious/gi,
            friendly: /friendly|warm|welcoming/gi,
            innovative: /innovative|modern|cutting-edge/gi,
            luxury: /luxury|premium|high-end/gi
        };
        
        return Object.entries(emotionKeywords)
            .filter(([, regex]) => input.match(regex))
            .map(([emotion]) => emotion);
    }

    updateStateWithAIResponse(response) {
        this.state.aiContext = {
            ...this.state.aiContext,
            [response.type]: response.analysis
        };
        
        this.state.projectData[response.type] = response.analysis;
        this.saveState();
    }

    updateUIWithAIResponse(response) {
        const aiResponse = document.querySelector('.ai-response');
        if (aiResponse) {
            aiResponse.innerHTML = `
                <h4>AI Analysis</h4>
                <div class="analysis-results">
                    ${this.formatAnalysisResults(response)}
                </div>
                <div class="suggestions">
                    <h4>Suggestions</h4>
                    ${this.formatSuggestions(response.suggestions)}
                </div>
            `;
        }
    }

    formatAnalysisResults(response) {
        return Object.entries(response.analysis)
            .map(([key, value]) => `
                <div class="analysis-item">
                    <strong>${key}:</strong> 
                    ${Array.isArray(value) ? value.join(', ') : value}
                </div>
            `)
            .join('');
    }

    formatSuggestions(suggestions) {
        return suggestions
            .map(suggestion => `<div class="suggestion-item">${suggestion}</div>`)
            .join('');
    }

    moveToNextStep() {
        if (this.state.currentStep < this.steps.length - 1) {
            this.state.currentStep++;
            this.updateStepUI();
        } else {
            this.completeGuidedExperience();
        }
    }

    updateStepUI() {
        const step = this.steps[this.state.currentStep];
        const stepElement = document.querySelector('.step');
        if (stepElement) {
            stepElement.innerHTML = `
                <h3>${step.title}</h3>
                <p>${step.prompt}</p>
                <textarea placeholder="Type your response here..."></textarea>
                <div class="ai-response"></div>
                <button class="button">Next</button>
            `;
        }
    }

    completeGuidedExperience() {
        // Generate final recommendations and transition to builder
        const recommendations = this.generateFinalRecommendations();
        this.transitionToBuilder(recommendations);
    }

    generateFinalRecommendations() {
        return {
            layout: this.suggestLayout(),
            colors: this.suggestColorScheme(),
            blocks: this.suggestBlocks(),
            content: this.suggestContentStrategy()
        };
    }

    saveState() {
        localStorage.setItem('aibuilder_state', JSON.stringify(this.state));
    }

    loadSavedState() {
        const saved = localStorage.getItem('aibuilder_state');
        if (saved) {
            this.state = JSON.parse(saved);
            this.updateUIFromState();
        }
    }

    addBlock(blockType) {
        const template = window.blockSystem.getBlockTemplate(blockType.toLowerCase().replace(/\s+/g, ''));
        if (!template) {
            console.error(`Block type "${blockType}" not found`);
            return;
        }

        // Add block to the block system
        const block = window.blockSystem.addBlock(blockType.toLowerCase().replace(/\s+/g, ''));
        
        // Update preview
        this.updatePreview();
    }

    updatePreview() {
        const previewContent = document.querySelector('.preview-content');
        if (previewContent) {
            previewContent.innerHTML = window.blockSystem.renderAllBlocks();
        }
    }

    // Placeholder methods for AI analysis
    suggestLayout() { return {}; }
    suggestColorScheme() { return {}; }
    suggestBlocks() { return []; }
    suggestContentStrategy() { return {}; }
    identifyBrandValues() { return []; }
    determineBrandPersonality() { return ''; }
    identifyContentSections() { return []; }
    determineContentTone() { return ''; }
    suggestContentStructure() { return {}; }
    extractColorPreferences() { return []; }
    determineDesignStyle() { return ''; }
    identifyDesignElements() { return []; }
    generateGoalBasedSuggestions() { return []; }
    generateBrandBasedSuggestions() { return []; }
    generateContentSuggestions() { return []; }
    generateDesignSuggestions() { return []; }
    initializeAI() {}
    updateUIFromState() {}
    transitionToBuilder() {}
}

// Initialize the builder when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.aiBuilder = new AIBuilder();
});
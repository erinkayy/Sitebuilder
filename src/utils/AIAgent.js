import { EventEmitter } from 'events';
import { MCPClient } from './MCPClient';

export class AIAgent extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.mcp = new MCPClient();
    this.context = {
      projectGoals: null,
      brandIdentity: null,
      contentStructure: null,
      designPreferences: null,
      blocks: [],
      resources: []
    };
  }

  async startGuidedExperience() {
    const steps = this.config.interactionModes.guided.steps;
    
    for (const step of steps) {
      await this.handleGuidedStep(step);
    }
  }

  async handleGuidedStep(step) {
    let response;
    
    switch (step) {
      case 'projectGoals':
        response = await this.mcp.query({
          role: 'guide',
          task: 'project_goals',
          prompt: 'Let\'s start by understanding your project goals. What type of website are you looking to create?'
        });
        this.context.projectGoals = response;
        break;
        
      case 'brandIdentity':
        response = await this.mcp.query({
          role: 'guide',
          task: 'brand_identity',
          prompt: 'Tell me about your brand. What feelings or emotions should your website convey?',
          context: this.context.projectGoals
        });
        this.context.brandIdentity = response;
        break;
        
      case 'contentStructure':
        response = await this.mcp.query({
          role: 'guide',
          task: 'content_structure',
          prompt: 'Based on your goals, let\'s plan your content structure.',
          context: {
            goals: this.context.projectGoals,
            brand: this.context.brandIdentity
          }
        });
        this.context.contentStructure = response;
        break;
        
      case 'designPreferences':
        response = await this.mcp.query({
          role: 'guide',
          task: 'design_preferences',
          prompt: 'Let\'s talk about the visual design of your website.',
          context: this.context
        });
        this.context.designPreferences = response;
        break;
    }

    // Emit step completion
    this.emit('stepComplete', { step, response });
    
    // Generate suggestions based on completed step
    await this.generateSuggestions(step);
  }

  async generateSuggestions(step) {
    const suggestion = await this.mcp.query({
      role: 'assistant',
      task: 'generate_suggestions',
      context: {
        step,
        stepData: this.context[step],
        fullContext: this.context
      }
    });

    this.emit('suggestion', suggestion);
  }

  async updateContext(newContext) {
    this.context = {
      ...this.context,
      ...newContext
    };

    // Generate new suggestions based on context update
    const suggestions = await this.mcp.query({
      role: 'assistant',
      task: 'context_update_suggestions',
      context: this.context
    });

    suggestions.forEach(suggestion => {
      this.emit('suggestion', suggestion);
    });
  }

  async generateContent(prompt, type = 'text') {
    const content = await this.mcp.query({
      role: 'generator',
      task: 'generate_content',
      prompt,
      type,
      context: this.context
    });

    return content;
  }

  async analyzeUserInput(input) {
    const analysis = await this.mcp.query({
      role: 'analyzer',
      task: 'analyze_input',
      input,
      context: this.context
    });

    return analysis;
  }
}
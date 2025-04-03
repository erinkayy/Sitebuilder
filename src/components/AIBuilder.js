import { EventEmitter } from 'events';

export class AIBuilder extends EventEmitter {
  constructor({ blockManager, resourceManager, aiAgent }) {
    super();
    this.blockManager = blockManager;
    this.resourceManager = resourceManager;
    this.aiAgent = aiAgent;
    this.state = {
      currentStep: null,
      projectData: {},
      selectedBlock: null
    };
  }

  async startNewProject() {
    // Initialize the guided experience
    this.state.currentStep = 'projectGoals';
    await this.aiAgent.startGuidedExperience();
  }

  async handleUserInput(input) {
    // Analyze user input using AI
    const analysis = await this.aiAgent.analyzeUserInput(input);
    
    // Update project context based on analysis
    await this.updateProjectContext(analysis);
    
    // Generate appropriate response or action
    await this.generateResponse(analysis);
  }

  async updateProjectContext(analysis) {
    const { intent, entities, sentiment } = analysis;
    
    // Update project data based on analysis
    this.state.projectData = {
      ...this.state.projectData,
      [this.state.currentStep]: {
        intent,
        entities,
        sentiment
      }
    };

    // Update AI agent context
    await this.aiAgent.updateContext({
      currentStep: this.state.currentStep,
      projectData: this.state.projectData
    });
  }

  async generateResponse(analysis) {
    const { intent } = analysis;
    
    switch (intent) {
      case 'add_block':
        await this.handleAddBlock(analysis);
        break;
      case 'modify_block':
        await this.handleModifyBlock(analysis);
        break;
      case 'style_update':
        await this.handleStyleUpdate(analysis);
        break;
      case 'content_request':
        await this.handleContentRequest(analysis);
        break;
      default:
        await this.handleGeneralResponse(analysis);
    }
  }

  async handleAddBlock(analysis) {
    const { blockType, initialData } = analysis.entities;
    
    // Get AI suggestions for block configuration
    const suggestions = await this.aiAgent.generateSuggestions('block_config', {
      type: blockType,
      projectContext: this.state.projectData
    });

    // Create new block with AI-enhanced configuration
    const blockData = await this.blockManager.createBlock(blockType, {
      ...initialData,
      ...suggestions
    });

    this.emit('blockAdded', blockData);
  }

  async handleModifyBlock(analysis) {
    const { blockId, modifications } = analysis.entities;
    
    // Get AI suggestions for modifications
    const suggestions = await this.aiAgent.generateSuggestions('block_modification', {
      blockId,
      modifications,
      currentBlock: this.blockManager.getBlock(blockId)
    });

    // Update block with AI-enhanced modifications
    const updatedBlock = await this.blockManager.updateBlock(blockId, suggestions);
    
    this.emit('blockModified', updatedBlock);
  }

  async handleStyleUpdate(analysis) {
    const { styleType, styleValue } = analysis.entities;
    
    // Get AI suggestions for style updates
    const suggestions = await this.aiAgent.generateSuggestions('style_update', {
      type: styleType,
      value: styleValue,
      projectContext: this.state.projectData
    });

    // Apply style updates
    await this.applyStyleUpdates(suggestions);
    
    this.emit('styleUpdated', suggestions);
  }

  async handleContentRequest(analysis) {
    const { contentType, parameters } = analysis.entities;
    
    // Generate content using AI
    const content = await this.aiAgent.generateContent(contentType, parameters);
    
    // If there's a selected block, update its content
    if (this.state.selectedBlock) {
      await this.blockManager.updateBlock(this.state.selectedBlock, {
        content: {
          ...this.blockManager.getBlock(this.state.selectedBlock).content,
          [contentType]: content
        }
      });
    }

    this.emit('contentGenerated', { type: contentType, content });
  }

  async handleGeneralResponse(analysis) {
    // Generate conversational response
    const response = await this.aiAgent.generateContent('conversation', {
      analysis,
      projectContext: this.state.projectData
    });

    this.emit('response', response);
  }

  async applyStyleUpdates(styleUpdates) {
    // Apply style updates to relevant blocks
    for (const [blockId, styles] of Object.entries(styleUpdates.blocks || {})) {
      await this.blockManager.updateBlock(blockId, {
        config: {
          ...this.blockManager.getBlock(blockId).config,
          styles
        }
      });
    }

    // Update global styles if any
    if (styleUpdates.global) {
      await this.resourceManager.updateResource('globalStyles', styleUpdates.global);
    }
  }

  async exportSite() {
    const blocks = this.blockManager.getAllBlocks();
    const resources = await this.resourceManager.getAllResources();
    const styles = await this.resourceManager.getResource('globalStyles');

    return {
      version: '1.0.0',
      metadata: {
        generated: new Date().toISOString(),
        projectData: this.state.projectData
      },
      blocks,
      resources,
      styles
    };
  }

  async restoreState(savedState) {
    this.state.projectData = savedState.metadata.projectData;
    
    // Restore blocks
    for (const block of savedState.blocks) {
      await this.blockManager.createBlock(block.type, block);
    }

    // Restore resources
    await this.resourceManager.restoreResources(savedState.resources);

    // Restore styles
    await this.resourceManager.updateResource('globalStyles', savedState.styles);

    this.emit('stateRestored', savedState);
  }
}
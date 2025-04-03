import { AIBuilder } from './components/AIBuilder';
import { BlockManager } from './components/BlockManager';
import { ResourceManager } from './utils/ResourceManager';
import { AIAgent } from './utils/AIAgent';
import config from '../config/site-builder.json';

class SiteBuilder {
  constructor() {
    this.config = config;
    this.blockManager = new BlockManager();
    this.resourceManager = new ResourceManager();
    this.aiAgent = new AIAgent(config.aiCapabilities);
    this.builder = new AIBuilder({
      blockManager: this.blockManager,
      resourceManager: this.resourceManager,
      aiAgent: this.aiAgent
    });
  }

  async initialize() {
    // Initialize the guided experience
    await this.aiAgent.startGuidedExperience();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Load any saved progress
    await this.loadSavedProgress();
  }

  setupEventListeners() {
    // Listen for AI suggestions
    this.aiAgent.on('suggestion', this.handleAISuggestion.bind(this));
    
    // Listen for block updates
    this.blockManager.on('blockUpdate', this.handleBlockUpdate.bind(this));
    
    // Listen for resource changes
    this.resourceManager.on('resourceUpdate', this.handleResourceUpdate.bind(this));
  }

  async handleAISuggestion(suggestion) {
    const { type, content } = suggestion;
    
    switch (type) {
      case 'layout':
        await this.builder.updateLayout(content);
        break;
      case 'content':
        await this.builder.updateContent(content);
        break;
      case 'style':
        await this.builder.updateStyle(content);
        break;
      default:
        console.warn('Unknown suggestion type:', type);
    }
  }

  async handleBlockUpdate(blockData) {
    // Sync block changes with AI context
    await this.aiAgent.updateContext({
      blocks: this.blockManager.getAllBlocks(),
      currentBlock: blockData
    });
  }

  async handleResourceUpdate(resourceData) {
    // Update AI context with new resource information
    await this.aiAgent.updateContext({
      resources: this.resourceManager.getAllResources(),
      currentResource: resourceData
    });
  }

  async loadSavedProgress() {
    try {
      const savedState = await this.resourceManager.loadState();
      if (savedState) {
        await this.builder.restoreState(savedState);
      }
    } catch (error) {
      console.error('Error loading saved progress:', error);
    }
  }

  async exportSite() {
    const siteData = await this.builder.exportSite();
    return siteData;
  }
}

// Export the main SiteBuilder class
export default SiteBuilder;
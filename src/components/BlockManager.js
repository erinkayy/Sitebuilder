import { EventEmitter } from 'events';

export class BlockManager extends EventEmitter {
  constructor() {
    super();
    this.blocks = new Map();
    this.blockTypes = new Map();
    this.history = [];
  }

  registerBlockType(type, config) {
    this.blockTypes.set(type, {
      ...config,
      validator: this.createValidator(config)
    });
  }

  createValidator(config) {
    return (blockData) => {
      // Validate required resources
      const hasRequiredResources = config.allowedResources.every(resource => 
        blockData.resources && blockData.resources[resource]
      );

      // Validate configuration
      const validConfig = Object.entries(config.defaultConfig).every(([key, defaultValue]) => {
        const value = blockData.config[key];
        return value !== undefined && typeof value === typeof defaultValue;
      });

      return hasRequiredResources && validConfig;
    };
  }

  async createBlock(type, initialData = {}) {
    const blockType = this.blockTypes.get(type);
    if (!blockType) {
      throw new Error(`Unknown block type: ${type}`);
    }

    const blockId = this.generateBlockId();
    const blockData = {
      id: blockId,
      type,
      config: {
        ...blockType.defaultConfig,
        ...initialData.config
      },
      resources: initialData.resources || {},
      content: initialData.content || {},
      metadata: {
        created: new Date().toISOString(),
        modified: new Date().toISOString()
      }
    };

    // Validate block data
    if (!blockType.validator(blockData)) {
      throw new Error(`Invalid block data for type: ${type}`);
    }

    this.blocks.set(blockId, blockData);
    this.recordHistory('create', blockId, null, blockData);
    this.emit('blockCreated', blockData);

    return blockData;
  }

  async updateBlock(blockId, updates) {
    const block = this.blocks.get(blockId);
    if (!block) {
      throw new Error(`Block not found: ${blockId}`);
    }

    const oldData = { ...block };
    const newData = {
      ...block,
      ...updates,
      metadata: {
        ...block.metadata,
        modified: new Date().toISOString()
      }
    };

    // Validate updated block
    const blockType = this.blockTypes.get(block.type);
    if (!blockType.validator(newData)) {
      throw new Error(`Invalid update data for block: ${blockId}`);
    }

    this.blocks.set(blockId, newData);
    this.recordHistory('update', blockId, oldData, newData);
    this.emit('blockUpdated', newData);

    return newData;
  }

  async deleteBlock(blockId) {
    const block = this.blocks.get(blockId);
    if (!block) {
      throw new Error(`Block not found: ${blockId}`);
    }

    this.blocks.delete(blockId);
    this.recordHistory('delete', blockId, block, null);
    this.emit('blockDeleted', block);
  }

  getBlock(blockId) {
    return this.blocks.get(blockId);
  }

  getAllBlocks() {
    return Array.from(this.blocks.values());
  }

  generateBlockId() {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  recordHistory(action, blockId, oldData, newData) {
    this.history.push({
      timestamp: new Date().toISOString(),
      action,
      blockId,
      oldData,
      newData
    });
  }

  async undoLastAction() {
    const lastAction = this.history.pop();
    if (!lastAction) return null;

    switch (lastAction.action) {
      case 'create':
        await this.deleteBlock(lastAction.blockId);
        break;
      case 'update':
        await this.updateBlock(lastAction.blockId, lastAction.oldData);
        break;
      case 'delete':
        this.blocks.set(lastAction.blockId, lastAction.oldData);
        this.emit('blockCreated', lastAction.oldData);
        break;
    }

    return lastAction;
  }

  getBlocksOfType(type) {
    return this.getAllBlocks().filter(block => block.type === type);
  }

  validateBlock(blockId) {
    const block = this.getBlock(blockId);
    if (!block) return false;

    const blockType = this.blockTypes.get(block.type);
    return blockType && blockType.validator(block);
  }
}
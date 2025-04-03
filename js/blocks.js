// Block System for AI Site Builder
class BlockSystem {
    constructor() {
        this.blocks = [];
        this.templates = {
            hero: {
                name: 'Hero Section',
                template: `
                    <section class="block-hero">
                        <div class="container">
                            <h1>{{title}}</h1>
                            <p class="subtitle">{{subtitle}}</p>
                            <div class="cta-buttons">
                                <a href="{{primaryCTA.url}}" class="button">{{primaryCTA.text}}</a>
                                {{#if secondaryCTA}}
                                <a href="{{secondaryCTA.url}}" class="button button-secondary">{{secondaryCTA.text}}</a>
                                {{/if}}
                            </div>
                        </div>
                    </section>
                `,
                defaultData: {
                    title: 'Welcome to Our Site',
                    subtitle: 'Create something amazing with our platform',
                    primaryCTA: {
                        text: 'Get Started',
                        url: '#'
                    },
                    secondaryCTA: {
                        text: 'Learn More',
                        url: '#'
                    }
                }
            },
            features: {
                name: 'Feature Grid',
                template: `
                    <section class="block-features">
                        <div class="container">
                            <h2>{{title}}</h2>
                            <div class="features-grid">
                                {{#each features}}
                                <div class="feature">
                                    <div class="feature-icon">{{icon}}</div>
                                    <h3>{{title}}</h3>
                                    <p>{{description}}</p>
                                </div>
                                {{/each}}
                            </div>
                        </div>
                    </section>
                `,
                defaultData: {
                    title: 'Our Features',
                    features: [
                        {
                            icon: '🚀',
                            title: 'Fast & Easy',
                            description: 'Get up and running quickly with our intuitive interface'
                        },
                        {
                            icon: '🎨',
                            title: 'Customizable',
                            description: 'Customize every aspect to match your brand'
                        },
                        {
                            icon: '📱',
                            title: 'Responsive',
                            description: 'Looks great on all devices, from mobile to desktop'
                        }
                    ]
                }
            },
            content: {
                name: 'Content Section',
                template: `
                    <section class="block-content">
                        <div class="container">
                            <div class="content-grid">
                                <div class="content-text">
                                    <h2>{{title}}</h2>
                                    <p>{{content}}</p>
                                    {{#if callToAction}}
                                    <a href="{{callToAction.url}}" class="button">{{callToAction.text}}</a>
                                    {{/if}}
                                </div>
                                {{#if image}}
                                <div class="content-image">
                                    <img src="{{image.url}}" alt="{{image.alt}}">
                                </div>
                                {{/if}}
                            </div>
                        </div>
                    </section>
                `,
                defaultData: {
                    title: 'About Us',
                    content: 'We are passionate about creating amazing experiences for our customers.',
                    callToAction: {
                        text: 'Learn More',
                        url: '#'
                    },
                    image: {
                        url: 'https://via.placeholder.com/600x400',
                        alt: 'About our company'
                    }
                }
            },
            testimonials: {
                name: 'Testimonials',
                template: `
                    <section class="block-testimonials">
                        <div class="container">
                            <h2>{{title}}</h2>
                            <div class="testimonials-grid">
                                {{#each testimonials}}
                                <div class="testimonial">
                                    <div class="testimonial-content">{{content}}</div>
                                    <div class="testimonial-author">
                                        <img src="{{author.avatar}}" alt="{{author.name}}">
                                        <div class="author-info">
                                            <strong>{{author.name}}</strong>
                                            <span>{{author.title}}</span>
                                        </div>
                                    </div>
                                </div>
                                {{/each}}
                            </div>
                        </div>
                    </section>
                `,
                defaultData: {
                    title: 'What Our Customers Say',
                    testimonials: [
                        {
                            content: 'Amazing platform that helped us create our dream website!',
                            author: {
                                name: 'John Doe',
                                title: 'CEO, TechCorp',
                                avatar: 'https://via.placeholder.com/64x64'
                            }
                        },
                        {
                            content: 'The best website builder I\'ve ever used. So intuitive!',
                            author: {
                                name: 'Jane Smith',
                                title: 'Designer, CreativeCo',
                                avatar: 'https://via.placeholder.com/64x64'
                            }
                        }
                    ]
                }
            },
            gallery: {
                name: 'Product Gallery',
                template: `
                    <section class="block-gallery">
                        <div class="container">
                            <h2>{{title}}</h2>
                            <div class="gallery-grid">
                                {{#each items}}
                                <div class="gallery-item">
                                    <img src="{{image}}" alt="{{title}}">
                                    <h3>{{title}}</h3>
                                    {{#if price}}
                                    <div class="price">{{price}}</div>
                                    {{/if}}
                                    <p>{{description}}</p>
                                    <a href="{{url}}" class="button">{{buttonText}}</a>
                                </div>
                                {{/each}}
                            </div>
                        </div>
                    </section>
                `,
                defaultData: {
                    title: 'Our Products',
                    items: [
                        {
                            image: 'https://via.placeholder.com/300x300',
                            title: 'Product 1',
                            price: '$99',
                            description: 'Amazing product that will change your life',
                            url: '#',
                            buttonText: 'Learn More'
                        },
                        {
                            image: 'https://via.placeholder.com/300x300',
                            title: 'Product 2',
                            price: '$149',
                            description: 'Another fantastic product you\'ll love',
                            url: '#',
                            buttonText: 'Learn More'
                        }
                    ]
                }
            },
            contact: {
                name: 'Contact Form',
                template: `
                    <section class="block-contact">
                        <div class="container">
                            <h2>{{title}}</h2>
                            <div class="contact-grid">
                                <div class="contact-info">
                                    <p>{{description}}</p>
                                    {{#each contactMethods}}
                                    <div class="contact-method">
                                        <span class="icon">{{icon}}</span>
                                        <span class="text">{{text}}</span>
                                    </div>
                                    {{/each}}
                                </div>
                                <form class="contact-form">
                                    {{#each formFields}}
                                    <div class="form-group">
                                        <label for="{{id}}">{{label}}</label>
                                        <input type="{{type}}" id="{{id}}" name="{{id}}" placeholder="{{placeholder}}">
                                    </div>
                                    {{/each}}
                                    <button type="submit" class="button">{{submitText}}</button>
                                </form>
                            </div>
                        </div>
                    </section>
                `,
                defaultData: {
                    title: 'Contact Us',
                    description: 'Get in touch with us for any questions or inquiries.',
                    contactMethods: [
                        {
                            icon: '📧',
                            text: 'hello@example.com'
                        },
                        {
                            icon: '📱',
                            text: '+1 (555) 123-4567'
                        }
                    ],
                    formFields: [
                        {
                            id: 'name',
                            label: 'Name',
                            type: 'text',
                            placeholder: 'Your name'
                        },
                        {
                            id: 'email',
                            label: 'Email',
                            type: 'email',
                            placeholder: 'Your email'
                        },
                        {
                            id: 'message',
                            label: 'Message',
                            type: 'textarea',
                            placeholder: 'Your message'
                        }
                    ],
                    submitText: 'Send Message'
                }
            }
        };
    }

    addBlock(type, data = {}) {
        const template = this.templates[type];
        if (!template) {
            throw new Error(`Block type "${type}" not found`);
        }

        const blockData = {
            ...template.defaultData,
            ...data
        };

        const block = {
            id: this.generateBlockId(),
            type,
            data: blockData
        };

        this.blocks.push(block);
        return block;
    }

    updateBlock(blockId, newData) {
        const blockIndex = this.blocks.findIndex(b => b.id === blockId);
        if (blockIndex === -1) {
            throw new Error(`Block with id "${blockId}" not found`);
        }

        this.blocks[blockIndex].data = {
            ...this.blocks[blockIndex].data,
            ...newData
        };

        return this.blocks[blockIndex];
    }

    removeBlock(blockId) {
        const blockIndex = this.blocks.findIndex(b => b.id === blockId);
        if (blockIndex === -1) {
            throw new Error(`Block with id "${blockId}" not found`);
        }

        this.blocks.splice(blockIndex, 1);
    }

    renderBlock(block) {
        const template = this.templates[block.type];
        if (!template) {
            throw new Error(`Template for block type "${block.type}" not found`);
        }

        // Simple template rendering (you might want to use a proper template engine)
        let html = template.template;
        
        // Replace simple variables
        const flattenObject = (obj, prefix = '') => {
            return Object.keys(obj).reduce((acc, key) => {
                const value = obj[key];
                const newKey = prefix ? `${prefix}.${key}` : key;
                
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    Object.assign(acc, flattenObject(value, newKey));
                } else {
                    acc[newKey] = value;
                }
                
                return acc;
            }, {});
        };

        const flatData = flattenObject(block.data);
        
        // Handle conditionals
        html = html.replace(/{{#if ([^}]+)}}([\s\S]*?){{\/if}}/g, (match, condition, content) => {
            const value = this.getNestedValue(block.data, condition);
            return value ? content : '';
        });

        // Handle loops
        html = html.replace(/{{#each ([^}]+)}}([\s\S]*?){{\/each}}/g, (match, array, template) => {
            const items = this.getNestedValue(block.data, array);
            if (!Array.isArray(items)) return '';
            
            return items.map(item => {
                let itemTemplate = template;
                const itemData = flattenObject(item);
                
                Object.entries(itemData).forEach(([key, value]) => {
                    itemTemplate = itemTemplate.replace(
                        new RegExp(`{{${key}}}`, 'g'),
                        value
                    );
                });
                
                return itemTemplate;
            }).join('');
        });

        // Replace remaining variables
        Object.entries(flatData).forEach(([key, value]) => {
            html = html.replace(
                new RegExp(`{{${key}}}`, 'g'),
                value
            );
        });

        return html;
    }

    renderAllBlocks() {
        return this.blocks.map(block => this.renderBlock(block)).join('\n');
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, part) => current && current[part], obj);
    }

    generateBlockId() {
        return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    getBlockTemplate(type) {
        return this.templates[type];
    }

    getAllTemplates() {
        return Object.entries(this.templates).map(([type, template]) => ({
            type,
            name: template.name,
            defaultData: template.defaultData
        }));
    }
}

// Initialize the block system
window.blockSystem = new BlockSystem();
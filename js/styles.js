class StyleManager {
    constructor() {
        this.defaultStyles = {
            colors: {
                primary: '#2196f3',
                secondary: '#f50057',
                background: '#0a0a0a',
                surface: '#1a1a1a',
                elevation1: '#2a2a2a',
                elevation2: '#333333'
            },
            typography: {
                font: 'modern',
                size: 'medium',
                fonts: {
                    modern: "'Inter', sans-serif",
                    classic: "'Merriweather', serif",
                    minimal: "'Space Grotesk', sans-serif",
                    creative: "'Plus Jakarta Sans', sans-serif"
                }
            },
            layout: {
                spacing: 'comfortable',
                contentWidth: 1200
            },
            effects: {
                shadows: true,
                rounded: true,
                animations: true,
                glass: true
            }
        };

        this.currentStyles = { ...this.defaultStyles };
        this.setupEventListeners();
        this.initializeModal();
    }

    initializeModal() {
        // Set up color inputs
        document.getElementById('primaryColor').value = this.currentStyles.colors.primary;
        document.getElementById('secondaryColor').value = this.currentStyles.colors.secondary;

        // Set up font size
        const sizePresets = document.querySelectorAll('.size-preset');
        sizePresets.forEach(preset => {
            if (preset.dataset.size === this.currentStyles.typography.size) {
                preset.classList.add('active');
            }
        });

        // Set up effects toggles
        document.getElementById('enableShadows').checked = this.currentStyles.effects.shadows;
        document.getElementById('enableRounded').checked = this.currentStyles.effects.rounded;
        document.getElementById('enableAnimations').checked = this.currentStyles.effects.animations;
        document.getElementById('enableGlass').checked = this.currentStyles.effects.glass;

        // Set up content width
        document.getElementById('contentWidth').value = this.currentStyles.layout.contentWidth;
    }

    setupEventListeners() {
        // Modal controls
        const modal = document.getElementById('siteStylesModal');
        const openBtn = document.getElementById('siteStylesBtn');
        const closeBtn = document.querySelector('.modal-close');
        const applyBtn = document.getElementById('applyStyles');
        const resetBtn = document.getElementById('resetStyles');

        openBtn.addEventListener('click', () => this.openModal());
        closeBtn.addEventListener('click', () => this.closeModal());
        applyBtn.addEventListener('click', () => this.applyStyles());
        resetBtn.addEventListener('click', () => this.resetStyles());

        // Color presets
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.addEventListener('click', (e) => this.handleColorPreset(e.currentTarget.dataset.theme));
        });

        // Custom colors
        document.getElementById('primaryColor').addEventListener('input', (e) => {
            this.currentStyles.colors.primary = e.target.value;
        });

        document.getElementById('secondaryColor').addEventListener('input', (e) => {
            this.currentStyles.colors.secondary = e.target.value;
        });

        // Typography
        document.querySelectorAll('.font-preset').forEach(preset => {
            preset.addEventListener('click', (e) => this.handleFontPreset(e.currentTarget.dataset.font));
        });

        document.querySelectorAll('.size-preset').forEach(preset => {
            preset.addEventListener('click', (e) => this.handleSizePreset(e.currentTarget));
        });

        // Layout
        document.querySelectorAll('.layout-preset').forEach(preset => {
            preset.addEventListener('click', (e) => this.handleLayoutPreset(e.currentTarget.dataset.layout));
        });

        document.getElementById('contentWidth').addEventListener('input', (e) => {
            this.currentStyles.layout.contentWidth = parseInt(e.target.value);
        });

        // Effects
        document.getElementById('enableShadows').addEventListener('change', (e) => {
            this.currentStyles.effects.shadows = e.target.checked;
        });

        document.getElementById('enableRounded').addEventListener('change', (e) => {
            this.currentStyles.effects.rounded = e.target.checked;
        });

        document.getElementById('enableAnimations').addEventListener('change', (e) => {
            this.currentStyles.effects.animations = e.target.checked;
        });

        document.getElementById('enableGlass').addEventListener('change', (e) => {
            this.currentStyles.effects.glass = e.target.checked;
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    openModal() {
        const modal = document.getElementById('siteStylesModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('siteStylesModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleColorPreset(theme) {
        const themes = {
            modern: {
                primary: '#2196f3',
                secondary: '#f50057'
            },
            elegant: {
                primary: '#9c27b0',
                secondary: '#ff9800'
            },
            natural: {
                primary: '#4caf50',
                secondary: '#cddc39'
            },
            bold: {
                primary: '#f44336',
                secondary: '#ff9800'
            }
        };

        const colors = themes[theme];
        if (colors) {
            this.currentStyles.colors.primary = colors.primary;
            this.currentStyles.colors.secondary = colors.secondary;
            
            // Update color inputs
            document.getElementById('primaryColor').value = colors.primary;
            document.getElementById('secondaryColor').value = colors.secondary;
        }
    }

    handleFontPreset(font) {
        this.currentStyles.typography.font = font;
        
        // Update active state
        document.querySelectorAll('.font-preset').forEach(preset => {
            preset.classList.toggle('active', preset.dataset.font === font);
        });
    }

    handleSizePreset(element) {
        const size = element.dataset.size;
        this.currentStyles.typography.size = size;
        
        // Update active state
        document.querySelectorAll('.size-preset').forEach(preset => {
            preset.classList.remove('active');
        });
        element.classList.add('active');
    }

    handleLayoutPreset(layout) {
        this.currentStyles.layout.spacing = layout;
        
        // Update active state
        document.querySelectorAll('.layout-preset').forEach(preset => {
            preset.classList.toggle('active', preset.dataset.layout === layout);
        });
    }

    applyStyles() {
        const root = document.documentElement;
        
        // Apply colors
        root.style.setProperty('--primary-color', this.currentStyles.colors.primary);
        root.style.setProperty('--secondary-color', this.currentStyles.colors.secondary);

        // Apply typography
        const fontFamily = this.currentStyles.typography.fonts[this.currentStyles.typography.font];
        root.style.setProperty('--font-family', fontFamily);

        // Apply font size
        const fontSizes = {
            small: '14px',
            medium: '16px',
            large: '18px'
        };
        root.style.setProperty('--base-font-size', fontSizes[this.currentStyles.typography.size]);

        // Apply layout
        root.style.setProperty('--content-width', `${this.currentStyles.layout.contentWidth}px`);
        
        const spacingMultipliers = {
            compact: '0.75',
            comfortable: '1',
            spacious: '1.5'
        };
        root.style.setProperty('--spacing-multiplier', spacingMultipliers[this.currentStyles.layout.spacing]);

        // Apply effects
        document.body.classList.toggle('no-shadows', !this.currentStyles.effects.shadows);
        document.body.classList.toggle('no-rounded', !this.currentStyles.effects.rounded);
        document.body.classList.toggle('no-animations', !this.currentStyles.effects.animations);
        document.body.classList.toggle('no-glass', !this.currentStyles.effects.glass);

        // Save styles to localStorage
        localStorage.setItem('siteStyles', JSON.stringify(this.currentStyles));

        // Close modal
        this.closeModal();
    }

    resetStyles() {
        this.currentStyles = { ...this.defaultStyles };
        this.initializeModal();
        this.applyStyles();
    }

    loadSavedStyles() {
        const saved = localStorage.getItem('siteStyles');
        if (saved) {
            this.currentStyles = JSON.parse(saved);
            this.initializeModal();
            this.applyStyles();
        }
    }
}

// Initialize the style manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.styleManager = new StyleManager();
    window.styleManager.loadSavedStyles();
});
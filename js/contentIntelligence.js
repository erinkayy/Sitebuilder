// contentIntelligence.js
export class ContentIntelligence {
    constructor() {
        this.pageTypes = {
            homepage: {
                sections: [
                    {
                        type: 'hero',
                        title: 'Hero Section',
                        description: 'A compelling hero section with headline and CTA',
                        suggestions: {
                            headline: 'Transform Your Ideas Into Reality',
                            subheadline: 'Create stunning websites with AI-powered assistance',
                            cta: 'Get Started Today'
                        }
                    },
                    {
                        type: 'features',
                        title: 'Feature Grid',
                        description: 'Showcase your key features or services',
                        suggestions: {
                            headline: 'Why Choose Us',
                            features: [
                                'Intuitive Design',
                                'AI-Powered Solutions',
                                'Responsive Layout',
                                'Custom Branding'
                            ]
                        }
                    },
                    {
                        type: 'content',
                        title: 'About Section',
                        description: 'Share your story and build trust',
                        suggestions: {
                            headline: 'Our Story',
                            content: 'We help businesses create impactful online presence...'
                        }
                    },
                    {
                        type: 'testimonials',
                        title: 'Testimonials',
                        description: 'Build trust with social proof',
                        suggestions: {
                            headline: 'What Our Clients Say'
                        }
                    }
                ],
                metaDescription: 'Create stunning websites with AI-powered assistance. Transform your ideas into reality with our intuitive site builder.',
                keywords: ['website builder', 'AI assistant', 'web design', 'custom website']
            },
            about: {
                sections: [
                    {
                        type: 'hero',
                        title: 'About Hero',
                        description: 'Introduce your company',
                        suggestions: {
                            headline: 'Our Mission & Vision',
                            subheadline: 'Building the future of web development'
                        }
                    },
                    {
                        type: 'team',
                        title: 'Team Section',
                        description: 'Showcase your team members',
                        suggestions: {
                            headline: 'Meet Our Team'
                        }
                    },
                    {
                        type: 'values',
                        title: 'Company Values',
                        description: 'Share your core values',
                        suggestions: {
                            headline: 'What We Stand For'
                        }
                    }
                ],
                metaDescription: 'Learn about our mission, team, and values. Discover how we\'re revolutionizing web development.',
                keywords: ['about us', 'company mission', 'team', 'values']
            }
        };
    }

    suggestSections(pageType) {
        return this.pageTypes[pageType]?.sections || [];
    }

    generateMetaDescription(pageType) {
        return this.pageTypes[pageType]?.metaDescription || '';
    }

    getKeywords(pageType) {
        return this.pageTypes[pageType]?.keywords || [];
    }

    generateAltText(imageName, context) {
        const cleanName = imageName.replace(/[-_]/g, ' ').replace(/\.\w+$/, '');
        return `${context} - ${cleanName}`;
    }

    analyzeSEO(content) {
        const seoScore = {
            score: 0,
            suggestions: []
        };

        // Check content length
        if (content.length < 300) {
            seoScore.suggestions.push('Add more content to improve SEO (aim for at least 300 words)');
        }

        // Check for headings
        if (!content.includes('<h1>')) {
            seoScore.suggestions.push('Add an H1 heading for better structure');
        }

        // Check for meta description
        if (!content.includes('<meta name="description"')) {
            seoScore.suggestions.push('Add a meta description');
        }

        return seoScore;
    }
}

// Initialize and export a singleton instance
export const contentAI = new ContentIntelligence();
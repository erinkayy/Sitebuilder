document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentStep = 1;
    const totalSteps = 5;
    
    // Get DOM elements
    const prevButton = document.getElementById('prevStep');
    const nextButton = document.getElementById('nextStep');
    const progressBar = document.getElementById('progress');
    const steps = document.querySelectorAll('.step');
    
    // Update progress bar and steps
    function updateProgress() {
        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progress}%`;
        
        steps.forEach((step, idx) => {
            const stepNum = idx + 1;
            step.classList.toggle('active', stepNum === currentStep);
            step.classList.toggle('completed', stepNum < currentStep);
        });
        
        // Update button states
        prevButton.disabled = currentStep === 1;
        if (currentStep === totalSteps) {
            nextButton.textContent = 'Finish';
        } else {
            nextButton.textContent = 'Next';
        }
    }
    
    // Show current step
    function showStep(step) {
        document.querySelectorAll('.onboarding-step').forEach(s => {
            s.classList.remove('active');
        });
        document.getElementById(`step${step}`).classList.add('active');
    }
    
    // Handle next button click
    nextButton.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
        } else {
            // Handle form submission or completion
            handleOnboardingComplete();
        }
    });
    
    // Handle previous button click
    prevButton.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            updateProgress();
        }
    });
    
    // Initialize layout option selection
    const layoutOptions = document.querySelectorAll('.layout-option');
    layoutOptions.forEach(option => {
        option.addEventListener('click', () => {
            layoutOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Initialize color pickers
    const colorPickers = document.querySelectorAll('input[type="color"]');
    colorPickers.forEach(picker => {
        picker.addEventListener('change', () => {
            updatePreview();
        });
    });
    
    // Initialize section checkboxes
    const sectionCheckboxes = document.querySelectorAll('.section-option input[type="checkbox"]');
    sectionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updatePreview();
        });
    });
    
    // Preview update function
    function updatePreview() {
        const previewContainer = document.querySelector('.preview-container');
        // Add preview update logic here
        // This could include updating a visual representation of the homepage
        // based on selected sections and styles
    }
    
    // Handle onboarding completion
    function handleOnboardingComplete() {
        // Collect all form data
        const formData = {
            business: {
                name: document.getElementById('businessName').value,
                description: document.getElementById('businessDescription').value,
                aiTone: document.getElementById('aiTone').value
            },
            style: {
                primaryColor: document.getElementById('primaryColor').value,
                secondaryColor: document.getElementById('secondaryColor').value,
                accentColor: document.getElementById('accentColor').value,
                headingFont: document.getElementById('headingFont').value,
                layout: document.querySelector('.layout-option.active')?.dataset.layout
            },
            sections: Array.from(document.querySelectorAll('.section-option input[type="checkbox"]'))
                .filter(cb => cb.checked)
                .map(cb => cb.id),
            features: Array.from(document.querySelectorAll('.feature-option input[type="checkbox"]'))
                .filter(cb => cb.checked)
                .map(cb => cb.id)
        };
        
        // You can handle the form data here - e.g., send to a server
        console.log('Onboarding completed:', formData);
        
        // For demonstration, show an alert
        alert('Onboarding completed! Your retail website is being generated.');
    }
    
    // Initialize the first step
    updateProgress();
});

// Catalog sync simulation
document.querySelectorAll('.integration-option').forEach(option => {
    option.addEventListener('click', () => {
        const syncStatus = document.querySelector('.catalog-sync-status');
        const syncProgress = document.querySelector('.sync-progress');
        
        syncProgress.classList.remove('hidden');
        
        // Simulate sync progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            const progressBar = syncProgress.querySelector('.progress-bar');
            const statusText = syncProgress.querySelector('.sync-status');
            
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                statusText.textContent = 'Sync complete!';
                setTimeout(() => {
                    syncProgress.classList.add('hidden');
                }, 2000);
            }
        }, 500);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Get navigation elements
    const prevButton = document.getElementById('prevStep');
    const nextButton = document.getElementById('nextStep');
    const progressBar = document.getElementById('progress');
    const steps = document.querySelectorAll('.step');
    const sections = document.querySelectorAll('.onboarding-step');
    
    let currentStep = 1;
    const totalSteps = sections.length;

    // Simple function to show a specific step
    function goToStep(stepNumber) {
        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));
        
        // Show the current section
        const currentSection = document.getElementById(`step${stepNumber}`);
        if (currentSection) {
            currentSection.classList.add('active');
        }
        
        // Update step indicators
        steps.forEach((step, index) => {
            if (index + 1 === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update progress bar
        const progress = ((stepNumber - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = progress + '%';
        
        // Update button states
        prevButton.disabled = stepNumber === 1;
        if (stepNumber === totalSteps) {
            nextButton.textContent = 'Finish';
        } else {
            nextButton.textContent = 'Next';
        }
    }

    // Add click handlers
    nextButton.addEventListener('click', function() {
        if (currentStep < totalSteps) {
            currentStep++;
            goToStep(currentStep);
        }
    });

    prevButton.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            goToStep(currentStep);
        }
    });

    // Initialize first step
    goToStep(1);
});
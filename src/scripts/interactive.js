// Advanced Interactive Features for Sign Language Explorer

// This file contains additional interactive features that can be added to the website
// These are optional enhancements that can be implemented if desired

// Quiz functionality
function initQuiz() {
    const quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-container';
    quizContainer.innerHTML = `
        <h3>Test Your Knowledge</h3>
        <p>Can you match these signs to their correct letters?</p>
        <div class="quiz-content">
            <div class="quiz-image">
                <img src="" alt="Sign language symbol" id="quiz-sign">
            </div>
            <div class="quiz-options">
                <!-- Options will be dynamically inserted here -->
            </div>
        </div>
        <div class="quiz-result"></div>
        <button class="btn primary-btn" id="next-question">Next Question</button>
    `;
    
    // Find a good place to append the quiz (e.g., after the alphabet section)
    const alphabetSection = document.querySelector('.alphabet-section');
    if (alphabetSection) {
        alphabetSection.appendChild(quizContainer);
        setupQuiz();
    }
}

function setupQuiz() {
    const quizSign = document.getElementById('quiz-sign');
    const optionsContainer = document.querySelector('.quiz-options');
    const resultContainer = document.querySelector('.quiz-result');
    const nextButton = document.getElementById('next-question');
    
    // Array of letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let currentLetter = '';
    
    // Function to generate a new question
    function generateQuestion() {
        // Clear previous result
        resultContainer.textContent = '';
        resultContainer.className = 'quiz-result';
        
        // Choose a random letter
        const randomIndex = Math.floor(Math.random() * letters.length);
        currentLetter = letters[randomIndex];
        
        // Set the image
        quizSign.src = `src/assets/alphabet/${currentLetter.toLowerCase()}.png`;
        
        // Generate options (including the correct one and 3 random ones)
        let options = [currentLetter];
        
        while (options.length < 4) {
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            if (!options.includes(randomLetter)) {
                options.push(randomLetter);
            }
        }
        
        // Shuffle options
        options = options.sort(() => Math.random() - 0.5);
        
        // Create option buttons
        optionsContainer.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option;
            
            button.addEventListener('click', () => {
                // Check if answer is correct
                if (option === currentLetter) {
                    resultContainer.textContent = 'Correct! Great job!';
                    resultContainer.className = 'quiz-result correct';
                } else {
                    resultContainer.textContent = `Incorrect. The correct answer is ${currentLetter}.`;
                    resultContainer.className = 'quiz-result incorrect';
                }
                
                // Disable all option buttons
                document.querySelectorAll('.quiz-option').forEach(btn => {
                    btn.disabled = true;
                    if (btn.textContent === currentLetter) {
                        btn.classList.add('correct-option');
                    } else if (btn.textContent === option && option !== currentLetter) {
                        btn.classList.add('wrong-option');
                    }
                });
            });
            
            optionsContainer.appendChild(button);
        });
    }
    
    // Generate initial question
    generateQuestion();
    
    // Add event listener to next button
    nextButton.addEventListener('click', generateQuestion);
}

// Practice area functionality
function initPracticeArea() {
    const practiceContainer = document.createElement('div');
    practiceContainer.className = 'practice-container';
    practiceContainer.innerHTML = `
        <h3>Practice Area</h3>
        <p>Type in the box below and see the sign language equivalent appear</p>
        <div class="practice-input">
            <input type="text" id="practice-text" placeholder="Type your text here...">
        </div>
        <div class="practice-output" id="practice-output">
            <!-- Signs will appear here -->
        </div>
    `;
    
    // Find a good place to append the practice area (e.g., before the footer)
    const footer = document.querySelector('footer');
    if (footer) {
        document.body.insertBefore(practiceContainer, footer);
        setupPracticeArea();
    }
}

function setupPracticeArea() {
    const inputField = document.getElementById('practice-text');
    const outputContainer = document.getElementById('practice-output');
    
    inputField.addEventListener('input', () => {
        // Get the input text
        const text = inputField.value.toUpperCase();
        
        // Clear the output container
        outputContainer.innerHTML = '';
        
        // Display sign for each letter
        for (const char of text) {
            if (/[A-Z]/.test(char)) {
                const signContainer = document.createElement('div');
                signContainer.className = 'sign-container';
                
                const signImage = document.createElement('img');
                signImage.src = `src/assets/alphabet/${char.toLowerCase()}.png`;
                signImage.alt = `Sign for ${char}`;
                
                const signLabel = document.createElement('div');
                signLabel.className = 'sign-label';
                signLabel.textContent = char;
                
                signContainer.appendChild(signImage);
                signContainer.appendChild(signLabel);
                outputContainer.appendChild(signContainer);
            } else if (char === ' ') {
                // For spaces, add a special space element
                const spaceElement = document.createElement('div');
                spaceElement.className = 'sign-space';
                outputContainer.appendChild(spaceElement);
            }
        }
    });
}

// Call these functions when the page loads if you want to enable these features
document.addEventListener('DOMContentLoaded', () => {
    // Uncomment these lines to enable the features
    // initQuiz();
    // initPracticeArea();
}); 
/**
 * Pakistan Armed Forces Quiz System
 */

// Quiz Data Structure
const quizData = {
    army: {
        name: "Pakistan Army",
        subcategories: {
            initialTests: {
                name: "Initial Tests",
                subjects: {
                    english: {
                        name: "English",
                        topics: {
                            grammar: {
                                name: "Grammar",
                                questions: [
                                    {
                                        question: "Choose the correct form of the verb: He _____ to the market yesterday.",
                                        options: ["go", "goes", "went", "going"],
                                        correctAnswer: 2
                                    },
                                    {
                                        question: "Which sentence is grammatically correct?",
                                        options: [
                                            "She don't like apples.",
                                            "She doesn't likes apples.",
                                            "She doesn't like apples.",
                                            "She not like apples."
                                        ],
                                        correctAnswer: 2
                                    }
                                ]
                            },
                            vocabulary: {
                                name: "Vocabulary",
                                questions: [
                                    {
                                        question: "What is the synonym of 'brave'?",
                                        options: ["Cowardly", "Fearful", "Courageous", "Timid"],
                                        correctAnswer: 2
                                    }
                                ]
                            }
                        }
                    },
                    mathematics: {
                        name: "Mathematics",
                        topics: {
                            algebra: {
                                name: "Algebra",
                                questions: [
                                    {
                                        question: "Solve for x: 2x + 5 = 15",
                                        options: ["x = 5", "x = 10", "x = 7.5", "x = 5.5"],
                                        correctAnswer: 0
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            intelligenceTests: {
                name: "Intelligence Tests",
                subjects: {
                    generalKnowledge: {
                        name: "General Knowledge",
                        topics: {
                            history: {
                                name: "History",
                                questions: [
                                    {
                                        question: "When was Pakistan founded?",
                                        options: ["1945", "1946", "1947", "1948"],
                                        correctAnswer: 2
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    },
    airforce: {
        name: "Pakistan Air Force",
        subcategories: {
            initialTests: {
                name: "Initial Tests",
                subjects: {
                    physics: {
                        name: "Physics",
                        topics: {
                            mechanics: {
                                name: "Mechanics",
                                questions: [
                                    {
                                        question: "What is Newton's First Law of Motion?",
                                        options: [
                                            "Force equals mass times acceleration",
                                            "For every action, there is an equal and opposite reaction",
                                            "An object at rest stays at rest unless acted upon by an external force",
                                            "Energy can neither be created nor destroyed"
                                        ],
                                        correctAnswer: 2
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    },
    navy: {
        name: "Pakistan Navy",
        subcategories: {
            initialTests: {
                name: "Initial Tests",
                subjects: {
                    mathematics: {
                        name: "Mathematics",
                        topics: {
                            trigonometry: {
                                name: "Trigonometry",
                                questions: [
                                    {
                                        question: "What is the value of sin(90°)?",
                                        options: ["0", "1", "√2", "Not defined"],
                                        correctAnswer: 1
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
};

// App State
const state = {
    currentPage: 'home',
    currentCategory: null,
    currentSubcategory: null,
    currentSubject: null,
    currentTopic: null,
    currentQuiz: null,
    currentQuestionIndex: 0,
    selectedAnswers: [],
    quizResults: {
        total: 0,
        correct: 0,
        incorrect: 0,
        percentage: 0
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    setupNavigation();
    setupHamburgerMenu();
    setupCategoryCards();
    setupQuizButtons();
}

// Navigation Functions
function setupNavigation() {
    // Main navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.getAttribute('data-page'));
        });
    });
}

function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    document.getElementById(`${page}-page`).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
    
    // Update state
    state.currentPage = page;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Category Functions
function setupCategoryCards() {
    document.querySelectorAll('[data-action="explore"]').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-target');
            window.location.href = `catgry.html?category=${category}`;
        });
    });
}

function showCategoryPage(category) {
    // Update state
    state.currentCategory = category;
    
    // Update breadcrumb and heading
    document.getElementById('category-title').textContent = quizData[category].name;
    document.getElementById('category-heading').textContent = quizData[category].name;
    
    // Clear and populate subcategories
    const subcategoriesContainer = document.getElementById('subcategories-container');
    subcategoriesContainer.innerHTML = '';
    
    const subcategories = quizData[category].subcategories;
    for (const subcategoryId in subcategories) {
        const subcategory = subcategories[subcategoryId];
        
        const subcategoryCard = document.createElement('div');
        subcategoryCard.className = 'subcategory-card';
        subcategoryCard.innerHTML = `
            <h3>${subcategory.name}</h3>
            <button class="btn btn-secondary" data-subcategory="${subcategoryId}">Explore</button>
        `;
        
        subcategoriesContainer.appendChild(subcategoryCard);
        
        // Add event listener
        subcategoryCard.querySelector('button').addEventListener('click', () => {
            showSubcategoryPage(category, subcategoryId);
        });
    }
}

function showSubcategoryPage(category, subcategoryId) {
    // Update state
    state.currentCategory = category;
    state.currentSubcategory = subcategoryId;
    
    // Update breadcrumb and heading
    document.getElementById('subcategory-parent').textContent = quizData[category].name;
    document.getElementById('subcategory-title').textContent = quizData[category].subcategories[subcategoryId].name;
    document.getElementById('subcategory-heading').textContent = quizData[category].subcategories[subcategoryId].name;
    
    // Clear and populate subjects
    const subjectsContainer = document.getElementById('subjects-container');
    subjectsContainer.innerHTML = '';
    
    const subjects = quizData[category].subcategories[subcategoryId].subjects;
    for (const subjectId in subjects) {
        const subject = subjects[subjectId];
        
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        subjectCard.innerHTML = `
            <h3>${subject.name}</h3>
            <button class="btn btn-secondary" data-subject="${subjectId}">Explore</button>
        `;
        
        subjectsContainer.appendChild(subjectCard);
        
        // Add event listener
        subjectCard.querySelector('button').addEventListener('click', () => {
            showTopicPage(category, subcategoryId, subjectId);
        });
    }
    
    // Navigate to subcategory page
    navigateTo('subcategory');
}

function showTopicPage(category, subcategoryId, subjectId) {
    // Update state
    state.currentCategory = category;
    state.currentSubcategory = subcategoryId;
    state.currentSubject = subjectId;
    
    // Update breadcrumb and heading
    document.getElementById('topic-category').textContent = quizData[category].name;
    document.getElementById('topic-subcategory').textContent = quizData[category].subcategories[subcategoryId].name;
    document.getElementById('topic-title').textContent = quizData[category].subcategories[subcategoryId].subjects[subjectId].name;
    document.getElementById('topic-heading').textContent = quizData[category].subcategories[subcategoryId].subjects[subjectId].name;
    
    // Clear and populate topics
    const topicsContainer = document.getElementById('topics-container');
    topicsContainer.innerHTML = '';
    
    const topics = quizData[category].subcategories[subcategoryId].subjects[subjectId].topics;
    for (const topicId in topics) {
        const topic = topics[topicId];
        const questionCount = topic.questions.length;
        
        const topicCard = document.createElement('div');
        topicCard.className = 'topic-card';
        topicCard.innerHTML = `
            <h3>${topic.name}</h3>
            <div class="question-count">${questionCount} Questions Available</div>
            <button class="btn btn-secondary" data-topic="${topicId}">Start Quiz</button>
        `;
        
        topicsContainer.appendChild(topicCard);
        
        // Add event listener
        topicCard.querySelector('button').addEventListener('click', () => {
            showQuizStartPage(category, subcategoryId, subjectId, topicId);
        });
    }
    
    // Navigate to topic page
    navigateTo('topic');
}

function showQuizStartPage(category, subcategoryId, subjectId, topicId) {
    // Update state
    state.currentCategory = category;
    state.currentSubcategory = subcategoryId;
    state.currentSubject = subjectId;
    state.currentTopic = topicId;
    
    // Update breadcrumb and heading
    document.getElementById('quiz-start-category').textContent = quizData[category].name;
    document.getElementById('quiz-start-subcategory').textContent = quizData[category].subcategories[subcategoryId].name;
    document.getElementById('quiz-start-topic').textContent = quizData[category].subcategories[subcategoryId].subjects[subjectId].name;
    document.getElementById('quiz-start-heading').textContent = quizData[category].subcategories[subcategoryId].subjects[subjectId].topics[topicId].name;
    
    // Update available questions
    const availableQuestions = quizData[category].subcategories[subcategoryId].subjects[subjectId].topics[topicId].questions.length;
    document.getElementById('available-questions').textContent = availableQuestions;
    
    // Set default question count
    document.getElementById('question-count').value = Math.min(10, availableQuestions);
    document.getElementById('question-count').max = availableQuestions;
    
    // Clear error message
    document.getElementById('question-count-error').textContent = '';
    
    // Navigate to quiz start page
    navigateTo('quiz-start');
}

// Quiz Functions
function setupQuizButtons() {
    document.getElementById('start-quiz-btn')?.addEventListener('click', startQuiz);
    document.getElementById('prev-question-btn')?.addEventListener('click', showPreviousQuestion);
    document.getElementById('next-question-btn')?.addEventListener('click', showNextQuestion);
    document.getElementById('submit-quiz-btn')?.addEventListener('click', submitQuiz);
    document.getElementById('retake-quiz-btn')?.addEventListener('click', retakeQuiz);
    document.getElementById('go-home-btn')?.addEventListener('click', () => navigateTo('home'));
}

function startQuiz() {
    const questionCount = parseInt(document.getElementById('question-count').value);
    const availableQuestions = quizData[state.currentCategory].subcategories[state.currentSubcategory].subjects[state.currentSubject].topics[state.currentTopic].questions.length;
    
    // Validate question count
    if (isNaN(questionCount) || questionCount < 1) {
        document.getElementById('question-count-error').textContent = 'Please enter a valid number';
        return;
    }
    
    if (questionCount > availableQuestions) {
        document.getElementById('question-count-error').textContent = `Not enough questions available for this topic. Maximum is ${availableQuestions}`;
        return;
    }
    
    // Clear error message
    document.getElementById('question-count-error').textContent = '';
    
    // Get questions and shuffle them
    const allQuestions = [...quizData[state.currentCategory].subcategories[state.currentSubcategory].subjects[state.currentSubject].topics[state.currentTopic].questions];
    const shuffledQuestions = shuffleArray(allQuestions).slice(0, questionCount);
    
    // Shuffle options for each question
    shuffledQuestions.forEach(question => {
        const originalOptions = [...question.options];
        const originalCorrectAnswer = question.correctAnswer;
        const correctOption = originalOptions[originalCorrectAnswer];
        
        // Shuffle options
        question.options = shuffleArray(originalOptions);
        
        // Update correct answer index
        question.correctAnswer = question.options.indexOf(correctOption);
    });
    
    // Update state
    state.currentQuiz = shuffledQuestions;
    state.currentQuestionIndex = 0;
    state.selectedAnswers = new Array(shuffledQuestions.length).fill(null);
    
    // Update quiz title
    document.getElementById('quiz-title').textContent = quizData[state.currentCategory].subcategories[state.currentSubcategory].subjects[state.currentSubject].topics[state.currentTopic].name;
    
    // Update question count
    document.getElementById('total-questions').textContent = shuffledQuestions.length;
    
    // Show first question
    showQuestion(0);
    
    // Navigate to quiz page
    navigateTo('quiz');
}

function showQuestion(index) {
    // Update state
    state.currentQuestionIndex = index;
    
    // Update progress
    document.getElementById('current-question').textContent = index + 1;
    document.getElementById('quiz-progress-bar').style.width = `${((index + 1) / state.currentQuiz.length) * 100}%`;
    
    // Get current question
    const question = state.currentQuiz[index];
    
    // Update question text
    document.getElementById('question-text').textContent = question.question;
    
    // Clear options container
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    // Add options
    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (state.selectedAnswers[index] === optionIndex) {
            optionElement.classList.add('selected');
        }
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => {
            // Update selected answer
            state.selectedAnswers[index] = optionIndex;
            
            // Update UI
            document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            optionElement.classList.add('selected');
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    document.getElementById('prev-question-btn').style.display = index === 0 ? 'none' : 'block';
    document.getElementById('next-question-btn').style.display = index === state.currentQuiz.length - 1 ? 'none' : 'block';
    document.getElementById('submit-quiz-btn').style.display = index === state.currentQuiz.length - 1 ? 'block' : 'none';
}

function showPreviousQuestion() {
    if (state.currentQuestionIndex > 0) {
        showQuestion(state.currentQuestionIndex - 1);
    }
}

function showNextQuestion() {
    if (state.currentQuestionIndex < state.currentQuiz.length - 1) {
        showQuestion(state.currentQuestionIndex + 1);
    }
}

function submitQuiz() {
    // Calculate results
    let correct = 0;
    let incorrect = 0;
    
    state.currentQuiz.forEach((question, index) => {
        if (state.selectedAnswers[index] === question.correctAnswer) {
            correct++;
        } else {
            incorrect++;
        }
    });
    
    const total = state.currentQuiz.length;
    const percentage = Math.round((correct / total) * 100);
    
    // Update state
    state.quizResults = {
        total,
        correct,
        incorrect,
        percentage
    };
    
    // Save to local storage
    const quizInfo = {
        category: quizData[state.currentCategory].name,
        subcategory: quizData[state.currentCategory].subcategories[state.currentSubcategory].name,
        subject: quizData[state.currentCategory].subcategories[state.currentSubcategory].subjects[state.currentSubject].name,
        topic: quizData[state.currentCategory].subcategories[state.currentSubcategory].subjects[state.currentSubject].topics[state.currentTopic].name,
        date: new Date().toISOString(),
        score: percentage
    };
    
    const recentScores = JSON.parse(localStorage.getItem('recentScores')) || [];
    recentScores.unshift(quizInfo);
    if (recentScores.length > 10) {
        recentScores.pop();
    }
    localStorage.setItem('recentScores', JSON.stringify(recentScores));
    
    // Update result page
    document.getElementById('result-total').textContent = total;
    document.getElementById('result-correct').textContent = correct;
    document.getElementById('result-incorrect').textContent = incorrect;
    document.getElementById('result-percentage').textContent = `${percentage}%`;
    
    // Update result message
    let message = '';
    if (percentage >= 90) {
        message = 'Excellent! You have outstanding knowledge. You would make a great addition to the Pakistan Armed Forces!';
    } else if (percentage >= 70) {
        message = 'Good job! You have solid knowledge. With a bit more study, you\'ll be ready for the Armed Forces exams!';
    } else if (percentage >= 50) {
        message = 'Not bad! You have a decent foundation, but need more practice to excel in the Armed Forces exams.';
    } else {
        message = 'Keep practicing! With dedication and more study, you can improve your knowledge for the Armed Forces exams.';
    }
    document.getElementById('result-message').textContent = message;
    
    // Navigate to result page
    navigateTo('result');
}

function retakeQuiz() {
    // Start the quiz again
    startQuiz();
}

// Utility Functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Handle URL parameters for category page
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && quizData[category]) {
        showCategoryPage(category);
    }
});
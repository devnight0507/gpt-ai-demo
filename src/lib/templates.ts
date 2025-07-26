import { AppTemplate } from './types';

export const appTemplates: AppTemplate[] = [
  {
    name: 'Todo List',
    prompt: 'todo list app',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List App</title>
</head>
<body>
    <div class="container">
        <h1>My Todo List</h1>
        <div class="input-group">
            <input type="text" id="todoInput" placeholder="Enter a new task...">
            <button onclick="addTodo()">Add Task</button>
        </div>
        <ul id="todoList"></ul>
    </div>
</body>
</html>`,
      css: `body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
}

.container {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
}

.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#todoInput {
    flex: 1;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

button {
    padding: 12px 24px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background: #45a049;
}

#todoList {
    list-style: none;
    padding: 0;
}

.todo-item {
    display: flex;
    align-items: center;
    padding: 12px;
    margin-bottom: 8px;
    background: #f9f9f9;
    border-radius: 5px;
    transition: all 0.3s;
}

.todo-item:hover {
    background: #f0f0f0;
}

.todo-item.completed {
    opacity: 0.6;
    text-decoration: line-through;
}

.todo-item input[type="checkbox"] {
    margin-right: 12px;
    cursor: pointer;
}

.delete-btn {
    margin-left: auto;
    background: #f44336;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 3px;
    cursor: pointer;
}

.delete-btn:hover {
    background: #d32f2f;
}`,
      js: `let todos = [];

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    todos.push(todo);
    input.value = '';
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');
        
        li.innerHTML = \`
            <input type="checkbox" \${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(\${todo.id})">
            <span>\${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(\${todo.id})">Delete</button>
        \`;
        
        todoList.appendChild(li);
    });
}

document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});`
    }
  },
  {
    name: 'Calculator',
    prompt: 'calculator',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
</head>
<body>
    <div class="calculator">
        <div class="display" id="display">0</div>
        <div class="buttons">
            <button onclick="clearDisplay()" class="btn-clear">C</button>
            <button onclick="appendToDisplay('/')" class="btn-operator">÷</button>
            <button onclick="appendToDisplay('*')" class="btn-operator">×</button>
            <button onclick="deleteLast()" class="btn-delete">←</button>
            
            <button onclick="appendToDisplay('7')">7</button>
            <button onclick="appendToDisplay('8')">8</button>
            <button onclick="appendToDisplay('9')">9</button>
            <button onclick="appendToDisplay('-')" class="btn-operator">-</button>
            
            <button onclick="appendToDisplay('4')">4</button>
            <button onclick="appendToDisplay('5')">5</button>
            <button onclick="appendToDisplay('6')">6</button>
            <button onclick="appendToDisplay('+')" class="btn-operator">+</button>
            
            <button onclick="appendToDisplay('1')">1</button>
            <button onclick="appendToDisplay('2')">2</button>
            <button onclick="appendToDisplay('3')">3</button>
            <button onclick="calculate()" class="btn-equals" rowspan="2">=</button>
            
            <button onclick="appendToDisplay('0')" class="btn-zero">0</button>
            <button onclick="appendToDisplay('.')">.</button>
        </div>
    </div>
</body>
</html>`,
      css: `body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.calculator {
    background: #2d3436;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.display {
    background: #4a5568;
    color: white;
    font-size: 2.5em;
    padding: 20px;
    text-align: right;
    margin-bottom: 10px;
    border-radius: 10px;
    min-height: 60px;
    overflow: hidden;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

button {
    background: #718096;
    color: white;
    border: none;
    padding: 25px;
    font-size: 1.5em;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
}

button:hover {
    background: #5a67d8;
    transform: translateY(-2px);
}

button:active {
    transform: translateY(0);
}

.btn-operator {
    background: #ed8936;
}

.btn-operator:hover {
    background: #dd6b20;
}

.btn-clear {
    background: #e53e3e;
}

.btn-clear:hover {
    background: #c53030;
}

.btn-delete {
    background: #38b2ac;
}

.btn-delete:hover {
    background: #319795;
}

.btn-equals {
    background: #48bb78;
    grid-row: span 2;
}

.btn-equals:hover {
    background: #38a169;
}

.btn-zero {
    grid-column: span 2;
}`,
      js: `let display = document.getElementById('display');
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    updateDisplay();
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentValue = '0';
        shouldResetDisplay = false;
    }
    
    if (value === '.' && currentValue.includes('.')) return;
    
    if (['+', '-', '*', '/'].includes(value)) {
        if (operation && previousValue) {
            calculate();
        }
        previousValue = currentValue;
        operation = value;
        shouldResetDisplay = true;
        return;
    }
    
    if (currentValue === '0' && value !== '.') {
        currentValue = value;
    } else {
        currentValue += value;
    }
    
    updateDisplay();
}

function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function calculate() {
    if (!operation || !previousValue) return;
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
    }
    
    currentValue = result.toString();
    operation = null;
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}`
    }
  },
  {
    name: 'Blog Summarizer',
    prompt: 'blog post summarizer',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Post Summarizer</title>
</head>
<body>
    <div class="container">
        <h1>📝 Blog Post Summarizer</h1>
        <p class="subtitle">Paste your blog post below and get an instant summary!</p>
        
        <div class="input-section">
            <label for="blogInput">Your Blog Post:</label>
            <textarea id="blogInput" placeholder="Paste your blog post here..."></textarea>
            <button onclick="summarize()">Generate Summary</button>
        </div>
        
        <div id="summarySection" class="summary-section" style="display: none;">
            <h2>Summary</h2>
            <div id="summary" class="summary"></div>
            <div class="stats">
                <span>Original: <strong id="originalWords">0</strong> words</span>
                <span>Summary: <strong id="summaryWords">0</strong> words</span>
                <span>Reduction: <strong id="reduction">0%</strong></span>
            </div>
        </div>
    </div>
</body>
</html>`,
      css: `body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #2d3436;
    text-align: center;
    margin-bottom: 10px;
}

.subtitle {
    color: #636e72;
    text-align: center;
    margin-bottom: 30px;
}

.input-section {
    margin-bottom: 30px;
}

label {
    display: block;
    font-weight: 600;
    margin-bottom: 10px;
    color: #2d3436;
}

textarea {
    width: 100%;
    min-height: 300px;
    padding: 15px;
    border: 2px solid #dfe6e9;
    border-radius: 10px;
    font-size: 16px;
    resize: vertical;
    font-family: inherit;
}

textarea:focus {
    outline: none;
    border-color: #74b9ff;
}

button {
    width: 100%;
    padding: 15px;
    background: #6c5ce7;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 15px;
}

button:hover {
    background: #5f3dc4;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(108, 92, 231, 0.3);
}

button:active {
    transform: translateY(0);
}

.summary-section {
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

h2 {
    color: #2d3436;
    margin-bottom: 15px;
}

.summary {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    line-height: 1.6;
    color: #2d3436;
    border-left: 4px solid #6c5ce7;
}

.stats {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    padding: 15px;
    background: #e9ecef;
    border-radius: 10px;
}

.stats span {
    color: #636e72;
}

.stats strong {
    color: #2d3436;
}`,
      js: `function summarize() {
    const input = document.getElementById('blogInput').value.trim();
    
    if (!input) {
        alert('Please paste a blog post to summarize!');
        return;
    }
    
    // Simulate AI processing
    setTimeout(() => {
        const summary = generateSummary(input);
        displaySummary(summary, input);
    }, 1000);
}

function generateSummary(text) {
    // Simple extractive summarization
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    
    if (sentences.length <= 3) {
        return text;
    }
    
    // Score sentences based on word frequency
    const words = text.toLowerCase().split(/\\s+/);
    const wordFreq = {};
    
    words.forEach(word => {
        word = word.replace(/[^a-z0-9]/g, '');
        if (word.length > 3) {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
    });
    
    const sentenceScores = sentences.map(sentence => {
        const sentWords = sentence.toLowerCase().split(/\\s+/);
        let score = 0;
        
        sentWords.forEach(word => {
            word = word.replace(/[^a-z0-9]/g, '');
            if (wordFreq[word]) {
                score += wordFreq[word];
            }
        });
        
        return { sentence: sentence.trim(), score };
    });
    
    // Sort by score and take top sentences
    sentenceScores.sort((a, b) => b.score - a.score);
    const topSentences = sentenceScores.slice(0, Math.ceil(sentences.length * 0.3));
    
    // Sort back to original order
    const summary = sentences
        .filter(sent => topSentences.some(ts => ts.sentence === sent.trim()))
        .join(' ');
    
    return summary;
}

function displaySummary(summary, original) {
    const summarySection = document.getElementById('summarySection');
    const summaryDiv = document.getElementById('summary');
    
    summaryDiv.textContent = summary;
    summarySection.style.display = 'block';
    
    // Calculate statistics
    const originalWords = original.split(/\\s+/).length;
    const summaryWords = summary.split(/\\s+/).length;
    const reduction = Math.round((1 - summaryWords / originalWords) * 100);
    
    document.getElementById('originalWords').textContent = originalWords;
    document.getElementById('summaryWords').textContent = summaryWords;
    document.getElementById('reduction').textContent = reduction + '%';
}`
    }
  },
  {
    name: 'Contact Form',
    prompt: 'contact form',
    code: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
</head>
<body>
    <div class="container">
        <form id="contactForm">
            <h1>Get In Touch</h1>
            <p>We'd love to hear from you. Send us a message!</p>
            
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" name="subject" required>
            </div>
            
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
            <button type="submit">Send Message</button>
            
            <div id="successMessage" class="success-message" style="display: none;">
                ✅ Message sent successfully! We'll get back to you soon.
            </div>
        </form>
    </div>
</body>
</html>`,
      css: `body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    width: 100%;
    max-width: 500px;
}

form {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #2d3436;
    margin-bottom: 10px;
    text-align: center;
}

p {
    color: #636e72;
    text-align: center;
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    color: #2d3436;
    font-weight: 600;
    margin-bottom: 8px;
}

input,
textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 16px;
    font-family: inherit;
    transition: all 0.3s;
}

input:focus,
textarea:focus {
    outline: none;
    border-color: #74b9ff;
    background: #f8f9fa;
}

button {
    width: 100%;
    padding: 15px;
    background: #fd79a8;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background: #e84393;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(232, 67, 147, 0.3);
}

button:active {
    transform: translateY(0);
}

.success-message {
    margin-top: 20px;
    padding: 15px;
    background: #00b894;
    color: white;
    border-radius: 8px;
    text-align: center;
    animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.error {
    border-color: #e74c3c !important;
}

.error-message {
    color: #e74c3c;
    font-size: 14px;
    margin-top: 5px;
}`,
      js: `document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Simulate sending message
    sendMessage(formData);
});

function validateForm(data) {
    let isValid = true;
    
    // Remove previous error states
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Validate email
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message length
    if (data.message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function sendMessage(data) {
    // Disable form during "sending"
    const form = document.getElementById('contactForm');
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        document.getElementById('successMessage').style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
        
        // Log the form data (in real app, this would be sent to server)
        console.log('Message sent:', data);
    }, 1500);
}`
    }
  }
];

// Default template for unmatched prompts
export const defaultTemplate: AppTemplate = {
  name: 'Hello World',
  prompt: 'default',
  code: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web App</title>
</head>
<body>
    <div class="container">
        <h1>Hello World!</h1>
        <p>Welcome to your new web app created with LaunchAI!</p>
        <button onclick="showMessage()">Click Me</button>
        <div id="message"></div>
    </div>
</body>
</html>`,
    css: `body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
    text-align: center;
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

p {
    color: #666;
    margin-bottom: 30px;
}

button {
    padding: 12px 30px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background: #764ba2;
    transform: translateY(-2px);
}

#message {
    margin-top: 20px;
    font-size: 18px;
    color: #667eea;
}`,
    js: `function showMessage() {
    const messages = [
        "You're amazing! 🌟",
        "Keep building awesome things! 🚀",
        "LaunchAI loves creators like you! 💜",
        "Ready to launch your next idea? 🎯"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const messageDiv = document.getElementById('message');
    
    messageDiv.textContent = randomMessage;
    messageDiv.style.animation = 'none';
    
    setTimeout(() => {
        messageDiv.style.animation = 'fadeIn 0.5s ease-in';
    }, 10);
}`
  }
};
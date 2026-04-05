// Vocabulary Lists (A2 + B1)
const wordBank = [
  "ability", "abroad", "accident", "achieve", "actually", "adventure", "advertise", "airport", "ambulance", "ancient", "appointment", "architecture", "available", "background", "beautiful", "beginning", "believe", "brilliant", "business", "calendar", "category", "celebrity", "certainly", "character", "chocolate", "classical", "colleague", "comfortable", "communicate", "community", "competition", "completely", "condition", "conference", "congratulations", "conscience", "conscious", "consequence", "consider", "continent", "continue", "control", "correctly", "countryside", "dangerous", "daughter", "decision", "definitely", "delicious", "department", "describe", "description", "difference", "different", "difficult", "disappear", "disappointed", "disaster", "discover", "discussion", "disease", "distance", "education", "effective", "efficiency", "electricity", "electronic", "embarrassed", "emergency", "environment", "equipment", "especially", "everything", "evidence", "excellent", "excitement", "exercise", "exhibition", "expect", "expensive", "experience", "experiment", "explain", "explanation", "extremely", "familiar", "favorite", "finally", "foreign", "fortunately", "furniture", "furthermore", "generally", "generous", "government", "grammar", "grateful", "guarantee", "happiness", "health", "height", "helpful", "history", "holiday", "horrible", "hospital", "imagine", "immediately", "important", "impossible", "improvement", "including", "increase", "independent", "individual", "information", "instruction", "instrument", "intelligent", "interesting", "international", "internet", "interrupt", "interview", "introduction", "inventory", "invisible", "island", "jealous", "jewelry", "journey", "knowledge", "language", "laptop", "laughter", "library", "literature", "location", "magazine", "management", "marriage", "material", "mathematics", "medicine", "mention", "message", "mountain", "movement", "musical", "necessary", "neighbor", "newspaper", "nothing", "occasion", "opposite", "organization", "particular", "passenger", "patience", "perfectly", "performance", "perhaps", "personality", "photograph", "physical", "pleasant", "political", "pollution", "popular", "population", "position", "positive", "possible", "practice", "prepare", "pressure", "probably", "problem", "production", "professional", "professor", "promise", "pronunciation", "punctuation", "quality", "question", "quickly", "quietly", "realize", "receipt", "receive", "recently", "recognize", "recommend", "relationship", "religious", "remember", "representative", "restaurant", "sacrifice", "satisfaction", "scarcely", "schedule", "science", "scissors", "secretary", "separate", "sequence", "shoulder", "signature", "sincerely", "situation", "slightly", "software", "solution", "something", "sometimes", "somewhere", "special", "speech", "standard", "straight", "strength", "student", "success", "successful", "suggest", "surprise", "system", "teacher", "technology", "temperature", "terrible", "thought", "through", "together", "tomorrow", "tongue", "tonight", "towards", "traditional", "traffic", "training", "transportation", "unfortunate", "university", "until", "unusual", "usually", "valuable", "vegetable", "vehicle", "village", "visitor", "weather", "wedding", "weight", "welcome", "wet", "whale", "what", "wheel", "when", "where", "whether", "which", "while", "white", "who", "whole", "whom", "whose", "why", "wide", "widow", "width", "wife", "wild", "will", "win", "wind", "window", "windy", "wine", "wing", "winner", "winter", "wipe", "wire", "wisdom", "wise", "wish", "with", "within", "without", "witness", "wolf", "woman", "wonder", "wood", "wooden", "wool", "word", "work", "worker", "world", "worry", "worse", "worst", "worth", "wound", "wow", "wrap", "wrist", "write", "writer", "wrong", "yard", "yeah", "year", "yellow", "yes", "yet", "yoga", "yogurt", "you", "young", "your", "yours", "youth", "zebra", "zero", "zone", "zoo"
];

let targetWord = "";
let currentScore = 0;
let timerSeconds = 60;
let countdown;
let gameStarted = false;

// Function to handle speech
function playSpeech() {
    if (!targetWord) return;
    window.speechSynthesis.cancel(); // Stop overlap
    const utter = new SpeechSynthesisUtterance(targetWord);
    utter.rate = 0.8;
    utter.lang = 'en-US';
    window.speechSynthesis.speak(utter);
}

// Function to start a new round
function newRound() {
    targetWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    document.getElementById('wordInput').value = "";
    document.getElementById('feedback').innerText = "Word loaded! Click Listen.";
    document.getElementById('feedback').style.color = "black";
    document.getElementById('hintBox').style.display = "none";
    
    // Reset Timer
    clearInterval(countdown);
    timerSeconds = 60;
    document.getElementById('timer').innerText = timerSeconds + "s";
    
    countdown = setInterval(() => {
        timerSeconds--;
        document.getElementById('timer').innerText = timerSeconds + "s";
        if (timerSeconds <= 0) {
            clearInterval(countdown);
            document.getElementById('feedback').innerText = "Time's up! The word was: " + targetWord.toUpperCase();
            document.getElementById('feedback').style.color = "red";
            setTimeout(newRound, 3000);
        }
    }, 1000);

    playSpeech();
}

// Function to check answer
function checkAnswer() {
    const userGuess = document.getElementById('wordInput').value.toLowerCase().trim();
    if (userGuess === targetWord.toLowerCase()) {
        currentScore += 10;
        document.getElementById('score').innerText = currentScore;
        document.getElementById('feedback').innerText = "Correct! ✨";
        document.getElementById('feedback').style.color = "green";
        clearInterval(countdown);
        setTimeout(newRound, 1500);
    } else {
        document.getElementById('feedback').innerText = "Try again! ❌";
        document.getElementById('feedback').style.color = "red";
    }
}

// Initializing the app on the first click
window.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById('status-indicator').innerText = "🟢 System Active";
        document.getElementById('status-indicator').style.color = "green";
        newRound();
    }
}, { once: true });

// Event Listeners for Buttons
document.getElementById('listenBtn').addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent re-triggering start logic
    playSpeech();
});

document.getElementById('hintBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    const box = document.getElementById('hintBox');
    box.style.display = (box.style.display === "none" || box.style.display === "") ? "block" : "none";
});

document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    checkAnswer();
});

document.getElementById('wordInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});
# Quiz App

## Live Link
https://quiz-app-pearl-rho.vercel.app/

##  Overview
This is a responsive quiz application built using React.js and Material-UI (MUI).  
The application allows users to:
- Enter their email and start the quiz.
- Answer 15 questions fetched from the [Open Trivia Database API](https://opentdb.com/api.php?amount=15).
- View a 30-minute countdown timer that auto-submits the quiz when it reaches zero.
- Navigate between questions using an overview panel that indicates visited and attempted questions.
- Review a detailed report at the end, showing each question, the user’s answer, and the correct answer.

**Approach:**
- Component-based structure for clear separation of functionality:
  - `StartPage`: Captures email and starts the quiz.
  - `QuizPage`: Displays questions, timer, and navigation panel.
  - `ReportPage`: Shows final results and correct answers.
- State Management: Used `useState` and `useEffect` hooks to handle quiz data, answers, timer, and navigation.
- Persistence: Stored timer and answers in `localStorage` to prevent progress loss on page reload.
- UI Design: Used Material-UI for a clean, responsive interface.

---

## ⚙️ Setup / Installation Instructions

1. **Clone the repository**
   ```
   git clone https://github.com/Pratik7249/Quiz-App.git
   cd quiz-app
   ```
2. **Install dependencies**
    ```
    npm install
    ```
3. **Run the application locally**
    ```
    npm run dev
    ```

### Assumptions
- API always returns exactly 15 questions.

- All questions are either multiple-choice or true/false.

- Email is only used for identification and is not stored permanently.

- Users cannot skip entering their email before starting the quiz.

## Challenges & Solutions
1. HTML Entity Encoding from API

Challenge: API returns text with HTML entities.

Solution: Used dangerouslySetInnerHTML to safely render the decoded HTML.

2. Timer Persistence on Page Reload

Challenge: Timer was resetting when the page refreshed.

Solution: Stored timeLeft in localStorage and restored it on reload.

3. Tracking Question Status

Challenge: Needed to track visited vs. answered questions for navigation UI.

Solution: Maintained separate state arrays for visited and answered questions, updated on every interaction.




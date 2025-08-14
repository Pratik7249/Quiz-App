import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider
} from "@mui/material";

const ReportPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data passed from QuizPage
  const { questions, userAnswers } = location.state || {};

  // Controls whether we show all question details
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  // If no data exists, block access and ask user to restart
  if (!questions || !userAnswers) {
    return (
      <Typography variant="body1" p={3}>
        No report data found. Please restart the quiz.
      </Typography>
    );
  }

  // Calculate raw score
  const totalScore = questions.reduce((score, question, idx) => {
    return score + (userAnswers[idx] === question.correct_answer ? 1 : 0);
  }, 0);

  // Calculate percentage score (rounded to 2 decimal places)
  const percentageScore = ((totalScore / questions.length) * 100).toFixed(2);

  return (
    <Box p={3}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Quiz Report
      </Typography>

      {/* Score Display */}
      <Typography variant="h6" gutterBottom>
        Score: {totalScore} / {questions.length} ({percentageScore}%)
      </Typography>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <Button
          variant="contained"
          onClick={() => setIsDetailVisible((prev) => !prev)}
        >
          {isDetailVisible ? "Hide Details" : "Show Details"}
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/")}
        >
          Restart Quiz
        </Button>
      </Box>

      {/* Question + Answer Breakdown */}
      {isDetailVisible && (
        <Box>
          {questions.map((q, idx) => {
            const userAnswer = userAnswers[idx] || "Not Attempted";
            const isCorrect = userAnswer === q.correct_answer;

            return (
              <Paper key={idx} sx={{ p: 2, mb: 2 }} elevation={2}>
                {/* Question */}
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Q{idx + 1}:</strong>{" "}
                  <span dangerouslySetInnerHTML={{ __html: q.question }} />
                </Typography>

                {/* User Answer */}
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    color: isCorrect ? "green" : "red",
                  }}
                >
                  Your Answer:{" "}
                  <span dangerouslySetInnerHTML={{ __html: userAnswer }} />
                </Typography>

                {/* Correct Answer */}
                <Typography variant="body2" gutterBottom>
                  Correct Answer:{" "}
                  <span dangerouslySetInnerHTML={{ __html: q.correct_answer }} />
                </Typography>

                {/* Divider (except for last question) */}
                {idx < questions.length - 1 && <Divider sx={{ mt: 1 }} />}
              </Paper>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ReportPage;

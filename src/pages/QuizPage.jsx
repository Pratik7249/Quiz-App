import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper
} from "@mui/material";

const QuizPage = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [visitedFlags, setVisitedFlags] = useState([]);
  const [secondsRemaining, setSecondsRemaining] = useState(1800);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("shuffledQuestions"));
    const storedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
    const storedVisited = JSON.parse(localStorage.getItem("visited")) || [];
    const storedIndex = parseInt(localStorage.getItem("currentIndex"), 10) || 0;
    const storedTime = parseInt(localStorage.getItem("timeLeft"), 10) || 1800;

    if (!storedQuestions) {
      navigate("/");
      return;
    }

    setQuestions(storedQuestions);
    setAnswers(storedAnswers);
    setVisitedFlags(storedVisited);
    setActiveIndex(storedIndex);
    setSecondsRemaining(storedTime);
  }, [navigate]);

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsRemaining((prev) => {
        const updated = prev - 1;
        localStorage.setItem("timeLeft", updated);
        return updated;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      submitQuiz();
    }
  }, [secondsRemaining]);

  const chooseAnswer = (selected) => {
    const updatedAnswers = [...answers];
    updatedAnswers[activeIndex] = selected;
    setAnswers(updatedAnswers);
    localStorage.setItem("userAnswers", JSON.stringify(updatedAnswers));
  };

  const goNext = () => {
    if (activeIndex < questions.length - 1) {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      localStorage.setItem("currentIndex", nextIndex);

      const updatedVisited = [...visitedFlags];
      updatedVisited[nextIndex] = true;
      setVisitedFlags(updatedVisited);
      localStorage.setItem("visited", JSON.stringify(updatedVisited));
    }
  };

  const goPrevious = () => {
    if (activeIndex > 0) {
      const prevIndex = activeIndex - 1;
      setActiveIndex(prevIndex);
      localStorage.setItem("currentIndex", prevIndex);
    }
  };

  const jumpTo = (index) => {
    setActiveIndex(index);
    localStorage.setItem("currentIndex", index);

    const updatedVisited = [...visitedFlags];
    updatedVisited[index] = true;
    setVisitedFlags(updatedVisited);
    localStorage.setItem("visited", JSON.stringify(updatedVisited));
  };

  const submitQuiz = () => {
    navigate("/report", { state: { questions, userAnswers: answers } });
  };

  const formatClock = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60).toString().padStart(2, "0");
    const secs = (totalSecs % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!questions.length) return null;

  const currentQ = questions[activeIndex];

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Time Left: {formatClock(secondsRemaining)}
      </Typography>

      <Grid container spacing={1} mb={2}>
        {questions.map((_, idx) => (
          <Grid item key={idx}>
            <Button
              variant="contained"
              size="small"
              onClick={() => jumpTo(idx)}
              sx={{
                backgroundColor:
                  answers[idx] != null
                    ? "green"
                    : visitedFlags[idx]
                    ? "orange"
                    : "lightgray",
                color: "white",
                "&:hover": {
                  backgroundColor:
                    answers[idx] != null
                      ? "darkgreen"
                      : visitedFlags[idx]
                      ? "darkorange"
                      : "gray",
                },
              }}
            >
              {idx + 1}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography
          variant="h6"
          dangerouslySetInnerHTML={{ __html: currentQ.question }}
        />
      </Paper>

      <Box>
        {currentQ.answers.map((option, idx) => (
          <Button
            key={idx}
            fullWidth
            variant={answers[activeIndex] === option ? "contained" : "outlined"}
            onClick={() => chooseAnswer(option)}
            sx={{ mb: 1, textAlign: "left" }}
          >
            <span dangerouslySetInnerHTML={{ __html: option }} />
          </Button>
        ))}
      </Box>

      <Box mt={2} display="flex" gap={2}>
        <Button
          variant="outlined"
          onClick={goPrevious}
          disabled={activeIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={goNext}
          disabled={activeIndex === questions.length - 1}
        >
          Next
        </Button>
        <Button variant="contained" color="primary" onClick={submitQuiz}>
          Submit Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default QuizPage;

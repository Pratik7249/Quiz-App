import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper
} from '@mui/material';

const StartPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const handleStart = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Enter a valid email");
      return;
    }

    setError("");
    try {
      const res = await fetch("https://opentdb.com/api.php?amount=15");
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();

      const shuffledQuestions = data.results.map(q => ({
        ...q,
        answers: shuffleArray([q.correct_answer, ...q.incorrect_answers]),
      }));

      localStorage.setItem("shuffledQuestions", JSON.stringify(shuffledQuestions));
      localStorage.setItem("userAnswers", JSON.stringify(Array(shuffledQuestions.length).fill(null)));
      localStorage.setItem("currentIndex", 0);
      localStorage.setItem("visited", JSON.stringify(Array(shuffledQuestions.length).fill(false)));
      localStorage.setItem("timeLeft", 1800); // 30 min
      localStorage.setItem("userEmail", email);

      navigate('/quiz');
    } catch (err) {
      console.error("Error fetching quiz:", err);
      setError("Failed to load quiz. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Start Quiz
        </Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(error)}
            helperText={error || ""}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleStart}
          size="large"
        >
          Start Quiz
        </Button>
      </Paper>
    </Container>
  );
};

export default StartPage;

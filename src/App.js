import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Button, Card } from "antd";
import "./App.css";

const { Option } = Select;

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [filters]);

  const fetchQuestions = () => {
    setLoading(true);

    const { category, difficulty, type } = filters;
    const url = `https://opentdb.com/api.php?amount=10${category ? `&category=${category}` : ""
      }${difficulty ? `&difficulty=${difficulty}` : ""}${type ? `&type=${type}` : ""
      }`;

    axios
      .get(url)
      .then((response) => {
        setQuestions(response.data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="filter-app">
      <div className="filter-panel">
        <Select
          placeholder="Kategoriya tanlang"
          onChange={(value) => handleFilterChange("category", value)}
          style={{ width: 200 }}
          allowClear
        >
          <Option value="9">General Knowledge</Option>
          <Option value="21">Sports</Option>
          <Option value="23">History</Option>
        </Select>

        <Select
          placeholder="Qiyinchilik darajasi"
          onChange={(value) => handleFilterChange("difficulty", value)}
          style={{ width: 200 }}
          allowClear
        >
          <Option value="easy">Oson</Option>
          <Option value="medium">O‘rtacha</Option>
          <Option value="hard">Qiyin</Option>
        </Select>

        <Select
          placeholder="Savol turi"
          onChange={(value) => handleFilterChange("type", value)}
          style={{ width: 200 }}
          allowClear
        >
          <Option value="multiple">Ko‘p variantli</Option>
          <Option value="boolean">True/False</Option>
        </Select>

        <Button type="primary" onClick={fetchQuestions} loading={loading}>
          Filtrni qo'llash
        </Button>
      </div>

      <div className="question-list">
        {questions.map((q, index) => (
          <Card key={index} className="question-card">
            <h3>{q.question}</h3>
            <p><strong>To‘g‘ri javob:</strong> {q.correct_answer}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import '../CssFiles/paticipate.css';

function ContestParticipation() {
    const dummyData = [
        { name: 'Aarav', points: 95 },
        { name: 'Meera', points: 89 },
        { name: 'Kabir', points: 87 },
        { name: 'Sana', points: 85 },
        { name: 'Dev', points: 82 },
      ];
  const [entry, setEntry] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    setEntry(e.target.value);
    setWordCount(e.target.value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleSubmit = () => {
    if (wordCount > 300) { // Suppose max 300 words allowed
      alert("🚫 Word limit exceeded! Maximum 300 words allowed.");
      return;
    }
    // Submit logic here (API call later)
    setSubmitted(true);
  };

  return (
    <div className="participation-container">
      <h1 className="contest-title">Sunday Writers' Arena ✍️</h1>

      <div className="theme-box">
        <h2>🎯 Weekly Theme:</h2>
        <p className="theme-text">A Letter to Your Future Self ✨</p>
      </div>

      <div className="entry-section">
        <h3>Your Entry:</h3>
        <textarea
          className="entry-textarea"
          value={entry}
          onChange={handleChange}
          placeholder="Unleash your creativity here..."
        ></textarea>

        <div className="entry-bottom">
          <span className="word-count">📝 {wordCount} words</span>
          <button className="submit-button" onClick={handleSubmit}>
            Submit Entry
          </button>
        </div>

        {submitted && <p className="success-message">🎉 Your entry has been submitted successfully!</p>}
      </div>

      <div className="rules-section">
        <h3>📜 Contest Rules:</h3>
        <ul>
          <li>Original work only – no AI or plagiarism!</li>
          <li>Max 300 words.</li>
          <li>Submission closes by Sunday 11:59 PM.</li>
          <li>Winners announced on Monday!</li>
        </ul>
      </div>
      
      <div className="leaderboard-container">
      <h1 className="leaderboard-title">🏆 Weekly Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Writer</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((user, index) => (
            <tr key={index} className={index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
}

export default ContestParticipation;

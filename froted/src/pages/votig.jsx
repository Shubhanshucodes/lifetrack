import React, { useState } from 'react';
import '../CssFiles/votig.css';

const initialEntries = [
  { id: 1, title: 'Sky of Dreams', writer: 'Aarav', votes: 54 },
  { id: 2, title: 'Whispers of Wind', writer: 'Meera', votes: 48 },
  { id: 3, title: 'Silent Screams', writer: 'Kabir', votes: 45 },
];

function Voting() {
  const [entries, setEntries] = useState(initialEntries);

  const handleVote = (id) => {
    const updatedEntries = entries.map(entry => {
      if (entry.id === id) {
        return { ...entry, votes: entry.votes + 1 };
      }
      return entry;
    });
    setEntries(updatedEntries);
  };

  // Check if voting is allowed
  const isVotingOpen = () => {
    const now = new Date();
    const day = now.getDay(); // Sunday = 0, Monday = 1, Tuesday = 2
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (day === 0 || day === 1) {
      // Sunday or Monday: Voting open
      return true;
    }
    if (day === 2) {
      // Tuesday: Check time
      if (hours < 23 || (hours === 23 && minutes <= 59)) {
        return true;
      }
    }
    // Otherwise: Voting closed
    return false;
  };

  const sortedEntries = [...entries].sort((a, b) => b.votes - a.votes);

  return (
    <div className="voting-container">
      <h1 className="voting-title">🗳️ Vote for Your Favorite!</h1>
      {sortedEntries.map((entry, index) => (
        <div key={entry.id} className="vote-card">
          <div>
            <h2>{entry.title}</h2>
            <p>By {entry.writer}</p>
            <p>Votes: {entry.votes}</p>
          </div>
          {isVotingOpen() ? (
            <button className="vote-btn" onClick={() => handleVote(entry.id)}>Vote</button>
          ) : (
            <div className="voting-closed">Voting Closed ❌</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Voting;

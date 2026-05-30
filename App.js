import React, { useState } from "react";
import "./App.css";

// ⭐ Star Rating Component
function StarRating({ rating, setRating }) {
const [hover, setHover] = useState(0);

return ( <div>
{[1, 2, 3, 4, 5].map((star) => (
<span
key={star}
onClick={() => setRating(star)}
onMouseEnter={() => setHover(star)}
onMouseLeave={() => setHover(0)}
style={{
fontSize: "30px",
cursor: "pointer",
color: star <= (hover || rating) ? "gold" : "gray",
}}
>
★ </span>
))} </div>
);
}

// 🚀 Main App
function App() {
const [reviews, setReviews] = useState([]);
const [text, setText] = useState("");
const [rating, setRating] = useState(0);
const [image, setImage] = useState(null);
const [username, setUsername] = useState("");
const [filter, setFilter] = useState("ALL");

// 📌 Handle Submit
const handleSubmit = (e) => {
e.preventDefault();

```
if (!text || rating === 0 || !username) {
  alert("Please fill all fields");
  return;
}

const newReview = {
  id: Date.now(),
  text,
  rating,
  username,
  image,
  likes: 0,
};

setReviews([newReview, ...reviews]);

// Reset fields
setText("");
setRating(0);
setImage(null);
setUsername("");
```

};

// 👍 Like button
const handleLike = (id) => {
setReviews(
reviews.map((r) =>
r.id === id ? { ...r, likes: r.likes + 1 } : r
)
);
};

// 📸 Image upload
const handleImage = (e) => {
if (e.target.files && e.target.files[0]) {
setImage(URL.createObjectURL(e.target.files[0]));
}
};

// 🔍 Filter reviews
const filteredReviews = reviews.filter((r) => {
if (filter === "HIGH") return r.rating >= 4;
if (filter === "LOW") return r.rating <= 2;
return true;
});

return ( <div className="container"> <h1>⭐ Product Review System</h1>

```
  {/* 📝 Form */}
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Enter your name"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <StarRating rating={rating} setRating={setRating} />

    <textarea
      placeholder="Write your review..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />

    <input type="file" onChange={handleImage} />

    {image && (
      <img src={image} alt="preview" className="preview" />
    )}

    <button type="submit">Submit Review</button>
  </form>

  {/* 🔍 Filters */}
  <div className="filters">
    <button onClick={() => setFilter("ALL")}>All</button>
    <button onClick={() => setFilter("HIGH")}>High Rating</button>
    <button onClick={() => setFilter("LOW")}>Low Rating</button>
  </div>

  <h2>Reviews</h2>

  {filteredReviews.length === 0 && <p>No reviews yet</p>}

  {/* 💬 Review List */}
  {filteredReviews.map((r) => (
    <div key={r.id} className="review">
      <h4>{r.username}</h4>
      <p>{"★".repeat(r.rating)}</p>
      <p>{r.text}</p>

      {r.image && <img src={r.image} alt="review" />}

      <button onClick={() => handleLike(r.id)}>
        👍 Helpful ({r.likes})
      </button>
    </div>
  ))}
</div>


);
}

export default App;

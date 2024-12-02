import React, { useState, useEffect } from "react";
import "./App.css";

const fetchMockData = (page) => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + page * 10}`);
      resolve(data);
    }, 1000); // Simulate network delay
  });
};

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newItems = await fetchMockData(page);
    setItems((prev) => [...prev, ...newItems]);
    setPage((prev) => prev + 1);
    setLoading(false);

    // If no new data is returned, assume no more items are available
    if (newItems.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
      loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container">
      <h1>Infinite Scroll</h1>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">
            {item}
          </li>
        ))}
      </ul>
      {loading && <div className="loading">Loading...</div>}
      {!hasMore && <div className="end-message">No more items to load</div>}
    </div>
  );
};

export default InfiniteScroll;

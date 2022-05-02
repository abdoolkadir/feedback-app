import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedBack] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(
      `https://feedbak-app-backend.herokuapp.com/feedback?_sort=id&_order=desc`
    );

    const data = await response.json();

    setFeedBack(data);
    setIsLoading(false);
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`https://feedbak-app-backend.herokuapp.com/feedback/${id}`, {
        method: 'DELETE'
      });
      setFeedBack(feedback.filter((item) => item.id !== id));
    }
  };

  // Add Feedback
  const addFeedBack = async (newFeedback) => {
    const response = await fetch(
      'https://feedbak-app-backend.herokuapp.com/feedback',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFeedback)
      }
    );

    const data = await response.json();

    setFeedBack([data, ...feedback]);
  };

  // Update feedback
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(
      `https://feedbak-app-backend.herokuapp.com/feedback/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updItem)
      }
    );

    const data = await response.json();

    setFeedBack(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  // Set items to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedBack,
        editFeedback,
        updateFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;

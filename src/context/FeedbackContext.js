import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
      'http://localhost:5000/feedback?_sort=id&_order=desc'
    );

    const data = await response.json();

    setFeedBack(data);
    setIsLoading(false);
  };

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedBack(feedback.filter((item) => item.id !== id));
    }
  };

  // Add Feedback
  const addFeedBack = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedBack([newFeedback, ...feedback]);
  };

  // Update feedback
  const updateFeedback = (id, updItem) => {
    setFeedBack(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
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

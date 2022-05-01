import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedBack] = useState([
    {
      id: 1,
      text: 'This item is from context 1',
      rating: 10
    },
    {
      id: 2,
      text: 'This item is from context 2',
      rating: 10
    },
    {
      id: 3,
      text: 'This item is from context 3',
      rating: 10
    }
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

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
        deleteFeedback,
        addFeedBack,
        editFeedback,
        feedbackEdit
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;

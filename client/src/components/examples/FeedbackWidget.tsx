import FeedbackWidget from '../FeedbackWidget';

export default function FeedbackWidgetExample() {
  return (
    <div className="p-8">
      <FeedbackWidget
        pageId="example-page"
        onFeedback={(pageId, isHelpful) => console.log('Feedback:', pageId, isHelpful)}
      />
    </div>
  );
}

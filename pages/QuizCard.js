export default function QuizCard({ question, index }) {
    return (
      <div className="mb-6 p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">
          {index}. {question.description}
        </h2>
        <div className="space-y-2">
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${index}`}
                id={`option-${option.id}`}
                className="form-radio"
              />
              <label htmlFor={`option-${option.id}`}>{option.description}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
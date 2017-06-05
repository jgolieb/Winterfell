var React = require('react');
var _     = require('lodash').noConflict();

var Question = require('./question');

class QuestionSet extends React.Component {

  render() {
    var questions = this.props.questions.map(question => {
      var classes = Object.assign({}, this.props.classes, question.classes);

      return (
        <Question key={question.questionId}
                  questionSetId={this.props.id}
                  questionId={question.questionId}
                  question={question.question}
                  validateOn={question.validateOn}
                  validations={question.validations}
                  text={question.text}
                  postText={question.postText}
                  value={this.props.questionAnswers[question.questionId]}
                  input={question.input}
                  classes={classes}
                  renderError={this.props.renderError}
                  renderRequiredAsterisk={this.props.renderRequiredAsterisk}
                  questionAnswers={this.props.questionAnswers}
                  validationErrors={this.props.validationErrors}
                  onAnswerChange={this.props.onAnswerChange}
                  onQuestionBlur={this.props.onQuestionBlur}
                  onKeyDown={this.props.onKeyDown}
                  transform={question.transform} />
      );
    });

    var buttons = this.props.buttons.map((button, index) => {
      let content = button.text || "";

      if (button.content) {
        if (typeof button.content === 'function') {
          content = button.content();
        } else {
          content = button.content;
        }
      }

      return (
        <button type={'button'}
          key={index}
          className={button.classes}
          title={button.text}
          onClick={(event) => button.onClick(this, event) }>
          {content}
        </button>)
    });

    let questionSet = (
      <div className={this.props.classes.questionSet}>
        {typeof this.props.questionSetHeader !== 'undefined'
           || typeof this.props.questionSetText !== 'undefined'
           ? (
              <div className={this.props.classes.questionSetHeaderContainer}>
                <div className={this.props.classes.questionSetHeaderButtons}>
                  {buttons}
                </div>
                {typeof this.props.questionSetHeader !== 'undefined'
                  ? <h4 className={this.props.classes.questionSetHeader}>
                      {this.props.questionSetHeader}
                    </h4>
                  : undefined}
                {typeof this.props.questionSetText !== 'undefined'
                  ? <p className={this.props.classes.questionSetText}>
                      {this.props.questionSetText}
                    </p>
                  : undefined}
               </div>
             )
          : undefined}
        <div className={this.props.classes.questions}>
          {questions}
        </div>
      </div>
    );

    if (typeof this.props.transform === 'function') {
      return this.props.transform(questionSet, this.props);
    }

    return questionSet;
  }

};

QuestionSet.defaultProps = {
  id                     : undefined,
  name                   : '',
  questionSetHeader      : undefined,
  questionSetText        : undefined,
  questions              : [],
  questionAnswers        : {},
  classes                : {},
  validationErrors       : {},
  renderError            : undefined,
  renderRequiredAsterisk : undefined,
  onAnswerChange         : () => {},
  onQuestionBlur         : () => {},
  onKeyDown              : () => {},
  onClick                : () => {},
  buttons                : [],
};

module.exports = QuestionSet;
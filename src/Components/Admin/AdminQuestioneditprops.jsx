import React from "react";
import Objective_edit from "./ObjectiveType/Objective_edit";
import Mcq_edit from "./MultipleChoiceQuestion.jsx/Mcq_edit";
import FillInTheBlanks_edit from "./FillInTheBlanks/FillInTheBlanks_edit";
import EditMatch from "./ClassLKG/Matchthefollowing/EditMatch";
import ReCorrecteditAnswer from "./ClassLKG/Recorrect/ReCorrecteditAnswer";
import OddAndOut_edit from "./OaddAndout/OddAndOut_edit";
import EditRelationshipWord from "./ClassLKG/Relationship/EditRelationshipWord";
import EditGrammerQuestion from "./GrammerQuestion/EditGrammerQuestion";
import EditOneWordQuestion from "./ClassLKG/Oneword/EditOneWordQuestion";
import TwoSentenceeditAnswer from "./ClassLKG/Twosentence/TwoSentenceeditAnswer";
import ThreeSentenceeditAnswer from "./ClassLKG/ThreeSentence/ThreeSentenceeditAnswer";
import FourSentenceeditAnswer from "./ClassLKG/foursentence/FourSentenceeditAnswer";
import FiveSentenceEditAnswers from "./ClassLKG/Fivesentence/FiveSentenceEditAnswers";
import QandA_5to6_editQandA from "./FiveAndSixSentences/QandA_5to6_editQandA";
import QandA_edit6Sentences from "./SixSentences/QandA_edit6Sentences";
import QandA_edit7Sentences from "./SevenSentences/QandA_edit7Sentences";
import QandA_edit8Sentences from "./ClassLKG/EightSentences/QandA_edit8Sentences";
import QandA_edit10Sentences from "./TenSentences/QandA_edit10Sentences";
import ExpandExplain_edit from "./ExpandAndExplain/ExpandExplain_edit";
import EditDrawFigure from "./DrawFigure/EditDrawFigure";
import EditGraphQuestion from "./GraphQuestion/EditGraphQuestion";
import EditPoem from "./CompleteThePoem/EditPoem";
import EditUnderstandAnsQN from "./UnderstandAnsQN/EditUnderstandAnsQN";
import EditPoetTimePlaceAnsQn from "./PoetTimePlaceAnsQN/EditPoetTimePlaceAnsQn";
import LetterWriting_edit from "./LetterWriting.jsx/LetterWriting_edit";
import Map_edit from "./Map/Map_edit";
import SituationAnalysis_edit from "./SituationAnalysis/SituationAnalysis_edit";

const componentMap = {
    "Objective Questions":<Objective_edit/>,
    "Multiple Choice Questions": <Mcq_edit />,
    "Fill in the Blanks Questions":<FillInTheBlanks_edit/>,
    "Match the Following Questions":<EditMatch/>,
    "Recorrect the Answers Questions":<ReCorrecteditAnswer/>,
    "Odd and out words Questions":<OddAndOut_edit/>,
    "RelationShip Words Questions":<EditRelationshipWord/>,
    "Grammer Questions":<EditGrammerQuestion/>,
    "One Word Question":<EditOneWordQuestion/>,
    "Two  Sentence Answer Questions":<TwoSentenceeditAnswer/>,
    "Two and three Sentence Answer Questions":<ThreeSentenceeditAnswer/>,
    "Three and Four Sentence Answer Questions":<FourSentenceeditAnswer/>,
    "Five Sentence Answer Questions":<FiveSentenceEditAnswers/>,
    "Five and Six Sentence Answer Questions":<QandA_5to6_editQandA/>,
    "Six Sentence Answer Questions":<QandA_edit6Sentences/>,
    "Seven Sentence Answer Questions":<QandA_edit7Sentences/>,
    "Eight Sentence Answer Questions":<QandA_edit8Sentences/>,
    "Ten Sentence Answer Questions":<QandA_edit10Sentences/>,
    "Expanding and Explanations Answer Questions":<ExpandExplain_edit/>,
    "Answer the Questions and Draw the Figure Questions":<EditDrawFigure/>,
    "Graph Questions":<EditGraphQuestion/>,
    "Complete the Poem":<EditPoem/>,
    "Situation UnderStatnding answer Questions":<SituationAnalysis_edit/>,
    "Poet,Time, Place, Writer answer questions":<EditPoetTimePlaceAnsQn/>,
    "Letter Writting":<LetterWriting_edit/>,
    "Map Reading":<Map_edit/>,


    
}

const AdminQuestioneditprops = (props) => {
    console.log("prop",props);
    const { Types_Question } = props;
    console.log("hkh",Types_Question);
    const componentToRender = componentMap[Types_Question]

    return (
        <>
            {componentToRender}
        </>
    )
}
export default AdminQuestioneditprops;

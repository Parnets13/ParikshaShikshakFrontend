import React from "react";
import Mcq_add from "./MultipleChoiceQuestion.jsx/Mcq_add";
import QandA_add8Sentences from "./ClassLKG/EightSentences/QandA_add8Sentences";
import AddMatches from "./ClassLKG/Matchthefollowing/AddMatches";
import RecorrectionaddAnswer from "./ClassLKG/Recorrect/RecorrectionaddAnswer";
import OddandOut_add from "./OaddAndout/OddandOut_add";
import AddRelationshipWord from "./ClassLKG/Relationship/AddRelationshipWord";
import AddOneWordQuestion from "./ClassLKG/Oneword/AddOneWordQuestion";
import TwoSentenceaddAnswer from "./ClassLKG/Twosentence/TwoSentenceaddAnswer";
import ThreeSentenceaddAnswer from "./ClassLKG/ThreeSentence/ThreeSentenceaddAnswer";
import QandA_5to6_addQandA from "./FiveAndSixSentences/QandA_5to6_addQandA";
import QandA_add6Sentences from "./SixSentences/QandA_add6Sentences";
import QandA_add7Sentences from "./SevenSentences/QandA_add7Sentences";
import QandA_add10Sentences from "./TenSentences/QandA_add10Sentences";
import AddDrawFigure from "./DrawFigure/AddDrawFigure";
import AddGraphQuestion from "./GraphQuestion/AddGraphQuestion";
import AddPoem from "./CompleteThePoem/AddPoem";
import ExpandExplain_add from "./ExpandAndExplain/ExpandExplain_add";
import Fillintheblanks_add from "./FillInTheBlanks/Fillintheblanks_add";
import AddPoetTimePlaceAnsQn from "./PoetTimePlaceAnsQN/AddPoetTimePlaceAnsQn";
import AddUnderstandAnsQN from "./UnderstandAnsQN/AddUnderstandAnsQN";
import FiveSentenceaddAnswer from "./ClassLKG/Fivesentence/FiveSentenceaddAnswer";
import FourSentenceaddAnswer from "./ClassLKG/foursentence/FourSentenceaddAnswer";
import Map_add from "./Map/Map_add";
import Objective_add from "./ObjectiveType/Objective_add";
import LetterWriting_add from "./LetterWriting.jsx/LetterWriting_add";
import AddGrammerQuestion from "./GrammerQuestion/AddGrammerQuestion";
import SituationAnalysis_add from "./SituationAnalysis/SituationAnalysis_add";
import AddClassification from "./Classification_QandA/AddClassification";
import Add from "./ClassLKG/Onesentence/Add";


const AdminQuestprops = (props) => {
    // console.log("prop",props);
    const { Types_Question,selectedLanguage,selectdetails } = props;
    console.log("hkhhhhhhhhhhhhhhhhhhhhh",Types_Question);

    
    const componentMap = {
        "Objective Questions":<Objective_add data={selectedLanguage} selectdetails={selectdetails}/>,
        "Multiple Choice Questions": <Mcq_add  data={selectedLanguage} selectdetails={selectdetails}/>,
        "Fill in the Blanks Questions":<Fillintheblanks_add data={selectedLanguage} selectdetails={selectdetails}/>,
        "Match the Following Questions":<AddMatches data={selectedLanguage} selectdetails={selectdetails}/>,
        "Recorrect the Answers Questions":<RecorrectionaddAnswer data={selectedLanguage} selectdetails={selectdetails}/>,
        "Odd and out words Questions":<OddandOut_add data={selectedLanguage} selectdetails={selectdetails}/>,
        "Classifications of Questions":<AddClassification data={selectedLanguage} selectdetails={selectdetails}/>,
        "One Sentence Answer Question":<Add data={selectedLanguage} selectdetails={selectdetails}/>,
        "RelationShip Words Questions":<AddRelationshipWord data={selectedLanguage} selectdetails={selectdetails}/>,
        "Grammer Questions":<AddGrammerQuestion data={selectedLanguage} selectdetails={selectdetails}/>,
        "One Word Question":<AddOneWordQuestion data={selectedLanguage} selectdetails={selectdetails}/>,
        "Two  Sentence Answer Questions":<TwoSentenceaddAnswer data={selectedLanguage} selectdetails={selectdetails}/>,
        "Two and three Sentence Answer Questions":<ThreeSentenceaddAnswer data={selectedLanguage} selectdetails={selectdetails}/>,
        "Three and Four Sentence Answer Questions":<FourSentenceaddAnswer data={selectedLanguage} selectdetails={selectdetails}/>,
        "Five Sentence Answer Questions":<FiveSentenceaddAnswer data={selectedLanguage} selectdetails={selectdetails}/>,
        "Five and Six Sentence Answer Questions":<QandA_5to6_addQandA data={selectedLanguage} selectdetails={selectdetails}/>,
        "Six Sentence Answer Questions":<QandA_add6Sentences data={selectedLanguage} selectdetails={selectdetails}/>,
        "Seven Sentence Answer Questions":<QandA_add7Sentences data={selectedLanguage} selectdetails={selectdetails}/>,
        "Eight Sentence Answer Questions":<QandA_add8Sentences data={selectedLanguage} selectdetails={selectdetails}/>,
        "Ten Sentence Answer Questions":<QandA_add10Sentences data={selectedLanguage} selectdetails={selectdetails}/>,
        "Expanding and Explanations Answer Questions":<ExpandExplain_add data={selectedLanguage} selectdetails={selectdetails}/>,
        "Answer the Questions and Draw the Figure Questions":<AddDrawFigure data={selectedLanguage} selectdetails={selectdetails}/>,
        "Graph Questions":<AddGraphQuestion data={selectedLanguage} selectdetails={selectdetails}/>,
        "Complete the Poem":<AddPoem data={selectedLanguage} selectdetails={selectdetails}/>,
        "Situation UnderStatnding answer Questions":<SituationAnalysis_add data={selectedLanguage} selectdetails={selectdetails}/>,
        "Poet,Time, Place, Writer answer questions":<AddPoetTimePlaceAnsQn data={selectedLanguage} selectdetails={selectdetails}/>,
        "Letter Writting":<LetterWriting_add data={selectedLanguage} selectdetails={selectdetails}/>,
        "Map Reading":<Map_add data={selectedLanguage} selectdetails={selectdetails}/>,
    }

    const componentToRender = componentMap[Types_Question]

    return (
        <>
            {componentToRender}
        </>
    )
}
export default AdminQuestprops;

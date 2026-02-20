import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbarr from "./Components/Navbar/Navbar";
import LoginPage3 from "./Components/LoginPage3/LoginPage3";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/LoginPage/Login";
import SignUp from "./Components/LoginPage/Signup";
import ExamBoard from "./Components/ExamBoard/ExamBoard";
import AdminQuestions from "./Components/Admin/AdminQuestions";
import AdminBlueprint from "./Components/Admin/AdminBluprint";
import AdminBlueprintdetails from "./Components/Admin/AdminBluprintdetails";
import AdminQuestionDetails from "./Components/Admin/AdminQuestionDetails";
import Main from "./Components/Admin/Main";
import AccountHistory from "./Components/Admin/AccountHistory";
import AdminQuestionLevel from "./Components/Admin/AdminQuestionLevel";
import AdminWeightage from "./Components/Admin/AdminWeightage";
import AdminSubject from "./Components/Admin/AdminSubject";
import AdminMedium from "./Components/Admin/AdminMedium";
import UserList from "./Components/Admin/UserList";
import Dashboard from "./Components/Admin/Dashboard";
import AdminBoard from "./Components/Admin/AdminBoard";
import AdminClass from "./Components/Admin/AdminClass";
import AdminExam from "./Components/Admin/AdminExam";
import ExamLevel from "./Components/Admin/ExamLevel";
import AdminBlueprintdetailsview from "./Components/Admin/AdminBluprintdetailsview";
import AdminQuestionDetailsview from "./Components/Admin/AdminQuestiondetailsview";
import AdminSignin from "./Components/Admin/Adminlogin";
import BluePrint from "./Components/BluePrint/BluePrint";
import QuestionPaper from "./Components/QuestionPaper/QuestionPaper";
import BluePrint2 from "./Components/BluePrint/BluePrint2";
import Home from "./Components/Home/Home";
import AdminTypeOfQuestions from "./Components/Admin/AdminTypeOfQuestions";
import AdminEditBluePrint from "./Components/Admin/AdminEditBluePrint";
import AdminEditQuestionDetails from "./Components/Admin/AdminEditQuestionDetails";
import AnswerSheet from "./Components/AnswerSheet/AnswerSheet";
import AdminAnswerSheet2 from "./Components/Admin/Adminanswersheet2";
import SyllabusCopy from "./Components/SyllabusCopy/SyllabusCopy";
import Weightagecontent from "./Components/Admin/Weightagecontent";
import AdminChapter from "./Components/Admin/AdminChapter";
import AdminQuestionPaper from "./Components/Admin/Adminquestionpaper";
import AdminSyllabusCopy from "./Components/Admin/AdminSyllabusCopy";
import IndivisualMarks from "./Components/Admin/IndivisualMarks";
import StudentMark from "./Components/Admin/StudentMark";
import AchievementRecord from "./Components/Admin/AchievementRecord";
// import AchievementRecord1 from "./Components/Admin/AchievementRecord1";
import AchievementRecord2 from "./Components/Admin/AchivementRecord2";
import AchievementRecord3 from "./Components/Admin/AchivementRecord3"; 
import StudentFormModal from "../src/Components/Admin/StudentFormModal"
import ResultMaker from "./Components/ResultMaker/ResultMaker";
import Students from "./Components/ResultMaker/Students";
import ViewCreateClasses from "./Components/ResultMaker/ViewCreateClasses";
import AddStudent from "./Components/ResultMaker/AddStudent";
import AdmitCards from "./Components/ResultMaker/AdmitCards";
import ClassSettings from "./Components/ResultMaker/ClassSettings";
import LBA from "./Components/ResultMaker/LBA";
import ManageSchoolProfile from "./Components/ResultMaker/ManageSchoolProfile";
import ExamSettings from "./Components/ResultMaker/ExamSettings";
import ExamSettingsMain from "./Components/ResultMaker/ExamSettingsMain";
import ExamSettingsDetail from "./Components/ResultMaker/ExamSettingsDetail";
import ExamSettingsWeightage from "./Components/ResultMaker/ExamSettingsWeightage";
import ExamSettingsAdditionalSubjects from "./Components/ResultMaker/ExamSettingsAdditionalSubjects";
import ExamSettingsCoScholastic from "./Components/ResultMaker/ExamSettingsCoScholastic";
import AdmitCardSettings from "./Components/ResultMaker/AdmitCardSettings";
import PrintAdmitCards from "./Components/ResultMaker/PrintAdmitCards";
import MarksEntry from "./Components/ResultMaker/MarksEntry";
import MarksEntryNew from "./Components/ResultMaker/MarksEntryNew";
import MarksEntryForm from "./Components/ResultMaker/MarksEntryForm";
import GradingSettings from "./Components/ResultMaker/GradingSettings";
import GenerateResult from "./Components/ResultMaker/GenerateResult";
import GenerateResultNew from "./Components/ResultMaker/GenerateResultNew";
import PrintResult from "./Components/ResultMaker/PrintResult";
import ProtectedRoute from "./Components/ProtectedRoute";
import StudentsTable from "../src/Components/Admin/StudentsTable" 
import AdminNoLineQuestionPaper from "../src/Components/Admin/QuestionPaperDetails/AdminNolineQuestionPaper"    
import NoLineQuestionPaper from "../src/Components/QuestionPaper/NoLineQuestionpaper" 
import ReferralPricingDashboard from '../src/Components/Admin/AdminAddRefferearn'

// ====Five and Six=====
import QandA_5to6_Sentences from "./Components/Admin/FiveAndSixSentences/QandA_5to6_Sentences";
import QandA_5to6_addQandA from "./Components/Admin/FiveAndSixSentences/QandA_5to6_addQandA";
import QandA_5to6_viewQandA from "./Components/Admin/FiveAndSixSentences/QandA_5to6_viewQandA";
import QandA_5to6_editQandA from "./Components/Admin/FiveAndSixSentences/QandA_5to6_editQandA";
// ========Six=========
import QandA_6Sentences from "./Components/Admin/SixSentences/QandA_6Sentences";
import QandA_add6Sentences from "./Components/Admin/SixSentences/QandA_add6Sentences";
import QandA_edit6Sentences from "./Components/Admin/SixSentences/QandA_edit6Sentences";
import QandA_view6Sentences from "./Components/Admin/SixSentences/QandA_view6Sentences";
// =======Seven=========
import QandA_7Sentences from "./Components/Admin/SevenSentences/QandA_7Sentences";
import QandA_view7Sentences from "./Components/Admin/SevenSentences/QandA_view7Sentences";
import QandA_edit7Sentences from "./Components/Admin/SevenSentences/QandA_edit7Sentences";
import QandA_add7Sentences from "./Components/Admin/SevenSentences/QandA_add7Sentences";
// =========Eight=========
import QandA_8Sentences from "./Components/Admin/ClassLKG/EightSentences/QandA_8Sentences";
import QandA_add8Sentences from "./Components/Admin/ClassLKG/EightSentences/QandA_add8Sentences";
import QandA_edit8Sentences from "./Components/Admin/ClassLKG/EightSentences/QandA_edit8Sentences";
import QandA_view8Sentences from "./Components/Admin/ClassLKG/EightSentences/QandA_view8Sentences";
// =======Ten==========
import QandA_10Sentences from "./Components/Admin/TenSentences/QandA_10Sentences";
import QandA_add10Sentences from "./Components/Admin/TenSentences/QandA_add10Sentences";
import QandA_edit10Sentences from "./Components/Admin/TenSentences/QandA_edit10Sentences";
import QandA_view10Sentences from "./Components/Admin/TenSentences/QandA_view10Sentences";
// ==========Expand and explain==========
import ExpandExplain_Details from "./Components/Admin/ExpandAndExplain/ExpandExplain_Details";
import ExpandExplain_add from "./Components/Admin/ExpandAndExplain/ExpandExplain_add";
import ExpandExplain_edit from "./Components/Admin/ExpandAndExplain/ExpandExplain_edit";
import ExpandExplain_view from "./Components/Admin/ExpandAndExplain/ExpandExplain_view";
// ==========Odd and Out=====
import OddAndOut_Details from "./Components/Admin/OaddAndout/OddAndOut_Details";
import OddandOut_add from "./Components/Admin/OaddAndout/OddandOut_add";
import OddAndOut_vieww from "./Components/Admin/OaddAndout/OddAndOut_vieww";
import OddAndOut_edit from "./Components/Admin/OaddAndout/OddAndOut_edit";

import OneSentenceAnswer from "./Components/Admin/OneSentenceAnswer";
import OneSentenceaddAnswer from "./Components/Admin/OneSentenceaddAnswer";
import OneSentenceeditAnswer from "./Components/Admin/ClassLKG/Onesentence/OneSentenceeditAnswer";
import Classlkg from "./Components/Admin/ClassLKG/Onesentence/Classlkg";
import Add from "./Components/Admin/ClassLKG/Onesentence/Add";
import OneSentenceAnswerView from "./Components/Admin/ClassLKG/Onesentence/OneSentenceAnswerView";

import TwoSentenceeditAnswer from "./Components/Admin/ClassLKG/Twosentence/TwoSentenceeditAnswer";
import TwoSentenceAnswer from "./Components/Admin/ClassLKG/Twosentence/TwoSentenceAnswer";

import Mcq_add from "./Components/Admin/MultipleChoiceQuestion.jsx/Mcq_add";
import Mcq_Details from "./Components/Admin/MultipleChoiceQuestion.jsx/Mcq_Details";
import Mcq_edit from "./Components/Admin/MultipleChoiceQuestion.jsx/Mcq_edit";
import Mcq_view from "./Components/Admin/MultipleChoiceQuestion.jsx/Mcq_view";
import Passage_Deatils from "./Components/Admin/Passage/Passage_Deatils";
import TwoSentenceaddAnswer from "./Components/Admin/ClassLKG/Twosentence/TwoSentenceaddAnswer";
import ThreeSentenceaddAnswer from "./Components/Admin/ClassLKG/ThreeSentence/ThreeSentenceaddAnswer";
import ThreeSentenceAnswer from "./Components/Admin/ClassLKG/ThreeSentence/ThreeSentenceAnswer";
import ThreeSentenceeditAnswer from "./Components/Admin/ClassLKG/ThreeSentence/ThreeSentenceeditAnswer";
import ThreeSentenceAnswerview from "./Components/Admin/ClassLKG/ThreeSentence/ThreeSentenceAnswerview";
import FiveSentenceaddAnswer from "./Components/Admin/ClassLKG/Fivesentence/FiveSentenceaddAnswer";
import FiveSentenceAnswerview from "./Components/Admin/ClassLKG/Fivesentence/FiveSentenceAnswerview";
import FiveSentenceEditAnswers from "./Components/Admin/ClassLKG/Fivesentence/FiveSentenceEditAnswers";
import FiveSentenceAnswer from "./Components/Admin/ClassLKG/Fivesentence/FiveSentenceAnswer";
import RelationshipWord from "./Components/Admin/ClassLKG/Relationship/RelationshipWord";
import ReCorrectAnswerview from "./Components/Admin/ClassLKG/Recorrect/ReCorrectAnswerview";
import ReCorrectionAnswer from "./Components/Admin/ClassLKG/Recorrect/ReCorrectionAnswer";
import RecorrectionaddAnswer from "./Components/Admin/ClassLKG/Recorrect/RecorrectionaddAnswer";
import ViewMatch from "./Components/Admin/ClassLKG/Matchthefollowing/ViewMatch";
import AddMatches from "./Components/Admin/ClassLKG/Matchthefollowing/AddMatches";
import MatchtheFollowing from "./Components/Admin/ClassLKG/Matchthefollowing/MatchtheFollowing";
import EditMatch from "./Components/Admin/ClassLKG/Matchthefollowing/EditMatch";
import OneWordQuestion from "./Components/Admin/ClassLKG/Oneword/OneWordQuestion";
import AddOneWordQuestion from "./Components/Admin/ClassLKG/Oneword/AddOneWordQuestion";
import EditOneWordQuestion from "./Components/Admin/ClassLKG/Oneword/EditOneWordQuestion";
import ViewOneWordQuestion from "./Components/Admin/ClassLKG/Oneword/ViewOneWordQuestion";
import FourSentenceaddAnswer from "./Components/Admin/ClassLKG/foursentence/FourSentenceaddAnswer";
import FourSentenceAnswer from "./Components/Admin/ClassLKG/foursentence/FourSentenceAnswer";
import FourSentenceAnswerview from "./Components/Admin/ClassLKG/foursentence/FourSentenceAnswerview";
import FourSentenceeditAnswer from "./Components/Admin/ClassLKG/foursentence/FourSentenceeditAnswer";
import AddRelationshipWord from "./Components/Admin/ClassLKG/Relationship/AddRelationshipWord";
import EditRelationshipWord from "./Components/Admin/ClassLKG/Relationship/EditRelationshipWord";
import ViewRelationshipWord from "./Components/Admin/ClassLKG/Relationship/ViewRelationshipWord";
import ReCorrecteditAnswer from "./Components/Admin/ClassLKG/Recorrect/ReCorrecteditAnswer";

import AddDrawFigure from "./Components/Admin/DrawFigure/AddDrawFigure";
import AddGraphQuestion from "./Components/Admin/GraphQuestion/AddGraphQuestion";
import AddPoem from "./Components/Admin/CompleteThePoem/AddPoem";
import AddUnderstandAnsQN from "./Components/Admin/UnderstandAnsQN/AddUnderstandAnsQN";
import AddPoetTimePlaceAnsQn from "./Components/Admin/PoetTimePlaceAnsQN/AddPoetTimePlaceAnsQn";
import AddGrammerQuestion from "./Components/Admin/GrammerQuestion/AddGrammerQuestion";
import DrawFigureList from "./Components/Admin/DrawFigure/DrawFigureList";
import GraphQuestionList from "./Components/Admin/GraphQuestion/GraphQuestionList";
import PoemList from "./Components/Admin/CompleteThePoem/PoemList";
import UnderstandAnsQnList from "./Components/Admin/UnderstandAnsQN/UnderstandAnsQnList";
import PoetTimePlaceAnsQnList from "./Components/Admin/PoetTimePlaceAnsQN/PoetTimePlaceAnsQnList";
import GrammerQuestionList from "./Components/Admin/GrammerQuestion/GrammerQuestionList";
import EditDrawFigure from "./Components/Admin/DrawFigure/EditDrawFigure";
import ViewDrawFigure from "./Components/Admin/DrawFigure/ViewDrawFigure";
import EditGraphQuestion from "./Components/Admin/GraphQuestion/EditGraphQuestion";
import ViewGraphQuestion from "./Components/Admin/GraphQuestion/ViewGraphQuestion";
import EditPoem from "./Components/Admin/CompleteThePoem/EditPoem";
import ViewPoem from "./Components/Admin/CompleteThePoem/ViewPoem";
import EditUnderstandAnsQN from "./Components/Admin/UnderstandAnsQN/EditUnderstandAnsQN";
import ViewUnderstandAnsQN from "./Components/Admin/UnderstandAnsQN/ViewUnderstandAnsQN";
import EditPoetTimePlaceAnsQn from "./Components/Admin/PoetTimePlaceAnsQN/EditPoetTimePlaceAnsQn";
import ViewPoetTimePlaceAnsQn from "./Components/Admin/PoetTimePlaceAnsQN/ViewPoetTimePlaceAnsQn";
import EditGrammerQuestion from "./Components/Admin/GrammerQuestion/EditGrammerQuestion";
import ViewGrammerQuestion from "./Components/Admin/GrammerQuestion/ViewGrammerQuestion";
import TwoSentenceAnswerView from "./Components/Admin/ClassLKG/Twosentence/TwoSentenceAnswerView";
import Maths_Pattern from "./Components/10th_QP_Pattern/Maths_Pattern";
import Map_Details from "./Components/Admin/Map/Map_Details";
import Map_add from "./Components/Admin/Map/Map_add";
import Map_edit from "./Components/Admin/Map/Map_edit";
import Map_view from "./Components/Admin/Map/Map_view";
import LetterWriting_add from "./Components/Admin/LetterWriting.jsx/LetterWriting_add";
import LetterWriting_edit from "./Components/Admin/LetterWriting.jsx/LetterWriting_edit";
import Passage_add from "./Components/Admin/Passage/Passage_add";
import Passage_edit from "./Components/Admin/Passage/Passage_edit";
import SituationAnalysis_add from "./Components/Admin/SituationAnalysis/SituationAnalysis_add";
import SituationAnalysis_edit from "./Components/Admin/SituationAnalysis/SituationAnalysis_edit";
import Objective_add from "./Components/Admin/ObjectiveType/Objective_add";

import Classification from "./Components/Admin/Classification_QandA/Classification";
import AddClassification from "./Components/Admin/Classification_QandA/AddClassification";
import EditClassification from "./Components/Admin/Classification_QandA/EditClassification";
import ViewClassification from "./Components/Admin/Classification_QandA/ViewClassification";
import English_QP from "./Components/10th_QP_Pattern/English_QP";
import Social_QP from "./Components/10th_QP_Pattern/Social_QP";
import LoginPage5 from "./Components/LoginPage5/LoginPage5";
import Science10th from "./Components/10th_QP_Pattern/Science10th";
import AdminObjectives from "./Components/Admin/AdminObjectives";
import UserGenratedQuestion from "./Components/Admin/UserGenratedQuestion";
import Adminslybuscopyview from "./Components/Admin/Adminslybuscopyview";
import ContactUs from "./Components/Admin/ContactUs";
import QuestionAnalysis from "./Components/BluePrint/QuestionAnalysis";
import QuestionAndAnswerView from "./Components/Home/QuestionAndAnswerView";
import Tutorial from "./Components/Home/Tutorial";
import OfferQuestionPaper from "./Components/Home/OfferQuestionPaper";
import UploadPdfQuestion from "./Components/Admin/UploadPdfQuestion";
import AnswerQuestion from "./Components/QuestionPaper/AnswerQuestion";
import QuestionType from "./Components/Admin/QuestionType";
import QuestionHeader from "./Components/QuestionPaper/QuestionHeader";
import ViewHeader from "./Components/QuestionPaper/ViewHeader";
import BluePrintHeaderAdd from "./Components/Admin/BluePrintHeaderAdd";
import BluePrintHeaderType from "./Components/Admin/BluePrintHeaderType";
import BluePrintHeaderView from "./Components/Admin/BluePrintHeaderView";
import { CoverPage } from "./Components/Admin/CoverPage";
import AdminDifficultyLevel from "./Components/Admin/AdminDifficultyLevel";
import AdminQuestionAnalysisHeader from "./Components/Admin/AdminQuestionAnalysisHeader";
import AdminQuestionAnalysisHeaderAdd from "./Components/Admin/AdminQuestionAnalysisHeaderAdd";
// import AdminQuestionAnalysisHeaderView from "./Components/Admin/AdminQuestionAnalysisHeaderView";
import { AddCover } from "./Components/Admin/AddCover";
// import { UserCoverPage } from "./Components/QuestionPaper/UserCoverPage";
// import AdminQuestionAnalysisHeaderEdit from "./Components/AdminQuestionAnalysisHeaderEdit";
import { UserCoverPage } from "./Components/QuestionPaper/UserCoverPage";
import AdminQuestionAnalysisHeaderView from "./Components/Admin/AdminQuestionAnalysisHeaderView";
import AdminQuestionAnalysisHeaderEdit from "./Components/Admin/AdminQuestionAnalysisHeaderEdit";

import AdminCoverPage from "./Components/Admin/QuestionPaperDetails/AdminCoverPage";
import AdminViewBlueprint from "./Components/Admin/QuestionPaperDetails/AdminViewBlueprint";
import AdminViewQuestionPaper from "./Components/Admin/QuestionPaperDetails/AdminViewQuestionPaper";
import AdminQuestionAnalysis from "./Components/Admin/QuestionPaperDetails/AdminQuestionAnalysis";
import AdminAnswerSheet from "./Components/Admin/QuestionPaperDetails/AdminAnswerSheet";
import Class10thQuestionpaper from "./Components/Admin/QuestionPaperDetails/Class10thQuestionpaper";
import BluePrintHeaderEdit from "./Components/Admin/BluePrintHeaderedit";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsAndConditions from "./Components/TermsAndConditions";
import Footer from "./Components/Footer"; 
import PaymentSuccess from "./Components/PaymentSuccess";  
import TutorialUpload from "./Components/Admin/TutorialUpload";
import SetSubscription from "./Components/Admin/SetSubscription";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes> 
          <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
          <Route
            path="/"
            exact
            element={
              <>
                {/* <Navbarr /> */}
                <Home />
              </>
            }
          />
          <Route
            path="/loginpage3"
            element={
              <>
                <Navbarr />
                <LoginPage3 />
              </>
            }
          />
          <Route
            path="/question_analysis"
            element={
              <>
                <Navbarr />
                <QuestionAnalysis />
              </>
            }
          />
          <Route
            path="/questionandanswerview"
            element={
              <>
                <Navbarr />
                <QuestionAndAnswerView />
              </>
            }
          />
          <Route
            path="/tutorial"
            element={
              <>
                <Navbarr />
                <Tutorial />
                <Footer />
              </>
            }
          />
          <Route
            path="/achievementrecord"
            element={
              <Main
                children={
                  <>
                    <AchievementRecord />
                  </>
                }
              />
            }
          /> 
             <Route
            path="/achievementrecord3"
            element={
              <Main
                children={
                  <>
                    <AchievementRecord3/>
                  </>
                }
              />
            }
          />    
          <Route
            path="/StudentFormModal"
            element={
              <Main
                children={
                  <>
                    <StudentFormModal/>
                  </>
                }
              />
            }
          />   
          <Route
            path="/StudentsTable"
            element={
              <Main
                children={
                  <>
                    <StudentsTable/>
                  </>
                }
              />
            }
          />
        
          <Route
            path="/achievementrecord2"
            element={
              <Main
                children={
                  <>
                    <AchievementRecord2/>
                  </>
                }
              />
            }
          />
          <Route
            path="/offerquestionpaper"
            element={
              <>
                <Navbarr />
                <OfferQuestionPaper />
                <Footer />
              </>
            }
          />

          <Route path="/contactus" element={<ContactUs />} />

          <Route
            path="/profile"
            element={
              <>
                <Navbarr />
                <Profile />
              </>
            }
          />
          <Route
            path="/login"
            exact
            element={
              <>
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            exact
            element={
              <>
                <SignUp />
                <Footer />
              </>
            }
          />
          <Route
            path="/examboard"
            exact
            element={
              <>
                <Navbarr />
                <ExamBoard />
                <Footer />
              </>
            }
          />
          <Route
            path="/loginpage5"
            exact
            element={
              <>
                <Navbarr />
                <LoginPage5 />
              </>
            }
          />
          <Route
            path="/blueprint"
            exact
            element={
              <>
                <Navbarr />
                <BluePrint />
              </>
            }
          />
          <Route
            path="/blueprint2"
            exact
            element={
              <>
                <Navbarr />
                <BluePrint2 />
              </>
            }
          />

          <Route
            path="/questionpaper"
            exact
            element={
              <>
                <Navbarr />

                <QuestionPaper />
              </>
            }
          />
          <Route
            path="/answersheet"
            exact
            element={
              <>
                <Navbarr />
                <AnswerQuestion />
              </>
            }
          />     
          

          <Route
            path="/syllabuscopy"
            exact
            element={
              <>
                <Navbarr />
                <SyllabusCopy />
              </>
            }
          />
          <Route
            path="/privacy-policy"
            exact
            element={
              <>
                <PrivacyPolicy />
              </>
            }
          />
          <Route
            path="/terms-and-conditions"
            exact
            element={
              <>
                <TermsAndConditions />
              </>
            }
          />
          <Route
            path="/resultsheetmaker"
            exact
            element={
              <ProtectedRoute>
                <ResultMaker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manageschoolprofile"
            exact
            element={
              <ProtectedRoute>
                <ManageSchoolProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/students"
            exact
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/view-create-classes"
            exact
            element={
              <ProtectedRoute>
                <ViewCreateClasses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/add-student"
            exact
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/admit-cards"
            exact
            element={
              <ProtectedRoute>
                <AdmitCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/class-settings"
            exact
            element={
              <ProtectedRoute>
                <ClassSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/lba"
            exact
            element={
              <ProtectedRoute>
                <LBA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/exam-settings"
            exact
            element={
              <ProtectedRoute>
                <ExamSettingsMain />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/exam-settings-detail"
            exact
            element={
              <ProtectedRoute>
                <ExamSettingsDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/exam-settings-weightage"
            exact
            element={
              <ProtectedRoute>
                <ExamSettingsWeightage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/exam-settings-additional-subjects"
            exact
            element={
              <ProtectedRoute>
                <ExamSettingsAdditionalSubjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/exam-settings-coscholastic"
            exact
            element={
              <ProtectedRoute>
                <ExamSettingsCoScholastic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/exam-settings-old"
            exact
            element={
              <ProtectedRoute>
                <ExamSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/admit-card-settings"
            exact
            element={
              <ProtectedRoute>
                <AdmitCardSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/print-admit-cards"
            exact
            element={
              <ProtectedRoute>
                <PrintAdmitCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/marks-entry"
            exact
            element={
              <ProtectedRoute>
                <MarksEntryNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/marks-entry-old"
            exact
            element={
              <ProtectedRoute>
                <MarksEntry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/marks-entry-form"
            exact
            element={
              <ProtectedRoute>
                <MarksEntryForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/grading-settings"
            exact
            element={
              <ProtectedRoute>
                <GradingSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/generate-result"
            exact
            element={
              <ProtectedRoute>
                <GenerateResultNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/generate-result-old"
            exact
            element={
              <ProtectedRoute>
                <GenerateResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultsheetmaker/print-result"
            exact
            element={
              <ProtectedRoute>
                <PrintResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/englishqp"
            exact
            element={
              <>
                <Navbarr />
                <English_QP />
              </>
            }
          />

          <Route
            path="/teacher-cover-page"
            exact
            element={
              <>
                <Navbarr />
                <UserCoverPage />
              </>
            }
          />
          <Route
            path="/socialqp"
            exact
            element={
              <>
                <Navbarr />
                <Social_QP />
              </>
            }
          />

          <Route
            path="/science10th"
            exact
            element={
              <>
                <Navbarr />
                <Science10th />
              </>
            }
          />
          <Route
            path="/science10th"
            exact
            element={
              <>
                <Navbarr />
                <Science10th />
              </>
            }
          />
          {/* Admin pannel */}
          <Route
            path="/adminquestion"
            element={<Main children={<AdminQuestions />} />}
          />
          <Route
            path="/adminblueprint"
            element={<Main children={<AdminBlueprint />} />}
          />
          <Route
            path="/admineditblueprint"
            element={<Main children={<AdminEditBluePrint />} />}
          />
          <Route
            path="/adminblueprintdetails"
            element={<Main children={<AdminBlueprintdetails />} />}
          />
          <Route
            path="/adminblueprintheader"
            element={<Main children={<BluePrintHeaderAdd />} />}
          />
          <Route
            path="/adminblueprintheadertype"
            element={<Main children={<BluePrintHeaderType />} />}
          />

          <Route
            path="/Adminanswersheet2"
            element={<Main children={<AdminAnswerSheet2 />} />}
          />

          <Route
            path="/adminstudentmark"
            element={<Main children={<StudentMark />} />}
          />

          <Route
            path="/indivisualmark"
            element={<Main children={<IndivisualMarks />} />}
          />
          <Route
            path="/adminblueprintheaderview"
            element={<Main children={<BluePrintHeaderView />} />}
          />
          <Route
            path="/adminblueprintheaderedit"
            element={<Main children={<BluePrintHeaderEdit />} />}
          />
          <Route
            path="/CoverPage"
            element={<Main children={<CoverPage />} />}
          />
          <Route path="/AddCover" element={<Main children={<AddCover />} />} />

          <Route path="/admincoverpage" element={<AdminCoverPage />} />
          <Route path="/adminviewblueprint" element={<AdminViewBlueprint />} /> 
               <Route path="/AdminNoLineQuestionPaper" element={<AdminNoLineQuestionPaper/>} /> 
                 <Route path="/NoLineQuestionPaper" element={<NoLineQuestionPaper/>} />
          <Route
            path="/adminviewquestionpaper"
            element={<AdminViewQuestionPaper />}
          />
          <Route
            path="/adminquestionanalysis"
            element={<AdminQuestionAnalysis />}
          />
          <Route path="/adminanswersheet" element={<AdminAnswerSheet />} />
          <Route
            path="/class10thquestionpaper"
            element={<Class10thQuestionpaper />}
          />

          <Route
            path="/adminblueprintdetailsview/:blueprint_ID"
            element={<Main children={<AdminBlueprintdetailsview />} />}
          />
          <Route
            path="/adminquestiondetails"
            element={<Main children={<AdminQuestionDetails />} />}
          />
          <Route
            path="/weightageofthecontent"
            element={<Main children={<Weightagecontent/>} />}
          />
          <Route
            path="/adminquestionsanalysisheadertype"
            element={<Main children={<AdminQuestionAnalysisHeader />} />}
          /> 
           <Route
            path="/admintutorial"
            element={<Main children={<TutorialUpload />} />}
          />
          <Route
            path="/adminquestionsanalysisheaderadd"
            element={<Main children={<AdminQuestionAnalysisHeaderAdd />} />}
          />
          <Route
            path="/adminquestionsanalysisheaderview"
            element={<Main children={<AdminQuestionAnalysisHeaderView />} />}
          /> 
          
          <Route
            path="/adminquestionsanalysisheaderedit"
            element={<Main children={<AdminQuestionAnalysisHeaderEdit />} />}
          />
          <Route
            path="/admineditquestiondetails/:question_Id"
            element={<Main children={<AdminEditQuestionDetails />} />}
          />
          <Route
            path="/adminquestiondetailsview/:question_Id"
            element={<Main children={<AdminQuestionDetailsview />} />}
          />
          <Route
            path="/Admin_accounthistory"
            element={<Main children={<AccountHistory />} />}
          />
          <Route
            path="/Adminquestion_paper"
            element={<Main children={<AdminQuestionPaper />} />}
          />
          <Route
            path="/Admin_generated_question"
            element={<Main children={<UserGenratedQuestion />} />}
          /> 
          {/* Admin Panel Starts here */}
          <Route
            path="/admin"
            element={
              <>
                <AdminSignin />
              </>
            }
          />   
          <Route
            path="/dashboard"
            element={
              <Main
                children={
                  <>
                    <Dashboard />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminboard"
            element={
              <Main
                children={
                  <>
                    <AdminBoard />
                  </>
                }
              />
            }
          />    
            <Route
            path="/ReferralPricingDashboard"
            element={
              <Main
                children={
                  <>
                    <ReferralPricingDashboard/>
                  </>
                }
              />
            }
          />
          <Route
            path="/admindifficultylevel"
            element={
              <Main
                children={
                  <>
                    <AdminDifficultyLevel />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminclass"
            element={
              <Main
                children={
                  <>
                    <AdminClass />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminexam"
            element={
              <Main
                children={
                  <>
                    <AdminExam />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminexamlevel"
            element={
              <Main
                children={
                  <>
                    <ExamLevel />
                  </>
                }
              />
            }
          />
          <Route
            path="/admintypesofquestion"
            element={
              <Main
                children={
                  <>
                    <AdminTypeOfQuestions />
                  </>
                }
              />
            }
          />
          <Route
            path="/onesentenceaddanswer"
            element={
              <Main
                children={
                  <>
                    <OneSentenceaddAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/onesentenceeditanswer"
            element={
              <Main
                children={
                  <>
                    <OneSentenceeditAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/onesentenceanswerview"
            element={
              <Main
                children={
                  <>
                    <OneSentenceAnswerView />
                  </>
                }
              />
            }
          />

          <Route
            path="/twosenteceanswer"
            element={
              <Main
                children={
                  <>
                    <TwoSentenceAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/twosentenceaddanswer"
            element={
              <Main
                children={
                  <>
                    <TwoSentenceaddAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/twosentenceeditanswer"
            element={
              <Main
                children={
                  <>
                    <TwoSentenceeditAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/twosentenceanswerview"
            element={
              <Main
                children={
                  <>
                    <TwoSentenceAnswerView />
                  </>
                }
              />
            }
          />
          <Route
            path="/threesentenceanswer"
            element={
              <Main
                children={
                  <>
                    <ThreeSentenceAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/threesentenceaddanswer"
            element={
              <Main
                children={
                  <>
                    <ThreeSentenceaddAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/threesentenceeditanswer"
            element={
              <Main
                children={
                  <>
                    <ThreeSentenceeditAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/threesentenceanswerview"
            element={
              <Main
                children={
                  <>
                    <ThreeSentenceAnswerview />
                  </>
                }
              />
            }
          />
          <Route
            path="/foursentenceanswer"
            element={
              <Main
                children={
                  <>
                    <FourSentenceAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/foursentenceaddanswer"
            element={
              <Main
                children={
                  <>
                    <FourSentenceaddAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/foursentenceeditanswer"
            element={
              <Main
                children={
                  <>
                    <FourSentenceeditAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/foursentenceanswerview"
            element={
              <Main
                children={
                  <>
                    <FourSentenceAnswerview />
                  </>
                }
              />
            }
          />
          <Route
            path="/fivesentenceanswer"
            element={
              <Main
                children={
                  <>
                    <FiveSentenceAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/recorrectanswerview"
            element={
              <Main
                children={
                  <>
                    <ReCorrectAnswerview />
                  </>
                }
              />
            }
          />
          <Route
            path="/fivesentenceeditanswers"
            element={
              <Main
                children={
                  <>
                    {/* <FiveSentenceeditAnswer /> */}
                    <FiveSentenceEditAnswers />
                  </>
                }
              />
            }
          />

          <Route
            path="/fivesentenceanswerview"
            element={
              <Main
                children={
                  <>
                    <FiveSentenceAnswerview />
                  </>
                }
              />
            }
          />
          <Route
            path="/fivesentenceaddanswer"
            element={
              <Main
                children={
                  <>
                    <FiveSentenceaddAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/recorrectionanswer"
            element={
              <Main
                children={
                  <>
                    <ReCorrectionAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/recorrectaddanswer"
            element={
              <Main
                children={
                  <>
                    <RecorrectionaddAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminuserlist"
            element={
              <Main
                children={
                  <>
                    <UserList />
                  </>
                }
              />
            }
          />

          <Route
            path="/adminacchistory"
            element={
              <Main
                children={
                  <>
                    <AccountHistory />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminmedium"
            element={
              <Main
                children={
                  <>
                    <AdminMedium />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminsubject"
            element={
              <Main
                children={
                  <>
                    <AdminSubject />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminchapter"
            element={
              <Main
                children={
                  <>
                    <AdminChapter />
                  </>
                }
              />
            }
          />
          <Route
            path="/recorrecteditanswer"
            element={
              <Main
                children={
                  <>
                    <ReCorrecteditAnswer />
                  </>
                }
              />
            }
          />

          <Route
            path="/matchthefollowing"
            element={
              <Main
                children={
                  <>
                    <MatchtheFollowing />
                  </>
                }
              />
            }
          />
          <Route
            path="/addmatches"
            element={
              <Main
                children={
                  <>
                    <AddMatches />
                  </>
                }
              />
            }
          />
          <Route
            path="/editmatch"
            element={
              <Main
                children={
                  <>
                    <EditMatch />
                  </>
                }
              />
            }
          />
          <Route
            path="/viewmatch"
            element={
              <Main
                children={
                  <>
                    <ViewMatch />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminsyllabuscopy"
            element={
              <Main
                children={
                  <>
                    <AdminSyllabusCopy />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin_upload_pdf"
            element={
              <Main
                children={
                  <>
                    <UploadPdfQuestion />
                  </>
                }
              />
            }
          />

          <Route
            path="/adminslybuscopyview/:Slybus_id"
            element={
              <Main
                children={
                  <>
                    <Adminslybuscopyview />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminweightage"
            element={
              <Main
                children={
                  <>
                    <AdminWeightage />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestions"
            element={
              <Main
                children={
                  <>
                    <AdminQuestions />
                  </>
                }
              />
            }
          />

          <Route
            path="/onesentenceanswer"
            element={
              <Main
                children={
                  <>
                    <OneSentenceAnswer />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestionlevel"
            element={
              <Main
                children={
                  <>
                    <AdminQuestionLevel />
                  </>
                }
              />
            }
          />
          {/* ========Five and six======== */}
          <Route
            path="/adminquestion5to6sentences"
            element={
              <Main
                children={
                  <>
                    <QandA_5to6_Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion5to6sentencesadd"
            element={
              <Main
                children={
                  <>
                    <QandA_5to6_addQandA />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion5to6sentencesview"
            element={
              <Main
                children={
                  <>
                    <QandA_5to6_viewQandA />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion5to6sentencesedit"
            element={
              <Main
                children={
                  <>
                    <QandA_5to6_editQandA />
                  </>
                }
              />
            }
          />
          {/* ========Five and six======== */}
          {/* ========six======== */}
          <Route
            path="/adminquestion6sentences"
            element={
              <Main
                children={
                  <>
                    <QandA_6Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion6sentencesadd"
            element={
              <Main
                children={
                  <>
                    <QandA_add6Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion6sentencesedit"
            element={
              <Main
                children={
                  <>
                    <QandA_edit6Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion6sentencesview"
            element={
              <Main
                children={
                  <>
                    <QandA_view6Sentences />
                  </>
                }
              />
            }
          />
          {/* ========six======== */}
          {/* ========Seven======== */}
          <Route
            path="/adminquestion7sentences"
            element={
              <Main
                children={
                  <>
                    <QandA_7Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion7sentencesadd"
            element={
              <Main
                children={
                  <>
                    <QandA_add7Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion7sentencesedit"
            element={
              <Main
                children={
                  <>
                    <QandA_edit7Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion7sentencesview"
            element={
              <Main
                children={
                  <>
                    <QandA_view7Sentences />
                  </>
                }
              />
            }
          />
          {/* ========Seven======== */}
          {/* ========Eight======== */}
          <Route
            path="/adminquestion8sentences"
            element={
              <Main
                children={
                  <>
                    <QandA_8Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion8sentencesadd"
            element={
              <Main
                children={
                  <>
                    <QandA_add8Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion8sentencesedit"
            element={
              <Main
                children={
                  <>
                    <QandA_edit8Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion8sentencesview"
            element={
              <Main
                children={
                  <>
                    <QandA_view8Sentences />
                  </>
                }
              />
            }
          />
          {/* ========Eight======== */}
          {/* ========Ten======== */}

          <Route
            path="/adminquestion10sentences"
            element={
              <Main
                children={
                  <>
                    <QandA_10Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion10sentencesadd"
            element={
              <Main
                children={
                  <>
                    <QandA_add10Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion10sentencesedit"
            element={
              <Main
                children={
                  <>
                    <QandA_edit10Sentences />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminquestion10sentencesview"
            element={
              <Main
                children={
                  <>
                    <QandA_view10Sentences />
                  </>
                }
              />
            }
          />
          {/* ========Ten======== */}
          {/* ========Expand and Explain======== */}
          <Route
            path="/adminexpandexplain"
            element={
              <Main
                children={
                  <>
                    <ExpandExplain_Details />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminexpandexplainadd"
            element={
              <Main
                children={
                  <>
                    <ExpandExplain_add />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminexpandexplainedit"
            element={
              <Main
                children={
                  <>
                    <ExpandExplain_edit />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminexpandexplainview"
            element={
              <Main
                children={
                  <>
                    <ExpandExplain_view />
                  </>
                }
              />
            }
          />
          {/* ========Expand and Explain======== */}
          {/* ========Odd and Out======== */}
          <Route
            path="/adminoddandout"
            element={
              <Main
                children={
                  <>
                    <OddAndOut_Details />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminoddandoutadd"
            element={
              <Main
                children={
                  <>
                    <OddandOut_add />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminoddandoutview"
            element={
              <Main
                children={
                  <>
                    <OddAndOut_vieww />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminoddandoutedit"
            element={
              <Main
                children={
                  <>
                    <OddAndOut_edit />
                  </>
                }
              />
            }
          />
          {/* Relationship wors  */}

          <Route
            path="/relationshipword"
            element={
              <Main
                children={
                  <>
                    <RelationshipWord />
                  </>
                }
              />
            }
          />
          <Route
            path="/addrelationshipword"
            element={
              <Main
                children={
                  <>
                    <AddRelationshipWord />
                  </>
                }
              />
            }
          />
          <Route
            path="/editrelationshipword"
            element={
              <Main
                children={
                  <>
                    <EditRelationshipWord />
                  </>
                }
              />
            }
          />
          <Route
            path="/viewrelationshipword"
            element={
              <Main
                children={
                  <>
                    <ViewRelationshipWord />
                  </>
                }
              />
            }
          />

          {/* One Word Question  */}
          <Route
            path="/onewordquestion"
            element={
              <Main
                children={
                  <>
                    <OneWordQuestion />
                  </>
                }
              />
            }
          />
          <Route
            path="/questionheader"
            element={
              <Main
                children={
                  <>
                    <QuestionHeader />
                  </>
                }
              />
            }
          />
          <Route
            path="/viewheader"
            element={
              <Main
                children={
                  <>
                    <ViewHeader />
                  </>
                }
              />
            }
          />

          <Route
            path="/addonewordquestion"
            element={
              <Main
                children={
                  <>
                    <AddOneWordQuestion />
                  </>
                }
              />
            }
          />
          <Route
            path="/editonewordquestion"
            element={
              <Main
                children={
                  <>
                    <EditOneWordQuestion />
                  </>
                }
              />
            }
          />
          <Route
            path="/viewonewordquestion"
            element={
              <Main
                children={
                  <>
                    <ViewOneWordQuestion />
                  </>
                }
              />
            }
          />

          {/* ============MCQs=========== */}

          <Route
            path="/adminmcqquestions"
            element={
              <Main
                children={
                  <>
                    <Mcq_Details />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminmcqquestionsadd"
            element={
              <Main
                children={
                  <>
                    <Mcq_add />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminmcqquestionsedit"
            element={
              <Main
                children={
                  <>
                    <Mcq_edit />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminmcqquestionsview"
            element={
              <Main
                children={
                  <>
                    <Mcq_view />
                  </>
                }
              />
            }
          />
          {/* ============MCQs=========== */}
          {/* ============Passage =========== */}
          <Route
            path="/adminpassage"
            element={
              <Main
                children={
                  <>
                    <Passage_Deatils />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminpassageadd"
            element={
              <Main
                children={
                  <>
                    <Passage_add />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminpassageedit"
            element={
              <Main
                children={
                  <>
                    <Passage_edit />
                  </>
                }
              />
            }
          />

          {/* ============Passage =========== */}
          {/* ============Classification Questions and Answer =========== */}
          <Route
            path="/classification"
            element={
              <Main
                children={
                  <>
                    <Classification />
                  </>
                }
              />
            }
          />
          <Route
            path="/addclassification"
            element={
              <Main
                children={
                  <>
                    <AddClassification />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminobjectives"
            element={
              <Main
                children={
                  <>
                    <AdminObjectives />
                  </>
                }
              />
            }
          />
          <Route
            path="/editclassification"
            element={
              <Main
                children={
                  <>
                    <EditClassification />
                  </>
                }
              />
            }
          />
          <Route
            path="/viewclassification"
            element={
              <Main
                children={
                  <>
                    <ViewClassification />
                  </>
                }
              />
            }
          />

          {/* DrawFigure */}
          <Route
            path="/adddrawfigure"
            element={
              <Main
                children={
                  <>
                    <AddDrawFigure />
                  </>
                }
              />
            }
          />

          <Route
            path="/drawfigurelist"
            element={
              <Main
                children={
                  <>
                    <DrawFigureList />
                  </>
                }
              />
            }
          />

          <Route
            path="/editdrawfigure"
            element={
              <Main
                children={
                  <>
                    <EditDrawFigure />
                  </>
                }
              />
            }
          />

          <Route
            path="/viewdrawfigure"
            element={
              <Main
                children={
                  <>
                    <ViewDrawFigure />
                  </>
                }
              />
            }
          />

          {/* GraphQuestion */}

          <Route
            path="/addgraphquestion"
            element={
              <Main
                children={
                  <>
                    <AddGraphQuestion />
                  </>
                }
              />
            }
          />
          <Route
            path="/graphquestionlist"
            element={
              <Main
                children={
                  <>
                    <GraphQuestionList />
                  </>
                }
              />
            }
          />
          <Route
            path="/editgraphquestion"
            element={
              <Main
                children={
                  <>
                    <EditGraphQuestion />
                  </>
                }
              />
            }
          />
          <Route
            path="/viewgraphquestion"
            element={
              <Main
                children={
                  <>
                    <ViewGraphQuestion />
                  </>
                }
              />
            }
          />

          {/* Complete The Poem */}

          <Route
            path="/addpoem"
            element={
              <Main
                children={
                  <>
                    <AddPoem />
                  </>
                }
              />
            }
          />

          <Route
            path="/poemlist"
            element={
              <Main
                children={
                  <>
                    <PoemList />
                  </>
                }
              />
            }
          />
          <Route
            path="/editpoem"
            element={
              <Main
                children={
                  <>
                    <EditPoem />
                  </>
                }
              />
            }
          />
          <Route
            path="/viewpoem"
            element={
              <Main
                children={
                  <>
                    <ViewPoem />
                  </>
                }
              />
            }
          />

          {/* Situation Understand Answers Questions */}

          <Route
            path="/addunderstandansqn"
            element={
              <Main
                children={
                  <>
                    <AddUnderstandAnsQN />
                  </>
                }
              />
            }
          />

          <Route
            path="/understandansqnlist"
            element={
              <Main
                children={
                  <>
                    <UnderstandAnsQnList />
                  </>
                }
              />
            }
          />

          <Route
            path="/editunderstandansqn"
            element={
              <Main
                children={
                  <>
                    <EditUnderstandAnsQN />
                  </>
                }
              />
            }
          />

          <Route
            path="/viewunderstandansqn"
            element={
              <Main
                children={
                  <>
                    <ViewUnderstandAnsQN />
                  </>
                }
              />
            }
          />
          {/* Question TYpe */}

          <Route
            path="/questiontype"
            element={
              <Main
                children={
                  <>
                    <QuestionType />
                  </>
                }
              />
            }
          />
          {/* Poet,Time , Place , Write the answer the question */}

          <Route
            path="/addpoettimeplaceansqn"
            element={
              <Main
                children={
                  <>
                    <AddPoetTimePlaceAnsQn />
                  </>
                }
              />
            }
          />

          <Route
            path="/poettimeplaceansqnlist"
            element={
              <Main
                children={
                  <>
                    <PoetTimePlaceAnsQnList />
                  </>
                }
              />
            }
          />
          <Route
            path="/editpoettimeplaceansqn"
            element={
              <Main
                children={
                  <>
                    <EditPoetTimePlaceAnsQn />
                  </>
                }
              />
            }
          />

          <Route
            path="/viewpoettimeplaceansqn"
            element={
              <Main
                children={
                  <>
                    <ViewPoetTimePlaceAnsQn />
                  </>
                }
              />
            }
          />

          {/* Grammer Question */}

          <Route
            path="/addgrammerquestion"
            element={
              <Main
                children={
                  <>
                    <AddGrammerQuestion />
                  </>
                }
              />
            }
          />

          <Route
            path="/grammerquestionlist"
            element={
              <Main
                children={
                  <>
                    <GrammerQuestionList />
                  </>
                }
              />
            }
          />
          <Route
            path="/editgrammerquestion"
            element={
              <Main
                children={
                  <>
                    <EditGrammerQuestion />
                  </>
                }
              />
            }
          />
          <Route
            path="/viewgrammerquestion"
            element={
              <Main
                children={
                  <>
                    <ViewGrammerQuestion />
                  </>
                }
              />
            }
          />
          {/* Map */}
          <Route
            path="/adminmap"
            element={
              <Main
                children={
                  <>
                    <Map_Details />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminmapadd"
            element={
              <Main
                children={
                  <>
                    <Map_add />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminmapedit"
            element={
              <Main
                children={
                  <>
                    <Map_edit />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminmapview"
            element={
              <Main
                children={
                  <>
                    <Map_view />
                  </>
                }
              />
            }
          />
          {/* Letter Writing */}
          <Route
            path="/adminletteradd"
            element={
              <Main
                children={
                  <>
                    <LetterWriting_add />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminletteredit"
            element={
              <Main
                children={
                  <>
                    <LetterWriting_edit />
                  </>
                }
              />
            }
          />
          {/* Situation Analysis*/}
          <Route
            path="/adminsituationanalysisadd"
            element={
              <Main
                children={
                  <>
                    <SituationAnalysis_add />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminsituationanalysisedit"
            element={
              <Main
                children={
                  <>
                    <SituationAnalysis_edit />
                  </>
                }
              />
            }
          />
          {/* Objective Type of Questions */}
          <Route
            path="/adminobjectiveadd"
            element={
              <Main
                children={
                  <>
                    <Objective_add />
                  </>
                }
              />
            }
          />
          <Route
            path="/adminobjectiveedit"
            element={
              <Main
                children={
                  <>
                    <Objective_add />
                  </>
                }
              />
            }
          />
          {/* ===============10th Question Paper (ENGLISH MEDIUM)=========================== */}
          <Route
            path="/10th_QP_maths"
            element={
              <>
                <Navbarr />
                <Maths_Pattern />
              </>
            }
          />
          <Route
            path="/setsubscription"
            element={
              <Main
                children={
                  <>
                    <SetSubscription />
                  </>
                }
              />
            }
          />
          {/* <Route
            path="/fake"
            element={
              <>
                <Fakedata/>
              </>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Select from "react-select";
import Typography from "@mui/material/Typography";
import "../Admin/Admin.css";
import { Form, Modal, Table } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../Admin/Admin.css";
import { MdPlayArrow } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import swal from "sweetalert";
import { debounce } from "lodash";
import MathEditor from "./MyEditor";
import { FaEdit } from "react-icons/fa";
let googleTransliterate = require("google-input-tool");

const steps = [
  "Blueprint Details",
  "Weightage to the Content",
  "Marks Details",
  "Weightage of the Difficulty Level",
  "Blue Print Generation Chapterwise",
];

function AdminBlueprint() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const [translatedValue, setTranslatedValue] = useState("");
  // const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");
  const onChangeHandler = debounce(async (value, setData) => {
    if (!value) {
      setTranslatedValue("");
      setData("");
      return "";
    }

    let am = value.split(/\s+/); // Split by any whitespace characters
    let arr = [];
    let promises = [];

    for (let index = 0; index < am.length; index++) {
      promises.push(
        new Promise(async (resolve, reject) => {
          try {
            const response = await googleTransliterate(
              new XMLHttpRequest(),
              am[index],
              selectedLanguage
            );
            resolve(response[0][0]);
          } catch (error) {
            console.error("Translation error:", error);
            resolve(am[index]);
          }
        })
      );
    }

    try {
      const translations = await Promise.all(promises);
      setTranslatedValue(translations.join(" "));
      setData(translations.join(" "));
      return translations;
    } catch (error) {
      console.error("Promise.all error:", error);
    }
  }, 300);

  // Array of object 3
  const [Arr3, setArr3] = useState([]);
  const [Arr, setArr] = useState([]);
  const [view, setview] = useState({});
  const [Arr4, setarr4] = useState([]);
  const [Arr5, setArr5] = useState([]);

  const addOuestionType = (data) => {
    if (data) {
      if (!Arr4.some((ele) => ele?.QTyp == data)) {
        setarr4([...Arr4, { QTyp: data }]);
      }
    }
  };
  const deleteQuType = (data) => {
    setarr4(Arr4.filter((ele) => ele?.QTyp !== data));
  };
  const finalsubmit = () => {
    const am = Arr3.map((ele) => {
      if (ele.Objective == view.Objective) {
        return { ...ele, AllQType: Arr4 };
      }
      return ele;
    });
    setArr3(am);
    swal({
      title: "Yeah!",
      text: "Added Successfully...",
      icon: "success",
      button: "OK!",
    });

    handleClose();
    return setarr4([]);
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    // Calculate total questions added
    const totalQuestionsAdded = Arr.reduce(
      (sum, item) => sum + parseInt(item.NQA || 0),
      0
    );

    // Calculate total required questions
    const totalRequiredQuestions = parseInt(NoofQues || 0);

    if (totalQuestionsAdded < totalRequiredQuestions) {
      swal({
        title: "Warning!",
        text: "Number of added questions is less than required. Please add more questions.",
        icon: "warning",
        button: "OK",
      });
      return;
    }

    // if (totalQuestionsAdded > totalRequiredQuestions) {
    //   swal({
    //     title: "Warning!",
    //     text: "Number of added questions exceeds the requirement. Please remove some questions.",
    //     icon: "warning",
    //     button: "OK",
    //   });
    //   return;
    // }

    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const navigate = useNavigate();
  //getmethod for types of questions

  // get method for board
  const [getboardname, setboardname] = useState([]);
  const getallboardname = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllBoard"
      );
      if (res.status == 200) {
        setboardname(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get method for subclass
  const [getaddsubclass, setgetaddsubclass] = useState([]);
  const getaddsubclasss = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8774/api/admin/getAllSubClass"
      );
      if (res.status == 200) {
        setgetaddsubclass(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [Medium, setMedium] = useState([]);
  const [nochangedata, setnochangedata] = useState([]);
  const getAddMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllMedium"
      );
      if (res.status == 200) {
        setMedium(res.data.success);
        setnochangedata(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [getobjectives, setgetobjectives] = useState([]);

  const getObjectives = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8774/api/admin/getobjective`
      );

      if (res.status === 200) {
        setgetobjectives(res.data.success);
      } else {
        // Handle non-200 status codes here if needed
        console.error(`Request failed with status code ${res.status}`);
      }
    } catch (error) {
      console.error("Error fetching objectives:", error);
    }
  };

  useEffect(() => {
    const calculateTotals = () => {
      const totals = {
        remembering: { count: 0, mask: 0 },
        understanding: { count: 0, mask: 0 },
        expression: { count: 0, mask: 0 },
        appreciation: { count: 0, mask: 0 },
      };

      Arr.forEach((question) => {
        const type = question.QAType.toLowerCase();
        const nqa = parseInt(question.NQA) || 0;
        const mask = parseInt(question.Mask) || 0;

        switch (type) {
          case "remembering":
          case "knowledge":
            totals.remembering.count += nqa;
            totals.remembering.mask += nqa * mask;
            break;
          case "understanding":
          case "comprehension":
            totals.understanding.count += nqa;
            totals.understanding.mask += nqa * mask;
            break;
          case "expression":
            totals.expression.count += nqa;
            totals.expression.mask += nqa * mask;
            break;
          case "appreciation":
            totals.appreciation.count += nqa;
            totals.appreciation.mask += nqa * mask;
            break;
        }
      });

      return totals;
    };

    const totals = calculateTotals();

    // Batch state updates
    setNQRemembering(totals.remembering.count);
    setMaskRemembering(totals.remembering.mask);
    setNQUnderstanding(totals.understanding.count);
    setMaskUnderstanding(totals.understanding.mask);
    setNQExpression(totals.expression.count);
    setMaskExpression(totals.expression.mask);
    setNQAppreciation(totals.appreciation.count);
    setMaskAppreciation(totals.appreciation.mask);
  }, [Arr]);
  const [price, setprice] = useState("");
  const [objectiveadd, setobjectiveadd] = useState(false);
  const [blName, setblName] = useState("");
  const [board, setboard] = useState("");
  const [medium, setmedium] = useState("");
  const [className, setclassName] = useState("");
  const [SubClassName, setSubClassName] = useState("");
  const [subjects, setsubjects] = useState("");
  const [Instructions, setInstructions] = useState("");
  const [InstructionsT, setInstructionsT] = useState("");
  const [Remembering, setRemembering] = useState(0);
  const [NQRemembering, setNQRemembering] = useState(0);
  const [MaskRemembering, setMaskRemembering] = useState(0);
  const [Understanding, setUnderstanding] = useState(0);
  const [NQUnderstanding, setNQUnderstanding] = useState(0);
  const [MaskUnderstanding, setMaskUnderstanding] = useState(0);
  const [Expression, setExpression] = useState(0);
  const [NQExpression, setNQExpression] = useState(0);
  const [MaskExpression, setMaskExpression] = useState(0);
  const [Appreciation, setAppreciation] = useState(0);
  const [MaskAppreciation, setMaskAppreciation] = useState(0);
  const [NQAppreciation, setNQAppreciation] = useState(0);
  const [QAType, setQAType] = useState("");
  const [NQA, setNQA] = useState("");
  const [Mask, setMask] = useState("");
  const [DurationOfExam, setDurationOfExam] = useState("");

  const [Easy, setEasy] = useState("");
  const [EasyMask, setEasyMask] = useState("");
  const [EasyParcentage, setEasyParcentage] = useState("");
  const [Average, setAverage] = useState("");
  const [AverageMask, setAverageMask] = useState("");
  const [AverageParcentage, setAverageParcentage] = useState("");
  const [Difficult, setDifficult] = useState("");
  const [DifficultMask, setDifficultMask] = useState("");
  const [DifficultParcentage, setDifficultParcentage] = useState("");
  const [TotalDifficultMask, setTotalDifficultMask] = useState("");
  const [labels, setlabels] = useState("");
  const [Marks, setMarks] = useState("");
  const [totalQuestion, settotalQuestion] = useState(false);
  const [data, setData] = useState([]);
  const [TotalMask, setTotalMask] = useState("");
  const [Objective, setObjective] = useState("");
  const [NoofQues, setNoofQues] = useState("");
  const [objMarks, setobjMarks] = useState("");
  const [Blueprintchapter, setBlueprintchapter] = useState("");
  const [Blueprintobjective, setblueprintobjective] = useState("");
  const [Blueprintnoofquestion, setBlueprintnoofquestion] = useState("");
  const [BluePrintQuestiontype, setBluePrintQuestiontype] = useState("");
  const [BluePrintmarksperquestion, setBluePrintmarksperquestion] =
    useState("");
  // Add for dificulty level


  const handleChangeeasy = (e) => {
    const newValue = parseInt(e.target.value, 10) || 0;
    setEasyMask(newValue);
    setTotalDifficultMask(newValue + AverageMask + DifficultMask);
  };
  const handleChangeaverage = (e) => {
    const newValue = parseInt(e.target.value, 10) || 0;
    setAverageMask(newValue);
    setTotalDifficultMask(EasyMask + newValue + DifficultMask);
  };

  const handleChangedifficult = (e) => {
    const newValue = parseInt(e.target.value, 10) || 0;
    setDifficultMask(newValue);
    setTotalDifficultMask(EasyMask + AverageMask + newValue);
  };
  // Add for map value marks details

  // Array of object 2
  const [Arr1, setArr1] = useState([]);
  const AddWeightageofthecontent = () => {
    try {
      if (!labels) {
        swal({
          title: "Oops!",
          text: "Please Select Label",
          icon: "error",
          button: "Try Again!",
        });
        return;
      }
      if (!Marks) {
        swal({
          title: "Oops!",
          text: "Please Select Label",
          icon: "error",
          button: "Try Again!",
        });
        return;
      }
      let content = 1;
      Arr1.forEach((ele) => {
        if (ele?.label === labels && ele?.Marks === Marks) {
          content = 0;
          swal({
            title: "Oops!",
            text: "Already Exists...",
            icon: "error",
            button: "Try Again!",
          });
        }
      });
      if (content) {
        const obj = {
          label: labels,
          Marks: Marks,
        };
        Arr1.push(obj);
        setArr1([...Arr1]);
        console.log("Arr1", Arr1);
        swal({
          title: "Yeah!",
          text: "Added Successfully...",
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) { }
  };
  const [WeModel, setWeModel] = useState(false);
  const [id, setid] = useState("");
  const editWeightOfContent = () => {
    try {
      let am = Arr1.map((item, i) => {
        if (i == id) {
          return {
            ...item,
            label: labels,
            Marks: Marks,
          };
        }
        return item;
      });
      setArr1(am);
      setWeModel(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deletedWeightageofthecontent = (index) => {
    try {
      const deletedcontent = Arr1[index];
      const updatedArr1 = Arr1.filter((_, i) => i !== index);
      setArr1(updatedArr1);
      console.log("Arr after deletion", updatedArr1);
      swal({
        title: "Deleted!",
        text: " Deleted Successfully.",
        icon: "warning",
        button: "OK!",
      });
    } catch (error) {
      console.error(error);
    }
  };
  // Array of object 1
  const [QAInstruction, setQAInstruction] = useState("");

  const AddTypesofquestion = () => {
    try {
      // Input validation
      const validationChecks = [
        { condition: !QAType, message: "Please Select Question Type" },
        {
          condition: !QAInstruction,
          message: "Please write Question Instruction",
        },
        {
          condition: !NQA || NQA <= 0,
          message: "Please Enter Valid No. of Questions",
        },
        { condition: !Mask || Mask <= 0, message: "Please Enter Valid Marks" },
      ];

      for (const check of validationChecks) {
        if (check.condition) {
          swal({
            title: "Oops!",
            text: check.message,
            icon: "error",
            button: "Try Again!",
          });
          return;
        }
      }

      // Check if question type already exists
      const existingQuestion = Arr.find((ele) => ele.QAType === QAType);
      if (existingQuestion) {
        swal({
          title: "Oops!",
          text: "Question Type Already Exists",
          icon: "error",
          button: "Try Again!",
        });
        return;
      }

      const parsedNQA = parseInt(NQA);
      const parsedMask = parseInt(Mask);

      const obj = {
        QAType: QAType,
        NQA: parsedNQA,
        Mask: parsedMask,
        QAInstruction: QAInstruction,
      };

      setArr((prevArr) => [...prevArr, obj]);

      // Update appreciation counts using functional updates
      setNQAppreciation((prev) => prev + parsedNQA);
      setMaskAppreciation((prev) => prev + parsedMask);
      setNoofQues(parsedNQA);

      swal({
        title: "Yeah!",
        text: "Added Successfully...",
        icon: "success",
        button: "OK!",
      });
    } catch (error) {
      console.error(error);
      swal({
        title: "Error!",
        text: "Failed to add question type",
        icon: "error",
        button: "OK",
      });
    }
  };

  const deleteQuestionType = (index) => {
    try {
      const deletedQuestion = Arr[index];

      // Update appreciation counts before removing the question
      if (deletedQuestion) {
        setNQAppreciation((prev) => prev - parseInt(deletedQuestion.NQA));
        setMaskAppreciation((prev) => prev - parseInt(deletedQuestion.Mask));
      }

      // Create a new array excluding the element at the specified index
      const updatedArr = Arr.filter((_, i) => i !== index);
      setArr(updatedArr);

      swal({
        title: "Deleted!",
        text: "Deleted Successfully.",
        icon: "warning",
        button: "OK!",
      });
    } catch (error) {
      console.error(error);
      swal({
        title: "Error!",
        text: "Failed to delete question type",
        icon: "error",
        button: "OK",
      });
    }
  };

  const Addobjectivess = () => {
    try {
      if (!Objective) {
        swal({
          title: "Oops!",
          text: "Please Select Objective",
          icon: "error",
          button: "Try Again!",
        });
        return;
      }

      if (!NoofQues) {
        swal({
          title: "Oops!",
          text: "Please Enter No. of Questions",
          icon: "error",
          button: "Try Again!",
        });
        return;
      }

      if (!objMarks) {
        swal({
          title: "Oops!",
          text: "Please Enter Objectives Marks",
          icon: "error",
          button: "Try Again!",
        });
        return;
      }

      let objectives = 1;
      Arr3.forEach((ele) => {
        if (ele?.Objective === Objective) {
          objectives = 0;
          swal({
            title: "Oops!",
            text: "Already Exists...",
            icon: "error",
            button: "Try Again!",
          });
        }
      });

      if (objectives) {
        const calculatedTotalQuestion = Number(totalQuestion); // Convert to number
        const obj = {
          Objective: Objective,
          NoofQues: NoofQues,
          Marks: objMarks,
          NoofQuestion: calculatedTotalQuestion, // Use calculated value
        };

        setArr3([...Arr3, obj]);

        swal({
          title: "Yeah!",
          text: "Added Successfully...",
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [EdOb, setEdOb] = useState("");
  const [OBjectiveEd, setObjectiveEd] = useState(false);
  const editObjectiveType = () => {
    try {
      let am = Arr3?.map((item, i) => {
        if (i == EdOb) {
          return {
            ...item,
            Objective: Objective,
            NoofQues: NoofQues,
            Marks: objMarks,
            NoofQuestion: totalQuestion,
          };
        }
        return item;
      });
      setArr3(am);
      setObjectiveEd(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteobjectivess = (index) => {
    try {
      // const deletedQuestion = Arr[index];

      // Create a new array excluding the element at the specified index
      const updatedArr = Arr3.filter((_, i) => i !== index);

      setArr3(updatedArr);
      console.log("Arr after deletion", updatedArr);

      swal({
        title: "Deleted!",
        text: " Deleted Successfully.",
        icon: "warning",
        button: "OK!",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const Addblueprint = () => {
    try {
      if (!Blueprintnoofquestion) {
        swal({
          title: "Oops!",
          text: "Please Enter No. of Questions",
          icon: "error",
          button: "Try Again!",
        });
        return; // Stop further execution if QAType is not provided
      }
      if (!BluePrintQuestiontype) {
        swal({
          title: "Oops!",
          text: "Please Select Question Type",
          icon: "error",
          button: "Try Again!",
        });
        return; // Stop further execution if QAType is not provided
      }
      if (!BluePrintmarksperquestion) {
        swal({
          title: "Oops!",
          text: "Please enter marks per question",
          icon: "error",
          button: "Try Again!",
        });
        return; // Stop further execution if QAType is not provided
      }

      if (!Blueprintchapter) {
        swal({
          title: "Oops!",
          text: "Please Select Chapter",
          icon: "error",
          button: "Try Again!",
        });
        return; // Stop further execution if NQA is not provided
      }

      if (!Blueprintobjective) {
        swal({
          title: "Oops!",
          text: "Please Select Objectives",
          icon: "error",
          button: "Try Again!",
        });
        return; // Stop further execution if Mask is not provided
      }
      let content = 1;
      Arr5.forEach((ele) => {
        if (
          ele?.Blueprintobjective === Blueprintobjective &&
          ele?.Blueprintchapter === Blueprintchapter &&
          ele?.Blueprintnoofquestion == Blueprintnoofquestion &&
          ele?.BluePrintQuestiontype == BluePrintQuestiontype &&
          ele?.BluePrintmarksperquestion == BluePrintmarksperquestion
        ) {
          content = 0;
          swal({
            title: "Oops!",
            text: "Already Exists...",
            icon: "error",
            button: "Try Again!",
          });
        }
      });
      if (content) {
        const obj = {
          Blueprintobjective: Blueprintobjective,
          Blueprintchapter: Blueprintchapter,
          Blueprintnoofquestion: Blueprintnoofquestion,
          BluePrintQuestiontype: BluePrintQuestiontype,
          BluePrintmarksperquestion: BluePrintmarksperquestion,
        };

        setArr5([...Arr5, obj]);
        console.log("Arr5", Arr5);
        swal({
          title: "Yeah!",
          text: "Added Successfully...",
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) { }
  };

  const [ChaBl, setChaBl] = useState(false);

  const blueEdit = () => {
    try {
      let am = Arr5.map((item, i) => {
        if (i == id) {
          return {
            ...item,
            Blueprintobjective: Blueprintobjective,
            Blueprintchapter: Blueprintchapter,
            Blueprintnoofquestion: Blueprintnoofquestion,
            BluePrintQuestiontype: BluePrintQuestiontype,
            BluePrintmarksperquestion: BluePrintmarksperquestion,
          };
        }
        return item;
      });
      setArr5(am);
      setChaBl(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deletedAddblueprint = (index) => {
    try {
      // const deletedcontent = Arr1[index];
      const updatedArr5 = Arr5.filter((_, i) => i !== index);
      setArr5(updatedArr5);
      console.log("Arr after deletion", updatedArr5);
      swal({
        title: "Deleted!",
        text: " Deleted Successfully.",
        icon: "warning",
        button: "OK!",
      });
    } catch (error) {
      console.error(error);
    }
  };
  //get method for chapters
  const [chapters, setchapters] = useState([]);
  // const getChapter = async () => {
  //   try {
  //     let res = await axios.get(
  //       "http://localhost:8774/api/admin/getAllChapter"
  //     );
  //     if (res.status == 200) {
  //       setchapters(res.data.success);
  //       setnochangedata(res.data.success);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getChapter = async (subject, subclass) => {
    try {
      let res = await axios.get(
        `http://localhost:8774/api/admin/getAllChapter`,
        {
          params: {
            subjectName: subject,
            subclassName: subclass
          }
        }
      );
      if (res.status == 200) {
        setchapters(res.data.success);
        setnochangedata(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [chapterOptions1,setChapterOptions1]=useState([])

  // ✅ 1.  Memoise the list once both arrays are available
useEffect(() => {
  // 1  Guard against the props still being undefined / not arrays
  if (!Array.isArray(chapters) || !Array.isArray(Arr1)) {
    setChapterOptions1([]);   // reset state
    return;                   // ← return **nothing**
  }

  // 2  Bail out while either array is still empty
  if (!chapters.length || !Arr1.length) {
    setChapterOptions1([]);
    return;                   // ← again, return **nothing**
  }

  // 3  Normal work
  const allowed = new Set(
    Arr1.map(({ label = "" }) => label.trim().toLowerCase())
  );

  const newData = chapters
    .filter((SubjectPart) =>
      allowed.has(SubjectPart?.SubjectPart.trim().toLowerCase())
    )
    .map(({ chapterName }) => ({
      value: chapterName,
      label: chapterName,
    }));

  setChapterOptions1(newData);

  // 4  If you actually need a cleanup, return a **function** here:
  // return () => { /* cleanup */ };
}, [chapters, Arr1]);






  console.log(chapters, "chaptersss",chapterOptions1)
  const [NameExam, setNameExam] = useState([]);
  const getNameExamination = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllNameExamination"
      );
      if (res.status == 200) {
        setNameExam(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   get method for weightage
  const [ExameName, setExamName] = useState("");
  const [weightage, setweightage] = useState([]);
  const getallweightagecontent = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getallcontent"
      );
      if (res.status === 200) {
        setweightage(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Blueprint = async () => {
    try {

      const config = {
        url: "/admin/registerBLUEPRINT",
        baseURL: "http://localhost:8774/api",
        method: "post",
        headers: { "content-type": "application/json" },
        data: {
          blName: blName,
          board: board,
          medium: medium,
          className: className,
          SubClassName: SubClassName,
          subjects: subjects,
          Instructions: Instructions,
          Remembering: Remembering,
          NQRemembering: NQRemembering,
          MaskRemembering: MaskRemembering,
          Understanding: Understanding,
          NQUnderstanding: NQUnderstanding,
          MaskUnderstanding: MaskUnderstanding,
          Expression: Expression,
          NQExpression: NQExpression,
          MaskExpression: MaskExpression,
          Appreciation: Appreciation,
          MaskAppreciation: MaskAppreciation,
          NQAppreciation: NQAppreciation,
          QAType: QAType,
          NQA: NQA,
          Mask: Mask,
          DurationOfExam: DurationOfExam,
          TotalMask: TotalMask,
          Easy: Easy,
          EasyMask: EasyMask,
          Average: Average,
          AverageMask: AverageMask,
          Difficult: Difficult,
          DifficultMask: DifficultMask,
          TotalDifficultMask: TotalDifficultMask,
          TypesofQuestions: Arr,
          Weightageofthecontent: Arr1,
          objectives: Arr3,
          Objective: Arr3,
          AllChapter: Arr5,
          price: price,
          ExameName: ExameName,
          EasyParcentage: EasyParcentage,
          AverageParcentage: AverageParcentage,
          DifficultParcentage: DifficultParcentage,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          dangerMode: true,
        });
        navigate("/adminblueprintdetails");
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
        dangerMode: true,
      });
    }
  };
  //get method for subject
  const [subject, setsubject] = useState([]);
  const getSubject = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllSujects"
      );
      console.log("ok", res);
      if (res.status == 200) {
        setsubject(res.data.success);
        setnochangedata(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get
  const [QuestionType, setQuestionType] = useState([]);
  const getallQuestiontype = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getquestiontype/" +
        admin?._id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        setQuestionType(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getallboardname();
  //   getaddsubclasss();
  //   getAddMedium();
  //   getNameExamination();
  //   getallweightagecontent();
  //   getSubject();
  //   getObjectives();
  //   getChapter();
  //   getallQuestiontype();
  // }, []);

  useEffect(() => {
    // Initial data loading
    getallboardname();
    getaddsubclasss();
    getAddMedium();
    getNameExamination();
    getallweightagecontent();
    getSubject();
    getObjectives();
    getallQuestiontype();
  }, []);

  // Fetch chapters when subject or subclass changes
  useEffect(() => {
    if (subjects && SubClassName) {
      getChapter(subjects, SubClassName);
    }
  }, [subjects, SubClassName]);

  const [EditType, setEditType] = useState(false);
  const handleShowE = () => setEditType(true);

  const [QAtypeEdit, setQATypeE] = useState("");
  const [QAInstructionE, setQAInstructionE] = useState("");
  const [NQAE, setNQAE] = useState("");
  const [MaskEdit, setMaskE] = useState("");
  const [ed, seted] = useState("");
  const editData = () => {
    try {
      let am = Arr?.map((item, i) => {
        if (i == ed) {
          return {
            ...item,
            QAType: QAtypeEdit,
            QAInstruction: QAInstructionE,
            NQA: NQAE,
            Mask: MaskEdit,
          };
        }
        return item;
      });
      setArr(am);
      setEditType(false);
    } catch (error) {
      console.log(error);
    }
  };
  const chapterOptions = chapters.map((chapter) => ({
    value: chapter.chapterName,
    label: chapter.chapterName,
  }));

  return (
    <>
      <div className="row">
        <div className="col-md-10"></div>
        <div className="col-md-2">
          <label htmlFor="">Select Langauge</label>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="vi_0"
            style={{ borderRadius: "20px", backgroundColor: "#e2cbd0" }}
          >
            <option value="en-t-i0-und">English</option>
            <option value="ne-t-i0-und">Nepali</option>
            <option value="hi-t-i0-und">Hindi</option>
            <option value="kn-t-i0-und">Kannada</option>
            <option value="ta-t-i0-und">Tamil</option>
            <option value="pa-t-i0-und">Punjabi</option>
            <option value="mr-t-i0-und">Marathi</option>
            <option value="ur-t-i0-und">Urdu</option>
            <option value="sa-t-i0-und">Sanskrit</option>
          </select>
        </div>
      </div>
      <div className="box_1">
        <div className="Stepper-info " style={{ padding: "20px" }}>
          <Box sx={{ width: "100%" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography
                    sx={{ mt: 2, mb: 1 }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    All steps completed successfully
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignSelf: "center",
                        pt: 2,
                      }}
                    >
                      <Button
                        variant=""
                        style={{ backgroundColor: "navy", color: "white" }}
                        onClick={Blueprint}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep == 0 ? (
                    <>
                      <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                        <div className="container" style={{ padding: "5px" }}>
                          <div className="row ">
                            <div className="col-md-6">
                              <div className="do-sear mt-2">
                                <label htmlFor="">Blueprint Name</label>
                                <input
                                  type="text"
                                  className="vi_0"
                                  placeholder="Enter BluePrint Name"
                                  onChange={(e) =>
                                    selectedLanguage === "en-t-i0-und"
                                      ? setblName(e.target.value)
                                      : onChangeHandler(
                                        e.target.value,
                                        setblName
                                      )
                                  }
                                />
                                {selectedLanguage === "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{blName}</p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="do-sear mt-2">
                                <label>
                                  Select Medium{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <Form.Select
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    setmedium(e.target.value);
                                  }}
                                >
                                  <option>Select the Medium</option>
                                  {Medium?.map((val, i) => {
                                    return (
                                      <option value={val?.mediumName} key={i}>
                                        {val?.mediumName}
                                      </option>
                                    );
                                  })}
                                </Form.Select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="do-sear mt-2">
                                <label>
                                  Select Board
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <Form.Select
                                  aria-label="Default select example"
                                  className="vi_0"
                                  onChange={(e) => setboard(e.target.value)}
                                >
                                  <option>Select the Board</option>
                                  {getboardname
                                    ?.filter(
                                      (ele) => ele?.mediumName === medium
                                    )
                                    ?.map((val, i) => {
                                      return (
                                        <option value={val?.boardName} key={i}>
                                          {val?.boardName}
                                        </option>
                                      );
                                    })}
                                </Form.Select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="do-sear mt-2">
                                <label>
                                  Select Class{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <Form.Select
                                  // value={className}
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    setclassName(e.target.value);
                                  }}
                                >
                                  <option value="">Select Class</option>
                                  {[
                                    ...new Set(
                                      getaddsubclass?.filter(
                                        (ele) =>
                                          ele?.className === className ||
                                          ele?.mediumName === medium
                                      ) || []
                                    ),
                                  ].map((val, i) => (
                                    <option value={val?.className} key={i}>
                                      {val?.className}
                                    </option>
                                  ))}
                                </Form.Select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="do-sear mt-2">
                                <label>
                                  Select Sub-Class{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <Form.Select
                                  value={SubClassName}
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    setSubClassName(e.target.value);
                                  }}
                                >
                                  <option value={""}>
                                    Select the Sub-Class
                                  </option>
                                  {getaddsubclass
                                    ?.filter(
                                      (ele) => ele.className == className
                                    )
                                    ?.map((val, i) => {
                                      return (
                                        <option
                                          value={val?.subclassName}
                                          key={i}
                                        >
                                          {val?.subclassName}
                                        </option>
                                      );
                                    })}
                                </Form.Select>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="do-sear mt-2">
                                <label>
                                  Select Subjects{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <Form.Select
                                  aria-label="Default select example"
                                  onChange={(e) => setsubjects(e.target.value)}
                                >
                                  <option>Select the Subjects</option>
                                  {subject
                                    ?.filter(
                                      (ele) =>
                                        ele?.subClass?.subclassName ===
                                        SubClassName
                                    )
                                    ?.map((val, i) => (
                                      <option value={val?.subjectName} key={i}>
                                        {val?.subjectName}
                                      </option>
                                    ))}
                                </Form.Select>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="do-sear mt-2">
                                <label>Select Exam Name</label>
                                <Form.Select
                                  aria-label="Default select example"
                                  value={ExameName}
                                  onChange={(e) => setExamName(e.target.value)}
                                >
                                  <option>Select the Exame Name</option>
                                  {NameExam?.filter(
                                    (ele) => ele?.mediumName === medium
                                  )?.map((item, i) => {
                                    return (
                                      <>
                                        <option value={item?.NameExamination}>
                                          {item?.NameExamination}
                                        </option>
                                      </>
                                    );
                                  })}
                                </Form.Select>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-md-4">
                                <label htmlFor="">Objectives</label>
                              </div>

                              <div className="row mt-2">
                                <div className="col-md-3">
                                  <div className="do-sear">
                                    <label htmlFor="">Select Objectives</label>
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="do-sear">
                                    <label htmlFor="">
                                      Percentage of Questions{" "}
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="do-sear">
                                    <label htmlFor="">
                                      Number of Questions{" "}
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="do-sear">
                                    <label htmlFor="">No. of Marks</label>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-3">
                                  <div className="do-sear mt-2">
                                    <Form.Select
                                      aria-label="Default select example"
                                      onChange={(e) => {
                                        setObjective(e.target.value);
                                      }}
                                    >
                                      <option value="">
                                        Selete the Type of Question
                                      </option>
                                      {getobjectives
                                        ?.filter(
                                          (ele) => ele?.mediumName === medium
                                        )
                                        ?.map((val, i) => {
                                          return (
                                            <option value={val?.Objectivesname}>
                                              {val?.Objectivesname}
                                            </option>
                                          );
                                        })}
                                    </Form.Select>
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="do-sear mt-2">
                                    <input
                                      type="number"
                                      name=""
                                      id=""
                                      placeholder="Enter the Percentage"
                                      className="vi_0"
                                      onChange={(e) =>
                                        setNoofQues(e.target.value)
                                      }
                                    // onChange={(e) =>
                                    //   selectedLanguage == "en-t-i0-und"
                                    //     ? setNoofQues(e.target.value)
                                    //     : onChangeHandler(
                                    //         e.target.value,
                                    //         setNoofQues
                                    //       )
                                    // }
                                    />
                                    {/* {selectedLanguage == "en-t-i0-und" ? (
                                      <></>
                                    ) : (
                                      <p>{NoofQues}</p>
                                    )} */}
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="do-sear mt-2">
                                    <input
                                      type="number"
                                      name=""
                                      id=""
                                      placeholder="Enter the Number Of Questions"
                                      className="vi_0"
                                      onChange={(e) =>
                                        settotalQuestion(e.target.value)
                                      }
                                    // onChange={(e) =>
                                    //   selectedLanguage == "en-t-i0-und"
                                    //     ? setobjMarks(e.target.value)
                                    //     : onChangeHandler(
                                    //         e.target.value,
                                    //         setobjMarks
                                    //       )
                                    // }
                                    />
                                    {/* {selectedLanguage == "en-t-i0-und" ? (
                                      <></>
                                    ) : (
                                      <p>{objMarks}</p>
                                    )} */}
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="do-sear mt-2">
                                    <input
                                      type="number"
                                      name=""
                                      id=""
                                      placeholder="Enter the marks"
                                      className="vi_0"
                                      onChange={(e) =>
                                        setobjMarks(e.target.value)
                                      }
                                    // onChange={(e) =>
                                    //   selectedLanguage == "en-t-i0-und"
                                    //     ? setobjMarks(e.target.value)
                                    //     : onChangeHandler(
                                    //         e.target.value,
                                    //         setobjMarks
                                    //       )
                                    // }
                                    />
                                    {/* {selectedLanguage == "en-t-i0-und" ? (
                                      <></>
                                    ) : (
                                      <p>{objMarks}</p>
                                    )} */}
                                  </div>
                                </div>

                                <div className="col-md-3">
                                  <div className="do-sear mt-2">
                                    <Button
                                      style={{
                                        backgroundColor: "red",
                                        color: "white",
                                      }}
                                      onClick={() => {
                                        Addobjectivess();
                                        // setobjectiveadd(true);
                                      }}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-4">
                                <div className="col-md-12">
                                  <Table
                                    responsive
                                    bordered
                                    style={{
                                      width: "-webkit-fill-available",
                                    }}
                                  >
                                    <thead>
                                      <tr>
                                        <th>S No.</th>
                                        <th>Objectives</th>
                                        <th>Percentage of Question</th>
                                        <th>Number of Question</th>
                                        <th>No of Marks </th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {Arr3?.map((item, i) => {
                                        return (
                                          <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item?.Objective}</td>
                                            <td>{item?.NoofQues}%</td>
                                            <td>{item?.NoofQuestion}</td>
                                            <td>{item?.Marks}</td>
                                            <td
                                              style={{
                                                display: "flex",
                                                gap: "5px",
                                              }}
                                            >
                                              <FaEdit
                                                color="blue"
                                                cursor="pointer"
                                                onClick={() => {
                                                  setEdOb(i);
                                                  setObjective(item?.Objective);
                                                  setNoofQues(item?.NoofQues);
                                                  setobjMarks(item?.Marks);
                                                  setNoofQues(
                                                    item?.NoofQuestion
                                                  );
                                                  setObjectiveEd(true);
                                                }}
                                              />
                                              <AiFillDelete
                                                color="red"
                                                cursor="pointer"
                                                onClick={() => {
                                                  deleteobjectivess(i);
                                                }}
                                              />
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </Table>
                                </div>
                              </div>

                            </div>

                            <div className="col-md-12">
                              <div className="do-sear mt-2">
                                <label htmlFor="" className="mb-2">
                                  General Instructions
                                </label>

                                <MathEditor
                                  data={{
                                    A: Instructions,
                                    B: setInstructions,
                                    selectedLanguage: selectedLanguage,
                                    trans: InstructionsT,
                                    settran: setInstructionsT,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Typography>
                    </>
                  ) : (
                    <>
                      {activeStep == 1 ? (
                        <>
                          <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            <div
                              className="container"
                              style={{ padding: "5px" }}
                            >
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="do-sear">
                                    <label htmlFor="">Select Content</label>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="do-sear">
                                    <label htmlFor="">No. of Marks</label>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="do-sear">
                                    <Select
                                      options={weightage
                                        ?.filter(
                                          (ele) =>
                                            subjects === ele?.Subject

                                        )
                                        .map((val) => ({
                                          value: val?.Content,
                                          label: val?.Content,
                                        }))}
                                      placeholder="Select the Type of Content"
                                      onChange={(selectedOption) => {
                                        setlabels(selectedOption.value);
                                      }}
                                      isSearchable={true}
                                      className="basic-single"
                                      classNamePrefix="select"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="do-sear">
                                    <input
                                      type="number"
                                      name=""
                                      id=""
                                      placeholder="Enter the Weightage"
                                      className="vi_0"
                                      onChange={(e) => setMarks(e.target.value)}
                                    //  onChange={(e) =>
                                    //       selectedLanguage == "en-t-i0-und"
                                    //         ? setMarks(e.target.value)
                                    //         : onChangeHandler(
                                    //             e.target.value,
                                    //             setMarks
                                    //           )
                                    //     }
                                    />
                                    {/* {selectedLanguage == "en-t-i0-und" ? (
                                      <></>
                                    ) : (
                                      <p>{Marks}</p>
                                    )} */}
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="do-sear">
                                    <Button
                                      style={{
                                        backgroundColor: "red",
                                        color: "white",
                                      }}
                                      onClick={() => {
                                        AddWeightageofthecontent();
                                      }}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-4">
                                <div className="col-md-12">
                                  <Table
                                    responsive
                                    bordered
                                    style={{
                                      width: "-webkit-fill-available",
                                    }}
                                  >
                                    <thead>
                                      <tr>
                                        <th>S No.</th>
                                        <th>Content</th>
                                        <th>Marks</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {Arr1?.map((item, i) => {
                                        return (
                                          <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item?.label}</td>
                                            <td>{item?.Marks}</td>
                                            <td
                                              style={{
                                                display: "flex",
                                                gap: "5px",
                                              }}
                                            >
                                              <FaEdit
                                                color="blue"
                                                cursor="pointer"
                                                onClick={() => {
                                                  setid(i);
                                                  setlabels(item?.label);
                                                  setMarks(item?.Marks);
                                                  setWeModel(true);
                                                }}
                                              />
                                              <AiFillDelete
                                                color="red"
                                                cursor="pointer"
                                                onClick={() => {
                                                  deletedWeightageofthecontent(
                                                    i
                                                  );
                                                }}
                                              />
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          </Typography>
                        </>
                      ) : (
                        <>
                          {activeStep == 2 ? (
                            <>
                              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                <div
                                  className="container"
                                  style={{ padding: "5px" }}
                                >
                                  <div className="row">
                                    <div className="col-md-3">
                                      <label htmlFor="">
                                        Types of Questions
                                      </label>
                                    </div>
                                    <div className="col-md-4">
                                      <label htmlFor="">
                                        Questions of Instruction
                                      </label>
                                    </div>
                                    <div className="col-md-2">
                                      <label htmlFor="">No. of Questions</label>
                                    </div>
                                    <div className="col-md-2">
                                      <label htmlFor="">
                                        Marks Per Questions
                                      </label>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-md-3 ">
                                      <Form.Select
                                        className="vi_0"
                                        aria-label="Default select example"
                                        onChange={(e) => {
                                          setQAType(e.target.value);
                                        }}
                                      >
                                        <option value="default">
                                          Types of the Question
                                        </option>
                                        {QuestionType?.filter(
                                          (ele) => ele?.QFormatMedium === medium
                                        )?.map((item) => {
                                          return (
                                            <option value={item?.Qformat}>
                                              {item?.translatelang ? (
                                                <>{item?.translatelang}</>
                                              ) : (
                                                <>{item?.Qformat}</>
                                              )}
                                            </option>
                                          );
                                        })}
                                        {/* <option value="Objective Questions">
                                          Objective Questions
                                        </option>
                                        <option value="Multiple Choice Questions">
                                          Multiple Choice Questions
                                        </option>
                                        <option value="Fill in the Blanks Questions">
                                          Fill in the Blanks
                                        </option>
                                        <option value="Match the Following Questions">
                                          Match the Following
                                        </option>
                                        <option value="Recorrect the Answers Questions">
                                          Recorrect the Answers
                                        </option>
                                        <option value="Classifications of Questions">
                                          Classifications of Questions
                                        </option>
                                        <option value="Odd and out words Questions">
                                          Odd and out words Questions
                                        </option>
                                        <option value="RelationShip Words Questions">
                                          RelationShip Words Questions
                                        </option>
                                        <option value="Grammer Questions">
                                          Grammer Questions
                                        </option>
                                        <option value="One Word Question">
                                          One Word Question
                                        </option>
                                        <option value="One Sentence Answer Question">
                                          One Sentence Answer Question
                                        </option>
                                        <option value="Two  Sentence Answer Questions">
                                          Two Sentence Answer Questions
                                        </option>
                                        <option value="Two and three Sentence Answer Questions">
                                          Two and three Sentence Answer
                                          Questions
                                        </option>
                                        <option value="Three and Four Sentence Answer Questions">
                                          Three and Four Sentence Answer
                                          Questions
                                        </option>

                                        <option value="Five and Six Sentence Answer Questions">
                                          Five and Six Sentence Answer Questions
                                        </option>
                                        <option value="Six Sentence Answer Questions">
                                          Six Sentence Answer Questions
                                        </option>
                                        <option value="Seven Sentence Answer Questions">
                                          Seven Sentence Answer Questions
                                        </option>
                                        <option value="Eight Sentence Answer Questions">
                                          Eight Sentence Answer Questions
                                        </option>
                                        <option value="Ten Sentence Answer Questions">
                                          Ten Sentence Answer Questions
                                        </option>
                                        <option value="Expanding and Explanations Answer Questions">
                                          {" "}
                                          Expanding and Explanations Answer
                                          Questions
                                        </option>
                                        <option value="Answer the Questions and Draw the Figure Questions">
                                          Answer the Questions and Draw the
                                          Figure Questions{" "}
                                        </option>
                                        <option value="Graph Questions">
                                          Graph Questions
                                        </option>
                                        <option value="Complete the Poem">
                                          Complete the Poem
                                        </option>
                                        <option value="Situation UnderStatnding answer Questions">
                                          {" "}
                                          Situation UnderStatnding answer
                                          Questions
                                        </option>
                                        <option value="Poet,Time, Place, Writer answer questions">
                                          {" "}
                                          Poet,Time, Place, Writer answer
                                          questions
                                        </option>
                                        <option value="Letter Writting">
                                          Letter Writting
                                        </option>
                                        <option value="Map Reading">
                                          Map Reading
                                        </option> */}
                                      </Form.Select>
                                    </div>
                                    <div className="col-md-4">
                                      <input
                                        type="text"
                                        className="vi_0"
                                        placeholder="Enter the head of question instracustion"
                                        onChange={(e) =>
                                          selectedLanguage == "en-t-i0-und"
                                            ? setQAInstruction(e.target.value)
                                            : onChangeHandler(
                                              e.target.value,
                                              setQAInstruction
                                            )
                                        }
                                      />
                                      {selectedLanguage == "en-t-i0-und" ? (
                                        <></>
                                      ) : (
                                        <p>{QAInstruction}</p>
                                      )}
                                    </div>
                                    <div className="col-md-2">
                                      <input
                                        type="text"
                                        className="vi_0"
                                        placeholder="Enter Total No. of Questions"
                                        onChange={(e) => setNQA(e.target.value)}
                                      // onChange={(e) =>
                                      //   selectedLanguage == "en-t-i0-und"
                                      //     ? setNQA(e.target.value)
                                      //     : onChangeHandler(
                                      //         e.target.value,
                                      //         setNQA
                                      //       )
                                      // }
                                      />
                                      {/* {selectedLanguage == "en-t-i0-und" ? (
                                        <></>
                                      ) : (
                                        <p>{NQA}</p>
                                      )} */}
                                    </div>
                                    <div className="col-md-2">
                                      <input
                                        type="number"
                                        className="vi_0"
                                        placeholder="Enter the mask per question"
                                        onChange={(e) =>
                                          setMask(e.target.value)
                                        }
                                      // onChange={(e) =>
                                      //   selectedLanguage == "en-t-i0-und"
                                      //     ? setMask(e.target.value)
                                      //     : onChangeHandler(
                                      //         e.target.value,
                                      //         setMask
                                      //       )
                                      // }
                                      />
                                      {/* {selectedLanguage == "en-t-i0-und" ? (
                                        <></>
                                      ) : (
                                        <p>{Mask}</p>
                                      )} */}
                                    </div>
                                  </div>
                                  <div style={{ float: "right" }}>
                                    <Button
                                      style={{
                                        backgroundColor: "red",
                                        color: "white",
                                      }}
                                      onClick={AddTypesofquestion}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                  <div className="row mt-4">
                                    <div className="col-md-12">
                                      <Table
                                        responsive
                                        bordered
                                        style={{
                                          width: "-webkit-fill-available",
                                        }}
                                      >
                                        <thead>
                                          <tr>
                                            <th>S No.</th>
                                            <th>Content</th>
                                            <th>Question Instruction</th>
                                            <th>No. of Question</th>
                                            <th>Marks</th>
                                            <th>Action</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {Arr.map((val, i) => {
                                            return (
                                              <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{val?.QAType}</td>
                                                <td>{val?.QAInstruction}</td>
                                                <td>{val?.NQA}</td>
                                                <td>{val?.Mask}</td>
                                                <td style={{ display: "flex" }}>
                                                  <FaEdit
                                                    color="blue"
                                                    cursor="pointer"
                                                    onClick={() => {
                                                      seted(i);
                                                      setQATypeE(val?.QAType);
                                                      setQAInstructionE(
                                                        val?.QAInstruction
                                                      );
                                                      setNQAE(val?.NQA);
                                                      setMaskE(val?.Mask);
                                                      handleShowE();
                                                    }}
                                                  />{" "}
                                                  <AiFillDelete
                                                    color="red"
                                                    cursor="pointer"
                                                    onClick={() =>
                                                      deleteQuestionType(i)
                                                    }
                                                  />
                                                </td>
                                              </tr>
                                            );
                                          })}
                                        </tbody>
                                      </Table>
                                    </div>
                                  </div>

                                  {/* <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4 mt-2">
                                      <span style={{ float: "right" }}>
                                        <label htmlFor="">Total Marks</label>
                                      </span>
                                    </div>
                                    <div className="col-md-4">
                                      <input
                                        type="text"
                                        placeholder="Total Marks"
                                        className="vi_0"
                                        onChange={(e) => {
                                          setTotalMask(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div> */}
                                  <div className="row">
                                    <div className="col-md-4">
                                      <label htmlFor="">Duration of Exam</label>
                                      <input
                                        type="text"
                                        className="vi_0"
                                        // value={DurationOfExam}
                                        placeholder="Enter Duration of Exam"
                                        onChange={(e) =>
                                          selectedLanguage == "en-t-i0-und"
                                            ? setDurationOfExam(e.target.value)
                                            : onChangeHandler(
                                              e.target.value,
                                              setDurationOfExam
                                            )
                                        }
                                      />
                                      {selectedLanguage == "en-t-i0-und" ? (
                                        <></>
                                      ) : (
                                        <p>{DurationOfExam}</p>
                                      )}
                                    </div>
                                    <div className="col-md-4">
                                      <label htmlFor="">Total Question</label>
                                      <input
                                        type="text"
                                        value={Arr?.reduce(
                                          (a, i) => a + Number(i?.NQA),
                                          0
                                        )}
                                        className="vi_0"
                                        placeholder="Total Marks"
                                      // onChange={(e)=>{setTotalMask(e.target.value)}}
                                      />
                                    </div>
                                    <div className="col-md-4">
                                      <label htmlFor="">Total Marks</label>
                                      <input
                                        type="text"
                                        value={Arr?.reduce(
                                          (a, i) =>
                                            a + Number(i?.Mask * i?.NQA),
                                          0
                                        )}
                                        className="vi_0"
                                        placeholder="Total Marks"
                                        onChange={(e) => {
                                          setTotalMask(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Typography>
                            </>
                          ) : (
                            <>
                              {activeStep == 3 ? (
                                <>
                                  <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                    <div
                                      className="container"
                                      style={{ padding: "5px" }}
                                    >
                                      <div className="row mt-3">
                                        <div className="col-md-3">
                                          <label htmlFor="">
                                            Dificulty Level
                                          </label>
                                          <p className="fs-5 mt-2">
                                            <MdPlayArrow
                                              style={{ marginRight: "15px" }}
                                            />
                                            Easy
                                          </p>
                                        </div>
                                        <div className="col-md-3">
                                          <label htmlFor="">
                                            No. of Questions
                                          </label>
                                          <input
                                            type="text"
                                            className="vi_0 mt-2"
                                            // value={Easy}
                                            placeholder="Enter No. of Questions"
                                            onChange={(e) =>
                                              setEasy(e.target.value)
                                            }
                                          // onChange={(e) =>
                                          //   selectedLanguage == "en-t-i0-und"
                                          //     ? setEasy(e.target.value)
                                          //     : onChangeHandler(
                                          //         e.target.value,
                                          //         setEasy
                                          //       )
                                          // }
                                          />
                                          {/* {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{Easy}</p>
                                          )} */}
                                        </div>
                                        <div className="col-md-3">
                                          <label htmlFor="">Marks</label>
                                          <input
                                            type="number"
                                            className="vi_0 mt-2"
                                            placeholder="Enter the Marks"
                                            onChange={handleChangeeasy}
                                          // onChange={(e) =>
                                          //   selectedLanguage == "en-t-i0-und"
                                          //     ? handleChangeeasy(e)
                                          //     : onChangeHandler(
                                          //         e.target.value,
                                          //         handleChangeeasy
                                          //       )
                                          // }
                                          />
                                          {/* {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{EasyMask}</p>
                                          )} */}
                                        </div>
                                        <div className="col-md-3">
                                          <label htmlFor="">Parcentage</label>
                                          <input
                                            type="number"
                                            className="vi_0 mt-2"
                                            placeholder="Enter the Parcentage"
                                            onChange={(e) =>
                                              setEasyParcentage(e.target.value)
                                            }
                                          // onChange={(e) =>
                                          //   selectedLanguage == "en-t-i0-und"
                                          //     ? handleChangeeasy(e)
                                          //     : onChangeHandler(
                                          //         e.target.value,
                                          //         handleChangeeasy
                                          //       )
                                          // }
                                          />
                                          {/* {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{EasyMask}</p>
                                          )} */}
                                        </div>
                                        <div className="col-md-3 mt-2">
                                          <p className="fs-5">
                                            <MdPlayArrow
                                              style={{ marginRight: "15px" }}
                                            />
                                            Average
                                          </p>
                                        </div>
                                        <div className="col-md-3">
                                          <input
                                            type="text"
                                            className="vi_0"
                                            // value={Average}
                                            placeholder="Enter No. of Questions"
                                            onChange={(e) =>
                                              setAverage(e.target.value)
                                            }
                                          // onChange={(e) =>
                                          //   selectedLanguage == "en-t-i0-und"
                                          //     ?setAverage(e.target.value)
                                          //     : onChangeHandler(
                                          //         e.target.value,
                                          //         setAverage
                                          //       )
                                          // }
                                          />
                                          {/* {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{Average}</p>
                                          )} */}
                                        </div>
                                        <div className="col-md-3">
                                          <input
                                            type="number"
                                            className="vi_0"
                                            // value={AverageMask}
                                            placeholder="Enter the Marks"
                                            onChange={handleChangeaverage}
                                          // onChange={(e) =>
                                          //   selectedLanguage == "en-t-i0-und"
                                          //     ?handleChangeaverage(e)
                                          //     : onChangeHandler(
                                          //         e.target.value,
                                          //         handleChangeaverage
                                          //       )
                                          // }
                                          />
                                          {/* {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{AverageMask}</p>
                                          )} */}
                                        </div>
                                        <div className="col-md-3">
                                          <input
                                            type="number"
                                            className="vi_0"
                                            // value={AverageMask}
                                            placeholder="Enter the Parcentage"
                                            onChange={(e) =>
                                              setAverageParcentage(
                                                e.target.value
                                              )
                                            }
                                          // onChange={(e) =>
                                          //   selectedLanguage == "en-t-i0-und"
                                          //     ?handleChangeaverage(e)
                                          //     : onChangeHandler(
                                          //         e.target.value,
                                          //         handleChangeaverage
                                          //       )
                                          // }
                                          />
                                          {/* {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{AverageMask}</p>
                                          )} */}
                                        </div>
                                        <div className="col-md-3 mt-2">
                                          <p className="fs-5">
                                            <MdPlayArrow
                                              style={{ marginRight: "15px" }}
                                            />
                                            Difficult
                                          </p>
                                        </div>
                                        <div className="col-md-3">
                                          <input
                                            type="text"
                                            className="vi_0"
                                            // value={Difficult}
                                            placeholder="Enter No. of Questions"
                                            onChange={(e) =>
                                              setDifficult(e.target.value)
                                            }
                                          // onChange={(e) =>
                                          //   selectedLanguage == "en-t-i0-und"
                                          //     ?  setDifficult(e.target.value)
                                          //     : onChangeHandler(
                                          //         e.target.value,
                                          //         setDifficult
                                          //       )
                                          // }
                                          />
                                          {/* {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{Difficult}</p>
                                          )} */}
                                        </div>
                                        <div className="col-md-3">
                                          <input
                                            type="number"
                                            className="vi_0"
                                            // value={DifficultMask}
                                            placeholder="Enter the Marks"
                                            onChange={handleChangedifficult}
                                          // onChange={(e) =>
                                          //   selectedLanguage == "en-t-i0-und"
                                          //     ?  handleChangedifficult(e)
                                          //     : onChangeHandler(
                                          //         e.target.value,
                                          //         handleChangedifficult
                                          //       )
                                          // }
                                          />
                                          {/* {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{DifficultMask}</p>
                                          )} */}
                                        </div>
                                        <div className="col-md-3">
                                          <input
                                            type="number"
                                            className="vi_0"
                                            // value={DifficultMask}
                                            placeholder="Enter the Parcentage"
                                            onChange={(e) =>
                                              setDifficultParcentage(
                                                e.target.value
                                              )
                                            }
                                          // onChange={(e) =>
                                          //   selectedLanguage == "en-t-i0-und"
                                          //     ?  handleChangedifficult(e)
                                          //     : onChangeHandler(
                                          //         e.target.value,
                                          //         handleChangedifficult
                                          //       )
                                          // }
                                          />
                                          {/* {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{DifficultMask}</p>
                                          )} */}
                                        </div>
                                        <div className="col-md-4"></div>
                                        <div className="col-md-4 mt-2">
                                          <label
                                            htmlFor=""
                                            style={{ float: "right" }}
                                          >
                                            Total Marks
                                          </label>
                                        </div>
                                        <div className="col-md-4">
                                          <input
                                            type="number"
                                            className="vi_0"
                                            placeholder="Total Marks"
                                            value={TotalDifficultMask}
                                            onClick={(e) => {
                                              setTotalDifficultMask(
                                                e.target.value
                                              );
                                            }}
                                            readOnly
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </Typography>
                                </>
                              ) : (
                                <>
                                  <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                    <div
                                      className="container"
                                      style={{ padding: "5px" }}
                                    >
                                      <div className="row">

                                      </div>
                                      <div className="row">
                                        <div className="col-md-4">
                                          <label htmlFor="">
                                            Select Chapters
                                          </label>
                                          <Select
                                            options={chapterOptions1}              // ✅ always an array – never undefined
                                            placeholder="Select the Chapter"
                                            onChange={(opt) => setBlueprintchapter(opt.value)}
                                            isSearchable
                                            className="basic-single"
                                            classNamePrefix="select"
                                          />
                                        </div>
                                        <div className="col-md-4">
                                          <label htmlFor="">Objectives</label>
                                          <Form.Select
                                            aria-label="Default select example"
                                            onChange={(e) => {
                                              if (e.target.value) {
                                                let am = JSON.parse(
                                                  e.target.value
                                                );
                                                setblueprintobjective(
                                                  am?.Objective
                                                );
                                                setview(am);
                                              }
                                            }}
                                          >
                                            <option value="">
                                              Selete Objectives
                                            </option>
                                            {Arr3?.map((item, i) => {
                                              return (
                                                <option
                                                  value={JSON.stringify(item)}
                                                  key={i}
                                                >
                                                  {item?.Objective}
                                                </option>
                                              );
                                            })}
                                          </Form.Select>
                                        </div>
                                        <div className="col-md-4">
                                          <label htmlFor="">
                                            Question Type
                                          </label>
                                          <Form.Select
                                            aria-label="Default select example"
                                            onChange={(e) => {
                                              setBluePrintQuestiontype(
                                                e.target.value
                                              );
                                            }}
                                          >
                                            <option value="">
                                              Select Question Types
                                            </option>
                                            <option value="O T">
                                              O.T (Objective Choice)
                                            </option>
                                            <option value="V.S.A">
                                              V.S.A (Very Short Answer)
                                            </option>
                                            <option value="S.A">
                                              S.A (Short Answer)
                                            </option>
                                            <option value="L.A 1">
                                              L.A (Long Answer 1)
                                            </option>
                                            <option value="L.A 2">
                                              L.A (Long Answer 2)
                                            </option>
                                            <option value="L.A 3">
                                              L.A (Long Answer 3)
                                            </option>
                                            {/* {view?.AllQType?.map((ele) => (
                                              <option value={ele?.QTyp}>
                                                {ele?.QTyp}
                                              </option>
                                            ))} */}
                                          </Form.Select>
                                        </div>
                                        <div className="col-md-4">
                                          <label htmlFor="">
                                            No. of Questions
                                          </label>

                                          <input
                                            type="number"
                                            className="vi_0"
                                            onChange={(e) => {
                                              setBlueprintnoofquestion(
                                                e.target.value
                                              );
                                            }}
                                            placeholder="Enter No.of Questions"

                                          />

                                        </div>
                                        <div className="col-md-4">
                                          <label htmlFor="">
                                            Marks Per Question
                                          </label>

                                          <input
                                            type="number"
                                            className="vi_0"
                                            onChange={(e) => {
                                              setBluePrintmarksperquestion(
                                                e.target.value
                                              );
                                            }}
                                            placeholder="Marks Per Question"

                                          />

                                        </div>
                                        <div className="col-md-4">
                                          <button
                                            className="btn btn-danger mt-4"
                                            style={{ float: "right" }}
                                            onClick={Addblueprint}
                                          >
                                            Add
                                          </button>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="do-sear mt-2">
                                            <Table
                                              responsive
                                              bordered
                                              style={{
                                                width: "-webkit-fill-available",
                                              }}
                                            >
                                              <thead>
                                                <tr>
                                                  <th>S No.</th>
                                                  <th>Chapters</th>
                                                  <th>Objectives</th>
                                                  <th>Question Type</th>
                                                  <th> No. of Questions</th>
                                                  <th>Marks Per Question</th>
                                                  <th>Action</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {Arr5?.map((val, i) => {
                                                  return (
                                                    <tr key={i}>
                                                      <td>{i + 1}</td>
                                                      <td>
                                                        {val?.Blueprintchapter}
                                                      </td>
                                                      <td>
                                                        {
                                                          val?.Blueprintobjective
                                                        }
                                                      </td>
                                                      <td>
                                                        {
                                                          val?.BluePrintQuestiontype
                                                        }
                                                      </td>
                                                      <td>
                                                        {
                                                          val?.Blueprintnoofquestion
                                                        }
                                                      </td>
                                                      <td>
                                                        {
                                                          val?.BluePrintmarksperquestion
                                                        }
                                                      </td>
                                                      <td
                                                        style={{
                                                          display: "flex",
                                                          gap: "5px",
                                                        }}
                                                      >
                                                        <FaEdit
                                                          color="blue"
                                                          cursor="pointer"
                                                          onClick={() => {
                                                            setid(i);
                                                            setBlueprintchapter(
                                                              val?.Blueprintchapter
                                                            );
                                                            setblueprintobjective(
                                                              val?.Blueprintobjective
                                                            );
                                                            setBluePrintQuestiontype(
                                                              val?.BluePrintQuestiontype
                                                            );
                                                            setBlueprintnoofquestion(
                                                              val?.Blueprintnoofquestion
                                                            );
                                                            setBluePrintmarksperquestion(
                                                              val?.BluePrintmarksperquestion
                                                            );
                                                            setChaBl(true);
                                                          }}
                                                        />{" "}
                                                        <AiFillDelete
                                                          color="red"
                                                          cursor="pointer"
                                                          onClick={() => {
                                                            deletedAddblueprint(
                                                              i
                                                            );
                                                          }}
                                                        />
                                                      </td>
                                                    </tr>
                                                  );
                                                })}
                                                <tr>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td>
                                                    {" "}
                                                    Total Question:-{" "}
                                                    {Arr5?.reduce(
                                                      (a, ele) =>
                                                        a +
                                                        Number(
                                                          ele?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}
                                                  </td>
                                                  <td>
                                                    Total Marks:-{" "}
                                                    {Arr5?.reduce(
                                                      (a, ele) =>
                                                        a +
                                                        Number(
                                                          ele?.BluePrintmarksperquestion *
                                                          ele?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}
                                                  </td>
                                                  <td></td>
                                                </tr>
                                              </tbody>
                                            </Table>
                                          </div>
                                        </div>
                                        <div className="row mt-4">
                                          <div className="col-md-6">
                                            <Table responsive bordered>
                                              <thead>
                                                <tr>
                                                  <th>Question Type</th>
                                                  <th>No. of Questions</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {Arr.reduce((acc, curr) => {
                                                  const existing = acc.find(
                                                    (item) =>
                                                      item.type === curr.QAType
                                                  );
                                                  if (existing) {
                                                    existing.count += parseInt(
                                                      curr.NQA
                                                    );
                                                  } else {
                                                    acc.push({
                                                      type: curr.QAType,
                                                      count: parseInt(curr.NQA),
                                                    });
                                                  }
                                                  return acc;
                                                }, []).map((item, i) => (
                                                  <tr key={i}>
                                                    <td>{item.type}</td>
                                                    <td>{item.count}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </Table>
                                          </div>
                                          <div className="col-md-6">
                                            <Table responsive bordered>
                                              <thead>
                                                <tr>
                                                  <th>Objective</th>
                                                  <th>Required Questions</th>
                                                  <th>Added Questions</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {Arr3.map((obj, i) => {
                                                  const addedQuestions =
                                                    Arr5.reduce(
                                                      (sum, curr) =>
                                                        curr.Blueprintobjective ===
                                                          obj.Objective
                                                          ? sum +
                                                          parseInt(
                                                            curr.Blueprintnoofquestion
                                                          )
                                                          : sum,
                                                      0
                                                    );
                                                  return (
                                                    <tr key={i}>
                                                      <td>{obj.Objective}</td>
                                                      <td>
                                                        {obj.NoofQuestion}
                                                      </td>
                                                      <td>{addedQuestions}</td>
                                                    </tr>
                                                  );
                                                })}
                                              </tbody>
                                            </Table>
                                          </div>
                                        </div>

                                        <div className="col-md-4">
                                          <label htmlFor="">Total Price</label>
                                          <input
                                            type="number"
                                            className="vi_0"
                                            onChange={(e) => {
                                              setprice(e.target.value);
                                            }}
                                            placeholder="total price blue print with quetion paper"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </Typography>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      className="modal-add-btn"
                      variant=""
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      style={{ borderRadius: "5px" }}
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                    >
                      Next
                    </Button>
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button
                          varient=""
                          onClick={handleComplete}
                          style={{ backgroundColor: "navy" }}
                        >
                          {completedSteps() === totalSteps() - 1
                            ? "Submit"
                            : "Complete Step"}
                        </Button>
                      ))}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
          <Modal.Title style={{ color: "white" }}>
            Add Question Type{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="">Objective</label>
                <p className="vi_0">{view?.Objective}</p>
              </div>
              <div className="col-md-4">
                <label htmlFor="">Question Type</label>

                <div>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => addOuestionType(e.target.value)}
                  >
                    <option value="">Select Question Types</option>
                    <option value="O T">O T (Objective Type)</option>
                    <option value="V.S.A">V.S.A (Very Short Answer)</option>
                    <option value="S.A">S.A (Short Answer)</option>
                    <option value="L.A 1">L.A (Long Answer 1)</option>
                    <option value="L.A 2">L.A (Long Answer 2)</option>
                    <option value="L.A 3">L.A (Long Answer 3)</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            {Arr4.length ? (
              <div className="row">
                <div className="col-md-12">
                  <Table>
                    <thead>
                      <tr>
                        <th>S No.</th>
                        <th>Question Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Arr4?.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item?.QTyp}</td>
                            <td>
                              <AiFillDelete
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() => deleteQuType(item.QTyp)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <button
                    className="btn btn-danger"
                    style={{ float: "right" }}
                    onClick={finalsubmit}
                  >
                    Sumbit
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </Modal.Body>
      </Modal>


      <Modal show={EditType} onHide={() => setEditType(false)} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
          <Modal.Title style={{ color: "white" }}>
            Edit Question Type{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Form.Select
                className="vi_0"
                value={QAtypeEdit}
                aria-label="Default select example"
                onChange={(e) => {
                  setQATypeE(e.target.value);
                }}
              >
                <option value="default">Types of the Question</option>
                <option value="Objective Questions">Objective Questions</option>
                <option value="Multiple Choice Questions">
                  Multiple Choice Questions
                </option>
                <option value="Fill in the Blanks Questions">
                  Fill in the Blanks
                </option>
                <option value="Match the Following Questions">
                  Match the Following
                </option>
                <option value="Recorrect the Answers Questions">
                  Recorrect the Answers
                </option>
                <option value="Classifications of Questions">
                  Classifications of Questions
                </option>
                <option value="Odd and out words Questions">
                  Odd and out words Questions
                </option>
                <option value="RelationShip Words Questions">
                  RelationShip Words Questions
                </option>
                <option value="Grammer Questions">Grammer Questions</option>
                <option value="One Word Question">One Word Question</option>
                <option value="One Sentence Answer Question">
                  One Sentence Answer Question
                </option>
                <option value="Two  Sentence Answer Questions">
                  Two Sentence Answer Questions
                </option>
                <option value="Two and three Sentence Answer Questions">
                  Two and three Sentence Answer Questions
                </option>
                <option value="Three and Four Sentence Answer Questions">
                  Three and Four Sentence Answer Questions
                </option>

                <option value="Five and Six Sentence Answer Questions">
                  Five and Six Sentence Answer Questions
                </option>
                <option value="Six Sentence Answer Questions">
                  Six Sentence Answer Questions
                </option>
                <option value="Seven Sentence Answer Questions">
                  Seven Sentence Answer Questions
                </option>
                <option value="Eight Sentence Answer Questions">
                  Eight Sentence Answer Questions
                </option>
                <option value="Ten Sentence Answer Questions">
                  Ten Sentence Answer Questions
                </option>
                <option value="Expanding and Explanations Answer Questions">
                  {" "}
                  Expanding and Explanations Answer Questions
                </option>
                <option value="Answer the Questions and Draw the Figure Questions">
                  Answer the Questions and Draw the Figure Questions{" "}
                </option>
                <option value="Graph Questions">Graph Questions</option>
                <option value="Complete the Poem">Complete the Poem</option>
                <option value="Situation UnderStatnding answer Questions">
                  {" "}
                  Situation UnderStatnding answer Questions
                </option>
                <option value="Poet,Time, Place, Writer answer questions">
                  {" "}
                  Poet,Time, Place, Writer answer questions
                </option>
                <option value="Letter Writting">Letter Writting</option>
                <option value="Map Reading">Map Reading</option>
              </Form.Select>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="vi_0"
                placeholder="Enter the head of question instracustion"
                onChange={(e) =>
                  selectedLanguage == "en-t-i0-und"
                    ? setQAInstructionE(e.target.value)
                    : onChangeHandler(e.target.value, setQAInstructionE)
                }
              />
              {selectedLanguage == "en-t-i0-und" ? (
                <></>
              ) : (
                <p>{QAInstructionE}</p>
              )}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="vi_0"
                value={NQAE}
                placeholder="Enter Total No. of Questions"
                onChange={(e) => setNQAE(e.target.value)}

              />

            </div>
            <div className="col-md-6">
              <input
                type="number"
                value={MaskEdit}
                className="vi_0"
                placeholder="Enter the mask per question"
                onChange={(e) => setMaskE(e.target.value)}

              />

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            style={{
              backgroundColor: "green",
              color: "white",
            }}
            onClick={editData}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit The data of question Objective type */}

      <Modal show={OBjectiveEd} onHide={() => setObjectiveEd(false)} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
          <Modal.Title style={{ color: "white" }}>
            Edit Question Type{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row mt-3">
            <div className="col-md-4">
              <label htmlFor="">Objectives</label>
            </div>

            <div className="row mt-2">
              <div className="col-md-3">
                <div className="do-sear">
                  <label htmlFor="">Select Objectives</label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="do-sear">
                  <label htmlFor="">Percentage of Questions </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="do-sear">
                  <label htmlFor="">Number of Questions </label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="do-sear">
                  <label htmlFor="">No. of Marks</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="do-sear mt-2">
                  <Form.Select
                    aria-label="Default select example"
                    value={Objective}
                    onChange={(e) => {
                      setObjective(e.target.value);
                    }}
                  >
                    <option value="">Selete the Type of Question</option>
                    {getobjectives.map((val, i) => {
                      return (
                        <option value={val?.Objectivesname}>
                          {val?.Objectivesname}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="do-sear mt-2">
                  <input
                    type="number"
                    name=""
                    id=""
                    value={NoofQues}
                    placeholder="Enter the Percentage"
                    className="vi_0"
                    onChange={(e) => setNoofQues(e.target.value)}

                  />

                </div>
              </div>
              <div className="col-md-3">
                <div className="do-sear mt-2">
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter the Number Of Questions"
                    className="vi_0"
                    value={totalQuestion}
                    onChange={(e) => settotalQuestion(e.target.value)}

                  />

                </div>
              </div>
              <div className="col-md-3">
                <div className="do-sear mt-2">
                  <input
                    type="number"
                    name=""
                    id=""
                    value={objMarks}
                    placeholder="Enter the marks"
                    className="vi_0"
                    onChange={(e) => setobjMarks(e.target.value)}

                  />

                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            style={{
              backgroundColor: "green",
              color: "white",
            }}
            onClick={editObjectiveType}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit The data of question content */}

      <Modal show={WeModel} onHide={() => setWeModel(false)} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
          <Modal.Title style={{ color: "white" }}>
            Edit Question Type{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-md-4">
              <div className="do-sear">
                <Form.Select
                  aria-label="Default select example"
                  value={labels}
                  onChange={(e) => {
                    setlabels(e.target.value);
                  }}
                >
                  <option value="">Selete the Type of Question</option>
                  {weightage
                    ?.filter((ele) => subjects == ele?.Subject)
                    .map((val, i) => {
                      return (
                        <option value={val?.Content}>{val?.Content}</option>
                      );
                    })}
                </Form.Select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="do-sear">
                <input
                  type="number"
                  name=""
                  id=""
                  value={Marks}
                  placeholder="Enter the Weightage"
                  className="vi_0"
                  onChange={(e) => setMarks(e.target.value)}

                />

              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            style={{
              backgroundColor: "green",
              color: "white",
            }}
            onClick={editWeightOfContent}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={ChaBl} onHide={() => setChaBl(false)} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
          <Modal.Title style={{ color: "white" }}>
            Edit chapter and marks{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="">Select Chapters</label>
              <Form.Select
                value={Blueprintchapter}
                aria-label="Default select example"
                onChange={(e) => {
                  setBlueprintchapter(e.target.value);
                }}
              >
                <option value="">Selete the Chapter</option>
                {chapters?.map((val, i) => {
                  return (
                    <option value={val?.chapterName}>{val?.chapterName}</option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-4">
              <label htmlFor="">Objectives</label>
              <Form.Select
                aria-label="Default select example"
                // value={Blueprintobjective}
                onChange={(e) => {
                  if (e.target.value) {
                    let am = JSON.parse(e.target.value);
                    setblueprintobjective(am?.Objective);
                    setview(am);
                  }
                }}
              >
                <option value="">Selete Objectives</option>
                {Arr3?.map((item, i) => {
                  return (
                    <option value={JSON.stringify(item)} key={i}>
                      {item?.Objective}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-4">
              <label htmlFor="">Question Type</label>
              <Form.Select
                value={BluePrintQuestiontype}
                aria-label="Default select example"
                onChange={(e) => {
                  setBluePrintQuestiontype(e.target.value);
                }}
              >
                <option value="">Select Question Types</option>
                <option value="O T">O T (Objective Type)</option>
                <option value="V.S.A">V.S.A (Very Short Answer)</option>
                <option value="S.A">S.A (Short Answer)</option>
                <option value="L.A 1">L.A (Long Answer 1)</option>
                <option value="L.A 2">L.A (Long Answer 2)</option>
                <option value="L.A 3">L.A (Long Answer 3)</option>

              </Form.Select>
            </div>
            <div className="col-md-4">
              <label htmlFor="">No. of Questions</label>

              <input
                type="number"
                className="vi_0"
                value={Blueprintnoofquestion}
                onChange={(e) => {
                  setBlueprintnoofquestion(e.target.value);
                }}
                placeholder="Enter No.of Questions"

              />

            </div>
            <div className="col-md-4">
              <label htmlFor="">Marks Per Question</label>

              <input
                type="number"
                className="vi_0"
                value={BluePrintmarksperquestion}
                onChange={(e) => {
                  setBluePrintmarksperquestion(e.target.value);
                }}
                placeholder="Marks Per Question"

              />

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            style={{
              backgroundColor: "green",
              color: "white",
            }}
            onClick={blueEdit}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminBlueprint;

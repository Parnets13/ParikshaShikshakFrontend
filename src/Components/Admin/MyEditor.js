import React, { useState, useRef } from "react";
import "katex/dist/katex.min.css";

import JoditEditor from "jodit-react";
import { debounce } from "lodash";
import { InlineMath } from "react-katex";
import MathInput from "react-math-keyboard";
import parse from "html-react-parser";
let googleTransliterate = require("google-input-tool");

const MathEditor = ({ data }) => {
  //   const [editorContent, setEditorContent] = useState("");
  const joditEditor = useRef(null);
  const recognition = useRef(null);
  const [isListening, setIsListening] = useState(false);
  //   const [trans, settran] = useState("");

  const handleInsertSymbol = (symbol) => {
    // Get the current content of the editor
    const editorContent = joditEditor.current.value;

    // Check if the current content ends with a closing p tag
    const endsWithClosingPTag = /<\/p>\s*$/.test(editorContent);

    // If it ends with a closing p tag, add the symbol inside the last p tag
    // Otherwise, wrap the symbol in a new p tag
    const updatedContent = endsWithClosingPTag
      ? editorContent.replace(/<\/p>\s*$/, `${symbol}</p>`) // Add symbol inside last p tag
      : `${editorContent}<p>${symbol}</p>`; // Wrap symbol in a new p tag

    // Set the updated content in the editor
    data?.B(updatedContent);
  };

  const [translatedValue, setTranslatedValue] = useState("");
  //  const [wihouttran,setwithoutTrans]=
  const onChangeHandler = debounce(async (value, setData) => {
    if (!value) {
      setTranslatedValue("");
      setData("");

      return "";
    } else {
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
                data?.selectedLanguage
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
    }
  }, 300); // Debounce delay in milliseconds

  const mathSymbols = ["α", "β", "γ", "√", "∫", "π", "Σ", "‰", "⊕", "↔"]; // Add more symbols as needed

  const startListening = () => {
    if (!isListening) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const transcript = event.results[i][0].transcript;
            interimTranscript += transcript;
          }
        }
        let am = (prevContent) => prevContent + interimTranscript;

        data?.selectedLanguage == "en-t-i0-und"
          ? data?.B((prevContent) => prevContent + interimTranscript)
          : data.settran((prevContent) => prevContent + interimTranscript);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (isListening && recognition.current) {
      recognition.current.stop();
    }
  };

  const [isMath, setisMath] = useState(false);

  const handlechangeMath = (value) => {
    data.B(value);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {mathSymbols.map((symbol) => (
            <button key={symbol} onClick={() => handleInsertSymbol(symbol)}>
              {symbol}
            </button>
          ))}
        </div>
        <div>
          {/* <button onClick={startListening}>Start Voice Input</button>
          <button onClick={stopListening}>Stop Voice Input</button>
        */}
        </div>
        <div>
          <button
            onClick={() => {
              if (isMath == true) {
                data.B("");
              }
              setisMath(!isMath);
            }}
          >
            Math Editor
          </button>
          {data.selectedLanguage == "en-t-i0-und" ? (
            <></>
          ) : (
            <button onClick={() => onChangeHandler(data?.trans, data.B)}>
              Translate
            </button>
          )}
        </div>
      </div>
      {data.selectedLanguage == "en-t-i0-und" ? (
        <></>
      ) : (
        <textarea
          name=""
          id=""
          className="vi_0"
          value={data?.trans}
          placeholder="Please complete your sentance then click on the translate button"
          onChange={(event) => data?.settran(event.target.value)}
        ></textarea>
      )}
      {isMath == true ? (
        <div>
          <MathInput  className="vi_0" setValue={handlechangeMath} />
          <p>
            <InlineMath>{data?.A}</InlineMath></p>
        </div>
      ) : (
        <JoditEditor
          ref={joditEditor}
          value={data.A}
          className="vi_0"
          config={{
            readonly: false,
            onBlur: (newContent) => data.B(newContent),
          }}
          onBlur={(newContent) => data.B(newContent)}
          tabIndex={1}
        />
      )}
    </div>
  );
};

export default MathEditor;

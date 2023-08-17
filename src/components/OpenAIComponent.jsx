import React, { useState } from "react";
import OpenAI from "openai-api";
import "./OpenAIComponent.css";
import Tooltip from "./Tooltip";
import TooltipSet from "./TooltipSet";

const OpenAIComponent = () => {
  const [popup, setPopup] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyInputValue, setApiKeyInputValue] = useState("");
  const [openaiAPIKeyIsValidated, setOpenaiAPIKeyIsValidated] = useState(false);
  const [maxTokens, setMaxTokens] = useState(200);
  const [temperature, setTemperature] = useState(0);
  const [chatOrCode, setChatOrCode] = useState(true);
  const [languageIndex, setLanguageIndex] = useState(0);
  const [showInitialGreeting, setShowInitialGreeting] = useState(true);

  let openai;

  if (openaiAPIKeyIsValidated) {
    openai = new OpenAI(apiKeyInputValue);
  }

  const languages = [
    "Deutsch",
    "Englisch",
    "Französisch",
    "Spanisch",
    "Italienisch",
    "Türkisch",
    "Polnisch",
    "Koreanisch",
    "Arabisch",
    "Japanisch",
    "Russisch",
    "Chenesisch",
  ];

  const pleaseAnswer = [
    " bitte antworte auf deutsch.",
    " please answer in english. ",
    " merci de répondre en français. ",
    " por favor responde en español. ",
    " per favore rispondi in italiano. ",
    " lütfen türkçe cevaplayın. ",
    " proszę o odpowiedź po polsku ",
    " 한국어로 대답해주세요 ",
    " ارجو الاجابة بالعربية. ",
    " 日本語で答えてください。 ",
    " Пожалуйста, ответьте по-русски. ",
    " 請用中文回答。 ",
  ];

  const settings = [
    "bitte sag mir ob die Syntax richtig ist und was der Code tut. Falls es fehler im Code gibt, erkläre bitte was falsch ist und wie man es richtig macht. Gib bitte keine Codebeispiele erkläre es mit Worten.",
    "please tell me if the syntax is correct and what the code does. If there are errors in the code, please explain what is wrong and how to do it right. Please don't give code examples explain it with words.",
    "s'il vous plaît dites-moi si la syntaxe est correcte et ce que fait le code. S'il y a des erreurs dans le code, veuillez expliquer ce qui ne va pas et comment le faire correctement. S'il vous plaît, ne donnez pas d'exemples de code, expliquez-le avec des mots.",
    "por favor dígame si la sintaxis es correcta y qué hace el código. Si hay errores en el código, explique qué está mal y cómo hacerlo bien. Por favor, no dé ejemplos de código, explíquelo con palabras.",
    "per favore dimmi se la sintassi è corretta e cosa fa il codice. Se ci sono errori nel codice, spiega cosa c'è che non va e come farlo correttamente. Si prega di non fornire esempi di codice spiegarlo con le parole.",
    "lütfen bana sözdiziminin doğru olup olmadığını ve kodun ne yaptığını söyleyin. Kodda hatalar varsa, lütfen neyin yanlış olduğunu ve nasıl doğru yapılacağını açıklayın. Lütfen kod örnekleri vermeyin, kelimelerle açıklayın.",
    "proszę powiedz mi, czy składnia jest poprawna i co robi kod. Jeśli w kodzie są błędy, wyjaśnij, co jest nie tak i jak to zrobić dobrze. Proszę nie podawać przykładów kodu, wyjaśnij to słowami.",
    "구문이 올바른지, 코드가 무엇을 하는지 알려주십시오. 코드에 오류가 있는 경우 무엇이 잘못되었고 올바르게 수행하는 방법을 설명하십시오. 말로 설명하는 코드 예제를 제공하지 마십시오.",
    "من فضلك قل لي ما إذا كانت البنية صحيحة وماذا تفعل الكود. إذا كانت هناك أخطاء في الكود ، فيرجى توضيح الخطأ وكيفية القيام بذلك بشكل صحيح. من فضلك لا تعطي أمثلة على الكود اشرحها بالكلمات.",
    "構文が正しいかどうか、コードが何をするか教えてください。 コードにエラーがある場合は、何が間違っているのか、それを正しく行う方法を説明してください。 コード例を言葉で説明しないでください。",
    "скажите, пожалуйста, правильный ли синтаксис и что делает код. Если в коде есть ошибки, объясните пожалуйста, что не так и как это сделать правильно. Пожалуйста, не давайте примеры кода, объясняйте это словами.",
    "請告訴我語法是否正確以及代碼的作用。 如果代碼中有錯誤，請說明錯在哪里以及如何正確處理。 請不要給出代碼示例用文字解釋它。",
  ];

  const handlePopup = (event) => {
    setPopup(!popup);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleApiKeyInputChange = (event) => {
    setApiKeyInputValue(event.target.value);
  };

  const handleSubmitApiKeyForm = async (event) => {
    event.preventDefault();
    const trimmedApiKey = apiKeyInputValue.trim();
    setApiKeyInputValue(trimmedApiKey);

    if (trimmedApiKey) {
      openai = new OpenAI(trimmedApiKey);
      const response = await openai.complete({
        engine: "text-davinci-003",
        prompt: "Hallo",
        maxTokens: 1,
      });

      if (!response.data.choices[0].text.toLowerCase().includes("error")) {
        setOpenaiAPIKeyIsValidated(true);
        localStorage.setItem("openaiAPIKey", trimmedApiKey);
      }
    }
  };

  const handleMaxTokensChange = (event) => {
    event.preventDefault();
    setMaxTokens(Number(event.target.value));
  };

  const handleTemperatureChange = (event) => {
    event.preventDefault();
    setTemperature(Number(event.target.value));
  };

  const handleChatOrCodeChange = (event) => {
    event.preventDefault();
    setChatOrCode(!chatOrCode);
    setQuestion("");
    setAnswer("");
    setMessages([]);
    setShowInitialGreeting(false);
  };

  const handleLanguage = () => {
    setLanguageIndex((languageIndex + 1) % languages.length);
  };

  const handleSubmitChatForm = async (event) => {
    event.preventDefault();
    if (!openaiAPIKeyIsValidated) return;
    let newQuestion = question;
    if (chatOrCode) {
      newQuestion += `${pleaseAnswer[languageIndex]}`;
    }
    if (!chatOrCode) {
      newQuestion += ` ${settings[languageIndex]} ${pleaseAnswer[languageIndex]}.`;
    }

    const displayQuestion = question.replace(
      `${pleaseAnswer[languageIndex]}`,
      ""
    );

    const newMessages = [
      ...messages,
      { text: displayQuestion, type: "question" },
    ];
    setMessages(newMessages);
    setQuestion("");
    setIsLoading(true);

    const response = await openai.complete({
      engine: "text-davinci-003",
      prompt: newQuestion,
      maxTokens: maxTokens,
      temperature: temperature,
    });

    setIsLoading(false);
    setAnswer(response.data.choices[0].text);
    setMessages([
      ...newMessages,
      { text: response.data.choices[0].text, type: "answer" },
    ]);
  };

  if (popup) {
    if (!openaiAPIKeyIsValidated) {
      return (
        <div className="container">
          <div className="container-header">
            <button type="button" className="exit-button" onClick={handlePopup}>
              X
            </button>
            <button
              type="button"
              className="language-button"
              onClick={handleLanguage}
            >
              {languages[languageIndex]}
            </button>
            <img
              src="sticker/zipper mouth.png"
              alt="Example Image"
              className="image"
            />
            Prof.Dr.GPT
          </div>
          <div className="container-image">
            <img
              src="sticker/equation meme.png"
              alt="Example Image"
              className="bg-image"
            />
          </div>
          <form className="form" onSubmit={handleSubmitApiKeyForm}>
            <TooltipSet
              maxTokens={maxTokens}
              handleMaxTokensChange={handleMaxTokensChange}
              temperature={temperature}
              handleTemperatureChange={handleTemperatureChange}
              chatOrCode={chatOrCode}
              handleChatOrCodeChange={handleChatOrCodeChange}
            >
              <Tooltip>
                <input
                  className="input"
                  type="text"
                  placeholder="Bitte API-Schlüssel eingeben..."
                  value={apiKeyInputValue}
                  onChange={handleApiKeyInputChange}
                />
              </Tooltip>
            </TooltipSet>
            <button className="submit" type="submit">
              Absenden
            </button>
          </form>
        </div>
      );
    }
    if (chatOrCode) {
      return (
        <div className="container">
          <div className="container-header">
            <button type="button" className="exit-button" onClick={handlePopup}>
              X
            </button>
            <button
              type="button"
              className="language-button"
              onClick={handleLanguage}
            >
              {languages[languageIndex]}
            </button>
            <img
              src={isLoading ? "sticker/hmmm.png" : "sticker/sticker.png"}
              alt="Example Image"
              className="image"
            />
            <button
              className={chatOrCode ? "chat" : "code"}
              onClick={handleChatOrCodeChange}
            >
              {chatOrCode ? "Frage/Antwortmodus" : "Codeüberprüfung"}
            </button>
            Prof.Dr.GPT
          </div>
          <div className="container-chat">
            {showInitialGreeting && (
              <div className="answer">
                Hallo mein Name ist Professor Dr.GPT, aber meine Freunde nennen
                mich Prof. Wie kann ich dir helfen?
              </div>
            )}
            {messages.map((message) => (
              <div
                className={message.type === "question" ? "question" : "answer"}
              >
                {message.text}
              </div>
            ))}
            {isLoading && <div className="loading"></div>}
          </div>
          <form className="form" onSubmit={handleSubmitChatForm}>
            <input
              className="input"
              type="text"
              placeholder="Bitte gebe deine Frage ein..."
              value={question}
              onChange={handleQuestionChange}
            />
            <button className="submit" type="submit">
              Absenden
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="container-header">
          <button type="button" className="exit-button" onClick={handlePopup}>
            X
          </button>
          <button
            type="button"
            className="language-button"
            onClick={handleLanguage}
          >
            {languages[languageIndex]}
          </button>
          <img
            src={isLoading ? "sticker/hmmm.png" : "sticker/sticker.png"}
            alt="Example Image"
            className="image"
          />
          <button
            className={chatOrCode ? "chat" : "code"}
            onClick={handleChatOrCodeChange}
          >
            {chatOrCode ? "Frage/Antwortmodus" : "Codeüberprüfung"}
          </button>
          Prof.Dr.GPT
        </div>
        <div className="answerCode">{answer}</div>
        <form className="formCode" onSubmit={handleSubmitChatForm}>
          <textarea
            className="inputCode"
            placeholder="Bitte füge deinen Code ein, damit ich ihn prüfen kann..."
            value={question}
            onChange={handleQuestionChange}
          />
          <button className="submitCode" type="submit">
            Absenden
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="popup" onClick={handlePopup}>
      <img
        src="sticker/hallo.png"
        alt="Example Image"
        className="image-popup"
      />
    </div>
  );
};

export default OpenAIComponent;

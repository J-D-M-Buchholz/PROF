import React from 'react';
import './Tooltip.css';

const TooltipSet = ({ maxTokens, handleMaxTokensChange, temperature, handleTemperatureChange, chatOrCode, handleChatOrCodeChange, children }) => {

  return (
    <div className="tooltip">
      {children}
      <div className="tooltiptext2">
        <button className={chatOrCode?"chat":"code"} onClick={handleChatOrCodeChange}>{chatOrCode?"Wechsel zur Codeüberprüfung":"Wechsel zum Frage/Antwortmodus"}</button>
        <br/>
        <label htmlFor="max-tokens">
          <strong>Antwortlänge</strong>
          <br/>
          Kurz-Lang
        </label>
        <br/>
        <input
          id="max-tokens"
          type="range"
          min="200"
          max="2000"
          step="100"
          value={maxTokens}
          onChange={handleMaxTokensChange}
        />
        <br/>
        <label htmlFor="temperature">
          <strong>Kreativität</strong>
          <br/>
          Genau-Kreativ
        </label>
        <br/>
        <input
          id="temperature"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={temperature}
          onChange={handleTemperatureChange}
        />
      </div>
    </div>
  );
};

export default TooltipSet;
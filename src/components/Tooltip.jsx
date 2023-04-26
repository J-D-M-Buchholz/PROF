import React from 'react';
import './Tooltip.css';

const Tooltip = ({ children }) => {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltiptext">Bitte melden Sie sich auf <a href="https://platform.openai.com" target="_blank">Platform.OpenAI</a> an um Ihren persönlichen API-Schlüssel zu erhalten.</span>
    </div>
  );
};

export default Tooltip;
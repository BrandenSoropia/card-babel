import Markdown from "markdown-to-jsx";
import { FABCard } from "@/lib/firebase/documents.types";
import strings from "./strings.json";
import React from "react";

const Card = ({ name, cardNumber, details, translationInfo }: FABCard) => {
  return (
    <div>
      <p>{`${name} - ${cardNumber}`}</p>
      <h3>{strings.card.translationHeader.english}</h3>
      <Markdown>{details["en-US"]}</Markdown>
      <h3>{strings.card.translationHeader.japanese}</h3>
      <Markdown>{details["jp-JA"]}</Markdown>
    </div>
  );
};

export default Card;

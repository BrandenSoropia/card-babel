import React, { useState } from "react";
import strings from "./strings.json";
import {
  getAllFabCardData,
  getCardSearchResults,
} from "@/lib/firebase/queries";
import { FABCard } from "@/lib/firebase/documents.types";
import Card from "./Card";

const CardSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([] as FABCard[]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchText(e.currentTarget.value);
  };

  const clearSearchText = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSearchText("");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const results = await getCardSearchResults(searchText);
    setSearchResults(results);
  };

  return (
    <div>
      <section>
        <form>
          <button onClick={getAllFabCardData}>
            {strings.getAllFABCardsButtonCTA}
          </button>
          <label htmlFor="cardSearchText">{strings.searchCardInputLabel}</label>
          <input
            type="text"
            id="cardSearchText"
            name="cardSearchText"
            onChange={handleChange}
            maxLength={128}
            placeholder="DYN122"
            value={searchText}
          />
          <button onClick={clearSearchText}>Clear</button>
          <button onClick={handleSubmit}>Search</button>
        </form>
      </section>
      {searchResults.length > 0 && (
        <div>
          <h2>{strings.searchResultsHeader}</h2>
          {searchResults.map((card) => (
            <Card key={card.cardNumber[0]} {...card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardSearch;

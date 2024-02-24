import React, { useState, useContext } from "react";
import strings from "../strings.json";
import {
  getAllFabCardData,
  getCardSearchResults,
} from "@/lib/firebase/queries";
import { FABCard } from "@/lib/firebase/documents.types";
import Card from "./Card";
import Loading from "./Loading";
import NoSearchResult from "./NoSearchResult";
import InitialSearchSuggestion from "./InitialSearchSuggestion";

const renderSearchResults = ({
  isLoading,
  searchResults,
}: {
  isLoading: boolean;
  searchResults: FABCard[] | undefined;
}) => {
  const isInitialSearch = !isLoading && !searchResults;
  const hasNoResults =
    !isLoading && (!searchResults || searchResults?.length === 0);
  const hasResults = !isLoading && searchResults && searchResults?.length > 0;

  if (isLoading) {
    return <Loading />;
  } else if (isInitialSearch) {
    return <InitialSearchSuggestion />;
  } else if (hasNoResults) {
    return <NoSearchResult />;
  } else if (hasResults) {
    return (
      <>
        <h2>{strings.searchScreen.results.searchResultsHeader}</h2>
        {searchResults.map((card) => (
          <Card key={card.cardNumber[0]} {...card} />
        ))}
      </>
    );
  }
};

const CardSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<FABCard[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { notification, setNotification } = useContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchText(e.currentTarget.value);
  };

  const clearSearchText = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSearchText("");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const results = await getCardSearchResults(searchText);
      setSearchResults(results);
      setIsLoading(false);
    } catch (e) {
      setErrorMessage(
        "Something happened search for that card. Please try refreshing the page and try again. If the error occurs, please contact the project owner."
      );
    }
  };

  return (
    <section>
      <form>
        <button onClick={getAllFabCardData}>
          {strings.getAllFABCardsButtonCTA}
        </button>
        <label htmlFor="cardSearchText">
          {strings.searchScreen.form.cardNumberInputLabel}
        </label>
        <input
          type="text"
          id="cardSearchText"
          name="cardSearchText"
          onChange={handleChange}
          maxLength={128}
          placeholder="DYN122"
          value={searchText}
        />
        <button onClick={clearSearchText}>
          {strings.searchScreen.form.clearCTA}
        </button>
        <button onClick={handleSubmit}>
          {strings.searchScreen.form.searchCTA}
        </button>
      </form>
      <div>{renderSearchResults({ searchResults, isLoading })}</div>
    </section>
  );
};

export default CardSearch;

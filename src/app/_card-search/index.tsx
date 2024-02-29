"use client";

import { FormEvent, useState } from "react";
import strings from "./strings.json";
import {
  getAllFabCardData,
  getCardSearchResults,
} from "@/lib/firebase/queries";
import { FABCard } from "@/lib/firebase/documents.types";
import Card from "./Card";
import Loading from "./Loading";
import NoSearchResult from "./NoSearchResult";
import InitialSearchSuggestion from "./InitialSearchSuggestion";
import TestNotificationButton from "./TestNotificationButton";
import { useNotificationFactoryContext } from "@/components/notification-factory";
import { Box, Flex } from "theme-ui";

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
  const { setNotification, NOTIFICATION_TYPES } =
    useNotificationFactoryContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchText(e.currentTarget.value);
  };

  const clearSearchText = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSearchText("");
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!!searchResults?.length) {
        setSearchResults([]);
      }

      setIsLoading(true);

      const results = await getCardSearchResults(searchText);
      setSearchResults(results);
      setIsLoading(false);
    } catch (e) {
      setNotification({
        type: NOTIFICATION_TYPES.ERROR,
        message: strings.searchScreen.form.errors.search,
      });

      setIsLoading(false);
    }
  };

  return (
    <Flex
      sx={{
        flexDirection: "column",
        background: "mustard",
      }}
    >
      <Flex
        as="form"
        sx={{
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
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
        <button type="button" onClick={clearSearchText}>
          {strings.searchScreen.form.clearCTA}
        </button>
        <button type="submit">{strings.searchScreen.form.searchCTA}</button>
        <TestNotificationButton />
      </Flex>
      <div>{renderSearchResults({ searchResults, isLoading })}</div>
    </Flex>
  );
};

export default CardSearch;

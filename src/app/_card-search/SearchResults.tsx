import Card from "./Card";
import Loading from "./Loading";
import NoSearchResult from "./NoSearchResult";
import InitialSearchSuggestion from "./InitialSearchSuggestion";
import { FABCard } from "@/lib/firebase/documents.types";
import React from "react";

type SearchResultsProps = {
  isLoading: Boolean;
  searchResults?: FABCard[];
};

const SearchResults: React.FC<SearchResultsProps> = ({
  isLoading,
  searchResults,
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
    return searchResults.map((card) => (
      <Card key={card.cardNumber[0]} {...card} />
    ));
  }
};

export default SearchResults;

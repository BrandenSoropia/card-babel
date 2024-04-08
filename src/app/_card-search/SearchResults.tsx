import Card from "./Card";
import Loading from "./Loading";
import NoSearchResult from "./NoSearchResult";
import InitialSearchSuggestion from "./InitialSearchSuggestion";
import { FABCard } from "@/lib/firebase/documents.types";
import React, { ReactNode } from "react";
import { Box } from "theme-ui";

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

  let content: ReactNode[] = [];
  if (isLoading) {
    content.push(<Loading />);
  } else if (isInitialSearch) {
    content.push(<InitialSearchSuggestion />);
  } else if (hasNoResults) {
    content.push(<NoSearchResult />);
  } else if (hasResults) {
    content = searchResults.map((card) => (
      <Card key={card.cardNumber[0]} {...card} />
    ));
  }

  return (
    <Box
      sx={{
        marginY: 2,
      }}
    >
      {content}
    </Box>
  );
};

export default SearchResults;

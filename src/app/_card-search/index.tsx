/** @jsxImportSource theme-ui */
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
import { Box, Button, Flex, Input } from "theme-ui";
import { useTheme } from "@/components/design-system";
import Image from "next/image";
import IconMagnifyingGlass from "@/icons/MagnifyingGlass.icon";
import IconX from "@/icons/X.icon";
import SearchResults from "./SearchResults";

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
    return searchResults.map((card) => (
      <Card key={card.cardNumber[0]} {...card} />
    ));
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
  const { theme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchText(e.currentTarget.value);
  };

  const clearSearchText = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSearchText("");
  };

  const handleSearchCardSubmit = async (e: FormEvent) => {
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

  const handleGetAllCards = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!!searchResults?.length) {
        setSearchResults([]);
      }

      setIsLoading(true);

      const results = await getAllFabCardData();
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
        padding: 3,
      }}
    >
      <Flex
        as="form"
        sx={{
          flexDirection: "column",
          marginBottom: 2,
        }}
      >
        <label sx={{ marginBottom: 2 }} htmlFor="cardSearchText">
          {strings.searchScreen.form.cardNumberInputLabel}
        </label>
        <Flex>
          <Flex sx={{ position: "relative", flexGrow: 1, marginRight: 2 }}>
            <Input
              variant="pill"
              type="text"
              id="cardSearchText"
              name="cardSearchText"
              onChange={handleChange}
              maxLength={6}
              placeholder={strings.searchScreen.form.searchCTA}
              value={searchText}
            />
            {!!searchText && (
              <Button
                variant="clear"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  zIndex: 1,
                  padding: 0,
                }}
                type="button"
                onClick={clearSearchText}
              >
                <IconX
                  stroke={theme.colors.white}
                  height={24}
                  width={24}
                  title={strings.searchScreen.form.clearCTA}
                />
              </Button>
            )}
          </Flex>
          <button
            sx={{
              bg: "green",
              borderRadius: "3px",
              borderWidth: 0,
              paddingX: 3,
            }}
            type="submit"
            onClick={handleSearchCardSubmit}
          >
            <IconMagnifyingGlass
              stroke={theme.colors.white}
              height={24}
              width={24}
              title={strings.searchScreen.form.searchCTA}
            />
          </button>
        </Flex>
      </Flex>
      <button sx={{ marginBottom: 2 }} onClick={handleGetAllCards}>
        {strings.testGetAllFABCardsButtonCTA}
      </button>
      <TestNotificationButton />
      <SearchResults isLoading={isLoading} searchResults={searchResults} />
    </Flex>
  );
};

export default CardSearch;

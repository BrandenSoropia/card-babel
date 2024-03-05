import Markdown from "markdown-to-jsx";
import { FABCard } from "@/lib/firebase/documents.types";
import strings from "./strings.json";
import { Box, Flex, Heading, Text } from "theme-ui";

const Card = ({ name, cardNumber, details, translationInfo }: FABCard) => {
  return (
    <Box
      sx={{
        bg: "white",
        borderRadius: "20px",
        padding: 2,
      }}
    >
      <Heading as="h2">
        {name}{" "}
        <Text
          sx={{ fontSize: 1, fontWeight: "normal" }}
        >{`(${cardNumber})`}</Text>
      </Heading>
      <h3>{strings.card.translationHeader.english}</h3>
      <Markdown>{details["en-US"]}</Markdown>
      <h3>{strings.card.translationHeader.japanese}</h3>
      <Markdown>{details["jp-JA"]}</Markdown>
    </Box>
  );
};

export default Card;

import Markdown from "markdown-to-jsx";
import { FABCard } from "@/lib/firebase/documents.types";
import strings from "./strings.json";
import { Box, Heading, Text } from "theme-ui";

const Card = ({ name, cardNumber, details }: FABCard) => {
  return (
    <Box variant="containers.card">
      <Heading as="h2">
        {name}{" "}
        <Text
          sx={{ fontSize: 1, fontWeight: "normal" }}
        >{`(${cardNumber})`}</Text>
      </Heading>
      <h3>{strings.card.translationHeader.japanese}</h3>
      <Markdown>{details["jp-JA"]}</Markdown>
      <h3>{strings.card.translationHeader.english}</h3>
      <Markdown>{details["en-US"]}</Markdown>
    </Box>
  );
};

export default Card;

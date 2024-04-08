import { render, screen } from "@testing-library/react";
import CardSearch from "../index";
import { ReactNode } from "react";
import { getCardSearchResults } from "@/lib/firebase/queries";
import {
  NotificationFactoryProvider,
  NotificationFactory,
} from "@/components/notification-factory";
import { ThemeProvider } from "@/components/design-system";
import strings from "../strings.json";

jest.mock("@/lib/firebase/queries", () => ({
  getAllFabCardData: jest.fn(),
  getCardSearchResults: jest.fn(),
}));

const renderApp = (component: ReactNode) => {
  render(
    <ThemeProvider>
      <NotificationFactoryProvider>
        <NotificationFactory />
        {component}
      </NotificationFactoryProvider>
    </ThemeProvider>
  );
};

describe("CardSearch tests", () => {
  it("renders card search results", () => {
    test("trigger some awesome feature when clicking the button", async () => {
      // const user = userEvent.setup();
      renderApp(<CardSearch />);

      const pageTitle = screen.queryByText(
        strings.searchScreen.form.cardNumberInputLabel
      );
      console.log(pageTitle);

      // // Check the page even renders
      // expect(pageTitle).not.toBeNull();

      // // Mock data
      // (getCardSearchResults as jest.Mock).mockReturnValueOnce([
      //   {
      //     translationInfo: {
      //       sourceText: "https://fabrary.net/cards/surgical-extraction-blue",
      //       translationSource: "deepl",
      //     },
      //     details: {
      //       "jp-JA":
      //         "**Contract** - あなたは対戦相手の青のカードを追放する契約を結ぶ。あなたがこの契約を完了するたび、シルバー・トークンを1体生成する。<br><br>これがヒーローに当たったとき、相手のデッキの一番上のカードを追放し、その後相手の手札を見てカードを1枚追放する。",
      //       "en-US":
      //         "**Contract** - You are contracted to banish opponents' blue cards. Whenever you complete this contract, create a Silver token.<br><br>When this hits a hero, banish the top card of their deck, then look at their hand and banish a card.",
      //     },
      //     name: "Surgical Extraction",
      //     cardNumber: ["DYN122"],
      //   },
      // ]);

      // const input = screen.getByPlaceholderText(
      //   strings.searchScreen.form.searchCTA
      // );

      // TODO: type into search
      // TODO: check if result is shown.
    });
  });
});

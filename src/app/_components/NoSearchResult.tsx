import strings from "../strings.json";

const NoSearchResult = () => (
  <div>
    <h2>{strings.noSearchResult.header}</h2>
    <p>{strings.noSearchResult.suggestion}</p>
  </div>
);

export default NoSearchResult;

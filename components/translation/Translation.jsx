import { FormattedMessage } from "react-intl";
const enMessage = require("@/languages/en.json");

const Translation = (props) => {
  return <FormattedMessage {...props} defaultMessage={enMessage[props.id]} />;
};

export default Translation;

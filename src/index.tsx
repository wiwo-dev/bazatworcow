import React, { Requireable } from "react";
import * as ReactDOM from "react-dom/client";
import PropTypes from "prop-types";
import reactToWebComponent from "react-to-webcomponent";
import Checklist from "./components/checklist/Checklist";
import { isChecklistItemType } from "./types/checklistItem";

import Greeting from "./components/Greeting";
import Napis from "./components/Napis";
import Napis2 from "./components/Napis2";

class WebComponentWrapper extends React.Component<{ items: string }, {}> {
  static propTypes: {
    items: Requireable<string>;
  };

  render() {
    let items;
    try {
      items = this.props.items ? JSON.parse(this.props.items) : undefined;
      if (!Array.isArray(items)) {
        items = undefined;
      } else if (items.length === 0) {
        items = undefined;
      } else if (items?.some((item) => !isChecklistItemType(item))) {
        items = undefined;
      }
    } catch {
      items = undefined;
    }

    return <Checklist items={items} />;
  }
}

WebComponentWrapper.propTypes = {
  items: PropTypes.string,
};

const wcChecklist = reactToWebComponent(WebComponentWrapper, React, ReactDOM, { dashStyleAttributes: true });
const wcChecklistShadow = reactToWebComponent(WebComponentWrapper, React, ReactDOM, {
  dashStyleAttributes: true,
  shadow: true,
});

customElements.define("napis2-component", reactToWebComponent(Napis2, React, ReactDOM));

// How to use:
// <script defer="defer" src="https://rjspencer.github.io/r2wc-checklist/static/js/main.js"></script>
// <r2wc-checklist items='[{"label":"First Thing","isChecked":false}]' />

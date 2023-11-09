import ReactDOMServer from "react-dom/server";
import WYSIWYG from "./Wysiwyg";

function exportToHTML() {
  // const frame2 = useRef(null);
  const component = <WYSIWYG />;
  const htmlString = ReactDOMServer.renderToStaticMarkup(component);
  // const htmlString = ReactDOMServer.renderToString(component);

  console.log("HTML only:", htmlString);
  // return htmlString;
}

export default exportToHTML;

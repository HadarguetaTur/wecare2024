/* eslint-disable react/prop-types */
import parse, { domToReact } from 'html-react-parser';

const HTMLParserComponent = ({ htmlText }) => {
  // Ensure htmlText is a string before parsing
  if (typeof htmlText !== 'string') {
    return <p>Invalid content</p>; // or any fallback UI
  }

  // Define options for replacing tags
  const options = {
    replace: (domNode) => {
      if (domNode.type === 'tag') {
        switch (domNode.name) {
          case 'p':
            return (
              <p className="text-base @lg:text-lg leading-snug text-neutral-600">
                {domToReact(domNode.children, options)}
              </p>
            );
          case 'h1':
            return (
              <h1 style={{ fontSize: '2em', marginTop: '1.5em' }}>
                {domToReact(domNode.children, options)}
              </h1>
            );
          case 'h2':
            return (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {domToReact(domNode.children, options)}
              </h2>
            );
          case 'h3':
            return (
              <h3 style={{ fontSize: '1.5em', marginTop: '1.1em' }}>
                {domToReact(domNode.children, options)}
              </h3>
            );
          default:
            return domToReact(domNode.children, options);
        }
      }
    },
  };

  // Parse the HTML content using options
  const parsedHTML = parse(htmlText, options);

  return <>{parsedHTML}</>;
};

export default HTMLParserComponent;

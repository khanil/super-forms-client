import React, { PureComponent, PropTypes } from 'react';
import Autolinker from 'autolinker';

export default class AutolinkerWrapper extends PureComponent {

  constructor(props) {
    super(props);

    this.replaceFn = this.replaceFn.bind(this);

    this.autolinker = new Autolinker({
      replaceFn: this.replaceFn
    });

    this.links = [];
  }

  replaceFn(match) {
    this.links.push({
      href: match.getAnchorHref(),
      text: match.getMatchedText(),
      offset: match.getOffset()
    });
  }

  renderTextWithLinks() {
    let content = [];
    const initialText = this.props.text;

    console.log(this.links);

    this.links.forEach( (link, i, links) => {

      let prevLink = links[i - 1];

      content.push( initialText.slice(
        prevLink && (prevLink.offset + prevLink.text.length) || 0,
        link.offset
      ));

      content.push(
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.text}
        </a>
      );
    });

    const lastLink = this.links[this.links.length - 1];

    content.push( initialText.slice(
      lastLink.offset + lastLink.text.length
    ));

    console.log(content);
    return content;
  }

  isContainLinks() {
    return this.links.length;
  }

  render() {
    const { text } = this.props;
    this.links = [];
    this.autolinker.link(text);

    return (
      <div>
        {
          this.isContainLinks()
          ? this.renderTextWithLinks()
          : text
        }
      </div>
    );
  }
}
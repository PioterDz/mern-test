import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const HtmlBox = ({ children, ...otherProps }) => (
    <span {...otherProps} className="html-box">
      {ReactHtmlParser(children)}
    </span>
);

HtmlBox.propTypes = {
  children: PropTypes.string,
};

export default HtmlBox;
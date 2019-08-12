import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const HtmlBox = ({ children, ...otherProps }) => (
  <div>
    <p {...otherProps} className="html-box">
      {ReactHtmlParser(children)}
    </p>
  </div>
);

HtmlBox.propTypes = {
  children: PropTypes.string,
};

export default HtmlBox;
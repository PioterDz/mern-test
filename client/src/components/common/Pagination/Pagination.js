import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

class Pagination extends React.Component {

    changePage = (newPage) => {
        const { onPageChange } = this.props;

        onPageChange(newPage);
    }

    render() {

        const { pages, presentPage } = this.props;
        const { changePage } = this;
        return (
            <div className="pagination">
                
                <ul className="pagination__list">

                    <span onClick={() => {changePage(presentPage - 1)}}>
                        {presentPage !== 1 ? '<' : ''}
                    </span>
            
                    {[...Array(pages)].map((el, page) =>
                        <li
                            key={++page}
                            onClick={() => { changePage(page) }}
                            className={`pagination__list__item${((page) === presentPage) ? ' pagination__list__item--active' : ''}`}>
                            {page}
                        </li>
                    )}
            
                    <span onClick={() => {changePage(presentPage + 1)}}>
                        {presentPage !== pages && presentPage !== 0 ? '>' : ''}
                    </span>

                </ul>

            </div>
        );
    }
};

Pagination.propTypes = {
    pages: PropTypes.number.isRequired,
    initialPage: PropTypes.number,
    onPageChange: PropTypes.func.isRequired,
}

export default Pagination;
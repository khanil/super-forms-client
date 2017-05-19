import React, { PropTypes } from 'react';

function Pagination(props) {
  const { current, pages, onClick } = props;

  return (
    <nav aria-label="Навигация по формам" style={navStyle}>
      <ul className="pagination">
        { renderPreviousLink(props) }
        { renderLinks(props) }
        { renderNextLink(props) }
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.number.isRequired,
}

const navStyle = {
  textAlign: "center"
};

function renderLinks(props) {
  const { current, pages, onClick } = props;

  return [...Array(pages)].map((v, i) =>
    (
      <li
        key={i}
        className={current == i ? "active" : null}
      >
        <a
          href="#"
          onClick={onClick.bind(null, i)}
        >
          {i + 1}
        </a>
      </li>
    )
  );
}

function renderNextLink({ current, pages, onClick }) {
  const isDisabled = (current + 1 == pages);

  return (
    <li className={ isDisabled ? "disabled" : null }>
      <a href="#" aria-label="Следующая страница"
        onClick={ isDisabled ? undefined : onClick.bind(null, current + 1)}
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  );
}

function renderPreviousLink({ current, pages, onClick }) {
  const isDisabled = (current  == 0);

  return (
    <li className={ isDisabled ? "disabled" : null }>
      <a href="#" aria-label="Предыдущая страница"
        onClick={ isDisabled ? undefined : onClick.bind(null, current - 1)}
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  );
}

export default Pagination;
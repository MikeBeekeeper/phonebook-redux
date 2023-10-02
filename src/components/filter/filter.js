import css from '../filter/filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <div className={css.filterWrapper}>
      <label>
        {' '}
        <b>Find contacts by name</b>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={css.filterInput}
        />
      </label>
    </div>
  );
};

export default Filter;

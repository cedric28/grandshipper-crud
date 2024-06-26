import React from "react";

const ListGroup = ({ items, selectedItem, textProperty, valueProperty, onItemSelect }) => {
  return (
    <ul className="list-group">
      {items.map(item => {
        return (
          <li
            onClick={() => onItemSelect(item)}
            key={item[valueProperty]}
            className={selectedItem === item ? "list-group-item active" : "list-group-item"}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;
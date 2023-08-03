import React from 'react'
import { Dropdown } from 'react-bootstrap';
import farmdata from '../farmdata.json';

const DropdownBox = () => {

  const farm = farmdata;

  let area = farm.map(item=>
    <Dropdown.Item key={item.farmNum} href="#/action-1">{item.areaName}</Dropdown.Item>)




  return (
    <div>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {area}
      </Dropdown.Menu>
    </Dropdown>
    </div>
  )
}

export default DropdownBox
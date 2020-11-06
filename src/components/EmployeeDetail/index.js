import React from "react";
import { Image } from "react-bootstrap";

export default function EmployeeDetail(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td className="text-center">
        <Image src={props.image} roundedCircle />
      </td>
      <td>{props.name}</td>
      <td>
        <a href={"tel:" + props.phone}>{props.phone}</a>
      </td>
      <td>
        <a href={"mailto:" + props.email}>{props.email}</a>
      </td>
      <td>{props.dob}</td>
      <td>{props.age}</td>
    </tr>
  );
}

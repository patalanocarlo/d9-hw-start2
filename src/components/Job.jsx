import React from "react";
import { Row, Col, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, } from "react-redux";
import { removeFromFavorites,  } from "../redux/actions/actions";

const Job = ({ data }) => {
  const dispatch = useDispatch();
  
  // eslint-disable-next-line no-unused-vars
  const removeFromFavoritesHandler = () => {
    dispatch(removeFromFavorites(data._id));
  };


  return (
    <Row className="mx-0 mt-3 p-3" style={{ border: '1px solid #00000033', borderRadius: 4 }}>
      <Col xs={3}>
        <Link to={`/${data.company_name}`}>{data.company_name}</Link>
      </Col>
      <Col xs={6}>
        <Link to={`/details/${data._id}`} target="_blank">{data.title}</Link>
      </Col>
     
    </Row>
  );
};

export default Job;
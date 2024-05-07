import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToFavorites } from "./actions";

const Job = ({ data }) => {
  const dispatch = useDispatch();
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const addToFavoritesHandler = () => {
    dispatch(addToFavorites(data));
    setAddedToFavorites(true);
  };

  return (
    <Row
      className="mx-0 mt-3 p-3"
      style={{ border: "1px solid #00000033", borderRadius: 4 }}
    >
      <Col xs={3}>
        <Link to={`/${data.company_name}`}>{data.company_name}</Link>
      </Col>
      <Col xs={6}>
        <Link to={`/${data._id}`} target="_blank">
          {data.title}
        </Link>
      </Col>
      <Col xs={3} className="text-right">
        {addedToFavorites ? (
          <span>Aggiunto con successo</span>
        ) : (
          <Button variant="primary" onClick={addToFavoritesHandler}>
            Aggiungi
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default Job;

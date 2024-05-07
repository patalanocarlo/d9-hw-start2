import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa il componente Link
import { useSelector, useDispatch } from "react-redux";

import { removeFromFavorites } from "./actions";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const removeFromFavoritesHandler = (jobId) => {
    dispatch(removeFromFavorites(jobId));
  };

  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Carrello:</h1>
          {favorites.map((jobData) => (
            <Row
              key={jobData._id}
              className="mx-0 mt-3 p-3"
              style={{ border: "1px solid #00000033", borderRadius: 4 }}
            >
              <Col xs={3}>
                <Link to={`/${jobData.company_name}`}>
                  {jobData.company_name}
                </Link>
              </Col>

              <Col xs={6}>
                <Link to={`/details/${jobData._id}`} target="_blank">
                  {jobData.title}
                </Link>
              </Col>
              <Col xs={3} className="text-right">
                <Button
                  variant="danger"
                  onClick={() => removeFromFavoritesHandler(jobData._id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default FavoritesPage;

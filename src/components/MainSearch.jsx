import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setJobsRequest, setJobsSuccess, setJobsFailure } from "../redux/actions/actions";
import Job from "../redux/actions/jobs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const MainSearch = () => {
  const [query, setQuery] = useState(""); //aggiorno lo stato facendolo partire da vuoto a successivamente pieno
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loadingTimeout, setLoadingTimeout] = useState(false); //mi vado a gestire gli stati iniziali in tutti e 3 i casi
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs);
  const error = useSelector(state => state.error);
  const favorites = useSelector(state => state.favorites); //mi estratto i valori dal mio store dove hop i miei valori che userò

  useEffect(() => {
    setFavoritesCount(favorites.length); //vado a gestire il contatore ogni volta che aggiungo un jobs
  }, [favorites]);

  const Fetch = "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault(); //se la richiesta di fetch è soddisfatta mia aggiorna lo stato di jobs request

    dispatch(setJobsRequest());

    try {
      const response = await fetch(Fetch + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        dispatch(setJobsSuccess(data));
      } else {
        throw new Error("Errore non risulta nulla");
      }
    } catch (error) {
      dispatch(setJobsFailure(error.message));
      alert("Error nel caricamento della fetch");
    } finally {
      setLoadingTimeout(true);
      setTimeout(() => setLoadingTimeout(false), 1300);
    }
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col xs={8} className="mx-auto my-3">
          <h1 className="display-1">Remote Jobs Search</h1>
        </Col>
        <Col xs={4} className="mx-auto my-3 text-right">
          <Link to="/favorites" className="text-decoration-none text-dark">
            <FaShoppingCart /> <span className="text-dark">Carrello ({favoritesCount})</span>
          </Link>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col xs={12} className="mx-auto">
          <Form onSubmit={handleSubmit}>
          <Form.Control
  type="search"
  value={query}
  onChange={handleChange}
  placeholder="Type and press Enter"
  className="bg-black text-white border-0"
  style={{ color: "white" }}
/>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mx-auto mb-5">
          {loadingTimeout && (
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          )}
          {error && <div>{error}</div>}
          {!loadingTimeout && !error && jobs.length === 0 && (
            <div>Ci dispiace, non ci sono annunci di lavoro per te,inizia ora la tua ricerca qui.</div>
          )}
          {!loadingTimeout && !error && jobs.length > 0 && (
            jobs.map(jobData => (
              <Job key={jobData._id} data={jobData} />
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";

function ProductScreen() {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  console.log(id);
  const testpro = products.find((p) => p._id);
  console.log("testpro", testpro);
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Geri Dön
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews}`}
                rewiews
                color={"#f8e825"}
              />
            </ListGroupItem>

            <ListGroupItem>Fiyat: {product.price} TL</ListGroupItem>

            <ListGroupItem>Açıklama: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Fiyat:</Col>
                  <Col>
                    <strong>{product.price} TL</strong>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Durum:</Col>
                  <Col>
                    {product.countInStock > 0
                      ? `Stok: ${product.countInStock}`
                      : "Stokta yok"}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn.black"
                  disabled={product.countInStock === 0}
                  type="button"
                >
                  Sepete Ekle
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;

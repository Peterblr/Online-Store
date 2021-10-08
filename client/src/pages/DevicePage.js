import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import starBig from '../assets/starBig.png'
import {useParams} from "react-router-dom";
import {fetchOneDevice} from "../http/deviceAPI";
import data from "bootstrap/js/src/dom/data";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row>
                        <Col className="d-flex flex-column align-items-center">
                            <h2>{device.name}</h2>
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{background: `url(${starBig}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:64}}
                            >
                                {device.rating}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '8px solid lightseagreen'}}
                    >
                        <h3>от ${device.price}</h3>
                        <Button variant={"outline-primary"}>
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column mt-5">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightcyan' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>

        </Container>
    );

};

export default DevicePage;
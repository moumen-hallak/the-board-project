import React from "react";
import AllLists from "./Lists/AllLists";
import { Row } from "react-bootstrap";
import Slider from "./Slider";
const Home = () => {
    return (
        <div className="container-fluid p-0">
            <Slider />
            <Row>
                <AllLists />
            </Row>
        </div>
    );
};

export default Home;

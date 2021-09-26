import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import ItemForm from "../Item/ItemForm";
import AllItems from "../Item/AllItems";
import EditListForm from "./EditListForm";
import { Row, Col, Dropdown } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { SortAlphaUpAlt, SortAlphaDownAlt } from "react-bootstrap-icons";
import ListForm from "./ListForm";


const AllLists = () => {
  const [lists, setLists] = useState([])
  const [view, setView] = useState(false);

  const addNewList = () => {
    db.collection("board").onSnapshot(function (querySnapshot) {
      setLists(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          listName: doc.data().listName,
        }))
      );
    });
  }

  useEffect(() => {
    addNewList();
  }, []);

  const sortByListAscending = (ascending) => {
    const compare = (a, b) => {
      if (a.listName < b.listName) {
        return -1;
      }
      if (a.listName > b.listName) {
        return 1;
      }
      return 0;
    }
    lists.sort(compare);
    setLists(lists.slice());
  }
  const sortByListDescending = (descending) => {
    const compare = (a, b) => {
      if (a.listName > b.listName) {
        return -1;
      }
      if (a.listName < b.listName) {
        return 1;
      }
      return 0;
    }
    lists.sort(compare);
    setLists(lists.slice());
  }


  const handleChange = () => {
    setView(!view);
  };

  return (
    <Row> 
      <Row className="mainContainer d-flex justify-content-between flex-wrap">
        <Col className="p-0 m-0" xs={12} md={12} lg={4}>
        <ListForm />
        </Col>
        <Col className="p-0 m-0 d-flex justify-content-center" xs={6} md={6} lg={4}>
          <div>
          <BootstrapSwitchButton
            checked={view}
            onChange={handleChange}
            onlabel='Board View'
            onstyle='danger'
            offlabel='List View'
            offstyle='success'
          />
          </div>
        </Col>
        <Col className="p-0 m-0 d-flex justify-content-center" xs={6} md={6} lg={4}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" >
            Sort Lists
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={sortByListAscending}>
              <SortAlphaUpAlt color="#0f939d" size={25} style={{ cursor: "pointer" }} />
            </Dropdown.Item>
            <Dropdown.Item onClick={sortByListDescending}>
              <SortAlphaDownAlt color="#0f939d" size={25} style={{ cursor: "pointer" }} />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Col>


      </Row>
      {!view ? (
        <Row>
          {lists.map((list) => {
            return (
              <Col xs={12} md={6} lg={4} key={list.id}>
                <h3>{list.listName}</h3>
                <EditListForm docId={list.id} list={list} />
                <ItemForm docId={list.id} />
                <AllItems docId={list.id} />
              </Col>
            )
          })}
        </Row>
      ) : (
        <div>
          {lists.map((list) => {
            return (
              <Col xs={12} md={12} key={list.id}>
                <h3>{list.listName}</h3>
                <EditListForm docId={list.id} list={list} />
                <ItemForm docId={list.id} />
                <AllItems docId={list.id} />
              </Col>
            )
          })}
        </div>
      )}




    </Row>
  );
}

export default AllLists;
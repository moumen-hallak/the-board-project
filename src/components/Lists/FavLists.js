import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import FavoriteItems from "../Item/FavoriteItems";
import { Row } from "react-bootstrap";

const FavLists = () => {
  const [lists, setLists] = useState([])

  const fetchLists = async () => {
    const collection = await db.collection("board").get();
    const arrayOfDocs = collection.docs.map((doc) => {
      return { id: doc.id };
    });
    setLists(arrayOfDocs);
  };

  useEffect(() => {
    fetchLists()
  }, [])

  return (
    <Row >
      {lists.map((list) => {
        return (
          <FavoriteItems docId={list.id} />
        )
      })}
    </Row>
  );
}

export default FavLists;
import React, { useCallback, useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import CoarseCard from "../components/CoarseCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const CourseListPage = () => {
  const [bundles, setBundles] = useState([]);

  const getBundles = async () => {
    try {
      const response = await fetch(
        "https://mocki.io/v1/98df0de2-16da-476b-93a9-c9d3aa9f7e86"
      );
      const data = await response.json();
      setBundles(data.bundles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBundles();
  }, []);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setBundles((prev) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      })
    );
  }, []);

  const removeCard = (_id) => {
    setBundles((prev) => prev.filter((bundle) => bundle._id === _id));
  };

  const moveCardOnTop = useCallback((index) => {
    setBundles((prev) =>
      update(prev, {
        $splice: [
          [index, 1],
          [0, 0, prev[index]],
        ],
      })
    );
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Container bg="bg-green-200" textColor="text-[#4F6F52]">
        <section className="flex justify-center items-center">
          <div className="bg-white rounded-2xl w-8/12 p-10">
            <h2 className="h2">Manage Bundle</h2>
            <p>Change orders of the products based on priority</p>
            {bundles.map((bundle, index) => (
              <CoarseCard
                key={bundle._id}
                index={index}
                {...bundle}
                moveCard={moveCard}
                removeCard={removeCard}
                moveCardOnTop={moveCardOnTop}
              />
            ))}
          </div>
        </section>
      </Container>
    </DndProvider>
  );
};

export default CourseListPage;

import { MdDragIndicator } from "react-icons/md";
import Button from "./Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

const dropDownOptions = [
  { _id: 1, title: "move to top", onClick: () => {} },
  { _id: 2, title: "move to bottom", onClick: () => {} },
];

const ItemTypes = {
  CARD: "card",
};

const CoarseCard = ({
  index,
  _id,
  title,
  price,
  type,
  thumbnail,
  moveCard,
  moveCardOnTop,
  removeCard,
}) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { _id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      data-handler-id={handlerId}
      className="flex justify-between px-3 py-1 border border-gray-300 rounded-lg my-2"
    >
      <div className="flex space-x-8">
        <MdDragIndicator className="self-center text-2xl" />
        <img
          className="w-24 h-16 rounded-lg self-center"
          src={thumbnail}
          alt=""
        />
        <p className="self-center">{title}</p>
      </div>
      <div className="flex space-x-8">
        <p className="self-center">{price}</p>
        <Button classname="self-center bg-green-300 border-green-800">
          {type}
        </Button>
        <button onClick={toggleDropdown}>
          <BsThreeDotsVertical />
        </button>
        {isOpen && (
          <ul className="absolute z-10 text-black bg-white border border-gray-300 rounded-md mt-2 w-48">
            {dropDownOptions.map((option, index) => (
              <li
                key={index}
                onClick={option.onClick}
                className="cursor-pointer text-black px-4 py-2 hover:bg-gray-100"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CoarseCard;

import { useState } from "react";
import "./fabButton.scss";
import { TiPlusOutline } from "react-icons/ti";
import { IoSettings } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
const Icon = ({ children }) => (
    <span className="material-symbols-outlined">{children}</span>
  );

  
const FabButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="page fab-button-page">
      <div className={`fab ${isOpen ? "open" : ""}`}>
        <button onClick={() => setIsOpen(!isOpen)}
          data-aos="zoom-out-up"
          >
          <Icon><TiPlusOutline className="plussing" /></Icon>
        </button>
        <div className="fab-menu" >
          <button>
            <Icon><IoMdContact /></Icon>
          </button>
          <button>
            <Icon><FaInfoCircle /></Icon>
          </button>
          <button>
            <Icon><IoSettings /></Icon>
          </button>
        </div>
      </div>
    </section>
  );
};

 export default FabButton;
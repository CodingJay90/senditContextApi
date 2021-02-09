import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./UserDashBoard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orderstable from "./Orderstable";
import { ParcelContext } from "../../contexts/ParcelContext";

const UserDashBoard = () => {
  toast.configure();
  const {
    state: { parcels, isLoading },
    loadParcels,
  } = useContext(ParcelContext);
  console.log(parcels);

  useEffect(() => {
    loadParcels();
  }, []);

  return (
    <>
      <div className="container">
        <div className="hero">
          <h1>Dashboard</h1>
          <Link to="/createParcel" className="btn">
            Create Order
          </Link>
        </div>

        <div className="details">
          <div></div>
        </div>
        <h2>Orders</h2>
        <Orderstable isLoading={isLoading} parcels={parcels} />
      </div>
    </>
  );
};

export default UserDashBoard;

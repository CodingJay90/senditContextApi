import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../contexts/AuthContext";
import { ParcelContext } from "../../contexts/ParcelContext";
import LoadingButton from "../common/LoadingButton";

const EditPickupDestination = (props) => {
  toast.configure();
  const history = useHistory();
  const destination = props.history.location.state.destination;
  const parcel_id = props.history.location.state.id;
  const {
    state: { userInfo },
  } = useContext(AuthContext);
  const user_id = userInfo && userInfo.id;

  const {
    state: { isLoading, success, errors },
    clearErrors,
    editPickUpDestination,
  } = useContext(ParcelContext);

  const [value, setValue] = useState("");
  useEffect(() => setValue(destination), [destination]);

  const parcelBody = {
    destination: value,
    user_id,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editPickUpDestination(parcelBody, parcel_id);
  };

  useEffect(() => {
    clearErrors();
    if (success) {
      toast.success("parcels destination updated");
      setTimeout(() => {
        history.push("/userDashboard");
      }, 2000);
    }
  }, [errors, success]);

  return (
    <div className="Create">
      <div class="form">
        <div className="layer">
          {errors !== null &&
            errors.length &&
            errors.map((error) => {
              toast.error(error.msg);
              console.log(error);
            })}
          <h1>Edit pickup Destination</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="destination">Pickup Destination</label>
            <input
              type="text"
              name="destination"
              placeholder="Update pick up destination"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            {isLoading ? (
              <LoadingButton />
            ) : (
              <button className="submit-btn">Submit</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPickupDestination;

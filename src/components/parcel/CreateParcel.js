import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../contexts/AuthContext";
import { ParcelContext } from "../../contexts/ParcelContext";
import "../auth/Auth.css";
import LoadingButton from "../common/LoadingButton";

const CreateParcel = () => {
  toast.configure();
  const history = useHistory();
  let {
    state: { userInfo },
  } = useContext(AuthContext);
  const {
    state: { isLoading, success, errors },
    createParcel,
    clearErrors,
  } = useContext(ParcelContext);
  let user_id = userInfo && userInfo.id;
  console.log(errors);

  let [value, setValue] = useState({
    recipient_name: "",
    recipient_phone_no: "",
    destination: "",
    pickup_location: "",
    user_id,
  });
  const onChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    value.user_id = user_id;
    createParcel(value);
  };

  useEffect(() => {
    clearErrors();
    if (success) {
      toast.success("parcels created");
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
          <h1>Create Order</h1>
          <form onSubmit={handleSubmit}>
            <label for="pickup_location">Pickup Location</label>
            <input
              type="text"
              name="pickup_location"
              placeholder="Enter pickup location"
              onChange={onChange}
            />
            <label for="destination">Destination</label>
            <input
              type="text"
              name="destination"
              placeholder="enter destination"
              onChange={onChange}
            />
            <label for="recipient_name">Recipient Name</label>
            <input
              type="text"
              name="recipient_name"
              placeholder="Email recipient name"
              onChange={onChange}
            />
            <label for="recipient_phone_no">Recipient Mobile no</label>
            <input
              type="text"
              name="recipient_phone_no"
              placeholder="Recipient Mobile number"
              onChange={onChange}
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

export default CreateParcel;

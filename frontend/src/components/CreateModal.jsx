import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { categories } from "../data";

const CreateModal = ({ modalOn, toggleModal, setFoodList }) => {
  const alert = useAlert();

  const [foodName, setFoodName] = useState("none");
  const [foodType, setFoodType] = useState(null);
  const [providerName, setProviderName] = useState("");
  const [providerContact, setProviderContact] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [image, setImage] = useState("");
  const [expiry, setExpiry] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date(new Date().getTime()).toLocaleString({
      hourCycle: "h12",
    });
    const data = {
      name: foodName,
      type: foodType,
      quantity,
      address,
      providerName,
      providerContact,
      image,
      expiry,
      createdAt: currentTime,
    };

    if (
      foodName === "none" ||
      quantity == null ||
      address == "" ||
      providerName == "" ||
      providerContact == "" ||
      expiry == null
    ) {
      return alert.error("please fill all the fields");
    }

    setLoading(true);
    axios
      .post("/api/v1/food/create", data)
      .then((res) => {
        setLoading(false);
        setFoodName("");
        setFoodType(null);
        setAddress("");
        setExpiry(null);
        setProviderContact("");
        setProviderName("");
        setQuantity(null);
        setFoodList(res.data.foodList);
        toggleModal(false);
        alert.success("food provided 🎉");
      })
      .catch((error) => {
        setLoading(false);
        alert.error(error.response.data.message);
      });
  };

  return (
    <div
      className={`z-20 fixed flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-black/[0.4] ${
        !modalOn && "hidden"
      }`}
    >
      <form
        className=" bg-white p-4 md:p-8 rounded flex flex-col gap-4 mx-2 md:m-0 w-[calc(100%-1rem)] md:w-[35rem]"
        onSubmit={handleSubmit}
      >
        <i
          class="bx bx-x text-3xl p-2 self-end cursor-pointer"
          onClick={() => toggleModal(false)}
        ></i>
        <select
          className="outline-none px-4 py-2 rounded border-b-2 border-gray-300"
          onChange={(e) => {
            const temp = JSON.parse(e.target.value);
            setFoodName(temp.name);
            setFoodType(temp.type);
            setImage(temp.image);
          }}
        >
          <option
            value={JSON.stringify({
              name: "none",
              type: null,
              image: "none",
            })}
          >
            Food Name
          </option>
          {categories.map((item) => (
            <option value={JSON.stringify(item)}>{item.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder={`${
            foodType != null
              ? foodType == "Kilo"
                ? "Enter in Kilos"
                : "Enter in Numbers"
              : "Quantity"
          }`}
          onChange={(e) => setQuantity(e.target.value)}
          className="rounded px-4 py-2 outline-none border-b-2 border-gray-300"
          required
          value={quantity}
        />
        <input
          type="text"
          placeholder="Provider Name"
          onChange={(e) => setProviderName(e.target.value)}
          className="rounded px-4 py-2 outline-none border-b-2 border-gray-300"
          required
          value={providerName}
        />
        <input
          type="text"
          placeholder="Provider Contact"
          onChange={(e) => setProviderContact(e.target.value)}
          className="rounded px-4 py-2 outline-none border-b-2 border-gray-300"
          required
          value={providerContact}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          className="rounded px-4 py-2 outline-none border-b-2 border-gray-300"
          required
          value={address}
        />
        <input
          type="number"
          placeholder="Expected expiry time in Hours"
          onChange={(e) => setExpiry(e.target.value)}
          className="rounded px-4 py-2 outline-none border-b-2 border-gray-300"
          required
          value={expiry}
        />
        <button
          className="rounded px-4 py-3 my-2 text-white bg-green-600 hover:bg-green-400 disabled:bg-green-800"
          disabled={loading ? true : false}
        >
          {!loading ? "Provide" : "Providing"}
        </button>
      </form>
    </div>
  );
};

export default CreateModal;

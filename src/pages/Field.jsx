import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchData, createData } from "../utils/fetchData";
import { FaEdit } from "react-icons/fa";
import Modal from "../components/Modal";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";

const Field = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const surveyId = queryParams.get("surveyId");
  const surveyName = queryParams.get("surveyName");
  const campaignId = queryParams.get("campaignId");
  const campaignName = queryParams.get("campaignName");

  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [method, setMethod] = useState("create");
  const [name, setName] = useState("");
  const [type, setType] = useState("singleLineText");
  const [isShownOptions, setIsShownOptions] = useState(false);
  const [options, setOptions] = useState([]);
  const [idUpdate, setIdUpdate] = useState("");
  const [loading, setLoading] = useState(true);
  const [optionCustom, setOptionCustom] = useState([""]);
  const [max, setMax] = useState(0);

  const addOption = (e) => {
    e.preventDefault();
    setOptionCustom([...optionCustom, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...optionCustom];
    newOptions[index] = value;
    setOptionCustom(newOptions);
  };

  const handleChangeType = (e) => {
    setType(e.target.value);

    if (e.target.value === "singleSelect") {
      setIsShownOptions(true);
    } else {
      setIsShownOptions(false);
    }
  };

  const handleOpenModal = (method, data) => {
    setIsOpen(true);
    setMethod(method);
    if (method === "update") {
      setName(data.name);
      setType(data.type);
      setIdUpdate(data.id);
    } else {
      setName("");
      setType("singleLineText");
      setOptions([]);
      setIdUpdate("");
    }
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setOptionCustom([""]);
    setIsShownOptions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (method === "create") {
        let requestBody = {
          name,
          type,
          ...(type !== "singleLineText" &&
            optionCustom.length > 0 && { options: optionCustom }),

          ...(type === "rating" && {
            options: {
              choices: {
                icon: "start",
                max,
              },
            },
          }),
        };

        console.log("requestBody=====>", requestBody);
        await createData(
          `http://localhost:9999/api/field/create/${surveyId}`,
          requestBody
        );
      } else {
        throw new Error("Method undefined");
      }
      await fetchDataFromAPI();
    } catch (error) {}
    setOptionCustom([""]);
    handleCloseModal();
  };

  const fetchDataFromAPI = async () => {
    if (surveyId) {
      const url = `http://localhost:9999/api/survey/${surveyId}`;

      setLoading(true);
      const result = await fetchData(url);
      setData(result.fields || []);
      setLoading(false);
    } else {
      return setData([]);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyId]);

  return (
    <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600"
            >
              Home
            </a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <IoIosArrowForward className="text-gray-400" />
              <span className="cursor-default ms-1 text-sm font-medium text-gray-500 md:ms-2">
                Campaign ({campaignName})
              </span>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <IoIosArrowForward className="text-gray-400" />
              <a
                href={`/survey?campaignId=${campaignId}&campaignName=${campaignName}`}
                className="ms-1 text-sm font-medium text-gray-500 md:ms-2 hover:text-blue-600"
              >
                Survey ({surveyName})
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <IoIosArrowForward className="text-gray-400" />
              <span className="cursor-default ms-1 text-sm font-medium text-black md:ms-2">
                Fields
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <h1 className="py-5 text-3xl font-semibold text-center">Field Table</h1>
      <div className="flex flex-row-reverse pb-2">
        <button
          onClick={() => handleOpenModal("create")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="border-b bg-slate-50">
            <tr className="bg-gray-2 text-left">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">
                Name
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">
                Type
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">
                Options
              </th>
              <th className="py-4 px-4 font-medium text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                    <h5 className="text-black">{item.name}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                    <h5 className="text-black">{item.type && item.type}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                    {item.type == "singleLineText" ? (
                      <></>
                    ) : item.type == "rating" ? (
                      <>{item?.options?.max}</>
                    ) : (
                      <ul className="list-disc">
                        {item.options.choices.map((choice, index) => (
                          <li key={index}>{choice.name}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:scale-125 text-gray-500 transition-all hover:text-green-600"
                        title="Response"
                        onClick={() =>
                          handleOpenModal("update", {
                            id: item._id,
                            name: item.name,s
                            type: item.type,
                            options: {
                              choices:
                                item.type === "singleSelect"
                                  ? item.options.choices
                                  : [],
                            },
                          })
                        }
                      >
                        <FaEdit size={20} />
                      </button>
                    </div>
                  </td>

                  <Modal isOpen={isOpen} onClose={handleCloseModal}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <h1 className="text-center font-semibold text-2xl pb-3 capitalize">
                        {method}
                      </h1>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          name="name"
                          type="text"
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      {method === "create" && (
                        <>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="type"
                            >
                              Type
                            </label>
                            <select
                              name="type"
                              id="type"
                              value={type}
                              onChange={(e) => handleChangeType(e)}
                              className="w-full border border-grey-400 py-2 px-3 rounded leading-tight shadow text-gray-700"
                            >
                              <option value="singleLineText">
                                Single Line Text
                              </option>
                              <option value="singleSelect">
                                Single Select
                              </option>
                              <option value="rating">Rating</option>
                            </select>
                          </div>
                        </>
                      )}
                      {isShownOptions && (
                        <div className="w-full">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="type"
                          >
                            Options
                          </label>
                          <ul
                            className="overflow-y-auto text-sm text-gray-700"
                            aria-labelledby="dropdownSearchButton"
                          >
                            {optionCustom.map((option, index) => (
                              <li key={index}>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
                                  <input
                                    type="text"
                                    value={optionCustom.label}
                                    onChange={(e) =>
                                      handleOptionChange(index, e.target.value)
                                    }
                                    className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                          <button onClick={addOption}>Add Option</button>
                        </div>
                      )}
                      {type === "rating" && (
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                          >
                            Max
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            name="name"
                            type="number"
                            // value={name}
                            required
                            onChange={(e) => setMax(e.target.value)}
                          />
                        </div>
                      )}
                      <div className="flex justify-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </Modal>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border-b border-[#eee] py-5 px-4">
                  <div className="flex flex-col items-center justify-center">
                    {loading ? (
                      <img src="/loading.gif" alt="" />
                    ) : (
                      <p>There is no response.</p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Field;

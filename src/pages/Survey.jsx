import React, { useState, useEffect } from "react";
import { fetchData, updateData } from "../utils/fetchData";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "axios";
import { FaListAlt, FaChartBar, FaEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const Survey = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const campaignId = queryParams.get("campaignId");
  const campaignName = queryParams.get("campaignName");

  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateId, setUpdateId] = useState("");

  const handleOpenModal = (data) => {
    setIsOpen(true);
    setName(data.name);
    setUpdateId(data._id);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateData(`http://localhost:9999/api/survey/${updateId}`, {
        name,
      });
      setLoading(true);
      await fetchDataFromAPI();
    } catch (error) {
      alert("Error submitting. Try again later");
    }
    handleCloseModal();
  };

  const fetchDataFromAPI = async () => {
    if (campaignId) {
      const url = `http://localhost:9999/api/survey/all/${campaignId}`;

      setLoading(true);
      const result = await fetchData(url);
      setData(result.surveys || []);
      setLoading(false);
    } else {
      return setData([]);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId]);

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
              <span className="cursor-default ms-1 text-sm font-medium text-dark md:ms-2">
                Survey
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <h1 className="py-5 text-center text-3xl font-semibold">Survey Table</h1>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="border-b bg-slate-50">
            <tr className="bg-gray-2 text-left">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">
                Name
              </th>
              <th className="py-4 px-4 font-medium text-black xl:pl-11">
                Count response
              </th>
              <th className="py-4 px-4 font-medium text-black xl:pl-11">
                Fields
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
                    <h5 className="text-black">{item.countResponse}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                    <ul className="space-y-1 list-disc list-inside">
                      {item.fields && item.fields.length > 0 ? (
                        item.fields.map((field, index) => (
                          <li key={index}>
                            <a
                              href={`/question?surveyId=${item._id}&fieldName=${field.name}`}
                              className="hover:text-blue-600"
                            >
                              {field.name}
                            </a>
                          </li>
                        ))
                      ) : (
                        <></>
                      )}
                    </ul>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <div className="flex items-center space-x-3.5">
                      <a
                        href={`/field?surveyId=${item._id}&surveyName=${item.name}&campaignId=${campaignId}&campaignName=${campaignName}`}
                      >
                        <button
                          className="hover:scale-125 text-gray-500 transition-all hover:text-green-600"
                          title="Response"
                        >
                          <FaChartBar size={20} />
                        </button>
                      </a>
                      <a
                        href={`/response?surveyId=${item._id}&surveyName=${item.name}&campaignId=${campaignId}&campaignName=${campaignName}`}
                      >
                        <button
                          className="hover:scale-125 text-gray-500 transition-all hover:text-blue-500"
                          title="Field"
                        >
                          <FaListAlt size={20} />
                        </button>
                      </a>
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="hover:scale-125 text-gray-500 transition-all mb-2 hover:text-black"
                        title="Edit"
                      >
                        <FaEdit size={20} />
                      </button>
                      <Modal isOpen={isOpen} onClose={handleCloseModal}>
                        <form onSubmit={(e) => handleSubmit(e)}>
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
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border-b border-[#eee] py-5 px-4">
                  <div className="flex flex-col items-center justify-center">
                    {loading ? (
                      <img src="/loading.gif" alt="" />
                    ) : (
                      <p>
                        There is no survey.{" "}
                        <a
                          href="/"
                          className="text-blue-500 hover:underline underline-offset-2"
                        >
                          Choose one Campaign to see
                        </a>
                      </p>
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

export default Survey;

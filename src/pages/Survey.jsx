import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "axios";
import { FaListAlt, FaChartBar, FaEdit } from "react-icons/fa";

const Survey = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const campaignId = queryParams.get("campaignId");
  const campaignName = queryParams.get("campaignName");

  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpenModal = (data) => {
    setIsOpen(true);
    setName(data.name);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:9999/api/survey/${id}`, {
        name,
      });
    } catch (error) {
      alert("Error submitting. Try again later");
    }
    await fetchDataFromAPI();
    handleCloseModal();
  };

  const fetchDataFromAPI = async () => {
    if (campaignId) {
      const url = `http://localhost:9999/api/survey/all/${campaignId}`;

      const result = await fetchData(url);
      setData(result.surveys || []);
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
      <h1 className="pb-10 text-3xl font-semibold">Survey Table</h1>
      <h1 className="pb-2 text-lg text-gray-500">{campaignName}</h1>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="border-b bg-slate-50">
            <tr className="bg-gray-2 text-left">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">
                Name
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
                  <td className="border-b border-[#eee] py-5 px-4">
                    <div className="flex items-center space-x-3.5">
                      <a
                        href={`/field?surveyId=${item._id}&surveyName=${item.name}`}
                      >
                        <button
                          className="hover:scale-125 text-gray-500 transition-all hover:text-green-600"
                          title="Response"
                        >
                          <FaChartBar size={20} />
                        </button>
                      </a>
                      <a
                        href={`/response?surveyId=${item._id}&surveyName=${item.name}`}
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
                        <form onSubmit={(e) => handleSubmit(e, item._id)}>
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
                <td
                  colSpan="2"
                  className="border-b border-[#eee] py-5 px-4 text-center"
                >
                  <p>
                    There is no survey.{" "}
                    <a
                      href="/"
                      className="text-blue-500 hover:underline underline-offset-2"
                    >
                      Choose one Campaign to see
                    </a>
                  </p>
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

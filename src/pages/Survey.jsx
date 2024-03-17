import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import { FaListAlt, FaChartBar, FaEdit, FaTrash } from "react-icons/fa";
import AuthContext from "../auth/AuthContext";
import {
  fetchData,
  createData,
  updateData,
  deleteData,
} from "../utils/fetchData";
const Survey = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const campaignId = queryParams.get("campaignId");
  const campaignName = queryParams.get("campaignName");

  const [values, setValues] = useState();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleOpenModal = (data) => {
    setIsOpen(true);
    setName(data.name);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      setLoading(true);
      if (!values?._id) {
        result = await createData("http://localhost:9999/api/survey/create", {
          name: values.name,
          description: values.description,
          campaign_id: campaignId,
        });
      } else {
        result = await updateData(
          `http://localhost:9999/api/survey/update/${values._id}`,
          {
            name: values.name,
            description: values.description,
            campaign_id: campaignId,
          }
        );
      }
    } catch {
    } finally {
      setIsOpen(false);
      setLoading(false);
    }
  };

  const handleDelete = async (e, data) => {
    e.preventDefault();

    try {
      setLoading(true);
      await deleteData(`http://localhost:9999/api/survey/delete/${data._id}`);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const fetchDataFromAPI = async () => {
    if (campaignId) {
      const url = `http://localhost:9999/api/campaign/${campaignId}/surveys`;

      const result = await fetchData(url);
      setData(result);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchDataFromAPI();
    }
  }, [campaignId, loading]);

  return (
    <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <div className="flex justify-between">
        <h1 className="pb-10 text-3xl font-semibold">
          Survey Table Name : {campaignName}
        </h1>
        <button
          onClick={() => handleOpenModal("create")}
          className="h-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                Description
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
                    <h5 className="text-black">{item.description}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <div className="flex items-center space-x-3.5">
                      <a
                      // href={`/field?surveyId=${item._id}&surveyName=${item.name}`}
                      >
                        <button
                          className="hover:scale-125 text-gray-500 transition-all hover:text-green-600"
                          title="Response"
                        >
                          <FaChartBar size={20} />
                        </button>
                      </a>
                      <a
                        href={`/field?surveyId=${item._id}&surveyName=${item.name}`}
                      >
                        <button
                          className="hover:scale-125 text-gray-500 transition-all hover:text-blue-500"
                          title="Field"
                        >
                          <FaListAlt size={20} />
                        </button>
                      </a>
                      <button
                        onClick={() => {
                          setValues(item);
                          setIsOpen(true);
                        }}
                        className="hover:scale-125 text-gray-500 transition-all mb-2 hover:text-black"
                        title="Edit"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item);
                        }}
                        className="hover:scale-125 text-gray-500 transition-all mb-2 hover:text-black"
                      >
                        <FaTrash />
                      </button>
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
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit}>
            <h1 className="text-center font-semibold text-2xl pb-3 capitalize">
              {values?._id ? "update" : "create"}
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
                value={values?.name}
                required
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                type="text"
                value={values?.description}
                required
                rows={4}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
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
    </div>
  );
};

export default Survey;

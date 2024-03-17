import React, { useState, useEffect } from "react";
import { fetchData, createData, updateData } from "../utils/fetchData";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const Campaign = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [values, setValues] = useState();
  const [method, setMethod] = useState("create");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchDataFromAPI = async () => {
    const url = "http://localhost:9999/api/campaign";
    const result = await fetchData(url);
    setData(result);
  };

  const handleOpenModal = (data) => {
    setIsOpen(true);
    setMethod("create");
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    // setIsShownOptions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      setLoading(true);
      if (values?.id) {
        result = await createData("http://localhost:9999/api/campaign/create", {
          name: values.name,
        });
      } else {
        result = await updateData(
          `http://localhost:9999/api/campaign/update/${values._id}`,
          {
            name: values.name,
          }
        );
      }
      if (result) {
        setIsOpen(false);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, data) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await createData(
        `http://localhost:9999/api/campaign/delete/${data._id}`
      );
      if (result) {
        setIsOpen(false);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchDataFromAPI();
    }
  }, [loading]);

  return (
    <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <div className="flex justify-between">
        <h1 className="pb-10 text-3xl font-semibold">Campaign table</h1>
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
              <th className="py-4 px-4 font-medium text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                    <h5 className="text-black">{item.name}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <div className="flex items-center space-x-3.5">
                      <a>
                        <button
                          onClick={() =>
                            navigate(
                              `/survey?campaignId=${item._id}&campaignName=${item.name}`
                            )
                          }
                          className="hover:scale-125 transition-all hover:text-blue-600"
                        >
                          <FaEye />
                        </button>
                      </a>
                      <a>
                        <button
                          onClick={() => {
                            setValues(item);
                            setIsOpen(true);
                            setMethod("update");
                          }}
                          className="hover:scale-125 transition-all hover:text-blue-600"
                        >
                          <FaEdit />
                        </button>
                      </a>
                      <a>
                        <button
                          onClick={(e) => {
                            handleDelete(e, item);
                          }}
                          className="hover:scale-125 transition-all hover:text-blue-600"
                        >
                          <FaTrash />
                        </button>
                      </a>
                    </div>
                  </td>
                  <Modal isOpen={isOpen} onClose={handleCloseModal}>
                    <form onSubmit={handleSubmit}>
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
                          value={values?.name}
                          required
                          onChange={(e) =>
                            setValues({ ...values, name: e.target.value })
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
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="border-b border-[#eee] py-5 px-4 text-center"
                >
                  <p>There is no campaign</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campaign;

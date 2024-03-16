import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import formatDate from "../utils/formatDate";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const Response = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const surveyId = queryParams.get("surveyId");
  const surveyName = queryParams.get("surveyName");

  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);

  const fetchReponseFromAPI = async () => {
    if (surveyId) {
      const url = `http://localhost:9999/api/response/all/${surveyId}`;
      const result = await fetchData(url);
      console.log("Response", result.responses);
      setData(result.responses || []);
    } else {
      return setData([]);
    }
  };

  const fetchFieldsFromAPI = async () => {
    if (surveyId) {
      const url = `http://localhost:9999/api/survey/${surveyId}`;
      const result = await fetchData(url);
      console.log("Fields", result.fields);
      setFields(result.fields || []);
    } else {
      return setFields([]);
    }
  };

  const handleDelete = async (surveyId) => {
    try {
      const url = `http://localhost:9999/api/response/${surveyId}`;
      const response = await axios.delete(url);
      if (response.status === 200) {
        alert("Delete successful");
        fetchReponseFromAPI();
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      alert("Error deleting survey");
    }
  };

  useEffect(() => {
    fetchReponseFromAPI();
    fetchFieldsFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyId]);

  return (
    <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <h1 className="pb-10 text-3xl font-semibold">Response Table</h1>
      <h1 className="pb-2 text-lg text-gray-500">{surveyName}</h1>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="border-b bg-slate-50">
            <tr className="bg-gray-2 text-left">
              {fields &&
                fields.length > 0 &&
                fields.map((field, index) => (
                  <th
                    className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11"
                    key={index}
                  >
                    {field.name}
                  </th>
                ))}
              <th className="py-4 px-4 font-medium text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  {fields.map((field, index) => {
                    const matchingKey = Object.keys(item.fields).find(
                      (key) => field.name === key
                    );
                    if (matchingKey !== undefined) {
                      let value = item.fields[matchingKey];
                      if (typeof value === "object") {
                        // Handle object value
                        // For example, convert it to a string
                        value = Object.keys(value)
                          .filter((key) => key !== "id")
                          .map((key) => `${key}: ${value[key]}`)
                          .join("\n");
                      }
                      return (
                        <td
                          key={index}
                          className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11"
                        >
                          <h5 className="text-black">{value.toString()}</h5>
                        </td>
                      );
                    } else {
                      return (
                        <td
                          key={index}
                          className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11"
                        ></td>
                      );
                    }
                  })}

                  <td className="border-b border-[#eee] py-5 px-4">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="hover:scale-125 transition-all hover:text-red-500"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border-b border-[#eee] py-5 px-4 text-center"
                >
                  <p>
                    There is no response.{" "}
                    <a
                      href="/survey"
                      className="text-blue-500 hover:underline underline-offset-2"
                    >
                      Choose one Survey to see
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

export default Response;

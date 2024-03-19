import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import formatDate from "../utils/formatDate";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const Response = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const surveyId = queryParams.get("surveyId");
  const surveyName = queryParams.get("surveyName");
  const campaignId = queryParams.get("campaignId");
  const campaignName = queryParams.get("campaignName");

  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReponseFromAPI = async () => {
    if (surveyId) {
      setLoading(true);
      const url = `http://localhost:9999/api/response/all/${surveyId}`;
      const result = await fetchData(url);
      setData(result.responses || []);
      setLoading(false);
    } else {
      return setData([]);
    }
  };

  const fetchFieldsFromAPI = async () => {
    if (surveyId) {
      setLoading(true);
      const url = `http://localhost:9999/api/survey/${surveyId}`;
      const result = await fetchData(url);
      setFields(result.fields || []);
      setLoading(false);
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
                Responses
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <h1 className="py-5 text-center text-3xl font-semibold">
        Response Table
      </h1>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="border-b bg-slate-50">
            <tr className="bg-gray-2 text-left">
              <th className="py-4 px-4 font-medium text-black">Created At</th>
              {fields &&
                fields.length > 0 &&
                fields.map((field, index) => (
                  <th
                    className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11"
                    key={index}
                  >
                    {/* TODO */}
                    <a
                      href="#!"
                      className="hover:underline hover:text-blue-600 ring-offset-4"
                    >
                      {field.name}
                    </a>
                  </th>
                ))}
              <th className="py-4 px-4 font-medium text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td key={index} className="border-b border-[#eee] py-5 px-4">
                    {formatDate(item.createdTime)}
                  </td>
                  {fields.map((field, index) => {
                    const matchingKey = Object.keys(item.fields).find(
                      (key) => field.name === key
                    );
                    if (matchingKey !== undefined) {
                      let value = item.fields[matchingKey];
                      if (typeof value === "object") {
                        value = Object.keys(value)
                          .filter((key) => key !== "id")
                          .map((key) => `• ${value[key]}`)
                          .join("<br>");

                        console.log(value);
                      }
                      return (
                        <td
                          key={index}
                          className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11"
                        >
                          <p
                            className="text-black"
                            dangerouslySetInnerHTML={{ __html: value }}
                          ></p>
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
                <td colSpan="8" className="border-b border-[#eee] py-5 px-4">
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

export default Response;

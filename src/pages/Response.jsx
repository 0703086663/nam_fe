import React, { useState, useEffect } from "react";
import { fetchData, deleteData } from "../utils/fetchData";
import formatDate from "../utils/formatDate";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Response = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const surveyId = queryParams.get("surveyId");
  const surveyName = queryParams.get("surveyName");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);

  const fetchReponseAndFieldFromAPI = async () => {
    if (surveyId) {
      const urlResponses = `http://localhost:9999/api/survey/${surveyId}/responses`;
      const urlField = `http://localhost:9999/api/survey/${surveyId}/fields`;
      const responses = await fetchData(urlResponses);
      const fields = await fetchData(urlField);
      setData(responses || []);
      setFields(fields || []);

      const transformData = responses.reduce((acc, curr) => {
        const index = acc.findIndex(
          (obj) =>
            obj.owner_id === curr.owner_id &&
            obj.response_id === curr.response_id
        );
        if (index !== -1) {
          acc[index][curr.field_id] = curr.content;
        } else {
          const newObj = {
            [curr.field_id]: curr.content,
            owner_id: curr.owner_id,
            response_id: curr.response_id,
            _id: curr._id,
          };
          acc.push(newObj);
        }
        return acc;
      }, []);

      console.log(transformData);

      const addDetailUser = await Promise.all(
        transformData.map(async (v) => {
          try {
            const user = await fetchData(
              `http://localhost:9999/api/user/${v.owner_id}`
            );
            return { ...v, name: user.name, email: user.email };
          } catch (error) {}
        })
      );
      console.log(addDetailUser);
      setData(addDetailUser || []);
    }
  };

  const handleDelete = async (e, data) => {
    e.preventDefault();

    try {
      setLoading(true);
      await deleteData(`http://localhost:9999/api/response/delete/${data._id}`);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchReponseAndFieldFromAPI();
    }
  }, [surveyId, loading]);

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
              <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">
                Name
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">
                Email
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  {fields?.map((field, index) => {
                    return (
                      <td
                        key={index}
                        className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11"
                      >
                        <h5 className="text-black">{item[field._id]}</h5>
                      </td>
                    );
                  })}
                  <td
                    key={index}
                    className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11"
                  >
                    <h5 className="text-black">{item.name}</h5>
                  </td>
                  <td
                    key={index}
                    className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11"
                  >
                    <h5 className="text-black">{item.email}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <button
                      onClick={(e) => {
                        handleDelete(e, item);
                      }}
                      className="hover:scale-125 text-gray-500 transition-all mb-2 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
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

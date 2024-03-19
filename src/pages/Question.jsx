import React, { useState, useEffect } from "react";
import { fetchData, updateData } from "../utils/fetchData";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "axios";
import { FaListAlt, FaChartBar, FaEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const Question = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const surveyId = queryParams.get("surveyId");
  const fieldName = queryParams.get("fieldName");

  const [data, setData] = useState([]);

  return (
    <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
        {/* <nav className="flex" aria-label="Breadcrumb">
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
      </nav> */}

      <h1 className="py-5 text-3xl font-semibold text-center">
        {fieldName}
      </h1>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="border-b bg-slate-50">
            <tr className="bg-gray-2 text-left">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">
                Response
              </th>
              <th className="py-4 px-4 font-medium text-black xl:pl-11">
                Count survey
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                    <h5 className="text-black">{item.name}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11">
                    <h5 className="text-black">{item.countSurvey}</h5>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="border-b border-[#eee] py-5 px-4">
                  {/* <div className="flex flex-col items-center justify-center">
                    {loading ? (
                      <img src="/loading.gif" alt="" />
                    ) : (
                      <p>There is no campaign</p>
                    )}
                  </div> */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Question;

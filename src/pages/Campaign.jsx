import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Campaign = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataFromAPI = async () => {
    const url = "http://localhost:9999/api/campaign";
    setLoading(true);
    const result = await fetchData(url);
    console.log("result", result);
    setData(result?.campaigns);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  return (
    <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <h1 className="py-5 text-3xl font-semibold text-center">
        Campaign table
      </h1>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="border-b bg-slate-50">
            <tr className="bg-gray-2 text-left">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black xl:pl-11">
                Name
              </th>
              <th className="py-4 px-4 font-medium text-black xl:pl-11">
                Count survey
              </th>
              <th className="py-4 px-4 font-medium text-center">Actions</th>
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
                  <td className="border-b border-[#eee] py-5 px-4">
                    <div className="flex justify-center items-center space-x-3.5">
                      <a href="#!">
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
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="border-b border-[#eee] py-5 px-4">
                  <div className="flex flex-col items-center justify-center">
                    {loading ? (
                      <img src="/loading.gif" alt="" />
                    ) : (
                      <p>There is no campaign</p>
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

export default Campaign;

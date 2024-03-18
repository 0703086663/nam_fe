import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import { fetchData, createData } from "../utils/fetchData";
import { useLocation } from "react-router-dom";

const CreateResponse = () => {
  const { currentUser } = useContext(AuthContext);
  const { surveyId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const surveyName = queryParams.get("surveyName");
  const surveyDescription = queryParams.get("surveyDescription");

  const examplePayload = {
    content: "3",
    survey_id: "recYZP26BhF3XrKf5",
    field_id: "recJZtaKu2AEeZhfr",
  };

  const fetchDataFromAPI = async () => {
    if (surveyId) {
      const url = `http://localhost:9999/api/survey/${surveyId}/fields`;
      var result = await fetchData(url);

      const updatedResult = result.map((field) => {
        if (field.type === "singleSelect" || field.type === "multipleSelects") {
          const optionsArray = field.options.split(",");
          return { ...field, options: optionsArray };
        }
        return field;
      });

      setData(updatedResult);
    } else {
      setData([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!loading) {
      fetchDataFromAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyId, loading]);

  return (
    <section className="relative">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-3xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              {surveyName}
            </h1>
            {surveyDescription && (
              <h6 className="!mt-2 text-md text-center leading-tight tracking-tight text-gray-500">
                {surveyDescription}
              </h6>
            )}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => handleSubmit(e)}
            >
              {data && data.length > 0 ? (
                data.map((field, index) => {
                  return (
                    <div key={index}>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        {field.name}
                      </label>
                      {field.type === "singleLineText" && (
                        <input
                          type="text"
                          name={field._id}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5"
                        />
                      )}
                      {field.type === "singleSelect" && (
                        <select
                          name={field._id}
                          id=""
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                          {field.options.map((opt, index) => {
                            return (
                              <option value={opt} key={index}>
                                {opt}
                              </option>
                            );
                          })}
                        </select>
                      )}
                      {field.type === "multipleSelects" &&
                        field.options.map((opt, index) => {
                          return (
                            <div className="flex items-center mb-4" key={index}>
                              <input
                                type="checkbox"
                                name={field._id}
                                value={field.name}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <label className="ms-2 text-sm text-gray-900">
                                {opt}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
              <button
                // onClick={handleSubmit}
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateResponse;

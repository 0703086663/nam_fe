import { Fragment, useState, useEffect, React } from "react";
import { fetchData } from "../utils/fetchData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  const fetchDataFromAPI = async () => {
    const campaignUrl = "http://localhost:9999/api/campaign";
    const campaignResult = await fetchData(campaignUrl);

    if (campaignResult && campaignResult.length > 0) {
      const updatedCampaigns = await Promise.all(
        campaignResult.map(async (campaign) => {
          const surveyUrl = `http://localhost:9999/api/campaign/${campaign._id}/surveys`;
          const surveyResult = await fetchData(surveyUrl);

          const filteredSurveys = surveyResult.filter(
            (survey) => survey.campaign_id === campaign._id
          );

          return { ...campaign, surveys: filteredSurveys };
        })
      );

      setCampaigns(updatedCampaigns);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  return (
    <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <h1 className="text-3xl text-center font-bold">Campaigns</h1>
      {campaigns && campaigns.length > 0 ? (
        campaigns.map((campaign, index) => (
          <Fragment key={index}>
            <h2 className="cursor-default mt-5 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {campaign.name}
            </h2>
            <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              {campaign.surveys && campaign.surveys.length > 0 ? (
                campaign.surveys.map((survey, index) => {
                  return (
                    <li
                      key={index}
                      className="py-2 cursor-pointer hover:text-black"
                      onClick={() =>
                        navigate(
                          `/survey/${survey._id}?surveyName=${survey.name}${
                            survey.description
                              ? `&surveyDescription=${survey.description}`
                              : ``
                          }`
                        )
                      }
                    >
                      {survey.name}
                    </li>
                  );
                })
              ) : (
                <span>There's no survey</span>
              )}
            </ul>
            <hr className="my-2" />
          </Fragment>
        ))
      ) : (
        <>
          <h1 className="text-center text-3xl py-5">There's no campaign</h1>
          <h6
            className="text-center cursor-pointer hover:text-blue-600 hover:underline underline-offset-4"
            onClick={() => navigate("/campaign")}
          >
            Create one?
          </h6>
        </>
      )}
    </div>
  );
};

export default Home;

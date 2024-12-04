import axios from "axios";

const API_PATH = "/getPageURL";

export interface IUrlMapping {
  pageLink: string;
  status: number;
}

export const getUrlMappings = async (shortenUrl): Promise<IUrlMapping> => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_ECS_API_ENDPOINT + API_PATH,
      { shortLink: shortenUrl }
    );

    let urlMappingResOutput: IUrlMapping = {
      ...res.data.body,
      status: res.status,
    };

    return urlMappingResOutput;
  } catch (error) {
    console.log("get url mapping error: ", error);
  }
};

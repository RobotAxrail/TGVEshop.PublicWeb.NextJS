import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

interface IDomainFromPreprintQRDomain {
  body: { domainToRedirectTo: string | undefined };
  statusCode: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const slug = req.query["slug"];

    if (!slug || typeof slug !== "string") {
      res.statusCode = 404;
      res.send(JSON.stringify({ message: "pls use with a slug" }));
      return;
    }

    const resData = await axios.post<IDomainFromPreprintQRDomain>(
      process.env.NEXT_PUBLIC_ECS_API_ENDPOINT + "/getDomain",
      {
        prePrintQRDomain: slug,
      }
    );

    return res.status(resData.data.statusCode).json(resData.data.body);
  } catch (error) {
    console.error("getCustomDomain api error", error);
  }
};

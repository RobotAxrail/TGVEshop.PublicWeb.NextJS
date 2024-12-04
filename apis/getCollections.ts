import axios from "axios";

interface ICollectionMenu {
  homeCollectionId: string;
  title: string;
  nextToken: number;
  searchKeyword: string;
}

interface ISortField {
  direction: String;
  field: String;
}

export async function fetchCollections(
  limit: number,
  collectionsMenuState: ICollectionMenu,
  sortField: ISortField,
  merchantId: string,
  storeId: string
) {
  try {
    const searchFilterParams = {};
    if (collectionsMenuState?.searchKeyword) {
      searchFilterParams["and"] = [
        {
          title: { matchPhrasePrefix: collectionsMenuState?.searchKeyword },
        },
      ];
    }

    const params = {
      filter: searchFilterParams,
      limit: limit,
      homeCollectionId:
        !collectionsMenuState?.searchKeyword &&
        collectionsMenuState?.homeCollectionId
          ? collectionsMenuState?.homeCollectionId
          : null,
      merchantId: merchantId,
      nextToken: collectionsMenuState.nextToken,
      sort: sortField,
      storeId,
    };
    const res = await axios.post(
      process.env.NEXT_PUBLIC_ECS_API_ENDPOINT + "/getCollections",
      params
    );
    const resData = res.data.body;

    if (res.data.statusCode !== 200) return;

    return resData;
  } catch (error) {
    console.log("getCollections error: ", error);
  }
}

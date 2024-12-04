export const mockCollections = {
    "bandai-namco": {
      items: [
        {
          compareAtPrice: 35.90,
          cover: "https://example.com/tamagotchi-cover.jpg",
          deliveryCompareAtPrice: 35.90,
          deliveryCompareAtPriceRange: [35.90, 35.90],
          deliveryPrice: 29.90,
          deliveryPriceRange: [29.90, 29.90],
          deliveryPriceWithTax: 31.69,
          deliveryPriceWithTaxRange: [31.69, 31.69],
          description: "Classic virtual pet game collaboration",
          effectiveEndDateTime: "2024-12-31T23:59:59Z",
          effectiveStartDateTime: "2024-01-01T00:00:00Z",
          hasStock: true,
          hasVariant: false,
          homeCollectionId: "bandai-namco",
          homeCollectionTitle: "Bandai Namco Collaboration",
          image: ["https://example.com/tamagotchi-1.jpg", "https://example.com/tamagotchi-2.jpg"],
          isDisabled: false,
          itemId: "tamagotchi-001",
          itemProperty: "Product",
          price: 29.90,
          priceWithTax: 31.69,
          productIsDisabled: false,
          promotionEndDateTime: "2024-12-31T23:59:59Z",
          promotionStartDateTime: "2024-01-01T00:00:00Z",
          seoUrl: "tamagotchi",
          title: "Tamagotchi",
          totalRatings: 450,
          totalReviews: 98,
          updatedAt: "2024-01-15T10:00:00Z",
          video: null
        }
        // Add more Bandai items...
      ],
      message: "Success",
      nextToken: null,
      productCollectionBanner: "https://example.com/bandai-banner.jpg",
      productCollectionId: "bandai-namco",
      productCollectionName: "Bandai Namco Collection",
      status: "true",
      total: 1
    },
    "tgv-voucher": {
      items: [
        {
          compareAtPrice: 10.00,
          cover: "https://example.com/combo-a-cover.jpg",
          deliveryCompareAtPrice: 10.00,
          deliveryCompareAtPriceRange: [10.00, 10.00],
          deliveryPrice: 8.00,
          deliveryPriceRange: [8.00, 8.00],
          deliveryPriceWithTax: 8.48,
          deliveryPriceWithTaxRange: [8.48, 8.48],
          description: "Signature Pepper Small + 1x Regular Size Mineral Water",
          effectiveEndDateTime: "2024-12-31T23:59:59Z",
          effectiveStartDateTime: "2024-01-01T00:00:00Z",
          hasStock: true,
          hasVariant: false,
          homeCollectionId: "tgv-voucher",
          homeCollectionTitle: "TGV Voucher",
          image: ["https://example.com/combo-a-1.jpg", "https://example.com/combo-a-2.jpg"],
          isDisabled: false,
          itemId: "combo-a-001",
          itemProperty: "Voucher",
          price: 8.00,
          priceWithTax: 8.48,
          productIsDisabled: false,
          promotionEndDateTime: "2024-12-31T23:59:59Z",
          promotionStartDateTime: "2024-01-01T00:00:00Z",
          seoUrl: "combo-a",
          title: "Signature Popcorn (Small) + 1x Regular Drink",
          totalRatings: 460,
          totalReviews: 324,
          updatedAt: "2024-01-15T10:00:00Z",
          video: null
        }
        // Add more voucher items...
      ],
      message: "Success",
      nextToken: null,
      productCollectionBanner: "https://example.com/voucher-banner.jpg",
      productCollectionId: "tgv-voucher",
      productCollectionName: "TGV Vouchers",
      status: "true",
      total: 1
    }
  };
  
  export const mockGraphQLAPI = {
    graphql: async (operation, params) => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
      // Extract collection name from seoUrl (e.g., "collection/bandai-namco" -> "bandai-namco")
      const collectionName = params.seoUrl.split('/')[1];
      
      // Get the collection data
      const collectionData = mockCollections[collectionName];
  
      if (!collectionData) {
        return {
          data: {
            listItemsByCollection: {
              items: [],
              message: "Collection not found",
              nextToken: null,
              productCollectionBanner: "",
              productCollectionId: "",
              productCollectionName: "",
              status: "true",
              total: 0
            }
          }
        };
      }
  
      let items = [...collectionData.items];
      
      // Apply sorting if provided
      if (params.sort) {
        items.sort((a, b) => {
          if (params.sort.direction === 'asc') {
            return a[params.sort.field] > b[params.sort.field] ? 1 : -1;
          } else {
            return a[params.sort.field] < b[params.sort.field] ? 1 : -1;
          }
        });
      }
  
      // Apply pagination
      const startIndex = parseInt(params.nextToken || 0);
      const endIndex = startIndex + (params.limit || 20);
      const paginatedItems = items.slice(startIndex, endIndex);
  
      return {
        data: {
          listItemsByCollection: {
            items: paginatedItems,
            message: "Success",
            nextToken: endIndex < items.length ? endIndex.toString() : null,
            productCollectionBanner: collectionData.productCollectionBanner,
            productCollectionId: collectionData.productCollectionId,
            productCollectionName: collectionData.productCollectionName,
            status: "true",
            total: collectionData.total
          }
        }
      };
    }
  };
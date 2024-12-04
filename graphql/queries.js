/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const adminDownloadEInvoiceUploadFile = /* GraphQL */ `
  query AdminDownloadEInvoiceUploadFile(
    $fileKey: String
    $itemId: String
    $mode: String
  ) {
    adminDownloadEInvoiceUploadFile(
      fileKey: $fileKey
      itemId: $itemId
      mode: $mode
    ) {
      fileUrl
      message
      status
    }
  }
`;
export const adminDownloadMerchantOrderPDFReceipt = /* GraphQL */ `
  query AdminDownloadMerchantOrderPDFReceipt($merchantOrderId: String) {
    adminDownloadMerchantOrderPDFReceipt(merchantOrderId: $merchantOrderId) {
      message
      status
    }
  }
`;
export const adminDownloadS3File = /* GraphQL */ `
  query AdminDownloadS3File($s3Path: String) {
    adminDownloadS3File(s3Path: $s3Path) {
      message
      s3Url
      status
    }
  }
`;
export const adminDownloadTextractDocument = /* GraphQL */ `
  query AdminDownloadTextractDocument($documentSource: String, $s3Key: String) {
    adminDownloadTextractDocument(
      documentSource: $documentSource
      s3Key: $s3Key
    ) {
      documentUrl
      message
      status
    }
  }
`;
export const adminGetAccountList = /* GraphQL */ `
  query AdminGetAccountList($merchantId: String) {
    adminGetAccountList(merchantId: $merchantId) {
      accountList {
        accountId
        accountName
        country
        createdAt
        createdBy
        merchantId
        smartEyeRecipient
        state
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetAnalytics = /* GraphQL */ `
  query AdminGetAnalytics(
    $currentPeriodEndDate: String
    $currentPeriodStartDate: String
    $limit: Int
    $merchantId: String
    $nextToken: String
    $prevPeriodEndDate: String
    $prevPeriodStartDate: String
    $reportType: String
    $salesChannel: String
  ) {
    adminGetAnalytics(
      currentPeriodEndDate: $currentPeriodEndDate
      currentPeriodStartDate: $currentPeriodStartDate
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      prevPeriodEndDate: $prevPeriodEndDate
      prevPeriodStartDate: $prevPeriodStartDate
      reportType: $reportType
      salesChannel: $salesChannel
    ) {
      currentPeriod {
        X
        Y
      }
      message
      onlineStoreConversion {
        increaseRate
        percentange
        type
      }
      previousPeriod {
        X
        Y
      }
      reportDetails {
        nextToken
        total
        totalSalesDetails {
          day
          discounts
          grossSale
          month
          netSales
          return
          shipping
          tax
          totalOrder
          totalSales
          year
        }
        totalSession {
          addToCart
          checkoutCart
          conversion
          day
          month
          totalSession
          year
        }
      }
      salesPerformanceOnSalesChannel {
        changes
        title
        value
      }
      status
      topResult {
        description
        title
        totalAmount
      }
    }
  }
`;
export const adminGetAutopilotEvent = /* GraphQL */ `
  query AdminGetAutopilotEvent($eventFlowId: String) {
    adminGetAutopilotEvent(eventFlowId: $eventFlowId) {
      autopilotEvent {
        createdAt
        createdBy
        eventFlowId
        eventType
        flow
        isDisabled
        merchantId
        title
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetBranch = /* GraphQL */ `
  query AdminGetBranch($branchId: String) {
    adminGetBranch(branchId: $branchId) {
      branch {
        address
        branchId
        branchName
        createdAt
        createdBy
        merchantId
        postalCode
        truckList
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetChatbotSetting = /* GraphQL */ `
  query AdminGetChatbotSetting {
    adminGetChatbotSetting {
      chatbotSetting {
        samplePrompts
        webchatColorCode
      }
      message
      status
    }
  }
`;
export const adminGetContactUsInfo = /* GraphQL */ `
  query AdminGetContactUsInfo($merchantId: String) {
    adminGetContactUsInfo(merchantId: $merchantId) {
      contactUsContent
      contactUsFormEnabled
      message
      status
      storeList {
        address
        city
        contactUsStoreId
        createdAt
        createdBy
        latitude
        longitude
        merchantId
        postalCode
        state
        storeCode
        storeId
        storeName
        updatedAt
        updatedBy
      }
    }
  }
`;
export const adminGetContactUsStore = /* GraphQL */ `
  query AdminGetContactUsStore($contactUsStoreId: String, $merchantId: String) {
    adminGetContactUsStore(
      contactUsStoreId: $contactUsStoreId
      merchantId: $merchantId
    ) {
      item {
        address
        city
        contactUsStoreId
        createdAt
        createdBy
        latitude
        longitude
        merchantId
        postalCode
        state
        storeCode
        storeId
        storeName
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetCustomOrder = /* GraphQL */ `
  query AdminGetCustomOrder($customOrderId: String, $merchantId: String) {
    adminGetCustomOrder(
      customOrderId: $customOrderId
      merchantId: $merchantId
    ) {
      cartItems {
        itemDescription
        itemId
        itemImage
        itemProperty
        itemTitle
        price
        quantity
      }
      customOrder {
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        checkoutLink
        createdAt
        createdBy
        customOrderId
        customerFirstName
        customerId
        customerLastName
        itemList {
          itemId
          itemProperty
          itemTitle
          quantity
          subtotal
          type
        }
        merchantId
        mobileNo
        noteToRider
        orderId
        orderNumber
        orderType
        salesAgentId
        shippingAddress
        shippingCity
        shippingCountry
        shippingPostalCode
        shippingState
        status
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetCustomer = /* GraphQL */ `
  query AdminGetCustomer(
    $customerId: String
    $limit: Int
    $merchantId: String
    $nextToken: String
  ) {
    adminGetCustomer(
      customerId: $customerId
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
    ) {
      accountNo
      address
      address2
      billingAddress
      billingCity
      billingCountry
      billingPostalCode
      billingState
      city
      country
      createdAt
      creditLimit
      creditLimitEnabled
      creditLimitHistory {
        actionType
        amount
        createdAt
        createdBy
        creditLimitHistoryId
        customerId
        merchantId
        orderNumber
        refundReason
        updatedAt
        updatedBy
      }
      customerId
      dateOfBirth
      firstName
      firstPurchasedDateTime
      gender
      isBlocked
      lastName
      lastPurchasedDateTime
      marketingConsent
      membershipPoint
      membershipPointExpiryDate
      membershipQrCode
      membershipTier
      message
      mobileNo
      nextToken
      postal
      postalCode
      primaryEmail
      race
      refreshToken
      secondaryEmail
      shippingAddress
      shippingCity
      shippingCountry
      shippingPostalCode
      shippingState
      smartTaggingNames
      state
      status
      taggingNames
      totalEarnedMembershipPoint
      totalItem
      totalOrders
      totalSpent
    }
  }
`;
export const adminGetCustomerCarts = /* GraphQL */ `
  query AdminGetCustomerCarts($customerId: String, $merchantId: String) {
    adminGetCustomerCarts(customerId: $customerId, merchantId: $merchantId) {
      customer {
        accountNo
        activated
        address
        address2
        city
        consentPersonalData
        country
        createdBy
        customerId
        dateOfBirth
        deviceEndpoint
        deviceToken
        emailSubcriptionStatus
        employmentStatus
        facebookID
        firstName
        gender
        hasCompletedProfile
        hasRewarded
        identityCard
        isBlocked
        isFacebook
        lastName
        lastPurchasedDateTime
        maritalStatus
        membershipPoint
        membershipPointExpiryDate
        membershipTier
        merchantId
        mobileNo
        nationality
        password
        personalIncomeLevel
        postal
        primaryEmail
        profilePicture
        qrCode
        race
        salesAgentId
        secondaryEmail
        signedUpDateTime
        smartTaggingNames
        state
        taggingNames
        totalSalesOrder
        totalSpent
        updatedBy
      }
      items {
        createdAt
        customOrderId
        customerCartId
        customerFirstName
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        errorMessage
        facebookLiveCampaignDetailId
        isFreeItem
        itemCode
        itemId
        itemImage
        itemProperty
        itemSku
        itemTitle
        itemUom
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        limitPerOrder
        mandatoryItem
        maxQuantity
        merchantId
        modifierSubtotal
        pickupCompareAtPrice
        pickupPrice
        pickupPriceWithoutTax
        quantity
        salesChannelName
        selectedModifierGroups {
          isItemsControlAvailable
          isSelected
          modifier {
            availableStatus
            isSelected
            modifierId
            modifierName
            price
          }
          modifierGroupId
          modifierGroupName
          modifierGroupType
          requestRemark
          selectionRangeMax
          selectionRangeMin
        }
        shippingWeight
        shippingWeightUnit
        storeId
        storeName
        subtotal
        subtotalCompareAtPrice
        subtotalWithTax
        timeslotEndDateTime
        timeslotStartDateTime
        type
        updatedAt
      }
      message
      status
    }
  }
`;
export const adminGetCustomerIssueDetail = /* GraphQL */ `
  query AdminGetCustomerIssueDetail(
    $customerId: String
    $issueId: String
    $issueType: String
  ) {
    adminGetCustomerIssueDetail(
      customerId: $customerId
      issueId: $issueId
      issueType: $issueType
    ) {
      issue {
        createdAt
        issueClosedDate
        issueId
        issueNumber
        issueStatus
        lastConversationSummary
        orderId
        orderNumber
        title
        updatedAt
      }
      issueDetail {
        imageList
        isCustomerMessage
        issueDetailDateTime
        issueDetailId
        message
        platform
        rating
        videoList
      }
      message
      status
      ticketUrl
    }
  }
`;
export const adminGetCustomerIssueList = /* GraphQL */ `
  query AdminGetCustomerIssueList($channel: String, $chatId: String) {
    adminGetCustomerIssueList(channel: $channel, chatId: $chatId) {
      feedback {
        channel
        createdAt
        createdBy
        customerId
        dateOfVisit
        description
        feedbackId
        hasNewMessage
        issueDetail {
          imageList
          isCustomerMessage
          issueDetailDateTime
          issueDetailId
          message
          platform
          rating
          videoList
        }
        issueNumber
        issueStatus
        jiraTicketNumber
        merchantId
        platform
        storeId
        storeName
        timeOfVisit
        title
        totalMessage
        updatedAt
        updatedBy
      }
      issue {
        assignee
        channel
        contactNumber
        createdAt
        createdBy
        customerId
        hasNewMessage
        issueClosedDate
        issueDateTime
        issueDetail {
          imageList
          isCustomerMessage
          issueDetailDateTime
          issueDetailId
          message
          platform
          rating
          videoList
        }
        issueId
        issueNumber
        issueStatus
        jiraTicketNumber
        merchantId
        orderId
        orderNumber
        platform
        title
        totalAmount
        totalMessage
        totalQuantity
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetCustomerOrderDetailList = /* GraphQL */ `
  query AdminGetCustomerOrderDetailList($merchantId: String, $orderId: String) {
    adminGetCustomerOrderDetailList(
      merchantId: $merchantId
      orderId: $orderId
    ) {
      isAdvancedOrderScheduleValid
      message
      order {
        ETACustomer
        ETAMerchant
        accumulatedRefundAmount
        actualDeliveryFee
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        cancelledBy
        cancelledReason
        createdAt
        createdBy
        customerAccountNo
        customerFirstName
        customerIP
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        deliveryAddress
        deliveryCity
        deliveryCountry
        deliveryDiscount
        deliveryLatitude
        deliveryLongitude
        deliveryMode
        deliveryNumber
        deliveryOrderDateTime
        deliveryOrderId
        deliveryPartnerName
        deliveryPostalCode
        deliveryState
        deliveryStatus
        deliveryType
        driverLatitude
        driverLongitude
        driverName
        driverPhoneNumber
        driverPlateNumber
        estimatedDeliveryFee
        grandTotal
        hasPreOrder
        image
        isAdvancedOrder
        isPreOrder
        isRefunded
        isReviewAvailable
        mainOrderId
        manualPaymentMethodName
        manualPaymentReceipt
        merchantId
        noteToRider
        orderCancellationDateTime
        orderCollectedDateTime
        orderCompletedDateTime
        orderDateTime
        orderId
        orderNumber
        orderType
        overallRating
        packageNumber
        partialFulfilmentAmount
        partialFulfilmentDiscount
        paymentDateTime
        paymentMethod
        paymentStatus
        paymentType
        pickupAddress
        pickupCity
        pickupCountry
        pickupPostalCode
        pickupState
        pointsCollectable
        promoCode
        promoCodeDiscount
        promoCodeId
        promoCodeTitle
        receiptFileName
        refundAmount
        refundCompleteDateTime
        refundReason
        remarks
        requiredCutlery
        salesAgentId
        salesChannelName
        scheduledDate
        scheduledDateTime
        scheduledTime
        sellerNote
        standardDeliveryAwb
        standardDeliveryAwbIdLink
        standardDeliveryTrackingUrl
        status
        storeAddress
        storeCode
        storeId
        storeName
        subtotal
        subtotalWithTax
        tableNumber
        taggingNames
        totalDiscount
        totalOrderItems
        totalPromoCodeDiscount
        totalRefundedAmount
        totalVoucherDiscount
        transactionId
        truckId
        truckName
        type
        updatedAt
        updatedBy
        voucherCode
        voucherDiscount
        voucherId
        voucherNumber
        voucherOrderId
        voucherRefunded
        voucherTitle
      }
      orderDetails {
        associatedProducts {
          productId
          productImage
          productSku
          productTitle
          productUOMId
          quantity
          variantName1
          variantName2
          variantName3
          variantValue1
          variantValue2
          variantValue3
        }
        comment
        compareAtPrice
        createdAt
        createdBy
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        description
        fulfilledQuantity
        isCancelledItem
        isFreeItem
        isPreOrder
        itemId
        itemImage
        itemIsVirtualGoods
        itemProperty
        itemSku
        itemStatus
        itemTitle
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        mandatoryItem
        manualPaymentReceipt
        merchantId
        orderDetailId
        orderId
        orderNumber
        orderedQuantity
        pickupCompareAtPrice
        pickupPrice
        pickupPriceWithTax
        price
        priceWithTax
        promoCode
        promoCodeDiscount
        rating
        redemptionCode
        refundQuantity
        selectedModifierGroups {
          isItemsControlAvailable
          isSelected
          modifier {
            availableStatus
            isSelected
            modifierId
            modifierName
            price
          }
          modifierGroupId
          modifierGroupName
          modifierGroupType
          requestRemark
          selectionRangeMax
          selectionRangeMin
        }
        subtotal
        subtotalWithTax
        timeslotEndDateTime
        timeslotStartDateTime
        totalDiscount
        totalPromoCodeDiscount
        totalVoucherDiscount
        updatedAt
        updatedBy
        voucherDiscount
        voucherNumber
      }
      scheduledDateTime
      status
    }
  }
`;
export const adminGetCustomerOrderList = /* GraphQL */ `
  query AdminGetCustomerOrderList(
    $customerId: String
    $merchantId: String
    $nextToken: Int
    $status: String
  ) {
    adminGetCustomerOrderList(
      customerId: $customerId
      merchantId: $merchantId
      nextToken: $nextToken
      status: $status
    ) {
      inStoreOrders {
        accountNo
        area
        createdAt
        createdBy
        duplicateRecords {
          accountNo
          area
          createdAt
          createdBy
          duplicateRecords {
            accountNo
            area
            createdAt
            createdBy
            duplicateRecords {
              accountNo
              area
              createdAt
              createdBy
              firstName
              hasDuplicateRecords
              inStoreOrderId
              lastName
              merchantId
              posTerminalNo
              receiptNo
              status
              storeArea
              storeName
              storeNo
              totalAmountSpent
              totalDiscountAmount
              totalPointsCollected
              totalPointsRedeemed
              totalVoucherDiscountAmount
              transactionDate
              transactionTime
              updatedAt
              updatedBy
            }
            firstName
            hasDuplicateRecords
            inStoreOrderId
            lastName
            merchantId
            posTerminalNo
            receiptNo
            status
            storeArea
            storeName
            storeNo
            totalAmountSpent
            totalDiscountAmount
            totalPointsCollected
            totalPointsRedeemed
            totalVoucherDiscountAmount
            transactionDate
            transactionTime
            updatedAt
            updatedBy
          }
          firstName
          hasDuplicateRecords
          inStoreOrderId
          lastName
          merchantId
          posTerminalNo
          receiptNo
          status
          storeArea
          storeName
          storeNo
          totalAmountSpent
          totalDiscountAmount
          totalPointsCollected
          totalPointsRedeemed
          totalVoucherDiscountAmount
          transactionDate
          transactionTime
          updatedAt
          updatedBy
        }
        firstName
        hasDuplicateRecords
        inStoreOrderId
        lastName
        merchantId
        posTerminalNo
        receiptNo
        status
        storeArea
        storeName
        storeNo
        totalAmountSpent
        totalDiscountAmount
        totalPointsCollected
        totalPointsRedeemed
        totalVoucherDiscountAmount
        transactionDate
        transactionTime
        updatedAt
        updatedBy
      }
      message
      nextToken
      orders {
        ETACustomer
        ETAMerchant
        accumulatedRefundAmount
        actualDeliveryFee
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        cancelledBy
        cancelledReason
        createdAt
        createdBy
        customerAccountNo
        customerFirstName
        customerIP
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        deliveryAddress
        deliveryCity
        deliveryCountry
        deliveryDiscount
        deliveryLatitude
        deliveryLongitude
        deliveryMode
        deliveryNumber
        deliveryOrderDateTime
        deliveryOrderId
        deliveryPartnerName
        deliveryPostalCode
        deliveryState
        deliveryStatus
        deliveryType
        driverLatitude
        driverLongitude
        driverName
        driverPhoneNumber
        driverPlateNumber
        estimatedDeliveryFee
        grandTotal
        hasPreOrder
        image
        isAdvancedOrder
        isPreOrder
        isRefunded
        isReviewAvailable
        mainOrderId
        manualPaymentMethodName
        manualPaymentReceipt
        merchantId
        noteToRider
        orderCancellationDateTime
        orderCollectedDateTime
        orderCompletedDateTime
        orderDateTime
        orderId
        orderNumber
        orderType
        overallRating
        packageNumber
        partialFulfilmentAmount
        partialFulfilmentDiscount
        paymentDateTime
        paymentMethod
        paymentStatus
        paymentType
        pickupAddress
        pickupCity
        pickupCountry
        pickupPostalCode
        pickupState
        pointsCollectable
        promoCode
        promoCodeDiscount
        promoCodeId
        promoCodeTitle
        receiptFileName
        refundAmount
        refundCompleteDateTime
        refundReason
        remarks
        requiredCutlery
        salesAgentId
        salesChannelName
        scheduledDate
        scheduledDateTime
        scheduledTime
        sellerNote
        standardDeliveryAwb
        standardDeliveryAwbIdLink
        standardDeliveryTrackingUrl
        status
        storeAddress
        storeCode
        storeId
        storeName
        subtotal
        subtotalWithTax
        tableNumber
        taggingNames
        totalDiscount
        totalOrderItems
        totalPromoCodeDiscount
        totalRefundedAmount
        totalVoucherDiscount
        transactionId
        truckId
        truckName
        type
        updatedAt
        updatedBy
        voucherCode
        voucherDiscount
        voucherId
        voucherNumber
        voucherOrderId
        voucherRefunded
        voucherTitle
      }
      status
      total
    }
  }
`;
export const adminGetCustomerWishList = /* GraphQL */ `
  query AdminGetCustomerWishList(
    $customerId: String
    $merchantId: String
    $nextToken: String
    $orderType: String
    $storeId: String
  ) {
    adminGetCustomerWishList(
      customerId: $customerId
      merchantId: $merchantId
      nextToken: $nextToken
      orderType: $orderType
      storeId: $storeId
    ) {
      message
      products {
        compareAtPrice
        createdAt
        createdBy
        customerId
        customerWishListId
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        itemId
        itemImage
        itemProperty
        itemSeoUrl
        itemSku
        itemTitle
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        merchantId
        pickupCompareAtPrice
        pickupPrice
        pickupPriceWithoutTax
        price
        priceWithoutTax
        productId
        salesChannelName
        updatedAt
        updatedBy
      }
      status
    }
  }
`;
export const adminGetDashboard = /* GraphQL */ `
  query AdminGetDashboard($dashboardId: String) {
    adminGetDashboard(dashboardId: $dashboardId) {
      dashboardEmbedUrl
      message
      status
    }
  }
`;
export const adminGetDeliveryTransitionLog = /* GraphQL */ `
  query AdminGetDeliveryTransitionLog($orderNumber: String) {
    adminGetDeliveryTransitionLog(orderNumber: $orderNumber) {
      items {
        createdAt
        createdBy
        deliveryNumber
        deliveryPartner
        deliveryTransitionLogId
        merchantId
        orderNumber
        status
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetDocumentAuditTrail = /* GraphQL */ `
  query AdminGetDocumentAuditTrail(
    $filter: DocumentAuditTrailFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminGetDocumentAuditTrail(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      extractedDocumentAuditLog {
        documentNo
        extractedDocumentId
        status
        updateHistory
        updatedAt
        updatedBy
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const adminGetDocumentColumnMapping = /* GraphQL */ `
  query AdminGetDocumentColumnMapping(
    $customFilter: DocumentColumnMappingFilter
    $filter: SearchDocumentColumnMappingsFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminGetDocumentColumnMapping(
      customFilter: $customFilter
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        actualValue
        alternativeValueList
        createdAt
        createdBy
        extractedDocumentColumnMappingId
        fieldNameList
        merchantId
        message
        status
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const adminGetDocumentListAndDetail = /* GraphQL */ `
  query AdminGetDocumentListAndDetail(
    $customFilter: DocumentDataFilter
    $filter: SearchDocumentsFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminGetDocumentListAndDetail(
      customFilter: $customFilter
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        approvedStatus
        conversionStatus
        createdAt
        createdBy
        data {
          formData {
            fieldName
            fieldValue
          }
          tableData {
            fieldName
            fieldValue
          }
        }
        documentDate
        documentNo
        documentType
        executionId
        extractedDocumentId
        extractedDocumentTemplateId
        formDetection {
          boundingBox {
            height
            left
            top
            width
          }
          confidence
          fieldName
          fieldValue
        }
        inputFileName
        inputS3Path
        isDuplicate
        merchantId
        message
        outputS3Path
        outputS3PathBatchCsv
        remark
        status
        tableDetection {
          boundingBox {
            height
            left
            top
            width
          }
          confidence
          fieldName
          fieldValue
        }
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const adminGetDocumentLookupAutoCompleteWords = /* GraphQL */ `
  query AdminGetDocumentLookupAutoCompleteWords(
    $additionalKeyColumns: [String]
    $extractedDocumentLookupId: String
    $keyColumn: String
    $limit: Int
    $lookupKeyword: String
  ) {
    adminGetDocumentLookupAutoCompleteWords(
      additionalKeyColumns: $additionalKeyColumns
      extractedDocumentLookupId: $extractedDocumentLookupId
      keyColumn: $keyColumn
      limit: $limit
      lookupKeyword: $lookupKeyword
    ) {
      lookupWordList {
        fieldName
        fieldValues
      }
      message
      status
    }
  }
`;
export const adminGetDownloadJobStatus = /* GraphQL */ `
  query AdminGetDownloadJobStatus($downloadJobId: String, $merchantId: String) {
    adminGetDownloadJobStatus(
      downloadJobId: $downloadJobId
      merchantId: $merchantId
    ) {
      message
      status
      url
    }
  }
`;
export const adminGetDynamicForm = /* GraphQL */ `
  query AdminGetDynamicForm($dynamicFormId: String) {
    adminGetDynamicForm(dynamicFormId: $dynamicFormId) {
      dynamicForm {
        createdAt
        createdBy
        dynamicFormId
        layout
        merchantId
        numberOfAnswer
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetDynamicFormAnswer = /* GraphQL */ `
  query AdminGetDynamicFormAnswer($dynamicFormAnswerId: String) {
    adminGetDynamicFormAnswer(dynamicFormAnswerId: $dynamicFormAnswerId) {
      dynamicFormAnswer {
        createdAt
        createdBy
        dynamicFormAnswerId
        dynamicFormId
        layout
        merchantId
        respondentEmail
        taggingNames
        updatedAt
        updatedBy
      }
      dynamicFormQuestion {
        createdAt
        createdBy
        dynamicFormId
        layout
        merchantId
        numberOfAnswer
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetEInvoiceDetail = /* GraphQL */ `
  query AdminGetEInvoiceDetail($domain: String, $eInvoiceId: String) {
    adminGetEInvoiceDetail(domain: $domain, eInvoiceId: $eInvoiceId) {
      adminStoreActivated
      customColumnMap {
        storeCode
      }
      invoiceLvlAdj
      items {
        additionalChargeAmount
        adjustmentAmount
        adjustmentStatus
        adjustmentType
        adminReason
        asCompany
        companyAddressLine
        companyCityName
        companyName
        companyPostalCode
        companyStateCode
        companyStateName
        companyTin
        createdAt
        createdBy
        currency
        customerReason
        discountAmount
        documentType
        eInvoiceId
        eInvoiceNo
        email
        errorMessages
        fullName
        idNumber
        idType
        isInAdjustment
        maxRejectCancelDocsDateTime
        merchantId
        orderDetails {
          additionalCharge
          adjustmentAmount
          description
          discount
          itemClass
          productId
          qty
          subtotal
          taxAmount
          totalPrice
          unitPrice
        }
        parentEInvoiceNo
        parentId
        pdfPath
        phoneNumber
        posType
        receiptNumber
        source
        sstRegistrationNumber
        status
        storeCode
        timeline {
          createdAt
          createdBy
          description
          merchantId
          timelineForId
          timelineId
          title
          type
          updatedAt
          updatedBy
        }
        totalAdjustmentAmount
        totalExcludingTax
        totalIncludingTax
        totalNetAmount
        totalPayableAmount
        totalTaxAmount
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetFacebookLiveCampaign = /* GraphQL */ `
  query AdminGetFacebookLiveCampaign(
    $facebookLiveCampaignId: String
    $merchantId: String
  ) {
    adminGetFacebookLiveCampaign(
      facebookLiveCampaignId: $facebookLiveCampaignId
      merchantId: $merchantId
    ) {
      createdAt
      createdBy
      embeddedHtmlLink
      facebookLiveCampaignDetails {
        associatedProducts {
          productId
          productImage
          productSku
          productTitle
          productUOMId
          quantity
          variantName1
          variantName2
          variantName3
          variantValue1
          variantValue2
          variantValue3
        }
        commentedQuantity
        createdAt
        createdBy
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        facebookLiveCampaignDetailId
        facebookLiveCampaignId
        hotkey
        itemId
        itemImage
        itemProperty
        itemSku
        itemTitle
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        merchantId
        productId
        quantity
        updatedAt
        updatedBy
      }
      facebookLiveCampaignId
      merchantId
      salesChannelName
      scheduleEndDateTime
      scheduleStartDateTime
      status
      storeId
      storeName
      title
      updatedAt
      updatedBy
    }
  }
`;
export const adminGetFacebookLiveMessageTemplate = /* GraphQL */ `
  query AdminGetFacebookLiveMessageTemplate($merchantId: String) {
    adminGetFacebookLiveMessageTemplate(merchantId: $merchantId) {
      merchantId
      messageList {
        facebookLiveComment
        facebookMessengerResponseOutOfStock
        facebookMessengerResponsePartialSuccess
        facebookMessengerResponseSuccess
      }
      status
    }
  }
`;
export const adminGetFacebookLiveSalesPerformance = /* GraphQL */ `
  query AdminGetFacebookLiveSalesPerformance(
    $facebookLiveCampaignId: String
    $merchantId: String
  ) {
    adminGetFacebookLiveSalesPerformance(
      facebookLiveCampaignId: $facebookLiveCampaignId
      merchantId: $merchantId
    ) {
      message
      status
      totalOrders
      totalSales
    }
  }
`;
export const adminGetFacebookTokenIndicator = /* GraphQL */ `
  query AdminGetFacebookTokenIndicator($merchantId: String) {
    adminGetFacebookTokenIndicator(merchantId: $merchantId) {
      message
      status
    }
  }
`;
export const adminGetFaq = /* GraphQL */ `
  query AdminGetFaq($faqId: String, $merchantId: String) {
    adminGetFaq(faqId: $faqId, merchantId: $merchantId) {
      item {
        answer
        createdAt
        createdBy
        faqCategory
        faqId
        faqType
        merchantId
        parentId
        question
        sequence
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetFaqCategory = /* GraphQL */ `
  query AdminGetFaqCategory($faqCategoryId: String, $merchantId: String) {
    adminGetFaqCategory(
      faqCategoryId: $faqCategoryId
      merchantId: $merchantId
    ) {
      item {
        childItems {
          answer
          createdAt
          createdBy
          faqCategory
          faqId
          faqType
          merchantId
          parentId
          question
          sequence
          updatedAt
          updatedBy
        }
        createdAt
        createdBy
        faqCategoryId
        merchantId
        sequence
        title
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetFilterTab = /* GraphQL */ `
  query AdminGetFilterTab($merchantId: String, $type: String) {
    adminGetFilterTab(merchantId: $merchantId, type: $type) {
      filterTabs {
        condition
        createdAt
        createdBy
        filterTabId
        merchantId
        title
        type
        updatedAt
        updatedBy
        userId
      }
    }
  }
`;
export const adminGetFoodMarketPlaceCustomerRevenueSegment = /* GraphQL */ `
  query AdminGetFoodMarketPlaceCustomerRevenueSegment(
    $marketPlaceChannel: String
    $numOfDays: Int
  ) {
    adminGetFoodMarketPlaceCustomerRevenueSegment(
      marketPlaceChannel: $marketPlaceChannel
      numOfDays: $numOfDays
    ) {
      customerSegmentsList {
        customerCount
        totalOrderCount
        totalOrderRevenue
      }
      marketPlaceChannel
      message
      status
    }
  }
`;
export const adminGetFoodMarketPlaceSmsCampaign = /* GraphQL */ `
  query AdminGetFoodMarketPlaceSmsCampaign(
    $foodMarketPlaceSmsCampaignId: String
  ) {
    adminGetFoodMarketPlaceSmsCampaign(
      foodMarketPlaceSmsCampaignId: $foodMarketPlaceSmsCampaignId
    ) {
      actualCustomers
      actualRevenue
      description
      foodMarketPlaceSmsCampaignId
      message
      promoCode
      roi
      smsScheduleDateTime
      smsText
      status
      targetCustomers
      targetRevenue
      title
    }
  }
`;
export const adminGetFoodMarketPlaceSmsCampaignList = /* GraphQL */ `
  query AdminGetFoodMarketPlaceSmsCampaignList {
    adminGetFoodMarketPlaceSmsCampaignList {
      foodMarketPlaceSmsCampaignList {
        customerSegmentIndex
        foodMarketPlaceSmsCampaignId
        smsScheduleDateTime
        status
        targetCustomers
        title
        updatedAt
      }
      message
    }
  }
`;
export const adminGetHomeCollection = /* GraphQL */ `
  query AdminGetHomeCollection($homeCollectionId: String, $merchantId: String) {
    adminGetHomeCollection(
      homeCollectionId: $homeCollectionId
      merchantId: $merchantId
    ) {
      homeCollection {
        collectionIcon
        collectionId
        collectionImage
        collectionName
        collectionSeoUrl
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        homeCollectionId
        homeCollectionType
        isDisabled
        merchantId
        sequence
        title
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetImportJobStatus = /* GraphQL */ `
  query AdminGetImportJobStatus($fileName: String) {
    adminGetImportJobStatus(fileName: $fileName) {
      errorFileKey
      errorMessage
      errorRecords
      fileName
      importJobId
      message
      status
      successfulUploads
      uploadStatus
    }
  }
`;
export const adminGetInStoreOrderDetail = /* GraphQL */ `
  query AdminGetInStoreOrderDetail($inStoreOrderId: String) {
    adminGetInStoreOrderDetail(inStoreOrderId: $inStoreOrderId) {
      inStoreOrder {
        accountNo
        area
        createdAt
        createdBy
        duplicateRecords {
          accountNo
          area
          createdAt
          createdBy
          duplicateRecords {
            accountNo
            area
            createdAt
            createdBy
            duplicateRecords {
              accountNo
              area
              createdAt
              createdBy
              firstName
              hasDuplicateRecords
              inStoreOrderId
              lastName
              merchantId
              posTerminalNo
              receiptNo
              status
              storeArea
              storeName
              storeNo
              totalAmountSpent
              totalDiscountAmount
              totalPointsCollected
              totalPointsRedeemed
              totalVoucherDiscountAmount
              transactionDate
              transactionTime
              updatedAt
              updatedBy
            }
            firstName
            hasDuplicateRecords
            inStoreOrderId
            lastName
            merchantId
            posTerminalNo
            receiptNo
            status
            storeArea
            storeName
            storeNo
            totalAmountSpent
            totalDiscountAmount
            totalPointsCollected
            totalPointsRedeemed
            totalVoucherDiscountAmount
            transactionDate
            transactionTime
            updatedAt
            updatedBy
          }
          firstName
          hasDuplicateRecords
          inStoreOrderId
          lastName
          merchantId
          posTerminalNo
          receiptNo
          status
          storeArea
          storeName
          storeNo
          totalAmountSpent
          totalDiscountAmount
          totalPointsCollected
          totalPointsRedeemed
          totalVoucherDiscountAmount
          transactionDate
          transactionTime
          updatedAt
          updatedBy
        }
        firstName
        hasDuplicateRecords
        inStoreOrderId
        lastName
        merchantId
        posTerminalNo
        receiptNo
        status
        storeArea
        storeName
        storeNo
        totalAmountSpent
        totalDiscountAmount
        totalPointsCollected
        totalPointsRedeemed
        totalVoucherDiscountAmount
        transactionDate
        transactionTime
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetItemQuantityForSales = /* GraphQL */ `
  query AdminGetItemQuantityForSales(
    $itemId: String
    $itemProperty: String
    $merchantId: String
  ) {
    adminGetItemQuantityForSales(
      itemId: $itemId
      itemProperty: $itemProperty
      merchantId: $merchantId
    ) {
      itemId
      message
      quantityForSales
      status
    }
  }
`;
export const adminGetLandingPageBanner = /* GraphQL */ `
  query AdminGetLandingPageBanner(
    $landingPageBannerId: String
    $merchantId: String
  ) {
    adminGetLandingPageBanner(
      landingPageBannerId: $landingPageBannerId
      merchantId: $merchantId
    ) {
      landingPageBanner {
        buttonActionValue
        detailPageImage
        effectiveEndDateTime
        effectiveStartDateTime
        homeImage
        isDisabled
        landingPageBannerId
        merchantId
        sequence
        title
      }
      message
      status
    }
  }
`;
export const adminGetLazadaProductSpec = /* GraphQL */ `
  query AdminGetLazadaProductSpec(
    $merchantId: String
    $parentId: String
    $storeId: String
    $type: String
  ) {
    adminGetLazadaProductSpec(
      merchantId: $merchantId
      parentId: $parentId
      storeId: $storeId
      type: $type
    ) {
      message
      products {
        actualName
        hasChildren
        inputType
        isRequired
        parentId
        type
        typeId
        typeName
        typeValues {
          valueEnglishName
          valueId
          valueName
          valueUnit
        }
      }
      status
    }
  }
`;
export const adminGetLegalPolicy = /* GraphQL */ `
  query AdminGetLegalPolicy($merchantId: String) {
    adminGetLegalPolicy(merchantId: $merchantId) {
      legalPolicies {
        createdAt
        createdBy
        isDisabled
        merchantId
        policyContent
        policyType
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetLookupDetail = /* GraphQL */ `
  query AdminGetLookupDetail(
    $filter: SearchLookupDetailFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminGetLookupDetail(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        extractedDocumentLookupDetailId
        headers
        values
      }
      nextToken
      total
    }
  }
`;
export const adminGetMembershipSetting = /* GraphQL */ `
  query AdminGetMembershipSetting {
    adminGetMembershipSetting {
      membershipPointExpiryType
      membershipPointExpiryValue
      membershipTierActivated
      message
      multiplier
      pointConversionId
      spent
      status
    }
  }
`;
export const adminGetMerchantAboutUs = /* GraphQL */ `
  query AdminGetMerchantAboutUs($merchantId: String) {
    adminGetMerchantAboutUs(merchantId: $merchantId) {
      aboutUsBanner
      aboutUsDescription
      message
      status
    }
  }
`;
export const adminGetMerchantAccessList = /* GraphQL */ `
  query AdminGetMerchantAccessList {
    adminGetMerchantAccessList {
      accountList {
        accountId
        accountName
        merchantId
      }
      message
      status
      storeList {
        merchantId
        name
        storeId
      }
      userGroupList {
        merchantId
        userGroupId
        userGroupName
      }
    }
  }
`;
export const adminGetMerchantBusinessInfo = /* GraphQL */ `
  query AdminGetMerchantBusinessInfo {
    adminGetMerchantBusinessInfo {
      companyAddress
      companyEmail
      companyName
      message
      status
    }
  }
`;
export const adminGetMerchantDepartmentMessageOverview = /* GraphQL */ `
  query AdminGetMerchantDepartmentMessageOverview {
    adminGetMerchantDepartmentMessageOverview {
      merchantDepartment {
        departmentName
        merchantDepartmentId
        smsQuota
        smsUsage
      }
      message
      smsCampaign {
        departmentName
        smsUsage
        userId
        userName
      }
      status
    }
  }
`;
export const adminGetMerchantEInvoiceInfo = /* GraphQL */ `
  query AdminGetMerchantEInvoiceInfo {
    adminGetMerchantEInvoiceInfo {
      companyAddressLine
      companyCityName
      companyName
      companyPostalCode
      companyStateName
      companyTin
      companyTourismTaxRegistrationNumber
      countryCode
      descriptionSellerActivity
      email
      environment
      idNumber
      idType
      industryClassificationCode
      lhdnInformation {
        clientId
        clientSecret1
        clientSecret2
        digicertExist
        digicertPin
      }
      logo
      notificationEmail
      phoneNumber
      qbInformation {
        qbClientId
        qbClientSecret
      }
      sstRegistrationNumber
    }
  }
`;
export const adminGetMerchantGeneralConfig = /* GraphQL */ `
  query AdminGetMerchantGeneralConfig($merchantId: String) {
    adminGetMerchantGeneralConfig(merchantId: $merchantId) {
      address
      advancedOrderEnabled
      currency
      domain
      footerDescription
      freeConversationLimit
      kycBusinessAddress
      kycNRIC
      kycNRICName
      latitude
      longitude
      maxAdvancedOrderDay
      merchantRegistrationNumber
      message
      name
      notificationEmail
      orderOption
      ownerEmail
      ownerPhone
      paidConversationLimit
      preferredLanguage
      senderEmail
      status
      storeAddress
      storeOpenCloseHours {
        close
        day
        enabled
        endingTimeAfterMidnight
        open
      }
      tax
      warungDeliveryStoreInfo
      warungStoreStatus
      webQrCode
      whatsappNo
    }
  }
`;
export const adminGetMerchantGeneralConfigAndSiteAnalytics = /* GraphQL */ `
  query AdminGetMerchantGeneralConfigAndSiteAnalytics($merchantId: String) {
    adminGetMerchantGeneralConfigAndSiteAnalytics(merchantId: $merchantId) {
      effectiveEndDate
      effectiveStartDate
      facebookPixelId
      favicon
      googleAnalyticsId
      logo
      message
      notificationMessage
      seoDescription
      seoTitle
      status
    }
  }
`;
export const adminGetMerchantPaymentConfig = /* GraphQL */ `
  query AdminGetMerchantPaymentConfig($merchantId: String) {
    adminGetMerchantPaymentConfig(merchantId: $merchantId) {
      manualPayment {
        TNGPaymentLink
        accountNumber
        bankAccountName
        isBankTransfer
        isDisabled
        manualPaymentMethodName
        manualPaymentOptionsId
        merchantId
        paymentInstructions
        qrCode
      }
      message
      onBoardRole
      paymentGateway {
        companyName
        isDisabled
        serviceId
        servicePassword
      }
      status
    }
  }
`;
export const adminGetMerchantShippingCreditBalance = /* GraphQL */ `
  query AdminGetMerchantShippingCreditBalance($merchantId: String) {
    adminGetMerchantShippingCreditBalance(merchantId: $merchantId) {
      message
      shippingCreditBalance
      status
    }
  }
`;
export const adminGetMerchantShippingCreditBalanceAndTransactions = /* GraphQL */ `
  query AdminGetMerchantShippingCreditBalanceAndTransactions(
    $limit: Int
    $merchantId: String
    $nextToken: String
  ) {
    adminGetMerchantShippingCreditBalanceAndTransactions(
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
    ) {
      items {
        actionType
        amount
        createdAt
        createdBy
        merchantCreditTransactionId
        merchantId
        merchantOrderId
        orderNumber
        refundReason
      }
      message
      nextToken
      shippingCreditBalance
      status
      total
    }
  }
`;
export const adminGetMerchantSiteFontAndColor = /* GraphQL */ `
  query AdminGetMerchantSiteFontAndColor($merchantId: String) {
    adminGetMerchantSiteFontAndColor(merchantId: $merchantId) {
      copyright
      facebookName
      facebookUrl
      googlePlayUrl
      instagramName
      instagramUrl
      linkedInName
      linkedInUrl
      logo
      message
      playStoreUrl
      siteColor
      siteFont
      status
      tiktokName
      tiktokUrl
      twitterName
      twitterUrl
      youtubeName
      youtubeUrl
    }
  }
`;
export const adminGetModuleList = /* GraphQL */ `
  query AdminGetModuleList {
    adminGetModuleList {
      message
      moduleList {
        module
        subModule {
          children
          title
        }
      }
      status
    }
  }
`;
export const adminGetNotificationBarMessage = /* GraphQL */ `
  query AdminGetNotificationBarMessage($merchantId: String) {
    adminGetNotificationBarMessage(merchantId: $merchantId) {
      notificationMessage
    }
  }
`;
export const adminGetNotificationSetting = /* GraphQL */ `
  query AdminGetNotificationSetting($merchantId: String, $type: String) {
    adminGetNotificationSetting(merchantId: $merchantId, type: $type) {
      callbackEvent
      callbackUrl
      createdAt
      createdBy
      emailBody
      emailSubject
      merchantId
      notificationSettingId
      status
      type
      updatedAt
      updatedBy
    }
  }
`;
export const adminGetNotificationSettingStatus = /* GraphQL */ `
  query AdminGetNotificationSettingStatus($merchantId: String) {
    adminGetNotificationSettingStatus(merchantId: $merchantId) {
      message
      notificationSettingList {
        callbackEvent
        callbackUrl
        createdAt
        createdBy
        emailBody
        emailSubject
        merchantId
        notificationSettingId
        status
        type
        updatedAt
        updatedBy
      }
      status
    }
  }
`;
export const adminGetOrderPrintDetails = /* GraphQL */ `
  query AdminGetOrderPrintDetails(
    $merchantId: String
    $orderId: [String]
    $storeName: String
    $type: String
  ) {
    adminGetOrderPrintDetails(
      merchantId: $merchantId
      orderId: $orderId
      storeName: $storeName
      type: $type
    ) {
      message
      orders {
        AWBRef
        barcode
        billingAddress
        currency
        deliveryAddressType
        deliveryCode
        deliveryDiscount
        deliveryNumber
        deliveryOrderDateTime
        deliveryType
        estimatedDeliveryFee
        grandTotal
        invoiceNo
        issueDateTime
        merchantEmail
        merchantName
        officeRemarks
        orderDateTime
        orderId
        orderItems {
          associatedProducts {
            productId
            productImage
            productSku
            productTitle
            productUOMId
            quantity
            variantName1
            variantName2
            variantName3
            variantValue1
            variantValue2
            variantValue3
          }
          comment
          compareAtPrice
          createdAt
          createdBy
          deliveryCompareAtPrice
          deliveryPrice
          deliveryPriceWithTax
          description
          fulfilledQuantity
          isCancelledItem
          isFreeItem
          isPreOrder
          itemId
          itemImage
          itemIsVirtualGoods
          itemProperty
          itemSku
          itemStatus
          itemTitle
          itemVariantName1
          itemVariantName2
          itemVariantName3
          itemVariantValue1
          itemVariantValue2
          itemVariantValue3
          mandatoryItem
          manualPaymentReceipt
          merchantId
          orderDetailId
          orderId
          orderNumber
          orderedQuantity
          pickupCompareAtPrice
          pickupPrice
          pickupPriceWithTax
          price
          priceWithTax
          promoCode
          promoCodeDiscount
          rating
          redemptionCode
          refundQuantity
          selectedModifierGroups {
            isItemsControlAvailable
            isSelected
            modifier {
              availableStatus
              isSelected
              modifierId
              modifierName
              price
            }
            modifierGroupId
            modifierGroupName
            modifierGroupType
            requestRemark
            selectionRangeMax
            selectionRangeMin
          }
          subtotal
          subtotalWithTax
          timeslotEndDateTime
          timeslotStartDateTime
          totalDiscount
          totalPromoCodeDiscount
          totalVoucherDiscount
          updatedAt
          updatedBy
          voucherDiscount
          voucherNumber
        }
        parcelInfo
        paymentAmount
        paymentType
        portCode
        printDateTime
        promoCode
        promoCodeDiscount
        promoCodeTitle
        recipientInfo {
          address
          name
          phone
        }
        remarks
        salesChannelName
        sellerRemarks
        senderInfo {
          merchantAddress
          merchantName
          merchantPhone
        }
        shippingAddress
        status
        storeAddress
        storeName
        subtotal
        subtotalWithTax
        totalOrderItems
        type
        weight
      }
      status
    }
  }
`;
export const adminGetPriceGroup = /* GraphQL */ `
  query AdminGetPriceGroup($priceGroupId: String) {
    adminGetPriceGroup(priceGroupId: $priceGroupId) {
      createdAt
      createdBy
      delivery
      increment
      incrementType
      merchantId
      name
      pickUp
      priceGroupId
      stores {
        storeCode
        storeId
        storeName
      }
      updatedAt
      updatedBy
    }
  }
`;
export const adminGetProduct = /* GraphQL */ `
  query AdminGetProduct($merchantId: String, $productId: String) {
    adminGetProduct(merchantId: $merchantId, productId: $productId) {
      message
      product {
        code
        collectionNames
        cover
        createdAt
        createdBy
        deliveryCompareAtPrice
        deliveryCostPerItem
        deliveryPrice
        deliveryPriceWithTax
        description
        effectiveEndDateTime
        effectiveStartDateTime
        hasVariant
        image
        isDisabled
        isPreOrder
        isVirtualGoods
        merchantId
        modifierProduct
        noOfPurchases
        noOfViews
        pickupCompareAtPrice
        pickupCostPerItem
        pickupPrice
        pickupPriceWithTax
        platform
        productId
        promotionEndDateTime
        promotionStartDateTime
        sellOnFacebookStore
        sellOnFoodPanda
        sellOnGrabFood
        sellOnGrabMart
        sellOnInstagram
        sellOnLazada
        sellOnOfflineStore
        sellOnOnlineStore
        sellOnPandaMart
        sellOnShopee
        seoDescription
        seoTitle
        seoUrl
        taggingNames
        thumbnailCover
        timeslotType
        timeslots {
          effectiveEndDate
          effectiveEndTime
          effectiveStartDate
          effectiveStartTime
        }
        title
        updatedAt
        updatedBy
        variantName1
        variantName2
        variantName3
        variantValues1
        variantValues2
        variantValues3
        video
        virtualGoodsExpiredAt
        virtualGoodsExpiryDays
      }
      status
    }
  }
`;
export const adminGetProductBundle = /* GraphQL */ `
  query AdminGetProductBundle($merchantId: String, $productBundleId: String) {
    adminGetProductBundle(
      merchantId: $merchantId
      productBundleId: $productBundleId
    ) {
      barcode
      collectionNames
      cover
      deliveryCompareAtPrice
      deliveryCostPerItem
      deliveryPrice
      deliveryPriceWithTax
      description
      effectiveEndDateTime
      effectiveStartDateTime
      image
      isDisabled
      isProductBundleTaxable
      merchantId
      message
      pickupCompareAtPrice
      pickupCostPerItem
      pickupPrice
      pickupPriceWithTax
      productBundleDetails {
        merchantId
        productBundleDetailId
        productBundleId
        productId
        productImage
        productSku
        productTitle
        productUOMId
        quantity
        updatedAt
        updatedBy
        variantName1
        variantName2
        variantName3
        variantValue1
        variantValue2
        variantValue3
      }
      productBundleId
      productBundlePricing {
        salesChannelName
        storeProducts {
          compareAtPrice
          createdAt
          createdBy
          deliveryCompareAtPrice
          deliveryCostPerItem
          deliveryPrice
          deliveryPriceWithTax
          isDisabled
          marketPlaceAttributes {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceBrand {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceCategories {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceProductCode
          marketPlaceProductUOMCode
          merchantId
          noOfPurchases
          pickupCompareAtPrice
          pickupCostPerItem
          pickupPrice
          pickupPriceWithTax
          price
          priceWithTax
          quantityForSales
          quantityType
          salesChannelName
          storeId
          storeName
          storeProductId
          updatedAt
          updatedBy
        }
      }
      promotionEndDateTime
      promotionStartDateTime
      quantityForSales
      sellOnFacebookStore
      sellOnFoodPanda
      sellOnGrabFood
      sellOnGrabMart
      sellOnInstagram
      sellOnLazada
      sellOnOfflineStore
      sellOnOnlineStore
      sellOnPandaMart
      sellOnShopee
      seoDescription
      seoTitle
      seoUrl
      shippingDimensionHeight
      shippingDimensionLength
      shippingDimensionWidth
      shippingWeight
      shippingWeightUnit
      sku
      status
      taggingNames
      title
      totalStockQuantity
    }
  }
`;
export const adminGetProductBundleNames = /* GraphQL */ `
  query AdminGetProductBundleNames(
    $merchantId: String
    $productIdList: [String]
  ) {
    adminGetProductBundleNames(
      merchantId: $merchantId
      productIdList: $productIdList
    ) {
      message
      productBundleNames
      status
    }
  }
`;
export const adminGetProductCollection = /* GraphQL */ `
  query AdminGetProductCollection(
    $merchantId: String
    $productCollectionId: String
  ) {
    adminGetProductCollection(
      merchantId: $merchantId
      productCollectionId: $productCollectionId
    ) {
      banner
      condition
      conditionType
      createdAt
      createdBy
      description
      icon
      merchantId
      name
      productCollectionId
      seoDescription
      seoTitle
      seoUrl
      taggingNames
      type
      updatedAt
      updatedBy
    }
  }
`;
export const adminGetProductInventory = /* GraphQL */ `
  query AdminGetProductInventory($merchantId: String, $productId: String) {
    adminGetProductInventory(merchantId: $merchantId, productId: $productId) {
      items {
        productUOMs {
          barcode
          collectionNames
          deliveryCompareAtPrice
          deliveryCostPerItem
          deliveryEffectiveEndDateTime
          deliveryEffectiveStartDateTime
          deliveryPrice
          deliveryPriceWithTax
          estimatedRestock
          image
          incomingQuantity
          isDisabled
          isNewArrival
          isPreOrder
          isProductTaxable
          isVirtualGoods
          marketPlaceAttributes {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceBrand {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceCategories {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceProductCode
          marketPlaceProductUOMCode
          marketPlaceShippingPartner
          merchantId
          modifierGroups {
            isItemsControlAvailable
            isSelected
            modifier {
              availableStatus
              isSelected
              modifierId
              modifierName
              price
            }
            modifierGroupId
            modifierGroupName
            modifierGroupType
            requestRemark
            selectionRangeMax
            selectionRangeMin
          }
          newArrivalDate
          noOfPurchases
          packageSize
          pickupCompareAtPrice
          pickupCostPerItem
          pickupEffectiveEndDateTime
          pickupEffectiveStartDateTime
          pickupPrice
          pickupPriceWithTax
          preOrderReservedQuantity
          productId
          productTitle
          productUOMId
          productUOMPricingId
          quantityBundleForSales
          quantityForSales
          quantityType
          salesChannelName
          shippingDimensionHeight
          shippingDimensionLength
          shippingDimensionWidth
          shippingWeight
          shippingWeightUnit
          sku
          skuLimitPerDay
          storeId
          storeName
          storeProductId
          taggingNames
          totalStockQuantity
          trackQuantity
          updatedAt
          updatedBy
          variantName1
          variantName2
          variantName3
          variantValue1
          variantValue2
          variantValue3
          virtualGoodsExpiredAt
          virtualGoodsExpiryDays
        }
        salesChannelName
      }
      message
      status
      updatedAt
      updatedBy
    }
  }
`;
export const adminGetPromoCodeCampaign = /* GraphQL */ `
  query AdminGetPromoCodeCampaign(
    $merchantId: String
    $promoCodeCampaignId: String
  ) {
    adminGetPromoCodeCampaign(
      merchantId: $merchantId
      promoCodeCampaignId: $promoCodeCampaignId
    ) {
      items {
        activeCount
        category
        createdBy
        customerCondition
        deliveryDiscountType
        discountAmountCap
        discountOnProductValue
        discountQuantityCap
        effectiveEndDateTime
        effectiveStartDateTime
        isDisabled
        maxUserUsageLimit
        merchantId
        minimumCondition
        minimumPurchase
        minimumQuantity
        orderType
        productConditions {
          ids {
            collectionName
            productBundleId
            productId
            productUOMId
          }
          type
        }
        productsDiscount {
          ids {
            collectionName
            productBundleId
            productId
            productUOMId
          }
          type
        }
        promoCode
        promoCodeCampaignId
        remainingUsage
        specificCustomerTag
        specificCustomers
        status
        stores
        title
        totalUsageLimit
        type
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetPromotionalWidget = /* GraphQL */ `
  query AdminGetPromotionalWidget($promotionalWidgetId: String) {
    adminGetPromotionalWidget(promotionalWidgetId: $promotionalWidgetId) {
      message
      promotionalWidget {
        createdAt
        createdBy
        merchantId
        promotionalWidgetId
        updatedAt
        updatedBy
        widgetName
        widgetUrl
      }
      status
    }
  }
`;
export const adminGetPushNotification = /* GraphQL */ `
  query AdminGetPushNotification($notificationCampaignId: String) {
    adminGetPushNotification(notificationCampaignId: $notificationCampaignId) {
      message
      notification {
        actionId
        actionType
        body
        createdAt
        createdBy
        image
        listOfCustomer
        merchantId
        notificationCampaignId
        scheduledDateTime
        showToNewUser
        targetAudience {
          csvFilePath
          csvLastUpdated
          method
          numberOfAudience
        }
        title
        updatedAt
        updatedBy
      }
      selectedItem {
        itemId
        itemImage
        itemProperty
        itemTitle
      }
      status
    }
  }
`;
export const adminGetSMSConfigDetail = /* GraphQL */ `
  query AdminGetSMSConfigDetail($smsCampaignId: String) {
    adminGetSMSConfigDetail(smsCampaignId: $smsCampaignId) {
      createdAt
      createdBy
      csvS3Key
      listOfCustomerPhoneNumber
      listOfSelectedSmartTags
      mediaContent
      mediaType
      merchantDepartmentId
      merchantId
      message
      platform
      reply
      saveTemplate
      selectedTemplateId
      smsCampaignId
      smsScheduleDateTime
      smsText
      smsTopic
      status
      updatedAt
      updatedBy
    }
  }
`;
export const adminGetSMSConfigList = /* GraphQL */ `
  query AdminGetSMSConfigList {
    adminGetSMSConfigList {
      smsCampaignList {
        createdAt
        createdBy
        csvS3Key
        listOfCustomerPhoneNumber
        listOfSelectedSmartTags
        mediaContent
        mediaType
        merchantDepartmentId
        merchantId
        message
        platform
        reply
        saveTemplate
        selectedTemplateId
        smsCampaignId
        smsScheduleDateTime
        smsText
        smsTopic
        status
        updatedAt
        updatedBy
      }
    }
  }
`;
export const adminGetSalesAgent = /* GraphQL */ `
  query AdminGetSalesAgent($salesAgentId: String) {
    adminGetSalesAgent(salesAgentId: $salesAgentId) {
      message
      salesAgent {
        createdAt
        createdBy
        customOrderEnabled
        firstName
        lastName
        maxCreditLimit
        merchantId
        salesAgentId
        updatedAt
        updatedBy
        username
      }
      status
    }
  }
`;
export const adminGetSalesChannelSetting = /* GraphQL */ `
  query AdminGetSalesChannelSetting(
    $merchantId: String
    $salesChannelId: String
    $salesChannelName: String
    $storeId: String
  ) {
    adminGetSalesChannelSetting(
      merchantId: $merchantId
      salesChannelId: $salesChannelId
      salesChannelName: $salesChannelName
      storeId: $storeId
    ) {
      isDisabled
      message
      status
      storeCode
      storeId
      storeName
      syncFrequency
    }
  }
`;
export const adminGetShopeeAWB = /* GraphQL */ `
  query AdminGetShopeeAWB(
    $merchantId: String
    $orderNumber: String
    $packageNumber: String
    $storeId: String
    $trackingNo: String
  ) {
    adminGetShopeeAWB(
      merchantId: $merchantId
      orderNumber: $orderNumber
      packageNumber: $packageNumber
      storeId: $storeId
      trackingNo: $trackingNo
    ) {
      AWBUrl
      message
      status
    }
  }
`;
export const adminGetShopeeDeliveryPartner = /* GraphQL */ `
  query AdminGetShopeeDeliveryPartner($merchantId: String, $storeId: String) {
    adminGetShopeeDeliveryPartner(merchantId: $merchantId, storeId: $storeId) {
      delivery_partner_list {
        cod_enabled
        enabled
        fee_type
        force_enable
        item_max_dimension {
          dimension_sum
          height
          length
          unit
          width
        }
        logistics_channel_id
        logistics_channel_name
        logistics_description
        mask_channel_id
        preferred
        size_list
        volume_limit {
          item_max_volume
          item_min_volume
        }
        weight_limit {
          item_max_weight
          item_min_weight
        }
      }
      message
      status
    }
  }
`;
export const adminGetShopeeProductSpec = /* GraphQL */ `
  query AdminGetShopeeProductSpec(
    $merchantId: String
    $parentId: String
    $storeId: String
    $type: String
  ) {
    adminGetShopeeProductSpec(
      merchantId: $merchantId
      parentId: $parentId
      storeId: $storeId
      type: $type
    ) {
      message
      products {
        actualName
        hasChildren
        inputType
        isRequired
        parentId
        type
        typeId
        typeName
        typeValues {
          valueEnglishName
          valueId
          valueName
          valueUnit
        }
      }
      status
    }
  }
`;
export const adminGetSiteNavigation = /* GraphQL */ `
  query AdminGetSiteNavigation($merchantId: String, $siteNavigationId: String) {
    adminGetSiteNavigation(
      merchantId: $merchantId
      siteNavigationId: $siteNavigationId
    ) {
      message
      selectedItem {
        itemId
        itemImage
        itemProperty
        itemTitle
      }
      siteNavigation {
        childItems {
          childItems {
            childItems {
              createdAt
              createdBy
              effectiveEndDateTime
              effectiveStartDateTime
              isDisabled
              linkValue
              menuType
              merchantId
              navigationType
              openNewTab
              parentId
              sequence
              siteNavigationId
              title
              updatedAt
              updatedBy
            }
            createdAt
            createdBy
            effectiveEndDateTime
            effectiveStartDateTime
            isDisabled
            linkValue
            menuType
            merchantId
            navigationType
            openNewTab
            parentId
            sequence
            siteNavigationId
            title
            updatedAt
            updatedBy
          }
          createdAt
          createdBy
          effectiveEndDateTime
          effectiveStartDateTime
          isDisabled
          linkValue
          menuType
          merchantId
          navigationType
          openNewTab
          parentId
          sequence
          siteNavigationId
          title
          updatedAt
          updatedBy
        }
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        isDisabled
        linkValue
        menuType
        merchantId
        navigationType
        openNewTab
        parentId
        sequence
        siteNavigationId
        title
        updatedAt
        updatedBy
      }
      status
    }
  }
`;
export const adminGetSmartTagging = /* GraphQL */ `
  query AdminGetSmartTagging($smartTaggingId: String) {
    adminGetSmartTagging(smartTaggingId: $smartTaggingId) {
      message
      smartTagging {
        condition {
          numberOfPurchase
        }
        createdAt
        createdBy
        listOfAssociatedProducts {
          ids
          itemCover
          itemId
          itemTitle
          itemType
        }
        merchantId
        promptText
        smartTaggingId
        tagName
        totalListOfAssociatedProducts
        updatedAt
        updatedBy
      }
      status
    }
  }
`;
export const adminGetSmartVoucherCampaign = /* GraphQL */ `
  query AdminGetSmartVoucherCampaign($smartVoucherCampaignId: String) {
    adminGetSmartVoucherCampaign(
      smartVoucherCampaignId: $smartVoucherCampaignId
    ) {
      message
      smartVoucherCampaign {
        campaignDetail {
          actualTargetCustomers
          assumptionConversion
          campaignMessage
          creditRequired
          customerList {
            customerId
            firstName
            lastPurchasedDateTime
            mobileNo
          }
          estimateRevenueSplitAmt
          estimateRevenueSplitRatio
          gptPrompt
          inputFrequencySegment {
            endDate
            noOfOrders
            startDate
          }
          inputMonetaryValue
          inputRecencyValue
          isPersonalizedMsg
          isTemplateMsg
          merchantId
          previewCustomer {
            firstName
            frequentPurchasedProduct
            lastName
            lastTransactionDate
            lastTransactionProduct
            lastTransactionStore
          }
          previewCustomerMsg {
            campaignMessage
            firstName
            lastName
            selectedDataTrack
          }
          previewMsg
          selectedDemographics {
            ageFrom
            ageTo
            gender
            joinedFrom
            joinedTo
            membershipTier {
              membershipTierId
              title
            }
          }
          selectedTags {
            smartTaggingId
            tagName
            taggingId
          }
          smartVoucherCampaignDetailId
          smartVoucherCampaignId
          smsTemplateId
          stepFunctionExecutionId
          targetCustomerSpending
          totalCustomerParticipated
          totalRevenueEarned
          totalTargetCustomer
          voucherDiscount
          voucherMinSpend
        }
        campaignTitle
        campaignTotalCustomerParticipated
        campaignTotalTargetCustomer
        comparisonType
        createdAt
        createdBy
        customerType
        errorFileKey
        estimatedCost
        estimatedRevenue
        merchantId
        messageStatus
        msgScheduleDateTime
        revenueSplit
        s3FileKey
        smartVoucherCampaignId
        stepFunctionExecutionId
        totalCampaignOptOutCustomers
        totalCustomers
        totalExistingCustomers
        totalFilteredCustomers
        updatedAt
        updatedBy
        voucherExpiryDate
      }
      status
    }
  }
`;
export const adminGetSmsTemplate = /* GraphQL */ `
  query AdminGetSmsTemplate($smsTemplateId: String) {
    adminGetSmsTemplate(smsTemplateId: $smsTemplateId) {
      item {
        createdAt
        createdBy
        merchantDepartmentId
        merchantId
        smsTemplateId
        smsText
        templateEmailBody {
          button
          divider
          emailText
          link
          media {
            mediaContent
            mediaType
          }
        }
        templateEmailDesign {
          buttonDesign {
            buttonColor
            buttonFontFamily
            buttonFontSize
            buttonRadius
            buttonTextColor
          }
          dividersDesign {
            dividerColor
            dividerHeight
            dividerStyle
          }
          linkDesign {
            linkColor
            linkFontFamily
            linkFontSize
            linkTextStyle
          }
          template {
            backgroundColor
            bodyColor
          }
          textStyles {
            heading1Color
            heading1FontFamily
            heading1FontSize
            heading2Color
            heading2FontFamily
            heading2FontSize
            paragraphFontFamily
            paragraphFontSize
            parapgraphColor
          }
        }
        templateEmailHtml
        templateMediaContent
        templateMediaType
        templateName
        templateStatus
        templateType
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const adminGetSplashScreen = /* GraphQL */ `
  query AdminGetSplashScreen($merchantId: String, $splashScreenId: String) {
    adminGetSplashScreen(
      merchantId: $merchantId
      splashScreenId: $splashScreenId
    ) {
      message
      splashScreen {
        buttonActionValue
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        homeImage
        isDisabled
        merchantId
        sequence
        splashScreenId
        title
        updatedAt
        updatedBy
      }
      status
    }
  }
`;
export const adminGetStampingCampaignDetail = /* GraphQL */ `
  query AdminGetStampingCampaignDetail(
    $merchantId: String
    $stampingCampaignId: String
  ) {
    adminGetStampingCampaignDetail(
      merchantId: $merchantId
      stampingCampaignId: $stampingCampaignId
    ) {
      message
      stampingCampaign {
        endDate
        extraProductCondition {
          exclude
          ids {
            id
            quantity
          }
          type
        }
        extraProductStamp
        isEnable
        merchantId
        message
        minSpend
        orderType
        reminder {
          notificationMessage
          notificationTitle
          reminderId
          reminderMilestoneValue
        }
        rewardVoucher {
          id
          quantity
        }
        salesChannelName
        stampCondition {
          exclude
          ids {
            id
            quantity
          }
          type
        }
        stampTypeValue
        stampingCampaignCode
        stampingCampaignCycle
        stampingCampaignCycleDurationType
        stampingCampaignCycleDurationValue
        stampingCampaignDescription
        stampingCampaignImage
        stampingCampaignListingImage
        stampingCampaignTitle
        stampingCampaignType
        startDate
        status
        voucherExpiryDateType
        voucherExpiryDateValue
      }
      status
    }
  }
`;
export const adminGetStampingCampaignList = /* GraphQL */ `
  query AdminGetStampingCampaignList(
    $filter: SearchStampingCampaignFilter
    $limit: String
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminGetStampingCampaignList(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      message
      nextToken
      stampingCampaignList {
        endDate
        extraProductCondition {
          ids {
            collectionName
            productBundleId
            productId
            productUOMId
          }
          type
        }
        extraProductStamp
        isEnable
        merchantId
        minSpend
        orderType
        productCondition {
          ids {
            collectionName
            productBundleId
            productId
            productUOMId
          }
          type
        }
        rewardVoucher {
          category
          customerCondition
          deliveryDiscountType
          description
          discountAmountCap
          discountOnProductValue
          image
          merchantId
          minimumAmount
          minimumCondition
          minimumQuantity
          orderType
          price
          productConditions {
            exclude
            ids
            type
          }
          productsDiscount {
            ids
            type
          }
          requiredPoints
          status
          title
          type
          voucherIcon
          voucherId
        }
        stampClaimCount
        stampCollected
        stampTypeValue
        stampValueCollected
        stampingCampaignCode
        stampingCampaignCycle
        stampingCampaignCycleDuration
        stampingCampaignCycleDurationValue
        stampingCampaignDescription
        stampingCampaignId
        stampingCampaignImage
        stampingCampaignListingImage
        stampingCampaignReminder
        stampingCampaignTitle
        stampingCampaignType
        stampingMilestone
        stampingMilestoneRemaining
        stampingProgressId
        startDate
        updatedAt
        voucherExpiryDateType
        voucherExpiryDateValue
      }
      status
      total
    }
  }
`;
export const adminGetStockMovement = /* GraphQL */ `
  query AdminGetStockMovement($merchantId: String, $stockMovementId: String) {
    adminGetStockMovement(
      merchantId: $merchantId
      stockMovementId: $stockMovementId
    ) {
      buyerNotes
      createdAt
      createdBy
      expectedArrivalDate
      merchantId
      referenceNumber
      status
      stockMovementDetails {
        createdAt
        createdBy
        merchantId
        orderedQuantity
        productId
        productImage
        productTitle
        productUOMId
        receivedQuantity
        remarks
        stockMovementDetailId
        stockMovementId
        updatedAt
        updatedBy
        variantName1
        variantName2
        variantName3
        variantValue1
        variantValue2
        variantValue3
      }
      stockMovementId
      supplierId
      supplierName
      taggingNames
      trackingNumber
      updatedAt
      updatedBy
    }
  }
`;
export const adminGetStore = /* GraphQL */ `
  query AdminGetStore($storeId: String) {
    adminGetStore(storeId: $storeId) {
      address
      advancedOrderEnabled
      city
      code
      deliveryDuration
      deliveryFee
      deliveryMaxPurchaseQuantity
      deliveryMinPurchaseAmount
      deliveryPreparationTime
      deliveryServiceAvailable
      distance
      groupName
      isDisabled
      items {
        deliveryCompareAtPrice
        deliveryCostPerItem
        deliveryPrice
        deliveryPriceWithTax
        isSellingOffline
        itemId
        itemImage
        itemProperty
        itemTitle
        pickupCompareAtPrice
        pickupCostPerItem
        pickupPrice
        pickupPriceWithTax
        productId
        quantityForSales
        storeProductId
      }
      latitude
      longitude
      managerContact
      managerEmail
      managerName
      maxAdvancedOrderDay
      message
      minPurchase
      name
      offlineStoreOperate24Hour
      onlineStoreOperate24Hour
      pickupServiceAvailable
      postalCode
      primaryEmail
      state
      status
      storeId
      storeOperatingHourList {
        close
        day
        enabled
        endingTimeAfterMidnight
        open
      }
      storeOperatingHours
      taggingNames
      todayCloseTime
      todayOpenTime
      userId
      visibleToOnlineStore
    }
  }
`;
export const adminGetStoreBlockedOutPeriod = /* GraphQL */ `
  query AdminGetStoreBlockedOutPeriod($merchantId: String, $storeId: String) {
    adminGetStoreBlockedOutPeriod(merchantId: $merchantId, storeId: $storeId) {
      endDateTime
      message
      startDateTime
      status
      storeType
    }
  }
`;
export const adminGetStoreListByProduct = /* GraphQL */ `
  query AdminGetStoreListByProduct(
    $merchantId: String
    $productBundleId: String
    $productId: String
  ) {
    adminGetStoreListByProduct(
      merchantId: $merchantId
      productBundleId: $productBundleId
      productId: $productId
    ) {
      items {
        isProductSelling
        salesChannelName
        storeId
        storeName
      }
      message
      status
    }
  }
`;
export const adminGetStoreOperatingHour = /* GraphQL */ `
  query AdminGetStoreOperatingHour($merchantId: String, $storeId: String) {
    adminGetStoreOperatingHour(merchantId: $merchantId, storeId: $storeId) {
      message
      status
      storeOperatingHours {
        createdAt
        createdBy
        day
        endingTimeAfterMidnight
        merchantId
        offlineStoreClosingHour
        offlineStoreOpeningHour
        storeId
        storeOperatingHourId
        updatedAt
        updatedBy
      }
    }
  }
`;
export const adminGetSupplier = /* GraphQL */ `
  query AdminGetSupplier($merchantId: String, $supplierId: String) {
    adminGetSupplier(merchantId: $merchantId, supplierId: $supplierId) {
      address
      contact
      contactName
      country
      email
      merchantId
      name
      supplierId
    }
  }
`;
export const adminGetTruck = /* GraphQL */ `
  query AdminGetTruck($truckId: String) {
    adminGetTruck(truckId: $truckId) {
      message
      status
      truck {
        branchList
        createdAt
        createdBy
        deliveryFee
        limit
        merchantId
        truckId
        truckName
        truckNumber
        truckScheduleDay
        truckScheduleTime
        unit
        updatedAt
        updatedBy
      }
      truckSchedule {
        branchId
        createdAt
        createdBy
        day
        merchantId
        postal
        time
        truckId
        truckName
        truckScheduleId
        updatedAt
        updatedBy
      }
    }
  }
`;
export const adminGetUpdateExtractedDocumentStatus = /* GraphQL */ `
  query AdminGetUpdateExtractedDocumentStatus($extractedDocumentId: String) {
    adminGetUpdateExtractedDocumentStatus(
      extractedDocumentId: $extractedDocumentId
    ) {
      status
      updateStartedTime
      updateStatus
    }
  }
`;
export const adminGetUserMatrix = /* GraphQL */ `
  query AdminGetUserMatrix($userGroupId: String) {
    adminGetUserMatrix(userGroupId: $userGroupId) {
      message
      status
      userGroupId
      userGroupName
      userMatrixList {
        children {
          canAdd
          canDelete
          canEdit
          canList
          canView
          children {
            canAdd
            canDelete
            canEdit
            canList
            canView
            children {
              canAdd
              canDelete
              canEdit
              canList
              canView
              title
              userMatrixId
            }
            title
            userMatrixId
          }
          title
          userMatrixId
        }
        module
      }
    }
  }
`;
export const adminGetUserMatrixTemplate = /* GraphQL */ `
  query AdminGetUserMatrixTemplate {
    adminGetUserMatrixTemplate {
      message
      status
      userGroupTemplates {
        createdAt
        createdBy
        description
        merchantType
        updatedAt
        updatedBy
        userGroupTemplateId
        userGroupTemplateName
        userMatrixTemplates {
          detail {
            canAdd
            canDelete
            canEdit
            canList
            canView
            detail {
              canAdd
              canDelete
              canEdit
              canList
              canView
              title
            }
            title
          }
          module
        }
      }
    }
  }
`;
export const adminGetUserMerchantList = /* GraphQL */ `
  query AdminGetUserMerchantList {
    adminGetUserMerchantList {
      items {
        childrenMerchant {
          merchantId
          name
        }
        currency
        deliveryServiceAvailable
        domain
        freeConversationLimit
        isFreeTrial
        isSelfServiceUpgraded
        membershipTierActivated
        merchantGPTConfigModules
        merchantId
        merchantSignUpType
        name
        nextWebChatBotBillingDate
        nextWhatsappChatBotBillingDate
        paidConversationLimit
        pickupServiceAvailable
        preferredLanguage
        referralPartner
        salesAgentId
        storeAddress
        storeCity
        storeCode
        storeCountry
        storeId
        storeIsDisabled
        storeManagerContact
        storeManagerName
        storeName
        storePostalCode
        storeState
        storeType
        subscriptionExpiryDate
        subscriptionId
        tax
      }
    }
  }
`;
export const adminGetVoucher = /* GraphQL */ `
  query AdminGetVoucher($merchantId: String, $voucherId: String) {
    adminGetVoucher(merchantId: $merchantId, voucherId: $voucherId) {
      message
      status
      voucher {
        category
        customerCondition
        customerGetDiscountLimit
        customerGetDiscountType
        customerGetItems {
          ids {
            bundleId
            collectionId
            productId
            productUOM
          }
          type
        }
        customerGetPercentValue
        customerGetQuantity
        customerGetValue
        deliveryDiscountType
        deliveryDiscountValue
        description
        discountAmountCap
        discountOnDelivery
        discountOnProductValue
        image
        isShareable
        isUnlimitedDistribution
        maxUserObtainLimit
        merchantId
        minimumAmount
        minimumCondition
        minimumQuantity
        orderType
        price
        productConditions {
          exclude
          ids
          type
        }
        productsDiscount {
          ids {
            bundleId
            collectionId
            productId
            productUOM
          }
          type
        }
        qrImageKey
        requiredPoints
        status
        title
        totalDistributed
        totalDistributionLimit
        type
        voucherCodeS3Key
        voucherExpiryType
        voucherExpiryValue
        voucherIcon
        voucherId
      }
    }
  }
`;
export const adminGetWSChatHistoryLog = /* GraphQL */ `
  query AdminGetWSChatHistoryLog(
    $chatId: String
    $filter: AdminListWSChatHistoryFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminGetWSChatHistoryLog(
      chatId: $chatId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      chatHistoryLog {
        additionalFields {
          fields {
            dataType
            field
            type
            value
          }
        }
        channel
        chatDateTime
        chatHistoryId
        isRead
        merchantId
        merchantReply
        message
        messageRating
        messageSentiment
        messageType
        platform
        recipient
        sender
        sentStatus
        ticketLink
        ticketNumber
        ticketStatus
        ticketTitle
      }
      disableAutoReply
      message
      nextToken
      ongoingTicket {
        currentStatus
        issueId
        issueType
      }
      status
      total
    }
  }
`;
export const adminGetWarehouse = /* GraphQL */ `
  query AdminGetWarehouse($merchantId: String) {
    adminGetWarehouse(merchantId: $merchantId) {
      StoreOperatingHour {
        close
        day
        enabled
        endingTimeAfterMidnight
        open
      }
      address
      addressDetail
      advancedOrderEnabled
      city
      country
      createdAt
      createdBy
      isOnDemandDeliveryEnabled
      isPickupEnabled
      latitude
      longitude
      maxAdvancedOrderDay
      merchantId
      onDemandMaxDistance
      ownTransportCutoffTime
      ownTransportDayInAdvance
      postalCode
      state
      updatedAt
      updatedBy
      warehouseId
    }
  }
`;
export const adminGetWarehouseDeliveryConfig = /* GraphQL */ `
  query AdminGetWarehouseDeliveryConfig($warehouseId: String) {
    adminGetWarehouseDeliveryConfig(warehouseId: $warehouseId) {
      isOwnTransportEnabled
      isStandardDeliveryEnabled
      message
      onDemandDefaultVehicleType
      onDemandMaxDistance
      standardPreferredPartnerName1
      standardPreferredPartnerName2
      status
    }
  }
`;
export const adminGetWebhookCallbackConfig = /* GraphQL */ `
  query AdminGetWebhookCallbackConfig($merchantId: String) {
    adminGetWebhookCallbackConfig(merchantId: $merchantId) {
      callbackEvent
      callbackUrl
      createdAt
      createdBy
      merchantId
      updatedAt
      updatedBy
      webhookCallbackConfigId
    }
  }
`;
export const adminListChatbotFiles = /* GraphQL */ `
  query AdminListChatbotFiles($filename: String) {
    adminListChatbotFiles(filename: $filename) {
      items {
        chatbotFileId
        filename
        status
      }
      message
      status
    }
  }
`;
export const adminListChatbotItems = /* GraphQL */ `
  query AdminListChatbotItems(
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
    $type: String
  ) {
    adminListChatbotItems(
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
      type: $type
    ) {
      chatbotItems {
        answer
        chatbotItemId
        createdAt
        question
        text
        type
        updatedAt
        url
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const adminListEInvoices = /* GraphQL */ `
  query AdminListEInvoices(
    $domain: String
    $filter: EInvoiceFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminListEInvoices(
      domain: $domain
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      adminCustomColumnMapping {
        storeCode
      }
      adminStoreActivated
      items {
        additionalChargeAmount
        adjustmentAmount
        adjustmentStatus
        adjustmentType
        adminReason
        asCompany
        companyAddressLine
        companyCityName
        companyName
        companyPostalCode
        companyStateCode
        companyStateName
        companyTin
        createdAt
        createdBy
        currency
        customerReason
        discountAmount
        documentType
        eInvoiceId
        eInvoiceNo
        email
        errorMessages
        fullName
        idNumber
        idType
        isInAdjustment
        maxRejectCancelDocsDateTime
        merchantId
        orderDetails {
          additionalCharge
          adjustmentAmount
          description
          discount
          itemClass
          productId
          qty
          subtotal
          taxAmount
          totalPrice
          unitPrice
        }
        parentEInvoiceNo
        parentId
        pdfPath
        phoneNumber
        posType
        receiptNumber
        source
        sstRegistrationNumber
        status
        storeCode
        timeline {
          createdAt
          createdBy
          description
          merchantId
          timelineForId
          timelineId
          title
          type
          updatedAt
          updatedBy
        }
        totalAdjustmentAmount
        totalExcludingTax
        totalIncludingTax
        totalNetAmount
        totalPayableAmount
        totalTaxAmount
        updatedAt
        updatedBy
      }
      nextToken
      status
      total
    }
  }
`;
export const adminListFaqCategories = /* GraphQL */ `
  query AdminListFaqCategories(
    $filter: SearchFaqCategoriesFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminListFaqCategories(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        childItems {
          answer
          createdAt
          createdBy
          faqCategory
          faqId
          faqType
          merchantId
          parentId
          question
          sequence
          updatedAt
          updatedBy
        }
        createdAt
        createdBy
        faqCategoryId
        merchantId
        sequence
        title
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const adminListItemsAndPricing = /* GraphQL */ `
  query AdminListItemsAndPricing(
    $merchantId: String
    $productBundleIdList: [String]
    $productId: String
    $productUOMIdList: [String]
    $salesChannelName: String
  ) {
    adminListItemsAndPricing(
      merchantId: $merchantId
      productBundleIdList: $productBundleIdList
      productId: $productId
      productUOMIdList: $productUOMIdList
      salesChannelName: $salesChannelName
    ) {
      bundles {
        productBundles {
          barcode
          collectionNames
          cover
          deliveryCompareAtPrice
          deliveryCostPerItem
          deliveryEffectiveEndDateTime
          deliveryEffectiveStartDateTime
          deliveryPrice
          deliveryPriceWithTax
          description
          image
          marketPlaceAttributes {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceBrand {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceCategories {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceProductCode
          marketPlaceProductUOMCode
          marketPlaceShippingPartner
          merchantId
          pickupCompareAtPrice
          pickupCostPerItem
          pickupEffectiveEndDateTime
          pickupEffectiveStartDateTime
          pickupPrice
          pickupPriceWithTax
          productBundleId
          productBundlePricingId
          quantityForSales
          salesChannelName
          seoDescription
          seoTitle
          seoUrl
          sku
          storeId
          storeName
          storeProductId
          taggingNames
          title
        }
        salesChannelName
      }
      message
      status
      uoms {
        productUOMs {
          barcode
          collectionNames
          deliveryCompareAtPrice
          deliveryCostPerItem
          deliveryEffectiveEndDateTime
          deliveryEffectiveStartDateTime
          deliveryPrice
          deliveryPriceWithTax
          estimatedRestock
          image
          incomingQuantity
          isDisabled
          isNewArrival
          isPreOrder
          isProductTaxable
          isVirtualGoods
          marketPlaceAttributes {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceBrand {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceCategories {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceProductCode
          marketPlaceProductUOMCode
          marketPlaceShippingPartner
          merchantId
          modifierGroups {
            isItemsControlAvailable
            isSelected
            modifier {
              availableStatus
              isSelected
              modifierId
              modifierName
              price
            }
            modifierGroupId
            modifierGroupName
            modifierGroupType
            requestRemark
            selectionRangeMax
            selectionRangeMin
          }
          newArrivalDate
          noOfPurchases
          packageSize
          pickupCompareAtPrice
          pickupCostPerItem
          pickupEffectiveEndDateTime
          pickupEffectiveStartDateTime
          pickupPrice
          pickupPriceWithTax
          preOrderReservedQuantity
          productId
          productTitle
          productUOMId
          productUOMPricingId
          quantityBundleForSales
          quantityForSales
          quantityType
          salesChannelName
          shippingDimensionHeight
          shippingDimensionLength
          shippingDimensionWidth
          shippingWeight
          shippingWeightUnit
          sku
          skuLimitPerDay
          storeId
          storeName
          storeProductId
          taggingNames
          totalStockQuantity
          trackQuantity
          updatedAt
          updatedBy
          variantName1
          variantName2
          variantName3
          variantValue1
          variantValue2
          variantValue3
          virtualGoodsExpiredAt
          virtualGoodsExpiryDays
        }
        salesChannelName
      }
    }
  }
`;
export const adminListManualPaymentOptions = /* GraphQL */ `
  query AdminListManualPaymentOptions($merchantId: String) {
    adminListManualPaymentOptions(merchantId: $merchantId) {
      manualPaymentOptionList {
        TNGPaymentLink
        accountNumber
        bankAccountName
        isBankTransfer
        isDisabled
        manualPaymentMethodName
        manualPaymentOptionsId
        merchantId
        paymentInstructions
        qrCode
      }
      message
      onBoardRole
      status
    }
  }
`;
export const adminListMerchantCreditTransactions = /* GraphQL */ `
  query AdminListMerchantCreditTransactions(
    $limit: Int
    $merchantId: String
    $nextToken: String
  ) {
    adminListMerchantCreditTransactions(
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
    ) {
      items {
        actionType
        amount
        createdAt
        createdBy
        merchantCreditTransactionId
        merchantId
        merchantOrderId
        orderNumber
        transactionId
      }
      nextToken
      total
    }
  }
`;
export const adminListPendingCheckoutCarts = /* GraphQL */ `
  query AdminListPendingCheckoutCarts(
    $filter: ListPendingCheckoutCartsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminListPendingCheckoutCarts(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        customerFirstName
        customerId
        customerLastName
        merchantId
        salesChannelName
        totalPrice
        totalProducts
        totalQuantity
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const adminListPointConversion = /* GraphQL */ `
  query AdminListPointConversion(
    $filter: SearchPointConversionsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminListPointConversion(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        itemId
        itemImage
        itemProperty
        itemTitle
        merchantId
        multiplier
        pointConversionId
        productId
        spent
        updatedAt
        updatedBy
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const adminListProductExclusion = /* GraphQL */ `
  query AdminListProductExclusion(
    $filter: SearchProductExclusionsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminListProductExclusion(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        itemId
        itemImage
        itemProperty
        itemTitle
        merchantId
        productExclusionId
        productId
        type
        updatedAt
        updatedBy
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const adminListProductInventories = /* GraphQL */ `
  query AdminListProductInventories(
    $filter: SearchProductUOMsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminListProductInventories(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        merchantId
        productCover
        productId
        productTitle
        productUOMs {
          barcode
          collectionNames
          createdAt
          createdBy
          image
          incomingQuantity
          isDisabled
          isProductTaxable
          isVirtualGoods
          merchantId
          modifierGroups {
            isItemsControlAvailable
            isSelected
            modifier {
              availableStatus
              isSelected
              modifierId
              modifierName
              price
            }
            modifierGroupId
            modifierGroupName
            modifierGroupType
            requestRemark
            selectionRangeMax
            selectionRangeMin
          }
          noOfPurchases
          productCover
          productId
          productTitle
          productUOMId
          quantityForSales
          shippingDimensionHeight
          shippingDimensionLength
          shippingDimensionWidth
          shippingWeight
          shippingWeightUnit
          sku
          taggingNames
          totalStockQuantity
          trackQuantity
          updatedAt
          updatedBy
          variantName1
          variantName2
          variantName3
          variantValue1
          variantValue2
          variantValue3
          virtualGoodsExpiredAt
          virtualGoodsExpiryDays
        }
      }
      nextToken
      total
    }
  }
`;
export const adminListProductsWithProductUOMs = /* GraphQL */ `
  query AdminListProductsWithProductUOMs(
    $filter: ListProductsWithProductUOMsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminListProductsWithProductUOMs(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        merchantId
        productCover
        productId
        productTitle
        productUOMs {
          barcode
          collectionNames
          createdAt
          createdBy
          image
          incomingQuantity
          isDisabled
          isProductTaxable
          isVirtualGoods
          merchantId
          modifierGroups {
            isItemsControlAvailable
            isSelected
            modifier {
              availableStatus
              isSelected
              modifierId
              modifierName
              price
            }
            modifierGroupId
            modifierGroupName
            modifierGroupType
            requestRemark
            selectionRangeMax
            selectionRangeMin
          }
          noOfPurchases
          productCover
          productId
          productTitle
          productUOMId
          quantityForSales
          shippingDimensionHeight
          shippingDimensionLength
          shippingDimensionWidth
          shippingWeight
          shippingWeightUnit
          sku
          taggingNames
          totalStockQuantity
          trackQuantity
          updatedAt
          updatedBy
          variantName1
          variantName2
          variantName3
          variantValue1
          variantValue2
          variantValue3
          virtualGoodsExpiredAt
          virtualGoodsExpiryDays
        }
      }
      nextToken
      total
    }
  }
`;
export const adminListShippingZonesAndRates = /* GraphQL */ `
  query AdminListShippingZonesAndRates(
    $merchantId: String
    $warehouseId: String
  ) {
    adminListShippingZonesAndRates(
      merchantId: $merchantId
      warehouseId: $warehouseId
    ) {
      items {
        country
        createdAt
        createdBy
        merchantId
        shippingRates {
          amount
          conditionType
          createdAt
          createdBy
          estimatedDuration
          maxValue
          merchantId
          minValue
          shippingRateId
          shippingZoneId
          title
          updatedAt
          updatedBy
        }
        shippingZoneId
        state
        title
        transportType
        updatedAt
        updatedBy
        warehouseId
      }
      message
      status
    }
  }
`;
export const adminListSiteNavigations = /* GraphQL */ `
  query AdminListSiteNavigations(
    $filter: SearchSiteNavigationsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    adminListSiteNavigations(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        childItems {
          childItems {
            childItems {
              createdAt
              createdBy
              effectiveEndDateTime
              effectiveStartDateTime
              isDisabled
              linkValue
              menuType
              merchantId
              navigationType
              openNewTab
              parentId
              sequence
              siteNavigationId
              title
              updatedAt
              updatedBy
            }
            createdAt
            createdBy
            effectiveEndDateTime
            effectiveStartDateTime
            isDisabled
            linkValue
            menuType
            merchantId
            navigationType
            openNewTab
            parentId
            sequence
            siteNavigationId
            title
            updatedAt
            updatedBy
          }
          createdAt
          createdBy
          effectiveEndDateTime
          effectiveStartDateTime
          isDisabled
          linkValue
          menuType
          merchantId
          navigationType
          openNewTab
          parentId
          sequence
          siteNavigationId
          title
          updatedAt
          updatedBy
        }
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        isDisabled
        linkValue
        menuType
        merchantId
        navigationType
        openNewTab
        parentId
        sequence
        siteNavigationId
        title
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const adminListStoreProductsBySalesChannel = /* GraphQL */ `
  query AdminListStoreProductsBySalesChannel(
    $merchantId: String
    $productBundleId: String
    $productId: String
  ) {
    adminListStoreProductsBySalesChannel(
      merchantId: $merchantId
      productBundleId: $productBundleId
      productId: $productId
    ) {
      bundles {
        productBundles {
          barcode
          collectionNames
          cover
          deliveryCompareAtPrice
          deliveryCostPerItem
          deliveryEffectiveEndDateTime
          deliveryEffectiveStartDateTime
          deliveryPrice
          deliveryPriceWithTax
          description
          image
          marketPlaceAttributes {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceBrand {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceCategories {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceProductCode
          marketPlaceProductUOMCode
          marketPlaceShippingPartner
          merchantId
          pickupCompareAtPrice
          pickupCostPerItem
          pickupEffectiveEndDateTime
          pickupEffectiveStartDateTime
          pickupPrice
          pickupPriceWithTax
          productBundleId
          productBundlePricingId
          quantityForSales
          salesChannelName
          seoDescription
          seoTitle
          seoUrl
          sku
          storeId
          storeName
          storeProductId
          taggingNames
          title
        }
        salesChannelName
      }
      message
      status
      uoms {
        productUOMs {
          barcode
          collectionNames
          deliveryCompareAtPrice
          deliveryCostPerItem
          deliveryEffectiveEndDateTime
          deliveryEffectiveStartDateTime
          deliveryPrice
          deliveryPriceWithTax
          estimatedRestock
          image
          incomingQuantity
          isDisabled
          isNewArrival
          isPreOrder
          isProductTaxable
          isVirtualGoods
          marketPlaceAttributes {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceBrand {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceCategories {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceProductCode
          marketPlaceProductUOMCode
          marketPlaceShippingPartner
          merchantId
          modifierGroups {
            isItemsControlAvailable
            isSelected
            modifier {
              availableStatus
              isSelected
              modifierId
              modifierName
              price
            }
            modifierGroupId
            modifierGroupName
            modifierGroupType
            requestRemark
            selectionRangeMax
            selectionRangeMin
          }
          newArrivalDate
          noOfPurchases
          packageSize
          pickupCompareAtPrice
          pickupCostPerItem
          pickupEffectiveEndDateTime
          pickupEffectiveStartDateTime
          pickupPrice
          pickupPriceWithTax
          preOrderReservedQuantity
          productId
          productTitle
          productUOMId
          productUOMPricingId
          quantityBundleForSales
          quantityForSales
          quantityType
          salesChannelName
          shippingDimensionHeight
          shippingDimensionLength
          shippingDimensionWidth
          shippingWeight
          shippingWeightUnit
          sku
          skuLimitPerDay
          storeId
          storeName
          storeProductId
          taggingNames
          totalStockQuantity
          trackQuantity
          updatedAt
          updatedBy
          variantName1
          variantName2
          variantName3
          variantValue1
          variantValue2
          variantValue3
          virtualGoodsExpiredAt
          virtualGoodsExpiryDays
        }
        salesChannelName
      }
    }
  }
`;
export const adminListTimeline = /* GraphQL */ `
  query AdminListTimeline($merchantId: String, $timelineForId: String) {
    adminListTimeline(merchantId: $merchantId, timelineForId: $timelineForId) {
      timelines {
        createdAt
        createdBy
        description
        merchantId
        timelineForId
        timelineId
        title
        type
        updatedAt
        updatedBy
      }
    }
  }
`;
export const adminListUserMatrix = /* GraphQL */ `
  query AdminListUserMatrix($userGroupId: String) {
    adminListUserMatrix(userGroupId: $userGroupId) {
      message
      status
      userGroupId
      userGroupName
      userMatrixList {
        children {
          canAdd
          canDelete
          canEdit
          canList
          canView
          children {
            canAdd
            canDelete
            canEdit
            canList
            canView
            children {
              canAdd
              canDelete
              canEdit
              canList
              canView
              title
              userMatrixId
            }
            title
            userMatrixId
          }
          title
          userMatrixId
        }
        module
      }
    }
  }
`;
export const adminListWSChatHistory = /* GraphQL */ `
  query AdminListWSChatHistory(
    $channelAutoReply: ChannelAutoReplyListWSChatHistory
    $filter: AdminListWSChatHistoryFilter
    $hasNewIssue: Int
    $limit: Int
    $nextToken: String
    $smartAlert: Boolean
    $sort: ElasticSearchSortDirection
  ) {
    adminListWSChatHistory(
      channelAutoReply: $channelAutoReply
      filter: $filter
      hasNewIssue: $hasNewIssue
      limit: $limit
      nextToken: $nextToken
      smartAlert: $smartAlert
      sort: $sort
    ) {
      chatHistoryList {
        channelAutoReply {
          channel
          isDisabled
        }
        chatDateTime
        chatId
        customerId
        customerName
        dayIndex
        hasNewIssue
        listUnreadChatHistory {
          channel
          total
        }
        merchantId
        merchantReply
        message
        messageCount
        messageRating
        messageSentiment
        messageType
        recipient
        sender
        smartAlert
        totalUnreadChatHistory
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const adminValidateVirtualGoodsOrderCode = /* GraphQL */ `
  query AdminValidateVirtualGoodsOrderCode($code: String, $merchantId: String) {
    adminValidateVirtualGoodsOrderCode(code: $code, merchantId: $merchantId) {
      code
      codeStatus
      codeUpdatedAt
      isRedeemable
      message
      orderDetails {
        associatedProducts {
          productId
          productImage
          productSku
          productTitle
          productUOMId
          quantity
          variantName1
          variantName2
          variantName3
          variantValue1
          variantValue2
          variantValue3
        }
        comment
        compareAtPrice
        createdAt
        createdBy
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        description
        fulfilledQuantity
        isCancelledItem
        isFreeItem
        isPreOrder
        itemId
        itemImage
        itemIsVirtualGoods
        itemProperty
        itemSku
        itemStatus
        itemTitle
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        mandatoryItem
        manualPaymentReceipt
        merchantId
        orderDetailId
        orderId
        orderNumber
        orderedQuantity
        pickupCompareAtPrice
        pickupPrice
        pickupPriceWithTax
        price
        priceWithTax
        promoCode
        promoCodeDiscount
        rating
        redemptionCode
        refundQuantity
        selectedModifierGroups {
          isItemsControlAvailable
          isSelected
          modifier {
            availableStatus
            isSelected
            modifierId
            modifierName
            price
          }
          modifierGroupId
          modifierGroupName
          modifierGroupType
          requestRemark
          selectionRangeMax
          selectionRangeMin
        }
        subtotal
        subtotalWithTax
        timeslotEndDateTime
        timeslotStartDateTime
        totalDiscount
        totalPromoCodeDiscount
        totalVoucherDiscount
        updatedAt
        updatedBy
        voucherDiscount
        voucherNumber
      }
      productDescription
      status
    }
  }
`;
export const batchExportExtractedDocument = /* GraphQL */ `
  query BatchExportExtractedDocument($extractedDocumentId: String) {
    batchExportExtractedDocument(extractedDocumentId: $extractedDocumentId) {
      documentUrl
      message
      status
    }
  }
`;
export const checkMerchantSetupStatus = /* GraphQL */ `
  query CheckMerchantSetupStatus($merchantId: String) {
    checkMerchantSetupStatus(merchantId: $merchantId) {
      collectKYCInfo
      message
      status
      storeSetupStatus
    }
  }
`;
export const checkProductName = /* GraphQL */ `
  query CheckProductName($seoUrl: String, $title: String) {
    checkProductName(seoUrl: $seoUrl, title: $title) {
      message
      status
    }
  }
`;
export const customerSearchProducts = /* GraphQL */ `
  query CustomerSearchProducts(
    $filter: SearchStoreProductsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $orderType: String
    $sort: ElasticSearchSortDirection
    $storeId: String
  ) {
    customerSearchProducts(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      orderType: $orderType
      sort: $sort
      storeId: $storeId
    ) {
      items {
        compareAtPrice
        cover
        deliveryCompareAtPrice
        deliveryCompareAtPriceRange
        deliveryPrice
        deliveryPriceRange
        deliveryPriceWithTax
        deliveryPriceWithTaxRange
        description
        effectiveEndDateTime
        effectiveStartDateTime
        hasStock
        hasVariant
        homeCollectionId
        homeCollectionTitle
        image
        isDisabled
        isNewArrival
        isPreOrder
        itemId
        itemProperty
        memberDiscount {
          type
          value
        }
        price
        priceWithTax
        productIsDisabled
        promotionEndDateTime
        promotionStartDateTime
        seoUrl
        title
        totalRatings
        totalReviews
        updatedAt
        video
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const generateHelpCenterS3DownloadLink = /* GraphQL */ `
  query GenerateHelpCenterS3DownloadLink(
    $domain: String
    $fileName: String
    $merchantId: String
    $platform: String
  ) {
    generateHelpCenterS3DownloadLink(
      domain: $domain
      fileName: $fileName
      merchantId: $merchantId
      platform: $platform
    )
  }
`;
export const generateS3DownloadLink = /* GraphQL */ `
  query GenerateS3DownloadLink($merchantId: String, $orderId: String) {
    generateS3DownloadLink(merchantId: $merchantId, orderId: $orderId) {
      message
      status
    }
  }
`;
export const getAndCheckCustomerCartProduct = /* GraphQL */ `
  query GetAndCheckCustomerCartProduct(
    $accessToken: String
    $addressLatitude: String
    $addressLongitude: String
    $deliveryAddress: String
    $deviceDateTime: String
    $distance: Float
    $merchantId: String
    $orderType: String
    $productList: String
    $promoCode: String
    $returnTotalNumber: Boolean
    $scheduledDateTime: String
    $storeId: String
    $voucherEntryNumber: String
    $voucherNumber: String
  ) {
    getAndCheckCustomerCartProduct(
      accessToken: $accessToken
      addressLatitude: $addressLatitude
      addressLongitude: $addressLongitude
      deliveryAddress: $deliveryAddress
      deviceDateTime: $deviceDateTime
      distance: $distance
      merchantId: $merchantId
      orderType: $orderType
      productList: $productList
      promoCode: $promoCode
      returnTotalNumber: $returnTotalNumber
      scheduledDateTime: $scheduledDateTime
      storeId: $storeId
      voucherEntryNumber: $voucherEntryNumber
      voucherNumber: $voucherNumber
    ) {
      basketValue
      deliveryDiscountAmount
      deliveryFee
      deliveryFree
      discountCap
      discountDeliveryCap
      discountProductQuantityCap
      discountTypeLevel
      indicationMessage
      message
      products {
        customerCartProductUOMId
        discountAmount
        discountedPrice
        ecommerceMaximumQuantity
        image
        isFreeItem
        isOutOfStock
        mandatoryItem
        pickupMaximumQuantity
        price
        promoDiscount
        quantity
        status
        subtotal
        title
        voucherDiscount
      }
      promoApplicable
      promoCode
      promoDeliveryDiscount
      promoDiscount
      promoTitle
      returnTotalNumber
      status
      storeStatus
      storeStatusMessage
      totalDiscountAmount
      totalPromoDiscount
      totalVoucherDiscount
      voucherApplicable
      voucherDeliveryDiscount
      voucherNumber
      voucherTitle
    }
  }
`;
export const getChatHistoryLog = /* GraphQL */ `
  query GetChatHistoryLog(
    $chatId: String
    $domain: String
    $filter: AdminListWSChatHistoryFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    getChatHistoryLog(
      chatId: $chatId
      domain: $domain
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      chatHistoryLog {
        additionalFields {
          fields {
            dataType
            field
            type
            value
          }
        }
        channel
        chatDateTime
        chatHistoryId
        isRead
        merchantId
        merchantReply
        message
        messageRating
        messageSentiment
        messageType
        platform
        recipient
        sender
        sentStatus
        ticketLink
        ticketNumber
        ticketStatus
        ticketTitle
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const getChatbotSetting = /* GraphQL */ `
  query GetChatbotSetting($domain: String, $merchantId: String) {
    getChatbotSetting(domain: $domain, merchantId: $merchantId) {
      chatbotSetting {
        samplePrompts
        webchatColorCode
      }
      message
      status
    }
  }
`;
export const getCollections = /* GraphQL */ `
  query GetCollections(
    $filter: SearchGetCollectionsFilter
    $homeCollectionId: String
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    getCollections(
      filter: $filter
      homeCollectionId: $homeCollectionId
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      collections {
        homeCollectionId
        isDisabled
        title
      }
      message
      selectedCollectionsItems {
        homeCollectionId
        homeCollectionTitle
        nextToken
        products {
          compareAtPrice
          cover
          deliveryCompareAtPrice
          deliveryCompareAtPriceRange
          deliveryPrice
          deliveryPriceRange
          deliveryPriceWithTax
          deliveryPriceWithTaxRange
          description
          effectiveEndDateTime
          effectiveStartDateTime
          hasStock
          hasVariant
          homeCollectionId
          homeCollectionTitle
          image
          isDisabled
          isNewArrival
          isPreOrder
          itemId
          itemProperty
          memberDiscount {
            type
            value
          }
          price
          priceWithTax
          productIsDisabled
          promotionEndDateTime
          promotionStartDateTime
          seoUrl
          title
          totalRatings
          totalReviews
          updatedAt
          video
        }
        total
      }
      status
    }
  }
`;
export const getContactUsInfo = /* GraphQL */ `
  query GetContactUsInfo($merchantId: String) {
    getContactUsInfo(merchantId: $merchantId) {
      contactUsContent
      contactUsFormEnabled
      message
      status
      storeList {
        address
        city
        contactUsStoreId
        createdAt
        createdBy
        latitude
        longitude
        merchantId
        postalCode
        state
        storeCode
        storeId
        storeName
        updatedAt
        updatedBy
      }
    }
  }
`;
export const getCustomOrder = /* GraphQL */ `
  query GetCustomOrder($customOrderId: String, $merchantId: String) {
    getCustomOrder(customOrderId: $customOrderId, merchantId: $merchantId) {
      cartItems {
        itemDescription
        itemId
        itemImage
        itemProperty
        itemTitle
        price
        quantity
      }
      customOrder {
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        checkoutLink
        createdAt
        createdBy
        customOrderId
        customerFirstName
        customerId
        customerLastName
        itemList {
          itemId
          itemProperty
          itemTitle
          quantity
          subtotal
          type
        }
        merchantId
        mobileNo
        noteToRider
        orderId
        orderNumber
        orderType
        salesAgentId
        shippingAddress
        shippingCity
        shippingCountry
        shippingPostalCode
        shippingState
        status
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer(
    $accessToken: String
    $autoSignIn: Boolean
    $customerId: String
    $merchantId: String
  ) {
    getCustomer(
      accessToken: $accessToken
      autoSignIn: $autoSignIn
      customerId: $customerId
      merchantId: $merchantId
    ) {
      accountNo
      address
      address2
      billingAddress
      billingCity
      billingCountry
      billingPostalCode
      billingState
      city
      country
      createdAt
      creditLimit
      creditLimitEnabled
      creditLimitHistory {
        actionType
        amount
        createdAt
        createdBy
        creditLimitHistoryId
        customerId
        merchantId
        orderNumber
        refundReason
        updatedAt
        updatedBy
      }
      customerId
      dateOfBirth
      firstName
      firstPurchasedDateTime
      gender
      isBlocked
      lastName
      lastPurchasedDateTime
      marketingConsent
      membershipPoint
      membershipPointExpiryDate
      membershipQrCode
      membershipTier
      message
      mobileNo
      nextToken
      postal
      postalCode
      primaryEmail
      race
      refreshToken
      secondaryEmail
      shippingAddress
      shippingCity
      shippingCountry
      shippingPostalCode
      shippingState
      smartTaggingNames
      state
      status
      taggingNames
      totalEarnedMembershipPoint
      totalItem
      totalOrders
      totalSpent
    }
  }
`;
export const getCustomerCarts = /* GraphQL */ `
  query GetCustomerCarts(
    $cartChannel: String
    $customOrderId: String
    $customerId: String
    $merchantId: String
    $storeId: String
  ) {
    getCustomerCarts(
      cartChannel: $cartChannel
      customOrderId: $customOrderId
      customerId: $customerId
      merchantId: $merchantId
      storeId: $storeId
    ) {
      items {
        customerCartId
        customerId
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        errorMessage
        facebookLiveCampaignDetailId
        isFreeItem
        itemCode
        itemId
        itemImage
        itemProperty
        itemSku
        itemTitle
        itemUom
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        mandatoryItem
        maxQuantity
        modifierSubtotal
        pickupCompareAtPrice
        pickupPrice
        pickupPriceWithoutTax
        quantity
        salesChannelName
        selectedModifierGroups {
          isItemsControlAvailable
          isSelected
          modifier {
            availableStatus
            isSelected
            modifierId
            modifierName
            price
          }
          modifierGroupId
          modifierGroupName
          modifierGroupType
          requestRemark
          selectionRangeMax
          selectionRangeMin
        }
        shippingWeight
        shippingWeightUnit
        storeId
        storeName
        subtotal
        subtotalWithTax
        timeslotEndDateTime
        timeslotStartDateTime
        type
      }
      message
      status
    }
  }
`;
export const getCustomerDeliveryPickUpOrderListing = /* GraphQL */ `
  query GetCustomerDeliveryPickUpOrderListing(
    $accessToken: String
    $customerId: String
    $domain: String
    $filterType: String
    $merchantId: String
    $platform: String
  ) {
    getCustomerDeliveryPickUpOrderListing(
      accessToken: $accessToken
      customerId: $customerId
      domain: $domain
      filterType: $filterType
      merchantId: $merchantId
      platform: $platform
    ) {
      message
      nextToken
      orderListing {
        ETACustomer
        ETAMerchant
        accumulatedRefundAmount
        actualDeliveryFee
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        cancelledBy
        cancelledReason
        createdAt
        createdBy
        customerAccountNo
        customerFirstName
        customerIP
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        deliveryAddress
        deliveryCity
        deliveryCountry
        deliveryDiscount
        deliveryLatitude
        deliveryLongitude
        deliveryMode
        deliveryNumber
        deliveryOrderDateTime
        deliveryOrderId
        deliveryPartnerName
        deliveryPostalCode
        deliveryState
        deliveryStatus
        deliveryType
        driverLatitude
        driverLongitude
        driverName
        driverPhoneNumber
        driverPlateNumber
        estimatedDeliveryFee
        grandTotal
        image
        isAdvancedOrder
        isRefunded
        isReviewAvailable
        manualPaymentMethodName
        manualPaymentReceipt
        merchantId
        noteToRider
        ongoingTicket
        orderCancellationDateTime
        orderCollectedDateTime
        orderCompletedDateTime
        orderDateTime
        orderId
        orderNumber
        orderType
        overallRating
        packageNumber
        partialFulfilmentAmount
        partialFulfilmentDiscount
        paymentDateTime
        paymentMethod
        paymentStatus
        paymentType
        pickupAddress
        pickupCity
        pickupCountry
        pickupPostalCode
        pickupState
        pointsCollectable
        promoCode
        promoCodeDiscount
        promoCodeId
        promoCodeTitle
        quantity
        refundAmount
        refundCompleteDateTime
        refundReason
        remarks
        requiredCutlery
        salesChannelName
        scheduledDate
        scheduledDateTime
        scheduledTime
        sellerNote
        senderName
        standardDeliveryAwb
        standardDeliveryAwbIdLink
        standardDeliveryTrackingUrl
        status
        storeCode
        storeId
        storeName
        subtotal
        subtotalWithTax
        tableNumber
        taggingNames
        totalDiscount
        totalOrderItems
        totalPromoCodeDiscount
        totalRefundedAmount
        totalVoucherDiscount
        transactionId
        truckId
        truckName
        type
        updatedAt
        updatedBy
        voucherDiscount
        voucherId
        voucherNumber
        voucherOrderId
        voucherProcessed
        voucherType
      }
      status
      total
    }
  }
`;
export const getCustomerDineInOrderListing = /* GraphQL */ `
  query GetCustomerDineInOrderListing(
    $customerId: String
    $filterType: String
    $merchantId: String
  ) {
    getCustomerDineInOrderListing(
      customerId: $customerId
      filterType: $filterType
      merchantId: $merchantId
    ) {
      message
      nextToken
      orderListing {
        ETACustomer
        ETAMerchant
        accumulatedRefundAmount
        actualDeliveryFee
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        cancelledBy
        cancelledReason
        createdAt
        createdBy
        customerAccountNo
        customerFirstName
        customerIP
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        deliveryAddress
        deliveryCity
        deliveryCountry
        deliveryDiscount
        deliveryLatitude
        deliveryLongitude
        deliveryMode
        deliveryNumber
        deliveryOrderDateTime
        deliveryOrderId
        deliveryPartnerName
        deliveryPostalCode
        deliveryState
        deliveryStatus
        deliveryType
        driverLatitude
        driverLongitude
        driverName
        driverPhoneNumber
        driverPlateNumber
        estimatedDeliveryFee
        grandTotal
        image
        isAdvancedOrder
        isRefunded
        isReviewAvailable
        manualPaymentMethodName
        manualPaymentReceipt
        merchantId
        noteToRider
        ongoingTicket
        orderCancellationDateTime
        orderCollectedDateTime
        orderCompletedDateTime
        orderDateTime
        orderId
        orderNumber
        orderType
        overallRating
        packageNumber
        partialFulfilmentAmount
        partialFulfilmentDiscount
        paymentDateTime
        paymentMethod
        paymentStatus
        paymentType
        pickupAddress
        pickupCity
        pickupCountry
        pickupPostalCode
        pickupState
        pointsCollectable
        promoCode
        promoCodeDiscount
        promoCodeId
        promoCodeTitle
        quantity
        refundAmount
        refundCompleteDateTime
        refundReason
        remarks
        requiredCutlery
        salesChannelName
        scheduledDate
        scheduledDateTime
        scheduledTime
        sellerNote
        senderName
        standardDeliveryAwb
        standardDeliveryAwbIdLink
        standardDeliveryTrackingUrl
        status
        storeCode
        storeId
        storeName
        subtotal
        subtotalWithTax
        tableNumber
        taggingNames
        totalDiscount
        totalOrderItems
        totalPromoCodeDiscount
        totalRefundedAmount
        totalVoucherDiscount
        transactionId
        truckId
        truckName
        type
        updatedAt
        updatedBy
        voucherDiscount
        voucherId
        voucherNumber
        voucherOrderId
        voucherProcessed
        voucherType
      }
      status
      total
    }
  }
`;
export const getCustomerFavouriteAddresses = /* GraphQL */ `
  query GetCustomerFavouriteAddresses(
    $accessToken: String
    $customerId: String
    $domain: String
    $merchantId: String
  ) {
    getCustomerFavouriteAddresses(
      accessToken: $accessToken
      customerId: $customerId
      domain: $domain
      merchantId: $merchantId
    ) {
      addresses {
        address
        addressDetail
        city
        country
        createdAt
        customerFavouriteAddressId
        customerId
        isDefaultBilling
        isDefaultShipping
        latitude
        longitude
        merchantId
        name
        postalCode
        state
        updatedAt
      }
      message
      status
    }
  }
`;
export const getCustomerNotificationDetail = /* GraphQL */ `
  query GetCustomerNotificationDetail(
    $merchantId: String
    $notificationId: String
  ) {
    getCustomerNotificationDetail(
      merchantId: $merchantId
      notificationId: $notificationId
    ) {
      message
      notification {
        actionId
        actionType
        body
        createdAt
        image
        notificationId
        title
        updatedAt
        voucherType
      }
      status
    }
  }
`;
export const getCustomerNotificationList = /* GraphQL */ `
  query GetCustomerNotificationList(
    $customerId: String
    $filter: SearchProductUOMsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    getCustomerNotificationList(
      customerId: $customerId
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      customerNotificationList {
        notificationId
        notificationImage
        notificationMessage
        notificationSentDateTime
        notificationTitle
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const getCustomerOrderDetail = /* GraphQL */ `
  query GetCustomerOrderDetail(
    $accessToken: String
    $customerId: String
    $domain: String
    $filterType: String
    $merchantId: String
    $orderId: String
  ) {
    getCustomerOrderDetail(
      accessToken: $accessToken
      customerId: $customerId
      domain: $domain
      filterType: $filterType
      merchantId: $merchantId
      orderId: $orderId
    ) {
      message
      order {
        ETACustomer
        ETAMerchant
        accumulatedRefundAmount
        actualDeliveryFee
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        cancelledBy
        cancelledReason
        createdAt
        createdBy
        customerAccountNo
        customerFirstName
        customerIP
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        deliveryAddress
        deliveryCity
        deliveryCountry
        deliveryDiscount
        deliveryLatitude
        deliveryLongitude
        deliveryMode
        deliveryNumber
        deliveryOrderDateTime
        deliveryOrderId
        deliveryPartnerName
        deliveryPostalCode
        deliveryState
        deliveryStatus
        deliveryType
        driverLatitude
        driverLongitude
        driverName
        driverPhoneNumber
        driverPlateNumber
        estimatedDeliveryFee
        grandTotal
        hasPreOrder
        image
        isAdvancedOrder
        isPreOrder
        isRefunded
        isReviewAvailable
        mainOrderId
        manualPaymentMethodName
        manualPaymentReceipt
        merchantId
        noteToRider
        orderCancellationDateTime
        orderCollectedDateTime
        orderCompletedDateTime
        orderDateTime
        orderId
        orderNumber
        orderType
        overallRating
        packageNumber
        partialFulfilmentAmount
        partialFulfilmentDiscount
        paymentDateTime
        paymentMethod
        paymentStatus
        paymentType
        pickupAddress
        pickupCity
        pickupCountry
        pickupPostalCode
        pickupState
        pointsCollectable
        promoCode
        promoCodeDiscount
        promoCodeId
        promoCodeTitle
        receiptFileName
        refundAmount
        refundCompleteDateTime
        refundReason
        remarks
        requiredCutlery
        salesAgentId
        salesChannelName
        scheduledDate
        scheduledDateTime
        scheduledTime
        sellerNote
        standardDeliveryAwb
        standardDeliveryAwbIdLink
        standardDeliveryTrackingUrl
        status
        storeAddress
        storeCode
        storeId
        storeName
        subtotal
        subtotalWithTax
        tableNumber
        taggingNames
        totalDiscount
        totalOrderItems
        totalPromoCodeDiscount
        totalRefundedAmount
        totalVoucherDiscount
        transactionId
        truckId
        truckName
        type
        updatedAt
        updatedBy
        voucherCode
        voucherDiscount
        voucherId
        voucherNumber
        voucherOrderId
        voucherRefunded
        voucherTitle
      }
      orderDetails {
        associatedProducts {
          productId
          productImage
          productSku
          productTitle
          productUOMId
          quantity
          variantName1
          variantName2
          variantName3
          variantValue1
          variantValue2
          variantValue3
        }
        comment
        compareAtPrice
        createdAt
        createdBy
        customerId
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        description
        fulfilledQuantity
        grandTotal
        isFreeItem
        itemId
        itemImage
        itemIsVirtualGoods
        itemProperty
        itemSku
        itemStatus
        itemTitle
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        mandatoryItem
        manualPaymentReceipt
        merchantId
        orderDetailId
        orderId
        orderNumber
        orderedQuantity
        pickupCompareAtPrice
        pickupPrice
        pickupPriceWithTax
        price
        priceWithTax
        promoCode
        promoCodeDiscount
        rating
        redemptionCode
        refundQuantity
        selectedModifierGroups {
          isItemsControlAvailable
          isSelected
          modifier {
            availableStatus
            isSelected
            modifierId
            modifierName
            price
          }
          modifierGroupId
          modifierGroupName
          modifierGroupType
          requestRemark
          selectionRangeMax
          selectionRangeMin
        }
        singleVoucherQuantity
        subtotal
        subtotalWithTax
        totalDiscount
        totalPromoCodeDiscount
        totalVoucherDiscount
        updatedAt
        updatedBy
        voucherDesc
        voucherDiscount
        voucherId
        voucherImage
        voucherNumber
        voucherTitle
        voucherType
      }
      status
    }
  }
`;
export const getCustomerOrderDetailList = /* GraphQL */ `
  query GetCustomerOrderDetailList(
    $accessToken: String
    $customerId: String
    $domain: String
    $merchantId: String
    $orderId: String
  ) {
    getCustomerOrderDetailList(
      accessToken: $accessToken
      customerId: $customerId
      domain: $domain
      merchantId: $merchantId
      orderId: $orderId
    ) {
      isAdvancedOrderScheduleValid
      message
      order {
        ETACustomer
        ETAMerchant
        accumulatedRefundAmount
        actualDeliveryFee
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        cancelledBy
        cancelledReason
        createdAt
        createdBy
        customerAccountNo
        customerFirstName
        customerIP
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        deliveryAddress
        deliveryCity
        deliveryCountry
        deliveryDiscount
        deliveryLatitude
        deliveryLongitude
        deliveryMode
        deliveryNumber
        deliveryOrderDateTime
        deliveryOrderId
        deliveryPartnerName
        deliveryPostalCode
        deliveryState
        deliveryStatus
        deliveryType
        driverLatitude
        driverLongitude
        driverName
        driverPhoneNumber
        driverPlateNumber
        estimatedDeliveryFee
        grandTotal
        hasPreOrder
        image
        isAdvancedOrder
        isPreOrder
        isRefunded
        isReviewAvailable
        mainOrderId
        manualPaymentMethodName
        manualPaymentReceipt
        merchantId
        noteToRider
        orderCancellationDateTime
        orderCollectedDateTime
        orderCompletedDateTime
        orderDateTime
        orderId
        orderNumber
        orderType
        overallRating
        packageNumber
        partialFulfilmentAmount
        partialFulfilmentDiscount
        paymentDateTime
        paymentMethod
        paymentStatus
        paymentType
        pickupAddress
        pickupCity
        pickupCountry
        pickupPostalCode
        pickupState
        pointsCollectable
        promoCode
        promoCodeDiscount
        promoCodeId
        promoCodeTitle
        receiptFileName
        refundAmount
        refundCompleteDateTime
        refundReason
        remarks
        requiredCutlery
        salesAgentId
        salesChannelName
        scheduledDate
        scheduledDateTime
        scheduledTime
        sellerNote
        standardDeliveryAwb
        standardDeliveryAwbIdLink
        standardDeliveryTrackingUrl
        status
        storeAddress
        storeCode
        storeId
        storeName
        subtotal
        subtotalWithTax
        tableNumber
        taggingNames
        totalDiscount
        totalOrderItems
        totalPromoCodeDiscount
        totalRefundedAmount
        totalVoucherDiscount
        transactionId
        truckId
        truckName
        type
        updatedAt
        updatedBy
        voucherCode
        voucherDiscount
        voucherId
        voucherNumber
        voucherOrderId
        voucherRefunded
        voucherTitle
      }
      orderDetails {
        associatedProducts {
          productId
          productImage
          productSku
          productTitle
          productUOMId
          quantity
          variantName1
          variantName2
          variantName3
          variantValue1
          variantValue2
          variantValue3
        }
        comment
        compareAtPrice
        createdAt
        createdBy
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        description
        fulfilledQuantity
        isCancelledItem
        isFreeItem
        isPreOrder
        itemId
        itemImage
        itemIsVirtualGoods
        itemProperty
        itemSku
        itemStatus
        itemTitle
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        mandatoryItem
        manualPaymentReceipt
        merchantId
        orderDetailId
        orderId
        orderNumber
        orderedQuantity
        pickupCompareAtPrice
        pickupPrice
        pickupPriceWithTax
        price
        priceWithTax
        promoCode
        promoCodeDiscount
        rating
        redemptionCode
        refundQuantity
        selectedModifierGroups {
          isItemsControlAvailable
          isSelected
          modifier {
            availableStatus
            isSelected
            modifierId
            modifierName
            price
          }
          modifierGroupId
          modifierGroupName
          modifierGroupType
          requestRemark
          selectionRangeMax
          selectionRangeMin
        }
        subtotal
        subtotalWithTax
        timeslotEndDateTime
        timeslotStartDateTime
        totalDiscount
        totalPromoCodeDiscount
        totalVoucherDiscount
        updatedAt
        updatedBy
        voucherDiscount
        voucherNumber
      }
      scheduledDateTime
      status
    }
  }
`;
export const getCustomerOrderList = /* GraphQL */ `
  query GetCustomerOrderList(
    $accessToken: String
    $customerId: String
    $domain: String
    $filter: SearchOrdersFilter
    $filterType: String
    $inStoreFilter: SearchInStoreOrdersFilter
    $limit: Int
    $merchantId: String
    $nextToken: Int
    $sort: ElasticSearchSortDirection
  ) {
    getCustomerOrderList(
      accessToken: $accessToken
      customerId: $customerId
      domain: $domain
      filter: $filter
      filterType: $filterType
      inStoreFilter: $inStoreFilter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      inStoreOrders {
        accountNo
        area
        createdAt
        createdBy
        duplicateRecords {
          accountNo
          area
          createdAt
          createdBy
          duplicateRecords {
            accountNo
            area
            createdAt
            createdBy
            duplicateRecords {
              accountNo
              area
              createdAt
              createdBy
              firstName
              hasDuplicateRecords
              inStoreOrderId
              lastName
              merchantId
              posTerminalNo
              receiptNo
              status
              storeArea
              storeName
              storeNo
              totalAmountSpent
              totalDiscountAmount
              totalPointsCollected
              totalPointsRedeemed
              totalVoucherDiscountAmount
              transactionDate
              transactionTime
              updatedAt
              updatedBy
            }
            firstName
            hasDuplicateRecords
            inStoreOrderId
            lastName
            merchantId
            posTerminalNo
            receiptNo
            status
            storeArea
            storeName
            storeNo
            totalAmountSpent
            totalDiscountAmount
            totalPointsCollected
            totalPointsRedeemed
            totalVoucherDiscountAmount
            transactionDate
            transactionTime
            updatedAt
            updatedBy
          }
          firstName
          hasDuplicateRecords
          inStoreOrderId
          lastName
          merchantId
          posTerminalNo
          receiptNo
          status
          storeArea
          storeName
          storeNo
          totalAmountSpent
          totalDiscountAmount
          totalPointsCollected
          totalPointsRedeemed
          totalVoucherDiscountAmount
          transactionDate
          transactionTime
          updatedAt
          updatedBy
        }
        firstName
        hasDuplicateRecords
        inStoreOrderId
        lastName
        merchantId
        posTerminalNo
        receiptNo
        status
        storeArea
        storeName
        storeNo
        totalAmountSpent
        totalDiscountAmount
        totalPointsCollected
        totalPointsRedeemed
        totalVoucherDiscountAmount
        transactionDate
        transactionTime
        updatedAt
        updatedBy
      }
      message
      nextToken
      orders {
        ETACustomer
        ETAMerchant
        accumulatedRefundAmount
        actualDeliveryFee
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        cancelledBy
        cancelledReason
        createdAt
        createdBy
        customerAccountNo
        customerFirstName
        customerIP
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        deliveryAddress
        deliveryCity
        deliveryCountry
        deliveryDiscount
        deliveryLatitude
        deliveryLongitude
        deliveryMode
        deliveryNumber
        deliveryOrderDateTime
        deliveryOrderId
        deliveryPartnerName
        deliveryPostalCode
        deliveryState
        deliveryStatus
        deliveryType
        driverLatitude
        driverLongitude
        driverName
        driverPhoneNumber
        driverPlateNumber
        estimatedDeliveryFee
        grandTotal
        hasPreOrder
        image
        isAdvancedOrder
        isPreOrder
        isRefunded
        isReviewAvailable
        mainOrderId
        manualPaymentMethodName
        manualPaymentReceipt
        merchantId
        noteToRider
        orderCancellationDateTime
        orderCollectedDateTime
        orderCompletedDateTime
        orderDateTime
        orderId
        orderNumber
        orderType
        overallRating
        packageNumber
        partialFulfilmentAmount
        partialFulfilmentDiscount
        paymentDateTime
        paymentMethod
        paymentStatus
        paymentType
        pickupAddress
        pickupCity
        pickupCountry
        pickupPostalCode
        pickupState
        pointsCollectable
        promoCode
        promoCodeDiscount
        promoCodeId
        promoCodeTitle
        receiptFileName
        refundAmount
        refundCompleteDateTime
        refundReason
        remarks
        requiredCutlery
        salesAgentId
        salesChannelName
        scheduledDate
        scheduledDateTime
        scheduledTime
        sellerNote
        standardDeliveryAwb
        standardDeliveryAwbIdLink
        standardDeliveryTrackingUrl
        status
        storeAddress
        storeCode
        storeId
        storeName
        subtotal
        subtotalWithTax
        tableNumber
        taggingNames
        totalDiscount
        totalOrderItems
        totalPromoCodeDiscount
        totalRefundedAmount
        totalVoucherDiscount
        transactionId
        truckId
        truckName
        type
        updatedAt
        updatedBy
        voucherCode
        voucherDiscount
        voucherId
        voucherNumber
        voucherOrderId
        voucherRefunded
        voucherTitle
      }
      status
      total
    }
  }
`;
export const getCustomerOrderPaymentMessage = /* GraphQL */ `
  query GetCustomerOrderPaymentMessage(
    $accessToken: String
    $customerId: String
    $merchantId: String
    $messageId: String
  ) {
    getCustomerOrderPaymentMessage(
      accessToken: $accessToken
      customerId: $customerId
      merchantId: $merchantId
      messageId: $messageId
    ) {
      createdAt
      errorMessage
      gatewayPaymentId
      gatewayPaymentParams
      gatewayPaymentUrl
      gatewayType
      merchantId
      messageId
      orderId
      orderNumber
      orderPaymentMessageId
      updatedAt
    }
  }
`;
export const getCustomerVoucherCart = /* GraphQL */ `
  query GetCustomerVoucherCart($customerId: String, $merchantId: String) {
    getCustomerVoucherCart(customerId: $customerId, merchantId: $merchantId) {
      message
      status
      voucher {
        createdAt
        customerId
        merchantId
        voucherCartId
        voucherId
        voucherImage
        voucherPrice
        voucherQuantity
        voucherTitle
        voucherTotalPrice
      }
    }
  }
`;
export const getCustomerVoucherList = /* GraphQL */ `
  query GetCustomerVoucherList(
    $accessToken: String
    $customerId: String
    $filterType: String
    $merchantId: String
    $voucherType: String
  ) {
    getCustomerVoucherList(
      accessToken: $accessToken
      customerId: $customerId
      filterType: $filterType
      merchantId: $merchantId
      voucherType: $voucherType
    ) {
      message
      status
      totalItem
      voucherList {
        confirmationDate
        customerVoucherId
        description
        expiryDate
        giftCardValue
        image
        isShareable
        merchantId
        pendingAccept
        pendingReceiverAccept
        quantity
        remainingQuantity
        senderName
        senderNameList
        title
        totalAccepted
        totalPending
        voucherCode
        voucherIcon
        voucherId
        voucherValue
      }
    }
  }
`;
export const getCustomerWishList = /* GraphQL */ `
  query GetCustomerWishList(
    $accessToken: String
    $customerId: String
    $merchantId: String
    $nextToken: String
    $orderType: String
    $storeId: String
  ) {
    getCustomerWishList(
      accessToken: $accessToken
      customerId: $customerId
      merchantId: $merchantId
      nextToken: $nextToken
      orderType: $orderType
      storeId: $storeId
    ) {
      message
      products {
        compareAtPrice
        createdAt
        createdBy
        customerId
        customerWishListId
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        itemId
        itemImage
        itemProperty
        itemSeoUrl
        itemSku
        itemTitle
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        merchantId
        pickupCompareAtPrice
        pickupPrice
        pickupPriceWithoutTax
        price
        priceWithoutTax
        productId
        salesChannelName
        updatedAt
        updatedBy
      }
      status
    }
  }
`;
export const getDeliveryQuotation = /* GraphQL */ `
  query GetDeliveryQuotation(
    $customerCartIds: [String]
    $customerFirstName: String
    $customerLastName: String
    $customerMobileNo: String
    $deliveryAddress: String
    $deliveryCity: String
    $deliveryCountry: String
    $deliveryPostalCode: String
    $deliveryState: String
    $isAdvancedOrder: Boolean
    $latitude: Float
    $longitude: Float
    $merchantId: String
    $promoCode: String
    $scheduledDateTime: String
    $storeId: String
    $truckId: String
  ) {
    getDeliveryQuotation(
      customerCartIds: $customerCartIds
      customerFirstName: $customerFirstName
      customerLastName: $customerLastName
      customerMobileNo: $customerMobileNo
      deliveryAddress: $deliveryAddress
      deliveryCity: $deliveryCity
      deliveryCountry: $deliveryCountry
      deliveryPostalCode: $deliveryPostalCode
      deliveryState: $deliveryState
      isAdvancedOrder: $isAdvancedOrder
      latitude: $latitude
      longitude: $longitude
      merchantId: $merchantId
      promoCode: $promoCode
      scheduledDateTime: $scheduledDateTime
      storeId: $storeId
      truckId: $truckId
    ) {
      deliveryOptions {
        estimatedDuration
        name
        rate
      }
      message
      status
    }
  }
`;
export const getFaqList = /* GraphQL */ `
  query GetFaqList($domain: String, $merchantId: String) {
    getFaqList(domain: $domain, merchantId: $merchantId) {
      categories {
        childItems {
          answer
          createdAt
          createdBy
          faqCategory
          faqId
          faqType
          merchantId
          parentId
          question
          sequence
          updatedAt
          updatedBy
        }
        createdAt
        createdBy
        faqCategoryId
        merchantId
        sequence
        title
        updatedAt
        updatedBy
      }
      items {
        category
        faqContent {
          answer
          createdAt
          createdBy
          faqCategory
          faqId
          faqType
          merchantId
          parentId
          question
          sequence
          updatedAt
          updatedBy
        }
      }
      message
      status
    }
  }
`;
export const getFeaturedHomeCollectionCache = /* GraphQL */ `
  query GetFeaturedHomeCollectionCache($merchantId: String, $storeId: String) {
    getFeaturedHomeCollectionCache(merchantId: $merchantId, storeId: $storeId) {
      homeCollections {
        collectionIcon
        collectionId
        collectionImage
        collectionName
        collectionSeoUrl
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        homeCollectionId
        homeCollectionType
        isDisabled
        merchantId
        sequence
        title
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const getGiftCardDetail = /* GraphQL */ `
  query GetGiftCardDetail($merchantId: String, $voucherId: String) {
    getGiftCardDetail(merchantId: $merchantId, voucherId: $voucherId) {
      giftCardDetail {
        customerId
        giftCardAmount
        giftCardMessage
        giftCardTitle
        image
        ribbonColor
        senderName
        voucherCode
      }
      message
      status
    }
  }
`;
export const getGiftCardTemplateList = /* GraphQL */ `
  query GetGiftCardTemplateList {
    getGiftCardTemplateList {
      giftCardTemplateList {
        category
        giftCardTemplateList {
          description
          giftCardTemplateId
          image
          isDisabled
          ribbonColor
          sequence
          title
        }
      }
      message
      status
      totalItem
    }
  }
`;
export const getHeader = /* GraphQL */ `
  query GetHeader($merchantId: String) {
    getHeader(merchantId: $merchantId) {
      image
      message
      status
      title
    }
  }
`;
export const getHelpCenterFaqCache = /* GraphQL */ `
  query GetHelpCenterFaqCache($platform: String) {
    getHelpCenterFaqCache(platform: $platform) {
      items {
        _typename
        answer
        createdAt
        faqCategory
        helpCenterFaqId
        question
        sequence
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHelpCenterOrderList = /* GraphQL */ `
  query GetHelpCenterOrderList(
    $accessToken: String
    $customerId: String
    $domain: String
    $filterType: String
    $merchantId: String
    $orderNumber: String
    $source: String
  ) {
    getHelpCenterOrderList(
      accessToken: $accessToken
      customerId: $customerId
      domain: $domain
      filterType: $filterType
      merchantId: $merchantId
      orderNumber: $orderNumber
      source: $source
    ) {
      message
      orders {
        ETACustomer
        ETAMerchant
        accumulatedRefundAmount
        actualDeliveryFee
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        cancelledBy
        cancelledReason
        createdAt
        createdBy
        customerAccountNo
        customerFirstName
        customerIP
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        deliveryAddress
        deliveryCity
        deliveryCountry
        deliveryDiscount
        deliveryLatitude
        deliveryLongitude
        deliveryMode
        deliveryNumber
        deliveryOrderDateTime
        deliveryOrderId
        deliveryPartnerName
        deliveryPostalCode
        deliveryState
        deliveryStatus
        deliveryType
        driverLatitude
        driverLongitude
        driverName
        driverPhoneNumber
        driverPlateNumber
        estimatedDeliveryFee
        grandTotal
        image
        isAdvancedOrder
        isRefunded
        isReviewAvailable
        manualPaymentMethodName
        manualPaymentReceipt
        merchantId
        noteToRider
        ongoingTicket
        orderCancellationDateTime
        orderCollectedDateTime
        orderCompletedDateTime
        orderDateTime
        orderId
        orderNumber
        orderType
        overallRating
        packageNumber
        partialFulfilmentAmount
        partialFulfilmentDiscount
        paymentDateTime
        paymentMethod
        paymentStatus
        paymentType
        pickupAddress
        pickupCity
        pickupCountry
        pickupPostalCode
        pickupState
        pointsCollectable
        promoCode
        promoCodeDiscount
        promoCodeId
        promoCodeTitle
        quantity
        refundAmount
        refundCompleteDateTime
        refundReason
        remarks
        requiredCutlery
        salesChannelName
        scheduledDate
        scheduledDateTime
        scheduledTime
        sellerNote
        senderName
        standardDeliveryAwb
        standardDeliveryAwbIdLink
        standardDeliveryTrackingUrl
        status
        storeCode
        storeId
        storeName
        subtotal
        subtotalWithTax
        tableNumber
        taggingNames
        totalDiscount
        totalOrderItems
        totalPromoCodeDiscount
        totalRefundedAmount
        totalVoucherDiscount
        transactionId
        truckId
        truckName
        type
        updatedAt
        updatedBy
        voucherDiscount
        voucherId
        voucherNumber
        voucherOrderId
        voucherProcessed
        voucherType
      }
      status
    }
  }
`;
export const getHomeScreenCollectionCache = /* GraphQL */ `
  query GetHomeScreenCollectionCache(
    $accessToken: String
    $merchantId: String
    $orderType: String
    $storeId: String
  ) {
    getHomeScreenCollectionCache(
      accessToken: $accessToken
      merchantId: $merchantId
      orderType: $orderType
      storeId: $storeId
    ) {
      collectionsAndItems {
        collectionImage
        homeCollectionTitle
        items {
          compareAtPrice
          cover
          deliveryCompareAtPrice
          deliveryCompareAtPriceRange
          deliveryPrice
          deliveryPriceRange
          deliveryPriceWithTax
          deliveryPriceWithTaxRange
          description
          effectiveEndDateTime
          effectiveStartDateTime
          hasStock
          hasVariant
          homeCollectionId
          homeCollectionTitle
          image
          isDisabled
          isNewArrival
          isPreOrder
          itemId
          itemProperty
          memberDiscount {
            type
            value
          }
          price
          priceWithTax
          productIsDisabled
          promotionEndDateTime
          promotionStartDateTime
          seoUrl
          title
          totalRatings
          totalReviews
          updatedAt
          video
        }
        productCollectionId
        productCollectionName
        productCollectionSeoUrl
        selectedTags {
          smartTaggingId
          tagName
          taggingId
        }
        sequence
      }
      hasStock
      message
      productStatus
      status
    }
  }
`;
export const getIconBar = /* GraphQL */ `
  query GetIconBar($merchantId: String) {
    getIconBar(merchantId: $merchantId) {
      icons {
        description
        iconId
        image
        merchantId
        title
      }
      message
      status
    }
  }
`;
export const getLandingPageBannerCache = /* GraphQL */ `
  query GetLandingPageBannerCache($accessToken: String, $merchantId: String) {
    getLandingPageBannerCache(
      accessToken: $accessToken
      merchantId: $merchantId
    ) {
      banners {
        buttonActionValue
        detailPageImage
        homeImage
        isDisabled
        landingPageBannerId
        merchantId
        sequence
        title
      }
      message
      status
    }
  }
`;
export const getLandingPageBannerDetail = /* GraphQL */ `
  query GetLandingPageBannerDetail(
    $domain: String
    $merchantId: String
    $seoUrl: String
    $sequence: Int
  ) {
    getLandingPageBannerDetail(
      domain: $domain
      merchantId: $merchantId
      seoUrl: $seoUrl
      sequence: $sequence
    ) {
      bannerDetail {
        buttonActionValue
        detailPageImage
        homeImage
        isDisabled
        landingPageBannerId
        merchantId
        sequence
        title
      }
      message
      status
    }
  }
`;
export const getLandingPageMenuCache = /* GraphQL */ `
  query GetLandingPageMenuCache(
    $merchantId: String
    $platform: String
    $version: String
  ) {
    getLandingPageMenuCache(
      merchantId: $merchantId
      platform: $platform
      version: $version
    ) {
      menus {
        actionId
        actionType
        createdAt
        createdBy
        effectiveEndDate
        effectiveStartDate
        image
        isDisabled
        landingPageMenuId
        merchantId
        sequenceOrder
        title
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const getLandingPageProductCache = /* GraphQL */ `
  query GetLandingPageProductCache(
    $merchantId: String
    $orderType: String
    $page: Int
    $pageSize: Int
    $storeId: String
  ) {
    getLandingPageProductCache(
      merchantId: $merchantId
      orderType: $orderType
      page: $page
      pageSize: $pageSize
      storeId: $storeId
    ) {
      departmentId
      message
      productTaggingId
      products {
        categories
        category
        createdBy
        departments
        description
        dimension
        discount
        discountEndDate
        discountPercentage
        discountStartDate
        discountedPrice
        ecommerceMaximumQuantity
        image
        isAvailable
        isDisabled
        itemCategoryCode
        minDeliveryDuration
        minFoodPreparationDuration
        name
        pickupMaximumQuantity
        price
        productId
        promoCode
        promotionDescription
        sku
        taggings
        temperature
        title
        uom
        updatedBy
      }
      status
      title
      totalCount
    }
  }
`;
export const getLegalPolicy = /* GraphQL */ `
  query GetLegalPolicy($domain: String, $merchantId: String) {
    getLegalPolicy(domain: $domain, merchantId: $merchantId) {
      legalPolicies {
        createdAt
        createdBy
        isDisabled
        merchantId
        policyContent
        policyType
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const getManualPaymentOrderStatus = /* GraphQL */ `
  query GetManualPaymentOrderStatus(
    $domain: String
    $merchantId: String
    $orderNumber: String
  ) {
    getManualPaymentOrderStatus(
      domain: $domain
      merchantId: $merchantId
      orderNumber: $orderNumber
    ) {
      grandTotal
      message
      orderId
      orderStatus
      status
    }
  }
`;
export const getMemberPointLog = /* GraphQL */ `
  query GetMemberPointLog(
    $accessToken: String
    $customerId: String
    $merchantId: String
  ) {
    getMemberPointLog(
      accessToken: $accessToken
      customerId: $customerId
      merchantId: $merchantId
    ) {
      memberPointLog {
        createdAt
        customerId
        expiredDateTime
        memberId
        memberPointLogId
        orderId
        orderNumber
        points
        referenceId
        type
        updatedAt
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const getMenuCache = /* GraphQL */ `
  query GetMenuCache($merchantId: String) {
    getMenuCache(merchantId: $merchantId) {
      menus {
        actionId
        actionType
        createdAt
        createdBy
        effectiveEndDate
        effectiveStartDate
        isDisabled
        menuId
        merchantId
        parentId
        sequenceOrder
        submenus {
          actionId
          actionType
          createdAt
          createdBy
          effectiveEndDate
          effectiveStartDate
          isDisabled
          menuId
          merchantId
          parentId
          sequenceOrder
          submenus {
            actionId
            actionType
            createdAt
            createdBy
            effectiveEndDate
            effectiveStartDate
            isDisabled
            menuId
            merchantId
            parentId
            sequenceOrder
            submenus {
              actionId
              actionType
              createdAt
              createdBy
              effectiveEndDate
              effectiveStartDate
              isDisabled
              menuId
              merchantId
              parentId
              sequenceOrder
              title
              updatedAt
              updatedBy
            }
            title
            updatedAt
            updatedBy
          }
          title
          updatedAt
          updatedBy
        }
        title
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const getMerchantDetails = /* GraphQL */ `
  query GetMerchantDetails($merchantId: String) {
    getMerchantDetails(merchantId: $merchantId) {
      aboutUsBanner
      aboutUsDescription
      address
      copyright
      email
      facebookName
      facebookUrl
      googlePlayUrl
      instagramName
      instagramUrl
      linkedInName
      linkedInUrl
      message
      name
      phone
      playStoreUrl
      status
      tiktokName
      tiktokUrl
      twitterName
      twitterUrl
      whatsappNo
      youtubeName
      youtubeUrl
    }
  }
`;
export const getMerchantLogo = /* GraphQL */ `
  query GetMerchantLogo($merchantId: String) {
    getMerchantLogo(merchantId: $merchantId) {
      logo
      message
      name
      status
    }
  }
`;
export const getMerchantVoucherDetail = /* GraphQL */ `
  query GetMerchantVoucherDetail($merchantId: String, $voucherId: String) {
    getMerchantVoucherDetail(merchantId: $merchantId, voucherId: $voucherId) {
      message
      status
      voucherDetail {
        category
        customerCondition
        deliveryDiscountType
        description
        discountAmountCap
        discountOnProductValue
        image
        merchantId
        minimumAmount
        minimumCondition
        minimumQuantity
        orderType
        price
        productConditions {
          exclude
          ids
          type
        }
        productsDiscount {
          ids
          type
        }
        requiredPoints
        status
        title
        type
        voucherIcon
        voucherId
      }
    }
  }
`;
export const getMerchantVoucherList = /* GraphQL */ `
  query GetMerchantVoucherList(
    $filter: ListProductsWithProductUOMsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $requiredPoints: Boolean
    $sort: ElasticSearchSortDirection
  ) {
    getMerchantVoucherList(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      requiredPoints: $requiredPoints
      sort: $sort
    ) {
      message
      nextToken
      status
      total
      voucherList {
        category
        customerCondition
        deliveryDiscountType
        description
        discountAmountCap
        discountOnProductValue
        image
        merchantId
        minimumAmount
        minimumCondition
        minimumQuantity
        orderType
        price
        productConditions {
          exclude
          ids
          type
        }
        productsDiscount {
          ids
          type
        }
        requiredPoints
        status
        title
        type
        voucherIcon
        voucherId
      }
    }
  }
`;
export const getNearbyStores = /* GraphQL */ `
  query GetNearbyStores(
    $city: String
    $customerAddress: String
    $deliveryMode: String
    $deliveryServiceAvailable: Boolean
    $keyword: String
    $latitude: Float
    $longitude: Float
    $merchantId: String
    $orderType: String
    $pickupServiceAvailable: Boolean
    $state: String
    $taggings: [String]
  ) {
    getNearbyStores(
      city: $city
      customerAddress: $customerAddress
      deliveryMode: $deliveryMode
      deliveryServiceAvailable: $deliveryServiceAvailable
      keyword: $keyword
      latitude: $latitude
      longitude: $longitude
      merchantId: $merchantId
      orderType: $orderType
      pickupServiceAvailable: $pickupServiceAvailable
      state: $state
      taggings: $taggings
    ) {
      address
      advancedOrderEnabled
      city
      code
      deliveryDuration
      deliveryFee
      deliveryMaxPurchaseQuantity
      deliveryMinPurchaseAmount
      deliveryPreparationTime
      deliveryServiceAvailable
      distance
      groupName
      isDisabled
      items {
        deliveryCompareAtPrice
        deliveryCostPerItem
        deliveryPrice
        deliveryPriceWithTax
        isSellingOffline
        itemId
        itemImage
        itemProperty
        itemTitle
        pickupCompareAtPrice
        pickupCostPerItem
        pickupPrice
        pickupPriceWithTax
        productId
        quantityForSales
        storeProductId
      }
      latitude
      longitude
      managerContact
      managerEmail
      managerName
      maxAdvancedOrderDay
      message
      minPurchase
      name
      offlineStoreOperate24Hour
      onlineStoreOperate24Hour
      pickupServiceAvailable
      postalCode
      primaryEmail
      state
      status
      storeId
      storeOperatingHourList {
        close
        day
        enabled
        endingTimeAfterMidnight
        open
      }
      storeOperatingHours
      taggingNames
      todayCloseTime
      todayOpenTime
      userId
      visibleToOnlineStore
    }
  }
`;
export const getNewsLetter = /* GraphQL */ `
  query GetNewsLetter($merchantId: String) {
    getNewsLetter(merchantId: $merchantId) {
      buttonLabel
      description
      message
      status
      title
    }
  }
`;
export const getOrderInvoice = /* GraphQL */ `
  query GetOrderInvoice($merchantId: String, $orderId: String) {
    getOrderInvoice(merchantId: $merchantId, orderId: $orderId) {
      message
      order {
        AWBRef
        barcode
        billingAddress
        currency
        deliveryAddressType
        deliveryCode
        deliveryDiscount
        deliveryNumber
        deliveryOrderDateTime
        deliveryType
        estimatedDeliveryFee
        grandTotal
        invoiceNo
        issueDateTime
        merchantEmail
        merchantName
        officeRemarks
        orderDateTime
        orderId
        orderItems {
          associatedProducts {
            productId
            productImage
            productSku
            productTitle
            productUOMId
            quantity
            variantName1
            variantName2
            variantName3
            variantValue1
            variantValue2
            variantValue3
          }
          comment
          compareAtPrice
          createdAt
          createdBy
          deliveryCompareAtPrice
          deliveryPrice
          deliveryPriceWithTax
          description
          fulfilledQuantity
          isCancelledItem
          isFreeItem
          isPreOrder
          itemId
          itemImage
          itemIsVirtualGoods
          itemProperty
          itemSku
          itemStatus
          itemTitle
          itemVariantName1
          itemVariantName2
          itemVariantName3
          itemVariantValue1
          itemVariantValue2
          itemVariantValue3
          mandatoryItem
          manualPaymentReceipt
          merchantId
          orderDetailId
          orderId
          orderNumber
          orderedQuantity
          pickupCompareAtPrice
          pickupPrice
          pickupPriceWithTax
          price
          priceWithTax
          promoCode
          promoCodeDiscount
          rating
          redemptionCode
          refundQuantity
          selectedModifierGroups {
            isItemsControlAvailable
            isSelected
            modifier {
              availableStatus
              isSelected
              modifierId
              modifierName
              price
            }
            modifierGroupId
            modifierGroupName
            modifierGroupType
            requestRemark
            selectionRangeMax
            selectionRangeMin
          }
          subtotal
          subtotalWithTax
          timeslotEndDateTime
          timeslotStartDateTime
          totalDiscount
          totalPromoCodeDiscount
          totalVoucherDiscount
          updatedAt
          updatedBy
          voucherDiscount
          voucherNumber
        }
        parcelInfo
        paymentAmount
        paymentType
        portCode
        printDateTime
        promoCode
        promoCodeDiscount
        promoCodeTitle
        recipientInfo {
          address
          name
          phone
        }
        remarks
        salesChannelName
        sellerRemarks
        senderInfo {
          merchantAddress
          merchantName
          merchantPhone
        }
        shippingAddress
        status
        storeAddress
        storeName
        subtotal
        subtotalWithTax
        totalOrderItems
        type
        weight
      }
      status
    }
  }
`;
export const getPageLayout = /* GraphQL */ `
  query GetPageLayout($merchantId: String, $type: String) {
    getPageLayout(merchantId: $merchantId, type: $type) {
      message
      pageLayout {
        collectionProductDisplayCount
        createdAt
        createdBy
        merchantId
        newsletterBanner
        newsletterText
        pageLayoutId
        type
        updatedAt
        updatedBy
      }
      status
    }
  }
`;
export const getPaymentOptions = /* GraphQL */ `
  query GetPaymentOptions($domain: String, $merchantId: String) {
    getPaymentOptions(domain: $domain, merchantId: $merchantId) {
      manualPaymentOptionList {
        TNGPaymentLink
        accountNumber
        bankAccountName
        isBankTransfer
        isDisabled
        manualPaymentMethodName
        manualPaymentOptionsId
        merchantId
        paymentInstructions
        qrCode
      }
      message
      onBoardRole
      status
    }
  }
`;
export const getPendingProfessionalServicesMerchantList = /* GraphQL */ `
  query GetPendingProfessionalServicesMerchantList {
    getPendingProfessionalServicesMerchantList {
      merchantList {
        aboutUsBanner
        aboutUsDescription
        activated
        address
        code
        copyright
        createdAt
        currency
        domain
        facebookName
        facebookPixelId
        facebookUrl
        favicon
        googleAnalyticsId
        googlePlayUrl
        instagramName
        instagramUrl
        isBlocked
        linkedInName
        linkedInUrl
        logo
        membershipTierActivated
        merchantId
        name
        notificationEmail
        offlineStore
        onlineStore
        ownerEmail
        ownerName
        ownerPhone
        playStoreUrl
        senderEmail
        seoDescription
        seoTitle
        serviceId
        servicePassword
        storeId
        tax
        tiktokName
        tiktokUrl
        twitterName
        twitterUrl
        updatedAt
        whatsappNo
        youtubeName
        youtubeUrl
      }
      message
      status
    }
  }
`;
export const getProductBundleDetails = /* GraphQL */ `
  query GetProductBundleDetails(
    $domain: String
    $merchantId: String
    $orderType: String
    $seoUrl: String
    $storeId: String
  ) {
    getProductBundleDetails(
      domain: $domain
      merchantId: $merchantId
      orderType: $orderType
      seoUrl: $seoUrl
      storeId: $storeId
    ) {
      barcode
      collectionNames
      cover
      deliveryCompareAtPrice
      deliveryCostPerItem
      deliveryPrice
      deliveryPriceWithTax
      description
      effectiveEndDateTime
      effectiveStartDateTime
      image
      isDisabled
      isProductBundleTaxable
      merchantId
      message
      pickupCompareAtPrice
      pickupCostPerItem
      pickupPrice
      pickupPriceWithTax
      productBundleDetails {
        merchantId
        productBundleDetailId
        productBundleId
        productId
        productImage
        productSku
        productTitle
        productUOMId
        quantity
        updatedAt
        updatedBy
        variantName1
        variantName2
        variantName3
        variantValue1
        variantValue2
        variantValue3
      }
      productBundleId
      productBundlePricing {
        salesChannelName
        storeProducts {
          compareAtPrice
          createdAt
          createdBy
          deliveryCompareAtPrice
          deliveryCostPerItem
          deliveryPrice
          deliveryPriceWithTax
          isDisabled
          marketPlaceAttributes {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceBrand {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceCategories {
            actualName
            hasChildren
            inputType
            isRequired
            parentId
            type
            typeId
            typeName
            typeValues {
              valueEnglishName
              valueId
              valueName
              valueUnit
            }
          }
          marketPlaceProductCode
          marketPlaceProductUOMCode
          merchantId
          noOfPurchases
          pickupCompareAtPrice
          pickupCostPerItem
          pickupPrice
          pickupPriceWithTax
          price
          priceWithTax
          quantityForSales
          quantityType
          salesChannelName
          storeId
          storeName
          storeProductId
          updatedAt
          updatedBy
        }
      }
      promotionEndDateTime
      promotionStartDateTime
      quantityForSales
      sellOnFacebookStore
      sellOnFoodPanda
      sellOnGrabFood
      sellOnGrabMart
      sellOnInstagram
      sellOnLazada
      sellOnOfflineStore
      sellOnOnlineStore
      sellOnPandaMart
      sellOnShopee
      seoDescription
      seoTitle
      seoUrl
      shippingDimensionHeight
      shippingDimensionLength
      shippingDimensionWidth
      shippingWeight
      shippingWeightUnit
      sku
      status
      taggingNames
      title
      totalStockQuantity
    }
  }
`;
export const getProductCache = /* GraphQL */ `
  query GetProductCache(
    $departmentId: String
    $merchantId: String
    $orderType: String
    $page: Int
    $pageSize: Int
    $productTaggingId: String
    $storeId: String
  ) {
    getProductCache(
      departmentId: $departmentId
      merchantId: $merchantId
      orderType: $orderType
      page: $page
      pageSize: $pageSize
      productTaggingId: $productTaggingId
      storeId: $storeId
    ) {
      departmentId
      message
      productTaggingId
      products {
        categories
        category
        createdBy
        departments
        description
        dimension
        discount
        discountEndDate
        discountPercentage
        discountStartDate
        discountedPrice
        ecommerceMaximumQuantity
        image
        isAvailable
        isDisabled
        itemCategoryCode
        minDeliveryDuration
        minFoodPreparationDuration
        name
        pickupMaximumQuantity
        price
        productId
        promoCode
        promotionDescription
        sku
        taggings
        temperature
        title
        uom
        updatedBy
      }
      status
      title
      totalCount
    }
  }
`;
export const getProductDetails = /* GraphQL */ `
  query GetProductDetails(
    $customerId: String
    $domain: String
    $merchantId: String
    $orderType: String
    $seoUrl: String
    $storeId: String
  ) {
    getProductDetails(
      customerId: $customerId
      domain: $domain
      merchantId: $merchantId
      orderType: $orderType
      seoUrl: $seoUrl
      storeId: $storeId
    ) {
      cover
      description
      discountPercentage
      image
      isPreOrder
      message
      modifierGroups {
        isItemsControlAvailable
        isSelected
        modifier {
          availableStatus
          isSelected
          modifierId
          modifierName
          price
        }
        modifierGroupId
        modifierGroupName
        modifierGroupType
        requestRemark
        selectionRangeMax
        selectionRangeMin
      }
      priceComparedAtPriceRange
      priceRange
      productIsDisabled
      productUOMs {
        barcode
        collectionNames
        compareAtPrice
        deliveryCompareAtPrice
        deliveryCostPerItem
        deliveryEffectiveEndDateTime
        deliveryEffectiveStartDateTime
        deliveryPrice
        deliveryPriceWithTax
        estimatedRestockDate
        image
        incomingQuantity
        isDisabled
        isNewArrival
        isProductTaxable
        marketPlaceAttributes {
          actualName
          hasChildren
          inputType
          isRequired
          parentId
          type
          typeId
          typeName
          typeValues {
            valueEnglishName
            valueId
            valueName
            valueUnit
          }
        }
        marketPlaceBrand {
          actualName
          hasChildren
          inputType
          isRequired
          parentId
          type
          typeId
          typeName
          typeValues {
            valueEnglishName
            valueId
            valueName
            valueUnit
          }
        }
        marketPlaceCategories {
          actualName
          hasChildren
          inputType
          isRequired
          parentId
          type
          typeId
          typeName
          typeValues {
            valueEnglishName
            valueId
            valueName
            valueUnit
          }
        }
        marketPlaceProductUOMCode
        marketPlaceShippingPartner
        memberDiscount {
          type
          value
        }
        merchantId
        newArrivalDate
        noOfPurchases
        pickupCompareAtPrice
        pickupCostPerItem
        pickupEffectiveEndDateTime
        pickupEffectiveStartDateTime
        pickupPrice
        pickupPriceWithTax
        price
        priceWithTax
        productId
        productTitle
        productUOMId
        productUOMPricingId
        quantityForSales
        quantityType
        salesChannelName
        shippingDimensionHeight
        shippingDimensionLength
        shippingDimensionWidth
        shippingWeight
        shippingWeightUnit
        sku
        storeId
        storeName
        storeProductId
        taggingNames
        totalStockQuantity
        trackQuantity
        variantName1
        variantName2
        variantName3
        variantValue1
        variantValue2
        variantValue3
      }
      status
      timeslotType
      timeslots {
        date
        timeList {
          endTime
          startTime
        }
      }
      title
      totalRatings
      totalReviews
      variantName1
      variantName2
      variantName3
      variantValues1
      variantValues2
      variantValues3
      video
    }
  }
`;
export const getProductsRecommendation = /* GraphQL */ `
  query GetProductsRecommendation(
    $merchantId: String
    $salesChannelName: String
  ) {
    getProductsRecommendation(
      merchantId: $merchantId
      salesChannelName: $salesChannelName
    ) {
      message
      products {
        barcode
        collectionNames
        continueSellingWhenOOS
        createdAt
        createdBy
        discountedPrice
        isDisabled
        media
        merchantId
        price
        productId
        productTitle
        productUOMId
        quantity
        seoUrl
        sku
        taggingNames
        trackQuantity
        updatedAt
        updatedBy
        variant {
          name
          value
        }
      }
      status
    }
  }
`;
export const getPromotionalWidgetCache = /* GraphQL */ `
  query GetPromotionalWidgetCache($accessToken: String, $merchantId: String) {
    getPromotionalWidgetCache(
      accessToken: $accessToken
      merchantId: $merchantId
    ) {
      message
      status
      widgets {
        createdAt
        createdBy
        merchantId
        promotionalWidgetId
        updatedAt
        updatedBy
        widgetName
        widgetUrl
      }
    }
  }
`;
export const getRecaptchaResponse = /* GraphQL */ `
  query GetRecaptchaResponse($token: String) {
    getRecaptchaResponse(token: $token) {
      message
      status
    }
  }
`;
export const getShopByCategoryCache = /* GraphQL */ `
  query GetShopByCategoryCache($merchantId: String) {
    getShopByCategoryCache(merchantId: $merchantId) {
      homeCollections {
        collectionIcon
        collectionId
        collectionImage
        collectionName
        collectionSeoUrl
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        homeCollectionId
        homeCollectionType
        isDisabled
        merchantId
        sequence
        title
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const getSiteNavigationCache = /* GraphQL */ `
  query GetSiteNavigationCache($merchantId: String) {
    getSiteNavigationCache(merchantId: $merchantId) {
      message
      siteNavigations {
        childItems {
          childItems {
            childItems {
              createdAt
              createdBy
              effectiveEndDateTime
              effectiveStartDateTime
              isDisabled
              linkValue
              menuType
              merchantId
              navigationType
              openNewTab
              parentId
              sequence
              siteNavigationId
              title
              updatedAt
              updatedBy
            }
            createdAt
            createdBy
            effectiveEndDateTime
            effectiveStartDateTime
            isDisabled
            linkValue
            menuType
            merchantId
            navigationType
            openNewTab
            parentId
            sequence
            siteNavigationId
            title
            updatedAt
            updatedBy
          }
          createdAt
          createdBy
          effectiveEndDateTime
          effectiveStartDateTime
          isDisabled
          linkValue
          menuType
          merchantId
          navigationType
          openNewTab
          parentId
          sequence
          siteNavigationId
          title
          updatedAt
          updatedBy
        }
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        isDisabled
        linkValue
        menuType
        merchantId
        navigationType
        openNewTab
        parentId
        sequence
        siteNavigationId
        title
        updatedAt
        updatedBy
      }
      status
    }
  }
`;
export const getSplashScreenCache = /* GraphQL */ `
  query GetSplashScreenCache($merchantId: String) {
    getSplashScreenCache(merchantId: $merchantId) {
      items {
        buttonActionValue
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        homeImage
        isDisabled
        merchantId
        sequence
        splashScreenId
        title
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const getStampingCampaignDetail = /* GraphQL */ `
  query GetStampingCampaignDetail(
    $customerId: String
    $merchantId: String
    $stampingCampaignId: String
    $stampingProgressId: String
  ) {
    getStampingCampaignDetail(
      customerId: $customerId
      merchantId: $merchantId
      stampingCampaignId: $stampingCampaignId
      stampingProgressId: $stampingProgressId
    ) {
      endDate
      extraProductCondition {
        ids {
          collectionName
          productBundleId
          productId
          productUOMId
        }
        type
      }
      extraProductStamp
      isEnable
      merchantId
      message
      minSpend
      orderType
      productCondition {
        ids {
          collectionName
          productBundleId
          productId
          productUOMId
        }
        type
      }
      rewardVoucher {
        category
        customerCondition
        deliveryDiscountType
        description
        discountAmountCap
        discountOnProductValue
        image
        merchantId
        minimumAmount
        minimumCondition
        minimumQuantity
        orderType
        price
        productConditions {
          exclude
          ids
          type
        }
        productsDiscount {
          ids
          type
        }
        requiredPoints
        status
        title
        type
        voucherIcon
        voucherId
      }
      stampClaimCount
      stampCollected
      stampTypeValue
      stampValueCollected
      stampingCampaignCode
      stampingCampaignCycle
      stampingCampaignCycleDurationValue
      stampingCampaignDescription
      stampingCampaignId
      stampingCampaignImage
      stampingCampaignListingImage
      stampingCampaignReminder
      stampingCampaignTitle
      stampingCampaignType
      stampingMilestone
      stampingMilestoneRemaining
      stampingProgressId
      startDate
      status
      voucherExpiryDateType
      voucherExpiryDateValue
    }
  }
`;
export const getStampingCampaignList = /* GraphQL */ `
  query GetStampingCampaignList(
    $customerId: String
    $filter: SearchModifierItemsFilter
    $limit: String
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    getStampingCampaignList(
      customerId: $customerId
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      message
      nextToken
      stampingCampaignList {
        endDate
        extraProductCondition {
          ids {
            collectionName
            productBundleId
            productId
            productUOMId
          }
          type
        }
        extraProductStamp
        isEnable
        merchantId
        minSpend
        orderType
        productCondition {
          ids {
            collectionName
            productBundleId
            productId
            productUOMId
          }
          type
        }
        rewardVoucher {
          category
          customerCondition
          deliveryDiscountType
          description
          discountAmountCap
          discountOnProductValue
          image
          merchantId
          minimumAmount
          minimumCondition
          minimumQuantity
          orderType
          price
          productConditions {
            exclude
            ids
            type
          }
          productsDiscount {
            ids
            type
          }
          requiredPoints
          status
          title
          type
          voucherIcon
          voucherId
        }
        stampClaimCount
        stampCollected
        stampTypeValue
        stampValueCollected
        stampingCampaignCode
        stampingCampaignCycle
        stampingCampaignCycleDuration
        stampingCampaignCycleDurationValue
        stampingCampaignDescription
        stampingCampaignId
        stampingCampaignImage
        stampingCampaignListingImage
        stampingCampaignReminder
        stampingCampaignTitle
        stampingCampaignType
        stampingMilestone
        stampingMilestoneRemaining
        stampingProgressId
        startDate
        updatedAt
        voucherExpiryDateType
        voucherExpiryDateValue
      }
      status
      total
    }
  }
`;
export const getStandardDeliveryQuotation = /* GraphQL */ `
  query GetStandardDeliveryQuotation(
    $customerCartIds: [String]
    $customerFirstName: String
    $customerLastName: String
    $customerMobileNo: String
    $deliveryAddress: String
    $deliveryCity: String
    $deliveryCountry: String
    $deliveryPostalCode: String
    $deliveryState: String
    $merchantId: String
    $promoCode: String
    $storeId: String
  ) {
    getStandardDeliveryQuotation(
      customerCartIds: $customerCartIds
      customerFirstName: $customerFirstName
      customerLastName: $customerLastName
      customerMobileNo: $customerMobileNo
      deliveryAddress: $deliveryAddress
      deliveryCity: $deliveryCity
      deliveryCountry: $deliveryCountry
      deliveryPostalCode: $deliveryPostalCode
      deliveryState: $deliveryState
      merchantId: $merchantId
      promoCode: $promoCode
      storeId: $storeId
    ) {
      deliveryOptions {
        estimatedDuration
        name
        rate
      }
      message
      status
    }
  }
`;
export const getStoreInformation = /* GraphQL */ `
  query GetStoreInformation($merchantId: String) {
    getStoreInformation(merchantId: $merchantId) {
      aboutUsBanner
      address
      addressDetail
      city
      country
      domain
      email
      isOnDemandDeliveryEnabled
      latitude
      longitude
      maxAdvancedOrderDay
      message
      name
      onDemandMaxDistance
      postalCode
      smsMobileNo
      state
      webQrCode
    }
  }
`;
export const getSubscriptionHistoryList = /* GraphQL */ `
  query GetSubscriptionHistoryList {
    getSubscriptionHistoryList {
      merchantOrderList {
        amount
        completedDateTime
        createdDateTime
        merchantId
        merchantOrderId
        orderNumber
        paymentDateTime
        paymentMethod
        paymentStatus
        serviceDetail
        serviceType
        status
        title
        transactionId
      }
      message
      status
      subscriptionEndDate
      subscriptionStartDate
      subscriptionType
    }
  }
`;
export const getSupportStatementCache = /* GraphQL */ `
  query GetSupportStatementCache($merchantId: String) {
    getSupportStatementCache(merchantId: $merchantId) {
      items {
        childrenStatement {
          childrenStatement {
            childrenStatement {
              createdAt
              createdBy
              isDisabled
              merchantId
              messageToCustomer
              parentId
              platform
              priority
              sequence
              statement
              statementType
              supportStatementId
              supportType
              updatedAt
              updatedBy
            }
            createdAt
            createdBy
            isDisabled
            merchantId
            messageToCustomer
            parentId
            platform
            priority
            sequence
            statement
            statementType
            supportStatementId
            supportType
            updatedAt
            updatedBy
          }
          createdAt
          createdBy
          isDisabled
          merchantId
          messageToCustomer
          parentId
          platform
          priority
          sequence
          statement
          statementType
          supportStatementId
          supportType
          updatedAt
          updatedBy
        }
        createdAt
        createdBy
        isDisabled
        merchantId
        messageToCustomer
        parentId
        platform
        priority
        sequence
        statement
        statementType
        supportStatementId
        supportType
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const getThankYouPageOrderInfo = /* GraphQL */ `
  query GetThankYouPageOrderInfo(
    $accessToken: String
    $domain: String
    $merchantId: String
    $orderNumber: String
  ) {
    getThankYouPageOrderInfo(
      accessToken: $accessToken
      domain: $domain
      merchantId: $merchantId
      orderNumber: $orderNumber
    ) {
      customerFirstName
      customerLastName
      customerMobileNo
      customerPrimaryEmail
      deliveryAddress
      deliveryCity
      deliveryCountry
      deliveryFee
      deliveryPostalCode
      deliveryState
      giftCardTitle
      grandTotal
      isBankTransfer
      manualPaymentMethodName
      manualPaymentOrderStatus
      message
      orderDetails {
        associatedProducts {
          productId
          productImage
          productSku
          productTitle
          productUOMId
          quantity
          variantName1
          variantName2
          variantName3
          variantValue1
          variantValue2
          variantValue3
        }
        comment
        compareAtPrice
        createdAt
        createdBy
        customerId
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        description
        fulfilledQuantity
        grandTotal
        isFreeItem
        itemId
        itemImage
        itemIsVirtualGoods
        itemProperty
        itemSku
        itemStatus
        itemTitle
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        mandatoryItem
        manualPaymentReceipt
        merchantId
        orderDetailId
        orderId
        orderNumber
        orderedQuantity
        pickupCompareAtPrice
        pickupPrice
        pickupPriceWithTax
        price
        priceWithTax
        promoCode
        promoCodeDiscount
        rating
        redemptionCode
        refundQuantity
        selectedModifierGroups {
          isItemsControlAvailable
          isSelected
          modifier {
            availableStatus
            isSelected
            modifierId
            modifierName
            price
          }
          modifierGroupId
          modifierGroupName
          modifierGroupType
          requestRemark
          selectionRangeMax
          selectionRangeMin
        }
        singleVoucherQuantity
        subtotal
        subtotalWithTax
        totalDiscount
        totalPromoCodeDiscount
        totalVoucherDiscount
        updatedAt
        updatedBy
        voucherDesc
        voucherDiscount
        voucherId
        voucherImage
        voucherNumber
        voucherTitle
        voucherType
      }
      orderId
      orderNumber
      orderType
      paymentMethod
      paymentStatus
      paymentType
      posQrCode
      status
      subtotal
      totalDiscount
      voucherId
    }
  }
`;
export const getTotalCartCount = /* GraphQL */ `
  query GetTotalCartCount(
    $customerId: String
    $domain: String
    $merchantId: String
    $storeId: String
  ) {
    getTotalCartCount(
      customerId: $customerId
      domain: $domain
      merchantId: $merchantId
      storeId: $storeId
    ) {
      message
      productCartCount
      status
      voucherCartCount
    }
  }
`;
export const getVirtualGoodsRedemptionCode = /* GraphQL */ `
  query GetVirtualGoodsRedemptionCode(
    $merchantId: String
    $orderDetailId: String
  ) {
    getVirtualGoodsRedemptionCode(
      merchantId: $merchantId
      orderDetailId: $orderDetailId
    ) {
      message
      status
      virtualGoodsRedemption {
        code
        customerFirstName
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        expiredAt
        merchantId
        orderDetailId
        orderId
        orderNumber
        status
        virtualGoodsRedemptionId
      }
    }
  }
`;
export const getVoucherDetail = /* GraphQL */ `
  query GetVoucherDetail(
    $accessToken: String
    $customerId: String
    $expiryDate: String
    $merchantId: String
    $voucherCode: String
  ) {
    getVoucherDetail(
      accessToken: $accessToken
      customerId: $customerId
      expiryDate: $expiryDate
      merchantId: $merchantId
      voucherCode: $voucherCode
    ) {
      message
      status
      voucher {
        confirmationDate
        customerVoucherId
        description
        expiryDate
        giftCardValue
        image
        isShareable
        merchantId
        pendingAccept
        pendingReceiverAccept
        quantity
        remainingQuantity
        senderName
        senderNameList
        title
        totalAccepted
        totalPending
        voucherCode
        voucherIcon
        voucherId
        voucherValue
      }
    }
  }
`;
export const getVoucherPointRedemption = /* GraphQL */ `
  query GetVoucherPointRedemption($customerId: String, $merchantId: String) {
    getVoucherPointRedemption(
      customerId: $customerId
      merchantId: $merchantId
    ) {
      message
      status
      voucherPointRedemptionDetail {
        customerId
        merchantId
        pointsRedeemed
        redeemDateTime
        voucherId
        voucherPointRedemptionId
      }
    }
  }
`;
export const helpCenterGetChatDetail = /* GraphQL */ `
  query HelpCenterGetChatDetail(
    $accessToken: String!
    $domain: String!
    $issueId: String!
    $issueType: String!
    $merchantId: String
  ) {
    helpCenterGetChatDetail(
      accessToken: $accessToken
      domain: $domain
      issueId: $issueId
      issueType: $issueType
      merchantId: $merchantId
    ) {
      issue {
        createdAt
        issueClosedDate
        issueId
        issueNumber
        issueStatus
        lastConversationSummary
        orderId
        orderNumber
        title
        updatedAt
      }
      issueDetail {
        imageList
        isCustomerMessage
        issueDetailDateTime
        issueDetailId
        message
        platform
        rating
        videoList
      }
      message
      status
    }
  }
`;
export const helpCenterGetChatList = /* GraphQL */ `
  query HelpCenterGetChatList(
    $accessToken: String
    $channel: String
    $domain: String
    $issueNumber: String
    $merchantId: String
    $orderNumber: String
    $platform: String
  ) {
    helpCenterGetChatList(
      accessToken: $accessToken
      channel: $channel
      domain: $domain
      issueNumber: $issueNumber
      merchantId: $merchantId
      orderNumber: $orderNumber
      platform: $platform
    ) {
      feedback {
        channel
        createdAt
        createdBy
        customerId
        dateOfVisit
        description
        feedbackId
        hasNewMessage
        issueDetail {
          imageList
          isCustomerMessage
          issueDetailDateTime
          issueDetailId
          message
          platform
          rating
          videoList
        }
        issueNumber
        issueStatus
        jiraTicketNumber
        merchantId
        platform
        storeId
        storeName
        timeOfVisit
        title
        totalMessage
        updatedAt
        updatedBy
      }
      hasNewMessage
      issue {
        assignee
        channel
        contactNumber
        createdAt
        createdBy
        customerId
        hasNewMessage
        issueClosedDate
        issueDateTime
        issueDetail {
          imageList
          isCustomerMessage
          issueDetailDateTime
          issueDetailId
          message
          platform
          rating
          videoList
        }
        issueId
        issueNumber
        issueStatus
        jiraTicketNumber
        merchantId
        orderId
        orderNumber
        platform
        title
        totalAmount
        totalMessage
        totalQuantity
        updatedAt
        updatedBy
      }
      message
      status
    }
  }
`;
export const kdsDownloadPDFReceipt = /* GraphQL */ `
  query KdsDownloadPDFReceipt($orderId: String) {
    kdsDownloadPDFReceipt(orderId: $orderId) {
      message
      status
    }
  }
`;
export const kdsGetCustomer = /* GraphQL */ `
  query KdsGetCustomer($customerPhoneNumber: String) {
    kdsGetCustomer(customerPhoneNumber: $customerPhoneNumber) {
      customerInfo {
        customerId
        firstName
        lastName
        mobileNo
        points {
          membershipPoint
          membershipPointExpiryDate
          membershipTier
          totalEarnedMembershipPoint
        }
        primaryEmail
        voucher {
          description
          expiryDate
          image
          quantity
          remainingQuantity
          title
          voucherCode
          voucherIcon
          voucherId
        }
      }
      message
      status
    }
  }
`;
export const kdsGetMerchantServiceCatalog = /* GraphQL */ `
  query KdsGetMerchantServiceCatalog {
    kdsGetMerchantServiceCatalog {
      addOnPackageList {
        createdAt
        createdBy
        description
        packageId
        packageType
        price
        title
        updatedAt
        updatedBy
      }
      subscriptionPackageList {
        createdAt
        createdBy
        description
        packageId
        packageType
        price
        title
        updatedAt
        updatedBy
      }
    }
  }
`;
export const kdsGetOrderDetail = /* GraphQL */ `
  query KdsGetOrderDetail(
    $merchantId: String
    $orderId: String
    $storeId: String
    $token: String
  ) {
    kdsGetOrderDetail(
      merchantId: $merchantId
      orderId: $orderId
      storeId: $storeId
      token: $token
    ) {
      collectionMethod
      customerName
      deliveryPartnerName
      deliveryTime
      orderId
      orderNumber
      orderQuantity
      orderStatus
      productList {
        itemTitle
        kdsOrderDetailId
        productCode
        productStatus
        quantity
      }
      remark
      riderContact
      riderName
      status
    }
  }
`;
export const kdsGetOrderList = /* GraphQL */ `
  query KdsGetOrderList(
    $advancedOrderTab: Boolean
    $filter: SearchOrdersFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    kdsGetOrderList(
      advancedOrderTab: $advancedOrderTab
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      message
      newAdvancedOrderCount
      newDeliveryOrderCount
      newDineInOrderCount
      newPickUpOrderCount
      nextToken
      orderList {
        ETACustomer
        ETAMerchant
        accumulatedRefundAmount
        actualDeliveryFee
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        cancelledBy
        cancelledReason
        createdAt
        createdBy
        customerAccountNo
        customerFirstName
        customerIP
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        deliveryAddress
        deliveryCity
        deliveryCountry
        deliveryDiscount
        deliveryLatitude
        deliveryLongitude
        deliveryMode
        deliveryNumber
        deliveryOrderDateTime
        deliveryOrderId
        deliveryPartnerName
        deliveryPostalCode
        deliveryState
        deliveryStatus
        deliveryType
        driverLatitude
        driverLongitude
        driverName
        driverPhoneNumber
        driverPlateNumber
        estimatedDeliveryFee
        grandTotal
        hasPreOrder
        image
        isAdvancedOrder
        isPreOrder
        isRefunded
        isReviewAvailable
        mainOrderId
        manualPaymentMethodName
        manualPaymentReceipt
        merchantId
        noteToRider
        orderCancellationDateTime
        orderCollectedDateTime
        orderCompletedDateTime
        orderDateTime
        orderId
        orderNumber
        orderType
        overallRating
        packageNumber
        partialFulfilmentAmount
        partialFulfilmentDiscount
        paymentDateTime
        paymentMethod
        paymentStatus
        paymentType
        pickupAddress
        pickupCity
        pickupCountry
        pickupPostalCode
        pickupState
        pointsCollectable
        promoCode
        promoCodeDiscount
        promoCodeId
        promoCodeTitle
        receiptFileName
        refundAmount
        refundCompleteDateTime
        refundReason
        remarks
        requiredCutlery
        salesAgentId
        salesChannelName
        scheduledDate
        scheduledDateTime
        scheduledTime
        sellerNote
        standardDeliveryAwb
        standardDeliveryAwbIdLink
        standardDeliveryTrackingUrl
        status
        storeAddress
        storeCode
        storeId
        storeName
        subtotal
        subtotalWithTax
        tableNumber
        taggingNames
        totalDiscount
        totalOrderItems
        totalPromoCodeDiscount
        totalRefundedAmount
        totalVoucherDiscount
        transactionId
        truckId
        truckName
        type
        updatedAt
        updatedBy
        voucherCode
        voucherDiscount
        voucherId
        voucherNumber
        voucherOrderId
        voucherRefunded
        voucherTitle
      }
      status
      total
    }
  }
`;
export const kdsGetStoreInformation = /* GraphQL */ `
  query KdsGetStoreInformation {
    kdsGetStoreInformation {
      aboutUsBanner
      address
      addressDetail
      city
      country
      domain
      email
      isOnDemandDeliveryEnabled
      latitude
      longitude
      maxAdvancedOrderDay
      message
      name
      onDemandMaxDistance
      postalCode
      smsMobileNo
      state
      webQrCode
    }
  }
`;
export const kdsGetWarungLandingPage = /* GraphQL */ `
  query KdsGetWarungLandingPage($merchantId: String) {
    kdsGetWarungLandingPage(merchantId: $merchantId) {
      address
      item {
        close
        day
        enabled
        endingTimeAfterMidnight
        open
      }
      message
      orderOption
      status
      warungStoreStatus
    }
  }
`;
export const kdsListModifierItems = /* GraphQL */ `
  query KdsListModifierItems(
    $filter: SearchModifierItemsFilter
    $limit: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    kdsListModifierItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      message
      modifierItemList {
        availableStatus
        modifierId
        modifierName
      }
      nextToken
      status
      total
    }
  }
`;
export const kdsOrderHistortList = /* GraphQL */ `
  query KdsOrderHistortList(
    $merchantId: String
    $orderType: String
    $totalDayOfRecord: String
  ) {
    kdsOrderHistortList(
      merchantId: $merchantId
      orderType: $orderType
      totalDayOfRecord: $totalDayOfRecord
    ) {
      message
      noOfCancelledOrder
      noOfOrderCompleted
      noOfRefundedOrder
      orderList {
        amount
        orderDateTime
        orderId
        orderNumber
      }
      status
      totalAmountOfPendingRefundAmount
      totalAmountOfRefundedAmount
      totalAmountOfRevenue
    }
  }
`;
export const listItemReviews = /* GraphQL */ `
  query ListItemReviews(
    $itemId: String
    $itemProperty: String
    $limit: Int
    $merchantId: String
    $nextToken: String
  ) {
    listItemReviews(
      itemId: $itemId
      itemProperty: $itemProperty
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
    ) {
      items {
        comment
        createdAt
        createdBy
        customerFirstName
        customerLastName
        itemId
        itemProperty
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        merchantId
        orderDetailId
        orderId
        orderNumber
        productReviewId
        rating
        reviewAsAnonymous
        updatedAt
        updatedBy
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const listItemsByCollection = /* GraphQL */ `
  query ListItemsByCollection(
    $filter: SearchProductsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $orderType: String
    $seoUrl: String
    $sort: ElasticSearchSortDirection
    $storeId: String
  ) {
    listItemsByCollection(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      orderType: $orderType
      seoUrl: $seoUrl
      sort: $sort
      storeId: $storeId
    ) {
      items {
        compareAtPrice
        cover
        deliveryCompareAtPrice
        deliveryCompareAtPriceRange
        deliveryPrice
        deliveryPriceRange
        deliveryPriceWithTax
        deliveryPriceWithTaxRange
        description
        effectiveEndDateTime
        effectiveStartDateTime
        hasStock
        hasVariant
        homeCollectionId
        homeCollectionTitle
        image
        isDisabled
        isNewArrival
        isPreOrder
        itemId
        itemProperty
        memberDiscount {
          type
          value
        }
        price
        priceWithTax
        productIsDisabled
        promotionEndDateTime
        promotionStartDateTime
        seoUrl
        title
        totalRatings
        totalReviews
        updatedAt
        video
      }
      message
      nextToken
      productCollectionBanner
      productCollectionId
      productCollectionName
      status
      total
    }
  }
`;
export const listSimilarItems = /* GraphQL */ `
  query ListSimilarItems(
    $domain: String
    $itemProperty: String
    $merchantId: String
    $orderType: String
    $seoUrl: String
    $storeId: String
  ) {
    listSimilarItems(
      domain: $domain
      itemProperty: $itemProperty
      merchantId: $merchantId
      orderType: $orderType
      seoUrl: $seoUrl
      storeId: $storeId
    ) {
      items {
        compareAtPrice
        cover
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        description
        effectiveEndDateTime
        effectiveStartDateTime
        hasStock
        hasVariant
        image
        itemId
        itemProperty
        memberDiscount {
          type
          value
        }
        price
        priceWithTax
        productIsDisabled
        promotionEndDateTime
        promotionStartDateTime
        seoUrl
        title
        updatedAt
        video
      }
      message
      status
    }
  }
`;
export const pointTransactionAPI = /* GraphQL */ `
  query PointTransactionAPI($customerId: String, $merchantId: String) {
    pointTransactionAPI(customerId: $customerId, merchantId: $merchantId) {
      message
      pointTransaction {
        createdAt
        createdBy
        customerId
        expiredDateTime
        image
        memberId
        memberPointLogId
        merchantId
        orderId
        orderNumber
        points
        referenceId
        type
        updatedAt
        updatedBy
        voucherName
      }
      status
    }
  }
`;
export const qrCodeShowOnSite = /* GraphQL */ `
  query QrCodeShowOnSite($filterPrintNumber: String) {
    qrCodeShowOnSite(filterPrintNumber: $filterPrintNumber) {
      message
      qrCodeList {
        printNumber
        printedQrCodeId
        webQrCode
      }
      status
    }
  }
`;
export const searchAutoContents = /* GraphQL */ `
  query SearchAutoContents(
    $autoContentId: String
    $filter: SearchAutoContentsResponseFilter
    $issueId: String
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchAutoContents(
      autoContentId: $autoContentId
      filter: $filter
      issueId: $issueId
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        answer
        autoContentId
        contentSelected
        createdAt
        createdBy
        issueId
        merchantId
        question
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchBranches = /* GraphQL */ `
  query SearchBranches(
    $branchId: String
    $filter: SearchBranchesResponseFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchBranches(
      branchId: $branchId
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        address
        branchId
        branchName
        createdAt
        createdBy
        merchantId
        postalCode
        truckList
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchContactUsStores = /* GraphQL */ `
  query SearchContactUsStores(
    $filter: SearchContactUsStoreFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchContactUsStores(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        address
        city
        contactUsStoreId
        createdAt
        createdBy
        latitude
        longitude
        merchantId
        postalCode
        state
        storeCode
        storeId
        storeName
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchCustomOrders = /* GraphQL */ `
  query SearchCustomOrders(
    $filter: SearchCustomOrdersFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchCustomOrders(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        checkoutLink
        createdAt
        createdBy
        customOrderId
        customerFirstName
        customerId
        customerLastName
        itemList {
          itemId
          itemProperty
          itemTitle
          quantity
          subtotal
          type
        }
        merchantId
        mobileNo
        noteToRider
        orderId
        orderNumber
        orderType
        salesAgentId
        shippingAddress
        shippingCity
        shippingCountry
        shippingPostalCode
        shippingState
        status
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchCustomerVouchers = /* GraphQL */ `
  query SearchCustomerVouchers(
    $filter: SearchCustomerVouchersFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchCustomerVouchers(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        customerId
        customerVoucherId
        merchantId
        status
        updatedAt
        updatedBy
        voucherCode
        voucherExpiryDate
        voucherId
      }
      nextToken
      total
    }
  }
`;
export const searchCustomers = /* GraphQL */ `
  query SearchCustomers(
    $filter: SearchCustomersFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchCustomers(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        accountNo
        activated
        address
        address2
        city
        consentPersonalData
        country
        createdBy
        customerId
        dateOfBirth
        deviceEndpoint
        deviceToken
        emailSubcriptionStatus
        employmentStatus
        facebookID
        firstName
        gender
        hasCompletedProfile
        hasRewarded
        identityCard
        isBlocked
        isFacebook
        lastName
        lastPurchasedDateTime
        maritalStatus
        membershipPoint
        membershipPointExpiryDate
        membershipTier
        merchantId
        mobileNo
        nationality
        password
        personalIncomeLevel
        postal
        primaryEmail
        profilePicture
        qrCode
        race
        salesAgentId
        secondaryEmail
        signedUpDateTime
        smartTaggingNames
        state
        taggingNames
        totalSalesOrder
        totalSpent
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchDocumentColumnMappings = /* GraphQL */ `
  query SearchDocumentColumnMappings(
    $extractedDocumentColumnMappingId: String
    $filter: SearchDocumentColumnMappingsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchDocumentColumnMappings(
      extractedDocumentColumnMappingId: $extractedDocumentColumnMappingId
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        actualValue
        alternativeValueList
        createdAt
        createdBy
        extractedDocumentColumnMappingId
        fieldNameList
        merchantId
        message
        status
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchDocumentLookups = /* GraphQL */ `
  query SearchDocumentLookups(
    $extractedDocumentLookupId: String
    $filter: SearchDocumentLookupsResponseFilter
    $limit: Int
    $lookupName: String
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchDocumentLookups(
      extractedDocumentLookupId: $extractedDocumentLookupId
      filter: $filter
      limit: $limit
      lookupName: $lookupName
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        csvS3Key
        extractedDocumentLookupId
        fieldName
        fieldType
        fieldValue
        headerValues
        lookupName
        merchantId
        skipCsvHeaders
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchDocumentTemplate = /* GraphQL */ `
  query SearchDocumentTemplate(
    $documentS3Key: String
    $documentTemplateName: String
    $documentTemplateType: String
    $extractedDocumentTemplateId: String
    $filter: SearchDocumentTemplateResponseFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchDocumentTemplate(
      documentS3Key: $documentS3Key
      documentTemplateName: $documentTemplateName
      documentTemplateType: $documentTemplateType
      extractedDocumentTemplateId: $extractedDocumentTemplateId
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        columnMappings {
          inputFieldName
          outputFieldName
        }
        createdAt
        createdBy
        csvExportFrequency {
          unit
          value
        }
        dataLabels {
          formData {
            boundingBox {
              height
              left
              top
              width
            }
            fieldLabel
            fieldName
            fieldValue {
              regexType
              value
            }
            inUse
            mandatory
            regex
            type
            uom
          }
          tableData {
            boundingBox {
              height
              left
              top
              width
            }
            fieldLabel
            fieldName
            fieldValue {
              regexType
              value
            }
            inUse
            mandatory
            regex
            type
            uom
          }
        }
        defaultTemplate
        documentS3Key
        documentTemplateName
        documentTemplateType
        extractedDocumentTemplateId
        isExportCsv
        lookupFields {
          dataLabelType
          fieldIndex
          inputFieldIndex
          keyColumns
          lookupId
          lookupType
          relationship
          requireKey
          secondaryFieldIndex
          shareKey
        }
        merchantId
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchDocuments = /* GraphQL */ `
  query SearchDocuments(
    $extractedDocumentId: String
    $filter: SearchDocumentsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchDocuments(
      extractedDocumentId: $extractedDocumentId
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        approvedStatus
        conversionStatus
        createdAt
        createdBy
        data {
          formData {
            fieldName
            fieldValue
          }
          tableData {
            fieldName
            fieldValue
          }
        }
        documentDate
        documentNo
        documentType
        executionId
        extractedDocumentId
        extractedDocumentTemplateId
        formDetection {
          boundingBox {
            height
            left
            top
            width
          }
          confidence
          fieldName
          fieldValue
        }
        inputFileName
        inputS3Path
        isDuplicate
        merchantId
        message
        outputS3Path
        outputS3PathBatchCsv
        remark
        status
        tableDetection {
          boundingBox {
            height
            left
            top
            width
          }
          confidence
          fieldName
          fieldValue
        }
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchDynamicForm = /* GraphQL */ `
  query SearchDynamicForm(
    $filter: SearchDynamicFormFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchDynamicForm(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        dynamicFormId
        layout
        merchantId
        numberOfAnswer
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchDynamicFormAnswer = /* GraphQL */ `
  query SearchDynamicFormAnswer(
    $filter: SearchDynamicFormAnswerFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchDynamicFormAnswer(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        dynamicFormAnswerId
        dynamicFormId
        layout
        merchantId
        respondentEmail
        taggingNames
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchEInvoiceConsolidated = /* GraphQL */ `
  query SearchEInvoiceConsolidated(
    $filter: SearchEInvoiceConsolidatedFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchEInvoiceConsolidated(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        consolidationPeriod
        createdAt
        createdBy
        csvPath
        currency
        currencyExchangeRate
        eInvoiceConsolidatedId
        eInvoiceNo
        finalTotalPayableAmount
        listEInvoicesId
        merchantId
        month
        name
        part
        pdfPath
        source
        status
        storeCode
        totalAmount
        totalEInvoice
        updatedAt
        updatedBy
        year
      }
      nextToken
      total
    }
  }
`;
export const searchEInvoiceQuickBookCustomers = /* GraphQL */ `
  query SearchEInvoiceQuickBookCustomers(
    $filter: SearchEInvoiceQuickBookCustomersFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchEInvoiceQuickBookCustomers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        addressLine1
        addressLine2
        addressLine3
        city
        companyName
        companyTin
        country
        countryCode
        createdAt
        createdBy
        customerName
        eInvoiceQuickBookCustomersId
        email
        idNumber
        idType
        merchantId
        phoneNumber
        postalCode
        quickBookCustomerClassCode
        quickBookCustomerClassCodeName
        quickBookCustomerId
        quickBookCustomerName
        sstRegistrationNumber
        stateCode
        stateName
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchEInvoiceQuickBookItems = /* GraphQL */ `
  query SearchEInvoiceQuickBookItems(
    $filter: SearchEInvoiceQuickBookItemsFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchEInvoiceQuickBookItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        eInvoiceQuickBookItemsId
        merchantId
        quickBookItemClassCode
        quickBookItemClassCodeName
        quickBookItemId
        quickBookItemName
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchEInvoiceUpload = /* GraphQL */ `
  query SearchEInvoiceUpload(
    $filter: SearchEInvoiceUploadFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchEInvoiceUpload(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        eInvoiceUploadId
        errorPath
        fileName
        inputPath
        merchantId
        status
        totalInvoice
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchEventFlows = /* GraphQL */ `
  query SearchEventFlows(
    $filter: SearchEventFlowsResponseFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchEventFlows(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        eventFlowId
        eventType
        flow
        isDisabled
        merchantId
        title
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchFacebookLiveCampaigns = /* GraphQL */ `
  query SearchFacebookLiveCampaigns(
    $filter: SearchFacebookLiveCampaignsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchFacebookLiveCampaigns(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        facebookLiveCampaignId
        merchantId
        message
        salesChannelName
        scheduleEndDateTime
        scheduleStartDateTime
        status
        storeId
        storeName
        title
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchFaqCategories = /* GraphQL */ `
  query SearchFaqCategories(
    $filter: SearchFaqCategoriesFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchFaqCategories(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        childItems {
          answer
          createdAt
          createdBy
          faqCategory
          faqId
          faqType
          merchantId
          parentId
          question
          sequence
          updatedAt
          updatedBy
        }
        createdAt
        createdBy
        faqCategoryId
        merchantId
        sequence
        title
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchFaqs = /* GraphQL */ `
  query SearchFaqs(
    $filter: SearchFaqsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchFaqs(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        answer
        createdAt
        createdBy
        faqCategory
        faqId
        faqType
        merchantId
        parentId
        question
        sequence
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchGalleryDetails = /* GraphQL */ `
  query SearchGalleryDetails(
    $filter: SearchGalleryDetailsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchGalleryDetails(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        filesize
        galleryDetailId
        merchantId
        name
        s3Path
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchHelpCenterFaq = /* GraphQL */ `
  query SearchHelpCenterFaq(
    $filter: SearchHelpCenterFaqFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchHelpCenterFaq(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        _typename
        answer
        createdAt
        faqCategory
        helpCenterFaqId
        question
        sequence
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchHomeCollections = /* GraphQL */ `
  query SearchHomeCollections(
    $filter: SearchHomeCollectionsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchHomeCollections(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        collectionIcon
        collectionId
        collectionImage
        collectionName
        collectionSeoUrl
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        homeCollectionId
        homeCollectionType
        isDisabled
        merchantId
        sequence
        title
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchInStoreOrders = /* GraphQL */ `
  query SearchInStoreOrders(
    $filter: SearchInStoreOrdersFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchInStoreOrders(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        accountNo
        area
        createdAt
        createdBy
        duplicateRecords {
          accountNo
          area
          createdAt
          createdBy
          duplicateRecords {
            accountNo
            area
            createdAt
            createdBy
            duplicateRecords {
              accountNo
              area
              createdAt
              createdBy
              firstName
              hasDuplicateRecords
              inStoreOrderId
              lastName
              merchantId
              posTerminalNo
              receiptNo
              status
              storeArea
              storeName
              storeNo
              totalAmountSpent
              totalDiscountAmount
              totalPointsCollected
              totalPointsRedeemed
              totalVoucherDiscountAmount
              transactionDate
              transactionTime
              updatedAt
              updatedBy
            }
            firstName
            hasDuplicateRecords
            inStoreOrderId
            lastName
            merchantId
            posTerminalNo
            receiptNo
            status
            storeArea
            storeName
            storeNo
            totalAmountSpent
            totalDiscountAmount
            totalPointsCollected
            totalPointsRedeemed
            totalVoucherDiscountAmount
            transactionDate
            transactionTime
            updatedAt
            updatedBy
          }
          firstName
          hasDuplicateRecords
          inStoreOrderId
          lastName
          merchantId
          posTerminalNo
          receiptNo
          status
          storeArea
          storeName
          storeNo
          totalAmountSpent
          totalDiscountAmount
          totalPointsCollected
          totalPointsRedeemed
          totalVoucherDiscountAmount
          transactionDate
          transactionTime
          updatedAt
          updatedBy
        }
        firstName
        hasDuplicateRecords
        inStoreOrderId
        lastName
        merchantId
        posTerminalNo
        receiptNo
        status
        storeArea
        storeName
        storeNo
        totalAmountSpent
        totalDiscountAmount
        totalPointsCollected
        totalPointsRedeemed
        totalVoucherDiscountAmount
        transactionDate
        transactionTime
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchKdsOrders = /* GraphQL */ `
  query SearchKdsOrders(
    $filter: SearchKdsOrdersFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchKdsOrders(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        collectionMethod
        customerName
        deliveryPartnerName
        deliveryTime
        orderId
        orderNumber
        orderQuantity
        status
      }
      nextToken
      total
    }
  }
`;
export const searchKnowledgeBases = /* GraphQL */ `
  query SearchKnowledgeBases(
    $filter: SearchKnowledgeBasesResponseFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchKnowledgeBases(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        knowledgeBaseId
        merchantId
        processedS3Path
        sourceUrl
        status
        type
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchLandingPageBanners = /* GraphQL */ `
  query SearchLandingPageBanners(
    $filter: SearchLandingPageBannersFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchLandingPageBanners(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        buttonActionValue
        detailPageImage
        homeImage
        isDisabled
        landingPageBannerId
        merchantId
        sequence
        title
      }
      nextToken
      total
    }
  }
`;
export const searchMarketplaceSyncHistories = /* GraphQL */ `
  query SearchMarketplaceSyncHistories(
    $filter: SearchMarketplaceSyncHistoriesFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchMarketplaceSyncHistories(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        merchantId
        merketPlaceSyncHistoryId
        noOfRecords
        salesChannelId
        salesChannelName
        syncStatus
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchMemberPointLog = /* GraphQL */ `
  query SearchMemberPointLog(
    $filter: SearchMemberPointLogFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchMemberPointLog(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        customerId
        expiredDateTime
        memberId
        memberPointLogId
        orderId
        orderNumber
        points
        referenceId
        type
        updatedAt
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const searchMembershipTiers = /* GraphQL */ `
  query SearchMembershipTiers(
    $filter: SearchMembershipTiersFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchMembershipTiers(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        membershipTierId
        merchantId
        point
        title
        updatedAt
        updatedBy
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const searchMerchantCreditTransactions = /* GraphQL */ `
  query SearchMerchantCreditTransactions(
    $filter: SearchMerchantCreditTransactionsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchMerchantCreditTransactions(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        actionType
        amount
        createdAt
        createdBy
        merchantCreditTransactionId
        merchantId
        merchantOrderId
        orderNumber
        transactionId
      }
      nextToken
      total
    }
  }
`;
export const searchNotificationCampaign = /* GraphQL */ `
  query SearchNotificationCampaign(
    $documentTemplateName: String
    $extractedDocumentTemplateId: String
    $filter: SearchNotificationCampaignResponseFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchNotificationCampaign(
      documentTemplateName: $documentTemplateName
      extractedDocumentTemplateId: $extractedDocumentTemplateId
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        actionId
        actionType
        body
        createdAt
        createdBy
        image
        listOfCustomer
        merchantId
        notificationCampaignId
        scheduledDateTime
        showToNewUser
        targetAudience {
          csvFilePath
          csvLastUpdated
          method
          numberOfAudience
        }
        title
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchOrders = /* GraphQL */ `
  query SearchOrders(
    $filter: SearchOrdersFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchOrders(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        ETACustomer
        ETAMerchant
        accumulatedRefundAmount
        actualDeliveryFee
        billingAddress
        billingCity
        billingCountry
        billingPostalCode
        billingState
        cancelledBy
        cancelledReason
        createdAt
        createdBy
        customerAccountNo
        customerFirstName
        customerIP
        customerId
        customerLastName
        customerMobileNo
        customerPrimaryEmail
        deliveryAddress
        deliveryCity
        deliveryCountry
        deliveryDiscount
        deliveryLatitude
        deliveryLongitude
        deliveryMode
        deliveryNumber
        deliveryOrderDateTime
        deliveryOrderId
        deliveryPartnerName
        deliveryPostalCode
        deliveryState
        deliveryStatus
        deliveryType
        driverLatitude
        driverLongitude
        driverName
        driverPhoneNumber
        driverPlateNumber
        estimatedDeliveryFee
        grandTotal
        hasPreOrder
        image
        isAdvancedOrder
        isPreOrder
        isRefunded
        isReviewAvailable
        mainOrderId
        manualPaymentMethodName
        manualPaymentReceipt
        merchantId
        noteToRider
        orderCancellationDateTime
        orderCollectedDateTime
        orderCompletedDateTime
        orderDateTime
        orderId
        orderNumber
        orderType
        overallRating
        packageNumber
        partialFulfilmentAmount
        partialFulfilmentDiscount
        paymentDateTime
        paymentMethod
        paymentStatus
        paymentType
        pickupAddress
        pickupCity
        pickupCountry
        pickupPostalCode
        pickupState
        pointsCollectable
        promoCode
        promoCodeDiscount
        promoCodeId
        promoCodeTitle
        receiptFileName
        refundAmount
        refundCompleteDateTime
        refundReason
        remarks
        requiredCutlery
        salesAgentId
        salesChannelName
        scheduledDate
        scheduledDateTime
        scheduledTime
        sellerNote
        standardDeliveryAwb
        standardDeliveryAwbIdLink
        standardDeliveryTrackingUrl
        status
        storeAddress
        storeCode
        storeId
        storeName
        subtotal
        subtotalWithTax
        tableNumber
        taggingNames
        totalDiscount
        totalOrderItems
        totalPromoCodeDiscount
        totalRefundedAmount
        totalVoucherDiscount
        transactionId
        truckId
        truckName
        type
        updatedAt
        updatedBy
        voucherCode
        voucherDiscount
        voucherId
        voucherNumber
        voucherOrderId
        voucherRefunded
        voucherTitle
      }
      newOrdersTotal
      nextToken
      total
    }
  }
`;
export const searchPelangiCustomers = /* GraphQL */ `
  query SearchPelangiCustomers(
    $filter: SearchPelangiCustomersFilter
    $limit: Int
    $nextToken: String
    $pelangiCustomerId: String
    $sort: ElasticSearchSortDirection
  ) {
    searchPelangiCustomers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      pelangiCustomerId: $pelangiCustomerId
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        customerGroup
        customerIdentifier
        customerName
        pelangiCustomerId
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchPelangiIsbn = /* GraphQL */ `
  query SearchPelangiIsbn(
    $filter: SearchPelangiIsbnFilter
    $limit: Int
    $nextToken: String
    $pelangiIsbnId: String
    $sort: ElasticSearchSortDirection
  ) {
    searchPelangiIsbn(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      pelangiIsbnId: $pelangiIsbnId
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        customerGroup
        inventoryId
        pelangiIsbnId
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchPointConversions = /* GraphQL */ `
  query SearchPointConversions(
    $filter: SearchPointConversionsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchPointConversions(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        itemId
        itemImage
        itemProperty
        itemTitle
        merchantId
        multiplier
        pointConversionId
        productId
        spent
        updatedAt
        updatedBy
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const searchPriceGroups = /* GraphQL */ `
  query SearchPriceGroups(
    $filter: SearchPriceGroupsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchPriceGroups(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        delivery
        increment
        incrementType
        merchantId
        name
        pickUp
        priceGroupId
        stores {
          storeCode
          storeId
          storeName
        }
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchProductBundles = /* GraphQL */ `
  query SearchProductBundles(
    $filter: SearchProductBundlesFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchProductBundles(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        barcode
        collectionNames
        cover
        createdAt
        createdBy
        deliveryCompareAtPrice
        deliveryCostPerItem
        deliveryPrice
        deliveryPriceWithTax
        description
        effectiveEndDateTime
        effectiveStartDateTime
        hasVariant
        image
        isDisabled
        isProductBundleTaxable
        merchantId
        pickupCompareAtPrice
        pickupCostPerItem
        pickupPrice
        pickupPriceWithTax
        productBundleId
        promotionEndDateTime
        promotionStartDateTime
        sellOnFacebookStore
        sellOnFoodPanda
        sellOnGrabFood
        sellOnGrabMart
        sellOnInstagram
        sellOnLazada
        sellOnOfflineStore
        sellOnOnlineStore
        sellOnPandaMart
        sellOnShopee
        seoDescription
        seoTitle
        seoUrl
        shippingDimensionHeight
        shippingDimensionLength
        shippingDimensionWidth
        shippingWeight
        shippingWeightUnit
        sku
        taggingNames
        title
        updatedAt
        updatedBy
        video
      }
      nextToken
      total
    }
  }
`;
export const searchProductCollections = /* GraphQL */ `
  query SearchProductCollections(
    $filter: SearchProductCollectionsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchProductCollections(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        banner
        condition
        conditionType
        createdAt
        createdBy
        description
        icon
        merchantId
        name
        productCollectionId
        seoDescription
        seoTitle
        seoUrl
        taggingNames
        type
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchProductExclusions = /* GraphQL */ `
  query SearchProductExclusions(
    $filter: SearchProductExclusionsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchProductExclusions(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        itemId
        itemImage
        itemProperty
        itemTitle
        merchantId
        productExclusionId
        productId
        type
        updatedAt
        updatedBy
      }
      message
      nextToken
      status
      total
    }
  }
`;
export const searchProductUOMs = /* GraphQL */ `
  query SearchProductUOMs(
    $filter: SearchProductUOMsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchProductUOMs(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        barcode
        collectionNames
        createdAt
        createdBy
        image
        incomingQuantity
        isDisabled
        isProductTaxable
        isVirtualGoods
        merchantId
        modifierGroups {
          isItemsControlAvailable
          isSelected
          modifier {
            availableStatus
            isSelected
            modifierId
            modifierName
            price
          }
          modifierGroupId
          modifierGroupName
          modifierGroupType
          requestRemark
          selectionRangeMax
          selectionRangeMin
        }
        noOfPurchases
        productCover
        productId
        productTitle
        productUOMId
        quantityForSales
        shippingDimensionHeight
        shippingDimensionLength
        shippingDimensionWidth
        shippingWeight
        shippingWeightUnit
        sku
        taggingNames
        totalStockQuantity
        trackQuantity
        updatedAt
        updatedBy
        variantName1
        variantName2
        variantName3
        variantValue1
        variantValue2
        variantValue3
        virtualGoodsExpiredAt
        virtualGoodsExpiryDays
      }
      nextToken
      total
    }
  }
`;
export const searchProducts = /* GraphQL */ `
  query SearchProducts(
    $filter: SearchProductsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchProducts(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        code
        collectionNames
        cover
        createdAt
        createdBy
        deliveryCompareAtPrice
        deliveryCostPerItem
        deliveryPrice
        deliveryPriceWithTax
        description
        effectiveEndDateTime
        effectiveStartDateTime
        hasVariant
        image
        isDisabled
        isPreOrder
        isVirtualGoods
        merchantId
        modifierProduct
        noOfPurchases
        noOfViews
        pickupCompareAtPrice
        pickupCostPerItem
        pickupPrice
        pickupPriceWithTax
        platform
        productId
        promotionEndDateTime
        promotionStartDateTime
        sellOnFacebookStore
        sellOnFoodPanda
        sellOnGrabFood
        sellOnGrabMart
        sellOnInstagram
        sellOnLazada
        sellOnOfflineStore
        sellOnOnlineStore
        sellOnPandaMart
        sellOnShopee
        seoDescription
        seoTitle
        seoUrl
        taggingNames
        thumbnailCover
        timeslotType
        timeslots {
          effectiveEndDate
          effectiveEndTime
          effectiveStartDate
          effectiveStartTime
        }
        title
        updatedAt
        updatedBy
        variantName1
        variantName2
        variantName3
        variantValues1
        variantValues2
        variantValues3
        video
        virtualGoodsExpiredAt
        virtualGoodsExpiryDays
      }
      nextToken
      total
    }
  }
`;
export const searchPromoCodeCampaigns = /* GraphQL */ `
  query SearchPromoCodeCampaigns(
    $filter: SearchPromoCodeCampaignsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchPromoCodeCampaigns(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        activeCount
        category
        createdBy
        customerCondition
        deliveryDiscountType
        discountAmountCap
        discountOnProductValue
        discountQuantityCap
        effectiveEndDateTime
        effectiveStartDateTime
        isDisabled
        maxUserUsageLimit
        merchantId
        minimumCondition
        minimumPurchase
        minimumQuantity
        orderType
        productConditions {
          ids {
            collectionName
            productBundleId
            productId
            productUOMId
          }
          type
        }
        productsDiscount {
          ids {
            collectionName
            productBundleId
            productId
            productUOMId
          }
          type
        }
        promoCode
        promoCodeCampaignId
        remainingUsage
        specificCustomerTag
        specificCustomers
        status
        stores
        title
        totalUsageLimit
        type
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchPromotionalWidget = /* GraphQL */ `
  query SearchPromotionalWidget(
    $filter: SearchPromotionalWidgetFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchPromotionalWidget(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        merchantId
        promotionalWidgetId
        updatedAt
        updatedBy
        widgetName
        widgetUrl
      }
      nextToken
      total
    }
  }
`;
export const searchSMSConfigs = /* GraphQL */ `
  query SearchSMSConfigs(
    $filter: SearcSMSConfigsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchSMSConfigs(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        csvS3Key
        listOfCustomerPhoneNumber
        listOfSelectedSmartTags
        mediaContent
        mediaType
        merchantDepartmentId
        merchantId
        message
        platform
        reply
        saveTemplate
        selectedTemplateId
        smsCampaignId
        smsScheduleDateTime
        smsText
        smsTopic
        status
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchSalesAgent = /* GraphQL */ `
  query SearchSalesAgent(
    $filter: SearchSalesAgentFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchSalesAgent(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        customOrderEnabled
        firstName
        lastName
        maxCreditLimit
        merchantId
        salesAgentId
        updatedAt
        updatedBy
        username
      }
      nextToken
      total
    }
  }
`;
export const searchSiteNavigations = /* GraphQL */ `
  query SearchSiteNavigations(
    $filter: SearchSiteNavigationsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchSiteNavigations(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        childItems {
          childItems {
            childItems {
              createdAt
              createdBy
              effectiveEndDateTime
              effectiveStartDateTime
              isDisabled
              linkValue
              menuType
              merchantId
              navigationType
              openNewTab
              parentId
              sequence
              siteNavigationId
              title
              updatedAt
              updatedBy
            }
            createdAt
            createdBy
            effectiveEndDateTime
            effectiveStartDateTime
            isDisabled
            linkValue
            menuType
            merchantId
            navigationType
            openNewTab
            parentId
            sequence
            siteNavigationId
            title
            updatedAt
            updatedBy
          }
          createdAt
          createdBy
          effectiveEndDateTime
          effectiveStartDateTime
          isDisabled
          linkValue
          menuType
          merchantId
          navigationType
          openNewTab
          parentId
          sequence
          siteNavigationId
          title
          updatedAt
          updatedBy
        }
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        isDisabled
        linkValue
        menuType
        merchantId
        navigationType
        openNewTab
        parentId
        sequence
        siteNavigationId
        title
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchSmartTagging = /* GraphQL */ `
  query SearchSmartTagging(
    $filter: SearchSmartTaggingFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchSmartTagging(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        condition {
          numberOfPurchase
        }
        createdAt
        createdBy
        merchantId
        smartTaggingId
        tagName
        totalListOfAssociatedProducts
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchSmartVoucherCampaigns = /* GraphQL */ `
  query SearchSmartVoucherCampaigns(
    $filter: SearchSmartVoucherCampaignsResponseFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchSmartVoucherCampaigns(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        campaignDetail {
          actualTargetCustomers
          assumptionConversion
          campaignMessage
          creditRequired
          customerList {
            customerId
            firstName
            lastPurchasedDateTime
            mobileNo
          }
          estimateRevenueSplitAmt
          estimateRevenueSplitRatio
          gptPrompt
          inputFrequencySegment {
            endDate
            noOfOrders
            startDate
          }
          inputMonetaryValue
          inputRecencyValue
          isPersonalizedMsg
          isTemplateMsg
          merchantId
          previewCustomer {
            firstName
            frequentPurchasedProduct
            lastName
            lastTransactionDate
            lastTransactionProduct
            lastTransactionStore
          }
          previewCustomerMsg {
            campaignMessage
            firstName
            lastName
            selectedDataTrack
          }
          previewMsg
          selectedDemographics {
            ageFrom
            ageTo
            gender
            joinedFrom
            joinedTo
            membershipTier {
              membershipTierId
              title
            }
          }
          selectedTags {
            smartTaggingId
            tagName
            taggingId
          }
          smartVoucherCampaignDetailId
          smartVoucherCampaignId
          smsTemplateId
          stepFunctionExecutionId
          targetCustomerSpending
          totalCustomerParticipated
          totalRevenueEarned
          totalTargetCustomer
          voucherDiscount
          voucherMinSpend
        }
        campaignTitle
        campaignTotalCustomerParticipated
        campaignTotalTargetCustomer
        comparisonType
        createdAt
        createdBy
        customerType
        errorFileKey
        estimatedCost
        estimatedRevenue
        merchantId
        messageStatus
        msgScheduleDateTime
        revenueSplit
        s3FileKey
        smartVoucherCampaignId
        stepFunctionExecutionId
        totalCampaignOptOutCustomers
        totalCustomers
        totalExistingCustomers
        totalFilteredCustomers
        updatedAt
        updatedBy
        voucherExpiryDate
      }
      nextToken
      total
    }
  }
`;
export const searchSmsCampaignResponse = /* GraphQL */ `
  query SearchSmsCampaignResponse(
    $filter: SearcSMSCampaignResponseFilter
    $limit: Int
    $nextToken: String
    $smsCampaignId: String
    $sort: ElasticSearchSortDirection
  ) {
    searchSmsCampaignResponse(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      smsCampaignId: $smsCampaignId
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        customerPhoneNumber
        message
        platform
        smsCampaignId
        smsCampaignResponseId
        smsScheduleDateTime
        smsText
        status
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchSmsTemplate = /* GraphQL */ `
  query SearchSmsTemplate(
    $filter: SearchSmsTemplateFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchSmsTemplate(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        merchantDepartmentId
        merchantId
        smsTemplateId
        smsText
        templateEmailBody {
          button
          divider
          emailText
          link
          media {
            mediaContent
            mediaType
          }
        }
        templateEmailDesign {
          buttonDesign {
            buttonColor
            buttonFontFamily
            buttonFontSize
            buttonRadius
            buttonTextColor
          }
          dividersDesign {
            dividerColor
            dividerHeight
            dividerStyle
          }
          linkDesign {
            linkColor
            linkFontFamily
            linkFontSize
            linkTextStyle
          }
          template {
            backgroundColor
            bodyColor
          }
          textStyles {
            heading1Color
            heading1FontFamily
            heading1FontSize
            heading2Color
            heading2FontFamily
            heading2FontSize
            paragraphFontFamily
            paragraphFontSize
            parapgraphColor
          }
        }
        templateEmailHtml
        templateMediaContent
        templateMediaType
        templateName
        templateStatus
        templateType
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchSplashScreens = /* GraphQL */ `
  query SearchSplashScreens(
    $filter: SearchSplashScreensFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchSplashScreens(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        buttonActionValue
        createdAt
        createdBy
        effectiveEndDateTime
        effectiveStartDateTime
        homeImage
        isDisabled
        merchantId
        sequence
        splashScreenId
        title
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchStockImages = /* GraphQL */ `
  query SearchStockImages(
    $filter: SearchStockImagesFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchStockImages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        stockImageCategory
        stockImageId
        stockImageUrl
      }
      nextToken
      total
    }
  }
`;
export const searchStockMovements = /* GraphQL */ `
  query SearchStockMovements(
    $filter: SearchStockMovementsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchStockMovements(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        expectedArrivalDate
        merchantId
        referenceNumber
        status
        stockMovementId
        supplierId
        supplierName
        taggingNames
        totalOrderedQuantity
        totalReceivedQuantity
        trackingNumber
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchStoreGroups = /* GraphQL */ `
  query SearchStoreGroups(
    $filter: SearchStoreGroupsFilter
    $limit: Int
    $merchantId: String
    $name: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchStoreGroups(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      name: $name
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        merchantId
        name
        storeGroupId
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchStoreList = /* GraphQL */ `
  query SearchStoreList($domain: String, $merchantId: String) {
    searchStoreList(domain: $domain, merchantId: $merchantId) {
      message
      offlineStores {
        address
        advancedOrderEnabled
        city
        code
        deliveryDuration
        deliveryFee
        deliveryMaxPurchaseQuantity
        deliveryMinPurchaseAmount
        deliveryPreparationTime
        deliveryServiceAvailable
        distance
        groupName
        isDisabled
        items {
          deliveryCompareAtPrice
          deliveryCostPerItem
          deliveryPrice
          deliveryPriceWithTax
          isSellingOffline
          itemId
          itemImage
          itemProperty
          itemTitle
          pickupCompareAtPrice
          pickupCostPerItem
          pickupPrice
          pickupPriceWithTax
          productId
          quantityForSales
          storeProductId
        }
        latitude
        longitude
        managerContact
        managerEmail
        managerName
        maxAdvancedOrderDay
        message
        minPurchase
        name
        offlineStoreOperate24Hour
        onlineStoreOperate24Hour
        pickupServiceAvailable
        postalCode
        primaryEmail
        state
        status
        storeId
        storeOperatingHourList {
          close
          day
          enabled
          endingTimeAfterMidnight
          open
        }
        storeOperatingHours
        taggingNames
        todayCloseTime
        todayOpenTime
        userId
        visibleToOnlineStore
      }
      status
    }
  }
`;
export const searchStoreProducts = /* GraphQL */ `
  query SearchStoreProducts(
    $filter: SearchStoreProductsFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchStoreProducts(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        collectionNames
        createdAt
        createdBy
        deliveryCompareAtPrice
        deliveryPrice
        deliveryPriceWithTax
        isDisabled
        itemCover
        itemHasVariant
        itemId
        itemImage
        itemIsVirtualGoods
        itemProperty
        itemSeoUrl
        itemSku
        itemTitle
        itemVariantName1
        itemVariantName2
        itemVariantName3
        itemVariantValue1
        itemVariantValue2
        itemVariantValue3
        itemVirtualGoodsExpiredAt
        itemVirtualGoodsExpiryDays
        marketPlaceAttributes {
          actualName
          hasChildren
          inputType
          isRequired
          parentId
          type
          typeId
          typeName
          typeValues {
            valueEnglishName
            valueId
            valueName
            valueUnit
          }
        }
        marketPlaceBrand {
          actualName
          hasChildren
          inputType
          isRequired
          parentId
          type
          typeId
          typeName
          typeValues {
            valueEnglishName
            valueId
            valueName
            valueUnit
          }
        }
        marketPlaceCategories {
          actualName
          hasChildren
          inputType
          isRequired
          parentId
          type
          typeId
          typeName
          typeValues {
            valueEnglishName
            valueId
            valueName
            valueUnit
          }
        }
        marketPlaceProductCode
        marketPlaceProductUOMCode
        merchantId
        modifierGroups {
          isItemsControlAvailable
          isSelected
          modifier {
            availableStatus
            isSelected
            modifierId
            modifierName
            price
          }
          modifierGroupId
          modifierGroupName
          modifierGroupType
          requestRemark
          selectionRangeMax
          selectionRangeMin
        }
        noOfPurchases
        pickupCompareAtPrice
        pickupPrice
        pickupPriceWithTax
        quantityForSales
        quantityType
        salesChannelName
        storeId
        storeName
        storeProductId
        taggingNames
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchStores = /* GraphQL */ `
  query SearchStores(
    $filter: SearchStoresFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchStores(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        acceptOrderWithMinPurchase
        address
        city
        closingHour
        code
        createdAt
        createdBy
        deliveryDiscountAmount
        deliveryDiscountBasketValue
        deliveryDiscountType
        deliveryDuration
        deliveryFee
        deliveryGracePeriod
        deliveryMaxPurchaseQuantity
        deliveryMinPurchaseAmount
        deliveryPartnerMaxRetry
        deliveryPreparationTime
        deliveryServiceAvailable
        driveThru
        eCommEndDate
        eCommStartDate
        freeDeliveryWithMinPurchase
        groupName
        hasSeatingArea
        incrementDistanceCharges
        incrementDistanceUnit
        isDisabled
        isOffline24Hour
        isOnline24Hour
        lastOrderTime
        lastSyncOrderDateTime
        latitude
        longitude
        managerContact
        managerEmail
        managerName
        maxOrderQty
        merchantId
        minDeliveryDuration
        minDistance
        minDistanceCharges
        minFoodPreparationDuration
        minPurchaseAmount
        name
        openingHour
        pickupServiceAvailable
        pollingDeliveryTime
        postalCode
        priceGroupId
        priceGroupName
        priorityDeliveryPartner
        riderTimeout
        routingOption
        salesChannelId
        salesChannelName
        state
        storeId
        taggingNames
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchSuppliers = /* GraphQL */ `
  query SearchSuppliers(
    $filter: SearchSuppliersFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchSuppliers(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        address
        contact
        contactName
        country
        email
        merchantId
        name
        supplierId
      }
      nextToken
      total
    }
  }
`;
export const searchTaggings = /* GraphQL */ `
  query SearchTaggings(
    $filter: SearchTaggingsFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchTaggings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        merchantId
        name
        taggingId
        type
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchTimelines = /* GraphQL */ `
  query SearchTimelines(
    $filter: SearchTimelinesFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchTimelines(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        createdAt
        createdBy
        description
        merchantId
        timelineForId
        timelineId
        title
        type
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchTruckPackingLists = /* GraphQL */ `
  query SearchTruckPackingLists(
    $filter: SearchTruckPackingListsResponseFilter
    $limit: Int
    $nextToken: String
    $sort: ElasticSearchSortDirection
    $truckPackingListId: String
  ) {
    searchTruckPackingLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sort: $sort
      truckPackingListId: $truckPackingListId
    ) {
      items {
        branchId
        createdAt
        createdBy
        merchantId
        packingDate
        packingSlipUrl
        packingTime
        truckCapacityId
        truckId
        truckName
        truckPackingListId
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchTruckSchedules = /* GraphQL */ `
  query SearchTruckSchedules(
    $filter: SearchTruckSchedulesResponseFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
    $truckId: String
    $truckScheduleId: String
  ) {
    searchTruckSchedules(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
      truckId: $truckId
      truckScheduleId: $truckScheduleId
    ) {
      items {
        branchId
        createdAt
        createdBy
        day
        merchantId
        postal
        time
        truckId
        truckName
        truckScheduleId
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchTrucks = /* GraphQL */ `
  query SearchTrucks(
    $filter: SearchTrucksResponseFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
    $truckId: String
  ) {
    searchTrucks(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
      truckId: $truckId
    ) {
      items {
        branchList
        createdAt
        createdBy
        deliveryFee
        limit
        merchantId
        truckId
        truckName
        truckNumber
        truckScheduleDay
        truckScheduleTime
        unit
        updatedAt
        updatedBy
      }
      nextToken
      total
    }
  }
`;
export const searchUploadFileDetail = /* GraphQL */ `
  query SearchUploadFileDetail(
    $filter: SearchUploadFileDetailFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
    $uploadFileDetailId: String
  ) {
    searchUploadFileDetail(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
      uploadFileDetailId: $uploadFileDetailId
    ) {
      items {
        createdAt
        documentType
        fileName
        inputS3Path
        marketPlace
        outputS3Path
        status
        updatedAt
        uploadFileDetailId
      }
      nextToken
      total
    }
  }
`;
export const searchUserGroups = /* GraphQL */ `
  query SearchUserGroups(
    $filter: SearchUserGroupsResponseFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
    $userGroupId: String
    $userGroupName: String
  ) {
    searchUserGroups(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
      userGroupId: $userGroupId
      userGroupName: $userGroupName
    ) {
      items {
        createdAt
        createdBy
        merchantId
        totalUser
        updatedAt
        updatedBy
        userGroupId
        userGroupName
      }
      nextToken
      total
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchUsersFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchUsers(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        accountId
        accountName
        createdAt
        createdBy
        email
        isDisabled
        merchantId
        name
        storeId
        storeName
        updatedAt
        updatedBy
        userGroupId
        userGroupName
        userId
      }
      nextToken
      total
    }
  }
`;
export const searchVouchers = /* GraphQL */ `
  query SearchVouchers(
    $filter: SearchVouchersFilter
    $limit: Int
    $merchantId: String
    $nextToken: String
    $sort: ElasticSearchSortDirection
  ) {
    searchVouchers(
      filter: $filter
      limit: $limit
      merchantId: $merchantId
      nextToken: $nextToken
      sort: $sort
    ) {
      items {
        category
        customerCondition
        customerGetDiscountLimit
        customerGetDiscountType
        customerGetItems {
          ids
          type
        }
        customerGetPercentValue
        customerGetQuantity
        customerGetValue
        deliveryDiscountType
        deliveryDiscountValue
        description
        discountAmountCap
        discountOnDelivery
        discountOnProductValue
        image
        isShareable
        isUnlimitedDistribution
        maxUserObtainLimit
        merchantId
        minimumAmount
        minimumCondition
        minimumQuantity
        orderType
        price
        productConditions {
          ids
          type
        }
        productsDiscount {
          ids
          type
        }
        qrImageKey
        requiredPoints
        status
        title
        totalDistributed
        totalDistributionLimit
        type
        voucherCodeS3Key
        voucherExpiryType
        voucherExpiryValue
        voucherIcon
        voucherId
      }
      nextToken
      total
    }
  }
`;
export const validateCustomerSeating = /* GraphQL */ `
  query ValidateCustomerSeating($domain: String, $seatingNo: String) {
    validateCustomerSeating(domain: $domain, seatingNo: $seatingNo) {
      message
      redirectURL
      seatingSection
      status
    }
  }
`;

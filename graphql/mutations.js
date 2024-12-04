/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const acceptRejectVoucher = /* GraphQL */ `
  mutation AcceptRejectVoucher(
    $action: String
    $confirmationDate: String
    $customerId: String
    $voucherCode: String
  ) {
    acceptRejectVoucher(
      action: $action
      confirmationDate: $confirmationDate
      customerId: $customerId
      voucherCode: $voucherCode
    ) {
      message
      status
    }
  }
`;
export const addHelpCenterIssue = /* GraphQL */ `
  mutation AddHelpCenterIssue($inputList: [HelpCenterIssueInput]) {
    addHelpCenterIssue(inputList: $inputList) {
      message
      status
    }
  }
`;
export const addItemToCustomerCart = /* GraphQL */ `
  mutation AddItemToCustomerCart(
    $accessToken: String
    $cartChannel: String
    $customOrderId: String
    $customerId: String
    $itemId: String
    $itemProperty: String
    $mandatoryItem: Boolean
    $merchantId: String
    $quantity: Int
    $salesChannelName: String
    $selectedModifierGroups: [ModifierGroupsInput]
    $storeId: String
    $storeName: String
    $timeslotEndDateTime: String
    $timeslotStartDateTime: String
    $type: String
  ) {
    addItemToCustomerCart(
      accessToken: $accessToken
      cartChannel: $cartChannel
      customOrderId: $customOrderId
      customerId: $customerId
      itemId: $itemId
      itemProperty: $itemProperty
      mandatoryItem: $mandatoryItem
      merchantId: $merchantId
      quantity: $quantity
      salesChannelName: $salesChannelName
      selectedModifierGroups: $selectedModifierGroups
      storeId: $storeId
      storeName: $storeName
      timeslotEndDateTime: $timeslotEndDateTime
      timeslotStartDateTime: $timeslotStartDateTime
      type: $type
    ) {
      customerCartId
      message
      status
    }
  }
`;
export const addUpdateDeleteVoucherCart = /* GraphQL */ `
  mutation AddUpdateDeleteVoucherCart(
    $action: String
    $customerId: String
    $merchantId: String
    $voucherCartId: String
    $voucherId: String
    $voucherPrice: Float
    $voucherQuantity: Int
  ) {
    addUpdateDeleteVoucherCart(
      action: $action
      customerId: $customerId
      merchantId: $merchantId
      voucherCartId: $voucherCartId
      voucherId: $voucherId
      voucherPrice: $voucherPrice
      voucherQuantity: $voucherQuantity
    ) {
      customerVoucherCartId
      message
      status
    }
  }
`;
export const adminAddCollectionsToProduct = /* GraphQL */ `
  mutation AdminAddCollectionsToProduct(
    $collectionList: [String]
    $merchantId: String
    $productIdList: [String]
  ) {
    adminAddCollectionsToProduct(
      collectionList: $collectionList
      merchantId: $merchantId
      productIdList: $productIdList
    ) {
      message
      status
    }
  }
`;
export const adminAddOrUpdateAccount = /* GraphQL */ `
  mutation AdminAddOrUpdateAccount(
    $accountName: String
    $country: String
    $merchantId: String
    $smartEyeRecipient: String
    $state: String
  ) {
    adminAddOrUpdateAccount(
      accountName: $accountName
      country: $country
      merchantId: $merchantId
      smartEyeRecipient: $smartEyeRecipient
      state: $state
    ) {
      message
      status
    }
  }
`;
export const adminAddTagsToModule = /* GraphQL */ `
  mutation AdminAddTagsToModule(
    $merchantId: String
    $taggingList: [String]
    $type: String
    $typeIdList: [String]
  ) {
    adminAddTagsToModule(
      merchantId: $merchantId
      taggingList: $taggingList
      type: $type
      typeIdList: $typeIdList
    ) {
      message
      status
    }
  }
`;
export const adminBulkUpdateCreditLimitOrders = /* GraphQL */ `
  mutation AdminBulkUpdateCreditLimitOrders(
    $newCreditLimitPaymentStatus: String
    $orderId: [String]
  ) {
    adminBulkUpdateCreditLimitOrders(
      newCreditLimitPaymentStatus: $newCreditLimitPaymentStatus
      orderId: $orderId
    ) {
      message
      status
    }
  }
`;
export const adminCancelEInvoice = /* GraphQL */ `
  mutation AdminCancelEInvoice($eInvoiceId: String) {
    adminCancelEInvoice(eInvoiceId: $eInvoiceId) {
      message
      status
    }
  }
`;
export const adminCancelManualPaymentOrder = /* GraphQL */ `
  mutation AdminCancelManualPaymentOrder(
    $merchantId: String
    $orderId: String
    $token: String
  ) {
    adminCancelManualPaymentOrder(
      merchantId: $merchantId
      orderId: $orderId
      token: $token
    ) {
      message
      status
    }
  }
`;
export const adminCancelOrder = /* GraphQL */ `
  mutation AdminCancelOrder(
    $merchantId: String
    $notifyCustomer: Boolean
    $orderDetailsToBeCancelled: [OrderDetailToBeCancelled]
    $orderId: String
    $reason: String
    $restock: Boolean
  ) {
    adminCancelOrder(
      merchantId: $merchantId
      notifyCustomer: $notifyCustomer
      orderDetailsToBeCancelled: $orderDetailsToBeCancelled
      orderId: $orderId
      reason: $reason
      restock: $restock
    ) {
      message
      status
    }
  }
`;
export const adminCheckMarketPlaceTestStatus = /* GraphQL */ `
  mutation AdminCheckMarketPlaceTestStatus($marketPlaceSettingId: String) {
    adminCheckMarketPlaceTestStatus(
      marketPlaceSettingId: $marketPlaceSettingId
    ) {
      message
      status
      storeCode
      storeName
    }
  }
`;
export const adminCheckTopUpShippingPaymentStatus = /* GraphQL */ `
  mutation AdminCheckTopUpShippingPaymentStatus(
    $merchantId: String
    $orderNumber: String
  ) {
    adminCheckTopUpShippingPaymentStatus(
      merchantId: $merchantId
      orderNumber: $orderNumber
    ) {
      message
      serviceType
      status
    }
  }
`;
export const adminCompletePickUpOrder = /* GraphQL */ `
  mutation AdminCompletePickUpOrder(
    $merchantId: String
    $orderId: String
    $token: String
  ) {
    adminCompletePickUpOrder(
      merchantId: $merchantId
      orderId: $orderId
      token: $token
    ) {
      message
      status
    }
  }
`;
export const adminCreateFacebookLiveCampaign = /* GraphQL */ `
  mutation AdminCreateFacebookLiveCampaign(
    $facebookLiveCampaignDetails: [FacebookLiveCampaignDetailInput]
    $facebookLiveCampaignId: String
    $merchantId: String
    $salesChannelName: String
    $scheduleEndDateTime: String
    $scheduleStartDateTime: String
    $status: String
    $storeId: String
    $storeName: String
    $title: String
  ) {
    adminCreateFacebookLiveCampaign(
      facebookLiveCampaignDetails: $facebookLiveCampaignDetails
      facebookLiveCampaignId: $facebookLiveCampaignId
      merchantId: $merchantId
      salesChannelName: $salesChannelName
      scheduleEndDateTime: $scheduleEndDateTime
      scheduleStartDateTime: $scheduleStartDateTime
      status: $status
      storeId: $storeId
      storeName: $storeName
      title: $title
    ) {
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
  }
`;
export const adminCreateFaq = /* GraphQL */ `
  mutation AdminCreateFaq(
    $answer: String
    $faqCategory: String
    $merchantId: String
    $parentId: String
    $question: String
    $sequence: Int
  ) {
    adminCreateFaq(
      answer: $answer
      faqCategory: $faqCategory
      merchantId: $merchantId
      parentId: $parentId
      question: $question
      sequence: $sequence
    ) {
      message
      status
    }
  }
`;
export const adminCreateFaqCategory = /* GraphQL */ `
  mutation AdminCreateFaqCategory(
    $merchantId: String
    $sequence: Int
    $title: String
  ) {
    adminCreateFaqCategory(
      merchantId: $merchantId
      sequence: $sequence
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminCreateFilterTab = /* GraphQL */ `
  mutation AdminCreateFilterTab(
    $condition: String
    $merchantId: String
    $title: String
    $type: String
  ) {
    adminCreateFilterTab(
      condition: $condition
      merchantId: $merchantId
      title: $title
      type: $type
    ) {
      message
      status
    }
  }
`;
export const adminCreateHomeCollection = /* GraphQL */ `
  mutation AdminCreateHomeCollection(
    $collectionIcon: String
    $collectionId: String
    $collectionImage: String
    $collectionSeoUrl: String
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $homeCollectionType: String
    $isDisabled: Boolean
    $merchantId: String
    $sequence: Int
    $title: String
  ) {
    adminCreateHomeCollection(
      collectionIcon: $collectionIcon
      collectionId: $collectionId
      collectionImage: $collectionImage
      collectionSeoUrl: $collectionSeoUrl
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      homeCollectionType: $homeCollectionType
      isDisabled: $isDisabled
      merchantId: $merchantId
      sequence: $sequence
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminCreateKnowledgeBase = /* GraphQL */ `
  mutation AdminCreateKnowledgeBase($listOfKb: [ListOfKbInput]) {
    adminCreateKnowledgeBase(listOfKb: $listOfKb) {
      message
      status
    }
  }
`;
export const adminCreateLandingPageBanner = /* GraphQL */ `
  mutation AdminCreateLandingPageBanner(
    $buttonActionValue: String
    $detailPageImage: String
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $homeImage: String
    $isDisabled: Boolean
    $merchantId: String
    $sequence: Int
    $title: String
  ) {
    adminCreateLandingPageBanner(
      buttonActionValue: $buttonActionValue
      detailPageImage: $detailPageImage
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      homeImage: $homeImage
      isDisabled: $isDisabled
      merchantId: $merchantId
      sequence: $sequence
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminCreateManualPaymentOption = /* GraphQL */ `
  mutation AdminCreateManualPaymentOption(
    $TNGPaymentLink: String
    $isBankTransfer: Boolean
    $isDisabled: Boolean
    $manualPaymentMethodName: String
    $merchantId: String
    $paymentInstructions: String
    $qrCode: String
  ) {
    adminCreateManualPaymentOption(
      TNGPaymentLink: $TNGPaymentLink
      isBankTransfer: $isBankTransfer
      isDisabled: $isDisabled
      manualPaymentMethodName: $manualPaymentMethodName
      merchantId: $merchantId
      paymentInstructions: $paymentInstructions
      qrCode: $qrCode
    ) {
      message
      onBoardRole
      status
    }
  }
`;
export const adminCreateMembershipTier = /* GraphQL */ `
  mutation AdminCreateMembershipTier(
    $merchantId: String
    $point: Float
    $title: String
  ) {
    adminCreateMembershipTier(
      merchantId: $merchantId
      point: $point
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateAutopilotEvent = /* GraphQL */ `
  mutation AdminCreateOrUpdateAutopilotEvent(
    $eventFlowId: String
    $flow: String
    $isDisabled: Boolean
    $title: String
  ) {
    adminCreateOrUpdateAutopilotEvent(
      eventFlowId: $eventFlowId
      flow: $flow
      isDisabled: $isDisabled
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateBranch = /* GraphQL */ `
  mutation AdminCreateOrUpdateBranch(
    $address: String
    $branchId: String
    $branchName: String
    $postalCode: String
  ) {
    adminCreateOrUpdateBranch(
      address: $address
      branchId: $branchId
      branchName: $branchName
      postalCode: $postalCode
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateCustomOrder = /* GraphQL */ `
  mutation AdminCreateOrUpdateCustomOrder(
    $billingAddress: String
    $billingCity: String
    $billingCountry: String
    $billingPostalCode: String
    $billingState: String
    $creditLimitOrder: Boolean
    $customOrderId: String
    $customerId: String
    $customerInfo: CustomerInfoInput
    $itemList: [CustomOrderItemInput]
    $noteToRider: String
    $orderType: String
    $scheduledDate: String
    $scheduledTime: String
    $shippingAddress: String
    $shippingCity: String
    $shippingCountry: String
    $shippingPostalCode: String
    $shippingState: String
    $truckCapacityId: String
  ) {
    adminCreateOrUpdateCustomOrder(
      billingAddress: $billingAddress
      billingCity: $billingCity
      billingCountry: $billingCountry
      billingPostalCode: $billingPostalCode
      billingState: $billingState
      creditLimitOrder: $creditLimitOrder
      customOrderId: $customOrderId
      customerId: $customerId
      customerInfo: $customerInfo
      itemList: $itemList
      noteToRider: $noteToRider
      orderType: $orderType
      scheduledDate: $scheduledDate
      scheduledTime: $scheduledTime
      shippingAddress: $shippingAddress
      shippingCity: $shippingCity
      shippingCountry: $shippingCountry
      shippingPostalCode: $shippingPostalCode
      shippingState: $shippingState
      truckCapacityId: $truckCapacityId
    ) {
      checkoutLink
      customerCartIds
      message
      status
    }
  }
`;
export const adminCreateOrUpdateCustomer = /* GraphQL */ `
  mutation AdminCreateOrUpdateCustomer(
    $address: String
    $creditLimit: Float
    $customerId: String
    $firstName: String
    $isBlocked: Boolean
    $lastName: String
    $merchantId: String
    $mobileNo: String
    $primaryEmail: String
  ) {
    adminCreateOrUpdateCustomer(
      address: $address
      creditLimit: $creditLimit
      customerId: $customerId
      firstName: $firstName
      isBlocked: $isBlocked
      lastName: $lastName
      merchantId: $merchantId
      mobileNo: $mobileNo
      primaryEmail: $primaryEmail
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateDocumentColumnMapping = /* GraphQL */ `
  mutation AdminCreateOrUpdateDocumentColumnMapping(
    $actualValue: String
    $alternativeValueList: [String]
    $extractedDocumentColumnMappingId: String
    $fieldNameList: [String]
    $merchantId: String
  ) {
    adminCreateOrUpdateDocumentColumnMapping(
      actualValue: $actualValue
      alternativeValueList: $alternativeValueList
      extractedDocumentColumnMappingId: $extractedDocumentColumnMappingId
      fieldNameList: $fieldNameList
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateDocumentLookup = /* GraphQL */ `
  mutation AdminCreateOrUpdateDocumentLookup(
    $csvS3Key: String
    $extractedDocumentLookupId: String
    $lookupName: String
  ) {
    adminCreateOrUpdateDocumentLookup(
      csvS3Key: $csvS3Key
      extractedDocumentLookupId: $extractedDocumentLookupId
      lookupName: $lookupName
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateDocumentLookupDetail = /* GraphQL */ `
  mutation AdminCreateOrUpdateDocumentLookupDetail(
    $extractedDocumentLookupId: String
    $headersAndValues: [HeadersAndValuesInput]
  ) {
    adminCreateOrUpdateDocumentLookupDetail(
      extractedDocumentLookupId: $extractedDocumentLookupId
      headersAndValues: $headersAndValues
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateDocumentTemplate = /* GraphQL */ `
  mutation AdminCreateOrUpdateDocumentTemplate(
    $columnMappings: [ExtractedDocumentColumnMappingsInput]
    $csvExportFrequency: ExtractedDocumentCsvExportFrequencyInput
    $dataLabels: ExtractedDocumentTemplateDataLabelInput
    $defaultTemplate: Boolean
    $documentS3Key: String
    $documentTemplateName: String
    $documentTemplateType: String
    $extractedDocumentTemplateId: String
    $isExportCsv: Boolean
    $lookupFields: [LookupFieldInput]
  ) {
    adminCreateOrUpdateDocumentTemplate(
      columnMappings: $columnMappings
      csvExportFrequency: $csvExportFrequency
      dataLabels: $dataLabels
      defaultTemplate: $defaultTemplate
      documentS3Key: $documentS3Key
      documentTemplateName: $documentTemplateName
      documentTemplateType: $documentTemplateType
      extractedDocumentTemplateId: $extractedDocumentTemplateId
      isExportCsv: $isExportCsv
      lookupFields: $lookupFields
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateDynamicForm = /* GraphQL */ `
  mutation AdminCreateOrUpdateDynamicForm(
    $dynamicFormId: String
    $layout: String
  ) {
    adminCreateOrUpdateDynamicForm(
      dynamicFormId: $dynamicFormId
      layout: $layout
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateDynamicFormAnswer = /* GraphQL */ `
  mutation AdminCreateOrUpdateDynamicFormAnswer(
    $dynamicFormAnswerId: String
    $dynamicFormId: String
    $layout: String
  ) {
    adminCreateOrUpdateDynamicFormAnswer(
      dynamicFormAnswerId: $dynamicFormAnswerId
      dynamicFormId: $dynamicFormId
      layout: $layout
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateFoodMarketPlaceSmsCampaign = /* GraphQL */ `
  mutation AdminCreateOrUpdateFoodMarketPlaceSmsCampaign(
    $customerSegmentIndex: String
    $description: String
    $discountOnProductValue: Float
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $foodMarketPlaceSmsCampaignId: String
    $marketPlaceChannel: String
    $orderNumOfDaysRange: Int
    $promoCode: String
    $salesConversionRate: Float
    $smsScheduleDateTime: String
    $smsText: String
    $title: String
  ) {
    adminCreateOrUpdateFoodMarketPlaceSmsCampaign(
      customerSegmentIndex: $customerSegmentIndex
      description: $description
      discountOnProductValue: $discountOnProductValue
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      foodMarketPlaceSmsCampaignId: $foodMarketPlaceSmsCampaignId
      marketPlaceChannel: $marketPlaceChannel
      orderNumOfDaysRange: $orderNumOfDaysRange
      promoCode: $promoCode
      salesConversionRate: $salesConversionRate
      smsScheduleDateTime: $smsScheduleDateTime
      smsText: $smsText
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateNotificationSetting = /* GraphQL */ `
  mutation AdminCreateOrUpdateNotificationSetting(
    $emailBody: String
    $emailSubject: String
    $merchantId: String
    $status: String
    $type: String
  ) {
    adminCreateOrUpdateNotificationSetting(
      emailBody: $emailBody
      emailSubject: $emailSubject
      merchantId: $merchantId
      status: $status
      type: $type
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdatePromotionalWidget = /* GraphQL */ `
  mutation AdminCreateOrUpdatePromotionalWidget(
    $createdAt: String
    $createdBy: String
    $merchantId: String
    $promotionalWidgetId: String
    $updatedAt: String
    $updatedBy: String
    $widgetName: String
    $widgetUrl: String
  ) {
    adminCreateOrUpdatePromotionalWidget(
      createdAt: $createdAt
      createdBy: $createdBy
      merchantId: $merchantId
      promotionalWidgetId: $promotionalWidgetId
      updatedAt: $updatedAt
      updatedBy: $updatedBy
      widgetName: $widgetName
      widgetUrl: $widgetUrl
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdatePushNotifications = /* GraphQL */ `
  mutation AdminCreateOrUpdatePushNotifications(
    $actionId: String
    $actionType: String
    $body: String
    $csvS3Key: String
    $image: String
    $listOfCustomer: [String]
    $notificationCampaignId: String
    $scheduledDateTime: String
    $showToNewUser: Boolean
    $targetAudience: TargetAudienceInput
    $title: String
  ) {
    adminCreateOrUpdatePushNotifications(
      actionId: $actionId
      actionType: $actionType
      body: $body
      csvS3Key: $csvS3Key
      image: $image
      listOfCustomer: $listOfCustomer
      notificationCampaignId: $notificationCampaignId
      scheduledDateTime: $scheduledDateTime
      showToNewUser: $showToNewUser
      targetAudience: $targetAudience
      title: $title
    ) {
      message
      notificationCampaignId
      status
    }
  }
`;
export const adminCreateOrUpdateSMSConfig = /* GraphQL */ `
  mutation AdminCreateOrUpdateSMSConfig(
    $csvS3Key: String
    $emailBody: [EmailBodyInput]
    $emailDesign: EmailDesignInput
    $listOfCustomerEmail: [String]
    $listOfCustomerPhoneNumber: [String]
    $listOfSelectedSmartTags: [String]
    $mediaContent: String
    $mediaType: String
    $platform: String
    $reply: Boolean
    $saveTemplate: Boolean
    $selectedTemplateId: String
    $smsCampaignId: String
    $smsScheduleDateTime: String
    $smsText: String
    $smsTopic: String
    $targetAudience: String
  ) {
    adminCreateOrUpdateSMSConfig(
      csvS3Key: $csvS3Key
      emailBody: $emailBody
      emailDesign: $emailDesign
      listOfCustomerEmail: $listOfCustomerEmail
      listOfCustomerPhoneNumber: $listOfCustomerPhoneNumber
      listOfSelectedSmartTags: $listOfSelectedSmartTags
      mediaContent: $mediaContent
      mediaType: $mediaType
      platform: $platform
      reply: $reply
      saveTemplate: $saveTemplate
      selectedTemplateId: $selectedTemplateId
      smsCampaignId: $smsCampaignId
      smsScheduleDateTime: $smsScheduleDateTime
      smsText: $smsText
      smsTopic: $smsTopic
      targetAudience: $targetAudience
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateSalesAgent = /* GraphQL */ `
  mutation AdminCreateOrUpdateSalesAgent(
    $customOrderEnabled: Boolean
    $firstName: String
    $lastName: String
    $maxCreditLimit: Float
    $merchantId: String
    $salesAgentId: String
    $username: String
  ) {
    adminCreateOrUpdateSalesAgent(
      customOrderEnabled: $customOrderEnabled
      firstName: $firstName
      lastName: $lastName
      maxCreditLimit: $maxCreditLimit
      merchantId: $merchantId
      salesAgentId: $salesAgentId
      username: $username
    ) {
      message
      salesAgentId
      status
    }
  }
`;
export const adminCreateOrUpdateSmartTagging = /* GraphQL */ `
  mutation AdminCreateOrUpdateSmartTagging(
    $condition: SmartTaggingConditionInput
    $listOfAssociatedProducts: [SmartTaggingProductInput]
    $promptText: String
    $smartTaggingId: String
    $tagName: String
  ) {
    adminCreateOrUpdateSmartTagging(
      condition: $condition
      listOfAssociatedProducts: $listOfAssociatedProducts
      promptText: $promptText
      smartTaggingId: $smartTaggingId
      tagName: $tagName
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateSmartVoucherCampaign = /* GraphQL */ `
  mutation AdminCreateOrUpdateSmartVoucherCampaign(
    $campaignDetail: [CampaignDetailInput]
    $campaignTitle: String
    $comparisonType: String
    $customerType: String
    $errorFileKey: String
    $estimatedRevenue: Float
    $msgScheduleDateTime: String
    $revenueSplit: Int
    $s3FileKey: String
    $smartVoucherCampaignId: String
  ) {
    adminCreateOrUpdateSmartVoucherCampaign(
      campaignDetail: $campaignDetail
      campaignTitle: $campaignTitle
      comparisonType: $comparisonType
      customerType: $customerType
      errorFileKey: $errorFileKey
      estimatedRevenue: $estimatedRevenue
      msgScheduleDateTime: $msgScheduleDateTime
      revenueSplit: $revenueSplit
      s3FileKey: $s3FileKey
      smartVoucherCampaignId: $smartVoucherCampaignId
    ) {
      message
      smartVoucherCampaignId
      status
    }
  }
`;
export const adminCreateOrUpdateSmsTemplate = /* GraphQL */ `
  mutation AdminCreateOrUpdateSmsTemplate(
    $smartVoucherVariables: [SmartVoucherVariableInput]
    $smsTemplateId: String
    $smsText: String
    $templateEmailBody: [EmailBodyInput]
    $templateEmailDesign: EmailDesignInput
    $templateMediaContent: String
    $templateMediaType: String
    $templateName: String
    $templateType: String
  ) {
    adminCreateOrUpdateSmsTemplate(
      smartVoucherVariables: $smartVoucherVariables
      smsTemplateId: $smsTemplateId
      smsText: $smsText
      templateEmailBody: $templateEmailBody
      templateEmailDesign: $templateEmailDesign
      templateMediaContent: $templateMediaContent
      templateMediaType: $templateMediaType
      templateName: $templateName
      templateType: $templateType
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateStampingCampaign = /* GraphQL */ `
  mutation AdminCreateOrUpdateStampingCampaign(
    $endDate: String
    $extraProductCondition: ProductConditionMappingInput
    $extraProductStamp: Int
    $isEnable: Boolean
    $merchantId: String
    $minSpend: Float
    $orderType: [String]
    $reminder: [ReminderInput]
    $rewardVoucher: [RewardVoucherMappingInput]
    $salesChannelName: [String]
    $stampCondition: StampConditionMappingInput
    $stampTypeValue: Int
    $stampingCampaignCode: String
    $stampingCampaignCycle: Int
    $stampingCampaignCycleDurationType: String
    $stampingCampaignCycleDurationValue: String
    $stampingCampaignDescription: String
    $stampingCampaignId: String
    $stampingCampaignImage: String
    $stampingCampaignListingImage: String
    $stampingCampaignTitle: String
    $stampingCampaignType: String
    $startDate: String
    $voucherExpiryDateType: String
    $voucherExpiryDateValue: String
  ) {
    adminCreateOrUpdateStampingCampaign(
      endDate: $endDate
      extraProductCondition: $extraProductCondition
      extraProductStamp: $extraProductStamp
      isEnable: $isEnable
      merchantId: $merchantId
      minSpend: $minSpend
      orderType: $orderType
      reminder: $reminder
      rewardVoucher: $rewardVoucher
      salesChannelName: $salesChannelName
      stampCondition: $stampCondition
      stampTypeValue: $stampTypeValue
      stampingCampaignCode: $stampingCampaignCode
      stampingCampaignCycle: $stampingCampaignCycle
      stampingCampaignCycleDurationType: $stampingCampaignCycleDurationType
      stampingCampaignCycleDurationValue: $stampingCampaignCycleDurationValue
      stampingCampaignDescription: $stampingCampaignDescription
      stampingCampaignId: $stampingCampaignId
      stampingCampaignImage: $stampingCampaignImage
      stampingCampaignListingImage: $stampingCampaignListingImage
      stampingCampaignTitle: $stampingCampaignTitle
      stampingCampaignType: $stampingCampaignType
      startDate: $startDate
      voucherExpiryDateType: $voucherExpiryDateType
      voucherExpiryDateValue: $voucherExpiryDateValue
    ) {
      message
      stampingCampaignId
      status
    }
  }
`;
export const adminCreateOrUpdateTruck = /* GraphQL */ `
  mutation AdminCreateOrUpdateTruck(
    $deliveryFee: Float
    $limit: Float
    $scheduleList: [ScheduleInput]
    $truckId: String
    $truckName: String
    $truckNumber: String
    $unit: String
  ) {
    adminCreateOrUpdateTruck(
      deliveryFee: $deliveryFee
      limit: $limit
      scheduleList: $scheduleList
      truckId: $truckId
      truckName: $truckName
      truckNumber: $truckNumber
      unit: $unit
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateUser = /* GraphQL */ `
  mutation AdminCreateOrUpdateUser(
    $accountId: String
    $accountName: String
    $email: String
    $name: String
    $storeId: String
    $storeName: String
    $userGroupId: String
    $userGroupName: String
    $userId: String
  ) {
    adminCreateOrUpdateUser(
      accountId: $accountId
      accountName: $accountName
      email: $email
      name: $name
      storeId: $storeId
      storeName: $storeName
      userGroupId: $userGroupId
      userGroupName: $userGroupName
      userId: $userId
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateUserGroup = /* GraphQL */ `
  mutation AdminCreateOrUpdateUserGroup(
    $userGroupId: String
    $userGroupName: String
    $userMatrixList: [UserMatrixInput]
  ) {
    adminCreateOrUpdateUserGroup(
      userGroupId: $userGroupId
      userGroupName: $userGroupName
      userMatrixList: $userMatrixList
    ) {
      message
      status
    }
  }
`;
export const adminCreateOrUpdateWarehouse = /* GraphQL */ `
  mutation AdminCreateOrUpdateWarehouse(
    $address: String
    $addressDetail: String
    $advancedOrderEnabled: Boolean
    $city: String
    $country: String
    $isOnDemandDeliveryEnabled: Boolean
    $isOwnTransportEnabled: Boolean
    $isPickupAccepted: Boolean
    $isStandardDeliveryEnabled: Boolean
    $latitude: Float
    $longitude: Float
    $maxAdvancedOrderDay: Int
    $merchantId: String
    $onDemandDefaultVehicleType: String
    $onDemandMaxDistance: Float
    $ownTransportCutoffTime: String
    $ownTransportDayInAdvance: Int
    $postalCode: String
    $standardPreferredPartnerName1: String
    $standardPreferredPartnerName2: String
    $state: String
    $storeOperatingHours: [StoreOpenCloseHoursInput]
    $warehouseId: String
  ) {
    adminCreateOrUpdateWarehouse(
      address: $address
      addressDetail: $addressDetail
      advancedOrderEnabled: $advancedOrderEnabled
      city: $city
      country: $country
      isOnDemandDeliveryEnabled: $isOnDemandDeliveryEnabled
      isOwnTransportEnabled: $isOwnTransportEnabled
      isPickupAccepted: $isPickupAccepted
      isStandardDeliveryEnabled: $isStandardDeliveryEnabled
      latitude: $latitude
      longitude: $longitude
      maxAdvancedOrderDay: $maxAdvancedOrderDay
      merchantId: $merchantId
      onDemandDefaultVehicleType: $onDemandDefaultVehicleType
      onDemandMaxDistance: $onDemandMaxDistance
      ownTransportCutoffTime: $ownTransportCutoffTime
      ownTransportDayInAdvance: $ownTransportDayInAdvance
      postalCode: $postalCode
      standardPreferredPartnerName1: $standardPreferredPartnerName1
      standardPreferredPartnerName2: $standardPreferredPartnerName2
      state: $state
      storeOperatingHours: $storeOperatingHours
      warehouseId: $warehouseId
    ) {
      message
      status
    }
  }
`;
export const adminCreatePointConversion = /* GraphQL */ `
  mutation AdminCreatePointConversion(
    $merchantId: String
    $pointConversionDetails: [PointConversionInput]
  ) {
    adminCreatePointConversion(
      merchantId: $merchantId
      pointConversionDetails: $pointConversionDetails
    ) {
      message
      status
    }
  }
`;
export const adminCreatePriceGroup = /* GraphQL */ `
  mutation AdminCreatePriceGroup(
    $delivery: Float
    $incrementType: String
    $name: String
    $pickUp: Float
    $storeIds: [String]
  ) {
    adminCreatePriceGroup(
      delivery: $delivery
      incrementType: $incrementType
      name: $name
      pickUp: $pickUp
      storeIds: $storeIds
    ) {
      message
      priceGroupId
      status
    }
  }
`;
export const adminCreateProduct = /* GraphQL */ `
  mutation AdminCreateProduct(
    $code: String
    $collectionNames: [String]
    $cover: String
    $deliveryCompareAtPrice: Float
    $deliveryCostPerItem: Float
    $deliveryPrice: Float
    $deliveryPriceWithTax: Float
    $description: String
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $hasVariant: Boolean
    $image: [String]
    $isDisabled: Boolean
    $isPreOrder: Boolean
    $isVirtualGoods: Boolean
    $merchantId: String
    $modifierProduct: Boolean
    $noOfPurchases: Int
    $noOfViews: Int
    $pickupCompareAtPrice: Float
    $pickupCostPerItem: Float
    $pickupPrice: Float
    $pickupPriceWithTax: Float
    $platform: String
    $productUOMs: [ProductUOMInput]
    $promotionEndDateTime: String
    $promotionStartDateTime: String
    $sellOnFacebookStore: Boolean
    $sellOnFoodPanda: Boolean
    $sellOnGrabFood: Boolean
    $sellOnGrabMart: Boolean
    $sellOnInstagram: Boolean
    $sellOnLazada: Boolean
    $sellOnOfflineStore: Boolean
    $sellOnOnlineStore: Boolean
    $sellOnPandaMart: Boolean
    $sellOnShopee: Boolean
    $seoDescription: String
    $seoTitle: String
    $seoUrl: String
    $taggingNames: [String]
    $timeslotType: String
    $timeslots: [TimeslotInput]
    $title: String
    $variantName1: String
    $variantName2: String
    $variantName3: String
    $variantValues1: [String]
    $variantValues2: [String]
    $variantValues3: [String]
    $video: String
    $virtualGoodsExpiredAt: String
    $virtualGoodsExpiryDays: String
  ) {
    adminCreateProduct(
      code: $code
      collectionNames: $collectionNames
      cover: $cover
      deliveryCompareAtPrice: $deliveryCompareAtPrice
      deliveryCostPerItem: $deliveryCostPerItem
      deliveryPrice: $deliveryPrice
      deliveryPriceWithTax: $deliveryPriceWithTax
      description: $description
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      hasVariant: $hasVariant
      image: $image
      isDisabled: $isDisabled
      isPreOrder: $isPreOrder
      isVirtualGoods: $isVirtualGoods
      merchantId: $merchantId
      modifierProduct: $modifierProduct
      noOfPurchases: $noOfPurchases
      noOfViews: $noOfViews
      pickupCompareAtPrice: $pickupCompareAtPrice
      pickupCostPerItem: $pickupCostPerItem
      pickupPrice: $pickupPrice
      pickupPriceWithTax: $pickupPriceWithTax
      platform: $platform
      productUOMs: $productUOMs
      promotionEndDateTime: $promotionEndDateTime
      promotionStartDateTime: $promotionStartDateTime
      sellOnFacebookStore: $sellOnFacebookStore
      sellOnFoodPanda: $sellOnFoodPanda
      sellOnGrabFood: $sellOnGrabFood
      sellOnGrabMart: $sellOnGrabMart
      sellOnInstagram: $sellOnInstagram
      sellOnLazada: $sellOnLazada
      sellOnOfflineStore: $sellOnOfflineStore
      sellOnOnlineStore: $sellOnOnlineStore
      sellOnPandaMart: $sellOnPandaMart
      sellOnShopee: $sellOnShopee
      seoDescription: $seoDescription
      seoTitle: $seoTitle
      seoUrl: $seoUrl
      taggingNames: $taggingNames
      timeslotType: $timeslotType
      timeslots: $timeslots
      title: $title
      variantName1: $variantName1
      variantName2: $variantName2
      variantName3: $variantName3
      variantValues1: $variantValues1
      variantValues2: $variantValues2
      variantValues3: $variantValues3
      video: $video
      virtualGoodsExpiredAt: $virtualGoodsExpiredAt
      virtualGoodsExpiryDays: $virtualGoodsExpiryDays
    ) {
      message
      productId
      status
    }
  }
`;
export const adminCreateProductBundle = /* GraphQL */ `
  mutation AdminCreateProductBundle(
    $barcode: String
    $collectionNames: [String]
    $cover: String
    $deliveryCompareAtPrice: Float
    $deliveryCostPerItem: Float
    $deliveryPrice: Float
    $deliveryPriceWithTax: Float
    $description: String
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $image: [String]
    $isDisabled: Boolean
    $isProductBundleTaxable: Boolean
    $merchantId: String
    $pickupCompareAtPrice: Float
    $pickupCostPerItem: Float
    $pickupPrice: Float
    $pickupPriceWithTax: Float
    $productBundleDetail: [ProductBundleDetailInput]
    $productBundlePricing: [ProductBundlePricingInput]
    $promotionEndDateTime: String
    $promotionStartDateTime: String
    $quantityForSales: Int
    $sellOnFacebookStore: Boolean
    $sellOnFoodPanda: Boolean
    $sellOnGrabFood: Boolean
    $sellOnGrabMart: Boolean
    $sellOnInstagram: Boolean
    $sellOnLazada: Boolean
    $sellOnOfflineStore: Boolean
    $sellOnOnlineStore: Boolean
    $sellOnPandaMart: Boolean
    $sellOnShopee: Boolean
    $seoDescription: String
    $seoTitle: String
    $seoUrl: String
    $shippingDimensionHeight: Float
    $shippingDimensionLength: Float
    $shippingDimensionWidth: Float
    $shippingWeight: Float
    $shippingWeightUnit: String
    $sku: String
    $taggingNames: [String]
    $title: String
    $totalStockQuantity: Int
    $video: String
  ) {
    adminCreateProductBundle(
      barcode: $barcode
      collectionNames: $collectionNames
      cover: $cover
      deliveryCompareAtPrice: $deliveryCompareAtPrice
      deliveryCostPerItem: $deliveryCostPerItem
      deliveryPrice: $deliveryPrice
      deliveryPriceWithTax: $deliveryPriceWithTax
      description: $description
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      image: $image
      isDisabled: $isDisabled
      isProductBundleTaxable: $isProductBundleTaxable
      merchantId: $merchantId
      pickupCompareAtPrice: $pickupCompareAtPrice
      pickupCostPerItem: $pickupCostPerItem
      pickupPrice: $pickupPrice
      pickupPriceWithTax: $pickupPriceWithTax
      productBundleDetail: $productBundleDetail
      productBundlePricing: $productBundlePricing
      promotionEndDateTime: $promotionEndDateTime
      promotionStartDateTime: $promotionStartDateTime
      quantityForSales: $quantityForSales
      sellOnFacebookStore: $sellOnFacebookStore
      sellOnFoodPanda: $sellOnFoodPanda
      sellOnGrabFood: $sellOnGrabFood
      sellOnGrabMart: $sellOnGrabMart
      sellOnInstagram: $sellOnInstagram
      sellOnLazada: $sellOnLazada
      sellOnOfflineStore: $sellOnOfflineStore
      sellOnOnlineStore: $sellOnOnlineStore
      sellOnPandaMart: $sellOnPandaMart
      sellOnShopee: $sellOnShopee
      seoDescription: $seoDescription
      seoTitle: $seoTitle
      seoUrl: $seoUrl
      shippingDimensionHeight: $shippingDimensionHeight
      shippingDimensionLength: $shippingDimensionLength
      shippingDimensionWidth: $shippingDimensionWidth
      shippingWeight: $shippingWeight
      shippingWeightUnit: $shippingWeightUnit
      sku: $sku
      taggingNames: $taggingNames
      title: $title
      totalStockQuantity: $totalStockQuantity
      video: $video
    ) {
      message
      status
    }
  }
`;
export const adminCreateProductCollection = /* GraphQL */ `
  mutation AdminCreateProductCollection(
    $banner: String
    $collectionProducts: [ItemToBeUpdated]
    $condition: String
    $conditionType: String
    $description: String
    $icon: String
    $merchantId: String
    $name: String
    $seoDescription: String
    $seoTitle: String
    $seoUrl: String
    $taggingNames: [String]
    $type: String
  ) {
    adminCreateProductCollection(
      banner: $banner
      collectionProducts: $collectionProducts
      condition: $condition
      conditionType: $conditionType
      description: $description
      icon: $icon
      merchantId: $merchantId
      name: $name
      seoDescription: $seoDescription
      seoTitle: $seoTitle
      seoUrl: $seoUrl
      taggingNames: $taggingNames
      type: $type
    ) {
      message
      status
    }
  }
`;
export const adminCreateProductExclusion = /* GraphQL */ `
  mutation AdminCreateProductExclusion(
    $merchantId: String
    $productExclusionDetails: [ProductExclusionInput]
  ) {
    adminCreateProductExclusion(
      merchantId: $merchantId
      productExclusionDetails: $productExclusionDetails
    ) {
      message
      status
    }
  }
`;
export const adminCreatePromoCodeCampaign = /* GraphQL */ `
  mutation AdminCreatePromoCodeCampaign(
    $activeCount: String
    $category: String
    $createdBy: String
    $customerCondition: String
    $deliveryDiscountType: String
    $discountAmountCap: Float
    $discountOnProductValue: Float
    $discountQuantityCap: Int
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $isDisabled: Boolean
    $maxUserUsageLimit: Int
    $merchantId: String
    $minimumCondition: String
    $minimumPurchase: Float
    $minimumQuantity: Int
    $orderType: [String]
    $productConditions: ProductsDiscount
    $productsDiscount: ProductsDiscount
    $promoCode: String
    $promoCodeCampaignId: String
    $remainingUsage: Int
    $specificCustomerTag: String
    $specificCustomers: [String]
    $status: String
    $stores: [String]
    $title: String
    $totalUsageLimit: Int
    $type: String
    $updatedBy: String
  ) {
    adminCreatePromoCodeCampaign(
      activeCount: $activeCount
      category: $category
      createdBy: $createdBy
      customerCondition: $customerCondition
      deliveryDiscountType: $deliveryDiscountType
      discountAmountCap: $discountAmountCap
      discountOnProductValue: $discountOnProductValue
      discountQuantityCap: $discountQuantityCap
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      isDisabled: $isDisabled
      maxUserUsageLimit: $maxUserUsageLimit
      merchantId: $merchantId
      minimumCondition: $minimumCondition
      minimumPurchase: $minimumPurchase
      minimumQuantity: $minimumQuantity
      orderType: $orderType
      productConditions: $productConditions
      productsDiscount: $productsDiscount
      promoCode: $promoCode
      promoCodeCampaignId: $promoCodeCampaignId
      remainingUsage: $remainingUsage
      specificCustomerTag: $specificCustomerTag
      specificCustomers: $specificCustomers
      status: $status
      stores: $stores
      title: $title
      totalUsageLimit: $totalUsageLimit
      type: $type
      updatedBy: $updatedBy
    ) {
      message
      status
    }
  }
`;
export const adminCreateSalesChannelStoreSetting = /* GraphQL */ `
  mutation AdminCreateSalesChannelStoreSetting(
    $clientId: String
    $clientSecret: String
    $merchantId: String
    $refreshToken: String
    $salesChannelId: String
    $salesChannelName: String
    $storeName: String
    $syncFrequency: String
  ) {
    adminCreateSalesChannelStoreSetting(
      clientId: $clientId
      clientSecret: $clientSecret
      merchantId: $merchantId
      refreshToken: $refreshToken
      salesChannelId: $salesChannelId
      salesChannelName: $salesChannelName
      storeName: $storeName
      syncFrequency: $syncFrequency
    ) {
      message
      status
    }
  }
`;
export const adminCreateShippingRate = /* GraphQL */ `
  mutation AdminCreateShippingRate(
    $amount: Float
    $conditionType: String
    $estimatedDuration: String
    $maxValue: Float
    $merchantId: String
    $minValue: Float
    $shippingZoneId: String
    $title: String
  ) {
    adminCreateShippingRate(
      amount: $amount
      conditionType: $conditionType
      estimatedDuration: $estimatedDuration
      maxValue: $maxValue
      merchantId: $merchantId
      minValue: $minValue
      shippingZoneId: $shippingZoneId
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminCreateShippingZone = /* GraphQL */ `
  mutation AdminCreateShippingZone(
    $country: String
    $merchantId: String
    $state: [String]
    $title: String
    $transportType: String
    $warehouseId: String
  ) {
    adminCreateShippingZone(
      country: $country
      merchantId: $merchantId
      state: $state
      title: $title
      transportType: $transportType
      warehouseId: $warehouseId
    ) {
      message
      status
    }
  }
`;
export const adminCreateSiteNavigation = /* GraphQL */ `
  mutation AdminCreateSiteNavigation(
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $isDisabled: Boolean
    $linkValue: String
    $menuType: String
    $merchantId: String
    $navigationType: String
    $openNewTab: Boolean
    $parentId: String
    $sequence: Int
    $title: String
  ) {
    adminCreateSiteNavigation(
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      isDisabled: $isDisabled
      linkValue: $linkValue
      menuType: $menuType
      merchantId: $merchantId
      navigationType: $navigationType
      openNewTab: $openNewTab
      parentId: $parentId
      sequence: $sequence
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminCreateSplashScreen = /* GraphQL */ `
  mutation AdminCreateSplashScreen(
    $buttonActionValue: String
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $homeImage: String
    $isDisabled: Boolean
    $merchantId: String
    $sequence: Int
    $title: String
  ) {
    adminCreateSplashScreen(
      buttonActionValue: $buttonActionValue
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      homeImage: $homeImage
      isDisabled: $isDisabled
      merchantId: $merchantId
      sequence: $sequence
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminCreateStockMovement = /* GraphQL */ `
  mutation AdminCreateStockMovement(
    $buyerNotes: String
    $expectedArrivalDate: String
    $merchantId: String
    $referenceNumber: String
    $status: String
    $stockMovementDetails: [StockMovementDetailInput]
    $supplierId: String
    $supplierName: String
    $taggingNames: [String]
    $trackingNumber: String
  ) {
    adminCreateStockMovement(
      buyerNotes: $buyerNotes
      expectedArrivalDate: $expectedArrivalDate
      merchantId: $merchantId
      referenceNumber: $referenceNumber
      status: $status
      stockMovementDetails: $stockMovementDetails
      supplierId: $supplierId
      supplierName: $supplierName
      taggingNames: $taggingNames
      trackingNumber: $trackingNumber
    ) {
      message
      status
    }
  }
`;
export const adminCreateStore = /* GraphQL */ `
  mutation AdminCreateStore(
    $address: String
    $city: String
    $code: String
    $deliveryDuration: Int
    $deliveryFee: Float
    $deliveryMaxPurchaseQuantity: Int
    $deliveryMinPurchaseAmount: Float
    $deliveryPreparationTime: Int
    $deliveryServiceAvailable: Boolean
    $isDisabled: Boolean
    $items: [CreateStoreItemInput]
    $latitude: String
    $longitude: String
    $managerContact: String
    $managerEmail: String
    $managerName: String
    $merchantId: String
    $name: String
    $onlineStoreOperate24Hour: Boolean
    $pickupServiceAvailable: Boolean
    $postalCode: String
    $priceGroupName: String
    $salesChannelName: String
    $state: String
    $storeOperatingHours: [StoreOperatingHourInput]
    $taggingNames: [String]
    $visibleToOnlineStore: Boolean
  ) {
    adminCreateStore(
      address: $address
      city: $city
      code: $code
      deliveryDuration: $deliveryDuration
      deliveryFee: $deliveryFee
      deliveryMaxPurchaseQuantity: $deliveryMaxPurchaseQuantity
      deliveryMinPurchaseAmount: $deliveryMinPurchaseAmount
      deliveryPreparationTime: $deliveryPreparationTime
      deliveryServiceAvailable: $deliveryServiceAvailable
      isDisabled: $isDisabled
      items: $items
      latitude: $latitude
      longitude: $longitude
      managerContact: $managerContact
      managerEmail: $managerEmail
      managerName: $managerName
      merchantId: $merchantId
      name: $name
      onlineStoreOperate24Hour: $onlineStoreOperate24Hour
      pickupServiceAvailable: $pickupServiceAvailable
      postalCode: $postalCode
      priceGroupName: $priceGroupName
      salesChannelName: $salesChannelName
      state: $state
      storeOperatingHours: $storeOperatingHours
      taggingNames: $taggingNames
      visibleToOnlineStore: $visibleToOnlineStore
    ) {
      message
      status
      storeId
    }
  }
`;
export const adminCreateStoreBlockedOutPeriod = /* GraphQL */ `
  mutation AdminCreateStoreBlockedOutPeriod(
    $endDateTime: String
    $merchantId: String
    $startDateTime: String
    $storeId: String
    $storeType: String
  ) {
    adminCreateStoreBlockedOutPeriod(
      endDateTime: $endDateTime
      merchantId: $merchantId
      startDateTime: $startDateTime
      storeId: $storeId
      storeType: $storeType
    ) {
      message
      status
    }
  }
`;
export const adminCreateStoreOperatingHour = /* GraphQL */ `
  mutation AdminCreateStoreOperatingHour(
    $merchantId: String
    $storeId: String
    $storeOperatingHours: [StoreOperatingHourInput]
  ) {
    adminCreateStoreOperatingHour(
      merchantId: $merchantId
      storeId: $storeId
      storeOperatingHours: $storeOperatingHours
    ) {
      message
      status
    }
  }
`;
export const adminCreateSupplier = /* GraphQL */ `
  mutation AdminCreateSupplier(
    $address: String
    $contact: String
    $contactName: String
    $country: String
    $email: String
    $merchantId: String
    $name: String
  ) {
    adminCreateSupplier(
      address: $address
      contact: $contact
      contactName: $contactName
      country: $country
      email: $email
      merchantId: $merchantId
      name: $name
    ) {
      message
      status
      supplierId
    }
  }
`;
export const adminCreateUserMatrix = /* GraphQL */ `
  mutation AdminCreateUserMatrix(
    $email: String
    $merchantId: String
    $name: String
    $userMatrixes: [UserMatrixInput]
  ) {
    adminCreateUserMatrix(
      email: $email
      merchantId: $merchantId
      name: $name
      userMatrixes: $userMatrixes
    ) {
      message
      status
    }
  }
`;
export const adminCreateVoucher = /* GraphQL */ `
  mutation AdminCreateVoucher(
    $category: String
    $customerCondition: String
    $customerGetDiscountLimit: Float
    $customerGetDiscountType: String
    $customerGetItems: ConditionMapping
    $customerGetPercentValue: Float
    $customerGetQuantity: Int
    $customerGetValue: Float
    $deliveryDiscountType: String
    $deliveryDiscountValue: Float
    $description: String
    $discountAmountCap: Float
    $discountOnDelivery: Boolean
    $discountOnProductValue: Float
    $image: String
    $isShareable: Boolean
    $isUnlimitedDistribution: Boolean
    $maxUserObtainLimit: Int
    $merchantId: String
    $minimumAmount: Float
    $minimumCondition: String
    $minimumQuantity: Int
    $orderType: [String]
    $price: Float
    $productConditions: VoucherProductConditionMappingInput
    $productsDiscount: ConditionMapping
    $requiredPoints: Int
    $status: String
    $title: String
    $totalDistributionLimit: Int
    $type: String
    $voucherCodeS3Key: String
    $voucherExpiryType: String
    $voucherExpiryValue: String
    $voucherIcon: String
    $voucherId: String
  ) {
    adminCreateVoucher(
      category: $category
      customerCondition: $customerCondition
      customerGetDiscountLimit: $customerGetDiscountLimit
      customerGetDiscountType: $customerGetDiscountType
      customerGetItems: $customerGetItems
      customerGetPercentValue: $customerGetPercentValue
      customerGetQuantity: $customerGetQuantity
      customerGetValue: $customerGetValue
      deliveryDiscountType: $deliveryDiscountType
      deliveryDiscountValue: $deliveryDiscountValue
      description: $description
      discountAmountCap: $discountAmountCap
      discountOnDelivery: $discountOnDelivery
      discountOnProductValue: $discountOnProductValue
      image: $image
      isShareable: $isShareable
      isUnlimitedDistribution: $isUnlimitedDistribution
      maxUserObtainLimit: $maxUserObtainLimit
      merchantId: $merchantId
      minimumAmount: $minimumAmount
      minimumCondition: $minimumCondition
      minimumQuantity: $minimumQuantity
      orderType: $orderType
      price: $price
      productConditions: $productConditions
      productsDiscount: $productsDiscount
      requiredPoints: $requiredPoints
      status: $status
      title: $title
      totalDistributionLimit: $totalDistributionLimit
      type: $type
      voucherCodeS3Key: $voucherCodeS3Key
      voucherExpiryType: $voucherExpiryType
      voucherExpiryValue: $voucherExpiryValue
      voucherIcon: $voucherIcon
      voucherId: $voucherId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteAccount = /* GraphQL */ `
  mutation AdminDeleteAccount($accountId: String) {
    adminDeleteAccount(accountId: $accountId) {
      message
      status
    }
  }
`;
export const adminDeleteAutopilotEvent = /* GraphQL */ `
  mutation AdminDeleteAutopilotEvent($eventFlowIds: [String]) {
    adminDeleteAutopilotEvent(eventFlowIds: $eventFlowIds) {
      message
      status
    }
  }
`;
export const adminDeleteBranch = /* GraphQL */ `
  mutation AdminDeleteBranch($branchIds: [String]) {
    adminDeleteBranch(branchIds: $branchIds) {
      message
      status
    }
  }
`;
export const adminDeleteCustomOrder = /* GraphQL */ `
  mutation AdminDeleteCustomOrder($customOrderId: String, $merchantId: String) {
    adminDeleteCustomOrder(
      customOrderId: $customOrderId
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteCustomerCart = /* GraphQL */ `
  mutation AdminDeleteCustomerCart(
    $customerIdList: [String]
    $merchantId: String
  ) {
    adminDeleteCustomerCart(
      customerIdList: $customerIdList
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteDocumentColumnMapping = /* GraphQL */ `
  mutation AdminDeleteDocumentColumnMapping(
    $extractedDocumentColumnMappingIds: [String]
  ) {
    adminDeleteDocumentColumnMapping(
      extractedDocumentColumnMappingIds: $extractedDocumentColumnMappingIds
    ) {
      message
      status
    }
  }
`;
export const adminDeleteDocumentLookup = /* GraphQL */ `
  mutation AdminDeleteDocumentLookup($extractedDocumentLookupId: String) {
    adminDeleteDocumentLookup(
      extractedDocumentLookupId: $extractedDocumentLookupId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteDocumentLookupDetail = /* GraphQL */ `
  mutation AdminDeleteDocumentLookupDetail(
    $extractedDocumentLookupDetailIds: [String]
  ) {
    adminDeleteDocumentLookupDetail(
      extractedDocumentLookupDetailIds: $extractedDocumentLookupDetailIds
    ) {
      message
      status
    }
  }
`;
export const adminDeleteDocumentTemplate = /* GraphQL */ `
  mutation AdminDeleteDocumentTemplate(
    $extractedDocumentTemplateIds: [String]
  ) {
    adminDeleteDocumentTemplate(
      extractedDocumentTemplateIds: $extractedDocumentTemplateIds
    ) {
      message
      status
    }
  }
`;
export const adminDeleteDynamicForm = /* GraphQL */ `
  mutation AdminDeleteDynamicForm($dynamicFormIds: [String]) {
    adminDeleteDynamicForm(dynamicFormIds: $dynamicFormIds) {
      message
      status
    }
  }
`;
export const adminDeleteDynamicFormAnswer = /* GraphQL */ `
  mutation AdminDeleteDynamicFormAnswer($dynamicFormAnswerIds: [String]) {
    adminDeleteDynamicFormAnswer(dynamicFormAnswerIds: $dynamicFormAnswerIds) {
      message
      status
    }
  }
`;
export const adminDeleteExtractedDocument = /* GraphQL */ `
  mutation AdminDeleteExtractedDocument($extractedDocumentIdList: [String]) {
    adminDeleteExtractedDocument(
      extractedDocumentIdList: $extractedDocumentIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeleteFacebookLiveCampaign = /* GraphQL */ `
  mutation AdminDeleteFacebookLiveCampaign(
    $facebookLiveCampaignIdList: [String]
    $merchantId: String
  ) {
    adminDeleteFacebookLiveCampaign(
      facebookLiveCampaignIdList: $facebookLiveCampaignIdList
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteFacebookLivePage = /* GraphQL */ `
  mutation AdminDeleteFacebookLivePage(
    $merchantId: String
    $storeIdList: [String]
  ) {
    adminDeleteFacebookLivePage(
      merchantId: $merchantId
      storeIdList: $storeIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeleteFaq = /* GraphQL */ `
  mutation AdminDeleteFaq($faqIdList: [String], $merchantId: String) {
    adminDeleteFaq(faqIdList: $faqIdList, merchantId: $merchantId) {
      message
      status
    }
  }
`;
export const adminDeleteFaqCategory = /* GraphQL */ `
  mutation AdminDeleteFaqCategory(
    $faqCategoryIdList: [String]
    $merchantId: String
  ) {
    adminDeleteFaqCategory(
      faqCategoryIdList: $faqCategoryIdList
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteFoodMarketPlaceSmsCampaign = /* GraphQL */ `
  mutation AdminDeleteFoodMarketPlaceSmsCampaign(
    $foodMarketPlaceSmsCampaignIdList: [String]
  ) {
    adminDeleteFoodMarketPlaceSmsCampaign(
      foodMarketPlaceSmsCampaignIdList: $foodMarketPlaceSmsCampaignIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeleteGalleryDetail = /* GraphQL */ `
  mutation AdminDeleteGalleryDetail(
    $galleryDetailIds: [String]
    $merchantId: String
  ) {
    adminDeleteGalleryDetail(
      galleryDetailIds: $galleryDetailIds
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteHomeCollection = /* GraphQL */ `
  mutation AdminDeleteHomeCollection(
    $homeCollectionIdList: [String]
    $merchantId: String
  ) {
    adminDeleteHomeCollection(
      homeCollectionIdList: $homeCollectionIdList
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteKnowledgeBase = /* GraphQL */ `
  mutation AdminDeleteKnowledgeBase($knowledgeBaseId: [String]) {
    adminDeleteKnowledgeBase(knowledgeBaseId: $knowledgeBaseId) {
      message
      status
    }
  }
`;
export const adminDeleteLandingPageBanner = /* GraphQL */ `
  mutation AdminDeleteLandingPageBanner(
    $landingPageBannerIdList: [String]
    $merchantId: String
  ) {
    adminDeleteLandingPageBanner(
      landingPageBannerIdList: $landingPageBannerIdList
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteManualPaymentOption = /* GraphQL */ `
  mutation AdminDeleteManualPaymentOption(
    $manualPaymentOptionsIdList: [String]
    $mechantId: String
  ) {
    adminDeleteManualPaymentOption(
      manualPaymentOptionsIdList: $manualPaymentOptionsIdList
      mechantId: $mechantId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteMembershipTier = /* GraphQL */ `
  mutation AdminDeleteMembershipTier(
    $membershipTierIdList: [String]
    $merchantId: String
  ) {
    adminDeleteMembershipTier(
      membershipTierIdList: $membershipTierIdList
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteModifierItems = /* GraphQL */ `
  mutation AdminDeleteModifierItems($modifierItemId: String) {
    adminDeleteModifierItems(modifierItemId: $modifierItemId) {
      message
      status
    }
  }
`;
export const adminDeleteOrder = /* GraphQL */ `
  mutation AdminDeleteOrder($merchantId: String, $orderList: [String]) {
    adminDeleteOrder(merchantId: $merchantId, orderList: $orderList) {
      message
      status
    }
  }
`;
export const adminDeletePointConversion = /* GraphQL */ `
  mutation AdminDeletePointConversion(
    $merchantId: String
    $pointConversionIdList: [String]
  ) {
    adminDeletePointConversion(
      merchantId: $merchantId
      pointConversionIdList: $pointConversionIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeletePriceGroup = /* GraphQL */ `
  mutation AdminDeletePriceGroup($priceGroupIds: [String]) {
    adminDeletePriceGroup(priceGroupIds: $priceGroupIds) {
      message
      status
    }
  }
`;
export const adminDeleteProduct = /* GraphQL */ `
  mutation AdminDeleteProduct($merchantId: String, $productIdList: [String]) {
    adminDeleteProduct(merchantId: $merchantId, productIdList: $productIdList) {
      message
      status
    }
  }
`;
export const adminDeleteProductBundle = /* GraphQL */ `
  mutation AdminDeleteProductBundle(
    $merchantId: String
    $productBundleIdList: [String]
  ) {
    adminDeleteProductBundle(
      merchantId: $merchantId
      productBundleIdList: $productBundleIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeleteProductCollection = /* GraphQL */ `
  mutation AdminDeleteProductCollection(
    $merchantId: String
    $productCollectionIdList: [String]
  ) {
    adminDeleteProductCollection(
      merchantId: $merchantId
      productCollectionIdList: $productCollectionIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeleteProductExclusion = /* GraphQL */ `
  mutation AdminDeleteProductExclusion(
    $merchantId: String
    $productExclusionId: String
  ) {
    adminDeleteProductExclusion(
      merchantId: $merchantId
      productExclusionId: $productExclusionId
    ) {
      message
      status
    }
  }
`;
export const adminDeletePromoCodeCampaign = /* GraphQL */ `
  mutation AdminDeletePromoCodeCampaign(
    $merchantId: String
    $promoCodeCampaignIdList: [String]
  ) {
    adminDeletePromoCodeCampaign(
      merchantId: $merchantId
      promoCodeCampaignIdList: $promoCodeCampaignIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeletePromotionalWidget = /* GraphQL */ `
  mutation AdminDeletePromotionalWidget(
    $merchantId: String
    $promotionalWidgetIdList: [String]
  ) {
    adminDeletePromotionalWidget(
      merchantId: $merchantId
      promotionalWidgetIdList: $promotionalWidgetIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeletePushNotifications = /* GraphQL */ `
  mutation AdminDeletePushNotifications($notificationIds: [String]) {
    adminDeletePushNotifications(notificationIds: $notificationIds) {
      message
      status
    }
  }
`;
export const adminDeleteSalesAgent = /* GraphQL */ `
  mutation AdminDeleteSalesAgent($salesAgentIdList: [String]) {
    adminDeleteSalesAgent(salesAgentIdList: $salesAgentIdList) {
      message
      status
    }
  }
`;
export const adminDeleteShippingRate = /* GraphQL */ `
  mutation AdminDeleteShippingRate(
    $merchantId: String
    $shippingRateIdList: [String]
  ) {
    adminDeleteShippingRate(
      merchantId: $merchantId
      shippingRateIdList: $shippingRateIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeleteShippingZone = /* GraphQL */ `
  mutation AdminDeleteShippingZone(
    $merchantId: String
    $shippingZoneId: String
  ) {
    adminDeleteShippingZone(
      merchantId: $merchantId
      shippingZoneId: $shippingZoneId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteSiteNavigation = /* GraphQL */ `
  mutation AdminDeleteSiteNavigation(
    $merchantId: String
    $siteNavigationId: String
  ) {
    adminDeleteSiteNavigation(
      merchantId: $merchantId
      siteNavigationId: $siteNavigationId
    ) {
      message
      status
    }
  }
`;
export const adminDeleteSmartTagging = /* GraphQL */ `
  mutation AdminDeleteSmartTagging($smartTaggingId: String) {
    adminDeleteSmartTagging(smartTaggingId: $smartTaggingId) {
      message
      status
    }
  }
`;
export const adminDeleteSmartVoucherCampaign = /* GraphQL */ `
  mutation AdminDeleteSmartVoucherCampaign(
    $smartVoucherCampaignIdList: [String]
  ) {
    adminDeleteSmartVoucherCampaign(
      smartVoucherCampaignIdList: $smartVoucherCampaignIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeleteSmsConfig = /* GraphQL */ `
  mutation AdminDeleteSmsConfig($smsCampaignIdList: [String]) {
    adminDeleteSmsConfig(smsCampaignIdList: $smsCampaignIdList) {
      message
      status
    }
  }
`;
export const adminDeleteSmsTemplate = /* GraphQL */ `
  mutation AdminDeleteSmsTemplate($smsTemplateIdList: [String]) {
    adminDeleteSmsTemplate(smsTemplateIdList: $smsTemplateIdList) {
      message
      status
    }
  }
`;
export const adminDeleteSplashScreen = /* GraphQL */ `
  mutation AdminDeleteSplashScreen(
    $merchantId: String
    $splashScreenIdList: [String]
  ) {
    adminDeleteSplashScreen(
      merchantId: $merchantId
      splashScreenIdList: $splashScreenIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeleteStampingCampaign = /* GraphQL */ `
  mutation AdminDeleteStampingCampaign(
    $merchantId: String
    $stampingCampaignIdList: [String]
  ) {
    adminDeleteStampingCampaign(
      merchantId: $merchantId
      stampingCampaignIdList: $stampingCampaignIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeleteStockMovement = /* GraphQL */ `
  mutation AdminDeleteStockMovement(
    $merchantId: String
    $stockMovementIdList: [String]
  ) {
    adminDeleteStockMovement(
      merchantId: $merchantId
      stockMovementIdList: $stockMovementIdList
    ) {
      message
      status
    }
  }
`;
export const adminDeleteStore = /* GraphQL */ `
  mutation AdminDeleteStore($merchantId: String, $storeIds: [String]) {
    adminDeleteStore(merchantId: $merchantId, storeIds: $storeIds) {
      message
      status
    }
  }
`;
export const adminDeleteSupplier = /* GraphQL */ `
  mutation AdminDeleteSupplier($merchantId: String, $supplierId: String) {
    adminDeleteSupplier(merchantId: $merchantId, supplierId: $supplierId) {
      message
      status
    }
  }
`;
export const adminDeleteTags = /* GraphQL */ `
  mutation AdminDeleteTags(
    $merchantId: String
    $taggingList: [String]
    $type: String
  ) {
    adminDeleteTags(
      merchantId: $merchantId
      taggingList: $taggingList
      type: $type
    ) {
      message
      status
    }
  }
`;
export const adminDeleteTruck = /* GraphQL */ `
  mutation AdminDeleteTruck($truckIds: [String]) {
    adminDeleteTruck(truckIds: $truckIds) {
      message
      status
    }
  }
`;
export const adminDeleteUser = /* GraphQL */ `
  mutation AdminDeleteUser($userIdList: [String]) {
    adminDeleteUser(userIdList: $userIdList) {
      message
      status
    }
  }
`;
export const adminDeleteUserGroup = /* GraphQL */ `
  mutation AdminDeleteUserGroup($userGroupIdList: [String]) {
    adminDeleteUserGroup(userGroupIdList: $userGroupIdList) {
      message
      status
    }
  }
`;
export const adminDeleteUserMatrix = /* GraphQL */ `
  mutation AdminDeleteUserMatrix($merchantId: String, $userId: String) {
    adminDeleteUserMatrix(merchantId: $merchantId, userId: $userId) {
      message
      status
    }
  }
`;
export const adminDeleteVoucher = /* GraphQL */ `
  mutation AdminDeleteVoucher($merchantId: String, $voucherIdList: [String]) {
    adminDeleteVoucher(merchantId: $merchantId, voucherIdList: $voucherIdList) {
      message
      status
    }
  }
`;
export const adminForgotPassword = /* GraphQL */ `
  mutation AdminForgotPassword($merchantId: String, $mobileNo: String) {
    adminForgotPassword(merchantId: $merchantId, mobileNo: $mobileNo) {
      message
      status
    }
  }
`;
export const adminGenerateSmartVoucher = /* GraphQL */ `
  mutation AdminGenerateSmartVoucher(
    $campaignDetail: [CampaignDetailInput]
    $comparisonType: String
    $customerType: String
    $estimatedRevenue: Float
    $revenueSplit: Int
    $s3FileKey: String
  ) {
    adminGenerateSmartVoucher(
      campaignDetail: $campaignDetail
      comparisonType: $comparisonType
      customerType: $customerType
      estimatedRevenue: $estimatedRevenue
      revenueSplit: $revenueSplit
      s3FileKey: $s3FileKey
    ) {
      campaignDetail {
        assumptionConversion
        customerList {
          customerId
          firstName
          lastPurchasedDateTime
          mobileNo
        }
        estimateRevenueSplitAmt
        estimateRevenueSplitRatio
        previewCustomer {
          firstName
          frequentPurchasedProduct
          lastName
          lastTransactionDate
          lastTransactionProduct
          lastTransactionStore
        }
        previewMsg
        targetCustomerSpending
        totalTargetCustomer
        voucherDiscount
        voucherMinSpend
      }
      customizedRate
      errorFileKey
      estimatedCost
      message
      personalizedRate
      status
      totalCost
      totalCustomers
      totalExistingCustomers
      totalFilteredCustomers
      totalOptOutCustomers
    }
  }
`;
export const adminGenerateUpdatePaymentLink = /* GraphQL */ `
  mutation AdminGenerateUpdatePaymentLink($subscriptionId: String) {
    adminGenerateUpdatePaymentLink(subscriptionId: $subscriptionId) {
      message
      status
      updateUrl
    }
  }
`;
export const adminModifyChatbotFile = /* GraphQL */ `
  mutation AdminModifyChatbotFile(
    $contentType: String
    $filename: String
    $mode: String
  ) {
    adminModifyChatbotFile(
      contentType: $contentType
      filename: $filename
      mode: $mode
    ) {
      message
      status
    }
  }
`;
export const adminModifyChatbotItems = /* GraphQL */ `
  mutation AdminModifyChatbotItems(
    $contents: ModifyChatbotItemsInput
    $merchantId: String
    $mode: String
    $type: String
  ) {
    adminModifyChatbotItems(
      contents: $contents
      merchantId: $merchantId
      mode: $mode
      type: $type
    ) {
      message
      status
    }
  }
`;
export const adminOtpVerification = /* GraphQL */ `
  mutation AdminOtpVerification(
    $merchantId: String
    $merchantOtp: String
    $mobileNo: String
  ) {
    adminOtpVerification(
      merchantId: $merchantId
      merchantOtp: $merchantOtp
      mobileNo: $mobileNo
    ) {
      message
      status
    }
  }
`;
export const adminProcessFacebookLiveSetup = /* GraphQL */ `
  mutation AdminProcessFacebookLiveSetup(
    $accessToken: String
    $appScopedUserId: String
    $merchantId: String
  ) {
    adminProcessFacebookLiveSetup(
      accessToken: $accessToken
      appScopedUserId: $appScopedUserId
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminPurchaseConversation = /* GraphQL */ `
  mutation AdminPurchaseConversation {
    adminPurchaseConversation {
      message
      status
    }
  }
`;
export const adminRedeemVirtualGoods = /* GraphQL */ `
  mutation AdminRedeemVirtualGoods($code: String, $merchantId: String) {
    adminRedeemVirtualGoods(code: $code, merchantId: $merchantId) {
      message
      status
    }
  }
`;
export const adminRefundOrder = /* GraphQL */ `
  mutation AdminRefundOrder(
    $merchantId: String
    $orderDetailsToBeRefunded: [OrderDetailToBeRefunded]
    $orderId: String
    $paymentType: String
    $reason: String
    $refundType: String
    $restock: Boolean
    $totalRefundAmt: Float
  ) {
    adminRefundOrder(
      merchantId: $merchantId
      orderDetailsToBeRefunded: $orderDetailsToBeRefunded
      orderId: $orderId
      paymentType: $paymentType
      reason: $reason
      refundType: $refundType
      restock: $restock
      totalRefundAmt: $totalRefundAmt
    ) {
      message
      status
    }
  }
`;
export const adminRemoveFilterTab = /* GraphQL */ `
  mutation AdminRemoveFilterTab($filterTabId: String, $merchantId: String) {
    adminRemoveFilterTab(filterTabId: $filterTabId, merchantId: $merchantId) {
      message
      status
    }
  }
`;
export const adminRemoveTagsFromModule = /* GraphQL */ `
  mutation AdminRemoveTagsFromModule(
    $merchantId: String
    $taggingList: [String]
    $type: String
    $typeIdList: [String]
  ) {
    adminRemoveTagsFromModule(
      merchantId: $merchantId
      taggingList: $taggingList
      type: $type
      typeIdList: $typeIdList
    ) {
      message
      status
    }
  }
`;
export const adminReplyCustomerChat = /* GraphQL */ `
  mutation AdminReplyCustomerChat(
    $channel: String
    $customerId: String
    $customerPhoneNumber: String
    $message: String
  ) {
    adminReplyCustomerChat(
      channel: $channel
      customerId: $customerId
      customerPhoneNumber: $customerPhoneNumber
      message: $message
    ) {
      message
      status
    }
  }
`;
export const adminRequestForDelivery = /* GraphQL */ `
  mutation AdminRequestForDelivery(
    $merchantId: String
    $orderList: [OrderInput]
  ) {
    adminRequestForDelivery(merchantId: $merchantId, orderList: $orderList) {
      message
      status
    }
  }
`;
export const adminResetPassword = /* GraphQL */ `
  mutation AdminResetPassword(
    $isForgot: Boolean
    $merchantId: String
    $password: String
    $previousPassword: String
    $token: String
    $username: String
  ) {
    adminResetPassword(
      isForgot: $isForgot
      merchantId: $merchantId
      password: $password
      previousPassword: $previousPassword
      token: $token
      username: $username
    ) {
      message
      status
    }
  }
`;
export const adminSelectAutoContent = /* GraphQL */ `
  mutation AdminSelectAutoContent($autoContentIdList: [String]) {
    adminSelectAutoContent(autoContentIdList: $autoContentIdList) {
      message
      status
    }
  }
`;
export const adminSendEInvoiceAttachment = /* GraphQL */ `
  mutation AdminSendEInvoiceAttachment($eInvoiceId: String) {
    adminSendEInvoiceAttachment(eInvoiceId: $eInvoiceId) {
      message
      status
    }
  }
`;
export const adminSendExtractedDocument = /* GraphQL */ `
  mutation AdminSendExtractedDocument(
    $email: [String]
    $extractedDocumentId: [String]
  ) {
    adminSendExtractedDocument(
      email: $email
      extractedDocumentId: $extractedDocumentId
    ) {
      message
      status
    }
  }
`;
export const adminSendFacebookLiveComment = /* GraphQL */ `
  mutation AdminSendFacebookLiveComment(
    $facebookLiveCampaignId: String
    $hotkey: String
    $merchantId: String
    $productName: String
    $storeId: String
  ) {
    adminSendFacebookLiveComment(
      facebookLiveCampaignId: $facebookLiveCampaignId
      hotkey: $hotkey
      merchantId: $merchantId
      productName: $productName
      storeId: $storeId
    ) {
      message
      status
    }
  }
`;
export const adminSendOrderReminderToSQS = /* GraphQL */ `
  mutation AdminSendOrderReminderToSQS(
    $merchantId: String
    $orderIdList: [String]
  ) {
    adminSendOrderReminderToSQS(
      merchantId: $merchantId
      orderIdList: $orderIdList
    ) {
      message
      status
    }
  }
`;
export const adminSendPendingCheckoutReminderToSQS = /* GraphQL */ `
  mutation AdminSendPendingCheckoutReminderToSQS(
    $customerIdList: [String]
    $emailBody: String
    $emailSubject: String
    $merchantId: String
  ) {
    adminSendPendingCheckoutReminderToSQS(
      customerIdList: $customerIdList
      emailBody: $emailBody
      emailSubject: $emailSubject
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminSendPendingPaymentReminderToSQS = /* GraphQL */ `
  mutation AdminSendPendingPaymentReminderToSQS(
    $merchantId: String
    $orderIdList: [String]
  ) {
    adminSendPendingPaymentReminderToSQS(
      merchantId: $merchantId
      orderIdList: $orderIdList
    ) {
      message
      status
    }
  }
`;
export const adminSendPromoCodeToSQS = /* GraphQL */ `
  mutation AdminSendPromoCodeToSQS(
    $customerIdList: [String]
    $emailBody: String
    $emailSubject: String
    $merchantId: String
    $promoCode: String
    $sendToAllCustomer: Boolean
  ) {
    adminSendPromoCodeToSQS(
      customerIdList: $customerIdList
      emailBody: $emailBody
      emailSubject: $emailSubject
      merchantId: $merchantId
      promoCode: $promoCode
      sendToAllCustomer: $sendToAllCustomer
    ) {
      message
      status
    }
  }
`;
export const adminShipOrderLazada = /* GraphQL */ `
  mutation AdminShipOrderLazada(
    $merchantId: String
    $orderNumber: String
    $storeCode: String
  ) {
    adminShipOrderLazada(
      merchantId: $merchantId
      orderNumber: $orderNumber
      storeCode: $storeCode
    ) {
      message
      status
    }
  }
`;
export const adminShipOrderShopee = /* GraphQL */ `
  mutation AdminShipOrderShopee(
    $merchantId: String
    $orderNumber: String
    $storeCode: String
  ) {
    adminShipOrderShopee(
      merchantId: $merchantId
      orderNumber: $orderNumber
      storeCode: $storeCode
    ) {
      message
      status
    }
  }
`;
export const adminSyncDataFromMarketPlace = /* GraphQL */ `
  mutation AdminSyncDataFromMarketPlace(
    $merchantId: String
    $salesChannelId: String
    $salesChannelName: String
  ) {
    adminSyncDataFromMarketPlace(
      merchantId: $merchantId
      salesChannelId: $salesChannelId
      salesChannelName: $salesChannelName
    ) {
      message
      status
    }
  }
`;
export const adminSyncEInvoiceReceipt = /* GraphQL */ `
  mutation AdminSyncEInvoiceReceipt($eInvoiceId: String) {
    adminSyncEInvoiceReceipt(eInvoiceId: $eInvoiceId) {
      message
      status
    }
  }
`;
export const adminSyncOrderFromMarketPlace = /* GraphQL */ `
  mutation AdminSyncOrderFromMarketPlace(
    $merchantId: String
    $salesChannelId: String
    $salesChannelName: String
    $storeCode: String
    $storeId: String
  ) {
    adminSyncOrderFromMarketPlace(
      merchantId: $merchantId
      salesChannelId: $salesChannelId
      salesChannelName: $salesChannelName
      storeCode: $storeCode
      storeId: $storeId
    ) {
      message
      status
    }
  }
`;
export const adminTestLazadaAuth = /* GraphQL */ `
  mutation AdminTestLazadaAuth($merchantId: String) {
    adminTestLazadaAuth(merchantId: $merchantId) {
      authUrl
      marketPlaceSettingId
      message
      status
    }
  }
`;
export const adminTestShopeeAuth = /* GraphQL */ `
  mutation AdminTestShopeeAuth($merchantId: String) {
    adminTestShopeeAuth(merchantId: $merchantId) {
      authUrl
      marketPlaceSettingId
      message
      status
    }
  }
`;
export const adminTopUpShippingCredits = /* GraphQL */ `
  mutation AdminTopUpShippingCredits($merchantId: String, $topUpAmount: Float) {
    adminTopUpShippingCredits(
      merchantId: $merchantId
      topUpAmount: $topUpAmount
    ) {
      gatewayPaymentParams
      gatewayPaymentUrl
      merchantOrderId
      message
      orderNumber
      status
    }
  }
`;
export const adminTriggerDeleteDocumentLookup = /* GraphQL */ `
  mutation AdminTriggerDeleteDocumentLookup(
    $extractedDocumentLookupId: String
  ) {
    adminTriggerDeleteDocumentLookup(
      extractedDocumentLookupId: $extractedDocumentLookupId
    ) {
      message
      status
    }
  }
`;
export const adminTriggerExportCSV = /* GraphQL */ `
  mutation AdminTriggerExportCSV(
    $filter: TriggerExportCsvFilter
    $itemIdList: [String]
    $merchantId: String
    $module: String
    $sort: ElasticSearchSortDirection
  ) {
    adminTriggerExportCSV(
      filter: $filter
      itemIdList: $itemIdList
      merchantId: $merchantId
      module: $module
      sort: $sort
    ) {
      downloadJobId
      message
      status
    }
  }
`;
export const adminTriggerLHDNAdjustment = /* GraphQL */ `
  mutation AdminTriggerLHDNAdjustment(
    $adjustmentList: [LHDNAdjustmentInput]
    $adjustmentType: String
    $adminReason: String
    $currencyCode: String
    $eInvoiceId: String
  ) {
    adminTriggerLHDNAdjustment(
      adjustmentList: $adjustmentList
      adjustmentType: $adjustmentType
      adminReason: $adminReason
      currencyCode: $currencyCode
      eInvoiceId: $eInvoiceId
    ) {
      adjustmentId
      message
      status
    }
  }
`;
export const adminUpdateBulkOrderFulfillment = /* GraphQL */ `
  mutation AdminUpdateBulkOrderFulfillment(
    $merchantId: String
    $orderIdListToBeUpdated: [String]
  ) {
    adminUpdateBulkOrderFulfillment(
      merchantId: $merchantId
      orderIdListToBeUpdated: $orderIdListToBeUpdated
    ) {
      message
      status
    }
  }
`;
export const adminUpdateChatbotSetting = /* GraphQL */ `
  mutation AdminUpdateChatbotSetting(
    $samplePrompts: [String]
    $webchatColorCode: String
  ) {
    adminUpdateChatbotSetting(
      samplePrompts: $samplePrompts
      webchatColorCode: $webchatColorCode
    ) {
      message
      status
    }
  }
`;
export const adminUpdateContactUsInfo = /* GraphQL */ `
  mutation AdminUpdateContactUsInfo(
    $contactUsContent: String
    $contactUsFormEnabled: Boolean
    $merchantId: String
    $storeList: [ContactUsStoreInput]
  ) {
    adminUpdateContactUsInfo(
      contactUsContent: $contactUsContent
      contactUsFormEnabled: $contactUsFormEnabled
      merchantId: $merchantId
      storeList: $storeList
    ) {
      message
      status
    }
  }
`;
export const adminUpdateCustomerAutoReply = /* GraphQL */ `
  mutation AdminUpdateCustomerAutoReply(
    $channel: String
    $chatId: String
    $disableAutoReply: Boolean
  ) {
    adminUpdateCustomerAutoReply(
      channel: $channel
      chatId: $chatId
      disableAutoReply: $disableAutoReply
    ) {
      message
      status
    }
  }
`;
export const adminUpdateDisplayRecordSequence = /* GraphQL */ `
  mutation AdminUpdateDisplayRecordSequence(
    $merchantId: String
    $noOfFooters: Int
    $noOfHeaders: Int
    $records: [RecordInput]
    $type: String
  ) {
    adminUpdateDisplayRecordSequence(
      merchantId: $merchantId
      noOfFooters: $noOfFooters
      noOfHeaders: $noOfHeaders
      records: $records
      type: $type
    ) {
      message
      status
    }
  }
`;
export const adminUpdateEInvoiceQuickbookCustomer = /* GraphQL */ `
  mutation AdminUpdateEInvoiceQuickbookCustomer(
    $eInvoiceQuickBookCustomersId: String
    $idNumber: String
    $idType: String
    $sstRegistrationNumber: String
    $tinNumber: String
  ) {
    adminUpdateEInvoiceQuickbookCustomer(
      eInvoiceQuickBookCustomersId: $eInvoiceQuickBookCustomersId
      idNumber: $idNumber
      idType: $idType
      sstRegistrationNumber: $sstRegistrationNumber
      tinNumber: $tinNumber
    ) {
      message
      status
    }
  }
`;
export const adminUpdateEInvoiceQuickbookItem = /* GraphQL */ `
  mutation AdminUpdateEInvoiceQuickbookItem(
    $classificationCode: String
    $classificationName: String
    $eInvoiceQuickBookItemsId: String
  ) {
    adminUpdateEInvoiceQuickbookItem(
      classificationCode: $classificationCode
      classificationName: $classificationName
      eInvoiceQuickBookItemsId: $eInvoiceQuickBookItemsId
    ) {
      message
      status
    }
  }
`;
export const adminUpdateExtractedDocument = /* GraphQL */ `
  mutation AdminUpdateExtractedDocument(
    $approvedStatus: Boolean
    $conversionStatus: Boolean
    $data: ExtractedDocumentDataInput
    $documentDate: String
    $documentNo: String
    $documentType: String
    $extractedDocumentId: String
    $isDuplicate: Boolean
    $merchantId: String
    $remark: String
  ) {
    adminUpdateExtractedDocument(
      approvedStatus: $approvedStatus
      conversionStatus: $conversionStatus
      data: $data
      documentDate: $documentDate
      documentNo: $documentNo
      documentType: $documentType
      extractedDocumentId: $extractedDocumentId
      isDuplicate: $isDuplicate
      merchantId: $merchantId
      remark: $remark
    ) {
      message
      status
    }
  }
`;
export const adminUpdateFacebookLiveCampaign = /* GraphQL */ `
  mutation AdminUpdateFacebookLiveCampaign(
    $facebookLiveCampaignDetails: [FacebookLiveCampaignDetailInput]
    $facebookLiveCampaignId: String
    $merchantId: String
    $salesChannelName: String
    $scheduleEndDateTime: String
    $scheduleStartDateTime: String
    $status: String
    $storeId: String
    $storeName: String
    $title: String
  ) {
    adminUpdateFacebookLiveCampaign(
      facebookLiveCampaignDetails: $facebookLiveCampaignDetails
      facebookLiveCampaignId: $facebookLiveCampaignId
      merchantId: $merchantId
      salesChannelName: $salesChannelName
      scheduleEndDateTime: $scheduleEndDateTime
      scheduleStartDateTime: $scheduleStartDateTime
      status: $status
      storeId: $storeId
      storeName: $storeName
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminUpdateFacebookLiveMessageTemplate = /* GraphQL */ `
  mutation AdminUpdateFacebookLiveMessageTemplate(
    $merchantId: String
    $message: FacebookLiveMessageInput
    $messageType: String
  ) {
    adminUpdateFacebookLiveMessageTemplate(
      merchantId: $merchantId
      message: $message
      messageType: $messageType
    ) {
      message
      status
    }
  }
`;
export const adminUpdateFaq = /* GraphQL */ `
  mutation AdminUpdateFaq(
    $answer: String
    $faqCategory: String
    $faqId: String
    $merchantId: String
    $parentId: String
    $question: String
    $sequence: Int
  ) {
    adminUpdateFaq(
      answer: $answer
      faqCategory: $faqCategory
      faqId: $faqId
      merchantId: $merchantId
      parentId: $parentId
      question: $question
      sequence: $sequence
    ) {
      message
      status
    }
  }
`;
export const adminUpdateFaqCategory = /* GraphQL */ `
  mutation AdminUpdateFaqCategory(
    $faqCategoryId: String
    $merchantId: String
    $sequence: Int
    $title: String
  ) {
    adminUpdateFaqCategory(
      faqCategoryId: $faqCategoryId
      merchantId: $merchantId
      sequence: $sequence
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminUpdateGalleryDetail = /* GraphQL */ `
  mutation AdminUpdateGalleryDetail(
    $galleryDetailId: String
    $merchantId: String
    $name: String
  ) {
    adminUpdateGalleryDetail(
      galleryDetailId: $galleryDetailId
      merchantId: $merchantId
      name: $name
    ) {
      message
      status
    }
  }
`;
export const adminUpdateHomeCollection = /* GraphQL */ `
  mutation AdminUpdateHomeCollection(
    $collectionIcon: String
    $collectionId: String
    $collectionImage: String
    $collectionSeoUrl: String
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $homeCollectionId: String
    $homeCollectionType: String
    $isDisabled: Boolean
    $merchantId: String
    $sequence: Int
    $title: String
  ) {
    adminUpdateHomeCollection(
      collectionIcon: $collectionIcon
      collectionId: $collectionId
      collectionImage: $collectionImage
      collectionSeoUrl: $collectionSeoUrl
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      homeCollectionId: $homeCollectionId
      homeCollectionType: $homeCollectionType
      isDisabled: $isDisabled
      merchantId: $merchantId
      sequence: $sequence
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminUpdateInStoreOrder = /* GraphQL */ `
  mutation AdminUpdateInStoreOrder(
    $duplicateInStoreOrderList: [InStoreOrderInput]
    $mainRecord: InStoreOrderMainRecordInput
  ) {
    adminUpdateInStoreOrder(
      duplicateInStoreOrderList: $duplicateInStoreOrderList
      mainRecord: $mainRecord
    ) {
      message
      status
    }
  }
`;
export const adminUpdateItemDuringFacebookLive = /* GraphQL */ `
  mutation AdminUpdateItemDuringFacebookLive(
    $deliveryPrice: Float
    $facebookLiveCampaignDetailId: String
    $facebookLiveCampaignId: String
    $hotkey: String
    $itemId: String
    $itemProperty: String
    $merchantId: String
    $productId: String
    $productName: String
    $quantity: Int
  ) {
    adminUpdateItemDuringFacebookLive(
      deliveryPrice: $deliveryPrice
      facebookLiveCampaignDetailId: $facebookLiveCampaignDetailId
      facebookLiveCampaignId: $facebookLiveCampaignId
      hotkey: $hotkey
      itemId: $itemId
      itemProperty: $itemProperty
      merchantId: $merchantId
      productId: $productId
      productName: $productName
      quantity: $quantity
    ) {
      message
      status
    }
  }
`;
export const adminUpdateLandingPageBanner = /* GraphQL */ `
  mutation AdminUpdateLandingPageBanner(
    $buttonActionValue: String
    $detailPageImage: String
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $homeImage: String
    $isDisabled: Boolean
    $landingPageBannerId: String
    $merchantId: String
    $sequence: Int
    $title: String
  ) {
    adminUpdateLandingPageBanner(
      buttonActionValue: $buttonActionValue
      detailPageImage: $detailPageImage
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      homeImage: $homeImage
      isDisabled: $isDisabled
      landingPageBannerId: $landingPageBannerId
      merchantId: $merchantId
      sequence: $sequence
      title: $title
    ) {
      message
      onBoardRole
      status
    }
  }
`;
export const adminUpdateLegalPolicy = /* GraphQL */ `
  mutation AdminUpdateLegalPolicy(
    $legalPolicies: [LegalPolicyInput]
    $merchantId: String
  ) {
    adminUpdateLegalPolicy(
      legalPolicies: $legalPolicies
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminUpdateManualPaymentOption = /* GraphQL */ `
  mutation AdminUpdateManualPaymentOption(
    $TNGPaymentLink: String
    $isBankTransfer: Boolean
    $isDisabled: Boolean
    $manualPaymentMethodName: String
    $manualPaymentOptionsId: String
    $merchantId: String
    $paymentInstructions: String
    $qrCode: String
  ) {
    adminUpdateManualPaymentOption(
      TNGPaymentLink: $TNGPaymentLink
      isBankTransfer: $isBankTransfer
      isDisabled: $isDisabled
      manualPaymentMethodName: $manualPaymentMethodName
      manualPaymentOptionsId: $manualPaymentOptionsId
      merchantId: $merchantId
      paymentInstructions: $paymentInstructions
      qrCode: $qrCode
    ) {
      message
      onBoardRole
      status
    }
  }
`;
export const adminUpdateManualPaymentOrderStatus = /* GraphQL */ `
  mutation AdminUpdateManualPaymentOrderStatus(
    $manualPaymentMethodName: String
    $merchantId: String
    $newOrderStatus: String
    $orderId: String
  ) {
    adminUpdateManualPaymentOrderStatus(
      manualPaymentMethodName: $manualPaymentMethodName
      merchantId: $merchantId
      newOrderStatus: $newOrderStatus
      orderId: $orderId
    ) {
      message
      status
    }
  }
`;
export const adminUpdateMembershipSetting = /* GraphQL */ `
  mutation AdminUpdateMembershipSetting(
    $membershipPointExpiryType: String
    $membershipPointExpiryValue: Int
    $multiplier: Int
    $pointConversionId: String
    $spent: Int
  ) {
    adminUpdateMembershipSetting(
      membershipPointExpiryType: $membershipPointExpiryType
      membershipPointExpiryValue: $membershipPointExpiryValue
      multiplier: $multiplier
      pointConversionId: $pointConversionId
      spent: $spent
    ) {
      message
      status
    }
  }
`;
export const adminUpdateMembershipTier = /* GraphQL */ `
  mutation AdminUpdateMembershipTier(
    $membershipTierId: String
    $merchantId: String
    $point: Float
    $title: String
  ) {
    adminUpdateMembershipTier(
      membershipTierId: $membershipTierId
      merchantId: $merchantId
      point: $point
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminUpdateMerchantAboutUs = /* GraphQL */ `
  mutation AdminUpdateMerchantAboutUs(
    $aboutUsBanner: String
    $aboutUsDescription: String
    $merchantId: String
  ) {
    adminUpdateMerchantAboutUs(
      aboutUsBanner: $aboutUsBanner
      aboutUsDescription: $aboutUsDescription
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminUpdateMerchantBusinessInfo = /* GraphQL */ `
  mutation AdminUpdateMerchantBusinessInfo(
    $companyAddress: String
    $companyEmail: String
    $companyName: String
  ) {
    adminUpdateMerchantBusinessInfo(
      companyAddress: $companyAddress
      companyEmail: $companyEmail
      companyName: $companyName
    ) {
      message
      status
    }
  }
`;
export const adminUpdateMerchantEInvoiceInfo = /* GraphQL */ `
  mutation AdminUpdateMerchantEInvoiceInfo(
    $clientId: String
    $clientSecret1: String
    $clientSecret2: String
    $companyAddressLine: [String]
    $companyCityName: String
    $companyName: String
    $companyPostalCode: String
    $companyStateName: String
    $companyTin: String
    $companyTourismTaxRegistrationNumber: String
    $countryCode: String
    $descriptionSellerActivity: String
    $digicertKey: String
    $digicertPin: String
    $email: String
    $environment: String
    $idNumber: String
    $idType: String
    $industryClassificationCode: String
    $logo: String
    $notificationEmail: String
    $phoneNumber: String
    $qbClientId: String
    $qbClientSecret: String
    $sstRegistrationNumber: String
  ) {
    adminUpdateMerchantEInvoiceInfo(
      clientId: $clientId
      clientSecret1: $clientSecret1
      clientSecret2: $clientSecret2
      companyAddressLine: $companyAddressLine
      companyCityName: $companyCityName
      companyName: $companyName
      companyPostalCode: $companyPostalCode
      companyStateName: $companyStateName
      companyTin: $companyTin
      companyTourismTaxRegistrationNumber: $companyTourismTaxRegistrationNumber
      countryCode: $countryCode
      descriptionSellerActivity: $descriptionSellerActivity
      digicertKey: $digicertKey
      digicertPin: $digicertPin
      email: $email
      environment: $environment
      idNumber: $idNumber
      idType: $idType
      industryClassificationCode: $industryClassificationCode
      logo: $logo
      notificationEmail: $notificationEmail
      phoneNumber: $phoneNumber
      qbClientId: $qbClientId
      qbClientSecret: $qbClientSecret
      sstRegistrationNumber: $sstRegistrationNumber
    ) {
      message
      status
      url
    }
  }
`;
export const adminUpdateMerchantGeneralConfig = /* GraphQL */ `
  mutation AdminUpdateMerchantGeneralConfig(
    $address: String
    $currency: String
    $footerDescription: String
    $kycBusinessAddress: String
    $kycNRIC: String
    $kycNRICName: String
    $latitude: String
    $longitude: String
    $merchantId: String
    $merchantRegistrationNumber: String
    $name: String
    $notificationEmail: String
    $orderOption: [String]
    $ownerEmail: String
    $ownerPhone: String
    $senderEmail: String
    $storeAddress: String
    $tax: Float
    $warungDeliveryStoreInfo: String
    $warungStoreStatus: String
    $whatsappNo: String
  ) {
    adminUpdateMerchantGeneralConfig(
      address: $address
      currency: $currency
      footerDescription: $footerDescription
      kycBusinessAddress: $kycBusinessAddress
      kycNRIC: $kycNRIC
      kycNRICName: $kycNRICName
      latitude: $latitude
      longitude: $longitude
      merchantId: $merchantId
      merchantRegistrationNumber: $merchantRegistrationNumber
      name: $name
      notificationEmail: $notificationEmail
      orderOption: $orderOption
      ownerEmail: $ownerEmail
      ownerPhone: $ownerPhone
      senderEmail: $senderEmail
      storeAddress: $storeAddress
      tax: $tax
      warungDeliveryStoreInfo: $warungDeliveryStoreInfo
      warungStoreStatus: $warungStoreStatus
      whatsappNo: $whatsappNo
    ) {
      message
      onBoardRole
      status
    }
  }
`;
export const adminUpdateMerchantGeneralConfigAndSiteAnalytics = /* GraphQL */ `
  mutation AdminUpdateMerchantGeneralConfigAndSiteAnalytics(
    $effectiveEndDate: String
    $effectiveStartDate: String
    $facebookPixelId: String
    $favicon: String
    $googleAnalyticsId: String
    $logo: String
    $merchantId: String
    $notificationMessage: String
    $seoDescription: String
    $seoTitle: String
  ) {
    adminUpdateMerchantGeneralConfigAndSiteAnalytics(
      effectiveEndDate: $effectiveEndDate
      effectiveStartDate: $effectiveStartDate
      facebookPixelId: $facebookPixelId
      favicon: $favicon
      googleAnalyticsId: $googleAnalyticsId
      logo: $logo
      merchantId: $merchantId
      notificationMessage: $notificationMessage
      seoDescription: $seoDescription
      seoTitle: $seoTitle
    ) {
      message
      status
    }
  }
`;
export const adminUpdateMerchantMembershipTierStatus = /* GraphQL */ `
  mutation AdminUpdateMerchantMembershipTierStatus(
    $membershipTierActivated: Boolean
    $merchantId: String
  ) {
    adminUpdateMerchantMembershipTierStatus(
      membershipTierActivated: $membershipTierActivated
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const adminUpdateMerchantPaymentConfig = /* GraphQL */ `
  mutation AdminUpdateMerchantPaymentConfig(
    $manualPayment: ManualPaymentOption
    $merchantId: String
    $paymentGateway: PaymentGateway
  ) {
    adminUpdateMerchantPaymentConfig(
      manualPayment: $manualPayment
      merchantId: $merchantId
      paymentGateway: $paymentGateway
    ) {
      message
      status
    }
  }
`;
export const adminUpdateMerchantSiteFontAndColor = /* GraphQL */ `
  mutation AdminUpdateMerchantSiteFontAndColor(
    $copyright: String
    $facebookName: String
    $facebookUrl: String
    $googlePlayUrl: String
    $instagramName: String
    $instagramUrl: String
    $linkedInName: String
    $linkedInUrl: String
    $logo: String
    $merchantId: String
    $playStoreUrl: String
    $siteColor: String
    $siteFont: String
    $tiktokName: String
    $tiktokUrl: String
    $twitterName: String
    $twitterUrl: String
    $youtubeName: String
    $youtubeUrl: String
  ) {
    adminUpdateMerchantSiteFontAndColor(
      copyright: $copyright
      facebookName: $facebookName
      facebookUrl: $facebookUrl
      googlePlayUrl: $googlePlayUrl
      instagramName: $instagramName
      instagramUrl: $instagramUrl
      linkedInName: $linkedInName
      linkedInUrl: $linkedInUrl
      logo: $logo
      merchantId: $merchantId
      playStoreUrl: $playStoreUrl
      siteColor: $siteColor
      siteFont: $siteFont
      tiktokName: $tiktokName
      tiktokUrl: $tiktokUrl
      twitterName: $twitterName
      twitterUrl: $twitterUrl
      youtubeName: $youtubeName
      youtubeUrl: $youtubeUrl
    ) {
      message
      status
    }
  }
`;
export const adminUpdateNotificationSetting = /* GraphQL */ `
  mutation AdminUpdateNotificationSetting(
    $emailBody: String
    $emailSubject: String
    $merchantId: String
    $notificationSettingId: String
  ) {
    adminUpdateNotificationSetting(
      emailBody: $emailBody
      emailSubject: $emailSubject
      merchantId: $merchantId
      notificationSettingId: $notificationSettingId
    ) {
      message
      status
    }
  }
`;
export const adminUpdateNotificationSettingStatus = /* GraphQL */ `
  mutation AdminUpdateNotificationSettingStatus(
    $merchantId: String
    $status: String
    $type: String
  ) {
    adminUpdateNotificationSettingStatus(
      merchantId: $merchantId
      status: $status
      type: $type
    ) {
      message
      status
    }
  }
`;
export const adminUpdateOrder = /* GraphQL */ `
  mutation AdminUpdateOrder(
    $cancelledBy: String
    $cancelledReason: String
    $fulfillmentStatus: String
    $merchantId: String
    $orderId: String
    $paymentStatus: String
    $sellerNote: String
    $taggings: [String]
  ) {
    adminUpdateOrder(
      cancelledBy: $cancelledBy
      cancelledReason: $cancelledReason
      fulfillmentStatus: $fulfillmentStatus
      merchantId: $merchantId
      orderId: $orderId
      paymentStatus: $paymentStatus
      sellerNote: $sellerNote
      taggings: $taggings
    ) {
      message
      status
    }
  }
`;
export const adminUpdateOrderFulfillment = /* GraphQL */ `
  mutation AdminUpdateOrderFulfillment(
    $merchantId: String
    $orderDetailsToBeFulfilled: [OrderDetailToBeFulfilled]
    $orderId: String
    $salesChannelName: String
  ) {
    adminUpdateOrderFulfillment(
      merchantId: $merchantId
      orderDetailsToBeFulfilled: $orderDetailsToBeFulfilled
      orderId: $orderId
      salesChannelName: $salesChannelName
    ) {
      message
      status
    }
  }
`;
export const adminUpdateOrderStatus = /* GraphQL */ `
  mutation AdminUpdateOrderStatus(
    $merchantId: String
    $ordersToBeUpdated: [OrderToBeUpdated]
  ) {
    adminUpdateOrderStatus(
      merchantId: $merchantId
      ordersToBeUpdated: $ordersToBeUpdated
    ) {
      message
      status
    }
  }
`;
export const adminUpdatePointConversion = /* GraphQL */ `
  mutation AdminUpdatePointConversion(
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $itemId: String
    $itemProperty: String
    $merchantId: String
    $multiplier: Float
    $pointConversionId: String
    $productId: String
    $spent: Float
  ) {
    adminUpdatePointConversion(
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      itemId: $itemId
      itemProperty: $itemProperty
      merchantId: $merchantId
      multiplier: $multiplier
      pointConversionId: $pointConversionId
      productId: $productId
      spent: $spent
    ) {
      message
      status
    }
  }
`;
export const adminUpdatePriceGroup = /* GraphQL */ `
  mutation AdminUpdatePriceGroup(
    $delivery: Float
    $incrementType: String
    $name: String
    $pickUp: Float
    $priceGroupId: String
    $storeIds: [String]
  ) {
    adminUpdatePriceGroup(
      delivery: $delivery
      incrementType: $incrementType
      name: $name
      pickUp: $pickUp
      priceGroupId: $priceGroupId
      storeIds: $storeIds
    ) {
      message
      status
    }
  }
`;
export const adminUpdateProduct = /* GraphQL */ `
  mutation AdminUpdateProduct(
    $code: String
    $collectionNames: [String]
    $cover: String
    $deliveryCompareAtPrice: Float
    $deliveryCostPerItem: Float
    $deliveryPrice: Float
    $deliveryPriceWithTax: Float
    $description: String
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $hasVariant: Boolean
    $image: [String]
    $isDisabled: Boolean
    $isPreOrder: Boolean
    $isVirtualGoods: Boolean
    $merchantId: String
    $modifierProduct: Boolean
    $noOfPurchases: Int
    $noOfViews: Int
    $pickupCompareAtPrice: Float
    $pickupCostPerItem: Float
    $pickupPrice: Float
    $pickupPriceWithTax: Float
    $platform: String
    $productId: String
    $productUOMs: [ProductUOMInput]
    $promotionEndDateTime: String
    $promotionStartDateTime: String
    $sellOnFacebookStore: Boolean
    $sellOnFoodPanda: Boolean
    $sellOnGrabFood: Boolean
    $sellOnGrabMart: Boolean
    $sellOnInstagram: Boolean
    $sellOnLazada: Boolean
    $sellOnOfflineStore: Boolean
    $sellOnOnlineStore: Boolean
    $sellOnPandaMart: Boolean
    $sellOnShopee: Boolean
    $seoDescription: String
    $seoTitle: String
    $seoUrl: String
    $taggingNames: [String]
    $timeslotType: String
    $timeslots: [TimeslotInput]
    $title: String
    $variantName1: String
    $variantName2: String
    $variantName3: String
    $variantValues1: [String]
    $variantValues2: [String]
    $variantValues3: [String]
    $video: String
    $virtualGoodsExpiredAt: String
    $virtualGoodsExpiryDays: String
  ) {
    adminUpdateProduct(
      code: $code
      collectionNames: $collectionNames
      cover: $cover
      deliveryCompareAtPrice: $deliveryCompareAtPrice
      deliveryCostPerItem: $deliveryCostPerItem
      deliveryPrice: $deliveryPrice
      deliveryPriceWithTax: $deliveryPriceWithTax
      description: $description
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      hasVariant: $hasVariant
      image: $image
      isDisabled: $isDisabled
      isPreOrder: $isPreOrder
      isVirtualGoods: $isVirtualGoods
      merchantId: $merchantId
      modifierProduct: $modifierProduct
      noOfPurchases: $noOfPurchases
      noOfViews: $noOfViews
      pickupCompareAtPrice: $pickupCompareAtPrice
      pickupCostPerItem: $pickupCostPerItem
      pickupPrice: $pickupPrice
      pickupPriceWithTax: $pickupPriceWithTax
      platform: $platform
      productId: $productId
      productUOMs: $productUOMs
      promotionEndDateTime: $promotionEndDateTime
      promotionStartDateTime: $promotionStartDateTime
      sellOnFacebookStore: $sellOnFacebookStore
      sellOnFoodPanda: $sellOnFoodPanda
      sellOnGrabFood: $sellOnGrabFood
      sellOnGrabMart: $sellOnGrabMart
      sellOnInstagram: $sellOnInstagram
      sellOnLazada: $sellOnLazada
      sellOnOfflineStore: $sellOnOfflineStore
      sellOnOnlineStore: $sellOnOnlineStore
      sellOnPandaMart: $sellOnPandaMart
      sellOnShopee: $sellOnShopee
      seoDescription: $seoDescription
      seoTitle: $seoTitle
      seoUrl: $seoUrl
      taggingNames: $taggingNames
      timeslotType: $timeslotType
      timeslots: $timeslots
      title: $title
      variantName1: $variantName1
      variantName2: $variantName2
      variantName3: $variantName3
      variantValues1: $variantValues1
      variantValues2: $variantValues2
      variantValues3: $variantValues3
      video: $video
      virtualGoodsExpiredAt: $virtualGoodsExpiredAt
      virtualGoodsExpiryDays: $virtualGoodsExpiryDays
    ) {
      message
      status
    }
  }
`;
export const adminUpdateProductBundle = /* GraphQL */ `
  mutation AdminUpdateProductBundle(
    $barcode: String
    $collectionNames: [String]
    $cover: String
    $deliveryCompareAtPrice: Float
    $deliveryCostPerItem: Float
    $deliveryPrice: Float
    $deliveryPriceWithTax: Float
    $description: String
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $image: [String]
    $isDisabled: Boolean
    $isProductBundleTaxable: Boolean
    $merchantId: String
    $pickupCompareAtPrice: Float
    $pickupCostPerItem: Float
    $pickupPrice: Float
    $pickupPriceWithTax: Float
    $productBundleDetail: [ProductBundleDetailInput]
    $productBundleId: String
    $productBundlePricing: [ProductBundlePricingInput]
    $promotionEndDateTime: String
    $promotionStartDateTime: String
    $quantityForSales: Int
    $sellOnFacebookStore: Boolean
    $sellOnFoodPanda: Boolean
    $sellOnGrabFood: Boolean
    $sellOnGrabMart: Boolean
    $sellOnInstagram: Boolean
    $sellOnLazada: Boolean
    $sellOnOfflineStore: Boolean
    $sellOnOnlineStore: Boolean
    $sellOnPandaMart: Boolean
    $sellOnShopee: Boolean
    $seoDescription: String
    $seoTitle: String
    $seoUrl: String
    $shippingDimensionHeight: Float
    $shippingDimensionLength: Float
    $shippingDimensionWidth: Float
    $shippingWeight: Float
    $shippingWeightUnit: String
    $sku: String
    $taggingNames: [String]
    $title: String
    $totalStockQuantity: Int
    $video: String
  ) {
    adminUpdateProductBundle(
      barcode: $barcode
      collectionNames: $collectionNames
      cover: $cover
      deliveryCompareAtPrice: $deliveryCompareAtPrice
      deliveryCostPerItem: $deliveryCostPerItem
      deliveryPrice: $deliveryPrice
      deliveryPriceWithTax: $deliveryPriceWithTax
      description: $description
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      image: $image
      isDisabled: $isDisabled
      isProductBundleTaxable: $isProductBundleTaxable
      merchantId: $merchantId
      pickupCompareAtPrice: $pickupCompareAtPrice
      pickupCostPerItem: $pickupCostPerItem
      pickupPrice: $pickupPrice
      pickupPriceWithTax: $pickupPriceWithTax
      productBundleDetail: $productBundleDetail
      productBundleId: $productBundleId
      productBundlePricing: $productBundlePricing
      promotionEndDateTime: $promotionEndDateTime
      promotionStartDateTime: $promotionStartDateTime
      quantityForSales: $quantityForSales
      sellOnFacebookStore: $sellOnFacebookStore
      sellOnFoodPanda: $sellOnFoodPanda
      sellOnGrabFood: $sellOnGrabFood
      sellOnGrabMart: $sellOnGrabMart
      sellOnInstagram: $sellOnInstagram
      sellOnLazada: $sellOnLazada
      sellOnOfflineStore: $sellOnOfflineStore
      sellOnOnlineStore: $sellOnOnlineStore
      sellOnPandaMart: $sellOnPandaMart
      sellOnShopee: $sellOnShopee
      seoDescription: $seoDescription
      seoTitle: $seoTitle
      seoUrl: $seoUrl
      shippingDimensionHeight: $shippingDimensionHeight
      shippingDimensionLength: $shippingDimensionLength
      shippingDimensionWidth: $shippingDimensionWidth
      shippingWeight: $shippingWeight
      shippingWeightUnit: $shippingWeightUnit
      sku: $sku
      taggingNames: $taggingNames
      title: $title
      totalStockQuantity: $totalStockQuantity
      video: $video
    ) {
      message
      status
    }
  }
`;
export const adminUpdateProductCollection = /* GraphQL */ `
  mutation AdminUpdateProductCollection(
    $banner: String
    $collectionProducts: [ItemToBeUpdated]
    $condition: String
    $conditionType: String
    $description: String
    $icon: String
    $merchantId: String
    $name: String
    $productCollectionId: String
    $seoDescription: String
    $seoTitle: String
    $seoUrl: String
    $taggingNames: [String]
    $type: String
  ) {
    adminUpdateProductCollection(
      banner: $banner
      collectionProducts: $collectionProducts
      condition: $condition
      conditionType: $conditionType
      description: $description
      icon: $icon
      merchantId: $merchantId
      name: $name
      productCollectionId: $productCollectionId
      seoDescription: $seoDescription
      seoTitle: $seoTitle
      seoUrl: $seoUrl
      taggingNames: $taggingNames
      type: $type
    ) {
      message
      status
    }
  }
`;
export const adminUpdateProductInventory = /* GraphQL */ `
  mutation AdminUpdateProductInventory(
    $merchantId: String
    $productUOMs: [ProductUOMInput]
  ) {
    adminUpdateProductInventory(
      merchantId: $merchantId
      productUOMs: $productUOMs
    ) {
      message
      status
    }
  }
`;
export const adminUpdatePromoCodeCampaign = /* GraphQL */ `
  mutation AdminUpdatePromoCodeCampaign(
    $activeCount: String
    $category: String
    $createdBy: String
    $customerCondition: String
    $deliveryDiscountType: String
    $discountAmountCap: Float
    $discountOnProductValue: Float
    $discountQuantityCap: Int
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $isDisabled: Boolean
    $maxUserUsageLimit: Int
    $merchantId: String
    $minimumCondition: String
    $minimumPurchase: Float
    $minimumQuantity: Int
    $orderType: [String]
    $productConditions: ProductsDiscount
    $productsDiscount: ProductsDiscount
    $promoCode: String
    $promoCodeCampaignId: String
    $remainingUsage: Int
    $specificCustomerTag: String
    $specificCustomers: [String]
    $status: String
    $stores: [String]
    $title: String
    $totalUsageLimit: Int
    $type: String
    $updatedBy: String
  ) {
    adminUpdatePromoCodeCampaign(
      activeCount: $activeCount
      category: $category
      createdBy: $createdBy
      customerCondition: $customerCondition
      deliveryDiscountType: $deliveryDiscountType
      discountAmountCap: $discountAmountCap
      discountOnProductValue: $discountOnProductValue
      discountQuantityCap: $discountQuantityCap
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      isDisabled: $isDisabled
      maxUserUsageLimit: $maxUserUsageLimit
      merchantId: $merchantId
      minimumCondition: $minimumCondition
      minimumPurchase: $minimumPurchase
      minimumQuantity: $minimumQuantity
      orderType: $orderType
      productConditions: $productConditions
      productsDiscount: $productsDiscount
      promoCode: $promoCode
      promoCodeCampaignId: $promoCodeCampaignId
      remainingUsage: $remainingUsage
      specificCustomerTag: $specificCustomerTag
      specificCustomers: $specificCustomers
      status: $status
      stores: $stores
      title: $title
      totalUsageLimit: $totalUsageLimit
      type: $type
      updatedBy: $updatedBy
    ) {
      message
      status
    }
  }
`;
export const adminUpdateSalesChannelStoreSetting = /* GraphQL */ `
  mutation AdminUpdateSalesChannelStoreSetting(
    $isDisabled: Boolean
    $marketPlaceSettingId: String
    $merchantId: String
    $salesChannelId: String
    $salesChannelName: String
    $storeCode: String
    $storeId: String
    $storeName: String
    $syncFrequency: String
  ) {
    adminUpdateSalesChannelStoreSetting(
      isDisabled: $isDisabled
      marketPlaceSettingId: $marketPlaceSettingId
      merchantId: $merchantId
      salesChannelId: $salesChannelId
      salesChannelName: $salesChannelName
      storeCode: $storeCode
      storeId: $storeId
      storeName: $storeName
      syncFrequency: $syncFrequency
    ) {
      message
      status
    }
  }
`;
export const adminUpdateShippingRate = /* GraphQL */ `
  mutation AdminUpdateShippingRate(
    $amount: Float
    $conditionType: String
    $estimatedDuration: String
    $maxValue: Float
    $merchantId: String
    $minValue: Float
    $shippingRateId: String
    $title: String
  ) {
    adminUpdateShippingRate(
      amount: $amount
      conditionType: $conditionType
      estimatedDuration: $estimatedDuration
      maxValue: $maxValue
      merchantId: $merchantId
      minValue: $minValue
      shippingRateId: $shippingRateId
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminUpdateShippingZone = /* GraphQL */ `
  mutation AdminUpdateShippingZone(
    $country: String
    $merchantId: String
    $shippingZoneId: String
    $state: [String]
    $title: String
    $transportType: String
    $warehouseId: String
  ) {
    adminUpdateShippingZone(
      country: $country
      merchantId: $merchantId
      shippingZoneId: $shippingZoneId
      state: $state
      title: $title
      transportType: $transportType
      warehouseId: $warehouseId
    ) {
      message
      status
    }
  }
`;
export const adminUpdateSiteNavigation = /* GraphQL */ `
  mutation AdminUpdateSiteNavigation(
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $isDisabled: Boolean
    $linkValue: String
    $menuType: String
    $merchantId: String
    $navigationType: String
    $openNewTab: Boolean
    $parentId: String
    $sequence: Int
    $siteNavigationId: String
    $title: String
  ) {
    adminUpdateSiteNavigation(
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      isDisabled: $isDisabled
      linkValue: $linkValue
      menuType: $menuType
      merchantId: $merchantId
      navigationType: $navigationType
      openNewTab: $openNewTab
      parentId: $parentId
      sequence: $sequence
      siteNavigationId: $siteNavigationId
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminUpdateSplashScreen = /* GraphQL */ `
  mutation AdminUpdateSplashScreen(
    $buttonActionValue: String
    $effectiveEndDateTime: String
    $effectiveStartDateTime: String
    $homeImage: String
    $isDisabled: Boolean
    $merchantId: String
    $sequence: Int
    $splashScreenId: String
    $title: String
  ) {
    adminUpdateSplashScreen(
      buttonActionValue: $buttonActionValue
      effectiveEndDateTime: $effectiveEndDateTime
      effectiveStartDateTime: $effectiveStartDateTime
      homeImage: $homeImage
      isDisabled: $isDisabled
      merchantId: $merchantId
      sequence: $sequence
      splashScreenId: $splashScreenId
      title: $title
    ) {
      message
      status
    }
  }
`;
export const adminUpdateStockMovement = /* GraphQL */ `
  mutation AdminUpdateStockMovement(
    $buyerNotes: String
    $expectedArrivalDate: String
    $merchantId: String
    $referenceNumber: String
    $status: String
    $stockMovementDetails: [StockMovementDetailInput]
    $stockMovementId: String
    $supplierId: String
    $supplierName: String
    $taggingNames: [String]
    $trackingNumber: String
  ) {
    adminUpdateStockMovement(
      buyerNotes: $buyerNotes
      expectedArrivalDate: $expectedArrivalDate
      merchantId: $merchantId
      referenceNumber: $referenceNumber
      status: $status
      stockMovementDetails: $stockMovementDetails
      stockMovementId: $stockMovementId
      supplierId: $supplierId
      supplierName: $supplierName
      taggingNames: $taggingNames
      trackingNumber: $trackingNumber
    ) {
      message
      status
    }
  }
`;
export const adminUpdateStore = /* GraphQL */ `
  mutation AdminUpdateStore(
    $address: String
    $city: String
    $code: String
    $deliveryDuration: Int
    $deliveryFee: Float
    $deliveryMaxPurchaseQuantity: Int
    $deliveryMinPurchaseAmount: Float
    $deliveryPreparationTime: Int
    $deliveryServiceAvailable: Boolean
    $isDisabled: Boolean
    $items: [UpdateStoreItemInput]
    $latitude: String
    $longitude: String
    $managerContact: String
    $managerEmail: String
    $managerName: String
    $merchantId: String
    $name: String
    $onlineStoreOperate24Hour: Boolean
    $pickupServiceAvailable: Boolean
    $postalCode: String
    $priceGroupName: String
    $salesChannelName: String
    $state: String
    $storeOperatingHours: [StoreOperatingHourInput]
    $taggingNames: [String]
    $visibleToOnlineStore: Boolean
  ) {
    adminUpdateStore(
      address: $address
      city: $city
      code: $code
      deliveryDuration: $deliveryDuration
      deliveryFee: $deliveryFee
      deliveryMaxPurchaseQuantity: $deliveryMaxPurchaseQuantity
      deliveryMinPurchaseAmount: $deliveryMinPurchaseAmount
      deliveryPreparationTime: $deliveryPreparationTime
      deliveryServiceAvailable: $deliveryServiceAvailable
      isDisabled: $isDisabled
      items: $items
      latitude: $latitude
      longitude: $longitude
      managerContact: $managerContact
      managerEmail: $managerEmail
      managerName: $managerName
      merchantId: $merchantId
      name: $name
      onlineStoreOperate24Hour: $onlineStoreOperate24Hour
      pickupServiceAvailable: $pickupServiceAvailable
      postalCode: $postalCode
      priceGroupName: $priceGroupName
      salesChannelName: $salesChannelName
      state: $state
      storeOperatingHours: $storeOperatingHours
      taggingNames: $taggingNames
      visibleToOnlineStore: $visibleToOnlineStore
    ) {
      message
      status
    }
  }
`;
export const adminUpdateStoreBlockedOutPeriod = /* GraphQL */ `
  mutation AdminUpdateStoreBlockedOutPeriod(
    $endDateTime: String
    $merchantId: String
    $startDateTime: String
    $storeId: String
    $storeType: String
  ) {
    adminUpdateStoreBlockedOutPeriod(
      endDateTime: $endDateTime
      merchantId: $merchantId
      startDateTime: $startDateTime
      storeId: $storeId
      storeType: $storeType
    ) {
      message
      status
    }
  }
`;
export const adminUpdateStoreOperatingHour = /* GraphQL */ `
  mutation AdminUpdateStoreOperatingHour(
    $merchantId: String
    $storeId: String
    $storeOperatingHours: [StoreOperatingHourInput]
  ) {
    adminUpdateStoreOperatingHour(
      merchantId: $merchantId
      storeId: $storeId
      storeOperatingHours: $storeOperatingHours
    ) {
      message
      status
    }
  }
`;
export const adminUpdateSupplier = /* GraphQL */ `
  mutation AdminUpdateSupplier(
    $address: String
    $contact: String
    $contactName: String
    $country: String
    $email: String
    $merchantId: String
    $name: String
    $supplierId: String
  ) {
    adminUpdateSupplier(
      address: $address
      contact: $contact
      contactName: $contactName
      country: $country
      email: $email
      merchantId: $merchantId
      name: $name
      supplierId: $supplierId
    ) {
      message
      status
    }
  }
`;
export const adminUpdateTagsOnModule = /* GraphQL */ `
  mutation AdminUpdateTagsOnModule(
    $merchantId: String
    $taggingList: [String]
    $type: String
    $typeIdList: [String]
  ) {
    adminUpdateTagsOnModule(
      merchantId: $merchantId
      taggingList: $taggingList
      type: $type
      typeIdList: $typeIdList
    ) {
      message
      status
      updatedAt
      updatedBy
    }
  }
`;
export const adminUpdateTicket = /* GraphQL */ `
  mutation AdminUpdateTicket(
    $chatId: String
    $customerId: String
    $imageList: [String]
    $issueId: String
    $issueStatus: String
    $issueType: String
    $message: String
    $videoList: [String]
  ) {
    adminUpdateTicket(
      chatId: $chatId
      customerId: $customerId
      imageList: $imageList
      issueId: $issueId
      issueStatus: $issueStatus
      issueType: $issueType
      message: $message
      videoList: $videoList
    ) {
      message
      status
    }
  }
`;
export const adminUpdateUserMatrix = /* GraphQL */ `
  mutation AdminUpdateUserMatrix(
    $merchantId: String
    $userId: String
    $userMatrixes: [UserMatrixInput]
  ) {
    adminUpdateUserMatrix(
      merchantId: $merchantId
      userId: $userId
      userMatrixes: $userMatrixes
    ) {
      message
      status
    }
  }
`;
export const adminUpdateVoucher = /* GraphQL */ `
  mutation AdminUpdateVoucher(
    $category: String
    $customerCondition: String
    $customerGetDiscountLimit: Float
    $customerGetDiscountType: String
    $customerGetItems: ConditionMapping
    $customerGetPercentValue: Float
    $customerGetQuantity: Int
    $customerGetValue: Float
    $deliveryDiscountType: String
    $deliveryDiscountValue: Float
    $description: String
    $discountAmountCap: Float
    $discountOnDelivery: Boolean
    $discountOnProductValue: Float
    $image: String
    $isShareable: Boolean
    $isUnlimitedDistribution: Boolean
    $maxUserObtainLimit: Int
    $merchantId: String
    $minimumAmount: Float
    $minimumCondition: String
    $minimumQuantity: Int
    $orderType: [String]
    $price: Float
    $productConditions: VoucherProductConditionMappingInput
    $productsDiscount: ConditionMapping
    $requiredPoints: Int
    $status: String
    $title: String
    $totalDistributionLimit: Int
    $type: String
    $voucherCodeS3Key: String
    $voucherExpiryType: String
    $voucherExpiryValue: String
    $voucherIcon: String
    $voucherId: String
  ) {
    adminUpdateVoucher(
      category: $category
      customerCondition: $customerCondition
      customerGetDiscountLimit: $customerGetDiscountLimit
      customerGetDiscountType: $customerGetDiscountType
      customerGetItems: $customerGetItems
      customerGetPercentValue: $customerGetPercentValue
      customerGetQuantity: $customerGetQuantity
      customerGetValue: $customerGetValue
      deliveryDiscountType: $deliveryDiscountType
      deliveryDiscountValue: $deliveryDiscountValue
      description: $description
      discountAmountCap: $discountAmountCap
      discountOnDelivery: $discountOnDelivery
      discountOnProductValue: $discountOnProductValue
      image: $image
      isShareable: $isShareable
      isUnlimitedDistribution: $isUnlimitedDistribution
      maxUserObtainLimit: $maxUserObtainLimit
      merchantId: $merchantId
      minimumAmount: $minimumAmount
      minimumCondition: $minimumCondition
      minimumQuantity: $minimumQuantity
      orderType: $orderType
      price: $price
      productConditions: $productConditions
      productsDiscount: $productsDiscount
      requiredPoints: $requiredPoints
      status: $status
      title: $title
      totalDistributionLimit: $totalDistributionLimit
      type: $type
      voucherCodeS3Key: $voucherCodeS3Key
      voucherExpiryType: $voucherExpiryType
      voucherExpiryValue: $voucherExpiryValue
      voucherIcon: $voucherIcon
      voucherId: $voucherId
    ) {
      message
      status
    }
  }
`;
export const adminUpdateWarehouseDeliveryConfig = /* GraphQL */ `
  mutation AdminUpdateWarehouseDeliveryConfig(
    $isOwnTransportEnabled: Boolean
    $isStandardDeliveryEnabled: Boolean
    $onDemandDefaultVehicleType: String
    $onDemandMaxDistance: Float
    $standardPreferredPartnerName1: String
    $standardPreferredPartnerName2: String
    $warehouseId: String
  ) {
    adminUpdateWarehouseDeliveryConfig(
      isOwnTransportEnabled: $isOwnTransportEnabled
      isStandardDeliveryEnabled: $isStandardDeliveryEnabled
      onDemandDefaultVehicleType: $onDemandDefaultVehicleType
      onDemandMaxDistance: $onDemandMaxDistance
      standardPreferredPartnerName1: $standardPreferredPartnerName1
      standardPreferredPartnerName2: $standardPreferredPartnerName2
      warehouseId: $warehouseId
    ) {
      message
      status
    }
  }
`;
export const adminUpdateWebhookCallbackConfig = /* GraphQL */ `
  mutation AdminUpdateWebhookCallbackConfig(
    $callbackEvent: String
    $callbackUrl: String
    $webhookCallbackConfigId: String
  ) {
    adminUpdateWebhookCallbackConfig(
      callbackEvent: $callbackEvent
      callbackUrl: $callbackUrl
      webhookCallbackConfigId: $webhookCallbackConfigId
    ) {
      message
      status
    }
  }
`;
export const adminVerifyDuplicateInStoreOrder = /* GraphQL */ `
  mutation AdminVerifyDuplicateInStoreOrder(
    $confirmDuplicate: Boolean
    $duplicateOrderId: String
    $inStoreOrderId: String
  ) {
    adminVerifyDuplicateInStoreOrder(
      confirmDuplicate: $confirmDuplicate
      duplicateOrderId: $duplicateOrderId
      inStoreOrderId: $inStoreOrderId
    ) {
      message
      status
    }
  }
`;
export const buyMerchantAddon = /* GraphQL */ `
  mutation BuyMerchantAddon($addOnPackage: [String], $merchantId: String) {
    buyMerchantAddon(addOnPackage: $addOnPackage, merchantId: $merchantId) {
      gatewayPaymentParams
      message
      paymentUrl
      status
    }
  }
`;
export const checkCart = /* GraphQL */ `
  mutation CheckCart(
    $customerCartIds: [String]
    $customerId: String
    $isOwnTransportOption: Boolean
    $merchantId: String
    $orderType: String
    $postalCode: String
    $promoCode: String
    $storeId: String
    $voucherCode: String
    $voucherExpiryDate: String
  ) {
    checkCart(
      customerCartIds: $customerCartIds
      customerId: $customerId
      isOwnTransportOption: $isOwnTransportOption
      merchantId: $merchantId
      orderType: $orderType
      postalCode: $postalCode
      promoCode: $promoCode
      storeId: $storeId
      voucherCode: $voucherCode
      voucherExpiryDate: $voucherExpiryDate
    ) {
      advancedOrderDateTimeSelection {
        advancedOrderDateSelection
        advancedOrderTimeSelection
      }
      cartItems {
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
      creditLimit {
        balanceCreditAmt
        creditLimit
        spentCreditLimit
      }
      creditLimitEnabled
      customerIsBlocked
      customerOrderDetail {
        address
        customerName
        latitude
        longitude
        phoneNumber
        postalCode
        selectedOrderType
        selectedStore {
          storeId
          storeName
        }
      }
      deliveryDiscount {
        discountType
        discountValue
      }
      discount
      exceedCreditLimit
      freeItems {
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
      isFreeDelivery
      message
      promoCode
      promoCodeCategory
      promoCodeValidation
      status
      subtotal
      subtotalWithTax
      truckSelection {
        scheduledDate
        scheduledDay
        scheduledTime {
          availableTrucks {
            truckCapacityId
            truckId
          }
          time
        }
      }
      voucherCode
      voucherValidation
    }
  }
`;
export const checkCartLimit = /* GraphQL */ `
  mutation CheckCartLimit($customerCartIds: [String], $scheduledDate: String) {
    checkCartLimit(
      customerCartIds: $customerCartIds
      scheduledDate: $scheduledDate
    ) {
      message
      status
    }
  }
`;
export const checkPaymentStatus = /* GraphQL */ `
  mutation CheckPaymentStatus($merchantId: String, $orderNumber: String) {
    checkPaymentStatus(merchantId: $merchantId, orderNumber: $orderNumber) {
      message
      status
    }
  }
`;
export const checkVoucherCart = /* GraphQL */ `
  mutation CheckVoucherCart($voucherCartId: [String]) {
    checkVoucherCart(voucherCartId: $voucherCartId) {
      quantity
      status
      subtotal
      voucherCartIdLists
    }
  }
`;
export const createContactUsEnquiry = /* GraphQL */ `
  mutation CreateContactUsEnquiry(
    $contactEmail: String
    $contactName: String
    $enquiry: String
    $merchantId: String
  ) {
    createContactUsEnquiry(
      contactEmail: $contactEmail
      contactName: $contactName
      enquiry: $enquiry
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const createOrderReview = /* GraphQL */ `
  mutation CreateOrderReview(
    $attachment: [String]
    $comment: String
    $customerId: String
    $merchantId: String
    $orderId: String
  ) {
    createOrderReview(
      attachment: $attachment
      comment: $comment
      customerId: $customerId
      merchantId: $merchantId
      orderId: $orderId
    ) {
      message
      status
    }
  }
`;
export const createProductReview = /* GraphQL */ `
  mutation CreateProductReview(
    $comment: String
    $merchantId: String
    $orderDetailId: String
    $rating: Int
    $reviewAsAnonymous: String
  ) {
    createProductReview(
      comment: $comment
      merchantId: $merchantId
      orderDetailId: $orderDetailId
      rating: $rating
      reviewAsAnonymous: $reviewAsAnonymous
    ) {
      message
      status
    }
  }
`;
export const customerSignIn = /* GraphQL */ `
  mutation CustomerSignIn(
    $loginType: String
    $merchantId: String
    $mobileNo: String
    $oldCustomerId: String
    $password: String
    $platform: String
    $primaryEmail: String
    $username: String
    $version: String
  ) {
    customerSignIn(
      loginType: $loginType
      merchantId: $merchantId
      mobileNo: $mobileNo
      oldCustomerId: $oldCustomerId
      password: $password
      platform: $platform
      primaryEmail: $primaryEmail
      username: $username
      version: $version
    ) {
      accessToken
      accountNo
      customerId
      expiredAt
      forceResetPassword
      merchantId
      message
      otpRequired
      redirectOtp
      refreshToken
      sessionID
      status
    }
  }
`;
export const customerSignOut = /* GraphQL */ `
  mutation CustomerSignOut(
    $accessToken: String
    $accountNo: String
    $merchantId: String
    $refreshToken: String
  ) {
    customerSignOut(
      accessToken: $accessToken
      accountNo: $accountNo
      merchantId: $merchantId
      refreshToken: $refreshToken
    ) {
      accountNo
      customerId
      merchantId
      message
      status
    }
  }
`;
export const customerSignUp = /* GraphQL */ `
  mutation CustomerSignUp(
    $autoLogin: Boolean
    $dateOfBirth: String
    $firstName: String
    $gender: String
    $lastName: String
    $marketingConsent: Boolean
    $merchantId: String
    $mobileNo: String
    $oldCustomerId: String
    $password: String
    $primaryEmail: String
    $promoCode: String
  ) {
    customerSignUp(
      autoLogin: $autoLogin
      dateOfBirth: $dateOfBirth
      firstName: $firstName
      gender: $gender
      lastName: $lastName
      marketingConsent: $marketingConsent
      merchantId: $merchantId
      mobileNo: $mobileNo
      oldCustomerId: $oldCustomerId
      password: $password
      primaryEmail: $primaryEmail
      promoCode: $promoCode
    ) {
      accountNo
      customerId
      merchantId
      message
      signInResponse {
        accessToken
        accountNo
        customerId
        expiredAt
        forceResetPassword
        merchantId
        message
        otpRequired
        redirectOtp
        refreshToken
        sessionID
        status
      }
      status
    }
  }
`;
export const deleteCustomerFavouriteAddress = /* GraphQL */ `
  mutation DeleteCustomerFavouriteAddress(
    $customerFavouriteAddressId: String
    $merchantId: String
  ) {
    deleteCustomerFavouriteAddress(
      customerFavouriteAddressId: $customerFavouriteAddressId
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const forgotPassword = /* GraphQL */ `
  mutation ForgotPassword($merchantId: String, $primaryEmail: String) {
    forgotPassword(merchantId: $merchantId, primaryEmail: $primaryEmail) {
      message
      status
    }
  }
`;
export const generateAdminS3UploadLink = /* GraphQL */ `
  mutation GenerateAdminS3UploadLink($fileName: String, $uploadType: String) {
    generateAdminS3UploadLink(fileName: $fileName, uploadType: $uploadType)
  }
`;
export const generateHelpCenterUploadLink = /* GraphQL */ `
  mutation GenerateHelpCenterUploadLink(
    $accessToken: String
    $domain: String
    $fileName: String
    $folderName: String
    $merchantId: String
    $platform: String
  ) {
    generateHelpCenterUploadLink(
      accessToken: $accessToken
      domain: $domain
      fileName: $fileName
      folderName: $folderName
      merchantId: $merchantId
      platform: $platform
    )
  }
`;
export const generateManualPaymentReceiptUploadLink = /* GraphQL */ `
  mutation GenerateManualPaymentReceiptUploadLink(
    $fileName: String
    $manualPaymentMethodName: String
    $orderNumber: String
  ) {
    generateManualPaymentReceiptUploadLink(
      fileName: $fileName
      manualPaymentMethodName: $manualPaymentMethodName
      orderNumber: $orderNumber
    )
  }
`;
export const generatePackingSlip = /* GraphQL */ `
  mutation GeneratePackingSlip($orderId: String) {
    generatePackingSlip(orderId: $orderId) {
      message
      status
      url
    }
  }
`;
export const generateVoucherQrCode = /* GraphQL */ `
  mutation GenerateVoucherQrCode(
    $customerId: String
    $expiryDate: String
    $generateImage: Boolean
    $voucherCode: String
  ) {
    generateVoucherQrCode(
      customerId: $customerId
      expiryDate: $expiryDate
      generateImage: $generateImage
      voucherCode: $voucherCode
    ) {
      message
      qrCodeString
      qrImageLink
      status
    }
  }
`;
export const helpCenterSubmitFeedback = /* GraphQL */ `
  mutation HelpCenterSubmitFeedback(
    $accessToken: String
    $assignee: String
    $channel: String
    $dateOfVisit: String
    $domain: String
    $imageList: [String]
    $isCustomerMessage: Boolean
    $issueClosedDate: String
    $issueDetailId: String
    $issueDetailRating: String
    $issueId: String
    $issueStatus: String
    $issueTitle: String
    $issueType: String
    $merchantId: String
    $message: String
    $platform: String
    $replyFor: String
    $searchLocation: String
    $storeId: String
    $storeName: String
    $timeOfVisit: String
    $title: String
    $videoList: [String]
  ) {
    helpCenterSubmitFeedback(
      accessToken: $accessToken
      assignee: $assignee
      channel: $channel
      dateOfVisit: $dateOfVisit
      domain: $domain
      imageList: $imageList
      isCustomerMessage: $isCustomerMessage
      issueClosedDate: $issueClosedDate
      issueDetailId: $issueDetailId
      issueDetailRating: $issueDetailRating
      issueId: $issueId
      issueStatus: $issueStatus
      issueTitle: $issueTitle
      issueType: $issueType
      merchantId: $merchantId
      message: $message
      platform: $platform
      replyFor: $replyFor
      searchLocation: $searchLocation
      storeId: $storeId
      storeName: $storeName
      timeOfVisit: $timeOfVisit
      title: $title
      videoList: $videoList
    ) {
      message
      status
      ticketInfo {
        issueId
        ticketLink
        ticketNumber
      }
    }
  }
`;
export const helpCenterSubmitIssue = /* GraphQL */ `
  mutation HelpCenterSubmitIssue(
    $accessToken: String
    $assignee: String
    $channel: String
    $contactNumber: String
    $domain: String
    $imageList: [String]
    $isCustomerMessage: Boolean
    $issueClosedDate: String
    $issueDetailId: String
    $issueDetailRating: String
    $issueId: String
    $issueStatus: String
    $issueTitle: String
    $issueType: String
    $merchantId: String
    $message: String
    $orderId: String
    $platform: String
    $title: String
    $videoList: [String]
  ) {
    helpCenterSubmitIssue(
      accessToken: $accessToken
      assignee: $assignee
      channel: $channel
      contactNumber: $contactNumber
      domain: $domain
      imageList: $imageList
      isCustomerMessage: $isCustomerMessage
      issueClosedDate: $issueClosedDate
      issueDetailId: $issueDetailId
      issueDetailRating: $issueDetailRating
      issueId: $issueId
      issueStatus: $issueStatus
      issueTitle: $issueTitle
      issueType: $issueType
      merchantId: $merchantId
      message: $message
      orderId: $orderId
      platform: $platform
      title: $title
      videoList: $videoList
    ) {
      message
      status
      ticketInfo {
        issueId
        ticketLink
        ticketNumber
      }
    }
  }
`;
export const kDSDeactivateAccount = /* GraphQL */ `
  mutation KDSDeactivateAccount {
    kDSDeactivateAccount {
      message
      status
    }
  }
`;
export const kdsChangeOrderStatus = /* GraphQL */ `
  mutation KdsChangeOrderStatus(
    $merchantId: String
    $orderId: String
    $status: String
    $token: String
  ) {
    kdsChangeOrderStatus(
      merchantId: $merchantId
      orderId: $orderId
      status: $status
      token: $token
    ) {
      message
      status
    }
  }
`;
export const kdsChangeProductStatus = /* GraphQL */ `
  mutation KdsChangeProductStatus(
    $isDisabled: Boolean
    $productId: String
    $storeProductId: String
  ) {
    kdsChangeProductStatus(
      isDisabled: $isDisabled
      productId: $productId
      storeProductId: $storeProductId
    ) {
      message
      status
    }
  }
`;
export const kdsUpdateCustomer = /* GraphQL */ `
  mutation KdsUpdateCustomer(
    $accountNo: String
    $receiptNo: String
    $totalSpending: Float
  ) {
    kdsUpdateCustomer(
      accountNo: $accountNo
      receiptNo: $receiptNo
      totalSpending: $totalSpending
    ) {
      message
      status
    }
  }
`;
export const kdsUpdateStoreHours = /* GraphQL */ `
  mutation KdsUpdateStoreHours(
    $advancedOrderEnabled: Boolean
    $listOfStoreOpenCloseHours: [StoreOpenCloseHoursInput]
    $maxAdvancedOrderDay: Int
    $merchantId: String
  ) {
    kdsUpdateStoreHours(
      advancedOrderEnabled: $advancedOrderEnabled
      listOfStoreOpenCloseHours: $listOfStoreOpenCloseHours
      maxAdvancedOrderDay: $maxAdvancedOrderDay
      merchantId: $merchantId
    ) {
      message
      onBoardRole
      status
    }
  }
`;
export const kdsUpdateStoreInformation = /* GraphQL */ `
  mutation KdsUpdateStoreInformation(
    $aboutUsBanner: String
    $address: String
    $addressDetail: String
    $city: String
    $country: String
    $domain: String
    $isOnDemandDeliveryEnabled: Boolean
    $latitude: Float
    $longitude: Float
    $maxAdvancedOrderDay: Int
    $name: String
    $onDemandMaxDistance: Float
    $postalCode: String
    $smsMobileNo: String
    $state: String
    $webQrCode: String
  ) {
    kdsUpdateStoreInformation(
      aboutUsBanner: $aboutUsBanner
      address: $address
      addressDetail: $addressDetail
      city: $city
      country: $country
      domain: $domain
      isOnDemandDeliveryEnabled: $isOnDemandDeliveryEnabled
      latitude: $latitude
      longitude: $longitude
      maxAdvancedOrderDay: $maxAdvancedOrderDay
      name: $name
      onDemandMaxDistance: $onDemandMaxDistance
      postalCode: $postalCode
      smsMobileNo: $smsMobileNo
      state: $state
      webQrCode: $webQrCode
    ) {
      message
      status
    }
  }
`;
export const kdsUpdateStoreOrderOption = /* GraphQL */ `
  mutation KdsUpdateStoreOrderOption(
    $merchantId: String
    $orderOption: [String]
  ) {
    kdsUpdateStoreOrderOption(
      merchantId: $merchantId
      orderOption: $orderOption
    ) {
      message
      onBoardRole
      status
    }
  }
`;
export const lazadaLoginDataMoat = /* GraphQL */ `
  mutation LazadaLoginDataMoat(
    $ati: String
    $loginMessage: String
    $loginResult: String
    $merchantId: String
  ) {
    lazadaLoginDataMoat(
      ati: $ati
      loginMessage: $loginMessage
      loginResult: $loginResult
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const oTPVerification = /* GraphQL */ `
  mutation OTPVerification(
    $customerOtp: String
    $loginType: String
    $merchantId: String
    $mobileNo: String
    $primaryEmail: String
  ) {
    oTPVerification(
      customerOtp: $customerOtp
      loginType: $loginType
      merchantId: $merchantId
      mobileNo: $mobileNo
      primaryEmail: $primaryEmail
    ) {
      message
      status
      tokenData {
        accessToken
        accountNo
        customerId
        expiredAt
        merchantId
        refreshToken
        sessionID
      }
    }
  }
`;
export const openAIPrompt = /* GraphQL */ `
  mutation OpenAIPrompt(
    $frequencyPenalty: Float
    $maxToken: Int
    $presencePenalty: Float
    $prompt: String
    $temperature: Float
    $topP: Float
  ) {
    openAIPrompt(
      frequencyPenalty: $frequencyPenalty
      maxToken: $maxToken
      presencePenalty: $presencePenalty
      prompt: $prompt
      temperature: $temperature
      topP: $topP
    ) {
      gptResponse
      message
      status
    }
  }
`;
export const placeCustomOrderToSQS = /* GraphQL */ `
  mutation PlaceCustomOrderToSQS(
    $accessToken: String
    $billingAddress: String
    $billingCity: String
    $billingCountry: String
    $billingPostalCode: String
    $billingState: String
    $customerAccountNo: String
    $customerCartIds: [String]
    $customerFavouriteAddressId: String
    $customerFavouritePaymentId: String
    $customerFirstName: String
    $customerId: String
    $customerLastName: String
    $customerMobileNo: String
    $customerPrimaryEmail: String
    $deliveryAddress: String
    $deliveryCity: String
    $deliveryCountry: String
    $deliveryLatitude: Float
    $deliveryLongitude: Float
    $deliveryOptionSelected: String
    $deliveryPostalCode: String
    $deliveryState: String
    $isAdvancedOrder: Boolean
    $isCustomerSignedIn: Boolean
    $merchantId: String
    $noteToRider: String
    $orderType: String
    $paymentMethod: String
    $paymentType: String
    $platform: String
    $promoCode: String
    $remarks: String
    $requiredCutlery: Boolean
    $salesChannelName: String
    $scheduledDate: String
    $scheduledDateTime: String
    $scheduledTime: String
    $storeId: String
    $storeName: String
    $tableNumber: String
    $truckCapacityId: String
    $truckId: String
    $voucherCode: String
    $voucherExpiryDate: String
  ) {
    placeCustomOrderToSQS(
      accessToken: $accessToken
      billingAddress: $billingAddress
      billingCity: $billingCity
      billingCountry: $billingCountry
      billingPostalCode: $billingPostalCode
      billingState: $billingState
      customerAccountNo: $customerAccountNo
      customerCartIds: $customerCartIds
      customerFavouriteAddressId: $customerFavouriteAddressId
      customerFavouritePaymentId: $customerFavouritePaymentId
      customerFirstName: $customerFirstName
      customerId: $customerId
      customerLastName: $customerLastName
      customerMobileNo: $customerMobileNo
      customerPrimaryEmail: $customerPrimaryEmail
      deliveryAddress: $deliveryAddress
      deliveryCity: $deliveryCity
      deliveryCountry: $deliveryCountry
      deliveryLatitude: $deliveryLatitude
      deliveryLongitude: $deliveryLongitude
      deliveryOptionSelected: $deliveryOptionSelected
      deliveryPostalCode: $deliveryPostalCode
      deliveryState: $deliveryState
      isAdvancedOrder: $isAdvancedOrder
      isCustomerSignedIn: $isCustomerSignedIn
      merchantId: $merchantId
      noteToRider: $noteToRider
      orderType: $orderType
      paymentMethod: $paymentMethod
      paymentType: $paymentType
      platform: $platform
      promoCode: $promoCode
      remarks: $remarks
      requiredCutlery: $requiredCutlery
      salesChannelName: $salesChannelName
      scheduledDate: $scheduledDate
      scheduledDateTime: $scheduledDateTime
      scheduledTime: $scheduledTime
      storeId: $storeId
      storeName: $storeName
      tableNumber: $tableNumber
      truckCapacityId: $truckCapacityId
      truckId: $truckId
      voucherCode: $voucherCode
      voucherExpiryDate: $voucherExpiryDate
    ) {
      message
      messageId
      status
    }
  }
`;
export const placeCustomerOrderToSQS = /* GraphQL */ `
  mutation PlaceCustomerOrderToSQS(
    $accessToken: String
    $billingAddress: String
    $billingCity: String
    $billingCountry: String
    $billingPostalCode: String
    $billingState: String
    $customerAccountNo: String
    $customerCartIds: [String]
    $customerFavouriteAddressId: String
    $customerFavouritePaymentId: String
    $customerFirstName: String
    $customerId: String
    $customerLastName: String
    $customerMobileNo: String
    $customerPrimaryEmail: String
    $deliveryAddress: String
    $deliveryCity: String
    $deliveryCountry: String
    $deliveryLatitude: Float
    $deliveryLongitude: Float
    $deliveryOptionSelected: String
    $deliveryPostalCode: String
    $deliveryState: String
    $isAdvancedOrder: Boolean
    $isCustomerSignedIn: Boolean
    $merchantId: String
    $noteToRider: String
    $orderType: String
    $paymentMethod: String
    $paymentType: String
    $platform: String
    $promoCode: String
    $remarks: String
    $requiredCutlery: Boolean
    $salesChannelName: String
    $scheduledDate: String
    $scheduledDateTime: String
    $scheduledTime: String
    $seatingNo: String
    $storeId: String
    $storeName: String
    $tableNumber: String
    $truckCapacityId: String
    $truckId: String
    $voucherCode: String
    $voucherExpiryDate: String
  ) {
    placeCustomerOrderToSQS(
      accessToken: $accessToken
      billingAddress: $billingAddress
      billingCity: $billingCity
      billingCountry: $billingCountry
      billingPostalCode: $billingPostalCode
      billingState: $billingState
      customerAccountNo: $customerAccountNo
      customerCartIds: $customerCartIds
      customerFavouriteAddressId: $customerFavouriteAddressId
      customerFavouritePaymentId: $customerFavouritePaymentId
      customerFirstName: $customerFirstName
      customerId: $customerId
      customerLastName: $customerLastName
      customerMobileNo: $customerMobileNo
      customerPrimaryEmail: $customerPrimaryEmail
      deliveryAddress: $deliveryAddress
      deliveryCity: $deliveryCity
      deliveryCountry: $deliveryCountry
      deliveryLatitude: $deliveryLatitude
      deliveryLongitude: $deliveryLongitude
      deliveryOptionSelected: $deliveryOptionSelected
      deliveryPostalCode: $deliveryPostalCode
      deliveryState: $deliveryState
      isAdvancedOrder: $isAdvancedOrder
      isCustomerSignedIn: $isCustomerSignedIn
      merchantId: $merchantId
      noteToRider: $noteToRider
      orderType: $orderType
      paymentMethod: $paymentMethod
      paymentType: $paymentType
      platform: $platform
      promoCode: $promoCode
      remarks: $remarks
      requiredCutlery: $requiredCutlery
      salesChannelName: $salesChannelName
      scheduledDate: $scheduledDate
      scheduledDateTime: $scheduledDateTime
      scheduledTime: $scheduledTime
      seatingNo: $seatingNo
      storeId: $storeId
      storeName: $storeName
      tableNumber: $tableNumber
      truckCapacityId: $truckCapacityId
      truckId: $truckId
      voucherCode: $voucherCode
      voucherExpiryDate: $voucherExpiryDate
    ) {
      message
      messageId
      status
    }
  }
`;
export const placeGiftCardOrderToSQS = /* GraphQL */ `
  mutation PlaceGiftCardOrderToSQS(
    $accessToken: String
    $customerFirstName: String
    $customerLastName: String
    $customerMobileNo: String
    $email: String
    $giftCardAmount: Float
    $giftCardMessage: String
    $giftCardQuantity: Int
    $giftCardTemplateId: String
    $giftCardTitle: String
    $merchantId: String
    $paymentMethod: String
    $platform: String
    $senderName: String
  ) {
    placeGiftCardOrderToSQS(
      accessToken: $accessToken
      customerFirstName: $customerFirstName
      customerLastName: $customerLastName
      customerMobileNo: $customerMobileNo
      email: $email
      giftCardAmount: $giftCardAmount
      giftCardMessage: $giftCardMessage
      giftCardQuantity: $giftCardQuantity
      giftCardTemplateId: $giftCardTemplateId
      giftCardTitle: $giftCardTitle
      merchantId: $merchantId
      paymentMethod: $paymentMethod
      platform: $platform
      senderName: $senderName
    ) {
      message
      messageId
      status
    }
  }
`;
export const processCustomerVoucher = /* GraphQL */ `
  mutation ProcessCustomerVoucher(
    $customerFirstName: String
    $customerId: String
    $customerLastName: String
    $customerMobileNo: String
    $email: String
    $merchantId: String
    $paymentMethod: String
    $platform: String
    $voucherCartId: [String]
  ) {
    processCustomerVoucher(
      customerFirstName: $customerFirstName
      customerId: $customerId
      customerLastName: $customerLastName
      customerMobileNo: $customerMobileNo
      email: $email
      merchantId: $merchantId
      paymentMethod: $paymentMethod
      platform: $platform
      voucherCartId: $voucherCartId
    ) {
      gatewayPaymentUrl
      message
      orderNumber
      status
    }
  }
`;
export const promptGetAssociatedProduct = /* GraphQL */ `
  mutation PromptGetAssociatedProduct($promptText: String) {
    promptGetAssociatedProduct(promptText: $promptText) {
      condition {
        numberOfPurchase
      }
      listOfAssociatedProducts {
        ids
        itemCover
        itemId
        itemTitle
        itemType
      }
      message
      status
    }
  }
`;
export const rateFaqArticle = /* GraphQL */ `
  mutation RateFaqArticle($helpCenterFaqId: String, $rate: Boolean) {
    rateFaqArticle(helpCenterFaqId: $helpCenterFaqId, rate: $rate) {
      message
      status
    }
  }
`;
export const redeemVoucherByPoints = /* GraphQL */ `
  mutation RedeemVoucherByPoints(
    $customerId: String
    $merchantId: String
    $voucherId: String
    $whatsAppNotification: Boolean
  ) {
    redeemVoucherByPoints(
      customerId: $customerId
      merchantId: $merchantId
      voucherId: $voucherId
      whatsAppNotification: $whatsAppNotification
    ) {
      message
      status
    }
  }
`;
export const redeemVoucherByStamp = /* GraphQL */ `
  mutation RedeemVoucherByStamp(
    $customerId: String
    $merchantId: String
    $stampingCampaignId: String
    $voucherId: String
  ) {
    redeemVoucherByStamp(
      customerId: $customerId
      merchantId: $merchantId
      stampingCampaignId: $stampingCampaignId
      voucherId: $voucherId
    ) {
      message
      status
    }
  }
`;
export const registerCustomerDeviceToken = /* GraphQL */ `
  mutation RegisterCustomerDeviceToken(
    $customerId: String
    $deviceToken: String
    $merchantId: String
    $platform: String
  ) {
    registerCustomerDeviceToken(
      customerId: $customerId
      deviceToken: $deviceToken
      merchantId: $merchantId
      platform: $platform
    ) {
      message
      status
    }
  }
`;
export const registerKdsToken = /* GraphQL */ `
  mutation RegisterKdsToken(
    $deviceToken: String
    $platform: String
    $username: String
  ) {
    registerKdsToken(
      deviceToken: $deviceToken
      platform: $platform
      username: $username
    ) {
      message
      status
    }
  }
`;
export const registerNewMerchant = /* GraphQL */ `
  mutation RegisterNewMerchant(
    $address: String
    $currency: String
    $domain: String
    $name: String
    $ownerEmail: String
    $ownerName: String
    $ownerPhone: String
  ) {
    registerNewMerchant(
      address: $address
      currency: $currency
      domain: $domain
      name: $name
      ownerEmail: $ownerEmail
      ownerName: $ownerName
      ownerPhone: $ownerPhone
    ) {
      message
      status
    }
  }
`;
export const removeItemFromCustomerCart = /* GraphQL */ `
  mutation RemoveItemFromCustomerCart(
    $accessToken: String
    $customerCartId: String
    $merchantId: String
  ) {
    removeItemFromCustomerCart(
      accessToken: $accessToken
      customerCartId: $customerCartId
      merchantId: $merchantId
    ) {
      message
      status
    }
  }
`;
export const removeKdsToken = /* GraphQL */ `
  mutation RemoveKdsToken($deviceToken: String) {
    removeKdsToken(deviceToken: $deviceToken) {
      message
      status
    }
  }
`;
export const renewQBRefreshToken = /* GraphQL */ `
  mutation RenewQBRefreshToken($authorizationCode: String, $realmId: String) {
    renewQBRefreshToken(
      authorizationCode: $authorizationCode
      realmId: $realmId
    ) {
      message
      status
    }
  }
`;
export const resendOTP = /* GraphQL */ `
  mutation ResendOTP(
    $loginType: String
    $merchantId: String
    $mobileNo: String
    $primaryEmail: String
  ) {
    resendOTP(
      loginType: $loginType
      merchantId: $merchantId
      mobileNo: $mobileNo
      primaryEmail: $primaryEmail
    ) {
      message
      status
    }
  }
`;
export const resetPassword = /* GraphQL */ `
  mutation ResetPassword(
    $customerId: String
    $merchantId: String
    $newPassword: String
    $oldPassword: String
    $randomHash: String
  ) {
    resetPassword(
      customerId: $customerId
      merchantId: $merchantId
      newPassword: $newPassword
      oldPassword: $oldPassword
      randomHash: $randomHash
    ) {
      message
      status
    }
  }
`;
export const saveCustomerFavouriteAddress = /* GraphQL */ `
  mutation SaveCustomerFavouriteAddress(
    $address: String
    $addressDetail: String
    $city: String
    $country: String
    $customerFavouriteAddressId: String
    $customerId: String
    $isDefaultBilling: Boolean
    $isDefaultShipping: Boolean
    $latitude: String
    $longitude: String
    $merchantId: String
    $name: String
    $postalCode: String
    $state: String
  ) {
    saveCustomerFavouriteAddress(
      address: $address
      addressDetail: $addressDetail
      city: $city
      country: $country
      customerFavouriteAddressId: $customerFavouriteAddressId
      customerId: $customerId
      isDefaultBilling: $isDefaultBilling
      isDefaultShipping: $isDefaultShipping
      latitude: $latitude
      longitude: $longitude
      merchantId: $merchantId
      name: $name
      postalCode: $postalCode
      state: $state
    ) {
      message
      status
    }
  }
`;
export const shareVoucher = /* GraphQL */ `
  mutation ShareVoucher(
    $customerId: String
    $quantity: Int
    $receiverContactType: String
    $receiverEmail: String
    $receiverNumber: String
    $voucherCode: String
  ) {
    shareVoucher(
      customerId: $customerId
      quantity: $quantity
      receiverContactType: $receiverContactType
      receiverEmail: $receiverEmail
      receiverNumber: $receiverNumber
      voucherCode: $voucherCode
    ) {
      message
      status
    }
  }
`;
export const submitCustomerFeedbackSurvey = /* GraphQL */ `
  mutation SubmitCustomerFeedbackSurvey(
    $accessToken: String
    $additionalFeedback: String
    $feedbackId: String
    $issueClosed: Boolean
    $merchantId: String
    $rating: Int
  ) {
    submitCustomerFeedbackSurvey(
      accessToken: $accessToken
      additionalFeedback: $additionalFeedback
      feedbackId: $feedbackId
      issueClosed: $issueClosed
      merchantId: $merchantId
      rating: $rating
    ) {
      message
      status
    }
  }
`;
export const triggerOnOffFacebookLive = /* GraphQL */ `
  mutation TriggerOnOffFacebookLive(
    $facebookLiveCampaignId: String
    $merchantId: String
    $storeId: String
  ) {
    triggerOnOffFacebookLive(
      facebookLiveCampaignId: $facebookLiveCampaignId
      merchantId: $merchantId
      storeId: $storeId
    ) {
      message
      status
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $accessToken: String
    $address: String
    $address2: String
    $city: String
    $customerId: String
    $dateOfBirth: String
    $domain: String
    $firstName: String
    $gender: String
    $lastName: String
    $marketingConsent: Boolean
    $merchantId: String
    $mobileNo: String
    $newPassword: String
    $postal: String
    $primaryEmail: String
    $race: String
    $state: String
  ) {
    updateCustomer(
      accessToken: $accessToken
      address: $address
      address2: $address2
      city: $city
      customerId: $customerId
      dateOfBirth: $dateOfBirth
      domain: $domain
      firstName: $firstName
      gender: $gender
      lastName: $lastName
      marketingConsent: $marketingConsent
      merchantId: $merchantId
      mobileNo: $mobileNo
      newPassword: $newPassword
      postal: $postal
      primaryEmail: $primaryEmail
      race: $race
      state: $state
    ) {
      message
      status
    }
  }
`;
export const updateCustomerWishlist = /* GraphQL */ `
  mutation UpdateCustomerWishlist(
    $customerId: String
    $customerWishListId: String
    $itemId: String
    $itemProperty: String
    $merchantId: String
    $salesChannelName: String
    $storeId: String
  ) {
    updateCustomerWishlist(
      customerId: $customerId
      customerWishListId: $customerWishListId
      itemId: $itemId
      itemProperty: $itemProperty
      merchantId: $merchantId
      salesChannelName: $salesChannelName
      storeId: $storeId
    ) {
      message
      status
    }
  }
`;
export const updateItemInCustomerCart = /* GraphQL */ `
  mutation UpdateItemInCustomerCart(
    $accessToken: String
    $customerCartId: String
    $merchantId: String
    $quantity: Int
  ) {
    updateItemInCustomerCart(
      accessToken: $accessToken
      customerCartId: $customerCartId
      merchantId: $merchantId
      quantity: $quantity
    ) {
      message
      status
    }
  }
`;
export const updateMerchantDomainOnSite = /* GraphQL */ `
  mutation UpdateMerchantDomainOnSite(
    $printedQrCodeId: String
    $webQrCode: String
  ) {
    updateMerchantDomainOnSite(
      printedQrCodeId: $printedQrCodeId
      webQrCode: $webQrCode
    ) {
      message
      status
    }
  }
`;
export const updateMerchantKYC = /* GraphQL */ `
  mutation UpdateMerchantKYC(
    $aboutUsDescription: String
    $businessAddress: String
    $email: String
    $ic: String
    $merchantId: String
    $name: String
  ) {
    updateMerchantKYC(
      aboutUsDescription: $aboutUsDescription
      businessAddress: $businessAddress
      email: $email
      ic: $ic
      merchantId: $merchantId
      name: $name
    ) {
      message
      status
    }
  }
`;
export const updateModifierItemsAvailability = /* GraphQL */ `
  mutation UpdateModifierItemsAvailability(
    $availableStatus: String
    $modifierId: String
    $resetAll: Boolean
    $storeId: String
  ) {
    updateModifierItemsAvailability(
      availableStatus: $availableStatus
      modifierId: $modifierId
      resetAll: $resetAll
      storeId: $storeId
    ) {
      message
      status
    }
  }
`;
export const updateOnSiteAdminMerchantId = /* GraphQL */ `
  mutation UpdateOnSiteAdminMerchantId($merchantId: String) {
    updateOnSiteAdminMerchantId(merchantId: $merchantId) {
      message
      onBoardRole
      status
    }
  }
`;
export const updatePreferredLanguage = /* GraphQL */ `
  mutation UpdatePreferredLanguage(
    $merchantId: String
    $preferredLanguage: String
  ) {
    updatePreferredLanguage(
      merchantId: $merchantId
      preferredLanguage: $preferredLanguage
    ) {
      message
      onBoardRole
      status
    }
  }
`;
export const updateProductModifierSelectionInCustomerCart = /* GraphQL */ `
  mutation UpdateProductModifierSelectionInCustomerCart(
    $accessToken: String
    $customerCartId: String
    $merchantId: String
    $quantity: Int
    $selectedModifierGroups: [ModifierGroupsInput]
  ) {
    updateProductModifierSelectionInCustomerCart(
      accessToken: $accessToken
      customerCartId: $customerCartId
      merchantId: $merchantId
      quantity: $quantity
      selectedModifierGroups: $selectedModifierGroups
    ) {
      message
      status
    }
  }
`;
export const updateProductReview = /* GraphQL */ `
  mutation UpdateProductReview(
    $comment: String
    $merchantId: String
    $orderDetailId: String
    $rating: Int
    $reviewAsAnonymous: String
  ) {
    updateProductReview(
      comment: $comment
      merchantId: $merchantId
      orderDetailId: $orderDetailId
      rating: $rating
      reviewAsAnonymous: $reviewAsAnonymous
    ) {
      message
      status
    }
  }
`;
export const updateStoreSetupStatus = /* GraphQL */ `
  mutation UpdateStoreSetupStatus($acknowledgement: Boolean) {
    updateStoreSetupStatus(acknowledgement: $acknowledgement) {
      message
      status
    }
  }
`;
export const uploadManualPaymentReceipt = /* GraphQL */ `
  mutation UploadManualPaymentReceipt(
    $fileName: String
    $manualPaymentMethodName: String
    $merchantId: String
    $orderNumber: String
  ) {
    uploadManualPaymentReceipt(
      fileName: $fileName
      manualPaymentMethodName: $manualPaymentMethodName
      merchantId: $merchantId
      orderNumber: $orderNumber
    ) {
      message
      status
    }
  }
`;
export const verifyCustomerAccount = /* GraphQL */ `
  mutation VerifyCustomerAccount($customerEmail: String, $merchantId: String) {
    verifyCustomerAccount(
      customerEmail: $customerEmail
      merchantId: $merchantId
    ) {
      accountIsExist
      message
      status
    }
  }
`;

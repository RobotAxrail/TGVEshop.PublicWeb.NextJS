import { useState } from "react";
import useTranslation from 'next-translate/useTranslation';

import DialogModal from "@/components/dialog/DialogModal";
import { CloseIcon } from "@/components/icons/Icons";
import { Invoice } from "@/components/orders/Invoice";
import { ContainedButton } from "@/components/buttons/Buttons";
import { RectTextInput } from "@/components/inputs/Input";

const EditAddressModal = ({
  showAddressModal,
  setShowAddressModal,
  customerData,
  setCustomerData,
}) => {
  const [addressState, setAddressState] = useState({
    deliveryAddress: customerData.deliveryAddress,
    deliveryPostalCode: customerData.deliveryPostalCode,
    deliveryCity: customerData.deliveryCity,
    deliveryState: customerData.deliveryState,
    deliveryCountry: customerData.deliveryCountry,
  });

  const handleClose = () => {
    setShowAddressModal(false);
  };

  const handleSetAddressData = (fieldName, value) => {
    setAddressState((currentData) => ({
      ...currentData,
      [fieldName]: value,
    }));
  };

  const handleOnSave = () => {
    setCustomerData((currentData) => ({ ...currentData, ...addressState }));
    setShowAddressModal(false);
  };

  const { t } = useTranslation('common');

  return (
    <DialogModal
      className="max-h-screen max-w-[20rem] w-[60%] my-5 xs-down:px-1"
      smallDialog={false}
      onClose={handleClose}
      open={showAddressModal}
    >
      <h2>{t('editAddress')}</h2>
      <div className="flex gap-[1rem]">
        <RectTextInput
          className="mt-10"
          label={t('country')}
          type="text"
          value={addressState.deliveryCountry}
          onChange={(e) =>
            handleSetAddressData("deliveryCountry", e.target.value)
          }
          name="Country"
        />
        <RectTextInput
          className="mt-10"
          label={t('postcode')}
          type="text"
          onChange={(e) =>
            handleSetAddressData("deliveryPostalCode", e.target.value)
          }
          value={addressState.deliveryPostalCode}
          name="Postal Code"
        />
      </div>
      <div className="flex gap-[1rem]">
        <RectTextInput
          className="mt-10"
          label={t('address')}
          type="text"
          onChange={(e) =>
            handleSetAddressData("deliveryAddress", e.target.value)
          }
          value={addressState.deliveryAddress}
          name="Address"
        />
      </div>
      <div className="flex gap-[1rem]">
        <RectTextInput
          className="mt-10"
          label={t('state')}
          type="text"
          onChange={(e) =>
            handleSetAddressData("deliveryState", e.target.value)
          }
          value={addressState.deliveryState}
          name="State"
        />
        <RectTextInput
          className="mt-10"
          label={t('city')}
          type="text"
          onChange={(e) => handleSetAddressData("deliveryCity", e.target.value)}
          value={addressState.deliveryCity}
          name="City"
        />
      </div>
      <div className="flex justify-end pt-[2rem] gap-[1rem]">
        <ContainedButton
          onClick={handleClose}
          border="rounded"
          outlined={true}
          className="border-primary mr-2 font-semibold"
          fontSize="text-14px"
        >
          {t('cancel')}
        </ContainedButton>
        <ContainedButton
          onClick={handleOnSave}
          border="rounded"
          className="font-semibold min-w-[6rem]"
          fontSize="text-14px"
        >
          {t('Save')}
        </ContainedButton>
      </div>
    </DialogModal>
  );
};

export default EditAddressModal;

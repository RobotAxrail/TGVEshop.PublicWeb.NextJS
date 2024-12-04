import { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

// Components
import { ContainedButton } from "@/components/buttons/Buttons";
import StarRating from "@/components/common/StarRating";
import Dialog from "@/components/dialog/DialogModal";
import { Checkbox } from "@/components/inputs/Input";

// API

export default function ReviewModal(props) {
  const {
    open,
    setOpen,
    formValues,
    setFormValues,
    handleSubmitReview,
    handleClose,
    type,
    selectedItemToReview,
  } = props;

  const { t } = useTranslation("common");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setFormValues({
        ...formValues,
        [name]: e.target.checked,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (open === false) {
      setFormValues({
        review: "",
        rating: 1,
        reviewAsAnonymous: false,
      });
    }
  }, [open]);

  const bodyContent = () => {
    switch (type) {
      case "order":
        return (
          <div>
            <h6 className="text-[14px]">{t("Tell the next customer")}</h6>
            <textarea
              name="review"
              value={formValues.review}
              onChange={handleInputChange}
              className="
            resize-none
            form-control
            block
            w-full
            my-3
            px-3
            py-1.5
            text-[14px]
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-400
            rounded
            transition-all
            m-0
            focus:text-gray-700
          "
              rows="3"
              placeholder={t("Share your experience")}
            />

            <ContainedButton
              border="rounded"
              className="mx-2"
              outlined={true}
              onClick={handleClose}
            >
              {t("cancel")}
            </ContainedButton>
            <ContainedButton
              border="rounded"
              className="mx-2"
              onClick={handleSubmitReview}
            >
              {t("Save")}
            </ContainedButton>
          </div>
        );
      case "product":
        return (
          <div>
            <h3>
              {t("Provide a review for")} {selectedItemToReview.itemTitle}
            </h3>
            <div className="flex justify-center ">
              <label>{t("Rating")} : </label>
              <StarRating
                setFormValues={setFormValues}
                formValues={formValues}
              />
            </div>
            <Checkbox
              checked={formValues.reviewAsAnonymous}
              onChange={handleInputChange}
              name="reviewAsAnonymous"
              label="Review as anonymous"
            />
            <textarea
              name="review"
              value={formValues.review}
              onChange={handleInputChange}
              className="
              resize-none
              form-control
              block
              w-full
              my-3
              px-3
              py-1.5
              text-[14px]
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-400
              rounded
              transition-all
              m-0
              focus:text-gray-700
            "
              rows="3"
              placeholder={t("Share your experience")}
            />

            <ContainedButton
              border="rounded"
              className="mx-2"
              outlined={true}
              onClick={handleClose}
            >
              {t("cancel")}
            </ContainedButton>
            <ContainedButton
              border="rounded"
              className="mx-2"
              onClick={handleSubmitReview}
            >
              {t("Save")}
            </ContainedButton>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title={type === "order" && "Tell us about your experience"}
      className="w-[600px] mx-3"
    >
      {bodyContent()}
    </Dialog>
  );
}

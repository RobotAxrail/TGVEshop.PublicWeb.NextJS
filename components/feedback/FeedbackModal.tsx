import { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

// Components
import { ContainedButton } from "@/components/buttons/Buttons";
import SentimentRating from "@/components/common/SentimentRating";
import Dialog from "@/components/dialog/DialogModal";
import { Checkbox } from "@/components/inputs/Input";


export default function FeedbackModal(props: any) {

    const {
        formValues,
        setFormValues,
        handleSubmitFeedback,
        isLoading,
        submitted
    } = props;

    const { t } = useTranslation("common");

    return (
        <div className="min-h-screen w-full max-w-screen-sm px-2">
            <div className="h-full col-span-6 md:col-span-4 bg-white border shadow rounded-md p-6 overflow-x-auto relative">
            <div className="mx-8">
                <h3 className="text-center">{t("We Want to Hear From You")}</h3>
                <p className="text-[14px] text-center">{t("Thank you for your in-store purchase! How would you rate the overall experience with the store?")}</p>
            </div>

            {/* Rating */}
            <div className="my-12">
                <SentimentRating 
                    formValues={formValues}
                    setFormValues={setFormValues}
                    disabled={submitted}
                />
            </div>
            
            {/* Feedback */}
            <div className="mt-1 border-t-[1px] border-gray-400 border-solid">
                <h4 className="text-left">{t("Additional Feedback (If Any)")}</h4>
                <textarea
                    disabled={submitted}
                    name="additionalFeedback"
                    value={formValues?.additionalFeedback}
                    onChange={(e: any) => {
                        setFormValues({
                            ...formValues,
                            additionalFeedback: e.target.value
                        })
                    }}
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
                    rows={6}
                    placeholder={t("Leave some feedback to let us know how we are doing")}
                    />
            </div>

            {/* Submit */}
            <div>
                <ContainedButton
                    border="rounded"
                    className="my-8 w-full"
                    onClick={handleSubmitFeedback}
                    disabled={!formValues.rating || isLoading || submitted}
                    >
                {t("Submit")}
                </ContainedButton>
            </div>

            </div>
        </div>
    )


}
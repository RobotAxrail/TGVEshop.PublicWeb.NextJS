import React, { useEffect, useState } from "react";
import Image from "next/image";


import UnselectedSentiment1 from "@/components/icons/sentimentIcons/unselected/unselect-sentiment1.png"
import UnselectedSentiment2 from "@/components/icons/sentimentIcons/unselected/unselect-sentiment2.png"
import UnselectedSentiment3 from "@/components/icons/sentimentIcons/unselected/unselect-sentiment3.png"
import UnselectedSentiment4 from "@/components/icons/sentimentIcons/unselected/unselect-sentiment4.png"

import SelectedSentiment1 from "@/components/icons/sentimentIcons/selected/sentiment1.png"
import SelectedSentiment2 from "@/components/icons/sentimentIcons/selected/sentiment2.png"
import SelectedSentiment3 from "@/components/icons/sentimentIcons/selected/sentiment3.png"
import SelectedSentiment4 from "@/components/icons/sentimentIcons/selected/sentiment4.png"


const SentimentRating = (props: any) => {

    const {
        formValues = {},
        setFormValues,
        disabled
    } = props;

    // const [rating, setRating] = useState(
    //     formValues.rating ? formValues.rating : 1
    // );

    const [sentimentLevel, setSentimentLevel] = useState([
        { rating: 1, iconUnselected: UnselectedSentiment1, iconSelected: SelectedSentiment1, selected: false },
        { rating: 2, iconUnselected: UnselectedSentiment2, iconSelected: SelectedSentiment2, selected: false },
        { rating: 3, iconUnselected: UnselectedSentiment3, iconSelected: SelectedSentiment3, selected: false },
        { rating: 4, iconUnselected: UnselectedSentiment4, iconSelected: SelectedSentiment4, selected: false },
    ]);

    
    const handleOnClickSentimentIcon = (index) => {
        let tmpArray = [...sentimentLevel]
        let newArray = tmpArray.map((item, idx) => {
          if (idx === index) {
            return { ...item, selected: !item.selected }
          } else {
            return { ...item, selected: false }
          }
        })
        let filteredArray = newArray.filter((item) => item.selected)
        if (filteredArray.length > 0) {
            setFormValues({ ...formValues, rating: filteredArray[0].rating })
        } else {
            setFormValues({ ...formValues, rating: null })
        }
        setSentimentLevel(newArray)
      }


    return (
        <div className="flex flex-row justify-between">
            {sentimentLevel.map((item, index) => (
                <button 
                    title={"feedback rating"} 
                    className="px-0"
                    onClick={() => handleOnClickSentimentIcon(index)}
                    disabled={disabled} 
                    key={index}>
                    <Image 
                        src={item.selected ? item.iconSelected : item.iconUnselected}
                        className="w-[35px] h-[35px]"
                        alt="image"
                    />
                </button>
            ))}
        </div>
    );

}


export default SentimentRating;

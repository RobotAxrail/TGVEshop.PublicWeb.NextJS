import { useState } from "react";

const Accordion = (props) => {
  const { question, answer } = props.item;
  const [showAnswer, setShowAnswer] = useState(false);

  // handle open and close
  const toggleAccordion = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <div className='block border-b border-[grey] pb-[15px]'>
      <div
        className={['flex justify-between transition-all mt-[15px] pb-2.5',
        showAnswer ? 'text-primary' : ''
        ].join(' ')
          }
      >
        <div>{question}</div>
        <div className='cursor-pointer leading-none py-0 px-2.5 text-right font-bold text-[25px]' onClick={toggleAccordion}>
          {showAnswer ? "-" : "+"}
        </div>
      </div>
      <div
        className={[
        'overflow-hidden',
        showAnswer ? 'max-h-[2000px] transition-all duration-[5s]' : 
        'max-h-0 transition-all duration-[2s]'].join(' ')}
        dangerouslySetInnerHTML={{
          __html: answer !== "" ? answer : "",
        }}
      />
    </div>
  );
};

export default Accordion;

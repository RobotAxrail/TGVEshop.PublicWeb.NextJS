import { useRouter } from "next/router";
import Image from "next/image";

import ss from "@/images/ss1.jpeg";
import ss2 from "@/images/ss2.jpeg";
import ss3 from "@/images/ss3.jpg";
import ss4 from "@/images/ss4.jpg";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiExport } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import {
  faArrowLeft,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

import SEO from "@/components/seo/SEO";

const BookmarkScreen = () => {
  let router = useRouter();
  return (
    <>
      <SEO title="How to bookmark" keywords="" description="Home" />
      <div className="flex mt-6">
        <FontAwesomeIcon
          icon={faArrowLeft}
          pull="left"
          size="xl"
          className="cursor-pointer pl-[10px]"
          onClick={() => router.push("/")}
        />
        <h2 className="text-blue m-0 text-[20px] 960-up:text-[24px] 960-up:flex-1 960-up:text-center">
          {" "}
          How to bookmark a webpage{" "}
        </h2>
      </div>

      <div className="ml-4 text-blue">
        <p className="font-bold">Android</p>
        <ol className="break-words -ml-6">
          <li>Open the webpage that you want to bookmark</li>
          <li>
            On the top right of the page tap on the &nbsp;
            <FontAwesomeIcon icon={faEllipsisVertical} /> &nbsp; menu for
            options
          </li>
          <div className="w-44 my-3">
            <Image src={ss} />
          </div>
          <li>
            At the very top, you will be able to see the Bookmark Icon &nbsp;
            <AiOutlineStar />
          </li>
          <li>
            Tap on the &nbsp;
            <AiOutlineStar /> &nbsp; to save the page as bookmark
          </li>
          <div className="w-64 h-32 my-3">
            <Image src={ss2} />
          </div>
        </ol>
      </div>

      <div className="ml-4 text-blue mt-10">
        <p className="font-bold">ios</p>
        <ol className="break-words -ml-6">
          <li>Open the webpage that you want to bookmark</li>
          <li>
            On the top right in the URL field, tap on the &nbsp;
            <BiExport className="text-primary" /> &nbsp; menu for options
          </li>
          <div className="w-44 my-3">
            <Image src={ss4} />
          </div>
          <li>Tap Add Bookmark</li>
          <div className="w-64 h-32 my-3">
            <Image src={ss3} />
          </div>
        </ol>
      </div>
    </>
  );
};

export default BookmarkScreen;

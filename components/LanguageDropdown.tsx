import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FaGlobe } from "react-icons/fa";

export default function LanguageDropdown() {
  const { asPath, push } = useRouter();
  const { lang } = useTranslation();

  return (
    <div className="flex flex-row justify-center items-center pl-2 m-0 w-fit">
      <select
        onChange={(e) => push(asPath, undefined, { locale: e.target.value })}
        className="m-0 p-0 outline-none border-none bg-transparent"
        value={lang}
      >
        <option className="m-0 text-black" value={"en"}>
          EN
        </option>
        <option className="m-0 text-black" value={"bm"}>
          BM
        </option>
        <option className="m-0 text-black" value="zh">
          CH
        </option>
      </select>
    </div>
  );
}

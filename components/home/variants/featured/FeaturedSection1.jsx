import { useRouter } from "next/router";
import Image from "next/image";

// style
import classes from "../featured/Featured.module.scss";

const compare = (itemA, itemB) => {
  if (itemA.sequence < itemB.sequence) return -1;
  // put A in front
  else if (itemA.sequence > itemB.sequence) return 1;
  // put B in front
  else return 0;
};
const Featured = ({ list = [] }) => {
  const router = useRouter();
  if (!list) list = [];
  list.sort(compare);

  if (list.length === 0) return <></>;
  return (
    <div className={[classes.container, " max-w-[1200px]"].join(" ")}>
      <div className="flex flex-wrap w-full py-2">
        {list.slice(0, 2).map((item, idx) => {
          return (
            <div className="w-full 960-up:w-1/2 p-2 flex-grow-0" key={idx}>
              <div className="overflow-hidden rounded bg-white">
                {/* <button className="h-[250px] w-full select-none"> */}
                <Image
                  layout="responsive"
                  width={800}
                  height={250}
                  src={process.env.BUCKET_URL + item.collectionImage}
                  title={item.title}
                  onClick={(e) => router.push(`/${item.collectionSeoUrl}`)}
                />
                {/* </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Featured;

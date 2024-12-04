// import css from "@styles/export.module.scss";
// import { ReactComponent as MyOrders } from "@/images/my-orders.svg";

// icons
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";

/*
  current file has
  1. profile icons: MyAccountIcon, MyOrdersIcon, MyWishlistIcon
  2. cart icon: CartIcon
  3. sad face icon: SentimentVeryDissatisfiedIcon
  4. alert icons: SuccessIcon, FailedIcon
  5. close icon: CloseIcon
  6. Collection Icon
  7. right > icon : Chevron Right Icon
  8. heart icon with checked and unchecked ui: FavIcon - use status prop to handle the showing of onChecked icon
  9. whatsapp icon
  10. gift icon 
*/

export const MyAccountIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_176"
            data-name="Rectangle 176"
            width="26"
            height="26"
            transform="translate(30 811)"
            fill="current"
            stroke="#707070"
            strokeWidth="1"
          />
        </clipPath>
      </defs>
      <g
        id="Mask_Group_48"
        data-name="Mask Group 48"
        transform="translate(-30 -811)"
        clipPath="url(#clip-path)"
      >
        <g id="user" transform="translate(33.25 811)">
          <path
            fill="current"
            id="Path_253"
            data-name="Path 253"
            d="M12.5,13A6.5,6.5,0,1,0,6,6.5,6.5,6.5,0,0,0,12.5,13Zm0-10.833A4.333,4.333,0,1,1,8.167,6.5,4.333,4.333,0,0,1,12.5,2.167Z"
            transform="translate(-2.75 0)"
          />
          <path
            fill="current"
            id="Path_254"
            data-name="Path 254"
            d="M12.75,14A9.761,9.761,0,0,0,3,23.75a1.083,1.083,0,1,0,2.167,0,7.583,7.583,0,1,1,15.167,0,1.083,1.083,0,0,0,2.167,0A9.761,9.761,0,0,0,12.75,14Z"
            transform="translate(-3 1.167)"
          />
        </g>
      </g>
    </svg>
  );
};

export const MyOrdersIcon = (props) => {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26">
      <defs>
        <clipPath id="clip-path2">
          <rect
            id="Rectangle_170"
            data-name="Rectangle 170"
            width="26"
            height="26"
            transform="translate(100 273)"
            fill="current"
          />
        </clipPath>
      </defs>
      <g
        id="Mask_Group_47"
        data-name="Mask Group 47"
        transform="translate(-100 -273)"
        clipPath="url(#clip-path)"
      >
        <g id="box" transform="translate(100 273)">
          <path
            id="Path_251"
            data-name="Path 251"
            d="M11.083,17.167h6.5a1.083,1.083,0,1,0,0-2.167h-6.5a1.083,1.083,0,0,0,0,2.167Z"
            transform="translate(-1.333 -2)"
            fill="current"
          />
          <path
            id="Path_252"
            data-name="Path 252"
            d="M20.583,0H5.417A5.423,5.423,0,0,0,0,5.417V6.5A3.25,3.25,0,0,0,1.083,8.92V20.583A5.423,5.423,0,0,0,6.5,26h13a5.423,5.423,0,0,0,5.417-5.417V8.92A3.25,3.25,0,0,0,26,6.5V5.417A5.423,5.423,0,0,0,20.583,0ZM2.167,5.417a3.25,3.25,0,0,1,3.25-3.25H20.583a3.25,3.25,0,0,1,3.25,3.25V6.5A1.083,1.083,0,0,1,22.75,7.583H3.25A1.083,1.083,0,0,1,2.167,6.5ZM22.75,20.583a3.25,3.25,0,0,1-3.25,3.25H6.5a3.25,3.25,0,0,1-3.25-3.25V9.75h19.5Z"
            fill="current"
          />
        </g>
      </g>
    </svg>
  );
};

export const MyWishlistIcon = () => {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26">
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_171"
            data-name="Rectangle 171"
            width="26"
            height="26"
            transform="translate(202 273)"
            fill="current"
          />
        </clipPath>
      </defs>
      <g
        id="Mask_Group_45"
        data-name="Mask Group 45"
        transform="translate(-202 -273)"
        clipPath="url(#clip-path)"
      >
        <path
          fill="current"
          id="heart"
          d="M18.95,2.4a6.93,6.93,0,0,0-5.956,3.574A6.93,6.93,0,0,0,7.038,2.4,7.364,7.364,0,0,0,0,10.03c0,4.924,5.183,10.3,9.529,13.948a5.386,5.386,0,0,0,6.93,0c4.347-3.646,9.529-9.024,9.529-13.948A7.364,7.364,0,0,0,18.95,2.4ZM15.068,22.32a3.219,3.219,0,0,1-4.147,0C5.356,17.652,2.165,13.173,2.165,10.03A5.2,5.2,0,0,1,7.038,4.561a5.2,5.2,0,0,1,4.873,5.469,1.083,1.083,0,1,0,2.166,0A5.2,5.2,0,0,1,18.95,4.561a5.2,5.2,0,0,1,4.873,5.469c0,3.144-3.191,7.622-8.755,12.286Z"
          transform="translate(202.006 272.182)"
        />
      </g>
    </svg>
  );
};

export const CartIcon = ({ className, color }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    stroke="none"
    fill="currentColor"
  >
    <g
      id="noun_cart_2102832_4_"
      data-name="noun_cart_2102832 (4)"
      transform="translate(-6 -6)"
    >
      <path
        strokeWidth="1"
        id="Path_5"
        data-name="Path 5"
        d="M6.917,7.833H8.448l2.295,10.355a3.289,3.289,0,0,0-1.871,3.042,3.133,3.133,0,0,0,2.962,3.275H23.988a.917.917,0,1,0,0-1.833H11.833A1.332,1.332,0,0,1,10.7,21.231a1.332,1.332,0,0,1,1.128-1.442H23.988a.917.917,0,0,0,.863-.606l3.1-8.591a.917.917,0,0,0-.863-1.227H10.665l-.586-2.646A.916.916,0,0,0,9.184,6H6.917a.917.917,0,0,0,0,1.833ZM25.779,11.2l-2.435,6.758H12.568l-1.5-6.758H25.779Z"
      />
      <path
        strokeWidth="1"
        id="Path_6"
        data-name="Path 6"
        d="M19.261,50a.917.917,0,0,0,0,1.833h1.164a.917.917,0,1,0,0-1.833Z"
        transform="translate(-6.687 -23.833)"
      />
      <path
        strokeWidth="1"
        id="Path_7"
        data-name="Path 7"
        d="M37.713,50a.917.917,0,0,0,0,1.833h1.164a.917.917,0,1,0,0-1.833Z"
        transform="translate(-16.682 -23.833)"
      />
    </g>
  </svg>
);

export const SuccessIcon = (props) => {
  const { className } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${"fill-current w-5 h-5 inline-block shrink-0 select-none transition-all"}`}
      focusable="false"
    >
      <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
    </svg>
  );
};

export const FailedIcon = (props) => {
  const { className } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${"fill-current w-5 h-5 inline-block shrink-0 select-none transition-all"}`}
      focusable="false"
    >
      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>
  );
};

export const LoadingIcon = (props) => {
  const {
    color = "text-primary",
    width = "w-5",
    height = "h-5",
    margin = "mr-0",
  } = props;
  return (
    <svg
      role="status"
      className={`${color} ${width} ${height} ${margin} ${"inline animate-spin"}`}
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CloseIcon = (props) => {
  const { size = "w-4 h-4", className = "", viewBox = "0 0 20 20" } = props;
  return (
    <svg
      className={[
        className,
        "inline-block text-base select-none flex-shrink-0",
        size,
      ].join(" ")}
      focusable={false}
      fill="currentColor"
      viewBox={viewBox}
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
};

export const ChevronLeftIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      ></path>
    </svg>
  );
};

export const ChevronRightIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      ></path>
    </svg>
  );
};

export const CollectionIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      ></path>
    </svg>
  );
};

export const FavIcon = (props) => {
  const { status, width = "24px", height = "24px" } = props;

  return (
    <>
      {!status ? (
        <HeartIcon width={width} height={height} />
      ) : (
        <HeartSolidIcon width={width} height={height} className="text-[red]" />
      )}
    </>
  );
};

export const WhatsAppIcon = () => {
  return (
    <svg
      fill="white"
      stroke="white"
      viewBox="0 0 24 24"
      width="30px"
      height="30px"
      strokeWidth="0.1"
    >
      {" "}
      <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z" />
    </svg>
  );
};

export const GiftIcon = () => {
  return (
    <svg
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
      />
    </svg>
  );
};

export const DeliveryIcon = ({ className, color }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 17 17"
      className={className}
      stroke="none"
      fill="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        id="noun_delivery_1665162"
        d="M33.4,22.59H22.767a.708.708,0,0,0-.708.708v3.533H19.942a.706.706,0,0,0-.589.315l-2.124,3.2a.708.708,0,0,0-.119.393v3.189a.708.708,0,0,0,.708.708h.039a2.468,2.468,0,0,0,4.887,0h4.318a2.468,2.468,0,0,0,4.887,0H33.4a.708.708,0,0,0,.708-.708V23.3A.708.708,0,0,0,33.4,22.59ZM18.526,30.95l1.809-2.693h1.734v4.287c-.028-.028-.059-.047-.088-.072-.07-.065-.14-.124-.215-.181l-.15-.1a2.017,2.017,0,0,0-.258-.134c-.1-.041-.1-.052-.16-.075a2.3,2.3,0,0,0-.295-.093c-.049-.013-.1-.028-.147-.039a2.362,2.362,0,0,0-.47-.049,2.326,2.326,0,0,0-.468.049.641.641,0,0,0-.15.039,2.258,2.258,0,0,0-.292.093c-.057.023-.111.049-.165.078a2.171,2.171,0,0,0-.24.132c-.054.034-.106.07-.16.109a2.479,2.479,0,0,0-.2.165c-.062.057-.067.052-.1.083Zm1.77,4.393a1.065,1.065,0,0,1-1.062-1.062,1.313,1.313,0,0,1,.021-.214,1.062,1.062,0,0,1,2.083,0,1.189,1.189,0,0,1,.021.217A1.065,1.065,0,0,1,20.3,35.341Zm9.211,0a1.065,1.065,0,1,1,1.034-1.292,1.189,1.189,0,0,1,.023.217,1.065,1.065,0,0,1-1.057,1.073Zm2.238-2.127c-.023-.049-.054-.1-.083-.145s-.039-.078-.062-.114a2.887,2.887,0,0,0-.2-.258.432.432,0,0,1-.031-.041,2.488,2.488,0,0,0-.279-.258l-.085-.065a2.041,2.041,0,0,0-.233-.158l-.119-.065A1.9,1.9,0,0,0,30.422,32a1.361,1.361,0,0,0-.132-.049,2.3,2.3,0,0,0-.258-.072l-.124-.026a2.223,2.223,0,0,0-.8,0l-.121.026a2.344,2.344,0,0,0-.258.072A.433.433,0,0,0,28.6,32a2.558,2.558,0,0,0-.24.114l-.111.059a2.4,2.4,0,0,0-.258.173l-.065.047a2.559,2.559,0,0,0-.517.6l-.044.078c-.031.057-.067.111-.093.168H23.486V24.006h9.208v2.127H27.734a.708.708,0,0,0,0,1.416h4.959v5.665Z"
        transform="translate(-17.11 -22.59)"
        fill="currentColor"
      />
    </svg>
  );
};

export const PaymentIcon = ({ className, color }) => {
  return (
    <svg
      width="100%"
      height="100%"
      className={className}
      stroke="none"
      fill="currentColor"
      viewBox="0 0 22 20"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g id="Layer_3" data-name="Layer 3" transform="translate(-1 -7.369)">
        <path
          id="Path_138"
          data-name="Path 138"
          d="M22.944,9.4H20.061a.757.757,0,0,0-.757.757v.6H18.033L15.892,8.6a4.2,4.2,0,0,0-5.948,0L8.173,10.374H1.757A.757.757,0,0,0,1,11.131v3.526H1v4.956a.757.757,0,0,0,.757.757H14.666a.757.757,0,0,0,.757-.757V16.738h1.143a3.027,3.027,0,0,0,2.27,1.059h.439V18.4a.757.757,0,0,0,.757.757h2.913A.757.757,0,0,0,23.7,18.4V10.154A.757.757,0,0,0,22.944,9.4ZM8.469,11.9h5.448v1.2H11.949a1.816,1.816,0,0,0-1.513.84H2.513V11.9Zm5.448,7H2.513V15.413h7.7a1.816,1.816,0,0,0,1.733,1.294h1.967Zm4.956-2.618a1.513,1.513,0,0,1-1.279-.7.757.757,0,0,0-.643-.355H11.942a.31.31,0,1,1,0-.613h5a.757.757,0,0,0,0-1.513H15.43V11.146a.757.757,0,0,0-.757-.757H10.323l.7-.7a2.754,2.754,0,0,1,3.783,0l2.361,2.361a.757.757,0,0,0,.537.219h1.589v4.018Zm3.314,1.362h-1.37V10.911h1.37Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

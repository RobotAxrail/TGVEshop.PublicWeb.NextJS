// const {
//   PHASE_DEVELOPMENT_SERVER,
//   PHASE_PRODUCTION_BUILD,
// } = require("next/constants");

// // This file sets a custom webpack configuration to use your Next.js app
// // with Sentry.
// // https://nextjs.org/docs/api-reference/next.config.js/introduction
// // https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");
const nextTranslate = require("next-translate");
const withTM = require("next-transpile-modules")(["react-vant"]);

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  authToken: "df0aa944cef84a5583cc661841b94adcf759b04a950a4e4b85e395b071c25757",
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// // bundle analyzer
// // const withBundleAnalyzer = require("@next/bundle-analyzer")({
// //   enabled: process.env.ANALYZE === "true",
// // });
// // module.exports = withBundleAnalyzer({});

// const moduleExports = (phase) => {
//   // Your existing module.exports

//   // This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration

//   // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
//   const isDev = phase === PHASE_DEVELOPMENT_SERVER;
//   // when `next build` or `npm run build` is used
//   const isProd =
//     phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
//   // when `next build` or `npm run build` is used
//   const isStaging =
//     phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

//   console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

//   const env = {
//     BUCKET_URL: (() => {
//       if (isDev) return "https://d2txwcz8p1q7po.cloudfront.net/public/";
//       if (isProd) {
//         return "https://d2txwcz8p1q7po.cloudfront.net/public/";
//       }
//       if (isStaging) return "https://d2txwcz8p1q7po.cloudfront.net/public/";
//       return "BUCKET_URL:not (isDev,isProd && !isStaging,isProd && isStaging)";
//     })(),
//     GOOGLE_MAPS_API_KEY: "AIzaSyBfPTX9MzaaJdgfA2bHz7R1xcJg8pgtn80",
//   };

//   // next.config.js object
//   return {
//     env,
//     images: {
//       domains: ["d2txwcz8p1q7po.cloudfront.net"],
//     },
//   };
// };

// // Make sure adding Sentry options is the last code to run before exporting, to
// // ensure that your source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
const moduleExports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);
  const env = {
    BUCKET_URL: (() => {
      if (isDev) return "https://d31ishmcm8lu09.cloudfront.net/public/";
      if (isProd) {
        return "https://df236z5t5wm1k.cloudfront.net/public/";
      }
      if (isStaging) return "https://df236z5t5wm1k.cloudfront.net/public/";
      return "BUCKET_URL:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),
    GOOGLE_MAPS_API_KEY: "AIzaSyDyJ9fG375XrWLzPpwsDPcIrNHIpw5McYM",
    NEXT_PUBLIC_MAINTENANCE: false,
    NEXT_PUBLIC_SENTRY_DSN:
      "https://8984448f35794de0ac15954251550c62@o1245970.ingest.sentry.io/6405525",
    NEXT_PUBLIC_EWARUNG_PREPRINT_QR_DOMAIN: "https://uranus.ewarung.shop",
    NEXT_PUBLIC_ECS_API_ENDPOINT:
      "https://n6m4bfhxfj.execute-api.ap-southeast-1.amazonaws.com",
  };

  // next.config.js object
  return withTM(
    nextTranslate({
      env,
      images: {
        domains: ["d31ishmcm8lu09.cloudfront.net", "images.unsplash.com"],
      },
      experimental: {
        headers() {
          return [
            // AASA header config
            {
              source: "/.well-known/apple-app-site-association",
              headers: [{ key: "content-type", value: "application/json" }],
            },
            // assetlink header config
            {
              source: "/.well-known/assetlinks.json",
              headers: [{ key: "content-type", value: "application/json" }],
            },
          ];
        },
      },
    })
  );
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);

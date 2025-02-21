import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		sakinahAPI: "https://sakinah-be.hafiyyansayy.id",
		// sakinahAPI: "https://api.idsakinah.com",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "sakinah-be.hafiyyansayy.id",
				// hostname: "api.idsakinah.com",
				port: "",
				pathname: "/media/**",
			},
			{
				protocol: "http",
				hostname: "127.0.0.1",
				port: "8000",
				pathname: "/media/**",
			},
		],
	},
};
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({});
export default nextConfig;

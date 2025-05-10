import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		sakinahAPI: "https://api.idsakinah.com",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.idsakinah.com",
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

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		sakinahAPI: "https://sakinah-be.hafiyyansayy.id",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "sakinah-be.hafiyyansayy.id",
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

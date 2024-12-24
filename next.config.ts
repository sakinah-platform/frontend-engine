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
		],
	},
};

export default nextConfig;

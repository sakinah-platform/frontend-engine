import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

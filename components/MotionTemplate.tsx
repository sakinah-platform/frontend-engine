import {
	animate,
	KeyframeOptions,
	motion,
	useInView,
	useIsomorphicLayoutEffect,
} from "framer-motion";
import { useRef, useState } from "react";

// const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

export const UpReveal = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}>
			{children}
		</motion.div>
	);
};

export const UpRevealWord = ({
	words,
	fontFamily = "font-alice",
}: {
	words: string[];
	fontFamily?: string;
}) => {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);

	const handleAnimationComplete = () => {
		setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
	};
	return (
		<motion.div
			className={`${fontFamily} relative block overflow-hidden whitespace-nowrap uppercase`}
			key={currentWordIndex}>
			<motion.div
				initial={{ y: 15 }}
				animate={{ y: [15, 0, 0, -25] }}
				transition={{
					duration: 4.3,
					times: [0, 0.02, 0.95, 1],
					cycle: 0,
				}}
				onAnimationComplete={handleAnimationComplete}>
				{words[currentWordIndex]}
			</motion.div>
		</motion.div>
	);
};

export const CountingText = ({
	from,
	to,
	animateOpt,
}: {
	from: number;
	to: number;
	animateOpt?: KeyframeOptions;
}) => {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true });

	useIsomorphicLayoutEffect(() => {
		const el = ref.current;
		if (!el || inView) return;

		el.textContent = (from / 1000).toFixed(3);

		const controls = animate(from, to, {
			duration: 1.5,
			ease: "easeOut",
			...animateOpt,
			onUpdate() {
				el.textContent = (from / 1000).toFixed(3);
			},
		});
		return () => {
			controls.stop();
		};
	}, [ref, from, to]);
	return <span ref={ref} />;
};

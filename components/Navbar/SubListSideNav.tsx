const SubListSideNav = ({
	subtitle,
	text,
	route,
}: {
	subtitle: string;
	text: string;
	route: string;
}) => {
	return (
		<li className='nav-item border-start my-0 ms-4 pt-2'>
			<a
				className={`nav-link ${
					subtitle == text ? "active" : ""
				} position-relative ms-0 ps-2 py-2`}
				href={route}>
				<span className='nav-link-text ms-1'>{text}</span>
			</a>
		</li>
	);
};

export default SubListSideNav;

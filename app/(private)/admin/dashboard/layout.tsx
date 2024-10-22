import React from "react";
import PrivateNav from "../components/private-nav";

const PrivateLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<div className="flex gap-10">
				<PrivateNav />
				<main className="p-8">{children}</main>
			</div>
		</>
	);
};

export default PrivateLayout;

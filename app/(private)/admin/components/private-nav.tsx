"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon, Package2, TruckIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PrivateNav = () => {
	const pathname = usePathname();

	const links = [
		{
			href: "/admin/dashboard",
			label: "Dashboard",
			icon: HomeIcon,
		},
		{
			href: "/admin/dashboard/inventory",
			label: "Inventory",
			icon: Package2,
		},
		{
			href: "/admin/dashboard/orders",
			label: "Orders",
			icon: TruckIcon,
		},
	];
	return (
		<aside className="bg-secondary text-secondary-foreground max-w-sm h-screen p-4">
			<nav className="w-full flex flex-col gap-2">
				{/* nav header */}
				<div>
					<h2 className="text-3xl">SoulePsycle</h2>
				</div>

				{/* nav content */}
				<div>
					<ul className="grid gap-1">
						{links.map((link) => {
							const { href, label, icon: LinkIcon } = link;
							return (
								<li key={href}>
									<Button
										variant={
											pathname === href
												? "default"
												: "secondary"
										}
										size={"lg"}
										className={cn(
                                            'w-full text-lg px-2',
                                            pathname === href ? 'text-white bg-primary' : ''
                                        )}
										asChild
									>
										<Link href={href} className="items-start justify-start">
											<LinkIcon className="w-4 h-4 mr-2" />
											{label}
										</Link>
									</Button>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
		</aside>
	);
};

export default PrivateNav;

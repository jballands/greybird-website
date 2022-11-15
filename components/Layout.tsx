import React, { ReactNode } from 'react';
import NavigationBar from './NavigationBar';

interface LayoutProps {
	children: ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<>
			<NavigationBar />
			{children}
		</>
	);
}

export default Layout;

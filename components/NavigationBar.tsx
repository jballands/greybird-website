import React, { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavigationBar.module.css';

function NavigationBar() {
	return (
		<nav className={styles.container}>
			<div className={styles.logo}>
				<Link href="/">
					<Image src="/greybird-logo.svg" alt="Greybird logo" fill />
				</Link>
			</div>

			<div className={styles.navLinkCollection}>
				<Link className={styles.navLink} href="/destinations">
					Book a Trip
				</Link>
				<Link className={styles.navLink} href="/about">
					About
				</Link>
				<Link className={styles.navLink} href="/plus">
					<Image
						src="/greybird-plus.svg"
						alt="Greybird Plus"
						width={30}
						height={30}
					/>
				</Link>
			</div>
		</nav>
	);
}

export default NavigationBar;

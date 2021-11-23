import { Outlet } from 'react-router-dom';

import styles from './styles/sass/app.module.scss';

export function Layout() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.titles}>
                    <h1>Gerenciador de recursos</h1>
                    <h2>Integrado com API falsa para teste</h2>
                </div>

                <div className={styles.page}>
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

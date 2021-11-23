import { Link } from 'react-router-dom';

import appStyles from '../styles/sass/app.module.scss';
import buttonStyles from '../styles/sass/button.module.scss';

import { FiRotateCw } from 'react-icons/fi';
import { UserList } from '../components/UserList';

export function Home() {
    return (
        <div>
            <div className={appStyles.header}>
                <h1>Lista de usuários</h1>

                <Link className={`${buttonStyles.buttonCircle} ${buttonStyles.buttonPrimary}`} to="todo">
                    <FiRotateCw size="20" strokeWidth="2.8" />
                </Link>
            </div>

            <UserList />
        </div>
    )
}
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../services';

import { IUserData } from './userType';

import styles from './styles.module.scss';
import buttonStyles from '../../styles/sass/button.module.scss';

export function UserList() {
    const [users, setUsers] = useState<IUserData[]>([]);

    useEffect(() => {
        api.get<IUserData[]>('users').then(response => {
            setUsers(response.data);
        });
    }, []);

    return (
        <div className={styles.container}>
            {
                users.map((user, key) => {
                    return (
                        <div className={styles.card} key={key}>
                            <div className={styles.content}>
                                <div className={styles.profile}>
                                    <img src={'https://picsum.photos/100/100?random=' + key} alt="profile" />
                                </div>

                                <div className={styles.titles}>
                                    <h1>{user.name}</h1>
                                    <h2>{user.email}</h2>
                                </div>
                            </div>

                            <div className={styles.footer}>
                                <Link className={`${buttonStyles.button} ${buttonStyles.buttonPrimary}`} to={'tarefas/' + user.id}>
                                    Tarefas
                                </Link>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}
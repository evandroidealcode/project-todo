import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { api } from '../services';
import { IUserData } from '../components/UserList/userType';

import appStyles from '../styles/sass/app.module.scss';
import buttonStyles from '../styles/sass/button.module.scss';

import { FiPlus } from 'react-icons/fi';
import { TaskList } from '../components/TaskList';

export function Task() {
    const { userID } = useParams<"userID">();

    const [user, setUser] = useState({ id: "", name: "" });

    useEffect(() => {
        async function fetchAPI() {
            let response = await api.get<IUserData>(`users/${userID}`).then(response => response.data);
            setUser(response);
        }

        fetchAPI();
    }, []);

    return (
        <div>
            <div className={appStyles.header}>
                <h1>Tarefas do usuário: <br />{user.name}</h1>

                <Link className={`${buttonStyles.buttonCircle} ${buttonStyles.buttonPrimary}`} to="#">
                    <FiPlus size="20" strokeWidth="2.8" />
                </Link>
            </div>
            {user.id &&
                <TaskList userID={user.id} />
            }
        </div>
    )
}
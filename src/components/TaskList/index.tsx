import { useState, useEffect } from 'react';

import { api } from '../../services';
import { ITaskData } from './taskType';

import ReactPaginate from 'react-paginate';
import { Loading } from '../Loading';

import styles from './styles.module.scss';

type TaskListProps = {
    userID: string;
};

export function TaskList(props: TaskListProps) {
    const [loading, setLoading] = useState(false);

    const [listTask, setListTask] = useState<ITaskData[]>([]);
    const [currentItems, setCurrentItems] = useState<ITaskData[]>([]);

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemChange, setItemChange] = useState(0);

    const { userID } = props;
    const itemsPerPage = 10;


    useEffect(() => {
        console.log('Lista atualizada: ', listTask);

        if (listTask.length > 0) {
            const endOffset = itemOffset + itemsPerPage;

            setCurrentItems(listTask.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(listTask.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage, itemChange]);

    useEffect(() => {
        setLoading(true);

        api.get<ITaskData[]>(`users/${userID}/todos`).then(response => {
            const taskData = response.data;
            const endOffset = itemOffset + itemsPerPage;

            setListTask(taskData);

            setCurrentItems(taskData.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(taskData.length / itemsPerPage));

            setLoading(false);
        });
    }, []);


    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % listTask.length;

        setItemOffset(newOffset);
    };

    const handleTaskChange = (task: ITaskData) => {

        let dataChangeTask = JSON.stringify({
            completed: !task.completed
        });

        api.patch<ITaskData>(`todos/${task.id}`, dataChangeTask, {
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        }).then(response => {
            let data = response.data;

            listTask.find((element, key) => {
                if (element.id === task.id) {
                    listTask[key] = data;
                }
            });

            setListTask(listTask);
            setItemChange(itemChange+1);

            console.log('Item alterado: ', data);
        }).catch((err) => {
            console.error("Erro: " + err);
        });
    };

    return (
        <div className={styles.container}>
            {loading ?
                <Loading isLoading={loading} /> :
                (
                    <>
                        <div className={styles.list}>
                            <div className={styles.header}>
                                <h1>Tarefas</h1>
                                <h1>Completar</h1>
                            </div>
                            {currentItems &&
                                currentItems.map((task, key) => {
                                    return (
                                        <div className={styles.item} key={task.id}>
                                            <h1>{task.title}</h1>

                                            <label>
                                                <input type="checkbox" name={`task-${task.id}`} onChange={() => handleTaskChange(task)} defaultChecked={Boolean(task.completed)} />
                                                <i></i>
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ReactPaginate
                            nextLabel="Próximo"
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="Anterior"
                            marginPagesDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName="pagination"
                        />
                    </>
                )

            }
        </div>
    )
}
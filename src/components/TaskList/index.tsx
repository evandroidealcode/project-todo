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

    const { userID } = props;
    const itemsPerPage = 10;


    useEffect(() => {
        if (setListTask.length > 0) {
            const endOffset = itemOffset + itemsPerPage;

            setCurrentItems(listTask.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(listTask.length / itemsPerPage));
        }
    }, [itemOffset, itemsPerPage]);

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
                                        <div className={styles.item} key={key}>
                                            <h1>{task.title}</h1>

                                            <label>
                                                <input type="checkbox" />
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
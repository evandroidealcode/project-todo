import styles from './styles.module.scss';

type LoadingProps = {
    isLoading: boolean;
}

export function Loading(props: LoadingProps) {
    let { isLoading } = props;

    return (
        <div className={styles.wrapperLoading}>
            {
                isLoading && <div className={styles.loading}></div>
            }
        </div>
    )
}
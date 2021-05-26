import styles from './Loader.module.css';

export function Loader({ loading }: { loading: boolean }) {
    return (
        <>
            {
                loading && 
                <div className={ styles.spinner__container }>
                    <div className={ styles.spinner + " spinner-2"}></div>
                </div>
            }
        </>
    )
}
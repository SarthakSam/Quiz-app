import { FaCheck, FaTimes, FaExclamation } from 'react-icons/fa';
import styles from './Notification.module.css';
import { useEffect } from 'react';
import { useNotifications } from '../../contexts/notifications-context';
import { INotification } from '../../quiz.types';

export function Notification( { id, type, message, duration = 3000 }: INotification ) {
    const { deleteNotification } = useNotifications();

    useEffect(() => {
        setTimeout( () =>{
            deleteNotification(id!);
        }, duration );
    }, [id, duration, deleteNotification])

    return (
    <li key={ id } className = {"col-12 p-0 " + styles.notification}>
           {
               type === 'SUCCESS' && 
               <div className="alert bg-green text-white">
                    <FaCheck style={{ padding: 0 }}/>
                    <p>{message}</p>
                </div>
            }
            {
                type === 'ERROR' && 
                <div className="alert bg-red text-white">
                    <FaTimes style={{ padding: 0 }} />
                    <p>{message}</p>
                </div>
            }
            {
                type === 'WARNING' && 
                <div className="alert bg-yellow text-white">
                    <FaExclamation style={{ padding: 0 }} />
                    <p>{message}</p>
                </div>
            }
    </li>
    )
}
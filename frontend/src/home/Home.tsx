import styles from './Home.module.css';
import { categories } from '../mock.data';

export function Home() {



    return (
        <div className={ ` ${ styles.home }` }>
            <div className={ styles.categories }>
                <h2>Top Quiz Categories</h2>
                <button className={ `btn ${ styles.viewAll }` }>View All</button>                
            </div>
            <ul className="row" style={{ listStyle: "none" }}>
                {
                    categories.map( category => <li className={ `col-4 ${ styles.categoryCard }` } key = { category._id }>
                        {
                            category.image && <img src={ category.image} alt="" />
                        }
                        { category.title }
                    </li> )
                }
            </ul>
        </div>
    )
}
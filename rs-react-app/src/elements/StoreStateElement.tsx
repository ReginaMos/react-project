import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {clearFavourites} from '../store/favouritesReducer';
import '../styles/StoreState.css'

export default function StoreStateElement() {
    const dispatch = useDispatch();
    const favourites = useSelector((state: RootState) => state.favourites.items);
    const count = favourites.length;

    const saveCSV = () => {
        const csv = [
        ['ID', 'Name', 'Gender', 'Skin color', 'Eye color', 'Hair color', 'Birth year', 'Height'],
            ...favourites.map(p => [p.id, p.name, p.gender, p.skin_color, p.eye_color, p.hair_color, p.birth_year, p.height])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${count}_favourites.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    return (
        <div className="store-state">
            <div className="store-count">
                {count} elements selected
            </div>
            <div className="store-buttons">
                <button onClick={() => dispatch(clearFavourites())}>Clear all</button>
                <button onClick={saveCSV}>Save</button>
            </div>
        </div>
    )
}
import { useState } from "react";
import styles from "@/styles/FilterView.module.css";
import { Filter } from "../types";

export default function FilterView(props: {
    items: string[],
    onUpdate: (filter: Filter) => void
}) {
    const [filter, setFilter] = useState<Filter>({});

    function toggleItem(item: string) {
        const newFilter = {...filter};
        newFilter[item] = !filter[item];
        setFilter(newFilter);
        props.onUpdate(newFilter);
    }

    return (
        <ul className={`list-group ${styles.listGroup}`}>
            {!props.items || props.items.map(item => (
                <li key={item} className={`list-group-item ${styles.listGroupItem} ${filter[item] ? "active" : ""}`} onClick={() => toggleItem(item)}>{item}</li>
            ))}
        </ul>
    );
}
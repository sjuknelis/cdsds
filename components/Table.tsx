import styles from "@/styles/Table.module.css";

export default function Table(props: {
    data: string[][]
}) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <tbody>
                    {props.data.map(row => (
                        <tr key={row[0]}>
                            {row.map((col, colIndex) => (
                                <td key={colIndex} className={styles.col}>
                                    {col}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
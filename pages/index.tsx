import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { Overpass } from "next/font/google";
import FilterView from "../components/FilterView";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import { categories, getTableData } from "../tableData";
import { Filter } from "../types";

const overpass = Overpass({weight: "400", subsets: ["latin"]});

export default function Home() {
    const [tableData, setTableData] = useState<string[][]>([]);
    const [schoolFilter, setSchoolFilter] = useState<Filter>({});
    const [categoryFilter, setCategoryFilter] = useState<Filter>({});

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");

        (async () => {
            setTableData(await getTableData());
        })();
    }, []);

    function anySelectedInFilter(filter: Filter): boolean {
        return Object.values(filter).indexOf(true) != -1;
    }

    function getDisplayTableData(): string[][] {
        if (!anySelectedInFilter(schoolFilter) || !anySelectedInFilter(categoryFilter)) return [];

        const header =[[""].concat(categories.filter(category => categoryFilter[category]))]
        const filtered = tableData
            .filter(row => schoolFilter[row[0]])
            .map(row => row.filter((_, colIndex) => colIndex == 0 || categoryFilter[categories[colIndex - 1]]));
        return header.concat(filtered);
    }

    return (
        <div className={overpass.className}>
            <Head>
                <title>CDSDS</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <script data-goatcounter="https://cdsds.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
            </Head>
            <nav className={`navbar navbar-expand-lg bg-light ${styles.navbar}`}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Common Data Set Data Set</a>
                    <ul className="navbar-nav ms-auto">
                        <li>
                            <button type="button" className="nav-link" data-bs-toggle="modal" data-bs-target="#aboutModal">About</button>
                        </li>
                        <li>
                            <a className="nav-link" href="/cdsds/all.csv">Full dataset (.csv)</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <main className="container">
                <br />
                <div className="row">
                    <div className={`col-6 ${styles.filterCol}`}>
                        Select colleges
                        <FilterView items={tableData.map(row => row[0])} onUpdate={setSchoolFilter} />
                    </div>
                    <div className={`col-6 ${styles.filterCol}`}>
                        Select categories
                        <FilterView items={categories} onUpdate={setCategoryFilter} />
                    </div>
                </div>
                <br />
                <Table data={getDisplayTableData()} />
            </main>
            <div className="modal fade" id="aboutModal" tabIndex={-1} aria-labelledby="aboutModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="aboutModalLabel">About CDSDS</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            The <a href="https://commondataset.org/" target="_blank">Common Data Set (CDS)</a> is an initiative by College Board, US News, and Peterson's in which colleges publish information to help prospective students make informed choices in the college admissions process.<br /><br />
                            Each college publishes a CDS which contains important information about what the college prioritizes when making admissions decisions (item C7). Unfortunately, almost every college release its CDS as a PDF, which makes it hard to parse and to compile many colleges' CDSs into a centralized database. Nonetheless, this is my attempt to do that.<br /><br />
                            Because the vast majority of data on this website was created using computer vision scripts I wrote to scan PDFs, you should not treat this website as authoritative. In addition, most CDSs referred to for this website are for the 2022-23 academic year and so may be slightly outdated (especially in the standardized testing category).<br /><br />
                            You can download the full dataset for this website <a href="/cdsds/all.csv">here</a>. If you experience any problems with the website, please let me know. Thanks to <a href="https://www.collegetransitions.com/dataverse/common-data-set-repository" target="_blank">College Transitions</a> for their repository of CDS links.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}